import { createClient } from '@supabase/supabase-js';
import { getLikedTweets } from './twitter.js';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string)

const loopLikedTweets = async ({ token = '' }) => {
  const { tweets, next_token } = await getLikedTweets({ token });

  tweets.forEach(async (tweet) => {
    const { author, media, public_metrics, referenced_tweets, text } = tweet;
    const { error } = await supabase.from('tweets').insert([{
      tweet_id: tweet.id,
      tweeted_at: tweet.created_at,
      author,
      media,
      public_metrics,
      referenced_tweets,
      text
    }]);

    if (error?.message) {
      console.log(`${tweet.author.username}/status/${tweet.id} → error ${error?.code}: ${error?.message}`);
    } else {
      console.log(`${tweet.author.username}/status/${tweet.id} → saved`);
    }
  })

  if (next_token !== '') {
    console.log(`→ calling again with: ${next_token}`);
    loopLikedTweets({ token: next_token });
  } else {
    console.log('-----------------------------------')
  }
}

loopLikedTweets({});

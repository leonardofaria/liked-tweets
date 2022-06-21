import { Tweet } from '../types';
import fetch from 'node-fetch';

const DEFAULT_FIELDS: {[index: string]: any} = {
  expansions:
    'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
  'tweet.fields':
    'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
  'user.fields': 'id,name,profile_image_url,protected,url,username,verified',
  'media.fields':
    'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics'
};

export const processResponse = (tweets: any) => {
  const getAuthorInfo = (author_id: any) => {
    return tweets.includes.users.find((user: any) => user.id === author_id);
  };

  const getReferencedTweets = (mainTweet: any) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet: any) => {
        const fullReferencedTweet = tweets.includes.tweets.find(
          (tweet: any) => tweet.id === referencedTweet.id
        );

        return {
          type: referencedTweet.type,
          author: getAuthorInfo(fullReferencedTweet?.author_id),
          ...fullReferencedTweet
        };
      }) || []
    );
  };

  return tweets.data.reduce((allTweets: any, tweet: any) => {
    const tweetWithAuthor: Tweet = {
      ...tweet,
      media:
        tweet?.attachments?.media_keys.map((key: string) =>
          tweets.includes.media.find((media: any) => media.media_key === key)
        ) || [],
      referenced_tweets: getReferencedTweets(tweet),
      author: getAuthorInfo(tweet?.author_id)
    };

    return [tweetWithAuthor, ...allTweets];
  }, []);
}

export const getLikedTweets = async ({ user = '6396602', token = '' }) => {
  const queryParams = new URLSearchParams();
  for (let key in DEFAULT_FIELDS) {
    queryParams.append(key, DEFAULT_FIELDS[key]);
  }
  if (token !== '') {
    queryParams.append('pagination_token', token);
  }

  const response = await fetch(
    `https://api.twitter.com/2/users/${user}/liked_tweets?${queryParams}`,
    { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` } }
  );
  
  const responseJson = (await response.json()) as any;
  const tweets = processResponse(responseJson);
  
  return { tweets: tweets as Tweet[], next_token: responseJson.meta?.next_token };
}

export const getTweetsByIds = async (ids: string[]) => {
  if (ids.length === 0) {
    return [];
  }

  const params: {[index: string]: any} = {
    ids: ids.join(','),
    ...DEFAULT_FIELDS
  };
  const queryParams = new URLSearchParams();
  for (let key in params) {
    queryParams.append(key, params[key]);
  }

  const response = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` } }
  );

  return processResponse(await response.json());
};
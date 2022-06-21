import Tweet from '../components/Tweet';
import { getTweetsByIds } from '../lib/twitter';
import { Tweet as TweetProps } from '../types';
import { getLayout } from '../components/layouts/Twitter';

type Props = {
  tweets: TweetProps[]
}

export default function Static({ tweets }: Props) {
  return (
    <div className="relative">
      <div className="w-full sticky top-0 px-6 py-4 bg-white/60 z-10 backdrop-blur-sm">
        <h2 className="text-xl font-bold">Liked Tweets (static list for testing)</h2>
      </div>

      {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
    </div>
  );
}

Static.getLayout = getLayout;

export async function getStaticProps() {
  const tweets = await getTweetsByIds([
    '1537812407971627009', // image + hashtag
    '1537578175663812608', // video
    '1534287406865727489', // image + tweet
    '1527989846303723521', // 4 images
  ]);

  return { props: { tweets } };
}

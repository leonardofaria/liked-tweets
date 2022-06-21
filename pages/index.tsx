import { useRouter } from 'next/router';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Tweet from '../components/Tweet';
import { Tweet as TweetProps } from '../types';
import Pagination from '../components/Pagination';
import { getPagination } from '../lib/utils';
import { getLayout } from '../components/layouts/Twitter';

// TODO: move this to another file
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

type Props = {
  tweets: TweetProps[]
  count: number
  page: number
}

export default function Index({ tweets, count, page }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);
  const onChangePage = (page: number): void => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  return (
    <div className="relative">
      <div className="w-full sticky top-0 px-6 py-4 bg-white/60 z-10 backdrop-blur-sm">
        <h2 className="text-xl font-bold">Liked Tweets</h2>
      </div>

      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}

      <Pagination
        onChange={onChangePage}
        current={currentPage}
        total={count}
      />
    </div>
  );
}

Index.getLayout = getLayout;

export async function getServerSideProps({ query: { page = 1, size = 10} }) {
  const { from, to } = getPagination(page, size);
  const { data, count } = await supabase
    .from('tweets')
    .select('*', { count: 'exact' })
    .order('tweeted_at', { ascending: false })
    .range(from, to);
    
  return {
    props: {
      tweets: data,
      count: count,
      page: +page,
    },
  };
}

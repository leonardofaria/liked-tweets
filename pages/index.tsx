import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Tweet from '../components/Tweet';
import { Tweet as TweetProps } from '../types';
import Pagination from '../components/Pagination';
import { getPagination } from '../lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

type Props = {
  tweets: TweetProps[]
  count: number
  page: number
}

export default function Tweets({ tweets, count, page }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const onChangePage = (page: number): void => setCurrentPage(page);
  
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

export async function getServerSideProps({ query: { page = 1 } }) {
  const { from, to } = getPagination(page, 10);
  const { data, count } = await supabase
    .from('tweets')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })
    .range(from, to);
    
  return {
    props: {
      tweets: data,
      count: count,
      page: +page,
    },
  };
}

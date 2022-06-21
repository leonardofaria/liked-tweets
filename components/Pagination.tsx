import { default as RcPagination } from 'rc-pagination';
import { ReactNode } from 'react';

type Props = {
  onChange: (page: number) => void
  current: number
  total: number
}

export default function Pagination({
  onChange,
  current,
  total
}: Props) {
  const itemRender = (current: number, type: string, element: ReactNode) => {
    if (type === 'prev') {
      return (
        <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span className="sr-only">Previous</span>
          
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
    
    if (type === 'next') {
      return (
        <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span className="sr-only">Next</span>
          
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }

    if (type === 'page') {
      return <span aria-current="page" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">{current}</span>
    }

    return element;
  };

  const showTotal = (total: number, range: number[]) => (
    <span className="text-sm text-gray-700 p-2">{range[0]} - {range[1]} of {total} items</span>
  );

  return (
    <div className="py-6 flex items-center border-t border-gray-200 sm:px-6">
      <RcPagination
        showTotal={showTotal}
        onChange={onChange}
        itemRender={itemRender}
        current={current}
        total={total}
        className="flex items-center justify-center flex-grow rounded-md -space-x-px"
      />
    </div>
  )
}
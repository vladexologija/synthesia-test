import { Link } from 'react-router-dom'
import { PagingParams } from '../utils/string'

type Props = {
  pagingParams: PagingParams | undefined
}

const Footer = ({ pagingParams } : Props) => {
  return (
    <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        {pagingParams?.['prev'] && (
          <Link
            to={{
              pathname: '/',
              search: new URLSearchParams({
                page: pagingParams?.['prev'],
              }).toString(),
            }}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Previous
          </Link>
        )}
         {pagingParams?.['next'] && (
          <Link
            to={{
              pathname: '/',
              search: new URLSearchParams({ page: pagingParams?.['next'], }).toString(),
            }}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}

export default Footer

import { Link } from 'react-router-dom'
import API, { Photo } from '../utils/API'

interface Props {
  item: Photo
}
const ListItem = ({ item }: Props) => {
  const { id, author } = item

  return (
    <tr key={id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-64 p-4">
        <div className="flex items-center">
        <Link
          to={id} >
           <img alt='preview' src={API.getSquareURL(id)} />
        </Link>
        </div>
      </td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {author}
        </div>
      </td>

      <td className="p-4 space-x-2 whitespace-nowrap">
        <Link
          to={id}
          type="button"
          id="updateProductButton"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Edit
        </Link>
      </td>
    </tr>
  )
}

export default ListItem

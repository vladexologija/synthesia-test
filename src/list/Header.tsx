import React, { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

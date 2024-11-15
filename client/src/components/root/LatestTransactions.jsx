import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { renderHash, renderAmount, renderDuration } from '../../lib';

function LatestTransactions({ data, isLoading, unixTime }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow relative">
      <div className="px-4 py-5 sm:p-6">
        <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    colSpan="3"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <h2 className="text-base">Latest Transactions</h2>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <Skeleton type="latestTransactions" />
                ) : (
                  data.transactions.map(({ hash, from, to, value, timestamp }) => (
                    <tr key={hash}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-2 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <ClipboardDocumentListIcon
                              aria-hidden="true"
                              className="text-gray-400 h-11 w-11 bg-gray-50 p-2 rounded-lg"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-blue-700">
                              <Link to={`/transaction/${hash}`}>{renderHash(hash)}</Link>
                            </div>
                            <div className="mt-1 text-gray-500">
                              {renderDuration(timestamp, unixTime)} ago
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">From: {renderHash(from)}</div>
                        <div className="text-gray-900">To: {renderHash(to)}</div>
                      </td>
                      <td className="whitespace-nowrap pr-1 py-5 text-sm text-gray-500">
                        <div className="text-gray-900 text-right">
                          <span className="rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                            {renderAmount(value, 'Eth')}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestTransactions;

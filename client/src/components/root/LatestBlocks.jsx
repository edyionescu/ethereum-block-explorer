import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';
import { CubeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { renderHash, renderDuration } from '../../lib';

function LatestBlocks({ data, isLoading, countDown, unixTime }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm relative">
      <div className="px-4 py-5 sm:p-6">
        <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    colSpan="2"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <h2 className="text-base">
                      Latest Blocks
                      <span className="float-right text-sm text-gray-400 font-normal leading-6">
                        {countDown > 0 ? (
                          countDown
                        ) : (
                          <ArrowPathIcon
                            aria-hidden="true"
                            className="h-3.5 w-3.5 animate-spin inline-block -mt-1"
                          />
                        )}
                      </span>
                    </h2>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <Skeleton type="latestBlocks" />
                ) : (
                  data.blocks.map(({ number, miner, transactions, timestamp, prevTimestamp }, idx) => (
                    <tr key={number}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 shrink-0">
                            <CubeIcon
                              aria-hidden="true"
                              className="text-gray-400 h-11 w-11 bg-gray-50 p-2 rounded-lg"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-blue-700">
                              <Link to={`/block/${number}`}>{number}</Link>
                            </div>
                            <div className="mt-1 text-gray-500">
                              {renderDuration(timestamp, unixTime)} ago
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">Miner: {renderHash(miner)}</div>
                        <div className="mt-1 text-gray-500">
                          <Link to={`/block/${number}`} className="text-blue-700">
                            {transactions} txns
                          </Link>{' '}
                          in{' '}
                          {prevTimestamp > 0
                            ? renderDuration(prevTimestamp, timestamp)
                            : renderDuration(
                                data.blocks[idx - 1].prevTimestamp,
                                data.blocks[idx - 1].timestamp
                              )}
                          {/* 'prevTimestamp' of block #1 is zero, so get the duration of block #2, since it is mostly constant */}
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

export default LatestBlocks;

import { Link } from 'react-router-dom';
import { ClockIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, Battery50Icon } from '@heroicons/react/16/solid';

import GasTarget from './GasTarget';
import { renderAmount, renderPercentage, renderDateTime, renderDuration, renderHash } from '../../lib';
import Skeleton from '../Skeleton';
import Error from '../Error';

function BlockDetails({ number, data, isLoading, isSuccess, isError, error }) {
  let overview, transactions;
  if (isSuccess) {
    overview = data.block.overview;
    transactions = data.block.transactions;
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 bg-gray-50 inline-block rounded-lg px-3 py-1 -ml-3">
            Block <span className="text-base text-gray-600 font-normal ml-0.5">#{number}</span>
          </h2>
        </div>
        <div className="border-t border-gray-100">
          {isLoading ? (
            <Skeleton type="block" />
          ) : isError ? (
            <Error code={500} error={error} />
          ) : (
            <dl>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Block Height:</dt>
                <dd className="flex mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="inline-flex items-center pr-1">{overview.height}</span>
                  <Link
                    to={`/block/${overview.height - 1 < 0 ? overview.height : overview.height - 1}`}
                    className={`inline-flex items-center rounded-md px-0.5 py-0.5 ml-1 ${
                      overview.height - 1 >= 0
                        ? ' text-gray-900 bg-gray-200'
                        : 'text-gray-400 bg-gray-100 cursor-default'
                    }`}
                    title={`${
                      overview.height - 1 >= 0 ? 'View previous block' : 'You have reached the genesis block'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </Link>
                  <Link
                    to={`/block/${overview.isLatest ? overview.height : overview.height + 1}`}
                    className={`inline-flex items-center rounded-md px-0.5 py-0.5 ml-1 ${
                      !overview.isLatest
                        ? ' text-gray-900 bg-gray-200'
                        : 'text-gray-400 bg-gray-100 cursor-default'
                    }`}
                    title={`${!overview.isLatest ? 'View next block' : 'You have reached the latest block'}`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </Link>
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600 leading-6">Status:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {overview.isFinalized ? (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <CheckCircleIcon aria-hidden="true" className="h-3.5 w-3.5 inline-block" />
                      Finalized
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-900">
                      <Battery50Icon aria-hidden="true" className="h-3.5 w-3.5 inline-block" />
                      Unfinalized
                    </span>
                  )}
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {overview.timestamp === 0 ? (
                    0
                  ) : (
                    <>
                      <ClockIcon aria-hidden="true" className="-mt-1 h-4 w-4 inline-block" />{' '}
                      {renderDuration(overview.timestamp)} ago ({renderDateTime(overview.timestamp)})
                    </>
                  )}
                </dd>
              </div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Hash:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{overview.hash}</dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Parent Hash:</dt>
                <dd className="mt-1 text-sm text-blue-700 sm:col-span-2 sm:mt-0">
                  <Link to={`/block/${overview.height - 1}`}>{overview.parentHash}</Link>
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Transactions:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactions.length} transactions in this block
                </dd>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Fee Recipient:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{overview.feeRecipient}</dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Total Difficulty:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{overview.difficulty}</dd>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              {overview.gasUsed > 0 && (
                <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-600">Gas Used:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 relative">
                    {renderAmount(overview.gasUsed)}{' '}
                    <span className="text-gray-600">
                      ({renderPercentage({ value: overview.gasUsed / overview.gasLimit })})
                    </span>
                    <GasTarget
                      gasUsedFromTarget={overview.gasUsedFromTarget}
                      gasUsedExceededTarget={overview.gasUsedExceededTarget}
                    />
                  </dd>
                </div>
              )}

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Gas Limit:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {renderAmount(overview.gasLimit)}
                </dd>
              </div>

              {overview.baseFeePerGas > 0 && (
                <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-600">Base Fee Per Gas:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {overview.baseFeePerGas} ETH{' '}
                    <span className="text-gray-600">({overview.baseFeePerGasGwei} Gwei)</span>
                  </dd>
                </div>
              )}

              {overview.burntFees > 0 && (
                <div className="px-4 py-2.5 pb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-600">Burnt fees:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="-ml-1 mr-0.5">🔥</span>
                    {overview.burntFees} ETH{' '}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>

      {isLoading ? (
        <Skeleton type="transactionsList" />
      ) : (
        isSuccess &&
        transactions.length > 0 && (
          <div className="overflow-hidden rounded-lg bg-white shadow relative mt-5 mb-20">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-2 text-right text-sm font-semibold text-gray-900"
                          ></th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Transaction Hash
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Block
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Age
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            From
                          </th>
                          <th scope="col" className="py-3.5"></th>
                          <th
                            scope="col"
                            className="pl-10 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            To
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {transactions.map(({ idx, hash, from, to, value }) => (
                          <tr key={hash}>
                            <td className="whitespace-nowrap py-4 px-2 text-xs text-gray-500 text-right">
                              {idx}
                            </td>
                            <td
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-blue-700 sm:pl-6 lg:pl-8"
                              title={hash}
                            >
                              <Link to={`/transaction/${hash}`}>{renderHash(hash)}</Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{number}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                              {renderDuration(overview.timestamp)} ago
                            </td>
                            <td className="whitespace-nowrap pl-3 py-4 text-sm text-gray-800" title={from}>
                              {renderHash(from)}
                            </td>
                            <td className="whitespace-nowrap py-4 text-center">
                              <ArrowLongRightIcon
                                aria-hidden="true"
                                className="h-6 w-6 bg-emerald-50 text-emerald-600 border-emerald-300 border px-0.5 rounded-full"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 pl-11 text-sm text-gray-800" title={to}>
                              {to?.length ? (
                                renderHash(to)
                              ) : (
                                <span className="rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                  Contract Created
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                              {renderAmount(value, 'ETH')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default BlockDetails;

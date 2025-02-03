import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  Battery50Icon,
  XCircleIcon,
} from '@heroicons/react/16/solid';

import { renderAmount, renderPercentage, renderDuration, renderDateTime } from '../../lib';
import Skeleton from '../Skeleton';
import Error from '../Error';

function TransactionDetails({ transaction, isLoading, isSuccess, isError, error }) {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-semibold leading-7 text-gray-900 bg-gray-50 inline-block rounded-lg px-3 py-1 -ml-3">
          Transaction Details
        </h2>
      </div>
      <div className="border-t border-gray-100">
        {isLoading ? (
          <Skeleton type="transaction" />
        ) : isError ? (
          <Error code={500} error={error} />
        ) : (
          isSuccess && (
            <dl>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Transaction Hash:</dt>
                <dd className="flex mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="inline-flex items-center pr-1">{transaction.hash}</span>
                  <Link
                    to={`/transaction/${transaction.prevHash ?? transaction.hash}`}
                    className={`inline-flex items-center rounded-md px-0.5 py-0.5 ml-1 ${
                      transaction.prevHash
                        ? ' text-gray-900 bg-gray-200'
                        : 'text-gray-400 bg-gray-100 cursor-default'
                    }`}
                    title={`${
                      transaction.prevHash
                        ? 'View previous transaction'
                        : 'You have reached the first transaction in the block'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </Link>
                  <Link
                    to={`/transaction/${transaction.nextHash ?? transaction.hash}`}
                    className={`inline-flex items-center rounded-md px-0.5 py-0.5 ml-1 ${
                      transaction.nextHash
                        ? ' text-gray-900 bg-gray-200'
                        : 'text-gray-400 bg-gray-100 cursor-default'
                    }`}
                    title={`${
                      transaction.nextHash
                        ? 'View next transaction'
                        : 'You have reached the latest transaction in the block'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </Link>
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600 leading-6">Status:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transaction.status ? (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <CheckCircleIcon aria-hidden="true" className="h-3.5 w-3.5 inline-block" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                      <XCircleIcon aria-hidden="true" className="h-3.5 w-3.5 inline-block" />
                      Fail
                    </span>
                  )}
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Block:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="text-blue-700">
                    {transaction.block.isFinalized ? (
                      <span className="inline-block pr-1 text-green-700" title="Finalized">
                        <CheckCircleIcon aria-hidden="true" className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="inline-block pr-1 text-gray-900" title="Unfinalized">
                        <Battery50Icon aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link>
                    <span className="ml-2 text-xs inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                      <span className="text-gray-950 ml-1">
                        {transaction.confirmations} Block Confirmations
                      </span>
                    </span>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600"> Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ClockIcon aria-hidden="true" className="-mt-1 h-4 w-4 inline-block" />{' '}
                  {renderDuration(transaction.block.timestamp)} ago (
                  {renderDateTime(transaction.block.timestamp)})
                </dd>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">From:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction.from}</dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Interacted With (To):</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transaction.to?.length ? (
                    transaction.to
                  ) : (
                    <span className="rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                      Contract Created
                    </span>
                  )}
                </dd>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Value:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  ⟠ {renderAmount(transaction.value, 'ETH', 20)}
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Transaction Fee:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {renderAmount(
                    (transaction.effectiveGasPriceGwei * transaction.gasUsed) / 10 ** 9,
                    'ETH',
                    20
                  )}
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Gas Price:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {renderAmount(transaction.effectiveGasPriceGwei, 'Gwei', 20)}
                  <span className="text-gray-500 px-1">
                    ({renderAmount(transaction.effectiveGasPriceEth, 'ETH', 20)})
                  </span>
                </dd>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Gas Limit & Usage by Txn:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {renderAmount(transaction.gasLimit)} <span className="text-gray-400 px-1">|</span>{' '}
                  {renderAmount(transaction.gasUsed)} (
                  {renderPercentage({ value: transaction.gasUsed / transaction.gasLimit })})
                </dd>
              </div>
              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Gas Fees:</dt>
                <dd className="flex mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="text-gray-500 pr-1"> Base:</span>
                  {renderAmount(transaction.block.baseFeePerGasGwei, 'Gwei', 20)}
                  <span className="px-1.5 mx-1.5 border-x border-x-gray-400">
                    <span className="text-gray-500 pr-1"> Max:</span>
                    {renderAmount(transaction.maxFeePerGasGwei, 'Gwei', 20)}
                  </span>
                  <span className="text-gray-500 pr-1">Max Priority:</span>
                  {renderAmount(
                    transaction.maxPriorityFeePerGasGwei,
                    transaction.maxPriorityFeePerGasGwei > 0 ? 'Gwei' : 'ETH',
                    20
                  )}
                </dd>
              </div>

              <div className="px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Burnt Fees:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="text-xs inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-950 ring-1 ring-inset ring-gray-500/10">
                    <span className="-ml-1 mr-0.5">🔥</span>
                    {transaction.burntFees} ETH
                  </span>
                </dd>
              </div>

              <div className="px-4 py-2.5 pb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-600">Other Attributes:</dt>
                <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="text-xs inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                    Tx Type:{' '}
                    <span className="text-gray-950 ml-1">
                      {transaction.txType} {transaction.txType > 1 ? '(EIP-1559)' : '(Legacy)'}
                    </span>
                  </span>
                  <span className="text-xs ml-2 inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                    Nonce: <span className="text-gray-950 ml-1">{transaction.nonce}</span>
                  </span>
                  <span className="text-xs ml-2 inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                    Position In Block:{' '}
                    <span className="text-gray-950 ml-1">
                      {transaction.positionInBlock} / {transaction.transactionsInBlock - 1}
                    </span>
                  </span>
                </dd>
              </div>
            </dl>
          )
        )}
      </div>
    </div>
  );
}

export default TransactionDetails;

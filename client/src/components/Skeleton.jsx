import { CubeIcon, ArrowLongRightIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

function Skeleton({ type }) {
  switch (type) {
    case 'latestBlocks': {
      return <SkeletonLatestBlocks />;
    }
    case 'latestTransactions': {
      return <SkeletonLatestTransactions />;
    }
    case 'block': {
      return <SkeletonBlock />;
    }
    case 'transactionsList': {
      return <SkeletonTransactionsList />;
    }
    case 'transaction': {
      return <SkeletonTransaction />;
    }
    default:
      return <>Loading...</>;
  }
}

function SkeletonBlock() {
  return (
    <div role="status" className="animate-pulse">
      <dl>
        <div className="px-4 py-3.5 mt-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-24 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-16 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-56 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-96 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-96 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-48 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>

        <div className="border-t border-gray-100 my-3"></div>

        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-56 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-8 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>

        <div className="border-t border-gray-100 my-3"></div>

        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-52 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-20 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-28 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-56 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 pb-8 mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-36 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
      </dl>
      <span className="sr-only">Loading block details...</span>
    </div>
  );
}

function SkeletonTransactionsList() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm relative mt-5 mb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div role="status" className="animate-pulse">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-4 px-2"></th>
                      <th scope="col" className="py-4 pl-4 pr-3 sm:pl-6 lg:pl-8">
                        <div className="w-28 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                      <th scope="col" className="px-3 py-4">
                        <div className="w-12 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                      <th scope="col" className="px-3 py-4">
                        <div className="w-8 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                      <th scope="col" className="px-3 py-4">
                        <div className="w-8 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                      <th scope="col" className="py-4"></th>
                      <th scope="col" className="pl-6 py-4">
                        <div className="w-4 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                      <th scope="col" className="px-3 py-4">
                        <div className="w-12 h-2.5 bg-gray-300 rounded-full"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[...Array(10).keys()].map((idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 px-2 text-right">
                          <div className="w-4 h-2.5 bg-gray-200 rounded-full inline-block"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 lg:pl-8">
                          <div className="w-28 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div className="w-28 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="whitespace-nowrap pl-3 py-4">
                          <div className="w-32 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="whitespace-nowrap py-4 text-center">
                          <ArrowLongRightIcon
                            aria-hidden="true"
                            className="h-6 w-6 bg-emerald-50 text-emerald-600 border-emerald-300 border px-0.5 rounded-full"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 pl-6">
                          <div className="w-32 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <span className="sr-only">Loading transactions list...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonTransaction() {
  return (
    <div role="status" className="animate-pulse">
      <dl>
        <div className="px-4 py-3.5 mt-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-32 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-96 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-16 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-14 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-44 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-52 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>

        <div className="border-t border-gray-100 my-3"></div>

        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-14 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-56 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-32 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-60 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>

        <div className="border-t border-gray-100 my-3"></div>

        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-12 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-10 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-32 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-60 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>

        <div className="border-t border-gray-100 my-3"></div>

        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-36 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-32 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-80 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-40 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
        <div className="px-4 py-2.5 pb-8 mt-3.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <div className="w-24 h-2.5 bg-gray-200 rounded-full"></div>
          </dt>
          <dd className="flex mt-1 sm:col-span-2 sm:mt-0">
            <div className="w-60 h-2.5 bg-gray-300 rounded-full"></div>
          </dd>
        </div>
      </dl>
      <span className="sr-only">Loading transaction details...</span>
    </div>
  );
}

function SkeletonLatestBlocks() {
  return (
    <>
      {[...Array(5).keys()].map((idx) => (
        <tr key={idx} role="status" className="animate-pulse">
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="h-11 w-11 shrink-0">
                <CubeIcon aria-hidden="true" className="text-gray-400 h-11 w-11 bg-gray-50 p-2 rounded-lg" />
              </div>
              <div className="ml-3">
                <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5"></div>
            <div className="w-36 h-2 bg-gray-200 rounded-full"></div>
          </td>
        </tr>
      ))}
    </>
  );
}

function SkeletonLatestTransactions() {
  return (
    <>
      {[...Array(5).keys()].map((idx) => (
        <tr key={idx} role="status" className="animate-pulse">
          <td className="whitespace-nowrap py-5 pl-4 pr-2 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="h-11 w-11 shrink-0">
                <ClipboardDocumentListIcon
                  aria-hidden="true"
                  className="text-gray-400 h-11 w-11 bg-gray-50 p-2 rounded-lg"
                />
              </div>
              <div className="ml-3">
                <div className="h-2.5 bg-gray-300 rounded-full w-28 mb-2.5"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <div className="h-2.5 bg-gray-300 rounded-full w-36 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </td>
          <td className="whitespace-nowrap pr-1 py-5 text-sm text-gray-500">
            <div className="h-2.5 bg-gray-300 rounded-full w-20 mb-2.5"></div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default Skeleton;

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestBlocks, SECOND } from '../queries';

import LatestBlocks from '../components/root/LatestBlocks';
import LatestTransactions from '../components/root/LatestTransactions';
import Error from '../components/Error';

function Root() {
  const [countDown, setCountDown] = useState(0);
  const [unixTime, setUnixTime] = useState(Date.now());

  // average time taken in seconds for a block to be included in the Ethereum blockchain is 30 sec
  // https://etherscan.io/chart/blocktime
  const REFETCH_INTERVAL = 30;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['latest-blocks'],
    queryFn: fetchLatestBlocks,
    refetchInterval: REFETCH_INTERVAL * SECOND,
    refetchIntervalInBackground: false,
  });

  useEffect(
    function count() {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      if (countDown == 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    },
    [countDown]
  );

  useEffect(
    function reset() {
      if (isSuccess) {
        setCountDown(REFETCH_INTERVAL);
        setUnixTime(Date.now());
      }
    },
    [data, isSuccess]
  );

  return isError ? (
    <Error code={500} error={error} />
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <LatestBlocks data={data} isLoading={isLoading} countDown={countDown} unixTime={unixTime} />
      <LatestTransactions data={data} isLoading={isLoading} unixTime={unixTime} />
    </div>
  );
}

export default Root;

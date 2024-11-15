import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import BlockDetails from '../components/block/BlockDetails';
import { fetchBlock } from '../queries';

function Block() {
  const { number } = useParams();

  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: ['block', number],
    queryFn: fetchBlock,
  });

  return (
    <BlockDetails
      number={number}
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
}

export default Block;

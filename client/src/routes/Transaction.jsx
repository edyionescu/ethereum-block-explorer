import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchTransaction } from '../queries';
import TransactionDetails from '../components/transaction/TransactionDetails';

function Transaction() {
  const { hash } = useParams();

  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: ['transaction', hash],
    queryFn: fetchTransaction,
  });

  const { transaction } = data ?? {};

  return (
    <TransactionDetails
      transaction={transaction}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
}

export default Transaction;

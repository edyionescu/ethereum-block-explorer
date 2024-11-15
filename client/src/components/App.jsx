import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Root from '../routes/Root';
import Block from '../routes/Block';
import Transaction from '../routes/Transaction';
import Error from './Error';

import { HOUR, MINUTE } from '../queries';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 'staleTime' determines how long the fetched data is considered fresh
      // blocks and transactions can change their statuses and number of confirmations during this time
      staleTime: 1 * MINUTE,
      // "garbage collect" time kicks in as soon as the query becomes unused
      // After the time has passed, data will be "garbage collected" to avoid the cache from growing.
      gcTime: 1 * HOUR,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
          <h1 className="ml-4 mb-6 text-3xl font-bold tracking-tight text-gray-900">
            <Link to="/">Ethereum Block Explorer</Link>
          </h1>

          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/block/:number" element={<Block />} />
            <Route path="/transaction/:hash" element={<Transaction />} />
            <Route path="*" element={<Error code="404" />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

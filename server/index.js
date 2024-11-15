import express from 'express';
import cors from 'cors';
import { getLatestBlocks, getBlockDetails, getTransactionDetails, PORT } from './lib/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/latest-blocks', async (req, res) => {
  const response = {
    error: '',
    blocks: [],
    transactions: [],
  };

  try {
    const { blocks, transactions } = await getLatestBlocks();
    response.blocks = blocks;
    response.transactions = transactions;
  } catch (error) {
    console.log(error);
    response.error = `${error.name}: ${error.message}`;

    res.status(500).send(response);
    return;
  }

  res.send(response);
});

app.get('/block', async (req, res) => {
  const response = {
    error: '',
    block: {
      overview: {},
      transactions: {},
    },
  };

  const { number } = req.query;

  if (!number) {
    response.error = 'Invalid block number';
    console.log(response.error);

    res.status(500).send(response);
    return;
  } else {
    try {
      response.block = await getBlockDetails(number);
    } catch (error) {
      console.log(error);
      response.error = `${error.name}: ${error.message}`;

      res.status(500).send(response);
      return;
    }
  }

  res.send(response);
});

app.get('/transaction', async (req, res) => {
  const response = {
    error: '',
    transaction: {},
  };

  const { hash } = req.query;

  if (!hash) {
    response.error = 'Invalid transaction hash';
    console.log(response.error);

    res.status(500).send(response);
    return;
  } else {
    try {
      response.transaction = await getTransactionDetails(hash);
    } catch (error) {
      console.log(error);
      response.error = `${error.name}: ${error.message}`;

      res.status(500).send(response);
      return;
    }
  }

  res.send(response);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

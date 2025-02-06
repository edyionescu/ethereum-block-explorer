import { config } from '@dotenvx/dotenvx';
config();
const { PORT, ALCHEMY_API_KEY } = process.env;

import { Alchemy, Network, Utils } from 'alchemy-sdk';

const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

async function _getBlocksInRange({ from, to }) {
  const blocks = [];
  for (let id = from; id <= to; id++) {
    blocks.push(await alchemy.core.getBlockWithTransactions(id));
  }
  return blocks;
}

async function getLatestBlocks() {
  const latestBlocks = [];
  const latestTransactions = [];
  const currentBlock = await alchemy.core.getBlockNumber();

  (
    await _getBlocksInRange({
      from: currentBlock - 4, // latest 5 blocks
      to: currentBlock,
    })
  ).forEach(({ number, timestamp, miner, transactions }, idxBlock, blocksInRange) => {
    timestamp = timestamp * 1000;

    latestBlocks.push({
      number,
      timestamp,
      prevTimestamp: (blocksInRange[idxBlock - 1]?.timestamp ?? 0) * 1000,
      miner,
      transactions: transactions.length,
    });

    if (idxBlock == blocksInRange.length - 1) {
      transactions.reverse().some(({ hash, from, to, value }, idxTransaction) => {
        latestTransactions.push({
          hash,
          timestamp,
          from,
          to,
          value: Utils.formatEther(value),
        });

        return idxTransaction == 4; // latest 5 transactions
      });
    }
  });

  return {
    blocks: latestBlocks.reverse(),
    transactions: latestTransactions,
  };
}

async function getBlockDetails(blockNumber) {
  const { number: finalizedBlock } = await alchemy.core.getBlock('finalized');
  const { number: latestBlock } = await alchemy.core.getBlock('latest');

  const ethersProvider = await alchemy.config.getProvider();

  const {
    number: height,
    hash,
    parentHash,
    timestamp,
    transactions,
    miner: feeRecipient,
    difficulty,
    gasLimit: gasLimitBigNumber,
    gasUsed: gasUsedBigNumber,
    baseFeePerGas: baseFeePerGasBigNumber,
  } = await alchemy.core.getBlockWithTransactions(Number(blockNumber));

  const gasLimit = gasLimitBigNumber.toString();
  const gasUsed = gasUsedBigNumber.toString();
  // Each block has a target size of 15 million gas
  // https://ethereum.org/en/developers/docs/gas/#block-size
  // However, the gas limit has recently increased and varies,
  // so we will set the gas target to be half of the gas limit.
  const gasTarget = gasLimit / 2;
  const gasUsedExceededTarget = gasUsed > gasTarget;
  const gasUsedFromTarget = Math.abs(1 - gasUsed / gasTarget);

  const baseFeePerGas = Utils.formatEther(baseFeePerGasBigNumber ?? 0);
  const baseFeePerGasGwei = Utils.formatUnits(baseFeePerGasBigNumber ?? 0, 'gwei');

  const block = {
    overview: {
      height,
      isFinalized: height <= finalizedBlock,
      isLatest: height == latestBlock,
      latestBlock,
      hash,
      parentHash,
      timestamp: timestamp * 1000,
      feeRecipient,
      difficulty,
      gasLimit,
      gasUsed,
      gasUsedFromTarget,
      gasUsedExceededTarget,
      baseFeePerGas,
      baseFeePerGasGwei,
      burntFees: baseFeePerGas * gasUsed,
    },
    transactions: transactions
      .map((tx, idx) => ({
        ...tx,
        idx,
        value: Utils.formatEther(tx.value),
        gasLimit: Utils.formatUnits(tx.gasLimit ?? 0, 'wei'),
        gasUsed: Utils.formatUnits(tx.gasUsed ?? 0, 'wei'),
        maxFeePerGasGwei: Utils.formatUnits(tx.maxFeePerGas ?? 0, 'gwei'),
        maxPriorityFeePerGasGwei: Utils.formatUnits(tx.maxPriorityFeePerGas ?? 0, 'gwei'),
      }))
      .reverse(),
  };

  return block;
}

async function getTransactionDetails(hash) {
  const transactionReceipt = await alchemy.core.getTransactionReceipt(hash);

  const {
    transactionHash: currentHash,
    blockNumber,
    confirmations,
    from,
    to,
    status,
    gasUsed: gasUsedBigNumber,
    cumulativeGasUsed: cumulativeGasUsedBigNumber,
    effectiveGasPrice: effectiveGasPriceBigNumber,
    type: txType,
    transactionIndex: positionInBlock,
  } = transactionReceipt;

  const { overview, transactions } = await getBlockDetails(blockNumber);
  const { isFinalized, timestamp, baseFeePerGas, baseFeePerGasGwei } = overview;
  const { value, gasLimit, maxFeePerGasGwei, maxPriorityFeePerGasGwei, nonce } = transactions.find(
    (tx) => tx.hash == currentHash
  );

  // transactions were previously reversed, so we need to reset the needle
  const currentPosition = transactions.length - 1 - positionInBlock;
  const gasUsed = gasUsedBigNumber.toString();

  const transaction = {
    hash: currentHash,
    nextHash: transactions[currentPosition - 1]?.hash,
    prevHash: transactions[currentPosition + 1]?.hash,
    blockNumber,
    block: {
      isFinalized,
      timestamp,
      baseFeePerGasGwei,
    },
    confirmations,
    from,
    to,
    value,
    status,
    gasLimit,
    gasUsed,
    cumulativeGasUsed: cumulativeGasUsedBigNumber.toString(),
    effectiveGasPrice: effectiveGasPriceBigNumber.toString(),
    effectiveGasPriceGwei: Utils.formatUnits(effectiveGasPriceBigNumber, 'gwei'),
    effectiveGasPriceEth: Utils.formatEther(effectiveGasPriceBigNumber),
    maxFeePerGasGwei,
    maxPriorityFeePerGasGwei,
    burntFees: baseFeePerGas * gasUsed,
    txType,
    nonce,
    positionInBlock,
    transactionsInBlock: transactions.length,
  };

  return transaction;
}

export { getLatestBlocks, getBlockDetails, getTransactionDetails, PORT };

import { intervalToDuration } from 'date-fns';

function renderHash(address) {
  if (!address) {
    return '';
  }
  // e.g. 0x3C44C...293BC
  return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
}

function renderAmount(amount, coin = '', maximumFractionDigits = 5) {
  if (amount === undefined) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  return `${formatter.format(amount)} ${coin}`.trim();
}

function renderPercentage({ value, minimumFractionDigits = 0, maximumFractionDigits = 2 }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(value);
}

function renderDateTime(timestamp) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'UTC',
  });

  return formatter.format(new Date(timestamp));
}

function renderDuration(startUnix, endUnix = Date.now()) {
  const duration = intervalToDuration({
    start: new Date(startUnix),
    end: new Date(endUnix),
  });

  let count = 0;
  let unit = 'seconds';

  for (const prop in duration) {
    const value = duration[prop];

    if (value > 0) {
      count = value;
      unit = prop;
      break;
    }
  }

  if (count == 1) {
    unit = unit.slice(0, -1); // singular
  }

  return `${count} ${unit}`;
}

export { renderHash, renderAmount, renderPercentage, renderDateTime, renderDuration };

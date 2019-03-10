const formatNumber = number => parseFloat(number).toLocaleString()

export const formatNumberWithMinFractionDigits = (
  number,
  minimumFractionDigits = 2,
) => parseFloat(number).toLocaleString(undefined, { minimumFractionDigits })

export const formatNumberWithMaxFractionDigits = (
  number,
  maximumFractionDigits = 2,
) => parseFloat(number).toLocaleString(undefined, { maximumFractionDigits })

export const formatNumberRange = (min, max) =>
  `${formatNumber(min)} - ${formatNumber(max)}`

export default formatNumber

export const numberMetricFormat = (num: string | number) =>
  typeof num === 'undefined'
    ? 'rəqəm deyil'
    : Intl.NumberFormat().format(Number(num))

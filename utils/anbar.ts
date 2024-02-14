export const numberMetricFormat = (num: string | undefined | number) => {
  if (typeof num === 'undefined') {
    return 'rəqəm deyil'
  } else {
    return Intl.NumberFormat().format(Number(num || 0))
  }
}

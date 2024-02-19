export const numberMetricFormat = (num: string | undefined | number) => {
  if (typeof num === 'undefined') {
    return 'rəqəm deyil'
  } else {
    const intlNumber = Intl.NumberFormat().format(Number(num || 0))
    return Number(intlNumber).toFixed(2)
  }
}

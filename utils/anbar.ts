export const numberMetricFormat = (num: string | number) => {
  if (typeof num === 'undefined') {
    return 'rəqəm deyil'
  } else {
    console.log(Intl.NumberFormat().format(Number('9.50')))

    const intlNumber = Intl.NumberFormat().format(Number(num))
    return Number(intlNumber)
  }
}

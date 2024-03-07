import React from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const Spinner: ({
  top,
  left,
}: {
  top?: number | undefined
  left?: number | undefined
}) => React.JSX.Element = ({ top, left }: { top?: number; left?: number }) => {
  if (top || left) {
    return (
      <div
        className={spinnerStyles.spinner}
        style={{ top: `${top}%`, left: `${left}%` }}
      />
    )
  } else {
    return <div className={spinnerStyles.spinner} style={{ top: `40%` }} />
  }
}

export default Spinner

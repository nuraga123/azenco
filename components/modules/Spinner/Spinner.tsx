import React from 'react'
import styles from '@/styles/spinner/index.module.scss'

const Spinner: ({
  top,
  left,
  widthPX,
  heightPX,
  loadingText,
  margins,
}: {
  top?: number | undefined
  left?: number | undefined
  widthPX?: number | undefined
  heightPX?: number | undefined
  loadingText?: string
  margins?: string | '0 auto'
}) => React.JSX.Element = ({
  top,
  left,
  widthPX = 30,
  heightPX = 30,
  loadingText = '',
  margins = '0 auto',
}: {
  top?: number
  left?: number
  widthPX?: number | undefined
  heightPX?: number | undefined
  loadingText?: string
  margins?: string | '0 auto'
}) => {
  if (top || left || widthPX) {
    return (
      <>
        <div
          className={styles.spinner}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${widthPX}px`,
            height: `${heightPX}px`,
            margin: `${margins}`,
          }}
        />
        <h1 className={styles.text}>{loadingText}</h1>
      </>
    )
  } else {
    return <div className={styles.spinner} style={{ top: `40%` }} />
  }
}

export default Spinner

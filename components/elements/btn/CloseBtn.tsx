import React from 'react'
import styles from '@/styles/btn/index.module.scss'

export interface IBtnProps {
  fn: () => void
  text?: string | JSX.Element
}

const CloseBtn: React.FC<IBtnProps> = ({ fn }) => (
  <button className={styles.close} onClick={fn}>
    X
  </button>
)

export default CloseBtn

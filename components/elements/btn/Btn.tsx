import React from 'react'
import styles from '@/styles/btn/index.module.scss'
import { IBtnProps } from './CloseBtn'

function Btn({ text, fn }: IBtnProps) {
  return (
    <button className={styles.default} onClick={fn}>
      {text}
    </button>
  )
}

export default Btn

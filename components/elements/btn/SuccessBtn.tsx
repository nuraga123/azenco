import React from 'react'
import { IBtnProps } from './CloseBtn'
import styles from '@/styles/btn/index.module.scss'

const SuccessBtn = ({ fn, text }: IBtnProps) => (
  <button className={styles.success} onClick={fn}>
    {text ? text : ''}
  </button>
)

export default SuccessBtn

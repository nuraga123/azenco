import React from 'react'
import styles from '@/styles/btn/index.module.scss'
import { IBtnProps } from './CloseBtn'

const EditBtn: React.FC<IBtnProps> = ({ fn, text }) => (
  <button className={styles.edit} onClick={fn}>
    {text}
  </button>
)

export default EditBtn

import React from 'react'
import styles from '@/styles/anbar/index.module.scss'

const AnbarItem = ({ item }: { item: string }) => {
  console.log(item)
  return (
    <div className={styles.c}>
      <div>{item}</div>
    </div>
  )
}

export default AnbarItem

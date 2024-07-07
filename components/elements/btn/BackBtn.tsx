import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

import styles from '@/styles/btn/index.module.scss'

const BackBtn = () => {
  const router = useRouter()
  const backClick = () => router.back()
  return (
    <button className={styles.btn__back} onClick={backClick}>
      <IoMdArrowRoundBack />
    </button>
  )
}

export default BackBtn

import Link from 'next/link'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

import styles from '@/styles/barn/index.module.scss'

const BackBtn = ({ href, text }: { href?: string; text?: string }) => (
  <button className={styles.barn__btn_back}>
    <Link href={`/${href}`} className={styles.barn__btn_back}>
      <IoMdArrowRoundBack />
      <h5>{text}</h5>
    </Link>
  </button>
)

export default BackBtn

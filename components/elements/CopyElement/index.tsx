import { useState } from 'react'
import { FaCopy, FaRegCopy } from 'react-icons/fa6'
import styles from '@/styles/catalog/index.module.scss'

const CopyElement = ({ str }: { str: string }) => {
  const [copy, setCopy] = useState(false)

  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str)
      setCopy(true)
      setTimeout(() => setCopy(false), 1000)
    } catch (err) {
      alert('Ошибка при копировании в буфер обмена')
      console.log(err)
    }
  }

  const copyElement = copy ? <FaCopy /> : <FaRegCopy />

  return (
    <button
      onClick={() => copyToClipboard(str)}
      className={styles.catalog__list__item__copy}
    >
      {copyElement}
    </button>
  )
}

export default CopyElement

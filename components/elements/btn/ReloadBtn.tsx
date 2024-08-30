import { useRouter } from 'next/router'
import { FiRefreshCcw } from 'react-icons/fi'

import styles from '@/styles/btn/index.module.scss'

const ReloadBtn = ({ text = '' }: { text?: string | undefined }) => {
  const router = useRouter()

  return (
    <button className={styles.reload} onClick={() => router.reload()}>
      <FiRefreshCcw size={24} className={styles.svg} />
      {` ${typeof text === 'undefined' ? '' : text}`}
    </button>
  )
}

export default ReloadBtn

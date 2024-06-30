import { useEffect, useState, ReactNode } from 'react'
import { getWorkingServer } from '@/app/api/auth'

import styles from '@/styles/auth/header__auth.module.scss'

const HeaderAuth = ({ children }: { children: ReactNode }) => {
  const [isServerRunning, setIsServerRunning] = useState<boolean>(false)

  useEffect(() => {
    const getServerStatus = async () => {
      try {
        const response: boolean = await getWorkingServer()
        setIsServerRunning(response)
      } catch (error) {
        console.log('Error:', error)
      }
    }

    const intervalId = setInterval(getServerStatus, 2000)
    return () => clearInterval(intervalId)
  }, [isServerRunning])

  return (
    <div className={styles.container}>
      <div className={styles.statusWrapper}>
        <div
          className={`${styles.statusIndicator} ${
            isServerRunning ? styles.serverRunning : styles.serverDown
          }`}
        />
        <p className={styles.statusMessage}>
          {isServerRunning ? 'server işləyir 😊' : 'server işləmir 😞'}
        </p>
      </div>
      {children}
    </div>
  )
}

export default HeaderAuth

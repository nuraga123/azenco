import { useEffect, useState, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getWorkingServerFx } from '@/app/api/auth'
import styles from '@/styles/auth/header__auth.module.scss'

const ServerStatusComponent = ({ children = '' }: { children?: ReactNode }) => {
  const router = useRouter()
  const [openServerBrn, setOpenServerBrn] = useState(false)

  const [serverStatus, setServerStatus] = useState<
    'loading' | 'running' | 'offline'
  >('loading')

  useEffect(() => {
    const getServerStatus = async () => {
      setServerStatus('loading')

      try {
        const response: boolean = await getWorkingServerFx()

        setTimeout(() => {
          if (response) {
            setServerStatus('running')
          } else {
            setServerStatus('offline')
            router.push('404')
          }
        }, 5000)
      } catch (error) {
        console.log('Error:', error)
        setTimeout(() => setServerStatus('offline'), 1000)
      }
    }

    const intervalId = setInterval(getServerStatus, 10000)
    return () => clearInterval(intervalId)
  }, [router, serverStatus])

  return (
    <div className={styles.container}>
      <div
        className={styles.statusWrapper}
        onClick={() => setOpenServerBrn(!openServerBrn)}
      >
        {serverStatus === 'loading' && (
          <div
            className={`${styles.statusIndicator} ${styles.serverLoading}`}
          />
        )}

        {serverStatus === 'running' && (
          <div
            className={`${styles.statusIndicator} ${styles.serverRunning}`}
          />
        )}
        {serverStatus === 'offline' && (
          <div
            className={`${styles.statusIndicator} ${styles.serverOffline}`}
          />
        )}
        <p className={styles.statusMessage}>
          {serverStatus === 'loading' && 'Server yoxlanılır... ⏳'}
          {serverStatus === 'running' && 'Server işləyir 😊'}
          {serverStatus === 'offline' && 'Server işləmir 😞'}
        </p>

        {openServerBrn && (
          <Link
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}`}
            passHref
            legacyBehavior
          >
            <a className={styles.btn} target="_blank" rel="noopener noreferrer">
              🖥️
            </a>
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}

export default ServerStatusComponent

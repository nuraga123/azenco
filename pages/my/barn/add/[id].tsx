import { useEffect } from 'react'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import BarnForm from '@/components/templates/BarnsPage/BarnForm'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'
import { getBarnById } from '@/app/api/barn'

const AddStocksBarn = () => {
  const { asPath, query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(asPath, query)

  useEffect(() => {
    const installBarn = async () => {
      const barn = await getBarnById(8)
      console.log(asPath, query)
      console.log(barn)
    }

    installBarn()
  }, [asPath, query])

  // Отображаем спиннер, если происходит загрузка или контент не должен загружаться
  if (!shouldLoadContent) {
    return (
      <Layout title={`spinner`}>
        <div
          className={spinnerStyles.spinner}
          style={{
            width: '100px',
            height: '100px',
            top: '40%',
          }}
        />
      </Layout>
    )
  }

  return (
    <Layout title={`Anbara material əlavə edin`}>
      <div>
        <button className={styles.barn__btn_back}>
          <Link href="/my/barn" className={styles.barn__btn_back}>
            <IoMdArrowRoundBack />
          </Link>
        </button>

        <div className={styles.barn_container}>
          <h1>Anbara material əlavə edin</h1>

          <div>adi:</div>
        </div>

        <BarnForm />
      </div>
    </Layout>
  )
}

export default AddStocksBarn

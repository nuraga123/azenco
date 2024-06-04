import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import BarnForm from '@/components/templates/BarnsPage/BarnForm'
import Layout from '@/components/layout/Layout'
import MaterialComponent from '@/components/templates/BarnsPage/MaterialComponent'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'
import { getBarnById } from '@/app/api/barn'
import { IBarnItem } from '@/types/barn'
import { toast } from 'react-toastify'

const AddStocksBarn = () => {
  const { asPath, query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(asPath, query)
  const [barnData, setBarnData] = useState({} as IBarnItem)

  useEffect(() => {
    const installBarn = async () => {
      const { barn } = await getBarnById(8)
      console.log(barn)
      if (barn) setBarnData(barn)
      else toast.warning('нет амбара')
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
            width: 100,
            height: 100,
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
          <MaterialComponent barn={barnData} />
        </div>

        <BarnForm />
      </div>
    </Layout>
  )
}

export default AddStocksBarn

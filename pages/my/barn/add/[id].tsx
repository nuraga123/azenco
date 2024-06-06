import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getBarnById } from '@/app/api/barn'
import { IBarnItem } from '@/types/barn'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Layout from '@/components/layout/Layout'
import BarnForm from '@/components/templates/BarnsPage/BarnForm'
import MaterialComponent from '@/components/templates/BarnsPage/MaterialComponent'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'

const AddStocksBarn = () => {
  const { asPath, query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(asPath, query)
  const [barnData, setBarnData] = useState({} as IBarnItem)

  useEffect(() => {
    const installBarn = async () => {
      const barnId = Number(query?.id)
      if (barnId) {
        const { barn } = await getBarnById(barnId)
        const zz = await getBarnById(barnId)
        console.log(zz)
        if (barn) setBarnData(barn)
        else toast.warning('нет амбара')
      }
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

        <h1 style={{ margin: '10px 0px', textAlign: 'center' }}>
          Anbara material əlavə edin {barnData.username}
        </h1>
        <h4 style={{ margin: '10px 0px', textAlign: 'center' }}>
          Anbardar: {barnData.username}
        </h4>

        <div className={styles.barn__container}>
          <MaterialComponent barn={barnData} />
          <BarnForm />
        </div>
      </div>
    </Layout>
  )
}

export default AddStocksBarn

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
//import MaterialComponent from '@/components/templates/BarnsPage/MaterialComponent'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'
// import MaterialComponent from '@/components/templates/BarnsPage/MaterialComponent'

const AddStocksBarn = () => {
  const { asPath, query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(asPath, query)
  const [barnData, setBarnData] = useState({} as IBarnItem)

  const barnId = Number(query?.id)
  useEffect(() => {
    const installBarn = async () => {
      if (barnId) {
        const { barn } = await getBarnById(barnId)
        const zz = await getBarnById(barnId)
        console.log(zz)
        if (barn) setBarnData(barn)
        else toast.warning('нет амбара')
      }
    }

    installBarn()
  }, [asPath, barnId, query])

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
        <div className={styles.barn__header}>
          <button className={styles.barn__btn_back}>
            <Link href="/my/barn" className={styles.barn__btn_back}>
              <IoMdArrowRoundBack />
            </Link>
          </button>
          <h2 style={{ textAlign: 'center' }}>
            Anbarda materialın miqdarının artırılması formasının uçotu
          </h2>
          <p style={{ marginRight: 10 }}>Anbardar: {barnData.username}</p>
        </div>

        <div className={styles.barn__container}>
          <BarnForm barnId={barnId} />
          {/* <MaterialComponent barn={barnData} /> */}
        </div>
      </div>
    </Layout>
  )
}

export default AddStocksBarn

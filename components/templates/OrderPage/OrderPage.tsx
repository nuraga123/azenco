import { useRouter } from 'next/router'

import Head from '@/components/elements/Head/Head'

import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const router = useRouter()
  const { asPath } = router

  return (
    <section className={styles.order}>
      <Head headTitle="Sifarişlər" />
      <div className={styles.container}>
        <div className={styles.wrapper__btn}>
          <button
            className={`${styles.btn} ${styles.btn__my}`}
            onClick={() => router.push(`${asPath}/my`)}
          >
            Mənim sifarişlərim
          </button>

          <button
            className={`${styles.btn} ${styles.btn__their}`}
            onClick={() => router.push(`${asPath}/their`)}
          >
            Digər anbar-istifadəçilərdən gələn sifarişlər
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderPage

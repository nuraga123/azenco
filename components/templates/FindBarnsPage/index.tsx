import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import { postFindBarnsOfProductFx } from '@/app/api/barn'
import BackBtn from '@/components/elements/btn/BackBtn'
import BarnCard from '@/components/modules/BarnCard/index'
import Spinner from '@/components/modules/Spinner/Spinner'
import { $find_barns } from '@/context/find_barns'
import { IBarnItem } from '@/types/barn'

import styles from '@/styles/barns/find/index.module.scss'

const FindBarnsPage = () => {
  const router = useRouter()
  const { azencoCode, productId, productName } = useStore($find_barns)

  const [spinner, setSpinner] = useState<boolean>(false)
  const [barns, setBarns] = useState<IBarnItem[]>([])

  useEffect(() => {
    const fetchBarns = async () => {
      setSpinner(true)
      try {
        const dataBarns = await postFindBarnsOfProductFx({
          productId,
          productName,
          azencoCode,
        })

        setBarns(dataBarns.barns || [])
      } catch (error) {
        console.error('Xəta baş verdi: ', error)
        toast.error((error as Error).message)
      } finally {
        setSpinner(false)
      }
    }

    fetchBarns()
  }, [azencoCode, productId, productName])

  if (!productName) {
    toast.warning('Anbar tapılmadı')
    router.back()
    return null
  }

  if (spinner) {
    return <Spinner />
  }

  return (
    <div className={styles.barns}>
      <div className={styles.head}>
        <BackBtn />
        <h1 className={styles.title}>Anbar Səhifəsi</h1>
      </div>

      <div className={styles.details}>
        <div className={styles.infoLabel}>Axtarılan Material:</div>
        <div className={styles.infoContent}>
          <div>
            Məhsulun adı: <strong>{productName}</strong>
          </div>
          <div>
            Azenco kodu: <strong>{azencoCode}</strong>
          </div>
          <div>
            Məhsul ID: <strong>{productId}</strong>
          </div>
        </div>
      </div>

      <div className={styles.items}>
        {barns.map((barn: IBarnItem) => (
          <BarnCard key={barn.id} barn={barn} />
        ))}
      </div>
    </div>
  )
}

export default FindBarnsPage

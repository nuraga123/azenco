import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getBarnById } from '@/app/api/barn'
import { deleteMaterialBarn } from '@/app/api/barn'
import { IBarnItem } from '@/types/barn'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Layout from '@/components/layout/Layout'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/form/delete/index.module.scss'
import ReduceMaterial from '@/components/templates/BarnsPage/MaterialComponent/ReduceMaterial'

const DeleteBarn = () => {
  const router = useRouter()
  const { asPath, query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  const [barnData, setBarnData] = useState({} as IBarnItem)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false) // Для управления видимостью модального окна

  const barnId = Number(query?.id)

  useEffect(() => {
    const installBarn = async () => {
      if (barnId) {
        try {
          const { barn } = await getBarnById(barnId)
          if (barn) setBarnData(barn)
          else {
            toast.warning('Anbarda material yoxdur')
            router.push('/my')
          }
        } catch (err) {
          setError('Xəta baş verdi!')
          console.log(err)
        }
      }
    }

    installBarn()
  }, [asPath, barnId, query, router])

  const handleDelete = async () => {
    if (barnId) {
      setLoading(true)
      try {
        await deleteMaterialBarn(barnId)
        toast.success('Anbar uğurla silindi!')
        setOpenDeleteModal(false) // Закрытие модального окна после успешного удаления
        router.push('/my')
      } catch (err) {
        toast.error('Silinmə zamanı xəta baş verdi!')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }

  // Отображаем спиннер, если происходит загрузка или контент не должен загружаться
  if (!shouldLoadContent) {
    return (
      <Layout title="Yüklənir...">
        <div className={spinnerStyles.spinnerContainer}>
          <div
            className={spinnerStyles.spinner}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Anbara material əlavə edin">
      <div>
        <div className={styles.barn__header}>
          <h2>Anbarda olan materialın silinmə formasının uçotu</h2>
          <p>Anbardar: {barnData.username}</p>
        </div>
        <div className={styles.wrapper__btn}>
          <ReduceMaterial
            barn={barnData}
            newStockDynamic={0}
            usedStockDynamic={0}
            brokenStockDynamic={0}
          />
          <div className={styles.barn__actions}>
            {error && <p className={styles.error}>{error}</p>}
            <button
              className={styles.deleteButton}
              onClick={() => setOpenDeleteModal(true)} // Открытие модального окна
              disabled={loading}
            >
              {loading ? 'Silinir...' : 'Anbarı sil'}
            </button>
          </div>
        </div>

        {/* Добавьте затемнение и модальное окно */}
        {openDeleteModal && (
          <>
            <div
              className={styles.overlay}
              onClick={() => setOpenDeleteModal(false)}
            />
            <div className={styles.deleteModal}>
              <h3>Anbarı silmək istəyirsiniz?</h3>
              <div className={styles.deleteModal__actions}>
                <button onClick={handleDelete} disabled={loading}>
                  {loading ? 'Silinir...' : 'Sil'}
                </button>
                <button onClick={() => setOpenDeleteModal(false)}>
                  İmtina
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default DeleteBarn

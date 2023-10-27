import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import CartAlert from '@/components/modules/DashboardPage/CartAlert.ts'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/dashboard/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DashboardPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [spinner, setSpiner] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(!!1)

  useEffect(() => {
    loadBoilerParts()
  }, [])

  const loadBoilerParts = async () => {
    try {
      setSpiner(true)
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/boiler-parts/bestsellers'
      )
      setBestsellers(bestsellers)

      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')
      setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpiner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={`${styles.dashboard}`}>
      <div className={`container`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          products
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Bestsellers
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            New products
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={styles.styles__about}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            About
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            hello world
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage

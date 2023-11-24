import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import { $shoppingCart } from '@/context/shopping-cart'
import { $mode } from '@/context/mode'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import styles from '@/styles/dashboard/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const DashboardPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [showAlert, setShowAlert] = useState<boolean>(!!1)
  const closeAlert = () => setShowAlert(false)

  const shoppingCart = useStore($shoppingCart)
  const countShoppingCart = shoppingCart.reduce(
    (defaultCount, item) => defaultCount + item.count,
    0
  )

  const [count, setCount] = useState<number>()
  const [spinner, setSpiner] = useState<boolean>(false)

  const simulateProductCountChange = () => {
    setSpiner(true)

    setTimeout(() => {
      setCount(countShoppingCart)
      setSpiner(false)
    }, 2000) // Задержка в 2 секунды
  }

  useEffect(() => {
    simulateProductCountChange()
  }, [])

  // const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  // const [bestsellers, setBestsellers] = useState<IBoilerParts>(
  //   {} as IBoilerParts
  // )

  // const [spinner, setSpiner] = useState<boolean>(false)

  // useEffect(() => {
  //   loadBoilerParts()
  // }, [])

  // const loadBoilerParts = async () => {
  //   try {
  //     setSpiner(true)
  //     const bestsellers = await getBestsellersOrNewPartsFx(
  //       '/boiler-parts/bestsellers'
  //     )
  //     setBestsellers(bestsellers)

  //     const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')
  //     setNewParts(newParts)
  //   } catch (error) {
  //     toast.error((error as Error).message)
  //   } finally {
  //     setSpiner(false)
  //   }
  // }

  return (
    <section className={`${styles.dashboard}`}>
      <div className={`container`}>
        {spinner ? (
          <div
            className={spinnerStyles.spinner}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.dashboard__alert} ${darkModeClass}`}
              >
                <CartAlert count={count || 0} closeAlert={closeAlert} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {/*
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
        </div> */}
      </div>
    </section>
  )
}

export default DashboardPage

import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Footer from '@/components/modules/Footer/Footer'
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm'
import styles from '@/styles/contacts/index.module.scss'

const ContactsPage = ({ isWholesaleBuyersPage = false }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          {isWholesaleBuyersPage ? 'Topdan alıcılar üçün' : 'Kontaktlar'}
        </h2>
        <div className={styles.contacts__inner}>
          {isWholesaleBuyersPage ? (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                <span>
                  Условия оптовых заказов решаются индивидуально по телефону:{' '}
                </span>
                <span>+7 (555) 55-55-555</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обртной связи и мы с вами
                свяжемся.
              </p>
            </div>
          ) : (
            <Footer />
          )}
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ContactsPage

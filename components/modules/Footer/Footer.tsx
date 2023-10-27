import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'

import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'

const Footer = () => {
  console.log(Accordion, useMediaQuery)
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__top__item}>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
            >
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д....</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="tel:+994503416736"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>Наш контактный телефон: </span>
                  <span>+994 (50) 341-67-36</span>
                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="mailto:azenco@gmail.com"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>E-mail:</span>
                  <span>azenco@gmail.com</span>
                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

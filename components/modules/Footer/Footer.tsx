import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'

import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'

const Footer = () => {
  const screenHeight: number = 300

  return (
    <footer
      className={styles.footer}
      style={{ height: screenHeight, borderRadius: 10 }}
    >
      <div className={styles.footer__container}>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__top__item}>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
            >
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Ünvanımız:</span>
                    <span>Mexkalon</span>
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
                  <span>Əlaqə telefonumuz:</span>
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

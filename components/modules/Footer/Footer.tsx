import React from 'react'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import BackBtn from '@/components/elements/btn/BackBtn'

import styles from '@/styles/footer/index.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__container}>
      <h2 className={styles.footer__top__item__title}>
        Proqramla bağlı sualınız olarsa əlaqə saxlaya bilərsiniz
      </h2>
      <h3 className={styles.footer__top__item__title}>Kontaktlar</h3>
      <div className={styles.footer__bottom}>
        <div className={styles.footer__top__item}>
          <ul
            className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
          >
            <li className={styles.footer__top__item__list__item}>
              <div className={styles.footer__top__item__list__item__link}>
                <div>Ünvanımız:</div>
                <br />
                <div>Mexkalon</div>
                <span>
                  <MarkerSvg />
                </span>
              </div>
            </li>

            <li className={styles.footer__top__item__list__item}>
              <div className={styles.footer__top__item__list__item__link}>
                <div>Əlaqə telefonumuz:</div>
                <br />
                <h3>+994 (50) 341-67-36</h3>
                <span>
                  <PhoneSvg />
                </span>
              </div>
            </li>

            <li className={styles.footer__top__item__list__item}>
              <div className={styles.footer__top__item__list__item__link}>
                <div>E-mail:</div>
                <br />
                <h3>nuragayusifli@gmail.com</h3>
                <span>
                  <MailSvg />
                </span>
              </div>
            </li>
          </ul>

          <BackBtn />
        </div>
      </div>
    </div>
  </footer>
)

export default Footer

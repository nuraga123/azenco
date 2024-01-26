/* eslint-disable @next/next/no-img-element */
import React from 'react'
import AnbarImg from '@/public/img/garage-icon.jpg'
import styles from '@/styles/anbar/index.module.scss'
import {Anbars} from '@/types/anbar'


const AnbarPage = () => {
  const serverData: Anbars  = {
    AnbarUsers: [
      {
        username: 'ferid',
        id: 1,
        anbar: [
          { 
            userId: 1,
            productId: 1,
            name: 'des',
            type: 'des',
            price: 77.44,
            unit: 'des',
            azenco__code: 'des',
            images: 'des',
            createdAt: 'des',
            updatedAt: 'des',
          },
          {
            userId: 1,
            productId: 2,
            name: 'des 2',
            type: 'des',
            price: 10.88,
            unit: 'des',
            azenco__code: 'des',
            images: 'des',
            createdAt: 'des',
            updatedAt: 'des',
          },        
        ]
      },
    
      {
        id: 2,
        
        username: 'tural',
        anbar: [
          {
            userId: 2,
            productId: 3,
            name: 'des 3',
            type: 'des',
            price: 15.7,
            unit: 'des',
            azenco__code: 'des',
            images: 'des',
            createdAt: 'des',
            updatedAt: 'des',
          },
          {
            userId: 2,
            productId: 4,
            name: 'des 4',
            type: 'des',
            price: 77.55,
            unit: 'des',
            azenco__code: 'des',
            images: 'des',
            createdAt: 'des',
            updatedAt: 'des',
          },
        ],
      },
    ]
  }

  return (
    <div className={styles.anbar}>
      <h1 className={styles.title}>Anbar Page</h1>

      <div className={styles.anbar__items}>
        {serverData.Anbars.map((el, index) => (
          <li key={index} className={styles.anbar__item}>
            <div className={styles.container}>
              <img src={AnbarImg.src} alt="d" width={50} height={35} />
              Anbar {el.username}
            </div>
            <div>
              {el.anbar.map((product, indexProduct) => (
                
              ))}
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default AnbarPage

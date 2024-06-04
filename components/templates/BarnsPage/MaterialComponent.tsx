import React from 'react'
import Image from 'next/image'
import { IBarnItem } from '@/types/barn'
import styles from '@/styles/barn/material/index.module.scss'

const MaterialComponent = ({ barn }: { barn: IBarnItem }) => {
  console.log(barn)

  const {
    id,
    productName,
    type,
    unit,
    img,
    location,
    newStock,
    usedStock,
    brokenStock,
    totalStock,
    price,
    newTotalPrice,
    usedTotalPrice,
    brokenTotalPrice,
    totalPrice,
    lostNewStock,
    lostUsedStock,
    lostBrokenStock,
    lostTotalStock,
    lostNewTotalPrice,
    lostUsedTotalPrice,
    lostBrokenTotalPrice,
    lostTotalPrice,
    createdAt,
    updatedAt,
    username,
    azencoCode,
    userId,
    productId,
  } = barn

  return (
    <div className={styles.material}>
      <div className={styles.material__image}>
        <Image src={img} alt={productName} width={200} height={200} />
      </div>
      <div className={styles.material__details}>
        <h2>{productName}</h2>

        <p className={styles.detail}>Тип: {type}</p>

        <p className={styles.detail}>Единица измерения: {unit}</p>

        <p className={styles.detail}>Новый запас: {newStock}</p>

        <p className={styles.detail}>Использованный запас: {usedStock}</p>

        <p className={styles.detail}>Поврежденный запас: {brokenStock}</p>

        <p className={styles.detail}>Общий запас: {totalStock}</p>

        <p className={styles.detail}>Цена: {price}</p>

        <p className={styles.detail}>Общая стоимость: {totalPrice}</p>

        <p className={styles.detail}>Дата создания: {createdAt}</p>

        <p className={styles.detail}>Дата обновления: {updatedAt}</p>

        <p className={styles.detail}>Местоположение: {location}</p>

        <p className={styles.detail}>Пользователь: {username}</p>

        <p className={styles.detail}>Код Azenco: {azencoCode}</p>

        <p className={styles.detail}>ID: {id}</p>

        <p className={styles.detail}>ID пользователя: {userId}</p>

        <p className={styles.detail}>ID продукта: {productId}</p>

        <p className={styles.detail}>Потерянный новый запас: {lostNewStock}</p>

        <p className={styles.detail}>
          Потерянный использованный запас: {lostUsedStock}
        </p>

        <p className={styles.detail}>
          Потерянный поврежденный запас: {lostBrokenStock}
        </p>

        <p className={styles.detail}>
          Потерянный общий запас: {lostTotalStock}
        </p>

        <p className={styles.detail}>
          Потерянная общая стоимость: {lostTotalPrice}
        </p>

        <p className={styles.detail}>
          Потерянная стоимость нового: {lostNewTotalPrice}
        </p>

        <p className={styles.detail}>
          Потерянная стоимость использованного: {lostUsedTotalPrice}
        </p>

        <p className={styles.detail}>
          Потерянная стоимость поврежденного: {lostBrokenTotalPrice}
        </p>

        <p className={styles.detail}>Общая стоимость нового: {newTotalPrice}</p>

        <p className={styles.detail}>
          Общая стоимость использованного: {usedTotalPrice}
        </p>

        <p className={styles.detail}>
          Общая стоимость поврежденного: {brokenTotalPrice}
        </p>
      </div>
    </div>
  )
}

export default MaterialComponent

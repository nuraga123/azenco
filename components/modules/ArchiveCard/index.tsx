// components/ArchiveCard.tsx
import React from 'react'
import styles from '@/styles/archive/card/index.module.scss'
import { dateFormater } from '@/utils/dateFormater'

export interface ArchiveData {
  id: number
  barnId: number
  userId: number
  username: string
  userSelectedDate: string
  movementType: string
  fromLocation: string
  toLocation: string
  message: string
  productName: string
  azencoCode: string
  unit: string
  price: string
  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  driverName: string | null
  carNumber: string | null
  createdAt: string
  updatedAt: string
  senderName: string
  recipientName: string
}

interface ArchiveCardProps {
  data: ArchiveData
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ data }) => {
  const {
    id,
    barnId,
    username,
    userSelectedDate,
    movementType,
    fromLocation,
    toLocation,
    message,
    productName,
    azencoCode,
    unit,
    price,
    newStock,
    usedStock,
    brokenStock,
    totalStock,
    lostNewStock,
    lostUsedStock,
    lostBrokenStock,
    lostTotalStock,
    driverName,
    carNumber,
    createdAt,
    updatedAt,
    senderName,
    recipientName,
  } = data

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Arxiv qeydi</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <span className={styles.key}>ID:</span>
          <span className={styles.value}>{+id}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Anbar ID:</span>
          <span className={styles.value}>{barnId}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>İstifadəçi adı:</span>
          <span className={styles.value}>{username}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>İstifadəçinin Seçdiyi Tarix:</span>
          <span className={styles.value}>{userSelectedDate}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Hərəkət növü:</span>
          <span className={styles.value}>{movementType}</span>
        </div>
        {fromLocation && (
          <div className={styles.item}>
            <span className={styles.key}>Hansi ünvanından gəldi:</span>
            <span className={styles.value}>{fromLocation}</span>
          </div>
        )}
        {toLocation && (
          <div className={styles.item}>
            <span className={styles.key}>Hansı ünvana çatdırılıb:</span>
            <span className={styles.value}>{toLocation}</span>
          </div>
        )}
        <div className={styles.item}>
          <span className={styles.key}>Təsviri:</span>
          <span className={styles.value}>{message}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Məhsul adı:</span>
          <span className={styles.value}>{productName}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Azenco Code:</span>
          <span className={styles.value}>{azencoCode}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Vahid:</span>
          <span className={styles.value}>{unit}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Qiymət:</span>
          <span className={styles.value}>{+price}</span>
        </div>
        {+newStock ? (
          <div className={styles.item}>
            <span className={styles.key}>Yeni materialın miqdarı:</span>
            <span className={styles.value}>{+newStock}</span>
          </div>
        ) : (
          ''
        )}

        {+usedStock ? (
          <div className={styles.item}>
            <span className={styles.key}>İşlənmiş materialın miqdarı:</span>
            <span className={styles.value}>{+usedStock}</span>
          </div>
        ) : (
          ''
        )}

        {+brokenStock ? (
          <div className={styles.item}>
            <span className={styles.key}>Yararsız materialın miqdarı:</span>
            <span className={styles.value}>{+brokenStock}</span>
          </div>
        ) : (
          ''
        )}
        <div className={styles.item}>
          <span className={styles.key}>Ümumi miqdar:</span>
          <span className={styles.value}>{+totalStock}</span>
        </div>
        {+lostTotalStock ? (
          <>
            <div className={styles.item}>
              <span className={styles.key}>İtirilmiş yeni miqdar:</span>
              <span className={styles.value}>{+lostNewStock}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.key}>İtirilmiş İşlənmiş miqdar:</span>
              <span className={styles.value}>{+lostUsedStock}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.key}>İtirilmiş Yararsız miqdar:</span>
              <span className={styles.value}>{+lostBrokenStock}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.key}>İtirilmiş Ümumi miqdar:</span>
              <span className={styles.value}>{+lostTotalStock}</span>
            </div>
          </>
        ) : (
          <div className={styles.item}>
            <span className={styles.key}>İtirilmiş Ümumi miqdar: </span>
            <span className={styles.value}>itki yoxdur</span>
          </div>
        )}
        <div className={styles.item}>
          <span className={styles.key}>Sürücü adı:</span>
          <span className={styles.value}>{driverName || 'yoxdur'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>göndərənin adı:</span>
          <span className={styles.value}>{senderName || 'yoxdur'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>alıcı adı:</span>
          <span className={styles.value}>{recipientName || 'yoxdur'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.key}>Avtomobil nömrəsi:</span>
          <span className={styles.value}>{carNumber || 'yoxdur'}</span>
        </div>
        {createdAt === updatedAt ? (
          <div className={styles.item}>
            <span className={styles.key}>Yaradılmışdır:</span>
            <span className={styles.value}>{dateFormater(createdAt)}</span>
          </div>
        ) : (
          <>
            <div className={styles.item}>
              <span className={styles.key}>Yaradılmışdır:</span>
              <span className={styles.value}>{dateFormater(createdAt)}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.key}>Yenilənib:</span>
              <span className={styles.value}>{dateFormater(updatedAt)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ArchiveCard

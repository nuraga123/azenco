import React, { useState } from 'react'
import { IBarnItem } from '@/types/barn'

import styles from '@/styles/barn/material/index.module.scss'

export interface IMaterialComponentProps {
  barn: IBarnItem
  newStockDynamic?: number
  usedStockDynamic?: number
  brokenStockDynamic?: number
}

const MaterialComponent = ({
  barn,
  newStockDynamic = 0,
  usedStockDynamic = 0,
  brokenStockDynamic = 0,
}: IMaterialComponentProps) => {
  const [showDetails, setShowDetails] = useState(true)

  const {
    id,
    azencoCode,
    productName,
    unit,
    price,
    location,
    newStock,
    usedStock,
    brokenStock,
    totalStock,
    newTotalPrice,
    usedTotalPrice,
    brokenTotalPrice,
    totalPrice,
  } = barn

  const newStockResult = newStockDynamic ? +newStockDynamic + +newStock : ''

  const usedStockResult = usedStockDynamic ? +usedStockDynamic + +usedStock : ''

  const brokenStockResult = newStockDynamic
    ? +brokenStockDynamic + +brokenStock
    : ''

  const totalStockDynamic = () => {
    const total = +newStockResult + +usedStockResult + +brokenStockResult
    console.log(total)
  }

  const dynamicPrice = (prevStock: number, dynamicStock: number) =>
    (+prevStock + +dynamicStock) * +price

  const TableBarnElement = ({
    title = '',
    value = '',
    dynamicValue = '',
  }: {
    title: string
    value: string | number
    dynamicValue?: string | number
  }) => (
    <tr>
      <th>{title}</th>
      <td>
        <b>
          <i>{dynamicValue ? `[ ${+dynamicValue + +value} ]` : +value}</i>
        </b>
      </td>
    </tr>
  )

  const TableBarnCharacteristic = () => (
    <div className={styles.material__details}>
      <table className={styles.table}>
        <tbody>
          <TableBarnElement title={'Anbarin I.D.'} value={id} />
          <TableBarnElement title={'Azenco Kodu'} value={azencoCode} />
          <TableBarnElement title={'Materialın Adı'} value={productName} />
          <TableBarnElement title={'Ölçü vahidi'} value={unit} />
          <TableBarnElement title={'Qiymət'} value={+price} />
          <TableBarnElement title={'Ünvanı'} value={location} />
        </tbody>
      </table>
    </div>
  )

  const TableBarnCalculations = () => (
    <div className={styles.material__details}>
      <table className={styles.table}>
        <tbody>
          <TableBarnElement
            title={'Yeni miqdar'}
            value={+newStock}
            dynamicValue={+newStockDynamic + +newStock}
          />

          <TableBarnElement
            title={'İstifadə olunmuş miqdar'}
            value={+usedStock}
            dynamicValue={+usedStockDynamic + +usedStock}
          />

          <TableBarnElement
            title={'Zədələnmiş miqdar'}
            value={+brokenStock}
            dynamicValue={+brokenStockDynamic + +brokenStock}
          />

          <TableBarnElement
            title={'Ümumi miqdar'}
            value={+totalStock}
            dynamicValue={+totalStockDynamic}
          />

          <TableBarnElement
            title={'Yeni məbləğ'}
            value={+newTotalPrice}
            dynamicValue={dynamicPrice(+newStock, newStockDynamic)}
          />

          <TableBarnElement
            title={'İstifadə olunmuş məbləğ'}
            value={+usedTotalPrice}
            dynamicValue={dynamicPrice(+usedStock, usedStockDynamic)}
          />

          <TableBarnElement
            title={'Zədələnmiş məbləğ'}
            value={+brokenTotalPrice}
            dynamicValue={dynamicPrice(+brokenStock, brokenStockDynamic)}
          />

          <TableBarnElement
            title={'Ümumi məbləğ'}
            value={+totalPrice}
            dynamicValue={dynamicPrice(+totalStockDynamic, 0)}
          />
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={styles.material}>
      <div className={styles.material__switch}>
        <button
          onClick={() => setShowDetails(true)}
          className={showDetails ? styles.active : ''}
        >
          Hesablamalar
        </button>
        <button
          onClick={() => setShowDetails(false)}
          className={!showDetails ? styles.active : ''}
        >
          Xüsusiyyətlər
        </button>
      </div>
      {showDetails ? <TableBarnCalculations /> : <TableBarnCharacteristic />}
    </div>
  )
}

export default MaterialComponent

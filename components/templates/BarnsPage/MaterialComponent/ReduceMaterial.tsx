import React, { useState, useMemo } from 'react'
import { IBarnItem } from '@/types/barn'

import styles from '@/styles/barn/material/index.module.scss'
import { toast } from 'react-toastify'

export interface IMaterialComponentProps {
  barn: IBarnItem
  newStockDynamic?: number
  usedStockDynamic?: number
  brokenStockDynamic?: number
}

const ReduceMaterial = ({
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

  const newStockResult = useMemo(() => {
    if (+newStock - +newStockDynamic > -0.001) {
      console.log(+newStock - +newStockDynamic)
      return +newStock - +newStockDynamic
    } else {
      if (+newStockDynamic !== 0) {
        toast.warning('çox yeni material götürdünüz !')
      }

      return +newStock
    }
  }, [newStock, newStockDynamic])

  const usedStockResult = useMemo(() => {
    if (+usedStock - +usedStockDynamic > -0.001) {
      return +usedStock - +usedStockDynamic
    } else {
      if (+usedStockDynamic !== 0) {
        toast.warning('çox İstifadə olunmuş material götürdünüz !')
      }

      return +usedStock
    }
  }, [usedStock, usedStockDynamic])

  const brokenStockResult = useMemo(() => {
    if (+brokenStock - +brokenStockDynamic > -0.001) {
      return +brokenStock - +brokenStockDynamic
    } else {
      if (+brokenStockDynamic !== 0) {
        toast.warning('çox yararsız material götürdünüz !')
      }

      return +brokenStock
    }
  }, [brokenStock, brokenStockDynamic])

  const resultTotalDynamic: number =
    +newStockDynamic + +usedStockDynamic + +brokenStockDynamic

  console.log('resultTotalDynamic')
  console.log(resultTotalDynamic)

  const totalStockResult = useMemo(
    () => +totalStock - +resultTotalDynamic,
    [totalStock, resultTotalDynamic]
  )

  const dynamicPrice = (prevStock: number, dynamicStock: number) => {
    const sum = +prevStock - +dynamicStock
    console.log('sum')
    console.log(sum)

    return +sum * +price
  }

  const TableBarnElement = ({
    isString = false,
    title = '',
    value = '',
    dynamicValue = '',
  }: {
    isString?: boolean
    title: string
    value: string | number
    dynamicValue?: string | number
  }) => (
    <tr>
      <th>{title}</th>
      <td>
        {isString ? (
          <b>
            <i>{value}</i>
          </b>
        ) : (
          <b>
            <i>{+dynamicValue > -1 ? dynamicValue : value}</i>
          </b>
        )}
      </td>
    </tr>
  )

  const TableBarnCharacteristic = () => (
    <div className={styles.material__details}>
      <table className={styles.table}>
        <tbody>
          <TableBarnElement isString={true} title={'Anbarin I.D.'} value={id} />
          <TableBarnElement
            isString={true}
            title={'Azenco Kodu'}
            value={azencoCode}
          />
          <TableBarnElement
            isString={true}
            title={'Materialın Adı'}
            value={productName}
          />
          <TableBarnElement isString={true} title={'Ünvanı'} value={location} />
        </tbody>
      </table>
    </div>
  )

  const TableBarnCalculations = () => (
    <div className={styles.material__details}>
      <table className={styles.table}>
        <tbody>
          <TableBarnElement
            isString={true}
            title={'Ölçü vahidi'}
            value={unit}
          />
          <TableBarnElement isString={true} title={'Qiymət'} value={+price} />
          <TableBarnElement
            title={'Yeni miqdar'}
            value={+newStock}
            dynamicValue={newStockResult}
          />
          <TableBarnElement
            title={'İstifadə olunmuş miqdar'}
            value={+usedStock}
            dynamicValue={+usedStockResult}
          />
          <TableBarnElement
            title={'Zədələnmiş miqdar'}
            value={+brokenStock}
            dynamicValue={+brokenStockResult}
          />
          <TableBarnElement
            title={'Ümumi miqdar'}
            value={+totalStock}
            dynamicValue={+totalStockResult}
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
            dynamicValue={dynamicPrice(+totalStockResult, 0)}
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

export default ReduceMaterial

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { IProduct } from '@/types/products'
import styles from '@/styles/products/index.module.scss'

const ProductImg = ({ data, id }: { data: IProduct[]; id: number }) => {
  const [open, setOpen] = useState<boolean>(false)
  const showPicture = () => setOpen(true)
  const closePicture = () => setOpen(false)

  const urlImg = data.find((el) => el.id === id)?.img || ''

  return (
    <>
      {!open && (
        <img
          style={{ cursor: 'pointer' }}
          src={urlImg}
          width={30}
          height={30}
          alt="img"
          onClick={showPicture}
        />
      )}

      {open && (
        <div className={styles.img}>
          <img src={urlImg} width={150} height={150} alt="img" />
          <button className={styles.btn__close} onClick={closePicture}>
            X
          </button>
        </div>
      )}
    </>
  )
}

export default ProductImg

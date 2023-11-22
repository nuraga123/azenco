import Image from 'next/image'
import { IPartImagesItemProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'

const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <Image src={src} alt={alt} width={200} height={100} />
    </li>
  )
}

export default PartImagesItem

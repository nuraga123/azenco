import Link from 'next/link'
import { ReactNode } from 'react'
import CopyElement from '@/components/elements/CopyElement'
import { IBoilerPart } from '@/types/boilerparts'
import styles from '@/styles/catalog/index.module.scss'

export const CatalogTextComponent = ({
  keyText,
  item,
  flex = false,
  copyComponent,
}: {
  keyText: string
  item: string | number | boolean | ReactNode
  flex?: boolean
  copyComponent?: ReactNode
}) => (
  <>
    <span className={styles.catalog__list__item__code}>
      {flex ? (
        <div>
          <div style={{ marginBottom: '5px' }}>{keyText}:</div>
          {copyComponent ? copyComponent : ''}
        </div>
      ) : (
        <span>
          {`${keyText}: `}
          {copyComponent ? copyComponent : ''}
        </span>
      )}
      <b style={{ letterSpacing: '1px', color: 'black' }}>{item} </b>
    </span>
  </>
)

export const CatalogCodeComponent = ({ item }: { item: IBoilerPart }) => (
  <div
    style={{
      borderBottom: '2px solid #9e9e9e',
      paddingBottom: 5,
      marginBottom: 5,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ color: 'gray', margin: '0 10px' }}>Code:</div>
      <CopyElement str={item.vendor_code ? item.vendor_code : ''} />
    </div>

    <b style={{ letterSpacing: 1, color: 'black', marginLeft: 10 }}>
      {item.vendor_code}
    </b>
  </div>
)

export const CatalogNameComponent = ({ item }: { item: IBoilerPart }) => (
  <div style={{ borderBottom: '2px solid #9e9e9e', paddingBottom: 10 }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '35px',
      }}
    >
      <div style={{ color: 'gray', margin: '0 10px' }}>Məhsul Adı:</div>
      <CopyElement str={item.name ? item.name : ''} />
    </div>
    <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
      <a target="_blank">
        <span style={{ color: 'gray', margin: '0 10px' }}>
          <b style={{ letterSpacing: '1px', color: 'black' }}>{item.name}</b>
        </span>
      </a>
    </Link>
  </div>
)

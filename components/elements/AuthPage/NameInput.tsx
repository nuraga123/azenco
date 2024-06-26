import React from 'react'
import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from '@/types/auth'

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <p>Ad, soyad və ata adı yazin</p>
    <br />
    <input
      {...register('name', {
        required: 'adınızı yazın',
        minLength: 4,
        maxLength: 100,
      })}
      className={styles.form__input}
      type="text"
      autoComplete="off"
      placeholder={'Ad, soyad və ata adı yazin'}
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>minimum 4 simvol cox olmalidir</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>maksimum 100 simvol ola biler</span>
    )}
  </label>
)

export default NameInput

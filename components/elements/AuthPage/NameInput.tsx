import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from '@/types/auth'

const NameInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.form__label}>
      <span style={{ textAlign: 'center', marginBottom: '10px' }}>
        Məsələn: Nurağa Yusifli Yusif
      </span>
      <input
        {...register('name', {
          required: 'adınızı yazın',
          minLength: 4,
          maxLength: 100,
        })}
        className={styles.form__input}
        type="text"
        placeholder={'Ad, soyad və ata adı'}
      />
      {errors.name && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          {errors.name?.message}
        </span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          minimum 4 simvol
        </span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          maksimum 100 simvol
        </span>
      )}
    </label>
  )
}

export default NameInput

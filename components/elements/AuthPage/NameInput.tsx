import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from '@/types/auth'

const NameInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.form__label}>
      <input
        {...register('name', {
          required: 'adınızı yazın',
          minLength: 4,
          maxLength: 15,
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: 'Ad yalnız hərf və rəqəmlərdən ibarət ola bilər!',
          },
        })}
        className={styles.form__input}
        type="text"
        placeholder={'Adınızı yazın'}
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
          maksimum 15 simvol
        </span>
      )}
    </label>
  )
}

export default NameInput

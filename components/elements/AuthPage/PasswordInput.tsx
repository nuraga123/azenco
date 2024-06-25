import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const PasswordInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <label className={styles.form__label}>
      <p>Parolu yazın</p>
      <input
        {...register('password', {
          required: 'parolu yazın',
          minLength: 4,
          maxLength: 20,
        })}
        className={styles.form__input}
        type="password"
        placeholder={'Parolu yazın'}
      />
      {errors.password && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          {errors.password?.message}
        </span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          minimum 4 simvol
        </span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          maksimum 20 simvol
        </span>
      )}
    </label>
  )
}

export default PasswordInput

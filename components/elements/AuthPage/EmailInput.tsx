import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IAuthPageInput } from '@/types/auth'

import styles from '@/styles/auth/index.module.scss'

const EmailInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.form__label}>
      <input
        {...register('email', {
          required: 'email yazın',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Səhv email',
          },
        })}
        className={styles.form__input}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className={`${styles.error_alert} ${darkModeClass}`}>
          {errors.email?.message}
        </span>
      )}
    </label>
  )
}

export default EmailInput

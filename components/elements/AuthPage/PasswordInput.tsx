import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import inputStyles from '@/styles/auth/input.module.scss'

const PasswordInput = ({ register, errors }: IAuthPageInput) => {
  const [showPassword, setShowPassord] = useState(false)
  console.log()
  return (
    <label className={styles.form__label}>
      <p>Parolu yazın</p>
      <br />
      <div className={inputStyles.content}>
        <input
          {...register('password', {
            required: 'parolu yazın',
            minLength: 4,
            maxLength: 20,
          })}
          className={styles.form__input}
          type={showPassword ? 'text' : 'password'}
          placeholder={'Parolu yazın'}
          autoComplete="off"
        />
        <div className={inputStyles.icon}>
          {showPassword ? (
            <FaEye onClick={() => setShowPassord(false)} />
          ) : (
            <FaEyeSlash onClick={() => setShowPassord(true)} />
          )}
        </div>
      </div>
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>minimum 4 simvol</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>maksimum 20 simvol</span>
      )}
    </label>
  )
}

export default PasswordInput

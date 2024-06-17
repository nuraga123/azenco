import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'

import { singUpFx } from '@/app/api/auth'
import { $mode } from '@/context/mode'
import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'

import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useRouter } from 'next/router'

const SignUpForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const router = useRouter()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await singUpFx({
        url: '/users/signup',
        username: `${data.name}`,
        password: data.password,
        email: data.email,
      })

      if (!userData) {
        return
      }

      resetField('email')
      resetField('name')
      resetField('password')
      if (userData?.id) router.push(`/`)
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        {'Hesab yarat'.toUpperCase()}
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'QEYDİYYAT'}
      </button>
    </form>
  )
}

export default SignUpForm

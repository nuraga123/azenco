import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { IInputs } from '@/types/auth'
import { singInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { $mode } from '@/context/mode'

import NameInput from '@/components/elements/AuthPage/NameInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { setUser } from '@/context/user'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await singInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })
      resetField('name')
      resetField('password')

      // После успешного входа
      if (userData?.user) {
        const userDataOne = userData.user

        localStorage.setItem('token', userDataOne.token)
        localStorage.setItem('userId', userDataOne.userId)
        localStorage.setItem('username', userDataOne.username)
        localStorage.setItem('email', userDataOne.email)

        setUser({
          id: userDataOne.userId,
          username: userDataOne.username,
          email: userDataOne.email,
        })

        router.push('/my')
      }

      router.push('/')
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
        {'AZENCO ASC '}
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : (
          'giriş'.toUpperCase()
        )}
      </button>
    </form>
  )
}

export default SignInForm

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { IInputs } from '@/types/auth'
import { getUsersNamesServer, singInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { setUser } from '@/context/user'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import NameInputLogin from '@/components/elements/AuthPage/NameInputLogin'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const [names, setNames] = useState<string[]>([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
    setValue,
  } = useForm<IInputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    try {
      setSpinner(true)
      const userData = await singInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })
      resetField('name')
      resetField('password')

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

  useEffect(() => {
    const setUsersNames = async () => {
      const result = await getUsersNamesServer()
      if (result?.length) setNames(result)
      else setNames(['sdfsdfs', 'ffsdfsd'])
    }

    setUsersNames()
  }, [])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        {'AZENCO ASC '}
      </h2>
      <NameInputLogin
        register={register}
        errors={errors}
        usernames={names}
        setValue={setValue}
      />
      <br />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
        type="submit"
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

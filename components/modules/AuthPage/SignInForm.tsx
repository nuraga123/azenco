import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { IInputs } from '@/types/auth'
import { getUsersNamesServer, singInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { setUser } from '@/context/user'
import NameInputLogin from '@/components/elements/AuthPage/NameInputLogin'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const [userError, setUserError] = useState('')

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

      const { token, userId, username, email, error_message } = userData.user
      const checkUserSuccess = token && userId && username && email

      if (error_message) {
        toast.error(error_message)
        setUserError(error_message)
      } else if (checkUserSuccess) {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        localStorage.setItem('username', username)
        localStorage.setItem('email', email)

        setUser({
          id: +userId,
          username,
          email,
        })

        toast.success('Proqrama daxil oldunuz!')
        router.push('/my')
      }

      resetField('name')
      resetField('password')

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

      {userError && (
        <h3
          style={{
            textAlign: 'center',
            color: 'red',
          }}
        >
          {userError}
        </h3>
      )}

      <div>
        <button
          className={`${styles.form__button} ${styles.button} ${styles.submit}`}
          type="submit"
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} />
          ) : (
            'daxil olun'.toUpperCase()
          )}
        </button>
        <Link href={'/help'} passHref legacyBehavior>
          <a className={styles.link}>
            <span>Şifrəni unutmusunuz ?</span>
          </a>
        </Link>
      </div>
    </form>
  )
}

export default SignInForm

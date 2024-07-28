import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { singUpFx } from '@/app/api/auth'
import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'

import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignUpForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const router = useRouter()

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
      if (userData?.id) router.push('/')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        {'Hesab yarat'.toUpperCase()}
      </h2>

      <div style={{ margin: '0 120px 15px 0' }}>
        Nümunə: <b>Əli Həsənov Cavid oğlu</b>
      </div>

      <NameInput register={register} errors={errors} />

      <EmailInput register={register} errors={errors} />

      <PasswordInput register={register} errors={errors} />
      <div>
        <button
          className={`${styles.form__button} ${styles.button} ${styles.submit}`}
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} />
          ) : (
            'Qeydiyyatdan keçin'.toUpperCase()
          )}
        </button>

        <Link href={'/help'} passHref legacyBehavior>
          <a className={styles.link}>
            <span>qeydiyyatdan keçə bilmirəm</span>
          </a>
        </Link>
      </div>
    </form>
  )
}

export default SignUpForm

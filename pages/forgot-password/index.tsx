import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from '@/styles/auth/index.module.scss'
import HelpUser from '@/components/elements/HelpUser/HelpUser'
import { updateUserPasswordServer } from '@/app/api/auth'
import { getLocalStorageUser } from '@/localStorageUser'
import BackBtn from '@/components/elements/btn/BackBtn'
import { useRouter } from 'next/navigation'

export interface IForgotPassword {
  id: number
  username: string
  password: string
  email: string
  createdAt: string
  updatedAt: string
  message: string
}

const ForgotPassword = () => {
  const router = useRouter()
  const { usernameStorage } = getLocalStorageUser()
  const adminCheck = usernameStorage === `${process.env.NEXT_PUBLIC_ADMIN_NAME}`

  const [secret, setSecret] = useState('')
  const [id, setId] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await updateUserPasswordServer({
        secret,
        id: +id,
        newPassword,
      })

      const message = response?.message

      setUser({ response })

      toast.success(message)
      router.push('/login')
    } catch (error) {
      toast.error(error as string)
    } finally {
    }
  }

  console.log(user)

  return (
    <>
      <Head>
        <title>AZENCO ASC | Parolun Yenilənməsi</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {adminCheck ? (
        <div className={styles.container}>
          <BackBtn href="/my" text="login menusina qayitmaq !" />
          <h2>Şifrəni unutmusunuz</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>secret:</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              autoComplete="off"
            />
            <label>ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              autoComplete="off"
            />

            <label>new Parol:</label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button type="submit" className={styles.submitButton}>
              Sıfırlama
            </button>

            <HelpUser />
          </form>
        </div>
      ) : (
        <BackBtn href="/my" text="ancaq admin parolu deyise biler !" />
      )}
    </>
  )
}

export default ForgotPassword

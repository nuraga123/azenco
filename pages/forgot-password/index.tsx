import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from '@/styles/auth/index.module.scss'
import HelpUser from '@/components/elements/HelpUser/HelpUser'
import { updateUserPasswordServer } from '@/app/api/auth'

interface IForgotPassword {
  id: number
  username: string
  password: string
  email: string
  createdAt: string
  updatedAt: string
  message: string
}

const ForgotPassword = () => {
  const [secret, setSecret] = useState('')
  const [id, setId] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response: IForgotPassword = await updateUserPasswordServer({
        secret,
        id: +id,
        newPassword,
      })

      const message: string = response?.message

      setUser({ response })

      toast.success(message)
    } catch (error) {
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
      <div className={styles.container}>
        <h2>Şifrəni unutmusunuz</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>secret:</label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(+e.target.value)}
            required
          />

          <label>new Parol:</label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Sıfırlama
          </button>

          <HelpUser />
        </form>
      </div>
    </>
  )
}

export default ForgotPassword

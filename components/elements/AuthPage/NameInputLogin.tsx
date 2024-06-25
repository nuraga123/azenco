import React from 'react'
import { IAuthPageInputLogin } from '@/types/auth'
import styles from '@/styles/datalist/index.module.scss'

const NameInputLogin = ({
  register,
  errors,
  usernames,
}: IAuthPageInputLogin) => (
  <div className={styles.container}>
    <input
      {...register('name', { required: 'Name is required' })}
      className={styles.input}
      type="text"
      list="usernames"
    />
    <datalist id="usernames" className={styles.datalist}>
      {usernames.map((username, index) => (
        <option key={index} value={username} />
      ))}
    </datalist>
    {errors.name && <span>{errors.name.message}</span>}
  </div>
)

export default NameInputLogin

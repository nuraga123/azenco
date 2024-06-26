import React, { useRef, useState } from 'react'
import { IAuthPageInputLogin, IInputs } from '@/types/auth'
import { UseFormSetValue } from 'react-hook-form'
import styles from '@/styles/auth/index.module.scss'
import inputStyles from '@/styles/auth/input.module.scss'

interface NameInputLoginProps extends IAuthPageInputLogin {
  setValue: UseFormSetValue<IInputs>
}

const NameInputLogin: React.FC<NameInputLoginProps> = ({
  register,
  errors,
  usernames,
  setValue,
}) => {
  const [showList, setShowList] = useState(false)
  const [currentName, setCurrentName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const nameOnClick = () => {
    setShowList(true)
  }

  const handleOptionClick = (username: string) => {
    setCurrentName(username)
    setShowList(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowList(true)
    setCurrentName(event.target.value)
    setValue('name', currentName)
  }

  return (
    <div>
      <label className={styles.form__label}>
        <p>Ad, soyad və ata adı yazın</p>
        <br />
        <input
          {...register('name', {
            required: 'Adınızı yazın',
            minLength: {
              value: 4,
              message: 'Minimum 4 simvol çox olmalıdır',
            },
            maxLength: {
              value: 100,
              message: 'Maksimum 100 simvol ola bilər',
            },
          })}
          value={currentName}
          onClick={nameOnClick}
          onChange={handleInputChange}
          type="text"
          placeholder={'Ad, soyad və ata adı yazın'}
          autoComplete="off"
          className={styles.form__input}
          ref={inputRef}
          onFocus={}
        />
      </label>

      {showList && (
        <ul
          className={`${inputStyles.list} ${showList ? inputStyles.show : ''}`}
        >
          <p>siyahıdan adınızı seçin</p>
          <br />
          {usernames
            .filter((username) =>
              username.toLowerCase().includes(currentName.toLowerCase())
            )
            .map((username, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(username)}
                className={inputStyles.listItem}
              >
                {username}
              </li>
            ))}
        </ul>
      )}

      {errors.name && (
        <span className={styles.error_alert}>{errors.name.message}</span>
      )}
    </div>
  )
}

export default NameInputLogin

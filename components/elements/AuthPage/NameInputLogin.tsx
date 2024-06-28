import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

import { IAuthPageInputLogin } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import inputStyles from '@/styles/auth/input.module.scss'

const NameInputLogin: React.FC<IAuthPageInputLogin> = ({
  register,
  usernames,
  setValue,
  errors,
}) => {
  const [showList, setShowList] = useState(false)

  const [currentName, setCurrentName] = useState('')

  const openShowList = () => setShowList(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCurrentName(value)
    setShowList(value.length > 0)
  }

  const handleOptionClick = (username: string) => {
    setCurrentName(username)
    setValue('name', username)
    setShowList(false)
  }

  const filteredUsernames = usernames.filter((username) =>
    username.toLowerCase().includes(currentName.toLowerCase())
  )

  return (
    <div>
      <label className={styles.form__label}>
        <p>Ad, soyad və ata adı yazın</p>
        <br />
        <input
          {...register('name', {
            required: 'Adınızı yazın',
            minLength: {
              value: 3,
              message: 'Minimum 3 simvol çox olmalıdır',
            },
            maxLength: {
              value: 100,
              message: 'Maksimum 100 simvol ola bilər',
            },
          })}
          type="text"
          placeholder="Ad, soyad və ata adı yazın"
          autoComplete="off"
          onChange={handleInputChange}
          value={currentName}
          className={styles.form__input}
          onFocus={openShowList}
        />
      </label>

      {showList && (
        <ul
          className={`${inputStyles.list} ${showList ? inputStyles.show : ''}`}
        >
          <div className={inputStyles.list__title}>
            <div>Siyahıdan adınızı seçin</div>
            <div>
              {showList && (
                <IoIosCloseCircle
                  className={inputStyles.list__title__icon}
                  onClick={() => setShowList(false)}
                />
              )}
            </div>
          </div>

          {filteredUsernames.length === 0 ? (
            <li style={{ margin: '10px 0', textAlign: 'center' }}>
              Heç nə tapılmadı...
            </li>
          ) : (
            filteredUsernames.map((username, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(username)}
                className={inputStyles.listItem}
              >
                {username}
              </li>
            ))
          )}
        </ul>
      )}

      {errors.name && (
        <span className={styles.error_alert}>{errors.name.message}</span>
      )}
    </div>
  )
}

export default NameInputLogin

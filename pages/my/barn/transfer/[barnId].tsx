import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { getUsersNamesServer } from '@/app/api/auth'
import { getBarnById } from '@/app/api/barn'
import { IBarnItem } from '@/types/barn'
import Layout from '@/components/layout/Layout'
import ReduceMaterial from '@/components/templates/BarnsPage/MaterialComponent/ReduceMaterial'

import styles from '@/styles/transfer/index.module.scss'

const TransferMaterialOfBarns = () => {
  const router = useRouter()
  const [newStock, setNewStock] = useState('')
  const [usedStock, setUsedStock] = useState('')
  const [brokenStock, setBrokenStock] = useState('')

  const [barnIdQuery, setBarnIdQuery] = useState<number>(0)
  const [barnItem, setBarnItem] = useState<IBarnItem>()
  const [users, setUsers] = useState<string[]>([])
  const [filteredUsers, setFilteredUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [driverName, setDriverName] = useState<string>('')
  const [carNumber, setCarNumber] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const loadUser = async () => {
      const usersData = await getUsersNamesServer()

      if (usersData.length > 0) {
        setUsers(usersData)
        setFilteredUsers(usersData)
        return
      } else {
        toast.error('No users')
        return
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    if (router.isReady && router.query.barnId) {
      const barnId = Number(router.query.barnId)
      setBarnIdQuery(barnId)
    }
  }, [router.isReady, router.query.barnId])

  useEffect(() => {
    const loadBarn = async () => {
      if (barnIdQuery !== null && barnIdQuery > 0) {
        const findBarn = await getBarnById(barnIdQuery)
        if (findBarn?.barn) setBarnItem(findBarn.barn)
      }
    }

    loadBarn()
  }, [barnIdQuery])

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()

    const filtered = users.filter((user) =>
      user.toLowerCase().includes(searchValue)
    )

    setFilteredUsers(filtered)
  }

  const handleSend = () => {
    // Реализовать логику отправки материала
  }

  const resetBarnUsername = () => {
    setIsModalOpen(true)
    setSelectedUser('')
  }

  const handleFilteredUser = (name: string) => {
    setSelectedUser(name)
    setIsModalOpen(false)
  }

  return (
    <Layout title={`Anbarların Transfer Materialı Göndərmə Formasi`}>
      <br />
      <h1>Anbarların Transfer Materialı Göndərmə Formasi</h1>
      <br />

      <div className={styles.transfer}>
        <div className={styles.left}>
          <button
            className={styles.selectUserBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Anbardar seçin
          </button>

          {selectedUser && (
            <div className={styles.selectedUser}>
              Siz anbar sahibi seçdiniz: <strong>{selectedUser}</strong>
              <button className={styles.editBtn} onClick={resetBarnUsername}>
                dəyişmək
              </button>
            </div>
          )}

          <div className={styles.driverInfo}>
            <label>
              <div className={styles.text}>Sürücünün adı</div>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Sürücünün adı"
              />
            </label>

            <label>
              <div className={styles.text}>Maşın nömrəsi</div>
              <input
                type="text"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                placeholder="Maşın nömrəsi"
              />
            </label>
          </div>

          <div className={styles.sendAmount}>
            <label>
              <div className={styles.text}>Yeni miqdar</div>
              <input
                type="text"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                placeholder="Yeni Miqdar"
              />
            </label>

            <label>
              <div className={styles.text}>İşlənmiş miqdar</div>
              <input
                type="text"
                value={usedStock}
                onChange={(e) => setUsedStock(e.target.value)}
                placeholder="İşlənmiş Miqdar"
              />
            </label>

            <label>
              <div className={styles.text}>Yararsız miqdar</div>
              <input
                type="text"
                value={brokenStock}
                onChange={(e) => setBrokenStock(e.target.value)}
                placeholder="Yararsız Miqdar"
              />
            </label>
          </div>

          <button
            onClick={handleSend}
            className={styles.sendBtn}
            disabled={true}
          >
            Göndər
          </button>
        </div>
        <div className={styles.right}>
          {barnItem && (
            <ReduceMaterial
              barn={barnItem}
              newStockDynamic={+newStock}
              usedStockDynamic={+usedStock}
              brokenStockDynamic={+brokenStock}
            />
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modal__head}>
              <input
                type="text"
                placeholder="anbardarın adını yazın"
                onChange={handleUserSearch}
                className={styles.searchInput}
              />

              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
            </div>

            <ul className={styles.userWrapper}>
              <h2>Anbardar seçin</h2>
              {filteredUsers.length > 0 &&
                filteredUsers.map((name, index) => (
                  <li
                    key={index + 1}
                    className={styles.userItem}
                    onClick={() => handleFilteredUser(name)}
                  >
                    {`${index + 1}) ${name}`}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default TransferMaterialOfBarns

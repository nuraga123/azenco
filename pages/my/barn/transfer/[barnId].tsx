import React, { useEffect, useState } from 'react'
import { IBarnItem } from '@/types/barn'
import Layout from '@/components/layout/Layout'

import styles from '@/styles/transfer/index.module.scss'
import ReduceMaterial from '@/components/templates/BarnsPage/MaterialComponent/ReduceMaterial'
import { useRouter } from 'next/router'
import { getBarnById } from '@/app/api/barn'
import { getUsersNamesServer } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { toast } from 'react-toastify'

const TransferMaterialOfBarns = () => {
  const router = useRouter()

  const [barnIdQuery, setBarnIdQuery] = useState<number | null>(null)
  const [barnItem, setBarnItem] = useState<IBarnItem>()
  const [users, setUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [driverName, setDriverName] = useState<string>('')
  const [carNumber, setCarNumber] = useState<string>('')
  const [isAzerbaijaniNumber, setIsAzerbaijaniNumber] = useState<boolean>(true)
  const [sendAmount, setSendAmount] = useState<string>('')

  useEffect(() => {
    const loadUser = async () => {
      const usersData = await getUsersNamesServer()

      console.log(usersData)

      if (usersData.length > 0) setUsers(usersData)
      else toast.error('not users')

      return
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
    // Реализовать логику поиска пользователя
    e.preventDefault()
  }

  const handleSend = () => {
    if (!barnItem) return
    const totalStock = parseFloat(barnItem.totalStock)
    const amountToSend = parseFloat(sendAmount)

    if (amountToSend <= 0 || amountToSend > totalStock) {
      alert('Miqdar düzgün deyil')
      return
    }

    // Реализовать логику отправки материала
  }

  return (
    <Layout title={`Anbarların Transfer Materialı Göndərmə Formasi`}>
      <br />
      <h1>Anbarların Transfer Materialı Göndərmə Formasi</h1>
      <br />

      <div>
        <ul>{users?.length > 0 && users.map((name) => <li>{name}</li>)}</ul>
      </div>
      <div className={styles.transfer}>
        <div className={styles.left}>
          <h2>Anbar istifadəçisini seçin </h2>
          <input
            type="text"
            placeholder="İstifadəçi axtarın"
            onChange={handleUserSearch}
            className={styles.searchInput}
          />
          {selectedUser && (
            <div className={styles.selectedUser}>
              Seçilmiş Anbar: <strong>{selectedUser}</strong>
            </div>
          )}
          <div className={styles.driverInfo}>
            <label>
              Sürücünün adı:
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Sürücünün adı"
              />
            </label>
            <label>
              Maşın nömrəsi:
              <input
                type="text"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                placeholder="Maşın nömrəsi"
              />
            </label>
            <label>
              Azərbaycan nömrəsi?
              <input
                type="checkbox"
                checked={isAzerbaijaniNumber}
                onChange={() => setIsAzerbaijaniNumber(!isAzerbaijaniNumber)}
              />
            </label>
          </div>
          <div className={styles.sendAmount}>
            <label>
              Göndəriləcək miqdar:
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="Miqdar"
              />
            </label>
          </div>
          <button onClick={handleSend} className={styles.sendBtn}>
            Göndər
          </button>
        </div>
        <div className={styles.right}>
          {barnItem && <ReduceMaterial barn={barnItem} />}
        </div>
      </div>
    </Layout>
  )
}

export default TransferMaterialOfBarns

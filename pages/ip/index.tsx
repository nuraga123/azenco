import { getDoneSecret } from '@/app/api/auth'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Home: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [secret, setSecret] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response: boolean = await getDoneSecret(secret)
      setIsSecret(response)
      console.log(response)
    } catch (error) {
      toast.error(error as string)
    } finally {
    }
  }

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('/api/get-ip')
        if (!response.ok) {
          throw new Error('Ошибка при получении IP-адреса')
        }
        const data = await response.json()
        setIpAddress(data.ip)
      } catch (error) {
        if (error) {
          setError(error as string)
        }
      }
    }

    fetchIpAddress()
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 50 }}>
        Your IPv4 address is:
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isSecret && ipAddress ? (
          <p style={{ color: 'green', margin: 30 }}>{ipAddress}</p>
        ) : (
          <p>Loading...</p>
        )}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={secret}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSecret(e.target.value)
          }
        />
        <button type="submit">send secret word</button>
      </form>
    </div>
  )
}

export default Home

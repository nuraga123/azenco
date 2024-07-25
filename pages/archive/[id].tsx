import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'

interface Item {
  id: string
  name: string
  description: string
  // Добавьте другие поля, если необходимо
}

interface ItemProps {
  item: Item
}

const ItemPage: React.FC<ItemProps> = ({ item }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  try {
    const response = await axios.get(`https://api.example.com/items/${id}`)
    const item: Item = response.data

    return {
      props: {
        item,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default ItemPage

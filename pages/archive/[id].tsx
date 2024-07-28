// pages/archive/[id].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findArchiveById } from '@/app/api/archive'
import ArchiveCard, { ArchiveData } from '@/components/modules/ArchiveCard'
import Layout from '@/components/layout/Layout'
import Spinner from '@/components/modules/Spinner/Spinner'
import BackBtn from '@/components/elements/btn/BackBtn'

const ArchiveItem: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState({} as ArchiveData)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setSpinner(true)

    const loadArchive = async () => {
      if (id) {
        const archiveData = await findArchiveById(+id)
        setData(archiveData)
        setTimeout(() => setSpinner(false), 500)
      }
    }

    loadArchive()
  }, [id])

  if (spinner) {
    return (
      <Layout title={`Arxiv | Загрузка`}>
        <div style={{ height: '50vh' }}>
          <Spinner
            top={30}
            widthPX={70}
            heightPX={70}
            loadingText="arxiv yüklənir"
          />
        </div>
      </Layout>
    )
  }

  if (data) {
    return (
      <Layout title={`Arxiv | ${data?.username}`}>
        <BackBtn />
        <ArchiveCard data={data} />
      </Layout>
    )
  }
  return (
    <Layout title={`Arxiv | məlumatlari yoxdur`}>
      <BackBtn />
      <h1 style={{ textAlign: 'center' }}>
        Göstəriləcək arxivin məlumatlari yoxdur !
      </h1>
    </Layout>
  )
}

export default ArchiveItem

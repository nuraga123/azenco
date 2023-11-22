import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { getBoilerPartFx } from '@/app/api/boilerParts'
import Layout from '@/components/layout/Layout'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import PartPage from '@/components/templates/PartPage/PartPage'
import '@/styles/globals.css'
import Custom404 from '../404'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const router = useRouter()

  const [error, setError] = useState(false)

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  console.log(boilerPart)

  return (
    <>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout title={boilerPart.name}>
            <PartPage />
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage

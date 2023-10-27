import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import '@/styles/globals.css'
import { IQueryParams } from '@/types/catalog'

function Catalog({ query }: { query: IQueryParams }) {
  return (
    <Layout title={'Каталог'}>
      <CatalogPage query={query} />
    </Layout>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default Catalog

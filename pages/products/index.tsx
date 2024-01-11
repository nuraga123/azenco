import Layout from '@/components/layout/Layout'
import ProductsPage from '@/components/templates/ProductsPage/ProductsPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

function Products() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Products'}>
          <ProductsPage />
        </Layout>
      )}
    </>
  )
}

export default Products

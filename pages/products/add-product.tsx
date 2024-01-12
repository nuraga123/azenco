import Layout from '@/components/layout/Layout'
import AddProductPage from '@/components/templates/AddProductPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import '@/styles/globals.css'
import Link from 'next/link'

function AddProduct() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const username = getLocalStorageUser().username === 'nuraga'

  if (username) {
    return (
      <>
        {shouldLoadContent && (
          <Layout title={'Yeni Materiallar Yarat'}>
            <AddProductPage />
          </Layout>
        )}
      </>
    )
  } else {
    return (
      <>
        {shouldLoadContent && (
          <Layout title={'Yeni Materiallar Yarat'}>
            <Link href={'/dashboard'}>
              <span
                style={{
                  display: 'flex',
                  width: 'max-content',
                  background: 'black',
                  color: 'red',
                  margin: '20px auto',
                  padding: '5px 10px',
                  fontSize: 18,
                  borderRadius: 10,
                }}
              >
                əsas səhifəyə qayidin
              </span>
            </Link>
          </Layout>
        )}
      </>
    )
  }
}

export default AddProduct

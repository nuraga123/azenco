import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Baş Səhifə'}>
          <DashboardPage />
        </Layout>
      )}
    </>
  )
}

export default Dashboard

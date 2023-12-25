import Layout from '@/components/layout/Layout'
import AboutPage from '@/components/templates/AboutPage/AboutPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

function About() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Şirkət haqqında'}>
          <main>
            {/* <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            /> */}
            <AboutPage />
          </main>
        </Layout>
      )}
    </>
  )
}

export default About

import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'
import '@/styles/globals.css'

function Contacts() {
  return (
    <Layout title={'Kontaktlar'}>
      <ContactsPage />
    </Layout>
  )
}

export default Contacts

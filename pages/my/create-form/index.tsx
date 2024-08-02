import React from 'react'
import Layout from '@/components/layout/Layout'
import CreateBarn from '@/components/templates/BarnsPage/Form/CreateBarn'

const AddFormPage = () => {
  console.log()

  return (
    <Layout title={'Anbarı yaradın'}>
      <CreateBarn />
    </Layout>
  )
}

export default AddFormPage

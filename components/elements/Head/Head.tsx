import React from 'react'

const Head = ({ headTitle }: { headTitle: string }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 1200,
      backgroundColor: '#c4e1bd',
      borderRadius: 10,
      padding: 20,
      margin: '20px auto',
      border: '3px solid #dde1db',
    }}
  >
    <h2 style={{ textAlign: 'center' }}>Səhifə: {headTitle}</h2>
  </div>
)

export default Head

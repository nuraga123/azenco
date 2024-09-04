import React from 'react'

const Head = ({ headTitle }: { headTitle: string }) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 0 15px',
      backgroundColor: '#c4e1bd',
      borderRadius: 10,
      padding: 10,
      border: '3px solid #dde1db',
    }}
  >
    <h2 style={{ textAlign: 'center', marginRight: 20 }}>
      Səhifə: {headTitle}
    </h2>
  </div>
)

export default Head

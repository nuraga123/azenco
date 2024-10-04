// NotFound.js
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#f9f9f9',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        transition: 'background-color 0.3s',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      }}
    >
      <Link href={'/my'} legacyBehavior passHref>
        <a
          className="fadeIn"
          style={{
            backgroundColor: 'skyblue',
            fontSize: '40px',
            color: '#0070f3',
            textDecoration: 'none',
            padding: '10px',
            transition: 'color 0.3s',
            borderRadius: 10,
          }}
        >
          menyuya qayıdın
        </a>
      </Link>
    </div>
  )
}

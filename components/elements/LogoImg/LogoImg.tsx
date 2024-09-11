/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LogoImg = () => {
  const urlImage = `https://vk.com/doc751126638_679936903?hash=GiV7zw4tSszHvwhf7Vfn4ucA6F8G8z0AeBdsOKkZaZg&dl=rijGHVYel0NdNXdzZqApDMGKd9OaxplEbakb4td2vvD`
  return (
    <img
      style={{ width: 25, height: 25, borderRadius: 10 }}
      src={urlImage}
      alt="logo"
    />
  )
}

export default LogoImg

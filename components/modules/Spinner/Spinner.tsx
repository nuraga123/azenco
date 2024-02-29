import React from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const Spinner: React.FC = () => (
  <div className={spinnerStyles.spinner} style={{ top: '40%' }} />
)

export default Spinner

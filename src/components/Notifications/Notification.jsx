import React from 'react'

import styles from './Notification.module.sass'

export default function Notification(props) {
  const { notification, clearNotification } = props

  return (
    <div className={styles.Notification}>
      {notification}
      <button type='button' onClick={clearNotification}>X</button>
    </div>
  )
}
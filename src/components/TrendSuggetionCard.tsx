import React from 'react'
import styles from '../styles/trend_suggetion_card.module.scss'

function TrendSuggetionCard({url, title}:{url:string, title:string}) {
  return (
    <div className={styles.card_container}>
        <img className={styles.card_image} src={url} alt=''/>
        <p className={styles.card_title}>{title}</p>
    </div>
  )
}

export default TrendSuggetionCard
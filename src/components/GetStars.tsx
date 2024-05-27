import React from 'react'
import styles from '../styles/ratting.module.scss';

function GetStars({ratting}:{ratting:number}) {
  return (
    <div className={styles.rattings_container}>
         {Array.from({ length: ratting }).map((_, index) => (
        <img className={styles.star_img} key={index} alt='star5' src="assets/Star 5.png"/>
      ))}
        {Array.from({ length: 5-ratting }).map((_, index) => (
        <img className={styles.star_img} key={index} alt='star4' src="assets/Star 4.png"/>
      ))}
    </div>
  )
}

export default GetStars
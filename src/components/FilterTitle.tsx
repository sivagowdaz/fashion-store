import React from 'react'
import styles from "../styles/filter_title.module.scss"
import { FilterDrawerState } from "../utils/types";

interface FilterTitlePros {
    type: keyof FilterDrawerState,
    title: string,
    toggleDrower: (drawer: keyof FilterDrawerState) => void
}

function FilterTitle({type, title, toggleDrower}:FilterTitlePros) {
  return (
    <div onClick={() => toggleDrower(type)} className={styles.filter_title_container}>
        <p className={styles.title}>{title}</p>
        <img className={styles.drowdown_img} src='assets/dropdown.png' alt='dropdown'/>
    </div>
  )
}

export default FilterTitle
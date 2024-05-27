import React, { ChangeEvent } from 'react'
import styles from '../styles/home_search_bar.module.scss'

function HomeSearchBar({onChangeHandler}:{onChangeHandler:(e: ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div className={styles.input_box} >
            <input onChange={onChangeHandler} className={styles.input_ele} placeholder='Search'/>
            <img className={styles.seach_img} src="/assets/search.png"/>
        </div>
    )
}

export default HomeSearchBar
import React, { ChangeEvent, useRef } from 'react'
import styles from '../styles/home_search_bar.module.scss'
import { Link } from 'react-router-dom'

function HomeSearchBar({onChangeHandler}:{onChangeHandler:(e: ChangeEvent<HTMLInputElement>) => void}) {
    const inputRef =  useRef<HTMLInputElement>(null);
    return (
        <div className={styles.input_box} >
            <input ref={inputRef} onChange={onChangeHandler} className={styles.input_ele} placeholder='Search'/>
            <Link to='products' state={{ searchKey: inputRef.current ? inputRef.current.value : '' }}  style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className={styles.seach_img} src="/assets/search.png" alt='search'/>
            </Link>
        </div>
    )
}

export default HomeSearchBar
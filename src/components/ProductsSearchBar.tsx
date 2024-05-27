import React, { ChangeEvent } from 'react'
import styles from '../styles/products_search_bar.module.scss'

interface ProductsSearchBarProps {
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}

function ProductsSearchBar({ onChangeHandler, handleSearch }: ProductsSearchBarProps) {
    return (
        <div className={styles.input_box} >
            <input onChange={onChangeHandler} className={styles.input_ele} placeholder='Search'/>
            <img onClick={handleSearch}className={styles.seach_img} src="/assets/search.png"/>
        </div>
    )
}

export default ProductsSearchBar
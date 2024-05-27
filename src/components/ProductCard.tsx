import React from 'react'
import styles from '../styles/product_card.module.scss'
import { productInfo } from '../utils/types';
import GetStars from './GetStars';

interface ProductProps {
    product: productInfo;
    addToFav: (product_id: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, addToFav }) => {
  return (
    <div className={styles.card_container}>
        <div onClick={()=>addToFav(product.product_id)}>
            {
                !product.isFav ? <img className={styles.heart_img} src="assets/Heart.png" alt='heart'/>:<img className={styles.heart_img} src="assets/heart_filled.png" alt='heart'/>
            }
        </div>
        <img className={styles.card_image} src={product.url}/>
        <p className={styles.card_title}>{product.title}</p>
        <div className={styles.price_container}>
            <p className={styles.price}><span>Rs.</span>&nbsp;{product.price}</p>
            <p className={styles.discounted_price}><span>Rs.</span>&nbsp;{product.discountedPrice}</p>
        </div>
        <div className={styles.rattings_container}>
            <GetStars ratting={product.ratting}/>
            <p className={styles.total_ratting}>({product.totalRatting})</p>
        </div>
    </div>
  )
}

export default ProductCard
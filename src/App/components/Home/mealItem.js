import React, { useState } from 'react'
import styles from './styles/mealItem.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'

const MealItem = (props) => {

    const item = props?.item
    const [qty, setQty] = useState(1)

    const qtyHandler = (event) => {
        setQty(event?.target?.value)
    }
    const addToCartHandler = () => {
        let items = {
            item, ...{ qty: qty }
        }
        props?.addToCart(items)
        setQty(1)
    }

    return (
        <div className={`col-sm-4 ${styles.mealItem}`}>
            <div className={styles.innerItem}>
                <img src={item?.image} alt='Food Image' className={styles.image} />
                <h3>{item?.name}</h3>
                <p>{item?.description}</p>
                <h4>{formatter.format(item?.price)}</h4>

                <div className={styles.add2cart}>
                    <input onChange={qtyHandler} value={qty} type='number' max='10' step='1' min='1' className={styles.ip} />
                    <button className={styles.button} onClick={addToCartHandler}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default MealItem

import React, { useState } from 'react'
import styles from './styles/mealItem.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'

const MealItem = (props) => {

    const item = props?.item
    const [qty, setQty] = useState(1)
    const [fvrt, setFvrt]= useState(false)

    const qtyHandler = (event) => {
        setQty(+event?.target?.value)
    }
    const addToCartHandler = () => {
        let items = {
            ...item,
            qty: Number(qty)
        }
        props?.addToCart(items)
        setQty(1)
    }
    const fvrtHandler = () => {
        setFvrt(!fvrt)
    }

    return (
        <div className={`col-sm-4 ${styles.mealItem}`}>
            <div className={styles.innerItem}>
                <button className={`${styles.fvrt}`} onClick={fvrtHandler}>
                    {fvrt
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF0000" className="bi bi-heart-fill" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" className="bi bi-heart" viewBox="0 0 20 20">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                    }
                </button>
                <img src={item?.logo} alt={'food image...'} className={`${styles.image}`} />
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

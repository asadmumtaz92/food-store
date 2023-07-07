import React from 'react'
import styles from './styles/mealItem.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'
import foodItemIcon from '../../assets/images/foodItemIcon.png'

const MealItem = (props) => {
    const item = props?.item

    return (
        <div className={`col-sm-4 ${styles.mealItem}`}>
            <div className={styles.innerItem}>
                <img src={foodItemIcon} alt='Food Image' className={styles.image} />
                <h3>{item?.name}</h3>
                <p>{item?.description}</p>
                <h4>{formatter.format(item?.price)}</h4>

                <div className={styles.add2cart}>
                    <input type='number' max='10' step='1' min='1' defaultValue= '1' className={styles.ip} />
                    <button className={styles.button}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default MealItem

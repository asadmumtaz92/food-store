import React, { Fragment, useState } from 'react';
import Header from '../../components/Header/Header';
import HeaderImage from '../../components/Home/HeaderImage';
import MealSummary from '../../components/Home/mealSummary';
import MealItem from '../../components/Home/mealItem'
import styles from './index.module.css'
import CartModal from '../../customModals/CartModal';

import { DUMMY_MEALS } from '../../constantData/MealList'

const Home = (props) => {

    const [cartItems, setCartItems] = useState([])

    const addToCart = (newItem) => {
        if (cartItems.length > 0) {
            const result = cartItems.filter(item => item?.id.toLowerCase().includes(newItem?.id.toLowerCase()))

            if (result?.length > 0) {
                console.log('Merge', newItem?.id)

                const noEdit = cartItems.filter(item => item?.id != newItem?.id )
                const editItem = cartItems.filter(item => item?.id == newItem?.id)

                let updatedItem = {
                    ...editItem[0],
                    qty: editItem[0].qty + newItem?.qty
                }
                let newArray = [...noEdit, updatedItem]
                setCartItems(newArray)
                
                // let indexNo = cartItems.findIndex(item => item?.id === newItem?.id)
                // let oldData = cartItems[indexNo]
                // let updatedQty = {
                //     ...oldData,
                //     qty: oldData?.qty + newItem?.qty
                // }
                // cartItems[indexNo] = updatedQty
            }
            else {
                console.log('Add')
                let updatedArray = [...cartItems, newItem];
                setCartItems(updatedArray)
            }
        }
        else {
            let updatedArray = [...cartItems, newItem];
            setCartItems(updatedArray)
        }
    }
    
    return (
        <Fragment>
            <Header cartLength={cartItems?.length} />
            <HeaderImage />

            <MealSummary />
            <div className={`container`}>
                <h2 className={styles.title}>AVAILABLE FOODS</h2>

                <div className={`row ${styles.myRow}`} >
                    {DUMMY_MEALS.map(item => <MealItem item={item} key={item?.id} addToCart={addToCart} /> )}
                </div>
            </div>

            {/* CART MODAL */}
            <CartModal cartItems={cartItems} />
        </Fragment>
    );
}

export default Home;

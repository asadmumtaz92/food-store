import React, { Fragment, useState } from 'react';
import Header from '../../components/Header/Header';
import HeaderImage from '../../components/Home/HeaderImage';
import MealSummary from '../../components/Home/mealSummary';
import MealItem from '../../components/Home/mealItem'
import styles from './index.module.css'
import CartModal from '../../customModals/CartModal';
import Cart from './Cart';
import Footer from '../../components/UI/Footer';

import { DUMMY_MEALS } from '../../constantData/MealList'


const Home = (props) => {

    const [cartItems, setCartItems] = useState([])
    const [activeScreen, setActiveScreen] = useState('Home')

    const deleteItemHandler = (id) => {
        const noEdit = cartItems.filter(item => item?.id !== id)
        setCartItems(noEdit)
    }

    const incrementHandler = (id) => {
        const noEdit = cartItems.filter(item => item?.id !== id)
        const editItem = cartItems.filter(item => item?.id === id)

        let updatedItem = {
            ...editItem[0],
            qty: editItem[0].qty + 1
        }
        let newArray = [...noEdit, updatedItem]
        setCartItems(newArray)
    }

    const decremetHandler = (id) => {
        const noEdit = cartItems.filter(item => item?.id !== id)
        const editItem = cartItems.filter(item => item?.id === id)
        if (editItem[0].qty == 1) {
            deleteItemHandler(editItem[0].id)
        }
        else {
            let updatedItem = {
                ...editItem[0],
                qty: editItem[0].qty - 1
            }
            let newArray = [...noEdit, updatedItem]
            setCartItems(newArray)
        }
    }

    const addToCart = (newItem) => {
        if (cartItems.length > 0) {
            const result = cartItems.filter(item => item?.id.toLowerCase().includes(newItem?.id.toLowerCase()))

            if (result?.length > 0) {
                console.log('Merge', newItem?.id)

                const noEdit = cartItems.filter(item => item?.id !== newItem?.id )
                const editItem = cartItems.filter(item => item?.id === newItem?.id)

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
    const activeScreenHandler = (screen) => {
        setTimeout(() => {
            setActiveScreen(screen)
        }, 500);
    }

    const OnConfirmOrder = () => {
        setCartItems([])
        setActiveScreen('Home')
    }

    let content = <>
        <HeaderImage />
        <MealSummary />

        <div className={`container`}>
            <h2 className={styles.title}>AVAILABLE FOODS</h2>

            <div className={`row ${styles.myRow}`} >
                {DUMMY_MEALS.map(item => <MealItem item={item} key={item?.id} addToCart={addToCart} />)}
            </div>
        </div>
    </>
    
    return (
        <Fragment>
            <Header cartLength={cartItems?.length} activeScreenHandler={activeScreenHandler} activeScreenName={activeScreen} />
            {/* CART MODAL */}
            <CartModal cartItems={cartItems} activeScreenHandler={activeScreenHandler} />
            {activeScreen === 'Home'
                ? content
                : <Cart
                    cartItems={cartItems}
                    activeScreenHandler={activeScreenHandler}
                    deleteItemHandler={deleteItemHandler}
                    incrementHandler={incrementHandler}
                    decremetHandler={decremetHandler}
                    OnConfirmOrder={OnConfirmOrder}
                />
            }
            <Footer />
        </Fragment>
    );
}

export default Home;

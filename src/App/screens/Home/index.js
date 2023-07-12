import React, { Fragment, useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import HeaderImage from '../../components/Home/HeaderImage'
import MealSummary from '../../components/Home/mealSummary'
import MealItem from '../../components/Home/mealItem'
import styles from './index.module.css'
import CartModal from '../../customModals/CartModal'
import Cart from './Cart'
import Footer from '../../components/UI/Footer'
import Login from '../Login/index'
import Orders from './Orders'


const Home = (props) => {

    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [activeScreen, setActiveScreen] = useState('Login')
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState('')

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
        if (editItem[0].qty === 1) {
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

    const fetchItems = async () => {
        setIsLoading(true)
        setHttpError('')
        const response = await fetch('https://reactjs-app-aa583-default-rtdb.firebaseio.com/meals.json')

        if (!response.ok) {
            throw new Error(response?.statusText);
        }

        let data = await response.json()
        const loadedItems = []

        for (const key in data) {
            loadedItems.push({
                id: key,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price,
                logo: data[key].logo,
            })
        }
        setProducts(loadedItems)
        setIsLoading(false)
    }

    useEffect(() => {
        let vv = localStorage.getItem('Login')
        setActiveScreen(vv)

        const getitem = async () => {
            await fetchItems().catch(error => {
                setIsLoading(false)
                setHttpError(error.message)
            })
        }
        getitem()
    }, [])

    let content 
    if (activeScreen === 'Login') {
        content = <Login activeScreenHandler={activeScreenHandler} />
    }
    else if (activeScreen === 'Checkout') {
        content = <Cart
            cartItems={cartItems}
            activeScreenHandler={activeScreenHandler}
            deleteItemHandler={deleteItemHandler}
            incrementHandler={incrementHandler}
            decremetHandler={decremetHandler}
            OnConfirmOrder={OnConfirmOrder}
        />
    }
    else if (activeScreen === 'Home') {
       content =  <>
            <HeaderImage />
            <MealSummary />

            <div className={`container`}>
               <h2 className={styles.title}>AVAILABLE FOODS</h2>
               
               {httpError
                   ? <p className={`text-center mt-5 font-weight-bold`}>{httpError}</p>
                   : isLoading && <p className={`text-center mt-5 font-weight-bold`}>Loading...</p>
               }

                <div className={`row ${styles.myRow}`}>
                   {products.map(item => <MealItem item={item} key={item?.id} addToCart={addToCart} />)}
                </div>
            </div>
        </>
    }
    else if (activeScreen === 'Orders') {
        content = <Orders activeScreenHandler={activeScreenHandler} />
    }

    
    return (
        <Fragment>
            {(activeScreen === 'Home' || activeScreen === 'Checkout' || activeScreen === 'Orders')
                && <>
                    <Header cartLength={cartItems?.length} activeScreenHandler={activeScreenHandler} activeScreenName={activeScreen} OnConfirmOrder={OnConfirmOrder} />
                    {/* CART MODAL */}
                    <CartModal cartItems={cartItems} activeScreenHandler={activeScreenHandler} />
                </>
            }
            {content}

            {/* FOOTER */}
            <Footer screen={activeScreen} />

        </Fragment>
    )
}

export default Home;

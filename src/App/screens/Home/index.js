import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import HeaderImage from '../../components/Home/HeaderImage';
import MealSummary from '../../components/Home/mealSummary';
import MealItem from '../../components/Home/mealItem'
import styles from './index.module.css'
import CartModal from '../../customModals/CartModal';

import { DUMMY_MEALS } from '../../constantData/MealList'

const Home = (props) => {

    return (
        <Fragment>
            <Header />
            <HeaderImage />

            <MealSummary />
            <div className={`container`}>
                <h2 className={styles.title}>AVAILABLE FOODS</h2>

                <div className={`row ${styles.myRow}`} >
                    {DUMMY_MEALS.map(item => <MealItem item={item} key={item?.id} /> )}
                </div>
            </div>

            {/* CART MODAL */}
            <CartModal />
        </Fragment>
    );
}

export default Home;

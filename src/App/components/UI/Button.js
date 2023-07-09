import React from 'react'
import styles from './styles/Button.module.css'

const Button = (props) => {

    const submitHandler = () => {
        props?.onClick()
    }

    return (
        <button
            onClick={submitHandler}
            type="button"
            className={`btn btn-secondary text-uppercase font-weight-bold ${styles.button} ${props?.className}`}
        >
            {props?.title && props?.title}
            {props?.children && props?.children}
        </button>
    )
}

export default Button

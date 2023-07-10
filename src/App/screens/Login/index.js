import React, { useState } from 'react'
import styles from './index.module.css'
import MyInputComp from '../../components/Login/MyInputComp'


const InputAndForm = (props) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    const emailHandler = (event) => {
        setEmail(event?.target?.value)
    }
    const onBlurEmailHandler = () => {
        if (email.trim() === '') {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
    }
    const passwordHandler = (event) => {
        setPassword(event?.target?.value)
    }
    const onBlurPasswordHandler = () => {
        if (password.trim() === '') {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
    }

    let disabled = (email?.length < 6 || emailError || password?.length < 6 || passwordError) ? true : false

    const submitFormHandler = (event) => {
        event.preventDefault();
        if (!disabled) {
            setEmail('')
            setEmailError(false)
            setPassword('')
            setPasswordError(false)
            localStorage.setItem('Login', 'Home')
            props?.activeScreenHandler('Home')
        }
        else {
            return alert(`Something went wrong...!`)
        }
    }

    return (
        <div className={`${styles.myConta}`}>
            {/* <form className={`was-validated`} onSubmit={submitFormHandler}> */}
            <div className={`row justify-content-center`}>
                <h1 className={`col-sm-11 col-md-8 col-lg-6 col-xl-6 mt-5 p-4 text-center text-white`} style={{ fontWeight: 700 }}>FOOD STORE</h1>
                <div className={`w-100`} />
                <div className={`col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2 p-4 rounded text-white`} style={{backgroundColor: '#00000066'}}>
                    <h2 className={`text-center mb-3 fw-bolder`} style={{ fontWeight: 700 }}>LOG IN</h2>
                    <form className={``} onSubmit={submitFormHandler}>
                        <MyInputComp
                            label='Email'
                            type='email'
                            className={``}
                            value={email}
                            onChangeHandler={emailHandler}
                            onBlurHandler={onBlurEmailHandler}
                            placeholder='Enter email'
                        />
                        <MyInputComp
                            label='Password'
                            type='password'
                            className={``}
                            value={password}
                            onChangeHandler={passwordHandler}
                            onBlurHandler={onBlurPasswordHandler}
                            placeholder='Enter password'
                        />
                        <div className={`row justify-content-center mt-4`}>
                            <button type="submit" className={`btn btn-info text-black pr-5 pl-5`}>
                                <span className={`bolder fw-bolder`}style={{fontWeight:700, letterSpacing:1.3}}>SUBMIT</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default InputAndForm

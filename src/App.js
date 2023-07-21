import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './App/screens/Login/Login'
import Signup from './App/screens/Login/Signup'
import ForgotPassword from './App/screens/Login/ForgotPassword'
// import Home from './App/screens/Home/index'
// import Orders from './App/screens/Home/Orders'
// import Cart from './App/screens/Home/Cart'


const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/recover-password', element: <ForgotPassword />},
    // { path: '/home', element: <Home /> },
    // { path: '/cart', element: <Cart /> },
    // { path: '/orders', element: <Orders /> },
])


const App = () => <RouterProvider router={router} />

export default App

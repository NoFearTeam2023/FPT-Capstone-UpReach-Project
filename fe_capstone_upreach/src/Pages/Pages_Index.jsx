import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './Homepage/HomePage'
import Login from "./LoginPage/Login";
import JoinAsBrand from "./JoinAsBrandPage/JoinAsBrand";
import SignUp from "./SignUpPage/SignUp"

function Pages_Index() {
    const navigate = useNavigate();

    //click button will go to login
    const navigateLogin = () => {
        navigate('/login');
    }
    //click button will go to homee page not logged in yet
    const navigateHome = () => {
        navigate('/')
    }
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <HomePage navigateHome={navigateHome} navigateLogin={navigateLogin} />
                    </>
                }
            />
            <Route
                path="/login"
                element={
                    <>
                        <Login navigateHome={navigateHome} />
                    </>
                }
            />
            <Route
                path="/join-as-brand"
                element={
                    <>
                        <JoinAsBrand navigateHome={navigateHome} />
                    </>
                }
            />
            <Route
                path="/sign-up"
                element={
                    <>
                        <SignUp navigateHome={navigateHome} />
                    </>
                }
            />
        </Routes>
    )
}

export default Pages_Index

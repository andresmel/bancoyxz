
import {Routes, Route, BrowserRouter } from "react-router-dom"
import { PublicLayout } from "../layouts/PublicLayout"
import LoginPage from "../pages/Login/Index"
import OnboardingPage from "../pages/Onboarding/index"


export const AppRoutes=()=>{
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<OnboardingPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/onboarding" element={<OnboardingPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}
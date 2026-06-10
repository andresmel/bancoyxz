
import {Routes, Route, BrowserRouter } from "react-router-dom"
import { PublicLayout } from "../layouts/PublicLayout"
import LoginPage from "../pages/Login/Index"
import Onboarding from "../pages/Onboarding/index"

export const AppRoutes=()=>{
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Onboarding/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                     <Route path="/onboarding" element={<Onboarding/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
        </>
    )
}
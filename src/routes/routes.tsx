
import {Routes, Route, BrowserRouter } from "react-router-dom"
import { PublicLayout } from "../layouts/PublicLayout"
import LoginPage from "../pages/Login/Index"
import DashboardPage from "../pages/Dashboard/index"

export const AppRoutes=()=>{
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<DashboardPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                     <Route path="/dashboard" element={<DashboardPage/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
        </>
    )
}
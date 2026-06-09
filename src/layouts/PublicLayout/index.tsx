import { Outlet } from "react-router-dom"
import { PublicHeader } from "../../components/PublicHeader"

export const PublicLayout =()=>{
   return(
    <>
    <PublicHeader/>
    <main>
        <Outlet/>
    </main>
    </>
   )

}
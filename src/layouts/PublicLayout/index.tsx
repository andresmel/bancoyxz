import { Outlet } from "react-router-dom"
import { PublicHeader } from "../../components/PublicHeader"

export const PublicLayout =()=>{
   return(
    <div className="flex flex-col h-screen overflow-hidden">
    <PublicHeader/>
    <main>
        <Outlet/>
    </main>
    </div>
   )

}
import { HeaderModules } from "../../components/HeaderModules";
import { FilterTable } from "./ui/FilterTable";




export default function ListTransfersPage() {
    return(
        <>
        <HeaderModules titulo={"Historial de Transferencias"} />
        <FilterTable />
        </>
    )
}
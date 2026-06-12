import { HeaderModules } from "../../components/HeaderModules";
import { TransferListTable } from "./ui/TranSferlISTTable";



export default function ListTransfersPage() {
    return(
        <>
        <HeaderModules titulo={"Historial de Transferencias"} />
        <TransferListTable />
        </>
    )
}
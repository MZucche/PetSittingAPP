import {useAuth} from "../auth/Authprovider"
import PortalLayout from "../layout/PortalLayout";

export default function Dashboard(){
    const auth = useAuth();
    return (
    <PortalLayout>
        <h1>Dashboard de {auth.getUser()?.name || ""}</h1>
    </PortalLayout>
)
}
// Routing principal
import {createBrowserRouter} from "react-router-dom";
import {mainRoutes} from "../portals/main-portal/routes.tsx";

const router = createBrowserRouter([
    ...mainRoutes
])

export default router
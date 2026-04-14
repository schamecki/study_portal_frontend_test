// Routing principal
import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../components/Layout/MainLayout.tsx";
import {NotFoundPage} from "../components/Layout/NotFoundPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '',
                element: <button>Click here</button>
            }
        ],
        errorElement: <NotFoundPage></NotFoundPage>
    }
])

export default router
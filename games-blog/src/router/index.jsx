import useNavigate from '@hooks/useNavigate'
import useToken from '@hooks/useToken';
import { ApiProvider } from '../hooks/useApi';

import Nav from '@components/Nav'

import Home from '@pages/Home';
import Login from '@pages/Login';
import Create from '@pages/Create';
import Update from '@pages/Update';
import Delete from '@pages/Delete';
import Logout from '@pages/Logout';
import SignIn from '@pages/SignIn';


const routes = {
    '/': {
        component: Home,
        requiresAuth: false
    },
    '/login': {
        component: Login,
        requiresAuth: false
    },
    '/create': {
        component: Create,
        requiresAuth: true
    },
    '/update': {
        component: Update,
        requiresAuth: true
    },
    '/delete': {
        component: Delete,
        requiresAuth: true
    },
    '/logout': {
        component: Logout,
        requiresAuth: false
    },
    '/signIn': {
        component: SignIn,
        requiresAuth: false
    },
}

function Router() {

    const { page } = useNavigate()
    const { token } = useToken()

    let CurrentPage = () => <h1>404 Página no encontrada</h1>

    if (routes[page]) {
        if (routes[page].requiresAuth && !token) {
            CurrentPage = Login
            window.location.replace("#/login");
        } else {
            CurrentPage = routes[page].component
        }
    }

    return (
        <div>
            <Nav />

            <ApiProvider>
                <CurrentPage />
            </ApiProvider>

        </div>
    )
}

export default Router
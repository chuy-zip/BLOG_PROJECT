import useNavigate from '@hooks/useNavigate'
import Nav from '@components/Nav'
import Home from '@pages/Home';
import Login from '@pages/Login';
import Create from '@pages/Create';
import Update from '@pages/Update'; 
import Delete from '@pages/Delete';

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
        requiresAuth: false
    },
    '/update': {
        component: Update,
        requiresAuth: false
    },
    '/delete': {
        component: Delete,
        requiresAuth: false
    },
    
}

function Router() {
    const { page } = useNavigate()

    let CurrentPage = () => <h1>404 Página no encontrada</h1>

    if (routes[page]) {
        CurrentPage = routes[page].component
    }

    return (
        <div>
            <Nav />
            <CurrentPage />
        </div>
    )
}

export default Router
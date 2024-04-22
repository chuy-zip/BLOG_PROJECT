import useNavigate from '@hooks/useNavigate'

import Nav from '@components/Nav'

import Home from '@pages/Home';


const routes = {
    '/': {
        component: Home,
        requiresAuth: false
    },
    
}

function Router() {
    const { page } = useNavigate()

    let CurrentPage = () => <h1>404 Página no encontrada 🥲</h1>

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
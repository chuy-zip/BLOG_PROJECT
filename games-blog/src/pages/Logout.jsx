import { useEffect } from 'react'
import useNavigate from "@hooks/useNavigate"

const Logout = () => {
    const { navigate } = useNavigate()

    useEffect(() => {
        localStorage.clear()

        setTimeout(() => {
            navigate('/')
            window.location.replace("#/");
            window.location.reload();

        }, 1500)
    }, [])

    return <h1 className='stateContainer'>🌀 Logging out</h1>
}

export default Logout
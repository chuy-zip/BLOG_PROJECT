import { useEffect } from 'react'
import useNavigate from "@hooks/useNavigate"
import useToken from '@hooks/useToken'

const Logout = () => {
    const { navigate } = useNavigate()
    const { setToken } = useToken()

    useEffect(() => {
        localStorage.clear()
        setToken(null)
        setTimeout(() => {
            navigate('/')
            window.location.replace("#/");
            
        }, 1500)
    }, [])

    return <h1 className='stateContainer'>🌀 Logging out</h1>
}

export default Logout
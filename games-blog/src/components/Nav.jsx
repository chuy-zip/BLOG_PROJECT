import useNavigate from "@hooks/useNavigate"
import '@style/Nav.css'

const Nav = () => {
    const { navigate, isLoggedIn } = useNavigate()

    return (
        <div className="headerContainer">
            
            

            <nav>

                <h3 style={{margin: '0px', marginTop:'10px', paddingLeft:'14px'}}>Videogame recommendations</h3> 
                
                <a href="#/" onClick={() => navigate('/')}>Home</a>
                {
                    isLoggedIn ? (
                        <>
                            <a href="#/reporte" onClick={() => navigate('/report')}>Reporte</a> 
                            <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>
                        </>
                        
                    ) : (
                        <a href="#/login" onClick={() => navigate('/login')}>Login</a>
                    )
                }
            </nav>

        </div>
        
    )
}

export default Nav
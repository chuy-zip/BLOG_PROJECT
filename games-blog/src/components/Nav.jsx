import { useEffect } from 'react';
import useNavigate from "@hooks/useNavigate"
import Icon from "./Icon"
import gitIcon from '@assets/gitIconDark.png'
import useToken from '@hooks/useToken';

import '@style/Nav.css'

const Nav = () => {
    const { page, navigate } = useNavigate()
    const { token, isLoggedIn, getRawToken } = useToken()

    let decodedToken = {}
    if (isLoggedIn) {
        decodedToken = getRawToken()
    }

    return (
        <div className="headerContainer">

            <nav>

                <h3 style={{ margin: '0px', marginTop: '10px', paddingLeft: '16px' }}>
                    {isLoggedIn ? (<>{decodedToken.username}'s </>):(<> </>)}Videogame recommendations</h3>

                <a href="#/" onClick={() => navigate('/')}>Home</a>


                {
                    isLoggedIn ? (
                        <>

                            <a href="#/create" onClick={() => navigate('/create')}>Create</a>
                            <a href="#/update" onClick={() => navigate('/update')}>Update</a>
                            <a href="#/delete" onClick={() => navigate('/delete')}>Delete</a>
                            <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>

                        </>

                    ) : (
                        <>
                            <a href="#/login" onClick={() => navigate('/login')}>Login</a>
                            <a href="#/signIn" onClick={() => navigate('/signIn')}>Sign In</a>

                        </>

                    )
                }

            </nav>

            <Icon
                imgSrc={gitIcon}
                url={"https://github.com/chuy-zip/BLOG_PROJECT"} />

        </div>

    )
}

export default Nav

import { useState } from 'react';
import PropTypes from 'prop-types';

import useToken from '@hooks/useToken';
import useNavigate from '@hooks/useNavigate';

import useApi from '@hooks/useApi';

LoginForm.propTypes = {
    formData: PropTypes.object.isRequired, 
    handleChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired,
    successMessage: PropTypes.string, 
};

function LoginForm({ formData, handleChange, handleSubmit, successMessage }) {
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>
                    Welcome! Enter your credentials
                </h1>

                <label htmlFor="username">Username:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                />

                <br />
                <label htmlFor="password">Password:</label>
                <br />
                <input
                    className="inputStyle"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}

                />

                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit">Login</button>
                    {successMessage && <p style={{ marginLeft: '10px' }}>{successMessage}</p>}
                </div>

            </form>

        </div>
    )
}

function Login() {
    const { login } = useApi()
    const { setToken } = useToken()
    const { navigate } = useNavigate()
    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(formData.username, formData.password)

            if (token) {
                setToken(token)
                navigate('/')
                window.location.replace("#/");

                setSuccessMessage('Succesfully logged In')
                setFormData({
                    username: '',
                    password: '',
                })
            }
        } catch (error) {
            console.error("Error while logging in")
            setSuccessMessage("Something went wrong. Could not log in")
        }
    }

    return (
        <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            successMessage={successMessage} />
    )
}

export default Login
import { useState } from 'react';
import PropTypes from 'prop-types';

import useApi from '@hooks/useApi';
import useNavigate from '@hooks/useNavigate';

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
                <label htmlFor="email">email:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}

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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <br />
                <input
                    className="inputStyle"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}

                />


                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit">Sign In</button>
                    {successMessage && <p style={{ marginLeft: '10px' }}>{successMessage}</p>}
                </div>

            </form>

        </div>
    )
}

function SignIn() {
    const { signIn } = useApi()
    const { navigate } = useNavigate()
    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setSuccessMessage('Please fill in all fields.');
            return;
        }
        try {

            if (formData.password === formData.confirmPassword) {
                const signedIn = await signIn(formData.username, formData.email, formData.password)

                if (signedIn) {
                    alert("Succesfully signed in, go forward with the login")

                    setSuccessMessage('Succesfully Signed In')
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    })

                    navigate('/login')
                    window.location.replace("#/login");
                }

            } else {
                setSuccessMessage("Passwords don't match")
            }

        } catch (error) {
            console.error("Error while signin in")
            setSuccessMessage("Something went wrong. Could Sign in")
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

export default SignIn
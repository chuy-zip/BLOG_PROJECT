import CryptoJS from 'crypto-js';

async function getLoginToken(username, password) {
    try {
        const response = await fetch('http://localhost:12107/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: CryptoJS.SHA256(password).toString()
            })
        })

        if (!response.ok) {
            alert("Invalid credentials, please try again")
            return null;
        }

        const { access_token } = await response.json()
        return access_token

    } catch (error) {
        console.error('Error authenticating', error.message);
        throw error;
    }
}

async function signInUser(username, email, password) {
    try {
        const response = await fetch('http://localhost:12107/signIn', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: CryptoJS.SHA256(password).toString()
            })
        })

        if (!response.ok) {
            alert("User already exists")
            return false;
        }
        
        return true

    } catch (error) {
        console.error('Error authenticating', error.message);
        throw error;
    }
}

export { getLoginToken, signInUser }
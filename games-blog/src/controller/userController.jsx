import CryptoJS from 'crypto-js';

async function getLoginToken(username, password) {
    try {
        const response = await fetch('http://localhost:22107/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: CryptoJS.MD5(password).toString()
            })
        })

        if (!response.ok) {
            alert("Invalid credentials, please try again")
            return null;
        }

        const { access_token } = await response.json()
        console.log("acces token", access_token)
        return access_token

    } catch (error) {
        console.error('Error authenticating', error.message);
        throw error;
    }
}

export { getLoginToken }
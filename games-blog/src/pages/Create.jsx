import { useState } from 'react';
import PropTypes from 'prop-types';

import useApi from '@hooks/useApi';
import useToken from '@hooks/useToken';

CreateForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired
};

function CreateForm({ handleChange, handleSubmit, formData, successMessage  }) {
    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>
                    Create a new recommendation
                </h1>

                <label htmlFor="title">Game title:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="description">Game description:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="genre">Game genre:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="platform">Main Platform:</label>
                <br />
                <select
                    className="selectStyle"
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}>
                    <option value="PC">PC</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                </select>

                <br />
                <label htmlFor="multiplayerSupport">Multiplayer Support:</label>
                <br />
                <select
                    className="selectStyle"
                    id="multiplayerSupport"
                    name="multiplayerSupport"
                    value={formData.multiplayerSupport}
                    onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <label htmlFor="onlineFeatures">Online Features:</label>
                <br />
                <select
                    className="selectStyle"
                    id="onlineFeatures"
                    name="onlineFeatures"
                    value={formData.onlineFeatures}
                    onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit">Create</button>
                    {successMessage && <p style={{ marginLeft: '10px' }}>{successMessage}</p>}
                </div>

            </form>

        </div>
    )
}

function Create() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        platform: 'PC',
        multiplayerSupport: 'true',
        onlineFeatures: 'true',
    });

    const { addGame } = useApi()
    const { token } = useToken() 
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addGame(
                formData.title,
                formData.description,
                formData.genre,
                formData.platform,
                formData.multiplayerSupport === 'true', // Convert string to boolean
                formData.onlineFeatures === 'true', // Convert string to boolean
                token
            );
            
            setSuccessMessage('Successfully added game!');
            // Optionally, reset form fields after successful submission
            setFormData({
                title: '',
                description: '',
                genre: '',
                platform: 'PC',
                multiplayerSupport: 'true',
                onlineFeatures: 'true',
            });
        } catch (error) {
            console.error('Error creating game:', error);
            setSuccessMessage('Something went wrong. Game was not added!');
            // Handle error
        }
    };

    return (
        <div>
            <CreateForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                successMessage={successMessage}/>
        </div>
    );
}

export default Create;

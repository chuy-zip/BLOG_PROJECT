import { useState } from 'react';
import createGame from '@controller/postController';
function CreateForm({handleChange, handleSubmit, formData}) {
    return (
        <div className='formContainer'>
            <form>
                <h1 style={{ textAlign: "center" }}>
                    Create a new recommendation
                </h1>

                <label htmlFor="title">Game title:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="title"
                    name="title" />

                <br />
                <label htmlFor="description">Game description:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="description"
                    name="description" />

                <br />
                <label htmlFor="genre">Game genre:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="genre"
                    name="genre" />

                <br />
                <label htmlFor="platform">Main Platform:</label>
                <br />
                <select
                    className="selectStyle"
                    id="platform"
                    name="platform">
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
                    name="multiplayerSupport">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <label htmlFor="onlineFeatures">Online Features:</label>
                <br />
                <select
                    className="selectStyle"
                    id="onlineFeatures"
                    name="onlineFeatures">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <br />
                <button type="submit">Submit</button>

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createGame(
                formData.title,
                formData.description,
                formData.genre,
                formData.platform,
                formData.multiplayerSupport === 'true', // Convert string to boolean
                formData.onlineFeatures === 'true' // Convert string to boolean
            );
            console.log('Game created:', response);
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
            // Handle error
        }
    };

    return (
        <div>
            <CreateForm />

        </div>
    );
}

export default Create;

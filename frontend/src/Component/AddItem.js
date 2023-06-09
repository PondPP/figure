import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddItem.css'

function AddItem() {
    const [ItemName, setItemName] = useState('');
    const [ItemImage, setItemImage] = useState('');
    const [ItemDescription, setItemDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', ItemName);
            if (ItemImage) { // เพิ่มการตรวจสอบว่าไฟล์รูปภาพไม่ว่าง
                formData.append('image', ItemImage);
            }
            formData.append('description', ItemDescription);

            const response = await axios.post('http://localhost:8080/adddata', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const navigate = useNavigate();
    const back = () => {
        navigate('/home');
    };

    return (
        <div className='naam'>
            <h1>Add Item</h1>
            <div className='container4'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="ItemName">Item Name:</label>
                    <input
                        id='ItemName'
                        value={ItemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder='Name...'
                    />
                    <label htmlFor="ItemImage">Item Image:</label>
                    <input
                        type="file"
                        id="ItemImage"
                        onChange={(e) => setItemImage(e.target.files[0])}
                        placeholder='Image...'
                    />

                    <label htmlFor="ItemDescription">Item Description:</label>
                    <textarea
                        id="ItemDescription"
                        value={ItemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        placeholder='Description...'
                    ></textarea>
                    <button className='add-btn' type="submit">Add Item</button>
                    <button className="btn-p" onClick={back}>Back</button>
                </form>
            </div>
        </div>
        
    )
}

export default AddItem
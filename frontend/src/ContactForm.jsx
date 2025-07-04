import React, { useState, useEffect } from 'react';

const ContactForm = ({ onAdd, closeModal, updateCallback, updateContact = {} }) => {
    const [newContact, setNewContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const updating = Object.keys(updateContact).length > 0;

    useEffect(() => {
        if (updating) {
            setNewContact({
                firstName: updateContact.firstName || '',
                lastName: updateContact.lastName || '',
                email: updateContact.email || '',
            });
        } else {
            setNewContact({
                firstName: '',
                lastName: '',
                email: '',
            });
        }
    }, [updateContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName: newContact.firstName,
            lastName: newContact.lastName,
            email: newContact.email,
        };
        const URL = updating
            ? `http://127.0.0.1:5000/update_contact/${updateContact.id}`
            : 'http://127.0.0.1:5000/create_contact';
        const options = {
            method: updating ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(URL, options);
        if (response.status !== 201 && response.status !== 200) {
            const errorData = await response.json();
            alert(errorData.message);

        } else {
            updateCallback();
            setNewContact({ firstName: '', lastName: '', email: '' }); // Reset form fields
            closeModal(); // Close the modal
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4 font-semibold">{updating ? 'Update Contact' : 'Add New Contact'}</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                    First Name:
                </label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newContact.firstName}
                    onChange={handleChange}
                    id="firstName"
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                    Last Name:
                </label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newContact.lastName}
                    onChange={handleChange}
                    id="lastName"
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newContact.email}
                    onChange={handleChange}
                    id="email"
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {updating ? 'Update Contact' : 'Add Contact'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;

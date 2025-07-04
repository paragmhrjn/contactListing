import React, { useState } from 'react';
import ContactForm from './ContactForm';

const ContactList = ({ contacts, addContact, updateCallback }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
    };

    const openEditModal = (contact) => {
        if (isModalOpen) return;
        setCurrentContact(contact);
        setIsModalOpen(true);
    };

    const handleDeleteContact = async (contactId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${contactId}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                updateCallback(); // Refresh the contact list
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleOpenModal}
                >
                    Add New Contact
                </button>
            </div>

            {contacts.length === 0 ? (
                <p className="text-center text-gray-500">No contacts yet.</p>
            ) : (
                <ol className="divide-y divide-gray-200">
                    <li className="font-semibold text-sm text-gray-700 grid grid-cols-4 gap-4 py-2 bg-gray-100">
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span>Email</span>
                        <span>Actions</span>
                    </li>
                    {contacts.map((contact) => (
                        <li key={contact.id} className="grid grid-cols-4 gap-4 py-2 hover:bg-gray-50">
                            <span className="text-gray-800">{contact.firstName}</span>
                            <span className="text-gray-800">{contact.lastName}</span>
                            <span className="text-gray-800">{contact.email}</span>
                            <div>
                                <button
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                    onClick={() => openEditModal(contact)}
                                >
                                    Update
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteContact(contact.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-30">
                    <ContactForm
                        onAdd={addContact}
                        closeModal={handleCloseModal}
                        updateCallback={updateCallback}
                        updateContact={currentContact}
                    />
                </div>
            )}
        </div>
    );
};

export default ContactList;

import React, { useState } from 'react';
import ContactForm from './ContactForm'; // Import the ContactForm component

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddContact = (newContact) => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Add New Contact Button */}
            <div className="mb-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleOpenModal}
                >
                    Add New Contact
                </button>
            </div>

            {/* Contact List */}
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
                    {contacts.map((contact, index) => (
                        <li
                            key={index}
                            className="grid grid-cols-4 gap-4 py-2 hover:bg-gray-50"
                        >
                            <span className="text-gray-800">{contact.firstName}</span>
                            <span className="text-gray-800">{contact.lastName}</span>
                            <span className="text-gray-800">{contact.email}</span>
                            <div>
                                <button className="text-blue-500 hover:text-blue-700 mr-2">
                                    Update
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            )}

            {/* Modal for adding new contact */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <ContactForm onAdd={handleAddContact} closeModal={handleCloseModal} />
                </div>
            )}
        </div>
    );
};

export default ContactList;

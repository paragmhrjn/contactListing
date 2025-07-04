import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'

function App() {
  // setting up state
  const [contacts, setContact] = useState([])
  const addContact = (newContact) => {
    setContact((prevContacts) => [...prevContacts, newContact]);
  };
  useEffect(() => {
    fetchdata()
  }, [])
  // creating asynchronous function to fetch data
  const fetchdata = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContact(data.contacts)
    console.log(data.contacts)
  }
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Contact List</h1>
        <ContactList contacts={contacts} addContact={addContact} updateCallback={fetchdata} />
      </div>

    </>
  )
}

export default App

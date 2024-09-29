import React, { useState } from 'react';
import ContactList from './components/ContactList';
import Contact from './components/Contact';

const App = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleEditContact = (index: number) => {
    const contacts = getContacts();
    const contact = contacts[index];
    setSelectedContact(contact);
    setIsEdit(true);
  };

  const handleDeleteContact = (index: number) => {
    deleteContact(index);
  };

  const handleCloseContactForm = () => {
    setIsEdit(false);
    setSelectedContact(null);
  };

  return (
    <div>
      <h1>Your contacts</h1>
      <br />
      <ContactList onEditContact={handleEditContact} onDeleteContact={handleDeleteContact} />
      <button onClick={() => setIsEdit(false)}>Add Contact</button>
      <br />
      {isEdit && <Contact isEdit={isEdit} contact={selectedContact} onClose={handleCloseContactForm} />}
    </div>
  );
};

export default App;
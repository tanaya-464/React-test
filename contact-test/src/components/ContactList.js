// src/components/ContactList.js
import React, { useEffect, useState } from 'react';
import ContactTile from './ContactTile';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleEdit = (index) => {
    navigate(`/contact?edit=${index}`);
  };

  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts available. Please add some.</p>
      ) : (
        contacts.map((contact, index) => (
          <ContactTile
            key={index}
            contact={contact}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;

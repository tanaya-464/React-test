import React, { useEffect, useState } from 'react';
import { getContacts,saveContact, updateContact } from '../utils/contactApi';
import Contact from '../utils/contactApi';

interface ContactListProps {
  onEditContact: (index: number) => void;
  onDeleteContact: (index: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEditContact, onDeleteContact }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const contacts = getContacts();
    setContacts(contacts);
  }, []);

  const handleDeleteContact = (index: number) => {
    onDeleteContact(index);
    const updatedContacts = getContacts();
    setContacts(updatedContacts);
  };

  return (
    <div id="contact-list" className="tile-view">
      {contacts.map((contact, index) => (
        <div key={index} className="tile">
          <div className="actions">
            <button onClick={() => onEditContact(index)}>Edit</button>
            <button onClick={() => handleDeleteContact(index)}>Delete</button>
          </div>
          <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Address Type:</strong> {contact.addressType}</p>
          <p><strong>Address:</strong> {contact.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
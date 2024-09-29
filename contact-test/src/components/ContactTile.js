// src/components/ContactTile.js
import React from 'react';

const ContactTile = ({ contact, index, onEdit, onDelete }) => (
  <div className="tile">
    <div className="actions">
      <button onClick={() => onEdit(index)}>Edit</button>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
    <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
    <p><strong>Phone:</strong> {contact.phone}</p>
    <p><strong>Email:</strong> {contact.email}</p>
    <p><strong>Address Type:</strong> {contact.addressType}</p>
    <p><strong>Address:</strong> {contact.address}</p>
  </div>
);

export default ContactTile;

import React, { useState } from 'react';
import { saveContact, updateContact } from '../utils/contactApi';



interface ContactProps {
  isEdit: boolean;
  contact: Contact | null;
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isEdit, contact, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isEdit && contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setPhone(contact.phone);
      setEmail(contact.email);
      setAddressType(contact.addressType);
      setAddress(contact.address);
    }
  }, [isEdit, contact]);

  const handleSubmit = () => {
    const newContact = {
      firstName,
      lastName,
      phone,
      email,
      addressType,
      address,
    };

    if (isEdit && contact) {
      updateContact(contact.index, newContact);
    } else {
      saveContact(newContact);
    }

    onClose();
  };

  return (
    <div className="form-container">
      <h1>Contact Form</h1>
      <form>
        <label htmlFor="first-name">First Name:</label>
        <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <label htmlFor="last-name">Last Name:</label>
        <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

        <label htmlFor="phone">Phone No:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="\d{10}" />

        <label htmlFor="email">Email ID:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <div className="radio-group">
          <label>
            <input type="radio" id="home" name="address-type" value="Home" checked={addressType === 'Home'} onChange={() => setAddressType('Home')} required /> Home
          </label>
          <label>
            <input type="radio" id="office" name="address-type" value="Office" checked={addressType === 'Office'} onChange={() => setAddressType('Office')} required /> Office
          </label>
        </div>

        <div id="address-field">
          <label htmlFor="address">Address:</label>
          <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required></textarea>
        </div>

        <button type="button" onClick={onClose}>Back</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
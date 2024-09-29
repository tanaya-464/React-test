// src/components/ContactForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateEmail, validatePhone } from '../utils/validation';

const ContactForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editIndex = params.get('edit');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    addressType: '',
    address: '',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (editIndex !== null) {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const contact = contacts[editIndex];
      if (contact) {
        setFormData(contact);
      }
    }
  }, [editIndex]);

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'radio') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email, addressType, address } = formData;
    const isValid =
      firstName.trim() &&
      lastName.trim() &&
      validatePhone(phone) &&
      validateEmail(email) &&
      addressType &&
      address.trim();

    if (editIndex !== null) {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const contact = contacts[editIndex];
      const isUnchanged =
        firstName === contact.firstName &&
        lastName === contact.lastName &&
        phone === contact.phone &&
        email === contact.email &&
        addressType === contact.addressType &&
        address === contact.address;

      setIsSubmitDisabled(!isValid || isUnchanged);
    } else {
      setIsSubmitDisabled(!isValid);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (editIndex !== null) {
      contacts[editIndex] = formData;
    } else {
      contacts.push(formData);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit} id="contact-form">
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone No:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="\d{10}"
          title="Please enter a 10-digit phone number"
        />

        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="addressType"
              value="Home"
              checked={formData.addressType === 'Home'}
              onChange={handleChange}
              required
            />{' '}
            Home
          </label>
          <label>
            <input
              type="radio"
              name="addressType"
              value="Office"
              checked={formData.addressType === 'Office'}
              onChange={handleChange}
              required
            />{' '}
            Office
          </label>
        </div>

        <div id="address-field" style={{ display: formData.addressType ? 'block' : 'none' }}>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleBack}>
            Back
          </button>
          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

// utils/contactApi.ts
interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressType: string;
  address: string;
}

export const getContacts = (): Contact[] => {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
};

export const saveContact = (contact: Contact) => {
  const contacts = getContacts();
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export const updateContact = (index: number, contact: Contact) => {
  const contacts = getContacts();
  contacts[index] = contact;
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export const deleteContact = (index: number) => {
  const contacts = getContacts();
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export default Contact;
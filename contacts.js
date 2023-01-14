const fs = require("fs/promises");
const path = require("node:path");
const { v1 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		console.log(error.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const result = contacts.find((contact) => contact.id === contactId);
		if (!result) {
			return null;
		}

		return result;
	} catch (error) {
		console.log(error.message);
	}
};

const removeContact = async (contactId) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((contact) => contact.id === contactId);
		if (index === -1) {
			return null;
		}
		const removeContact = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts));
		return removeContact;
	} catch (error) {
		console.log(error.message);
	}
};

const addContact = async (name, email, phone) => {
	try {
		const contacts = await listContacts();
		const newContacts = {
			name,
			email,
			phone,
			id: v1(),
		};
		contacts.push(newContacts);
		await fs.writeFile(contactsPath, JSON.stringify(contacts));
		return newContacts;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};

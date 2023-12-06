import { controllerWrapper } from "../decorators/controllerWrapper.js";
import contactsService from "../models/contacts.js";
import { HttpError } from "../utils/HttpError.js";

const getAllContacts = controllerWrapper(async (req, res, next) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  res.json(contact);
});

const addNewContact = controllerWrapper(async (req, res, next) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
});

const updateContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json(updatedContact);
});

const deleteContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.removeContact(contactId);
  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
});

export default {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContactById,
  deleteContactById,
};

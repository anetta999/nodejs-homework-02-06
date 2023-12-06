import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../../validation-schemas/contacts-schemas.js";

export const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(contactsControllers.getAllContacts)
  .post(validateBody(addContactSchema), contactsControllers.addNewContact);

contactsRouter
  .route("/:contactId")
  .get(contactsControllers.getContactById)
  .delete(contactsControllers.deleteContactById)
  .put(
    validateBody(updateContactSchema),
    contactsControllers.updateContactById
  );

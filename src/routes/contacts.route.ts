import { Router } from 'express';
import ContactsController from '@/controllers/contacts.controller';
import { CreateContactDto } from '@/dtos/contacts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ContactsRoute implements Routes {
  public path = '/contacts';
  public router = Router();
  public contactsController = new ContactsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.contactsController.getContacts);
    this.router.get(`${this.path}/request-callbacks`, this.contactsController.getRequestCallbacks);
    this.router.get(`${this.path}/:id(\\d+)`, this.contactsController.getContactById);
    this.router.post(`${this.path}`, validationMiddleware(CreateContactDto, 'body'), this.contactsController.createContact);
  }
}

export default ContactsRoute;

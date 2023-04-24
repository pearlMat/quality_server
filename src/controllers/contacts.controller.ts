import { NextFunction, Request, Response } from 'express';
import { Contact } from '@prisma/client';
import { CreateContactDto } from '@dtos/contacts.dto';
import ContactService from '@/services/contacts.service';
//import ContactService from '@services/contacts.service';

class ContactsController {
  public ContactService = new ContactService();

  public getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllContactsData: Contact[] = await this.ContactService.findAllContacts();

      res.status(200).json({ data: findAllContactsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getContactById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ContactId = Number(req.params.id);
      const findOneContactData: Contact = await this.ContactService.findContactById(ContactId);

      res.status(200).json({ data: findOneContactData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ContactData: CreateContactDto = req.body;
      const createContactData: Contact = await this.ContactService.createContact(ContactData);

      res.status(201).json({ data: createContactData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactsController;

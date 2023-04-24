import { PrismaClient, Contact } from '@prisma/client';
import { CreateContactDto } from '@/dtos/contacts.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ContactService {
  public contacts = new PrismaClient().contact;

  public async findAllContacts(): Promise<Contact[]> {
    const allContacts: Contact[] = await this.contacts.findMany();
    return allContacts;
  }

  public async findAllContactCallbacks(): Promise<Contact[]> {
    const allCallbacks: Contact[] = await this.contacts.findMany({
      where: {
        enquiry_title: null,
      },
    });
    return allCallbacks;
  }

  public async findContactById(ContactId: number): Promise<Contact> {
    if (isEmpty(ContactId)) throw new HttpException(400, 'ContactId is empty');

    const findContact: Contact = await this.contacts.findUnique({ where: { id: ContactId } });
    if (!findContact) throw new HttpException(409, "Contact doesn't exist");

    return findContact;
  }

  public async createContact(ContactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(ContactData)) throw new HttpException(400, 'ContactData is empty');

    const createContactData: Contact = await this.contacts.create({ data: { ...ContactData } });
    return createContactData;
  }
}

export default ContactService;

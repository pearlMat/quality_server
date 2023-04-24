import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ContactsRoute from './routes/contacts.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ContactsRoute(), new AuthRoute()]);

app.listen();

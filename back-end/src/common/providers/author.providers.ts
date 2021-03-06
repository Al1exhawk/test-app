import { Connection } from 'mongoose';
import { AuthorSchema } from '../../documents';
import { AUTHOR_MODEL, DATABASE_CONNECTION } from '../../environment/constants';

export const AuthorProviders = [
  {
    provide: AUTHOR_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Author', AuthorSchema),
    inject: [DATABASE_CONNECTION],
  },
];

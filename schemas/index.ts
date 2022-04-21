import {gql} from 'apollo-server-express';
import chatThreadSchema from './chatThreadSchema';
import chattingSchema from './chattingSchema';
import messageSchema from './messageSchema';
import userSchema from './userSchema';

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
   linkSchema,
   userSchema,
   chatThreadSchema,
   messageSchema,
   chattingSchema
];

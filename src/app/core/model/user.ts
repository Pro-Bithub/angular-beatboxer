import { Community } from './community';

export class User extends Community {
	description: string;
	email: string;
	phone: string;
	address: string;
	password: string;
	username: string;
}

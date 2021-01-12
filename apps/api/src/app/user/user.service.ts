import { Injectable } from '@nestjs/common';
import { User } from '@asi-ecommerce/api-interfaces';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      firstName: 'Alexandre',
      lastName: 'Sirko',
      email: 'sirko.alexandre@gmail.com',
      password: 'test',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    },
    {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  getMe(): User {
    return {
      firstName: 'Alexandre',
      lastName: 'Sirko',
      email: 'sirko.alexandre@gmail.com',
      password: 'test',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    };
  }
}

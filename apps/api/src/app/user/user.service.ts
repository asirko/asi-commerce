import { Injectable } from '@nestjs/common';
import { User } from '@asi-ecommerce/api-interfaces';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 0,
      firstName: 'Alexandre',
      lastName: 'Sirko',
      email: 'sirko.alexandre@gmail.com',
      password: 'aaAA11++',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    },
    {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'aaAA11++',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  getUserById(id: number): User {
    return this.users.find(u => u.id === id);
  }
}

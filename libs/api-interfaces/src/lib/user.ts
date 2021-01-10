export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  allowNewsLetter: boolean;
  adresses: Address[];
}

interface Address {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

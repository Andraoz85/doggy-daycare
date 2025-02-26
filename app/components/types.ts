export interface Owner {
  name: string;
  lastName: string;
  phoneNumber: number;
}

export interface Dog {
  id: number;
  name: string;
  sex: "male" | "female";
  breed: string;
  img: string;
  present: boolean;
  age: number;
  chipNumber: string;
  owner: Owner;
}
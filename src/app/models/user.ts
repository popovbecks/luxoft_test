export interface User {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: string;
}

export interface UserResponseData {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: Address;
}

interface Address {
    city: string;
    street: string;
}
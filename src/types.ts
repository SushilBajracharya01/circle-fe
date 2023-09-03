import { ReactElement } from "react";

export interface IInputProps {
    label?: string;
    name: string;
    type?: 'email' | 'text' | 'number' | 'password';
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
}

export interface IButtonProps {
    varient?: 'success' | 'outline-success' | 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary';
    type?: 'button' | 'submit';
    label: string;
    icon?: ReactElement;
    onClick: () => void;
}

export interface IPasswordProps {
    name: string;
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
}

export interface IRegisterFormData {
    username: string;
    fullname: string;
    password: string;
    email: string;
    country: string;
}
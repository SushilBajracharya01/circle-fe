import { ReactElement } from "react";

export interface IInputProps {
    label?: string;
    name: string;
    type?: 'email' | 'text' | 'number' | 'password';
    isRequired?: boolean;
}

export interface IButtonProps {
    varient?: 'success' | 'outline-success' | 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary';
    type?: 'button' | 'submit';
    label: string;
    icon?: ReactElement;
    onClick: () => void;
}
import { ReactElement } from "react";

export interface IInputProps {
    label?: string;
    name: string;
    type?: 'text' | 'number' | 'password';
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    disabled?: boolean;
}

export interface IButtonProps {
    varient?: 'success' | 'outline-success' | 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary';
    type?: 'button' | 'submit';
    label: string;
    icon?: ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export interface IPasswordProps {
    name: string;
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    disabled?: boolean;
}

export interface IRegisterFormData {
    username: string;
    fullname: string;
    password: string;
    email: string;
    country: string;
}

export interface IAvatarProps {
    url?: string;
    size?: "sm" | "md" | "lg" | "4xl",
    showStatus?: boolean;
    isOnline?: boolean;
}

export interface ILoginFormProps {
    email: string;
    password: string;
}

export interface IAuthOptionsProps {
    multipart?: boolean;
    refreshToken?: string;
}

export interface ISideMenuProps {
    showMenu: boolean;
}

export interface IAuthHeaderProps {
    showMenu: boolean;
    handleToggleMenu: () => void;
}
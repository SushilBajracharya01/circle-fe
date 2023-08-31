export interface IInputProps {
    label?: string;
    name: string;
    type?: 'email' | 'text' | 'number' | 'password';
    isRequired?: boolean;
}
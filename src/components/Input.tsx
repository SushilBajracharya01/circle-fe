import { IInputProps } from "../types"
import Password from "./Password";

function Input({ label, name, type, isRequired }: IInputProps) {

    let element = null;

    switch (type) {
        case 'password':
            element = <Password />
            break;
        default:
            element = <div className="mt-1">
                <input
                    id={name}
                    name={name}
                    type={type}
                    required={isRequired}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
    }
    return (
        <div>
            {
                label &&
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            }

            {element}
        </div>
    )
}

export default Input
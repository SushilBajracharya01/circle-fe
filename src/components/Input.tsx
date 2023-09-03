import { IInputProps } from "../types"
import Password from "./Password";

export default function Input({ label, name, type, isRequired, register, errors }: IInputProps) {

    let element = null;

    switch (type) {
        case 'password':
            element = <Password name={name} isRequired={isRequired} register={register} />
            break;
        default:
            element = <div className="mt-1">
                <input
                    id={name}
                    name={name}
                    type={type}
                    {
                    ...(register ? register(name) : {})
                    }
                    // required={isRequired}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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

            {
                errors &&
                errors[name] &&
                <div className="text-red-600 mt-1 text-sm">
                    {errors[name].message}
                </div>
            }

        </div>
    )
}
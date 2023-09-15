import { IInputProps } from "../types"
import Password from "./Password";

export default function Input({ label, name, type, isRequired, register, errors, className, placeholder }: IInputProps) {

    let element = null;

    switch (type) {
        case 'password':
            element = <Password name={name} isRequired={isRequired} register={register} />
            break;
        case 'textarea':
            element = <div className="mt-1">
                <textarea
                    rows={5}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    {
                    ...(register ? register(name) : {})
                    }
                    // required={isRequired}
                    className="circle_input"
                />
            </div>
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
                    className="circle_input"
                    placeholder={placeholder}
                />
            </div>
    }
    return (
        <div className={`${className}`}>
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
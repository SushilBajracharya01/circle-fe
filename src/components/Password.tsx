import { useState } from "react";

//
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

//
import { IPasswordProps } from "../types";

/**
 * 
 */
export default function Password({ name, isRequired, register }: IPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(prev => !prev);
    return (
        <div className="relative">
            <input
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                required={isRequired}
                className="circle_input"
                {...(register ? register(name) : {})}
            />

            <span className="absolute top-2.5 right-3 cursor-pointer" onClick={toggleShowPassword}>
                {
                    showPassword ?
                        <AiFillEye className="text-gray-600" fontSize='18' />
                        :
                        <AiFillEyeInvisible className="text-gray-600" fontSize="18" />
                }
            </span>

        </div>
    )
}
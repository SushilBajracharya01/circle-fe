import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Password() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(prev => !prev);
    return (
        <div className="relative">
            <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

export default Password
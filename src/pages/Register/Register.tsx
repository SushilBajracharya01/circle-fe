import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Logo from "../../components/Logo"
import Input from "../../components/Input"
import Button from "../../components/Button"

//
import RegisterImage from '../../assets/register-img.svg';

//
import registerSchema from "../../schemas/RegisterSchema";

//
import { IRegisterFormData } from "../../types";
import { useMutationHook } from "../../hooks/react-query/useQueryHook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//
import PhotoInput from "../../components/PhotoInput/PhotoInput";


/**
 * 
 */
export default function RegisterPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const { mutate, isLoading } = useMutationHook({
        queryRoute: '/users',
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('User successfully registered. Please login.');
                navigate('/');
            }
        }
    })

    const [previewUrl, setPreviewUrl] = useState<string | undefined>();
    const [profileImage, setProfileImage] = useState<FileList | null>(null);

    useEffect(() => {
        if (profileImage && profileImage[0]) {
            setPreviewUrl(URL.createObjectURL(profileImage[0]));
        }
        else {
            setPreviewUrl(undefined);
        }
    }, [profileImage])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? event.target.files : null;

        setProfileImage(files);
    };

    const onSubmit = (data: IRegisterFormData) => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('fullname', data.fullname);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('country', data.country);
        if (profileImage) {
            formData.append('photo', profileImage[0])
        }
        mutate(formData);
    }
    return (
        <div className="container mx-auto min-h-screen py-8 px-4">
            <div className="md:mb-5">
                <Logo />
            </div>
            <form className="md:space-y-8 divide-y" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 ">
                    <div className="hidden md:block">
                        <div>
                            <img src={RegisterImage} className="w-full object-contain max-w-[600px]" />
                            <span className="text-gray-300">
                                <a className="" href="https://www.freepik.com/free-vector/crowd-diverse-people-standing-together-around-empty-banner_8609070.htm#query=community%20vector&position=3&from_view=search&track=ais">Image by pch.vector</a> on Freepik
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <h2 className="text-4xl font-bold text-gray-800">Register your Account</h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Fill up this short form to join us and create your circle.
                            </p>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Username
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg">
                                        <Input
                                            name="username"
                                            isRequired
                                            type="text"
                                            register={register}
                                            errors={errors}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Fullname
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg">
                                        <Input
                                            name="fullname"
                                            isRequired
                                            type="text"
                                            register={register}
                                            errors={errors}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Email
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg">
                                        <Input
                                            name="email"
                                            isRequired
                                            register={register}
                                            errors={errors}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Password
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg">
                                        <Input
                                            name="password"
                                            // isRequired
                                            type="password"
                                            register={register}
                                            errors={errors}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Country
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg">
                                        <Input
                                            name="country"
                                            isRequired
                                            type="text"
                                            register={register}
                                            errors={errors}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <PhotoInput
                                        previewUrl={previewUrl}
                                        onPhotoChange={onPhotoChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button
                                label="Submit"
                                isLoading={isLoading}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="mt-4 text-gray-700">
                            Already have an account? <Link to="/login" className="ml-2 font-bold text-blue-600">Sign in</Link>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}
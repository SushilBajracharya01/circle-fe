import { useForm } from "react-hook-form";
import Input from "../../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { circleSchema } from "../../../schemas/Schemas";
import { useMutationHook } from "../../../hooks/react-query/useQueryHook";
import { toast } from "react-toastify";
import { ICircleFormData, ICircleFormProps } from "../../../types";
import { useEffect, useState } from "react";
import PhotoInput from "../../PhotoInput/PhotoInput";
import Button from "../../Button";

export default function CircleForm({ handleHideForm }: ICircleFormProps) {
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(circleSchema),
    });

    const { mutate, isLoading } = useMutationHook({
        queryRoute: '/circles',
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('Circle created successfully.');
            }
        }
    });

    const onSubmit = (data: ICircleFormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('moto', data.moto || "");
        formData.append('description', data.description);

        if (profileImage) {
            formData.append('photo', profileImage[0])
        }
        mutate(formData)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? event.target.files : null;

        setProfileImage(files);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">New Circles</h2>

                <Button
                    label="X"
                    onClick={handleHideForm}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PhotoInput
                    previewUrl={previewUrl}
                    onPhotoChange={onPhotoChange}
                    className="mb-5"
                />

                <Input
                    label="Name"
                    name="name"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    isRequired
                    type="text"
                    className="mb-5"
                />

                <Input
                    label="Moto"
                    name="moto"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    isRequired
                    type="text"
                    className="mb-5"
                />
                
                <Input
                    label="Description"
                    name="description"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    isRequired
                    type="textarea"
                    className="mb-5"
                />

                <Button
                    label="Submit"
                    isLoading={isLoading}
                />
            </form>
        </div>
    )
}
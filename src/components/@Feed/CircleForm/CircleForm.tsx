import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Input from "../../Input";
import Button from "../../Button";
import PhotoInput from "../../PhotoInput/PhotoInput";

//
import { circleSchema } from "../../../schemas/Schemas";
import { useMutationHook } from "../../../hooks/react-query/useQueryHook";
import { ICircleFormData, ICircleFormProps, typeT } from "../../../types";

/**
 * 
 */
export default function CircleForm({ circle, handleHideForm }: ICircleFormProps) {
    const queryClient = useQueryClient();

    const [previewUrl, setPreviewUrl] = useState<string | undefined>();
    const [profileImage, setProfileImage] = useState<FileList | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


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
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(circleSchema),
    });

    useEffect(() => {
        if (!circle) return;
        setValue('name', circle.name);
        setValue('moto', circle.moto);
        setValue('description', circle.description);
    }, [circle, setValue]);

    const { mutate, isLoading: isCreatingCircle } = useMutationHook({
        queryRoute: '/circles',
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('Circle created successfully.');
                queryClient.invalidateQueries(['my-circle']);
                handleHideForm();
            }
        }
    });

    const { mutate: updateCircle, isLoading: isUpdatingCircle } = useMutationHook({
        queryRoute: `/circles/${circle?._id}`,
        method: 'patch',
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('Circle updated successfully.');
                queryClient.invalidateQueries([`circle ${circle?._id}`]);
                handleHideForm();
            }
        }
    });

    const onSubmit = (data: ICircleFormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('moto', data.moto || "");
        formData.append('description', data.description);

        if (profileImage) {
            formData.append('photo', profileImage[0]);
        }

        if (circle) {
            updateCircle(formData)
        }
        else {
            mutate(formData)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? event.target.files : null;

        setProfileImage(files);
    };


    useEffect(() => {
        setIsLoading(isCreatingCircle || isUpdatingCircle);
    }, [isCreatingCircle, isUpdatingCircle]);

    return (
        <div className="p-4 bg-gray-100">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">{circle ? `Edit ${circle.name}` : 'New Circles'} </h2>

                <Button
                    label="X"
                    onClick={handleHideForm}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PhotoInput
                    previewUrl={previewUrl || circle?.photo?.public_id}
                    isCloudinary={Boolean(!previewUrl && circle?.photo)}
                    onPhotoChange={onPhotoChange}
                    className="mb-5"
                    isPeople={false}
                    disabled={isLoading}
                />

                {
                    CircleFormStructure.map(input =>
                        <Input
                            key={input.name}
                            label={input.label}
                            name={input.name}
                            register={register}
                            disabled={isLoading}
                            errors={errors}
                            isRequired
                            type={input.type}
                            className="mb-5"
                        />)
                }

                <Button
                    label="Submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    )
}

const CircleFormStructure: { label: string; name: string; type: typeT }[] = [
    {
        label: "Name",
        name: 'name',
        type: 'text'
    }, {
        label: "Moto",
        name: 'moto',
        type: 'text'
    }, {
        label: "Description",
        name: 'description',
        type: 'textarea'
    },
]
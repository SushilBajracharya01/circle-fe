import { useMemo, useState } from "react";

//
import CloudinaryImg from "../CloudinaryImg";

//
import { IGridPhotoPreviewerProps } from "../../types";

/**
 * 
 */
export default function GridPhotoPreviewer({ previews = [], isCloudinary = true }: IGridPhotoPreviewerProps) {
    const [firstImage, setFirstImage] = useState<string>('');
    const [secondRowImages, setSecondRowImages] = useState<string[] | []>([]);
    const [remainingImages, setRemainingImages] = useState<string[] | []>([]);

    useMemo(() => {
        const tempRemainingImages: string[] = [];
        const tempSecondRowImages: string[] = [];

        if (!previews.length) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previews.forEach((image: any, index: number) => {
            const tempImage: string = isCloudinary ? image.public_id : image;
            if (index === 0) {
                setFirstImage(tempImage);
            }
            else if (index < 4) {
                tempSecondRowImages.push(tempImage);
            }
            else {
                tempRemainingImages.push(tempImage);
            }
        })
        setSecondRowImages(tempSecondRowImages);
        setRemainingImages(tempRemainingImages)
    }, [isCloudinary, previews])


    let className = "";
    switch (secondRowImages.length) {
        case 1:
            className = "grid-cols-1";
            break;
        case 2:
            className = "grid-cols-6";
            break;
        default:
            className = "grid-cols-3";
    }

    if (!previews.length) {
        return null;
    }

    return (
        <div className="mt-2">
            <div className="mb-0.5">
                {
                    isCloudinary ?
                        <CloudinaryImg publicId={firstImage} width={600} height={400} className="object-contain" />
                        :
                        <img src={firstImage} width={600} height={400} className="object-contain" />
                }
            </div>
            <div className={`grid gap-0.5 ${className}`}>
                {
                    secondRowImages.map((image: string, index: number) => (
                        <div className={'w-full relative'} key={image}>
                            {
                                isCloudinary ?
                                    <CloudinaryImg publicId={image} width={400} height={200} className="h-full w-full object-cover" />
                                    :
                                    <img src={firstImage} width={400} height={200} className="object-contain" />
                            }
                            {
                                (index == 2 && remainingImages.length > 0) &&
                                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-2xl font-bold text-white bg-black/30">
                                    + {remainingImages.length}
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
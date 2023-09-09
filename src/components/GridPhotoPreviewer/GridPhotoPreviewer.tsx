import { useMemo, useState } from "react";
import { IGridPhotoPreviewerProps } from "../../types";
import CloudinaryImg from "../CloudinaryImg";

/**
 * 
 */
export default function GridPhotoPreviewer({ previews = [] }: IGridPhotoPreviewerProps) {
    const [firstImage, setFirstImage] = useState<string>('');
    const [secondRowImages, setSecondRowImages] = useState<string[] | []>([]);
    const [remainingImages, setRemainingImages] = useState<string[] | []>([]);

    useMemo(() => {
        const tempRemainingImages: string[] = [];
        const tempSecondRowImages: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previews.forEach((image: any, index: number) => {
            if (index === 0) {
                setFirstImage(image.public_id);
            }
            else if (index < 4) {
                tempSecondRowImages.push(image.public_id);
            }
            else {
                tempRemainingImages.push(image.public_id);
            }
        })
        setSecondRowImages(tempSecondRowImages);
        setRemainingImages(tempRemainingImages)
    }, [previews])


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

    return (
        <div>
            <div className="mb-0.5">
                <CloudinaryImg publicId={firstImage} width={600} height={400} className="object-contain" />
            </div>
            <div className={`grid gap-0.5 ${className}`}>
                {
                    secondRowImages.map((image: string, index: number) => (
                        <div className={'w-full relative'}>
                            <CloudinaryImg publicId={image} width={400} height={200} className="h-full w-full object-cover" />
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
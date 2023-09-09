import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { ICloudinaryImgProps } from "../types";
import cld from "../utils/cloudinary";

export default function CloudinaryImg({ publicId, className, width, height }: ICloudinaryImgProps) {
    const img = cld.image(publicId);
    if (width && height) {
        img.resize(thumbnail().width(width).height(height))
    }
    return (
        <AdvancedImage className={className} cldImg={img} plugins={[lazyload(), responsive(), placeholder()]} />
    )

}
import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { ICloudinaryImgProps } from "../types";
import cld from "../utils/cloudinary";

export default function CloudinaryImg({ publicId, width, height }: ICloudinaryImgProps) {
    const img = cld.image(publicId);
    img.resize(thumbnail().width(width).height(height))
    return (
        <AdvancedImage cldImg={img} plugins={[lazyload(), responsive(), placeholder()]} />
    )

}
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

export interface IInputProps {
    label?: string;
    name: string;
    type?: 'text' | 'number' | 'password' | 'textarea';
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
}

export interface IButtonProps {
    varient?: 'success' | 'outline-success' | 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary';
    type?: 'button' | 'submit';
    label?: string;
    icon?: ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
}

export interface IPasswordProps {
    name: string;
    isRequired?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    disabled?: boolean;
}

export interface IRegisterFormData {
    username: string;
    fullname: string;
    password: string;
    email: string;
    country: string;
}

export interface IAvatarProps {
    url?: string;
    size?: "sm" | "md" | "lg" | "xl" | "4xl",
    showStatus?: boolean;
    isOnline?: boolean;
    isPeople?: boolean;
    isCloudinary?: boolean;
}

export interface ILoginFormProps {
    email: string;
    password: string;
}

export interface IAuthOptionsProps {
    multipart?: boolean;
    refreshToken?: string;
}

export interface ISideMenuProps {
    showMenu: boolean;
}

export interface IAuthHeaderProps {
    showMenu: boolean;
    handleToggleMenu: () => void;
}

export interface ILogoProps {
    noText?: boolean;
    horizontal?: boolean;
}

export interface IDropDownButtonProps {
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    onClick: () => void;
}

export interface INavButtonProps {
    to: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
}

export interface IUserProps {
    active: boolean;
    country: string;
    createdAt: string;
    email: string;
    fullname: string;
    role: string;
    updatedAt: string;
    username: string;
    _id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo?: any;
}

export interface ISidebarItemProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title?: string;
    href: string;
}

export interface ISidebarProps {
    user: IUserProps | null;
}

export interface ICloudinaryImgProps {
    className?: string;
    publicId: string;
    width?: number;
    height?: number;
}

export interface IMainFeedProps {
    children: ReactNode;
}

export interface ICircle {
    createdAt: string;
    createdBy: string;
    members: string[];
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo: any;
    moto: string;
    name: string;
    _id: string;
}
export interface ICircleProps {
    circle: ICircle;
}
export interface ICircleFormData {
    name: string;
    description: string;
    moto?: string;
}

export interface IPhotoInputProps {
    previewUrl?: string;
    onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    isPeople?: boolean;
    disabled?: boolean;
}

export interface ICircleFormProps {
    handleHideForm: () => void
}

export interface IColumnLayoutProps {
    leftComponent: ReactNode;
    centerComponent: ReactNode;
    rightComponent: ReactNode;
}

export interface ICircleMainProps {
    circleId: string;
}
export interface ICreatedBy {
    _id: string;
    username: string;
    fullname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo: any;
}
export interface IPost {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photos: any,
    _id: string,
    circleId: string,
    content: string,
    createdBy: ICreatedBy,
    createdAt: string,
    updatedAt: string,
}
export interface IPostItemProps {
    post: IPost;
}

export interface IPostInputProps {
    user: IUserProps;
    circleId: string;
}

export interface IPhotoUploaderProps {
    isMulti?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
    previewUrls: string[] | undefined;
}

export interface IGridPhotoPreviewerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    previews: any;
    isCloudinary?: boolean;
}

export interface IMenuItemProps {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    onClick: () => void;
}

export interface IPostModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    user: IUserProps;
    circleId: string;
    post?: IPost;
}
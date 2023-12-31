import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";


export type typeT = 'text' | 'number' | 'password' | 'textarea';
export interface IInputProps {
    label?: string;
    name: string;
    type?: typeT;
    rows?: number;
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
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "4xl",
    showStatus?: boolean;
    isOnline?: boolean;
    isPeople?: boolean;
    isCloudinary?: boolean;
}

export interface ILoginFormProps {
    email: string;
    password: string;
}

export interface ICommentForm {
    comment: string;
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
    icon?: any;
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
    isCloudinary?: boolean;
}

export interface ICircleFormProps {
    handleHideForm: () => void;
    circle?: ICircle
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

export interface IPostModalWrapperProps {
    isOpen: boolean;
    handleHideModal: () => void;
    children: ReactNode
}

export interface IPostViewModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    post: IPost;
    user: IUserProps | null;
    isCreator: boolean;
}

export interface IPostContentProps {
    post: IPost;
    user: IUserProps | null;
    isCreator: boolean;
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
    commentCount: number
}
export interface IPostItemProps {
    post: IPost;
}

export interface IPostInputProps {
    user: IUserProps;
    circleId: string;
    resetPage: () => void;
}

export interface IPhotoUploaderProps {
    isMulti?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
    previewUrls: string[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemove: (data: any) => void;
}

export interface IGridPhotoPreviewerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    previews: any;
    isCloudinary?: boolean;
    editMode?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemove?: (data: any) => void;
}

export interface IMenuItemProps {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    handleClick?: () => void;
    disabled?: boolean;
    type?: 'normal' | 'danger';
}

export interface IPostModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    user: IUserProps;
    circleId: string;
    post?: IPost;
    resetPage?: () => void;
}

export interface ICirclePostsResponse {
    message: string;
    currentPage: number;
    status: number;
    totalDocuments: number;
    totalPage: number;
    results: IPost[]
}

export interface IListLoadingProps {
    count: number;
}

export interface ICommentInputProps {
    user: IUserProps;
    comment?: IComment;
    postId: string;
    handleEditSuccess?: () => void;
}
export interface IComment {
    comment: string;
    createdAt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo: any;
    postId: string;
    _id: string;
    createdBy: ICreatedBy
}
export interface ICommentProps {
    comment: IComment;
    isCreator: boolean;
}

export interface IHorizontalLineProps {
    className?: string
}

export interface ITimeNowProps {
    time: string;
}

export interface IPostCommentsProps {
    shouldFetch: boolean;
    postId: string;
    isCreator: boolean;
}

export interface ICommentButtonProps {
    count: number;
    postId: string;
}
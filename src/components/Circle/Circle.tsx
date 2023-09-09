import { Link } from "react-router-dom";
import { ICircleProps } from "../../types";
import Avatar from "../Avatar";

export default function Circle({ circle }: ICircleProps) {
    return (
        <Link to={`circle/${circle._id}`} className="text-center cursor-pointer" key={circle._id}>
            <Avatar isCloudinary url={circle.photo?.public_id} size="xl" />
            <h1 className="text-xl font-medium text-gray-900">{circle.name}</h1>
            {circle.moto && <p className="text-sm italic text-gray-800">"{circle.moto}"</p>}
        </Link>
    )
}
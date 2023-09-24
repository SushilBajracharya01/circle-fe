import { Link } from "react-router-dom";
import { ICircleProps } from "../../types";
import Avatar from "../Avatar";

export default function Circle({ circle }: ICircleProps) {
    return (
        <Link to={`circle/${circle._id}`} className="text-center py-4 rounded-md transition-colors cursor-pointer hover:bg-white" key={circle._id}>
            <Avatar isCloudinary url={circle.photo?.public_id} size="xl" isPeople={false} />
            <h1 className="text-xl font-medium text-gray-900">{circle.name}</h1>
            {circle.moto && <p className="text-sm italic text-gray-800">"{circle.moto}"</p>}
        </Link>
    )
}
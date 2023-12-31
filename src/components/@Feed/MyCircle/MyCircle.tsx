import { useState } from "react";
import { useQueryHook } from "../../../hooks/react-query/useQueryHook";

//
import Button from "../../Button";
import Circle from "../../Circle";
import CircleForm from "../CircleForm";

//
import { ICircle } from "../../../types";

//
import { FiPlus } from "react-icons/fi";

/**
 * 
 */
export default function MyCircle() {
    const [showForm, setShowForm] = useState<boolean>(false);
    const { data, isLoading } = useQueryHook({
        queryName: 'my-circle',
        queryRoute: `/circles`,
    });

    const handleShowForm = () => setShowForm(true);
    const handleHideForm = () => setShowForm(false);

    if (showForm) {
        return <CircleForm handleHideForm={handleHideForm} />
    }

    return (
        <div className="bg-gray-100 p-4 rounded-xl">
            {
                isLoading ?
                    <div>Loading ... </div>
                    :
                    <div>
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-bold">My Circles</h2>

                            <Button label="Add" icon={<FiPlus />} onClick={handleShowForm} />
                        </div>
                        {
                            data?.results?.length ?
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {
                                        data?.results?.map((circle: ICircle) => (
                                            <Circle key={circle._id} circle={circle} />
                                        ))
                                    }
                                </div>
                                :
                                <div>
                                    No Circles
                                </div>
                        }
                    </div>
            }
        </div>


    )
}
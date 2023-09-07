import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import Logo from "../Logo";
import { Link, useNavigate } from "react-router-dom";

import { BiSolidChevronDown } from 'react-icons/bi';
import DropDownButton from "./@Header/DropDownButton";
import { VscSettingsGear } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { MdGroups } from "react-icons/md";

import { useAppDispatch } from "../../_redux/redux";
import { logOutUser } from "../../_redux/authSlice";
import NavButton from "./@Header/NavButton";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGoto = (href: string) => {
        navigate(href);
    }

    const handleLogout = () => {
        dispatch(logOutUser())
    }
    return (
        <Popover className="relative bg-gray-50 header">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-2 px-3 md:justify-start md:space-x-10">
                {/* right */}
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link to="/">
                        <span className="sr-only">Circle</span>
                        <Logo horizontal />
                    </Link>
                </div>

                {/* mobile menu */}
                <div className="-mr-2 -my-2 md:hidden">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                </div>

                {/* desktop center */}
                <nav className="hidden md:flex justify-center items-center gap-2">
                    <NavButton
                        to={"/"}
                        label={'Home'}
                        icon={<AiFillHome fontSize="22" />}
                    />
                    <NavButton
                        to={"/circle"}
                        label={'Circle'}
                        icon={<MdGroups fontSize="22" />}
                    />
                </nav>

                {/* desktop right side */}
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button
                                    className={classNames(
                                        open ? 'bg-gray-200' : '',
                                        'w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600'
                                    )}
                                >
                                    <BiSolidChevronDown className='text-primary-500' fontSize={30} />
                                </Popover.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute z-10 top-10 left-[-160px] transform -translate-x-1/2 mt-3 px-8 w-screen max-w-sm sm:px-0">
                                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div className="relative grid bg-white px-2 py-3 sm:p-3">
                                                <DropDownButton label="Settings" icon={<VscSettingsGear />} onClick={() => handleGoto('/settings')} />
                                                <DropDownButton label="Logout" icon={<FiLogOut />} onClick={handleLogout} />
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <Logo noText />
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <AiFillCloseCircle className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid">
                                    <DropDownButton label="Settings" icon={<VscSettingsGear />} onClick={() => handleGoto('/settings')} />
                                    <DropDownButton label="Logout" icon={<FiLogOut />} onClick={handleLogout} />
                                </nav>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>

        </Popover>
    )
}
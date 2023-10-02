import { Dialog } from "@headlessui/react";
import { IPostModalWrapperProps } from "../../types";

/**
 * 
 */
export default function PostModalWrapper({ isOpen, handleHideModal, children }: IPostModalWrapperProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={handleHideModal}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4"> */}
            <div className="fixed inset-0 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-[95%] max-w-2xl rounded-md bg-white">
                        {children}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog >
    )
}
import { ILogoProps } from "../types";

export default function Logo({ noText, horizontal }: ILogoProps) {
    return (
        <div className={`text-center ${horizontal ? "flex gap-3 justify-center items-center" : ''}`}>
            <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            {
                !noText &&
                <h3 className="text-2xl font-bold mt-1 text-primary-500">Circle</h3>
            }
        </div>
    )
}
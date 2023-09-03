import { VscLoading } from 'react-icons/vsc';

export default function Loader() {
    return (
        <div className='w-full flex justify-center items-center'><VscLoading className="animate-spin" /></div>
    )
}
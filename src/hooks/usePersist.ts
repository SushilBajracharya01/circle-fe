import { useState, useEffect } from 'react';
import { PERSIST } from '../constants/constants';

const usePersist = () => {
    const [persist, setPersist] = useState(localStorage.getItem(PERSIST) === 'true' || false);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist]);

    return [persist, setPersist]
}

export default usePersist;
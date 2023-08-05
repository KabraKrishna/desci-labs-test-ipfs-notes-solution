import axios from "axios";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { useDispatchContent } from "./store";

export default function Header() {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatchContent();

    const handleRetrival = async () => {

        setLoading(true);

        const response = await axios.get('/api/ipfs');

        dispatch({
            key: 'SET_VALUES',
            payload: response.data.content
        })

        setLoading(false);
    }

    return (
        <>
            <div
                className="w-full p-2 flex items-center justify-end"
            >
                <button
                    onClick={handleRetrival}
                    className="rounded-md py-1 px-2 flex items-center justify-evenly text-md text-white bg-green-600 hover:bg-green-900/90">
                    <MdRefresh className={`${loading ? 'animate-spin' : ''}`} />
                    <span className="ml-1">{loading ? 'Retriving...' : 'Retrive Data'}</span>
                </button>

            </div>
        </>
    )
}
import { useEffect, useState } from "react";
import { MdAutorenew } from "react-icons/md";

export default function PrimamryButton({ children, callback, loading }: any) {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { setIsLoading(loading); }, [loading])

    return (
        <>
            <button className="
                my-2 btn rounded-md py-1 px-2 w-full 
                flex items-center justify-center
                bg-blue-500 text-white hover:bg-blue-800/80"
                onClick={callback}>
                {
                    isLoading ? (
                        <>
                            <MdAutorenew size={18} className="mr-1 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : children
                }
            </button>
        </>
    )
}
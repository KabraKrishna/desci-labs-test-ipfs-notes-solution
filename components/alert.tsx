import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function Alert(
    { message, isShown, classes, callback }: { message: string, isShown: boolean, classes: string, callback: Function }) {

    const [show, setShow] = useState(false);

    useEffect(() => {

        if (show) {
            setTimeout(() => { setShow(false); callback(false); }, 3000)
        }

    }, [show])

    useEffect(() => { setShow(isShown); }, [isShown])

    const handleDismiss = () => { setShow(false); callback(false); }

    return (
        <>
            {
                show && (
                    <>
                        <div className={
                            `w-60 h-10 rounded-md shadow-xl flex items-center justify-between px-4 py-2
                            bg-white font-bold
                            ${classes}
                            `
                        }>
                            <span className={`truncate text-sm text-black`}>{message}</span>

                            <span
                                className={
                                    `
                                    rounded-full cursor-pointer btn 
                                   hover:bg-black/75 text-black 
                                   hover:text-white
                                `
                                }
                                onClick={handleDismiss}>
                                <MdClose size={12} />
                            </span>

                        </div>
                    </>
                )
            }
        </>
    )
}
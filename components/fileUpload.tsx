import { useState, useRef, useEffect } from "react";
import { MdCloudUpload, MdClose, MdOutlineInsertDriveFile } from "react-icons/md";
import PrimamryButton from "./primaryButton";
import axios from "axios";
import { useDispatchContent } from "./store";

export default function FileUpload({ setAlertCallBack, setAlertMessageCallBack }: { setAlertCallBack: Function, setAlertMessageCallBack: Function }) {

    const fileInputRef: any = useRef(undefined);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<any>();
    const [fileName, setFileName] = useState(undefined);
    // let fileReader: FileReader;

    const dispatch = useDispatchContent()

    // useEffect(() => {

    //     fileReader = new FileReader();
    //     console.log("Callled!");
    //     fileReader.addEventListener("load", () => {
    //         setFile(fileReader.result);
    //     })

    // }, [fileReader])

    const handleFileAttach = (e: any) => {

        setFileName(e.target.files[0].name);

        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
            setFile(fileReader.result);
        })

        fileReader.readAsBinaryString(e.target.files[0]);
    }

    const handleRemoveSelectedFile = () => {

        fileInputRef.current.value = "";
        setFile(undefined);
        setFileName(undefined);
    }

    const handleUpload = async () => {

        setLoading(true);

        if (file && fileName) {

            const response = await axios.post('/api/ipfs', {
                data: file,
                name: fileName,
                type: 0
            })

            dispatch({
                key: 'SET_VALUE',
                payload: {
                    cid: response.data.cid,
                    name: fileName,
                    type: 0,
                    date: Date.now()
                }
            })

            setAlertMessageCallBack("File Added Successfull!");
            setAlertCallBack(true);

        } else {

            setAlertMessageCallBack("Please Select A File");
            setAlertCallBack(true);
        }

        handleRemoveSelectedFile();
        setLoading(false);

    }

    return (
        <>
            <div className="px-2 flex w-full flex-col">
                <div className="
            w-full my-2 h-[15rem] max-h-[15rem] rounded-md transition border-dashed border-2
            border-gray-400 flex flex-col items-center 
            justify-center relative focus:border-blue-700 hover:border-blue-400">

                    <MdCloudUpload size={50} className="text-blue-500" />

                    <input type="file"
                        ref={fileInputRef}
                        onChange={handleFileAttach}
                        className="w-full h-full absolute z-10 cursor-pointer opacity-0"></input>
                    <span className="font-medium text-gray-600 my-2">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline ml-1">browse</span>
                    </span>
                </div>
                <div className={
                    `
                mt-2 p-2 w-full flex items-center justify-between shadow-md rounded-md
                ${fileName ? 'block' : 'hidden'}
                `
                }>
                    <MdOutlineInsertDriveFile size={24} className="text-blue-600" />
                    <span className="max-w-[10rem] block text-sm font-medium truncate">{fileName}</span>
                    <span className="
                    rounded-full cursor-pointer btn 
                    hover:bg-red-600/80 text-red-400 
                    hover:text-white"
                        onClick={handleRemoveSelectedFile}>
                        <MdClose size={15} />
                    </span>
                </div>

                <PrimamryButton callback={handleUpload} loading={loading}>UPLOAD</PrimamryButton>

            </div>
        </>
    )
}
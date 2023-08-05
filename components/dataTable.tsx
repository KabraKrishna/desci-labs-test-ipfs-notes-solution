import { useState, useEffect, useLayoutEffect } from "react"
import ListItem from "./listItem";
import { useContent, useDispatchContent } from "./store";
import axios from "axios";
import { MdFolder } from "react-icons/md";

const LOCAL_DB_KEY = "DB_LOCAL_STORAGE_KEY";

export default function DataTable() {

    const [value, setValue] = useState<any[]>([]);

    const contentState = useContent();
    const dispatch = useDispatchContent();

    useEffect(() => {

        const fetchInitial = async () => {

            const response = await axios.get('/api/ipfs');

            dispatch({
                key: 'SET_VALUES',
                payload: response.data.content
            })
        }

        fetchInitial();

    }, [])


    useEffect(() => { setValue([...contentState]) }, [contentState])

    return (
        <>
            <div className="w-full h-auto max-h-[70vh] overflow-y-scroll px-2 my-2">
                {
                    value && Array.isArray(value) && value.length !== 0 ?
                        (
                            <>
                                <div className="z-10 w-full flex item-center justify-center text-sm font-bold border-b -top-0 sticky border-slate-500 bg-slate-100">
                                    <div className="w-4/12 p-2 flex items-center justify-start">CID</div>
                                    <div className="w-2/12 p-2 flex items-center justify-center">TYPE</div>
                                    <div className="w-auto flex-1"></div>
                                    <div className="w-2/12 p-2 flex items-center justify-center">DATE</div>
                                    <div className="w-1/12 p-2 flex items-center justify-center">TIME</div>
                                </div>
                                {value.map((item: any, idx: number) => (<ListItem item={item} id={idx} key={idx} />))}
                            </>
                        )
                        :
                        (
                            <div className="w-full h-[18rem] flex flex-col items-center rounded-md justify-center border-2 border-dotted border-slate-300">
                                <MdFolder size={100} className="text-blue-500 mb-2" />
                                <span className="text-sm text-gray-400 mb-1"> No content to display</span>
                                <span className="text-sm text-gray-400">Try Uploading a file or adding text note from left panal</span>
                            </div>
                        )
                }
            </div>
        </>
    )
}
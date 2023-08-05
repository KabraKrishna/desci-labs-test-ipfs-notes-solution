import axios from "axios";
import { useState } from "react";
import PrimamryButton from "./primaryButton";
import { useDispatchContent } from "./store";

export default function TextNote({ setAlertCallBack, setAlertMessageCallBack }: { setAlertCallBack: Function, setAlertMessageCallBack: Function }) {

    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState('');

    const dispatch = useDispatchContent();


    const handleTextChange = (e: any) => { setTextValue(e.target.value); }

    const handleSubmit = async () => {

        setLoading(true);

        if (textValue) {

            const response = await axios.post('/api/ipfs', {
                data: textValue,
                type: 1
            });

            dispatch({
                key: 'SET_VALUE',
                payload: {
                    cid: response.data.cid,
                    type: 1,
                    content: textValue,
                    date: Date.now()
                }
            })

            setAlertMessageCallBack("Test Added Successfull!");
            setAlertCallBack(true);

        } else {

            setAlertMessageCallBack("Invalid Text Value");
            setAlertCallBack(true);
        }

        setTextValue('');
        setLoading(false);

    }

    return (
        <>
            <div className="flex flex-col w-full h-fit px-2">

                <label htmlFor="message" className="
                        block mb-2 text-sm font-medium 
                        text-gray-900">
                    Enter Text Below
                </label>
                <textarea id="message"
                    value={textValue}
                    onChange={handleTextChange}
                    rows={8}
                    className="
                        block p-2.5 w-full max-h-[15rem] text-sm 
                        text-gray-900 bg-slate-300/80 rounded-lg border 
                        border-gray-300 placeholder-slate-500"
                    placeholder="Enter Text here...">
                </textarea>

                <PrimamryButton callback={handleSubmit} loading={loading} >SUBMIT</PrimamryButton>
            </div>
        </>
    )
}
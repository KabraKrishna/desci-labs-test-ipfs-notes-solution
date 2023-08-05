import axios from "axios";
import { useState } from "react"
import { MdGetApp, MdRemoveRedEye } from "react-icons/md"

export default function ListItem({ item, id }: {
    item: {
        cid: string,
        type: 0 | 1,
        name?: string,
        content?: string,
        date: number
    }, id: number
}) {

    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState<string>('');

    const handleShowDetails = async () => {

        if (showDetails) setDetails('');
        else {

            setLoading(true);

            const response = await axios.get(`/api/ipfs?cid=${item.cid}`);

            const content = response.data.content;

            console.log(content);

            setDetails(content);
            setLoading(false);
        }

        setShowDetails((curr) => !curr);

    }

    const handleDownloadFile = () => {

        const blob = new Blob([Uint8Array.from(details, c => c.charCodeAt(0))]);
        const href = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.download = item.name ? item.name : 'sample.pdf';
        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);

    }

    function getDate_mmddyyyy(inputDate: number) {

        const date = new Date(inputDate ? inputDate : Date.now());

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        return `${mm}/${dd}/${yyyy}`
    }

    function getTime(inputDate: number) {

        const date = new Date(inputDate ? inputDate : Date.now());

        const hh = date.getHours();
        const mm = date.getMinutes();

        return `${('0' + hh).slice(-2)}:${('0' + mm).slice(-2)}`;
    }

    return (
        <>
            <div onClick={handleShowDetails}
                className="w-full flex flex-col border-b border-slate-300 shadow-sm mb-1 hover:shadow-md">
                <div
                    className={
                        `
                        w-full flex item-center justify-center cursor-pointer
                        rounded-sm text-sm group relative
                        ${showDetails ? 'shadow-lg border-l-4 border-l-blue-600' : ''}
                        `
                    }
                >
                    <div className="w-4/12 p-2 flex items-center justify-start">
                        <span className="truncate">{item.cid}</span>
                    </div>
                    <div className="w-2/12 p-2 flex items-center justify-center truncate">
                        {
                            (item.type === 0) ? <span className="px-2 py-1 rounded-full text-xs bg-green-500 text-white">FILE UPLOAD</span>
                                : <span className="px-2 py-1 rounded-full text-xs bg-blue-500 text-white">TEXT NOTE</span>
                        }
                    </div>
                    <div className="w-3/12"></div>
                    <div className="w-2/12 p-2 flex items-center justify-center">{getDate_mmddyyyy(item.date)}</div>
                    <div className="w-1/12 p-2 flex items-center justify-center">{getTime(item.date)}</div>

                </div>
                <div
                    className={
                            `w-full rounded-sm overflow-hidden transition-all ease-in-out duration-300
                            ${showDetails ? 'max-h-screen' : 'max-h-0'
                        }`
                    }>
                    {
                        showDetails && (
                            <div className="w-full p-2 flex items-center justify-between bg-slate-200 overflow-y-scroll">
                                {
                                    item.type == 1 ? <span className="w-full break-all">{details}</span>
                                        : (
                                            <>
                                                <span className="w-8/12 break-normal">{item.name}</span>
                                                <button onClick={handleDownloadFile}
                                                    className="py-1 px-2 flex items-center rounded-md justify-evenly bg-blue-500 text-white text-sm">
                                                    <span className="mr-2">Download</span>
                                                    <MdGetApp size={14} />
                                                </button>
                                            </>
                                        )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
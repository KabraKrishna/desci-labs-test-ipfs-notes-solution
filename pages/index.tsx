import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { MdFileUpload, MdTitle } from "react-icons/md";
import TextNote from "../components/textNote";
import FileUpload from "../components/fileUpload";
import Header from "../components/header";
import DataTable from "../components/dataTable";
import Alert from "../components/alert";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [isToggleInput, setToggleInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleToggle = (e: any) => { setToggleInput(e.target.checked) }

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showAlert && <Alert message={alertMessage} isShown={showAlert} callback={setShowAlert} classes="absolute right-4 top-4" />}
        <div className="flex flex-col w-screen h-screen bg-slate-400 bg-opacity-95 select-none">
          <div className="flex flex-col bg-slate-800">
            <div className="w-100 px-12 py-2 flex flex-row items-center justify-start text-3xl font-bold">
              <img src="js-ipfs-logo.png" alt="LOGO" className="w-14 h-14" />
              <span className="text-3xl ml-2 pl-2 text-white border-l border-slate-200">IPSF NOTES</span>
            </div>
          </div>
          <div className="flex w-11/12 mx-auto my-2 p-2 h-auto max-h-screen gap-2">
            <div className="w-9/12 h-full rounded-md bg-slate-100">
              <Header />
              <DataTable />
            </div>
            <div className="flex flex-col rounded-md items-center py-2 w-3/12 h-fit max-h-[70vh] bg-slate-100">
              <div className="flex flex-row w-full items-center justify-between px-2">
                <span className="text-xl font-medium">
                  {
                    isToggleInput ? "TEXT NOTE" : "FILE UPLOAD"
                  }
                </span>
                <div className="flex p-[2px] w-10 rounded-full h-6 bg-slate-300/80 cursor-pointer relative">
                  <input type="checkbox"
                    checked={isToggleInput}
                    className="w-full h-6 z-10 absolute peer opacity-0 cursor-pointer"
                    onChange={handleToggle}></input>
                  <div className="
                    flex items-center justify-center 
                    w-5 h-5 rounded-full bg-green-600 
                    peer-checked:translate-x-4
                    peer-checked:bg-blue-500
                    ease-in-out duration-300">
                    {
                      isToggleInput ? <MdTitle size={14} className="text-white" />
                        : <MdFileUpload size={14} className="text-white" />
                    }
                  </div>
                </div>
              </div>
              <div className="my-2 w-full h-[1px] bg-slate-300"></div>
              {
                isToggleInput ? <TextNote setAlertCallBack={setShowAlert} setAlertMessageCallBack={setAlertMessage} />
                  : <FileUpload setAlertCallBack={setShowAlert} setAlertMessageCallBack={setAlertMessage} />
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

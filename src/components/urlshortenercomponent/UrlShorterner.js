import React, { useEffect, useRef, useState } from 'react'
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';


function UrlShorterner() {

    const [userInput, setUserInput] = useState("");
    const [shortenedLink, setShortenedLink] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const ref = useRef([]);

    const fetchData = async () => {

        // console.log(ref.current[0].classList)

        let classLst = ref.current[0].classList;

        // errorStatusMsg
        // let re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_-]+=-\w+)*)?\/?$/;


        // if (userInput === "" || re.test(userInput) == false) {

        //     console.log("in line 35---");
        //     console.log(re.test(userInput))

        //     if(classLst.contains("error-block") ==false ){
        //         classLst.add("error-block");
        //     }

        //     setErrorMessage(<div className='errorStatusMsg'>{"Please Enter Valid URL...."}</div>);

        //     return;
        // }

        // let re=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;





        // if(){
        //     return;
        // }



        // if(classLst.contains("error-block") ==false ){
        //     classLst.add("error-block");
        // }

        // setErrorMessage(<div className='errorStatusMsg'>{"Please Enter Valid URL...."}</div>);

        // ---------------------------------------------------------------------------------------

        // classLst.remove("error-block");
        // setErrorMessage("");


        try {
            const response = await axios.post(
                // `https://api.shrtco.de/v2/shorten?url=${userInput}`
                `http://localhost:8080/demo/urlShorterner/OriginalToShortUrl?originalUrl=${userInput}`
            );

            // console.log(response);

            let resp = response.data;

            if (resp.status == true) {
                classLst.remove("error-block");
                setErrorMessage("");
                setShortenedLink(resp.shortUrl);
            } else {
                if (classLst.contains("error-block") == false) {
                    classLst.add("error-block");
                }

                setErrorMessage(<div className='errorStatusMsg'>{"Please Enter Valid URL...."}</div>);
            }

        } catch (e) {
            console.log(e);
        }
    };

    // useEffect(() => {
    //     console.log(userInput)
    // }, [userInput])




    return (
        <div><div className=" container h-screen flex justify-center items-center">
            <div className=" text-center">
                <h1 className=" text-2xl font-medium text-blue-500 mb-4">
                    Our <span className=" text-yellow-400">URL Shortener</span>
                </h1>
                <div>
                    {errorMessage}
                    {/* <input
                        className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
                        type="text"
                        placeholder="Enter link to be shortened"
                    /> */}
                    <input
                        ref={(ele) => {
                            ref.current[0] = ele;
                        }}
                        value={userInput}
                        onChange={(e) => { setUserInput(e.target.value) }}
                        placeholder="Enter link to be shortened"

                    />
                    <button onClick={() => { fetchData() }} className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md">
                        Submit URL
                    </button>
                </div>

                <div className="mt-5">
                    {shortenedLink}
                    <CopyToClipboard text={shortenedLink}>
                        <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                            Copy URL to Clipboard
                        </button>
                    </CopyToClipboard>
                </div>

            </div>
        </div></div>
    )
}

export default UrlShorterner
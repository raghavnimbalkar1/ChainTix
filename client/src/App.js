import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyContract from "./contractConfig";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadMessage = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(MyContract.address, MyContract.abi, signer);
                const currentMessage = await contract.message();
                setMessage(currentMessage);
            }
        };
        loadMessage();
    }, []);

    return (
        <div>
            <h1>Message: {message}</h1>
        </div>
    );
}

export default App;

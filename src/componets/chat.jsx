import { FaRobot, FaPlus, FaPaperPlane, FaGlobe, FaBolt } from 'react-icons/fa';
import { useState, useRef } from 'react';
import '../../src/index.css';

const chat = () => {
    const [input, setInput] = useState("");
    const [message, setMessage] = useState([]);
    const endMessage = useRef(null);

    // Fetching backend
    const fetchData = async (userMessage) => {
        try {
            console.log("Sending request to backend...");  // 🟢 Debug log
    
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "deepseek-r1:latest", 
                    prompt: userMessage,
                    stream: true,  // Fixed typo
                }),
            });
    
            console.log("Response status:", res.status);  // 🟢 Debug log
    
            if (!res.ok) {
                console.error("Request failed with status:", res.status);
                const errorText = await res.text();
                console.error("Error response:", errorText);  // Log backend error
                return null;
            }
    
            const data = await res.json();
            console.log("Received response:", data);  // 🟢 Debug log
            return data.response;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    

    const handleMessage = async () => {
        if (input.trim() === "") return;

        setMessage((prev) => [...prev, { sender: "user", text: input }]);
        setInput("");

        const aiResponse = await fetchData(input);

        if (aiResponse) {
            setMessage((prev) => [...prev, { sender: "ai", text: aiResponse }]);
        }

        // Scroll to the latest message
        setTimeout(() => {
            endMessage.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const enterKey = (e) => {
        if (e.key === "Enter") handleMessage();
    };

    return (
        <div className="bg-gray-900 text-white w-full h-screen flex flex-col">
            <h1 className="text-[2em] font-mono flex justify-center gap-2 mt-[2em]">
                <FaRobot size={50} /> NeuraFuse-v1
            </h1>
            <h1 className="font-mono text-center text-3xl mt-[3em]">How can I help you?</h1>

            <div className="h-[60vh] overflow-y-auto text-center w-[70vw] m-auto mt-3 font-mono rounded-4xl flex flex-col scrollbar-hidden">
                {message.length > 0 ? (
                    message.map((msg, index) => (
                        <p
                            key={index}
                            className={`p-2 border border-gray-500 text-white w-fit rounded-2xl mb-1.5 ${
                                msg.sender === "user" ? "ml-auto bg-blue-500 mr-10" : "mr-auto bg-green-500 ml-10"
                            }`}
                        >
                            {msg.text}
                        </p>
                    ))
                ) : (
                    <p>Ask anything</p>
                )}

                <div ref={endMessage} className="mb-5"></div>
            </div>

            <div className="w-[70vw] sm:w-[90vw] md:w-[70vw] lg:w-[60vw] flex flex-col justify-center p-[2em] bg-gray-800 mx-auto rounded-3xl mb-20">
                <div className="flex">
                    <input
                        className="p-3 rounded-3xl w-full focus:outline-none"
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={enterKey}
                    />
                    <FaPaperPlane className="mt-[1em] cursor-pointer" onClick={handleMessage} />
                </div>
                <div className="flex cursor-pointer">
                    <FaPlus className="w-6 h-6 p-1 bg-gray-800 text-white rounded-2xl border border-gray-500 cursor-pointer" />
                    <div className="flex"><FaGlobe className="ml-3 mt-1 mr-1 cursor-pointer" /> Search</div>
                    <div className="flex"><FaBolt className="ml-3 mt-1 mr-1 cursor-pointer" /> NeuraThink</div>
                </div>
            </div>
        </div>
    );
};

export default chat;

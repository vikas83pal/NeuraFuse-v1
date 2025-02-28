import React, { useState } from "react";
import { FaTimes, FaBars, FaRobot } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 text-white bg-gray-800 p-2 rounded-full z-50"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
      >
        {/* Cross Button to Close Sidebar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full hover:bg-red-700"
        >
          <FaTimes size={20} />
        </button>

        {/* Sidebar Content */}
        <ul className="mt-20 space-y-4">
          <div className="flex">
            <FaRobot className="mr-2" size={22}/>
            <li className="hover:text-gray-400 font-mono cursor-pointer">NeuraFuse-v1</li>
          </div>

          <li className="hover:text-gray-400 font-mono cursor-pointer">Settings</li>
          <li className="hover:text-gray-400 font-mono cursor-pointer">Chat</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

"use client";
import React from "react";
import { useState } from "react";

const Dialog = ({ title, children, open, onClose }) => {
    return (
        <div className={`fixed bottom-5 right-5 transition-transform duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} pointer-events-auto`}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-80 border border-gray-300">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
                </div>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    );
};


const DialogTitle = ({ children }) => {
    return <h2 className="text-xl font-bold">{children}</h2>;
};

const DialogContent = ({ children }) => {
    return <div className="mt-4">{children}</div>;
};

// Export thêm DialogContent và DialogTitle
export { Dialog, DialogTitle, DialogContent };


"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react"
const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);
 /* const text = JSON.stringify(xtext);*/
    /*const handleCopy = async () => {
        console.log('copied');
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };*/
    /*const handleCopy = async () => {
        console.log('copied');
        try {
            // Copy text to clipboard
          //  await navigator.clipboard.writeText('textToCopy');
            navigator.clipboard.writeText("Some random text").then(() => {
                alert('Copy clipboard successfully');
            });
           /!* setIsCopied(true); // Show "Copied!" effect
            setShowNotification(true); // Show notification
            // Remove "Copied!" text after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);
            // Hide notification after 3 seconds
            setTimeout(() => setShowNotification(false), 3000);*!/
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };*/

    const handleCopy = async () => {
        if (navigator?.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            } catch (error) {
                console.error("Clipboard API failed, using fallback:", error);
            }
        }

        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
        >
            {copied ? (
                <>
                    <Icon icon="heroicons-outline:clipboard-check" className="w-4 h-4 text-gray-400" /> Copied!
                </>
            ) : (
                <>
                    <Icon  icon="heroicons-outline:clipboard" className="w-4 h-4 text-gray-400" /> Copy
                </>
            )}
        </button>
    );
};

export default CopyButton;

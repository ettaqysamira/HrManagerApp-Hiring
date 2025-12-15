import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

const originalConsoleError = console.error;
const chromeExtensionErrorRegex = /A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received/;

console.error = (...args) => {
    const isExtensionError = args.some(arg =>
        (typeof arg === 'string' && chromeExtensionErrorRegex.test(arg)) ||
        (arg instanceof Error && chromeExtensionErrorRegex.test(arg.message))
    );

    if (isExtensionError) {
        return;
    }

    originalConsoleError.apply(console, args);
};

window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && (
        (typeof event.reason === 'string' && chromeExtensionErrorRegex.test(event.reason)) ||
        (event.reason.message && chromeExtensionErrorRegex.test(event.reason.message))
    )) {
        event.preventDefault();
    }
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

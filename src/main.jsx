/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Writer } from "./components/editor-tools/writer.jsx";
import Teller from "./components/teller.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
    <>
        <button id="save-button"></button>
        <Teller />
        <div id="output"></div>
    </>
);

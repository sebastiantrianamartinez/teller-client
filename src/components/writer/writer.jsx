/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// Consider using a Gutenberg-inspired list block if available (research needed)
import List from "@editorjs/list";
import Table from "editorjs-table"; // Ensure compatibility with Gutenberg tables
import Image from "@editorjs/image"; // Maintain existing image functionality
import ColorPicker from "editorjs-text-color-plugin";
import MediaEmbed from "@editorjs/embed"; // For media embeds (Gutenberg similarity)

import CustomHeader from "../editor-tools/texts";

function MyGutenbergLikeEditor() {
    const editorRef = useRef(null); 
    const editorConfig = {
        holder: editorRef.current,
        tools: {
            header: {
                class: CustomHeader,
                inlineToolbar: true, // Enable inline toolbar for header
            },
            list: List,
            table: Table,
            image: Image,
            color: {
                class: ColorPicker,
                config: {
                    colorCollections: [ // Optional: Predefined color collections (if desired)
                        "#EC7878",
                        "#9C27B0",
                        "#673AB7",
                        "#3F51B5",
                        "#0070FF",
                        "#03A9F4",
                        "#00BCD4",
                        "#4CAF50",
                        "#8BC34A",
                        "#CDDC39",
                        "#FFF",
                    ],
                    defaultColor: "#FF1300",
                    // Enable full color picker
                    customPicker: true,
                },
            },
            embed: {
                class: MediaEmbed,
            },
        },
        placeholder: "Let's write an awesome story!",
        onReady: () => {
            console.log("Editor.js is ready to work!");
        },
    };

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const editorInstance = new EditorJS(editorConfig);
        editorInstance.isReady.then(() => setIsReady(true));

        return () => editorInstance.destroy(); // Clean up on unmount
    }, []);

    return (
        <div ref={editorRef} id="reactjs" style={{ border: "1px solid #ddd", padding: "10px" }}>
            {isReady && <p>Editor is ready!</p>}
        </div>
    );
}

export default MyGutenbergLikeEditor;



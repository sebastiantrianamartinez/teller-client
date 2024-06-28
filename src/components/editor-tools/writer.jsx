/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "editorjs-table";
import Image from "./oppie";
import ColorPicker from "editorjs-text-color-plugin";
import MediaEmbed from "@editorjs/embed";
import FontSize from "editorjs-inline-font-size-tool";
import FontFamily from "editorjs-inline-font-family-tool";
import Quote from '@editorjs/quote';
import InlineImage from 'editorjs-inline-image';


function Writer() {
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [tweetUrl, setTweetUrl] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);

    const updateImageSrc = () => {
        images.forEach((image) => {
            const imageDOM = document.getElementById(image.id);
            if(imageDOM){
                imageDOM.src = image.url;
            }
        });
    };
    
    useEffect(() => {
        updateImageSrc();
    }, [images]);

    const openModal = () => {
        console.log("Abriendo modal");
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleMessage = (event) => {
        const { origin, data } = event;
        if (origin !== "https://twitframe.com") return;

        // Manejar el mensaje recibido
        console.log("Mensaje recibido desde Twitframe:", data);
        // Puedes guardar la URL del tweet u otra lógica aquí
    };

    useEffect(() => {
        const editorInstance = new EditorJS({
            holder: editorRef.current,
            placeholder: "Escribe algo...",
            tools: {
                Image: Image,
                header: Header,
                list: List,
                table: Table,
                fontSize: FontSize,
                fontFamily: FontFamily,
                quote: Quote,
                embed: {
                    class: MediaEmbed,
                },
            },
            i18n: {
                /**
                 * @type {I18nDictionary}
                 */
                messages: {
                    ui: {
                     
                    },
                    toolNames: {
                        Text: "Texto",
                        Heading: "Encabezado",
                        List: "Lista",
                        Warning: "Alerta",
                        Checklist: "Lista de verificación",
                        Quote: "Cita",
                        Code: "Código",
                        Delimiter: "Delimitador",
                        "Raw HTML": "HTML crudo",
                        Table: "Tabla",
                        Link: "Enlace",
                        Marker: "Marcador",
                        Bold: "Negrita",
                        Italic: "Cursiva",
                        InlineCode: "Código en línea",
                        Image: "Imagen",
                        InlineImage: "Imagen"
                    },
                    blockTunes: {
                        embed: "URL de incrustación",
                        InlineImage: {
                            embed: "URL de incrustación",
                            "Unsplash": "Unsplashed",
                        },
                        delete: {
                            Delete: "Eliminar",
                        },
                        moveUp: {
                            "Move up": "Subir",
                        },
                        moveDown: {
                            "Move down": "Bajar",
                        },
                    },
                },
            },
            onReady: () => {
                setIsReady(true);
            },
            
        });
        
        const editor = editorInstance;


        window.addEventListener("message", handleMessage);

        
        if (isReady) {
            editor.on('onChange', (event) => {
              console.log('El contenido del editor ha cambiado:', event.data);
              // Your code to handle content change here
            });
        }

        return () => {
            window.removeEventListener("message", handleMessage);
        };
        
        }, []);
      



    return (
        <div>
            <div id="editorjs" ref={editorRef}></div>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <input
                            type="text"
                            placeholder="Ingrese la URL del tweet"
                            value={tweetUrl}
                            onChange={(e) => setTweetUrl(e.target.value)}
                        />
                        <button onClick={closeModal}>Cancelar</button>
                        <button
                            onClick={() => {
                                // Insertar la URL del tweet en el editor
                                // Puedes insertar la URL del tweet en el editor aquí
                                closeModal();
                            }}
                        >
                            Insertar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Writer };

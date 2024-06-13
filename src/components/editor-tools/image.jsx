class Image {
    static get toolbox() {
        return {
            title: "Image",
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        };
    }

    render() {
        const imageToolContainer = document.createElement('div');
        imageToolContainer.classList.add('image-tool-container');
        
        const nav = document.createElement('nav');
        nav.classList.add('image-tool-nav');
        
        const ul = document.createElement('ul');
        ul.classList.add('image-tool-ul');
        
        const liUrl = document.createElement('li');
        liUrl.classList.add('image-tool-li', 'image-tool-li-focused');
        liUrl.textContent = 'Insertar desde URL';
        
        const liMedia = document.createElement('li');
        liMedia.classList.add('image-tool-li');
        liMedia.textContent = 'Biblioteca de medios';
        
        const imageToolWindowContainer = document.createElement('div');
        imageToolWindowContainer.classList.add('image-tool-window-container');
        
        const imageToolUrl = document.createElement('div');
        imageToolUrl.setAttribute('id', 'image-tool-url');
        imageToolUrl.classList.add('image-tool-window');
        
        const inputUrl = document.createElement('input');
        inputUrl.setAttribute('type', 'text');
        inputUrl.setAttribute('placeholder', 'URL de la imagen');
        inputUrl.classList.add('image-tool-input');
        
        const insertButton = document.createElement('button');
        insertButton.classList.add('image-tool-button');
        insertButton.textContent = 'Insertar';
        
        const imageToolMedia = document.createElement('div');
        imageToolMedia.setAttribute('id', 'image-tool-media');
        imageToolMedia.classList.add('image-tool-window', 'image-tool-window-active');
        
        const mediaHeading = document.createElement('div');
        mediaHeading.classList.add('image-tool-media-heading');
        
        const headingParagraph = document.createElement('p');
        headingParagraph.textContent = 'Por favor selecciona un medio';
        
        const separator = document.createElement('div');
        separator.classList.add('separator');
        
        const uploadButton = document.createElement('button');
        uploadButton.classList.add('image-tool-button');
        uploadButton.textContent = 'Subir desde la computadora';
        
        const mediaMain = document.createElement('div');
        mediaMain.classList.add('image-tool-media-main');
        
        const mediaSearch = document.createElement('div');
        mediaSearch.classList.add('image-tool-media-search');
        
        const inputSearch = document.createElement('input');
        inputSearch.setAttribute('type', 'text');
        inputSearch.setAttribute('placeholder', 'Nombre');
        inputSearch.classList.add('image-tool-input');
        
        const mediaGallery = document.createElement('div');
        mediaGallery.classList.add('image-tool-media-gallery');

        for (let i = 1; i <= 6; i++) {
            const mediaItem = document.createElement('div');
            mediaItem.setAttribute('id', `itmg-${i}`);
            mediaGallery.appendChild(mediaItem);
            console.log(mediaItem);
        }
        
        // Agregar elementos como nodos hijos
        ul.appendChild(liUrl);
        ul.appendChild(liMedia);
        nav.appendChild(ul);
        
        imageToolUrl.appendChild(inputUrl);
        imageToolUrl.appendChild(insertButton);
        
        mediaHeading.appendChild(headingParagraph);
        mediaHeading.appendChild(separator);
        mediaHeading.appendChild(uploadButton);
        
        mediaSearch.appendChild(inputSearch);
        
        mediaMain.appendChild(mediaSearch);
        mediaMain.appendChild(mediaGallery);
        
        imageToolMedia.appendChild(mediaHeading);
        imageToolMedia.appendChild(mediaMain);
        
        imageToolWindowContainer.appendChild(imageToolUrl);
        imageToolWindowContainer.appendChild(imageToolMedia);
        
        imageToolContainer.appendChild(nav);
        imageToolContainer.appendChild(imageToolWindowContainer);

        this.getImages();
        return imageToolContainer;
    }

    getImages(){
        fetch("https://picsum.photos/1/190/180")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }
}

export default Image;

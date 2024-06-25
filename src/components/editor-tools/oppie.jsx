class Image {
    constructor({data, api, config}) {
        this.api = api;
        this.config = config || {};
        this.data = {
            url: data.url || '',
        };
        this.wrapper = undefined;
        this.selectedImageUrl = null;

        window.addEventListener('message', (event) => {
            if (event.data.id === 'image-url-abs') {
                this.selectedImageUrl = event.data.url;
                this._createImage(this.selectedImageUrl);
            }
        });

        // Insert CSS for iframe styles
        const style = document.createElement('style');
        style.innerHTML = `
            .simple-image iframe {
                height: 400px !important;
                width:350px !important;
            }
        `;
        document.head.appendChild(style);
    }

    static get toolbox() {
        return {
            title: "Image",
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        };
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('simple-image');

        if (this.data && this.data.url) {
            this._createImage(this.data.url);
            return this.wrapper;
        }

        const iframeContainer = document.createElement('div');
        iframeContainer.classList.add('iframe-container');
        const frame = document.createElement('iframe');
        frame.src = "http://localhost:5173";
        frame.width = "800px";
        frame.height = "400px";
        iframeContainer.appendChild(frame);

        this.wrapper.appendChild(iframeContainer);

        // Use ResizeObserver to monitor changes in the wrapper size
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentRect.width < 300) {
                    frame.width = "350px";
                } else {
                    frame.width = "800px";
                }
            }
        });

        resizeObserver.observe(this.wrapper);

        return this.wrapper;
    }

    _createImage(url) {
        const image = document.createElement('img');
        image.src = url;
        image.width = 320; // Set the width you want
        image.height = 180; // Set the height you want

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(image);

        this.data.url = url;
    }

    save(blockContent) {
        const image = blockContent.querySelector('img');

        return {
            url: image ? image.src : this.data.url,
        };
    }

    validate(savedData) {
        return !!savedData.url.trim();
    }

    static get pasteConfig() {
        return {
            tags: ['IMG'],
            files: {
                mimeTypes: ['image/*'],
                extensions: ['gif', 'jpg', 'png'],
            },
            patterns: {
                image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
            },
        };
    }

    static get sanitize() {
        return {
            url: {},
        };
    }
}

export default Image;

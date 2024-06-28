class Image {
    constructor({ data, api, config }) {
        this.api = api;
        this.config = config || {};
        this.data = {
            url: data.url || '',
        };
        this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;
        this.wrapper = undefined;
        this.selectedImageUrl = null;

        const messageListener = (event) => {
            if (event.data.id === 'image-url-abs') {
                this.selectedImageUrl = event.data.url;
                this._createImage(this.selectedImageUrl);
            }
        };
        
        // Add the event listener
        this.postListener = messageListener;
        window.addEventListener('message', this.postListener);
        
        // Remove the event listener
        
    }

    static get toolbox() {
        return {
            title: "Image",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" xml:space="preserve"><path fill="#FFF" d="M121 251H1V1h250v250H121M45.933 87.417 27.785 51.988l-2.612.601c-.391 8.139-.783 16.277-1.732 24.787L1.92 91.862c3.06 0 5.201-.021 7.342.004 5.873.07 11.745.158 17.777.979 3.845 11.307 7.938 22.538 11.416 33.957 1.47 4.826 4.097 8.136 8.293 10.534 11.526 6.588 22.94 13.383 34.595 19.73 7.678 4.182 15.7 7.731 24.341 11.861 10.424 1.694 20.848 3.387 31.25 5.82-2.426 7.807-6.907 15.038-7.077 24.467 13.138-4.8 23.987-11.904 34.603-20.478.182-.305.364-.61 1.147-.933.396-.067.79-.135 2.048.082 5.959.417 11.986.405 17.86 1.348 9.64 1.548 18.75.59 26.558-5.392 8.254-6.324 17.275-12.32 23.56-20.341 5.775-7.368 8.454-17.197 12.25-26.048.658-1.532.09-3.59-.37-5.927-4.967-1.843-9.791-4.44-14.923-5.402-25.947-4.864-51.964-9.357-77.986-13.81-2.629-.45-5.452.237-8.159.436 0 0-.031.008-.708-.251-.24-.024-.48-.047-.929-.444-.269-.162-.543-.172-1.636-.062-.977.174-1.991.232-2.925.539-20.032 6.578-40.047 13.21-60.083 19.776-11.627 3.81-11.772 3.758-18.062-6.681A1108.998 1108.998 0 0 1 46.816 89.45c-.34-.435-.68-.87-.883-2.034z"/><path fill="#58B7FA" d="M104.91 168.63c-7.867-3.833-15.888-7.382-23.566-11.563-11.656-6.348-23.069-13.143-34.595-19.73-4.196-2.4-6.823-5.71-8.293-10.535-3.478-11.419-7.571-22.65-11.111-34.517 6.724-1.13 13.144-1.703 19.564-2.274 5.06 8.54 10.07 17.112 15.194 25.615 6.29 10.439 6.435 10.49 18.062 6.68 20.036-6.566 40.051-13.197 60.083-19.775.934-.307 1.948-.365 3.188-.22-12.133 20.435-24.561 40.533-36.868 60.704-.982 1.61-1.124 3.731-1.657 5.615z"/><path fill="#7AC5FF" d="M105.298 168.779c.146-2.033.288-4.154 1.27-5.764 12.307-20.171 24.735-40.269 37.275-60.688.423-.445.697-.435 1.086.378 2.769 12.866 5.417 25.08 7.755 37.455-1.863 3.25-3.609 6.259-4.928 9.444-3.352 8.095-6.513 16.269-10.013 24.418-.436 0-.61-.008-.785-.015-10.425-1.693-20.849-3.386-31.66-5.228z"/><path fill="#7BC5FF" d="M247.97 122.047c.003 1.815.572 3.873-.085 5.405-3.797 8.85-6.476 18.68-12.25 26.048-6.286 8.02-15.307 14.017-23.56 20.34-7.809 5.984-16.918 6.941-26.559 5.393-5.874-.943-11.901-.93-18.21-1.807 6.167-5.364 12.726-10.214 19.167-15.215 1.452-1.127 2.491-2.785 4.083-4.206 6.591-3.702 12.872-7.314 19.012-11.153 1.396-.874 2.301-2.532 3.82-3.828 1.756-.445 3.277-.644 4.472-1.376 7.03-4.305 14.016-8.681 20.947-13.144 3.139-2.022 6.114-4.297 9.164-6.457z"/><path fill="#4FB4FA" d="M247.742 121.786c-2.821 2.421-5.796 4.696-8.935 6.718-6.93 4.463-13.918 8.84-20.947 13.144-1.195.732-2.716.931-4.662 1.1-21.322-15.731-43.527-28.757-66.779-40.039 2.734-.16 5.557-.845 8.186-.396 26.022 4.453 52.04 8.946 77.986 13.81 5.132.962 9.956 3.56 15.151 5.663z"/><path fill="#71C1F8" d="M146.433 102.729c23.238 11.262 45.443 24.288 66.378 40.019-.942 1.572-1.847 3.23-3.243 4.104-6.14 3.839-12.42 7.451-19.239 10.892-13.312-15.436-26.108-30.561-38.693-45.859-2.195-2.668-3.503-6.067-5.221-9.128 0 0 .031-.008.018-.028z"/><path fill="#13A7F3" d="M146.077 102.627c2.056 3.191 3.364 6.59 5.56 9.258 12.584 15.298 25.38 30.423 38.33 45.867-1.003 1.674-2.042 3.332-3.494 4.459-6.44 5.001-13 9.85-19.597 15.072-.477.385-.872.453-1.527.109-1.577-13.626-7.188-25.436-12.355-37.392-2.648-12.214-5.296-24.43-7.96-37.108.224-.441.464-.418 1.043-.265z"/><path fill="#71C1F8" d="M152.684 140.16c5.477 11.796 11.088 23.606 12.364 37.24-.223.726-.405 1.031-1.079 1.134-8.982-1.641-17.473-3.08-25.964-4.519 3.238-8.142 6.399-16.316 9.75-24.41 1.32-3.186 3.066-6.195 4.929-9.445z"/><path fill="#50B4FA" d="M137.743 174.022c8.753 1.432 17.244 2.87 25.968 4.598-9.866 8.69-20.715 15.795-33.853 20.594.17-9.43 4.65-16.66 7.088-24.837.186-.363.36-.355.797-.355z"/><path fill="#7DC6FF" d="M24 77.005c.39-8.139.782-16.277 1.173-24.416l2.612-.6c6.05 11.809 12.099 23.618 17.722 35.797-7.453-3.348-14.48-7.064-21.508-10.78z"/><path fill="#17A9F3" d="M23.72 77.19c7.306 3.532 14.334 7.248 21.718 10.96.697.432 1.038.866 1.424 1.58-6.373.852-12.793 1.424-19.597 2.185-6.257.109-12.13.02-18.002-.049-2.14-.025-4.281-.004-7.342-.004 7.589-5.108 14.554-9.797 21.799-14.671z"/></svg>',
        };
    }

    render() {
        this.wrapper = undefined;
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('simple-image');
        this.wrapper.id = 'image-tool-wrapper-' + new Date().getTime();

        if (this.data && this.data.url) {
            console.log('cancelando el listener');
            
            return;
        }
        

        const iframeContainer = document.createElement('div');
        iframeContainer.classList.add('iframe-container');
        const frame = document.createElement('iframe');
        frame.id = 'target-iframe'; // Asegúrate de que el id coincida con el id usado en React
        frame.src = "http://localhost:5173";
        frame.width = "800px";
        frame.height = "400px";
        iframeContainer.appendChild(frame);

        this.wrapper.appendChild(iframeContainer);

       

        return this.wrapper;
    }

    save() {
        return {
            url: this.selectedImageUrl,
        };
    }

    async _createImage(url) {
        const image = document.createElement('img');
        image.id = 'image-' + new Date().getTime();
        image.src = url;
        this.data.url = url;
        while(this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild);
        }
        this.wrapper.appendChild(image);

        window.removeEventListener('message', this.postListener);

        return this.wrapper;
    }

}

export default Image;

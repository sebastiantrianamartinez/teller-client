class Tweet {
    static get toolbox() {
        return {
            title: "Tweet",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path></svg>',
        };
    }

    constructor({ data, config, api }) {
        this.api = api;
        this.data = data;
        this.config = config;
        this.nodes = [];
        this.settings = [
            {
                title: "Insertar Tweet",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20.65 8.35c-.18-.18-.44-.29-.7-.29H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.26-.11-.52-.29-.7zM14 14h-1v-3h-2v3H9v-4h5l-2-2-2 2h1.67L12 11.17 14.17 9H16v5zm5-2v1h-2v-1h2z"/></svg>',
                event: "insertTweet",
            },
        ];
    }

    render() {
        console.log(this.nodes);
        if (this.nodes.length === 0) {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "URL del tweet");
            this.nodes.push(input);

            const button = document.createElement("button");
            button.textContent = "Insertar Tweet";
            button.addEventListener("click", () => {
                this.insertTweet();
            });
            this.nodes.push(button);
           
        }
        const wrapper = document.createElement("div");
        wrapper.id = "tweet-wrapper";
        wrapper.append(...this.nodes);
        return wrapper;
    }

    save() {
        const tweetUrl = this.nodes[0].value;
        return {
            tweetUrl: tweetUrl,
        };
    }

    validate(savedData) {
        if (!savedData.tweetUrl) {
            return false;
        }
        return true;
    }

    insertTweet() {
        const tweetUrl = this.nodes[0].value.trim();
        const tweetId = this.getTweetIdFromUrl(tweetUrl);
        
        if (!tweetId) {
            alert("Ingrese una URL válida de tweet.");
            return;
        }
    
        const iframeContainer = document.createElement("div");
        const iframe = document.createElement("iframe");
        iframe.src = `https://twitframe.com/show?url=${tweetUrl}`;
        iframe.style.width = "100%";
        iframe.style.border = "none";
        iframe.id = `tweet_${tweetId}`;
        iframe.onLoad = () => {
            console.log("iframe cargado");
            iframe.contentWindow.postMessage({ element: tweetId, query: "height" }, "https://twitframe.com");
        };
        window.addEventListener("message", function(e) {
            console.log("Mensaje recibido desde Twitframe:", e.data);
            var oe = e;
            if (oe.origin != "https://twitframe.com")
                return;
            
            if (oe.data.height && oe.data.element.match(/^tweet_/)) {
                var element = document.getElementById(oe.data.element);
                element.style.height = parseInt(oe.data.height) + "px";
            }
        });
        iframeContainer.appendChild(iframe);
    
        console.log(this.nodes);
        this.nodes.push(iframeContainer);
    
        this.api.blocks.insert("tweet", { tweetUrl: tweetUrl });
    
        const wrapper = document.getElementById("tweet-wrapper");
        wrapper.innerHTML = iframeContainer.innerHTML;

        
    }

    getTweetIdFromUrl(tweetUrl) {
        const regex = /\/status\/(\d+)/;
        const match = tweetUrl.match(regex);
        if (match) {
            return match[1];
        }
        return null;
    }
}

export { Tweet };

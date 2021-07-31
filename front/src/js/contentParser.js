export default class ContentParser {

    content;
    emojisShortCodeIndex;

    constructor(content, emojisShortCodeIndex){
        this.content = content;
        this.emojisShortCodeIndex = emojisShortCodeIndex;
    }

    parseEmoji(){
        if(/:\w+:/g.test(this.content)){
            const matches = [...new Set(this.content.match(/:\w+:/g))];
            matches.filter((element, index) => matches.indexOf(element) == index ).forEach(shortCode => {
                this.content = this.content.replaceAll(shortCode, this.createImgTemplate(shortCode));
            })
        }
        return this;
    }

    parseUrl(){
        const regex = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g
        if(regex.test(this.content)){
            const matches = [...new Set(this.content.match(regex))];
            matches.filter((element, index) => matches.indexOf(element) == index ).forEach(url => {
                this.content = this.content.replace(url, `<a href="${url}">${url}</a>`);
            })
        }
        return this;
    }

    createImgTemplate(shortCode){
        return `
                <img width="15px" alt="${shortCode}" src="${require("@/assets/twemoji/svg/" +
                        this.emojisShortCodeIndex[shortCode].u.join("-").toLowerCase() +
                ".svg")}">
        `;
    }


}
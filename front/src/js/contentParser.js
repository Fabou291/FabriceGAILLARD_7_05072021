export default class ContentParser {

    content;
    emojisShortCodeIndex;

    constructor(content, emojisShortCodeIndex){
        this.content = content;
        this.emojisShortCodeIndex = emojisShortCodeIndex;
    }

    parseEmoji(){
        const reg = /:\w+:/g;
        const listMatch = [];
        let match;
        while ((match = reg.exec(this.content)) !== null){
            listMatch.push(match);
        } 
        
        //Ca va bug, si l'expression réguliere trouve dans un lien ou un attribut html

        listMatch.reverse().forEach(match => {
            const shortCode = match[0];
            if(this.emojisShortCodeIndex[shortCode]){
                const start = match.index;
                this.content = 
                    this.content.substring(0,start) 
                    + this.createImgTemplate(shortCode) 
                    + this.content.substring(match[0].length + start);
            }
        });

        return this;
    }

    parseUrl(){
        const reg = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g;
        this.content = this.content.replaceAll(reg, "<a href='$&'>$&</a>");
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
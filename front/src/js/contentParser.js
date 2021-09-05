export default class ContentParser {

    content;
    emojisShortCodeIndex;

    urlReg = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g;

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
                    + this.createImgEmojiTemplate(shortCode) 
                    + this.content.substring(match[0].length + start);
            }
        });

        return this;
    }

    parseUrlImage(){
        const urlImgReg = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|tiff|svg|apng|avif)$/
        const listImage = [];
        [...this.content.matchAll(this.urlReg)].forEach(match => {
            const url = match[0];
            if(urlImgReg.test(url)){ 
                this.content = this.content.replace(url, '');
                listImage.push( `<img class="post__image" src="${url}"/>` )
            }
        })  
        return listImage;      
    }

    parseUrl(){
        const listImage = this.parseUrlImage();

        this.content = this.content.replaceAll(this.urlReg, "<a href='$&' title='Accéder au lien externe'>$&</a>") + listImage.reduce((a,image) => a += image, '');
        return this;
    }

    createImgEmojiTemplate(shortCode){
        return `
            <img width="15px" alt="${shortCode}" src="${require("@/assets/twemoji/svg/" +
                    this.emojisShortCodeIndex[shortCode].u.join("-").toLowerCase() +
            ".svg")}">
        `;
    }


}
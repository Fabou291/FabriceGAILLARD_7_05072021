const emojiRegex = require('emoji-regex');
import emojiUnicode from 'emoji-unicode';
export default class PostParser {

    content;
    emojisShortCodeIndex;
    urlReg = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g;

    constructor(content, emojisShortCodeIndex){
        this.content = content;
        this.emojisShortCodeIndex = emojisShortCodeIndex;
    }

    parseEmoji(){
        const reg = emojiRegex();
        this.content = this.content.replaceAll(reg, this.getImgEmoji);
        return this;
    }

    getImgEmoji(emoji) {
        try{
            return `<img class="emoji" alt="${emoji}" src="${require("@/assets/twemoji/svg/" + emojiUnicode(emoji) + ".svg")}">`;
        }catch(e){
            return emoji
        }
    }


    /**
     * @name parseUrlImage
     * @description Recherche les url pointant sur une image, pour les convertir en image cliquable
     * @returns {Array}
     */
    parseUrlImage(){
        const urlImgReg = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|tiff|svg|apng|avif)$/
        const listImage = [];
        [...this.content.matchAll(this.urlReg)].forEach(match => {
            const url = match[0];
            if(urlImgReg.test(url)){ 
                this.content = this.content.replace(url, '');
                listImage.push( `<a href="${url}"><img class="post__image" src="${url}"/></a>` )
            }
        })  
        return listImage;      
    }

    /**
     * @name parseUrlImage
     * @description Recherche les url, pour les convertir en lien cliquable
     * @returns {String}
     */

    parseUrl(){
        const listImage = this.parseUrlImage();

        this.content = this.content.replaceAll(this.urlReg, "<a href='$&' title='Accéder au lien externe'>$&</a>") + listImage.reduce((a,image) => a += image, '');
        return this;
    }




}
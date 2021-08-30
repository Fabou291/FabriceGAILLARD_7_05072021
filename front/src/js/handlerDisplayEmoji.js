export default class handlerDisplayEmoji{

    static getInfoSticky(bound){
        const paddingForm = 10;
        return{
            marginTop : document.getElementById('channel__caption').getBoundingClientRect().bottom + document.getElementById('scrollY').scrollTop + bound.height + paddingForm,
            position : 'sticky',
            top : 85,
            channelPosition : 'relative'
        }
    }

    static getInfoAbsolute(bound){
        return{
            marginTop : bound.bottom,
            position : 'unset',
            top : 0,
            channelPosition : 'unset'
        }
    }

    static getPxOutOfRange(y){
        let diff = 0;
        const heightTotalOfPanelEmoji = 454;

        if( (y+heightTotalOfPanelEmoji) > window.innerHeight)
            diff = (y+heightTotalOfPanelEmoji) - window.innerHeight;
        
        if( y < 0 ) diff =  y;

        return diff;
    }

    static setPositionOfDisplay(element, sticky){
        const bound = element.getBoundingClientRect();
        const {marginTop, top, position, channelPosition} = sticky ? this.getInfoSticky(bound) : this.getInfoAbsolute(bound);

        const displayEmojiStickyTop = document.getElementById('displayEmojiStickyTop');
        displayEmojiStickyTop.style.position = position;

        const espace = 20;
        const paddingContainer = 30;

        document.getElementById('channel').style.position = channelPosition ;

        const height =  (bound.top/window.innerHeight > 0.5) ? 454 + bound.height + espace*2 : 0 ;


        const outOfRange = sticky ? 0 : this.getPxOutOfRange(marginTop  + espace - paddingContainer - height);


        displayEmojiStickyTop.style.marginTop = marginTop  + espace - paddingContainer - height - outOfRange + 'px';
        displayEmojiStickyTop.style.top = top + 'px';
    }
}
<template>
    <form class="form-post">
        <div class="form-post__container">
            <div v-if="canBrownse">
                <button type="button" class="form-post__brownse-btn form-post-btn" @click.stop="showActionList" aria-label="Ouvrir le panel d'actions">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
                        ></path>
                    </svg>
                </button>

                <ActionList ref="ActionList" v-show="ActionListVisible" />
            </div>
            <div
                @keydown.esc.exact="escape"
                @input="updateInput"
                @keypress.enter.exact.prevent="submit"

                class="form-post__field"
                contenteditable="true"
                :title="placeholder"
                ref="textarea"
                spellcheck="false"
                tabindex="0"
                v-html="getValue"
                v-focus
            ></div>

            <button type="button" class="form-post-btn" v-if="false" aria-label="Ouvrir le panel de gif">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM9.76445 11.448V15.48C8.90045 16.044 7.88045 16.356 6.74045 16.356C4.11245 16.356 2.66045 14.628 2.66045 12.072C2.66045 9.504 4.23245 7.764 6.78845 7.764C7.80845 7.764 8.66045 8.004 9.32045 8.376L9.04445 10.164C8.42045 9.768 7.68845 9.456 6.83645 9.456C5.40845 9.456 4.71245 10.512 4.71245 12.06C4.71245 13.62 5.43245 14.712 6.86045 14.712C7.31645 14.712 7.64045 14.616 7.97645 14.448V12.972H6.42845V11.448H9.76445ZM11.5481 7.92H13.6001V16.2H11.5481V7.92ZM20.4724 7.92V9.636H17.5564V11.328H19.8604V13.044H17.5564V16.2H15.5164V7.92H20.4724Z"
                    ></path>
                </svg>
            </button>

            <button type="button" class="form-post-btn form-emoji-btn" ref="emojiFormBtn" v-if="canEmoji" @click="showEmojiDisplay()" aria-label="Ouvrir le panel d'emoji">
                <img :src="require('@/assets/twemoji/svg/1f642.svg')" alt="🙂">
            </button>
        </div>

        <div class="respond-info" v-if="idPostToReply && canRespond">
            <span
                >Répondre à <span class="respond-info__user">{{ getNameToReply }}</span> &#8226; Post #{{ idPostToReply }}</span
            >

            <button type="button" class="respond-info__close" @click="SET_ID_POST_TO_REPLY(null)" aria-label="Annuler la réponse">
                <svg aria-hidden="false" width="16" height="16" viewBox="0 0 14 14">
                    <path
                        fill="currentColor"
                        d="M7.02799 0.333252C3.346 0.333252 0.361328 3.31792 0.361328 6.99992C0.361328 10.6819 3.346 13.6666 7.02799 13.6666C10.71 13.6666 13.6947 10.6819 13.6947 6.99992C13.6947 3.31792 10.7093 0.333252 7.02799 0.333252ZM10.166 9.19525L9.22333 10.1379L7.02799 7.94325L4.83266 10.1379L3.89 9.19525L6.08466 6.99992L3.88933 4.80459L4.832 3.86259L7.02733 6.05792L9.22266 3.86259L10.1653 4.80459L7.97066 6.99992L10.166 9.19525Z"
                    ></path>
                </svg>
            </button>
        </div>
    </form>
</template>

<script>
import ActionList from "@/components/ActionList.vue";
import { mapMutations, mapState } from "vuex";
import PostParser from "@/js/PostParser.js";
import HandlerDivEditable from "@/js//handlerDivEditable/handlerDivEditable.js";
import handlerPositionDisplayEmoji from "@/js/handlerPositionDisplayEmoji.js";
export default {
    data() {
        return {
            selection: 0,
            textarea: "",
            EmojiParser: null,
            HandlerDivEditable: null,
        };
    },
    components: {
        ActionList,
    },
    props: {
        value: { type: String, default: "" },
        canBrownse: { type: Boolean, default: false },
        canGIF: { type: Boolean, default: false },
        canEmoji: { type: Boolean, default: false },
        placeholder: { type: String, default: "Envoyer un message dans ce groupe" },
        canRespond: { type: Boolean, default: false },
        sticky: { type: Boolean, default: false },
        focus: { type: Boolean, default: false },
    },
    watch: {
        idPostToReply() {
            if (this.canRespond && this.idPostToReply) this.textarea.focus();
        }
    },
    computed: {
        ...mapState("emojiModule", ["emojisShortCodeIndex", "display"]),
        ...mapState("postModule", ["idPostToReply","listPost", "ActionListVisible"]),
        isEmpty() {
            return this.textarea.innerHTML == "";
        },
        getValue() {
            let postParser = new PostParser(this.value);
            return postParser.parseContent().parseEmoji().parseFakeUrl().content;
        },
        getNameToReply() {
            //Vu que ca sera restreint à répondre auniquement au post (et non au post recursif)
            //je peux aller piocher dans l'array listPost sans me soucier
            return this.listPost.find((e) => e.id == this.idPostToReply).user_username;
        },
    },
    directives: {
        focus: {
            mounted: function (el) {
                
                for (const node of [...el.childNodes].reverse()) {
                    if(node.nodeType == Node.TEXT_NODE){
                        el = node;
                        break;
                    }else if(el.contentEditable != false) {
                        el = node.firstChild;
                        break;
                    }
                }

                window.getSelection().collapse(el, el.textContent.length)
            }
        }
    },
    methods: {
        ...mapMutations("emojiModule", ["SET_POSITION", "OPEN", "SET_HANDLER_DIV_EDITABLE"]),
        ...mapMutations("postModule", ["SET_ID_POST_TO_REPLY"]),

        /**
         * @name showEmojiDisplay
         * @description Affiche le display des emoji
         */
        showEmojiDisplay() {
            this.SET_HANDLER_DIV_EDITABLE(this.HandlerDivEditable);
            handlerPositionDisplayEmoji.setPositionOfDisplay(this.$refs["emojiFormBtn"], this.sticky);
            this.OPEN();
        },

        /**
         * @name escape
         * @description Emet l'evement escape
         */
        escape() { this.$emit("escape"); },

        /**
         * @name showActionList
         * @description Affiche la liste d'action
         */
        showActionList() { this.$refs["ActionList"].showActionList(); },

        /**
         * @name updateInput
         * @description Emet l'evenement updateInput
         */
        updateInput() { this.$emit('updateInput', this.HandlerDivEditable.getTextContent()) },

        /**
         * @name submit
         * @description Soumet le formulaire
         */
        submit(){
            const value = this.HandlerDivEditable.getTextContent().trim();
            if (value == "") return;
            this.$emit("submit", value);
            this.textarea.innerHTML = "";
        }
    },
    mounted() {
        this.textarea = this.$refs["textarea"];
        this.HandlerDivEditable = new HandlerDivEditable(this.textarea);
        this.HandlerDivEditable.eventHandler.initialization();
    },
    beforeUnmount() {
        this.HandlerDivEditable.eventHandler.removeEvent();
    },
};
</script>

<style lang="scss">


.form-post {
    border-radius: 4px;
    background-color: $grey-47;

    img{
        vertical-align: top;
    }

    &__container {
        color: $grey-142;

        display: flex;
        align-items: flex-start;
        padding: 10px;
        position: sticky;
        top: 0;
        z-index: 2;

        @include setMediaScreen(mobile) {
            flex-wrap: wrap;
        }
    }

    &__field {
        flex: 1;
        color: inherit;
        background-color: transparent;
        border: none;
        overflow: hidden;
        padding: 4.5px 7px;
        line-height : 1.5;
        //word-break: break-all;
        border-radius: 4px;
        @include setCircularStdFont("Book");

        @include setMediaScreen(mobile) {
            order: 1;
            min-width: 100%;
        }

        &:not(:empty) {
            color: lighten($grey-142, 30%);
        }
    }

    &__url{
        color : $blue;
    }
}

.form-post-btn {
    padding: 4px;
    margin: 0 4px;
    &:hover {
        color: lighten($grey-142, 10%);
    }

    &__gif-btn {
        margin-left: auto;
    }

    &__emoji-btn {
        position: relative;
    }
}

.respond-info {
    display: flex;
    align-items: center;
    height: 35px;
    background-color: $grey-21;
    width: 100%;
    border-radius: 0 0 4px 4px;
    font-size: 13px;
    color: $grey-166;

    padding: 0px 15px;

    &__close {
        padding: 5px;
        margin-left: auto;
    }

    &__user {
        color: $primary;
    }
}

.form-emoji-btn{
    margin-left : auto;
    padding : 6px;
    img{
        width: 20px;
        height: 20px;
        transform : scale(1);
        opacity : 0.5;
        filter: grayscale(100%);
        transition : transform 0.2s;    
    }

    &:hover img{
        transform : scale(1.2);
        opacity : 1;
        filter: grayscale(0);
    } 

}
</style>

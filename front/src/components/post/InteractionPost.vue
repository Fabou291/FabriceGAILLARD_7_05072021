<template>
    <div class="interaction-post">
        <ul class="interaction-post__list">
            <li class="interaction-post__list-item">
                <button type="button" class="interaction-post__btn" ref="interactionPostBtn" @click="raction" aria-label="Ajouter une réaction">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M12.2512 2.00309C12.1677 2.00104 12.084 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.916 21.999 11.8323 21.9969 11.7488C21.3586 11.9128 20.6895 12 20 12C15.5817 12 12 8.41828 12 4C12 3.31052 12.0872 2.6414 12.2512 2.00309ZM10 8C10 6.896 9.104 6 8 6C6.896 6 6 6.896 6 8C6 9.105 6.896 10 8 10C9.104 10 10 9.105 10 8ZM12 19C15.14 19 18 16.617 18 14V13H6V14C6 16.617 8.86 19 12 19Z"
                        ></path>
                        <path d="M21 3V0H19V3H16V5H19V8H21V5H24V3H21Z" fill="currentColor"></path>
                    </svg>
                </button>
            </li>
            <li class="interaction-post__list-item">
                <button type="button" class="interaction-post__btn" @click="modify" v-if="isOwner" aria-label="Modifier">
                    <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
                <button type="button" class="interaction-post__btn" @click="reply" v-else-if="!isOnRecursifPost" aria-label="Répondre">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
            </li>
            <li class="interaction-post__list-item">
                <button type="button" class="interaction-post__btn" @click="remove" v-if="isOwner || user.role_id == 1" aria-label="Supprimer">
                    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                        <path
                            fill="currentColor"
                            d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"
                        ></path>
                    </svg>
                </button>
            </li>
            <li class="interaction-post__list-item">
                <button type="button" class="interaction-post__btn" aria-label="Voir d'avantage d'action possible">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z"
                        ></path>
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import handlerPositionDisplayEmoji from "@/js/handlerPositionDisplayEmoji.js";

export default {
    props: {
        user_id: { type: Number, required: true },
        isOnRecursifPost : { type:Boolean, required : true }
    },
    computed: {
        ...mapState("userModule", ["user"]),
        isOwner() {
            return this.user_id == this.user.id;
        },
    },
    methods: {
        ...mapMutations('postModule', ['SET_ID_POST_TO_REPLY']),
        ...mapMutations('emojiModule', ['OPEN']),
        modify() {
            this.$emit("modifyPost");
            this.SET_ID_POST_TO_REPLY(null);
        },
        reply() { this.$emit("replyPost") },
        remove(){ this.$emit("removePost"); },
        raction(){ 
            this.showEmojiDisplay();
            this.$emit("addReactionToPost");
        },
        showEmojiDisplay(){
            handlerPositionDisplayEmoji.setPositionOfDisplay(this.$refs['interactionPostBtn'],false);
            this.OPEN();
        },
    },

};
</script>

<style lang="scss">
.interaction-post {
    color: $grey-142;
    border-radius: 4px;

    box-shadow: 0px 1px 1px rgba(black,0.3);
    background-color: $grey-59;
    color : $grey-193;
    transition : box-shadow 0.2s, color 0.2s;

    &:hover, &:focus-within{
        box-shadow: 0px 3px 6px rgba(black,0.3);
    }

    &__list {
        display: flex;
    }


    &__btn {
        width: 32px;
        height: 32px;
        vertical-align: center;

        &:hover {
            background-color: lighten($grey-59, 5);
            color : white;
        }
    }
}
</style>

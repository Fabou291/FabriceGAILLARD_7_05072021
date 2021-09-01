<template>
    <button class="reaction-btn" :class="{ 'reaction-btn--active' : userIsIncluded }" type="button" @click="switchReaction">
        <img class="reaction-btn__emoji" :src="require('@/assets/twemoji/svg/' + getUnicodeByIndex + '.svg')" alt="emoji">
        {{ getLength }}
    </button>
</template>

<script>
import {  mapState } from 'vuex'

export default {
    props : {
        reaction : { type : Object, required : true }
    },
    computed : {
        ...mapState('emojiModule',['emojisDataIndexed']),
        ...mapState('userModule',['user']),
        getUnicodeByIndex(){
            return this.reaction.emoji_unicode.split(',').join('-').toLowerCase();
        },
        getLength(){
            return this.reaction.list_user_id.length;
        },
        userIsIncluded(){
            return this.reaction.list_user_id.includes(this.user.id.toString())
        }
    },
    methods : {
        switchReaction(){ 
            if(this.userIsIncluded) this.remove()
            else this.add()
        },
        remove(){ 
            const index = this.reaction.list_user_id.indexOf(this.user.id.toString());
            this.$emit('removeReaction', this.reaction.list_reaction_id[index], this.reaction.emoji_unicode)
        },
        add(){ this.$emit('addReaction', this.reaction.emoji_unicode) }
    }


}
</script>

<style lang="scss">
    .reaction-btn{
        border-radius : 4px;

        border : 1px solid transparent;
        padding : 4px 8px;
        margin : 10px 4px 0 0;


        &--active{
            background-color : rgba(darken($success, 25),0.4) !important;
            border : 1px solid rgba($success, 0.6) !important;

            &:hover{
                background-color : rgba(darken($success, 20),0.4) !important;
                border : 1px solid rgba($success, 0.8) !important;
            }
        }

        &__emoji{
            @include setSize(16px);
        }

    }
</style>
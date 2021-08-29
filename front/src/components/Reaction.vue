<template>
    <button class="reaction-btn" type="button">
        <img class="reaction-btn__emoji" :src="require('@/assets/twemoji/svg/' + getUnicodeByIndex + '.svg')" alt="emoji">
        {{ getLength }}
    </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props : {
        reaction : { type : Object, required : true }
    },
    computed : {
        ...mapState('emojiModule',['emojisDataIndexed']),
        getUnicodeByIndex(){
            return this.emojisDataIndexed[this.reaction.emoji_id].u.join('-').toLowerCase();
        },
        getLength(){
            return this.reaction.list_user_id.length;
        }
    }
}
</script>

<style lang="scss">
    .reaction-btn{
        border-radius : 4px;
        background-color : rgba(0,0,0,0.2);
        border : 1px solid rgba(0,0,0,0.4);
        padding : 4px 8px;
        margin : 10px 4px 0 0;
        &__emoji{
            @include setSize(16px);
        }
        &:hover{
            background-color : rgba(0,0,0,0.4);
            background-color : rgba(0,0,0,0.6);
        }
    }
</style>
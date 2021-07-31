<template>
    <div class="comment">
        <div class="comment__sidebar"></div>
        <div class="comment__main">

            <Avatar class="comment__user-avatar" :user="{ pseudo : comment.user_pseudo, avatar : comment.user_avatar }" />
        
            <div>
                <div class="comment__aside">
                    <span class="comment__user-pseudo">{{ comment.user_pseudo }}</span> <span class="comment__date">{{ comment.date }}</span>                
                </div>
            
                <p class="comment__content" v-html="content" ></p>                
            </div>

        </div>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';
    import ContentParser from "../js/contentParser.js";
    import { mapState } from 'vuex';
    

    export default {
        data() {
            return {
                content : ""
            }
        },
        props : {
            comment : { type: Object, required : true },
        },
        computed : {
            ...mapState(['emoji'])
        },
        components : {
            Avatar,
        },
        methods : {
            parseComment(){
                let contentParser = new ContentParser(this.comment.content, this.emoji.emojisShortCodeIndex);
                this.content = contentParser.parseEmoji().parseUrl().content;            
            }
        },
        created(){
            this.parseComment();
        }
    }
</script>

<style lang="scss">
.comment {
    display: flex;
    overflow: hidden;
    background-color: $grey-25;
    margin : 0 0 20px 40px;

    &:hover{
        background-color : lighten($grey-25, 1);
        .comment__sidebar {
            background-color: lighten($grey-47,7);
        }
    }

    &__sidebar {
        width: 5px;
        background-color: $grey-47;
    }
    &__main {
        display : flex;
        align-items: flex-start;
        flex: 1;
        padding: 15px;
    }

    &__aside{
        display: flex;
        align-items: center;
        gap : 8px;
    }

    &__user-avatar{
        border-color : $grey-32;
        margin : -6px 8px 0 -6px
    }

    &__user-pseudo{
        color : $green;
        @include setCircularStdFont('Medium');
        font-size : 15px;
    }

    &__date{
        color : $grey-113;
        font-size : 11px;
    }

    &__content{
        margin: 5px 0 0 0;
        letter-spacing: -0.1px;
        line-height: 1.3;
        font-size: 16px;
        color: $grey-193;
    }

}
</style>
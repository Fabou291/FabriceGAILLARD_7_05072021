<template>
    <div>
        <InteractionPost class="post__interaction" v-show="!isInModifyMode" :user_id="parseInt(post.user_id)" @replyPost="setIdPostToReply(post.id)" @removePost="remove" @modifyPost="SET_ID_POST_IN_MODIFY_MODE(post.id)"/>
        <div class="post__sidebar"></div>
        <div class="post__main">
            
                <Avatar class="post__user-avatar" :user="{ username : post.user_username, avatar : require(`@/assets/${post.user_avatar}`) }" />

                <div class="post__infos">
                    <div class="post__aside">
                        <span class="post__user-username">{{ post.user_username }}</span> <span class="post__date">{{ post.created_at }}</span>                
                    </div>

                    <FormPost  :value="post.content" :canEmoji="true" v-if="isInModifyMode"  @submit="modify"/>

                    <p class="post__content" v-html="getContent" v-if="!isInModifyMode"></p>

                    <div class="post__reaction">
                        <Reaction v-for="reaction in post.listReaction" :key="reaction" :reaction="reaction" />
                    </div>
                </div>
        </div>
    </div>        
</template>

<script>
    import Avatar from '@/components/Avatar.vue';
    import InteractionPost from '@/components/InteractionPost.vue';
    import Reaction from '@/components/Reaction.vue';
    import { mapState, mapActions, mapMutations } from 'vuex';
    import ContentParser from "../js/contentParser.js"
    import FormPost from '@/components/FormPost.vue';

    export default {
        components : {
            Avatar, InteractionPost, Reaction, FormPost
        },
        data() {
            return{
                modifyMode : false,
            }
        },
        computed:{
            ...mapState(["emoji","actualPostInModifyMode"]),
            ...mapState('postModule',["idPostInModifyMode"]),
            isInModifyMode(){ return this.idPostInModifyMode == this.post.id },
            getContent(){ return this.parseContent() }
        },
        props : {
            post : { type : Object, required : true }
        },
        methods : {
            ...mapActions('postModule', ["modifyPost", "removePost","setIdPostToReply"]),
            ...mapMutations('postModule', ["SET_ID_POST_IN_MODIFY_MODE"]),
            parseContent(){
                let contentParser = new ContentParser(this.post.content, this.emoji.emojisShortCodeIndex);
                return contentParser.parseEmoji().parseUrl().content;            
            },
            modify(content){ this.modifyPost({ ...this.post, content }) },
            remove(){ this.removePost({ ...this.post }) }
        }

    };
</script>

<style lang="scss">
.post {
    display: flex;
    
    margin : 0 0 20px 0;
    position : relative;



    &.post--recursive{
        
        margin : 0 0 20px 40px;
        .post__main {
            border-radius : 0;
            background-color : $grey-25;
            padding : 10px;
        }
        .post__sidebar{
            border-radius : 0;
        }

        &:hover{
            .post__main {
                background-color : lighten($grey-25, 1);
            }
            .post__sidebar {
                background-color: lighten($grey-47,7);
            }
        }
    }

    &:hover{
        
        .post__main {
            background-color : lighten($grey-32, 1);
        }
            
        
        .post__sidebar {
            background-color: lighten($grey-59,7);
        }

        .post__interaction{
            display : block;
        }
    }


    &__sidebar {
        width: 5px;
        background-color: $grey-59;
        border-radius : 4px 0 0 4px;
    }

    &__main {
        background-color: $grey-32;
        padding: 20px;
        border-radius : 0 4px 4px 0;
        display : flex;
        align-items: flex-start;
        flex: 1;
    }

    &__infos {
        flex : 1;
    }


    &__interaction {
        position : absolute;
        display : none;
        top : -20px;
        right : 10px;
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

    &__user-username{

        @include setCircularStdFont('Medium');
        font-size : 15px;
    }

    &__date{
        color : $grey-113;
        font-size : 11px;
    }

    &__content{
        margin: 0px;
        letter-spacing: -0.1px;
        line-height: 1.5;
        font-size: 16px;
        color: $grey-193;
        overflow-wrap: anywhere;
    }



}
</style>

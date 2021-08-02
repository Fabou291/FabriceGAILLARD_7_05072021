<template>
    <div>
        <div class="post">
            <InteractionPost class="post__interaction" v-show="!modifyMode" :user_id="parseInt(post.user_id)" @switchModifyMode="switchModifyMode"/>
            <div class="post__sidebar"></div>
            <div class="post__main">
              
                    <Avatar class="post__user-avatar" :user="{ pseudo : post.user_pseudo, avatar : post.user_avatar }" />
                
                    <div class="post__infos">
                        <div class="post__aside">
                            <span class="post__user-pseudo">{{ post.user_pseudo }}</span> <span class="post__date">{{ post.date }}</span>                
                        </div>

                        <FormPost  @keydown.esc.prevent="switchModifyMode" v-model="content" :canEmoji="true" v-if="modifyMode" />

                        <p class="post__content" v-html="content" v-if="!modifyMode"></p>

                        <div class="post__reaction">
                            <Reaction v-for="reaction in post.listReaction" :key="reaction" :reaction="reaction" />
                        </div>
                    </div>

            </div>
        </div>        
    </div>

</template>

<script>
import Avatar from '@/components/Avatar.vue';
import InteractionPost from '@/components/InteractionPost.vue';
import Reaction from '@/components/Reaction.vue';
import { mapState, mapActions } from 'vuex';
import ContentParser from "../js/contentParser.js"
import FormPost from '@/components/FormPost.vue'
export default {
    components : {
        Avatar, InteractionPost, Reaction, FormPost
    },
    data() {
        return{
            modifyMode : false,
            content : '',
        }
    },
    computed:{
        ...mapState(["emoji","actualPostInModifyMode"]),
        
    },
    props : {
        post : { type : Object, required : true }
    },
    methods : {
        ...mapActions(['updateActualPostInModifyMode']),
        parsePost(){
            let contentParser = new ContentParser(this.post.content, this.emoji.emojisShortCodeIndex);
            this.content = contentParser.parseEmoji().parseUrl().content;            
        },
        switchModifyMode(){
            this.updateActualPostInModifyMode();
            console.log(this.actualPostInModifyMode); //return null
        }
    },
    created(){
        this.parsePost();
    }

};
</script>

<style lang="scss">
.post {
    display: flex;

    margin : 0 0 20px 0;
    position : relative;

    &:hover{
        
        .post__main{
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
        padding: 20px;
        border-radius : 0 4px 4px 0;
        background-color: $grey-32;
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
        line-height: 1.5;
        font-size: 16px;
        color: $grey-193;
        overflow-wrap: anywhere;
    }



}
</style>

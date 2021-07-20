<template>
    <div>
        <div class="post">
            <InteractionPost class="post__interaction" />
            <div class="post__sidebar"></div>
            <div class="post__main">
              
                    <Avatar class="post__user-avatar" :user="{ pseudo : post.user_pseudo, avatar : post.user_avatar }" />
                
                    <div>
                        <div class="post__aside">
                            <span class="post__user-pseudo">{{ post.user_pseudo }}</span> <span class="post__date">{{ post.date }}</span>                
                        </div>
                    
                        <p class="post__content" > {{ post.content }} </p>

                        <div class="post__reaction">
                            <Reaction v-for="reaction in post.listReaction" :key="reaction" :reaction="reaction" />
                        </div>                
                    </div> 
                                       
            </div>
        </div>  
        <Comment v-for="comment in post.listComment" :key="comment" :comment="comment" />        
    </div>

</template>

<script>
import Avatar from '@/components/Avatar.vue';
import Comment from '@/components/Comment.vue';
import InteractionPost from '@/components/InteractionPost.vue';
import Reaction from '@/components/Reaction.vue';
export default {
    components : {
        Avatar,
        Comment,
        InteractionPost,
        Reaction
    },
    data() {
        return {
            post: {
                user_id: 0,
                user_avatar: require("@/assets/imageProfil.png"),
                user_pseudo: "Fab",
                date: "2021/07/20",
                content:
                    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                listComment: [
                    {
                        user_id: 0,
                        user_avatar: require("@/assets/imageProfil.png"),
                        user_pseudo: "Fab",
                        date: "2021/07/20",
                        content:
                            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",                    
                    },
                    {
                        user_id: 0,
                        user_avatar: require("@/assets/imageProfil.png"),
                        user_pseudo: "Fab",
                        date: "2021/07/20",
                        content:
                            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",                    
                    },
                    {
                        user_id: 0,
                        user_avatar: require("@/assets/imageProfil.png"),
                        user_pseudo: "Fab",
                        date: "2021/07/20",
                        content:
                            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",                    
                    },
                    {
                        user_id: 0,
                        user_avatar: require("@/assets/imageProfil.png"),
                        user_pseudo: "Fab",
                        date: "2021/07/20",
                        content:
                            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",                    
                    },
                    {
                        user_id: 0,
                        user_avatar: require("@/assets/imageProfil.png"),
                        user_pseudo: "Fab",
                        date: "2021/07/20",
                        content:
                            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",                    
                    },
                ],
                listReaction: [
                    {
                        unicode : '1f0cf',
                        length : 3,
                    },
                    {
                        unicode : '1f1f0',
                        length : 10,
                    },
                    {
                        unicode : '1f1ef',
                        length : 1,
                    },
                ]
            },
        };
    },

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
        line-height: 1.3;
        font-size: 16px;
        color: $grey-193;
    }



}
</style>

<template>
    <section class="channel">
        <span class="tag-content">CHANNEL</span>
        <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
        <p class="channel__description">C'est le début du salon #Groupe 1.</p>
        <FormPost @submit="addPost"  :canBrownse="true" :canGIF="true" :canEmoji="true" />
        <div class="channel__posts">
            <div v-for="post in listPost" :key="post">
                <Post class ="post" :post="post" />
                <div>
                    <Post class ="post post--recursive" :post="comment" v-for="comment in post.listComment" :key="comment.id" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";
import { mapGetters } from "vuex";
import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";


//import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: {
        FormPost,
        Post,
        //EmojiPanel,
    },
    data() {
        return {
            listPost: null,
            channelId : null,
        };
    },
    computed: {
        ...mapGetters('userModule',['user']),
    },
    methods: {
        async addPost(content) {
            try{
                
                const response = await HTTPRequest.post('post/',{ post :{content, channelId : this.$route.params.id} })
                if(!response.ok) throw response;

                this.listPost.unshift({
                    user_id: this.user.id,
                    user_avatar: this.user.avatar,
                    user_username: this.user.username,
                    created_at: "Aujourd'hui",
                    content,
                    listComment: [],
                    listReaction : []
                });

            }catch(e){
                console.log(e)
            }
        },
        async getListPost() {
            try {
                const response = await HTTPRequest.get(`channel/${this.$route.params.id}/post?limit=10&offset=0`);
                return await response.json();
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getListPost().then((listPost) => {
            this.listPost = listPost
            console.log(this.listPost)
        });
        this.channelId = this.$route.query.id;
    },
    update(){
    },

    mounted(){
    }
};
</script>

<style lang="scss">
.channel {
    max-width: 800px;
    padding: 30px 15px 0 30px;

    &__title {
        color: white;
        font-size: 48px;
        @include setCircularStdFont("Black");
        letter-spacing: -2.7px;
        margin: 4px 0 10px 0;
    }

    &__description {
        color: $grey-193;
        @include setCircularStdFont("Bold");
        font-size: 13px;
        letter-spacing: 0.3px;
        margin: 0 0 34px 0;
    }
    &__posts {
        margin: 25px 0 0 0;
    }
}

.tag-content {
    font-size: 12px;
    @include setCircularStdFont("Bold");
    color: white;
}
</style>

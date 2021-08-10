<template>
    <section class="channel">
        <span class="tag-content">CHANNEL</span>
        <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
        <p class="channel__description">C'est le début du salon #Groupe 1.</p>
        <FormPost @addPost="addPost" v-model="formPostValue" :canBrownse="true" :canGIF="true" :canEmoji="true" />
        <div class="channel__posts">
            <div v-for="post in listPost" :key="post">
                <Post :post="post" />
                <div class="comments">
                    <Post :post="comment" v-for="comment in post.listComment" :key="comment" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";
import { mapState } from "vuex";
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
            formPostValue: "",
        };
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        addPost() {
            this.listPost.unshift({
                user_id: this.user.id,
                user_avatar: this.user.avatar,
                user_name: this.user.pseudo,
                date: "date fictive",
                content: this.formPostValue,
                listComment: [],
            });
            this.formPostValue = "";
        },
        async getListPost() {
            try {
                const response = await HTTPRequest.get(`channel/${this.$route.params.id}/post?limit=10&offset=0`, {
                    Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
                });
                return await response.json();
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        console.log('c')
        this.getListPost()
            .then((listPost) => {
                this.listPost = listPost;
                console.log(listPost)
            });
    },
    update(){
        console.log('up')
    },

    mounted(){
        console.log('mounted')
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

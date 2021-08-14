<template>
    <section class="channel">
        <span class="tag-content">CHANNEL</span>
        <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
        <p class="channel__description">C'est le début du salon #Groupe 1.</p>
        <FormPost @submit="add"  :canBrownse="true" :canGIF="true" :canEmoji="true" />
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
import { mapActions, mapGetters, mapState } from "vuex";


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
            channelId : null,
        };
    },
    computed: {
        ...mapGetters('userModule',['user']),
        ...mapState('postModule',['listPost'])
    },
    methods: {
        ...mapActions('postModule',['getListPost','addPost']),
        add(content){ this.addPost({ content, channelId : this.channelId }) }
    },
    created() {
        this.channelId = this.$route.params.id;
        this.getListPost(this.channelId);
    },
    update(){
        this.channelId = this.$route.params.id;
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

<template>
    
    <section class="channel" id="channel">
            <EmojiPanel/>        
        <div class="channel__caption" id="channel__caption">
            <span class="tag-content">CHANNEL</span>
            <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
            <p class="channel__description">C'est le début du salon #Groupe 1.</p>            
        </div>

        <div class="channel__formPost">
            <FormPost @submit="add" ref="formPost"  :canBrownse="true" :canGIF="true" :canEmoji="true" :canRespond="true" :sticky="true" />            
        </div>

        <div class="channel__posts">
            <template v-for="post in listPost" :key="post">
                <Post class ="post" :post="post" />
                    <Post class ="post post--recursive" :post="comment" v-for="comment in post.listComment" :key="comment.id" />              
            </template>

        </div>
    </section>
</template>

<script>
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";
import { mapActions, mapGetters,  mapMutations,  mapState } from "vuex";
import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: {
        FormPost,
        Post,
        EmojiPanel,
    },
    data() {
        return {
            channelId : null,
        };
    },
    computed: {
        ...mapGetters('userModule',['user']),
        ...mapState('postModule',['listPost']),
    },
    methods: {
        ...mapActions('postModule',['getListPost','addPost']),
        ...mapMutations('inputPostChannelModule',['SET_TEXTAREA']),
        ...mapMutations('imagePostModule',['SET_CHANNEL_ID']),
        add(content){ this.addPost({ content, channelId : this.channelId }) }
    },
    created() {
        this.channelId = this.$route.params.id;
        this.getListPost(this.channelId);
    },
    mounted(){
        this.SET_TEXTAREA(this.$refs['formPost'].textarea);
        this.SET_CHANNEL_ID(this.channelId);
    },
    beforeRouteUpdate(to) {
        this.channelId = to.params.id;
        this.getListPost(this.channelId);
    },
};
</script>

<style lang="scss">
$FormPostPaddingTop : 20px; 

    .channel {
        width: 100%;
        padding: 30px;
        position: relative;

        @include setMediaScreen(tablette){
            padding: 30px 5px 0 5px;
        }

        &__caption {
            @include setMediaScreen(tablette){
                padding: 0 0 0 20px;
            }
        }

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
            margin: 0;
            padding: 0 0 34px 0;
        }

        &__formPost {
            padding-top : $FormPostPaddingTop;
            position: sticky;
            top: 0;
            z-index: 4;
            background-color : $grey-18;
        }

        &__posts {
            position: relative;
            margin: 25px 0 0 0;
        }
    }

    .tag-content {
        font-size: 12px;
        @include setCircularStdFont("Bold");
        color: white;
    }
</style>

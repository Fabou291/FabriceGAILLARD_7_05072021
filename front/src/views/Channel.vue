<template>
    
    <section class="channel" id="channel">
            <EmojiPanel/>        
        <div class="channel__caption" id="channel__caption">
            <span class="tag-content">CHANNEL</span>
            <h1 class="channel__title">Bienvenue sur {{ channel.name }}</h1>
            <p class="channel__description">{{ channel.description || 'Aucune description' }}</p>            
        </div>

        <div class="channel__formPost">
            <FormPost @submit="add" ref="formPost"  :canBrownse="true" :canGIF="true" :canEmoji="true" :canRespond="true" :sticky="true" />            
        </div>

        <div class="channel__posts">
            <template v-for="post in listPost" :key="post">
                <Post class ="post" :post="post" />
                    <Post class ="post post--recursive" :post="comment" v-for="comment in post.listComment" :key="comment.id" />              
            </template>
            <div class="channel__end" v-if="pagination.limitReached">
                <span >Ceci est la fin du channel</span>
                <span class="channel__end-name">{{ channel.name }}</span>
            </div>
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
            channel : {
                id : null,
                name : null,
                description : null,
            },
            pagination : {
                currentPage : 0,
                limitReached :false,
                lengthListPost : 0,
                limit : 10,
                scrollY : null,
            },
        };
    },
    computed: {
        ...mapGetters('userModule',['user']),
        ...mapState('sidebarModule',['listGroup']),
        ...mapGetters('sidebarModule',['getChannelById']),
        ...mapState('postModule',['listPost']),
    },
    watch : {
        listGroup(){
            this.channel = this.getChannelById(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('postModule',['getListPost','addPost']),
        ...mapMutations('inputPostChannelModule',['SET_TEXTAREA']),
        ...mapMutations('imagePostModule',['SET_CHANNEL_ID']),
        add(content){ this.addPost({ content, channelId : this.channel.id }) },
        getlistPostOfChannel(commitName){
            this.getListPost({
                channelId : this.channel.id,
                limit : this.pagination.limit,
                offset : this.pagination.limit * (++this.pagination.currentPage-1),
                commit : commitName
            })
            .then(() => {
                if(this.listPost.length - this.pagination.lengthListPost < this.pagination.limit) this.pagination.limitReached = true;
                this.pagination.lengthListPost = this.listPost.length;
            })
        },
        resetPagination(){
            this.pagination.limitReached = false;
            this.pagination.lengthListPost = 0;
            this.pagination.currentPage = 0;
        },
        handleScroll(){
            const isBottomOfChannel = this.scrollY.scrollTop + this.scrollY.getBoundingClientRect().height >= this.scrollY.scrollHeight*90/100;
            if(isBottomOfChannel && !this.pagination.limitReached) this.getlistPostOfChannel("PUSH_LIST_POST");            
        }
    },
    created() {
        this.channel.id = this.$route.params.id;
        this.getlistPostOfChannel("SET_LIST_POST")
    },
    mounted(){
        this.scrollY =  document.getElementById('scrollY');
        this.scrollY.addEventListener('scroll', () => this.handleScroll(),true);
        this.SET_TEXTAREA(this.$refs['formPost'].textarea);
        this.SET_CHANNEL_ID(this.channel.id);
    },
    unmounted() {
        this.scrollY.removeEventListener('scroll', () => this.handleScroll(),true);
    },
    beforeRouteUpdate(to) {
        this.channel = this.getChannelById(to.params.id)
        this.resetPagination();
        this.getlistPostOfChannel("SET_LIST_POST");
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

        &__end {
            margin-top : 10px;
            border-top : 1px solid $grey-59;
            padding : 20px;
            font-size : 13px;
            @include setFlexCenter();
            flex-direction: column;
            color : $grey-142;
            gap : 5px;
        }

        &__end-name {
            color : white;
            @include setCircularStdFont('Black');
            font-size : 27px;
        }

    }

    .tag-content {
        font-size: 12px;
        @include setCircularStdFont("Bold");
        color: white;
    }
</style>

<template>
    
    <section class="channel" id="channel" >
        <div v-show="channel.id">
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
                    <Post class ="post" :post="post" :isRecursif="false" />
                        <Post class ="post post--recursive" :post="comment" v-for="comment in post.listComment" :key="comment.id" :isRecursif="true" />              
                </template>
                <div class="channel__end" v-if="pagination.limitReached && listPost.length != 0">
                    <span >Ceci est la fin du channel</span>
                    <span class="channel__end-name">{{ channel.name }}</span>
                </div>
                <div class="channel__end" v-if="listPost.length == 0">
                    <span >Il n'y à encore aucune publication dans ce channel</span>
                    <span class="channel__end-name">{{ channel.name }}</span>
                </div>
            </div>
        </div>
        <div v-if="!channel.id">
            AUCUN CHANNEL NE CORRESPOND OUPS 404
        </div>
    </section>
</template>

<script>
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";
import { mapActions,  mapMutations,  mapState } from "vuex";
import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";
import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";

export default {
    name: "Home",
    components: {
        FormPost,
        Post,
        EmojiPanel,
    },
    data() {
        return {
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
                inProgress : false
            },
        };
    },
    computed: {
        ...mapState('userModule',['user']),
        ...mapState('sidebarModule',['listGroup']),
        ...mapState('postModule',['listPost']),
    },
    watch : {
        user(){
            this.UPDATE_USER_OF_POST(this.user)
        }
    },
    methods: {
        ...mapActions('postModule',['getListPost','addPost']),
        ...mapMutations('postModule',['UPDATE_USER_OF_POST']),
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
                this.pagination.inProgress = false;
            })
        },
        resetPagination(){
            this.pagination.limitReached = false;
            this.pagination.lengthListPost = 0;
            this.pagination.currentPage = 0;
            this.pagination.inProgress = false;
        },
        handleScroll(){
            const isBottomOfChannel = this.scrollY.scrollTop + this.scrollY.getBoundingClientRect().height >= this.scrollY.scrollHeight;
            if(isBottomOfChannel && !this.pagination.limitReached && !this.pagination.inProgress){
                this.pagination.inProgress = true;
                this.getlistPostOfChannel("PUSH_LIST_POST");
            }             
        },
        async getChannelById(channel_id){
            const response = await HTTPRequest.get(`channel/${channel_id}`);
            if(response.length == 0) return { id : null, name : null, description : null }
            const { id, name, description } = response[0];
            return { id, name, description };
        },
        init(){
            this.getlistPostOfChannel("SET_LIST_POST");
            this.SET_TEXTAREA(this.$refs['formPost'].textarea);
            this.SET_CHANNEL_ID(this.channel.id); 
            this.scrollY.addEventListener('scroll', this.handleScroll,false);
        }
    },
    mounted(){
        this.getChannelById(this.$route.params.id).then(channel => {
            this.channel = channel;
            if(this.channel){
                this.scrollY =  document.getElementById('scrollY');
                this.init();
            }
        })
    },
    unmounted() {
        this.scrollY.removeEventListener('scroll', this.handleScroll,false);
    },
    beforeRouteUpdate(to) {
        this.scrollY.removeEventListener('scroll', this.handleScroll,false);
        this.getChannelById(to.params.id).then(channel => {
            this.resetPagination();
            this.channel = channel;
            if(this.channel) this.init();
        })
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
            text-overflow : ellipsis;
            overflow: hidden;

            word-wrap: break-word;
            max-height: 3.6em;
            height: 3.6em;
            line-height: 1.2em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
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

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
                <LoadingSpinner v-if="pagination.inProgress"/>
                <div class="channel__end" v-if="pagination.limitReached && listPost.length != 0 && !pagination.inProgress">
                    <span >Ceci est la fin du channel</span>
                    <span class="channel__end-name">{{ channel.name }}</span>
                </div>
                <div class="channel__end" v-if="listPost.length == 0 && !pagination.inProgress">
                    <span >Il n'y à encore aucune publication dans ce channel</span>
                    <span class="channel__end-name">{{ channel.name }}</span>
                </div>
            </div>
        </div>

        <div class="channel-404" v-if="!channel.id && !pagination.inProgress">
            <h1 class="channel-404__title"> Il semblerait que tu te sois égaré(e)! </h1>
            <div class="channel-404__cache">
                <svg version="1.1" width="64px" height="239px">
                    <g transform="matrix(1 0 0 1 -754.5 -303.5 )">
                        <path fill="none" stroke="currentColor"  d="M 42.8439306358382 0.624277456647405  L 12.2080924855492 31.2601156069364  L 43 58.4277456647399  L 0.0693641618497622 111.606936416185  L 59.606936416185 164.208092485549  L 0.0693641618497622 234.728323699422  " stroke-width="3"  transform="matrix(1 0 0 1 756 305 )"/>
                    </g>
                </svg>
            </div>
            <div class="channel-404__anchor">
                <p > Il n'y a aucun channel ici! </p>
                <router-link to="" class="btn-default btn-default--green"> Retour </router-link>                    
            </div>
        </div>

    </section>
</template>

<script>
import FormPost from "@/components/form/FormPost.vue";
import Post from "@/components/post/Post.vue";
import { mapActions,  mapMutations,  mapState } from "vuex";
import EmojiPanel from "../components/modal/emojiPanel/EmojiPanel.vue";
import HTTPRequest from "@/js/HTTPRequest.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
    name: "Home",
    components: {
        FormPost,
        Post,
        EmojiPanel,
        LoadingSpinner
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
                inProgress : true,
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
        ...mapMutations('postModule',['UPDATE_USER_OF_POST', 'SET_LIST_POST']),
        ...mapMutations('inputPostChannelModule',['SET_TEXTAREA']),
        ...mapMutations('imagePostModule',['SET_CHANNEL_ID']),
        async add(content){ 
            const id = await this.addPost({ content, channelId : this.channel.id });
            document.querySelector(`#post-id-${id}`).focus();
        },
        /*getlistPostOfChannel(commitName){
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
        },*/
        async getlistPostOfChannel(commitName){
            this.pagination.inProgress = true;
            await this.getListPost({
                channelId : this.channel.id,
                limit : this.pagination.limit,
                offset : this.pagination.limit * (++this.pagination.currentPage-1),
                commit : commitName
            })

            if(this.listPost.length - this.pagination.lengthListPost < this.pagination.limit) this.pagination.limitReached = true;
            this.pagination.lengthListPost = this.listPost.length;
            this.pagination.inProgress = false;

        },
        resetPagination(){
            this.pagination.inProgress = true;
            this.scrollY.removeEventListener('scroll', this.handleScroll,false);
            this.scrollY.scrollTo(0,0);
            this.pagination.limitReached = false;
            this.pagination.lengthListPost = 0;
            this.pagination.currentPage = 0;
        },
        async handleScroll(){
            const isBottomOfChannel = this.scrollY.scrollTop + this.scrollY.getBoundingClientRect().height >= this.scrollY.scrollHeight;
            if(isBottomOfChannel && !this.pagination.limitReached && !this.pagination.inProgress) await this.getlistPostOfChannel("PUSH_LIST_POST");
                         
        },
        async getChannelById(channel_id){
            const response = await HTTPRequest.get(`channel/${channel_id}`);
            if(response.length == 0) return { id : null, name : null, description : null }
            const { id, name, description } = response[0];
            return { id, name, description };
        },
        async init(){
            await this.getlistPostOfChannel("SET_LIST_POST");
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
        this.SET_LIST_POST([]);
        this.resetPagination();

        this.getChannelById(to.params.id).then(channel => {
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

    @keyframes reveal-cache {
        from {
            clip-path: inset(0 0 100% 0);
        }
        to{
            clip-path: inset(0 0 0 0);
        }
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to{
             opacity: 1;
        }
    }

    @keyframes translate {
        from {
            transform: translateX(20px);
        }
        to{
            transform: translateX(0);
        }
    }

    .channel-404{
        display : grid;
        grid-template-columns: 1fr auto 1fr;
        margin : auto;
        gap : 20px;
        align-items : center;
        height : 100%;
        padding-bottom : 100px;

        a, a:visited {
            color : white
        }

        @include setMediaScreen(tablette){
            gap : 10px;
        }

        @include setMediaScreen(mobile){
            gap : 5px;
        }

        &__title {
            @include setCircularStdFont('Black');
            font-size : 49px;
            letter-spacing : -2;
            text-align : right;
            min-width : 307px;
            justify-self : end;
            animation : fade-in 1s, translate 1s forwards ;

            @include setMediaScreen(tablette){
                font-size : 35px;
                min-width : 0px;
                max-width : 200px;
            }

            @include setMediaScreen(mobile){
                font-size : 25px;
                min-width : 115px;
            }

        }
        &__cache {
            animation : reveal-cache 1s ;
            color : $info;
            @include setMediaScreen(mobile){ 
                svg {
                    transform : scale(0.8);
                }
            }
        }
        &__anchor{
            @include setCircularStdFont('Book');
            font-size : 25px;
            letter-spacing : -1.5;
            color : $grey-215;
            max-width : 147px;
            animation : fade-in 1s, translate 1s forwards ;

            @include setMediaScreen(tablette){
                font-size : 25px;
                min-width : 0px;
            }
            @include setMediaScreen(mobile){
                font-size : 15px;
            }
        }
    }



    

</style>

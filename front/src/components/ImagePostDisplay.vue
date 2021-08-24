<template>
    <div class="display-settings-panel" ref="display-settings-panel" v-if="listFile != null" @mousedown="close" >
        <div class="upload-img-modal" @mousedown.stop>
            
            <header class="upload-img-modal__header">
                <img class="preview" src="" ref='IMG' alt="">
                <div class="title">
                    <div class="upload-img-modal__file-name">{{listFile[0].name}}</div>
                    <div class="upload-img-modal__channel">Uploader vers <span >{{ this.getChannelById(this.channelId).name }}</span></div>
                </div>
            </header>

            <div class="upload-img-modal__main">
                <label class="upload-img-modal__label" for="postContent" >AJOUTER UN COMMENTAIRE <span>(FACULTATIF)</span></label>
                <FormPost id="postContent" class="input-default-icon" @submit="submit" @updateInput="updateInput" :canEmoji="true" :value="content" />
            </div>

            <footer class="upload-img-modal__footer">
                <BtnDefault type="button" @click.stop="close">Annuler</BtnDefault>
                <BtnDefault type="submit" class="btn-default--green upload-img-modal__btn" @click.prevent="submit">
                    Valider
                </BtnDefault>
            </footer>                    
        </div>
    </div>
</template>

<script>
import FormPost from "@/components/FormPost.vue";
import BtnDefault from "@/components/btn/btnDefault.vue"
import { mapActions, mapState, mapGetters } from 'vuex';



export default {
    components: { FormPost, BtnDefault  },
    data() {
        return{
            input : null
        }
    },
    computed: {
        ...mapState('imagePostModule',['listFile','content','channelId']),
        ...mapState('inputPostChannelModule',['textarea']),
        ...mapGetters('sidebarModule',['getChannelById']),
    },
    watch : {
        listFile(){
            if(this.listFile){
                this.handleImage(this.listFile[0]);
                this.updateInput(this.content)
            }
        }
    },
    methods: {
        ...mapActions('imagePostModule', ['close']),
        ...mapActions('postModule', ['addPost']),
        submit() {
            this.addPost({
                content : this.input,
                file : this.listFile[0],
                channelId : this.channelId,
                postId : null,
            })
            this.textarea.innerHTML="";
            this.close();
        },
        handleImage(file){
            try{
                const imageType = /^image\//;
                if (!imageType.test(file.type)) throw "Ce n'est pas une image";
                
                const reader = new FileReader();
                reader.onload = e => this.$refs['IMG'].src = e.target.result;
                
                reader.onloadend = () => this.adjusImagePosition();
                reader.readAsDataURL(file);
            }
            catch(e){
                console.log(e)
            }
        },
        adjusImagePosition(){
            const img = this.$refs['IMG'];
            img.setAttribute('style',`margin-top : ${img.width*-50/100}px`)
        },
        updateInput(content){
            this.input = content;
        }
    },



};
</script>

<style lang="scss">

    .preview{
        background: white;
        max-width: 120px;
        border-radius: 4px;
        max-height: 120px;
        margin: 0 0 20px 0;
    }

    .input-default-icon {
        border: 1px solid $grey-18;
        background-color : $grey-25;
        transition : box-shadow 0.2s, border 0.2s;
        
        .form-post__field{
            color : white;
            &:before{
                color : $grey-127;                
            }
        }

        &:focus {
            border: 1px solid $green;
            box-shadow: 0 0 1px lighten($green,15%), inset 0 0 1px darken($green,15%) ;
        }       
    }

    .upload-img-modal {
        position: absolute;
        left: 50%;
        top: 50%;
        color : white;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        background-color: $grey-32;
        width: 600px;

        @include setMediaScreen(tablette){
            width: 80%;
        }

        @include setMediaScreen(mobile){
            width: 90%;
        }

        &__close-btn{
            padding : 15px;
            color : grey;
            position : absolute;
            right : 0;
            top : 0;
            transition : transform 0.1s;
            transform : rotate(0deg);
            &:hover{
                transform : rotate(90deg);
                color : lighten(grey, 8%)
            }
        }

        &__main {
            padding: 34px 18px 0 18px;
        }

        &__header {
           padding: 20px 20px 0 20px;
        }

        &__main {
            color: $grey-215;
            padding: 18px;
        }

        &__file-name {
            @include setCircularStdFont("Black");
            margin: 0 0 6px 0;
            font-size: 19px;
            word-break: break-all;
        }

        &__channel {
            font-size: 12px;
            color: white;
            margin: 0;
            word-break: break-all;

            span {
                color : $grey-193;
                @include setCircularStdFont("Bold");
            }

        }

        &__label {
            @include setCircularStdFont("Bold");
            color : white;
            display: block;
            margin: 10px 0;
            font-size: 12px;
            span{
               color : $grey-142;
            }
             
        }

        &__btn {
            margin-left: 20px;
        }

        &__footer {
            background-color: $grey-25;
            padding: 18px;
            text-align: right;
            border-radius : 0 0 8px 8px;
        }
    }

</style>

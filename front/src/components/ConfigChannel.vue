<template>
    <div class="container l-config" v-if="visible">
        <main class="main">
            <div class="left-side left-side--grey-25">

                <div class="sidebar config-sidebar">
                    <div class="config-sidebar__content" >

                        <div class="config-sidebar__group">
                            <span class="config-sidebar__group-title">
                                <svg height="12px" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                    ></path>
                                </svg>
                                {{ activeChannel.name }}
                            </span>
                            <span class="config-sidebar__group-categorie">
                                Channel
                            </span>                            
                        </div>

                        <ul class="config-sidebar__list">
                            <li class="config-sidebar__list-item">
                                <router-link to="" class="link-btn link-btn--active">Vue d'ensemble</router-link>
                            </li>
                        </ul>

                        <hr>

                        <div class="link-btn link-btn--danger" @click.stop="remove">
                            Supprimer le channel
                        </div>
                    </div>
                </div>

            </div>
            <div class="right-side right-side--grey-32">
                <div class="l-config__main">
                    
                    <button class="l-config__close-btn" @click="CLOSE_CONFIG">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </button>

                    <span class="tag-content">CHANNEL</span>
                    <h2 class="l-config__title">Configuration du Channel</h2>
                    
                    <form class="form-channel"  action="" @mousedown.stop>

                            <label class="create-panel__label" for="name">NOM DU CHANNEL</label>
                            <InputDefaultIcon
                                :type="'text'"
                                :id="'name'"
                                :name="''"
                                :placeholder="'nouveau channel'"
                                :label="'NOM DU CHANNEL'"
                                :focus="true"
                                v-model="name"
                                ref="InputDefaultIcon"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                    ></path>
                                </svg>
                            </InputDefaultIcon>

                            <label class="create-panel__label" for="name">DESCRIPTION DU CHANNEL</label>
                            <textarea name="" id=""  rows="10" class="input-default input-default--colorA" v-model="description" placeholder="Apprend à tous le monde comment utiliser ce channel !"></textarea>
                            <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" @click.prevent="modify({name,description})" >Valider</BtnDefault>

                    </form> 
                </div>
                
            </div>
        </main>
    </div>
</template>

<script>

import InputDefaultIcon from "@/components/field/inputDefaultIcon.vue";
import BtnDefault from "@/components/btn/btnDefault.vue";
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    data() {
        return { 
            name : null,
            description : null
        }
    },
    computed : {
        ...mapState('configChannelModule',['visible','activeChannel'])
    },
    watch : {
        activeChannel(){
            this.name = this.activeChannel.name;
            this.description = this.activeChannel.description;            
        }
    },
    methods: {
        ...mapMutations('configChannelModule',['OPEN','CLOSE_CONFIG']),
        ...mapActions('configChannelModule',['modify', 'remove']),
    },
    components : { InputDefaultIcon, BtnDefault },

}

</script>

<style lang="scss">
    .l-config{
        position: absolute;
        z-index: 5;
        width: 100%;
        &__main{
            position: relative;
            max-width : 800px;
            padding : 100px 0 0 30px;
        }

        &__close-btn{
            position : absolute;
            right : -56px;
            @include setCircle(36px);
            border : 2px solid grey;
            @include setFlexCenter();

            &:hover{
                background-color : rgba(white,0.1);
            }
        }

        &__title{
            color: white;
            font-size: 48px;
            @include setCircularStdFont("Black");
            letter-spacing: -2.7px;
            margin: 4px 0 30px 0;
        }

    }
    .config-sidebar{
        padding : 80px 10px 0 10px !important;

        &__content{
            padding : 31px 0;
            width : 100%;            
        }

        &__group{
            color : $grey-166;
            font-size : 12px;
            padding : 0 0 10px 0;
        }

        &__group-title{
            @include setCircularStdFont('Black');
            text-transform: uppercase;
        }

        hr{
            border : 1px solid $grey-32;
        }

    }

    .form-channel{
        &__submit{
            margin-left: auto;
            display: block;
        }

        input, textarea{
            margin-bottom : 40px;
        }
    }

    .link-btn{
        padding : 8px 10px;
        border-radius : 4px;
        color : $grey-166;
        width : 100%;
        display : block;
        cursor : pointer;

        &:hover, &--active{
            color : white !important;
            text-decoration: none;
            background-color : $grey-32;
        }
        &:visited{
            color : $grey-166;
        }

        &--danger{
            color : $danger;
            &:hover{
                color : white;
                background-color : $danger;
            }
            &:visited{
                color : $danger;
            }
        }





    }
</style>

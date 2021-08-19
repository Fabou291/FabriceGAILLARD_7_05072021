<template>
    <div class="container l-config" v-if="configDisplay.visible">
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
                                {{ user.username }}
                            </span>
                            <span class="config-sidebar__group-categorie">
                                Profil
                            </span>                            
                        </div>

                        <ul class="config-sidebar__list">
                            <li class="config-sidebar__list-item">
                                <a href="#" class="link-btn" :class="{ 'link-btn--active' : activeZone == 0 }" @click.prevent="changeZone(0)">Mon compte</a>
                            </li>
                            <li class="config-sidebar__list-item">
                                <a href="#" class="link-btn" :class="{ 'link-btn--active' : activeZone == 1 }" @click.prevent="changeZone(1)">Utilisateur</a>
                            </li>
                            <li class="config-sidebar__list-item">
                                <a href="#" class="link-btn" :class="{ 'link-btn--active' : activeZone == 2 }" @click.prevent="changeZone(2)">Adresse e-mail</a>
                            </li>
                            <li class="config-sidebar__list-item">
                                <a href="#" class="link-btn" :class="{ 'link-btn--active' : activeZone == 3 }" @click.prevent="changeZone(3)">Mot de passe</a>
                            </li>
                        </ul>

                        <hr>

                        <div class="link-btn link-btn--danger" >
                            Supprimer le compte
                        </div>
                    </div>
                </div>

            </div>

            <div class="right-side right-side--grey-32">
                <div class="l-config__main">

                    <span class="tag-content">PROFIL</span>

                    <section v-if="activeZone == 0">
                        <h2 class="channel__title">Mon compte</h2>
                        <div class="user-card">
                            <div class="user-card__top"></div>
                            <div class="user-card__main">

                                <div class="user-card__avatar btn-change-avatar">

                                    <button type="button" class="btn-change-avatar__preview">
                                        <span class="btn-change-avatar__showcase">Modifier l'avatar</span>
                                        <img class="btn-change-avatar__thumb" :src="require(`@/assets/${user.avatar}`)" alt="avatar de l'utilisateur">                                        
                                    </button> 
                                    <button class="btn-change-avatar__action"></button>

                                </div>

                                <div class="user-card__section-container">
                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">NOM DE L'UTILISATEUR</div>
                                            {{ user.username }}
                                        </div>
                                        <BtnDefault type="button" class="card-section__btn btn-default--green btn-default--sm create-panel__btn" @click="changeZone(1)" >Modifier</BtnDefault>                                    
                                    </div>                                    

                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">ADRESSE E-MAIL</div>
                                            *********@*********
                                        </div>
                                        <BtnDefault type="button" class="card-section__btn btn-default--green btn-default--sm create-panel__btn" @click="changeZone(2)" >Modifier</BtnDefault>                                    
                                    </div>                                    

                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">MOT DE PASSE</div>
                                            ********************
                                        </div>
                                        <BtnDefault type="button" class="card-section__btn btn-default--green btn-default--sm create-panel__btn" @click="changeZone(3)" >Modifier</BtnDefault>                                    
                                    </div>                                    
                                </div>



                            </div>
                        </div>
                    </section>

                    <section v-if="activeZone == 1">
                        <h2 class="channel__title">Utilisateur</h2>
                        
                        <form class="form-channel"  action="" >
                            <label class="create-panel__label" for="name">NOM D'UTILISATEUR</label>
                            <input type="text" name="name" id="name" class="input-default input-default--colorA" v-model="userInputs.name" placeholder="Votre nom d'utilisateur"/>

                            <label class="create-panel__label" for="description">MA DESCRIPTION</label>
                            <textarea name="description" id="description" rows="10" class="input-default input-default--colorA" v-model="userInputs.description" placeholder="Dites à tous le monde qui vous êtes !"></textarea>
                            <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" >Valider</BtnDefault>
                        </form>
                    </section>

                    <section v-if="activeZone == 2">
                        <h2 class="channel__title">Adresse e-mail</h2>
                        <form class="form-channel"  action="" >
                            <label class="create-panel__label" for="oldMail">ANCIENNE ADRESSE E-MAIL</label>
                            <input type="password" name="oldMail" class="input-default input-default--colorA" v-model="mailInputs.old" placeholder="Indiquez votre ancien mot de passe"/>

                            <label class="create-panel__label" for="newMail">NOUVELLE ADRESSE E-MAIL</label>
                            <input type="password" name="newMail" class="input-default input-default--colorA" v-model="mailInputs.new" placeholder="Indiquez votre nouveau mot de passe"/>

                            <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" >Valider</BtnDefault>
                        </form>
                    </section>

                    <section v-if="activeZone == 3">
                        <h2 class="channel__title">Mot de passe</h2>
                        <form class="form-channel"  action="" >
                            <label class="create-panel__label" for="oldPassword">ANCIEN MOT DE PASSE</label>
                            <input type="password" name="oldPassword" class="input-default input-default--colorA" v-model="mailInputs.old" placeholder="Indiquez votre ancien mot de passe"/>

                            <label class="create-panel__label" for="newPassword">NOUVEAU MOT DE PASSE</label>
                            <input type="password" name="newPassword" class="input-default input-default--colorA" v-model="mailInputs.new" placeholder="Indiquez votre nouveau mot de passe"/>

                            <label class="create-panel__label" for="confirmPassword">CONFIRMEZ VOTRE NOUVEAU MOT DE PASSE</label>
                            <input type="password" name="confirmPassword" class="input-default input-default--colorA" v-model="passwordInputs.confirmation" placeholder="Confirmez votre nouveau mot de passe"/>

                            <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" >Valider</BtnDefault>
                        </form>
                    </section>

                </div>
                
            </div>
        </main>
    </div>
</template>

<script>
import BtnDefault from "@/components/btn/btnDefault.vue";
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return { 
            activeZone : 0,
            passwordInputs : {
                old : null,
                new : null,
                confirmation : null
            },
            mailInputs : {
                old : null,
                new : null,
            },
            userInputs : {
                avatar : null,
                name : null,
                description : null
            },

        }
    },
    computed : {
        ...mapGetters('userModule',['user']),
        ...mapState('userModule',['configDisplay']),
    },
    methods: {
        changeZone(index){
            this.activeZone = index;
        }
    },
    components : { BtnDefault },

}

</script>

<style lang="scss">
    .user-card{
        border-radius: 8px;
        position : relative;
        overflow: hidden;

        &__top{
            background-color: $grey-47;
            height : 60px;
            width: 100%;
        }

        &__main{
            padding : 64px 20px 20px 20px; 
            background-color: $grey-25;
        }

        &__avatar{
            position : absolute;
            left : 12px;
            top : 9px;
        }

        &__section-container{
            border-radius : 4px;
            background-color : $grey-47;
            padding : 20px;
        }

    }

    .card-section{
        display : flex;
        font-size : 13px;

        &:not(:last-child){
            margin : 0 0 20px 0;
        }

        &__entitled {
            @include setCircularStdFont('Bold');
            color : $grey-193;
            margin : 0 0 3px 0;
        }

        &__btn{
            margin-left: auto;
            width : 100px;
        }


    }

    .btn-change-avatar{
        padding : 7px;
        background-color : $grey-25;
        @include setCircle(89px);

        &__preview{
            position : relative;
            border-radius : 100px;
            overflow : hidden;
            @include setSizeFullContainer();
  
            &:hover .btn-change-avatar__showcase{
                @include setFlexCenter();
            }            
        }

        &__thumb{
            left: 0;
            top : 0;
            position : absolute;
            @include setSizeFullContainer();
        }

        &__showcase{
            position : absolute;
            display : none;
            left: 0;
            top : 0;
            @include setSizeFullContainer();
            z-index : 1;
            background-color : rgba(0,0,0,0.7);
        }

        &__action{
            @include setCircle(28px);
            @include setFlexCenter();
            background-color : $grey-215;
            position : absolute;
            right : 5px;
            top : 5px;
            z-index: 2;
            &:hover{
                background-color : darken($grey-215,10%);
            }
        }
    }

</style>

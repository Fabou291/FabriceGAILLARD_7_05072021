<template>
    <div class="container-full l-config" v-if="configDisplay.visible">
        <div class="scroll-y">
            <div class="container">
                <div class="sidebar config-sidebar" :class="{ 'sidebar--active': sidebar.visible }" @click="switchSidebarVisibility">
                    <div class="sidebar__container config-sidebar__container" @click.stop="">
                        <button class="l-config__close-btn list-close-btn" @click="switchSidebarVisibility">
                            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                                ></path>
                            </svg>
                        </button>

                        <div class="sidebar__content config-sidebar__content">
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
                                <li class="config-sidebar__list-item" @click="switchSidebarVisibility">
                                    <a
                                        href="#"
                                        class="link-btn"
                                        :class="{ 'link-btn--active': activeZone == 0 }"
                                        @click.prevent="changeZone(0)"
                                        >Mon compte</a
                                    >
                                </li>
                                <li class="config-sidebar__list-item" @click="switchSidebarVisibility">
                                    <a
                                        href="#"
                                        class="link-btn"
                                        :class="{ 'link-btn--active': activeZone == 1 }"
                                        @click.prevent="changeZone(1)"
                                        >Utilisateur</a
                                    >
                                </li>
                                <li class="config-sidebar__list-item" @click="switchSidebarVisibility">
                                    <a
                                        href="#"
                                        class="link-btn"
                                        :class="{ 'link-btn--active': activeZone == 2 }"
                                        @click.prevent="changeZone(2)"
                                        >Adresse e-mail</a
                                    >
                                </li>
                                <li class="config-sidebar__list-item" @click="switchSidebarVisibility">
                                    <a
                                        href="#"
                                        class="link-btn"
                                        :class="{ 'link-btn--active': activeZone == 3 }"
                                        @click.prevent="changeZone(3)"
                                        >Mot de passe</a
                                    >
                                </li>
                            </ul>


                            <hr />

                            <div class="link-btn link-btn--info" @click="logout">
                                Déconnexion
                            </div>

                            <hr />

                            <div class="link-btn link-btn--danger" @click="remove">
                                Supprimer le compte
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main l-config__main">
                    <button class="l-config__show-list-btn" @click="switchSidebarVisibility">
                        <svg
                            class="show-list-btn__icon"
                            :class="{ 'show-list-btn__icon--visible': sidebar.visible }"
                            height="18"
                            width="18"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="m5.41667 4.2625 5.66573 5.7375-5.66573 5.7375 1.74426 1.7625 7.42237-7.5-7.42237-7.5z"
                                fill="currentcolor"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <button type="button" class="l-config__close-btn" @click="shutDownConfigDisplay">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                            ></path>
                        </svg>
                    </button>

                    <span class="tag-content">PROFIL</span>

                    <section v-if="activeZone == 0">
                        <h2 class="l-config__title">Mon compte</h2>
                        <div class="user-card">
                            <div class="user-card__top"></div>
                            <div class="user-card__main">
                                <div class="user-card__avatar btn-change-avatar">
                                    <form action="" class="form-avatar">
                                        <input type="file" ref="inputFile" name="avatar" id="" @change="setListFile" />
                                    </form>

                                    <button type="button" class="btn-change-avatar__preview" @click="browse">
                                        <span class="btn-change-avatar__showcase">Changer l'avatar</span>
                                        <img
                                            class="btn-change-avatar__thumb"
                                            :src="`http://localhost:3000/images/${user.avatar}`"
                                            alt="avatar de l'utilisateur"
                                        />
                                    </button>
                                    <button class="btn-change-avatar__action" @click="browse"></button>
                                </div>

                                <div class="user-card__section-container">
                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">NOM DE L'UTILISATEUR</div>
                                            {{ user.username }}
                                        </div>
                                        <button type="button"
                                            class="btn-default card-section__btn btn-default--green btn-default--sm create-panel__btn"
                                            @click="changeZone(1)"
                                        >
                                            <span class="card-section__btn-text-content"> Modifier </span>
                                            <span class="card-section__btn-icon-content">
                                                <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" >
                                                    <path
                                                        d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">ADRESSE E-MAIL</div>
                                            *********@*********
                                        </div>
                                        <button type="button"
                                            class="btn-default card-section__btn btn-default--green btn-default--sm create-panel__btn"
                                            @click="changeZone(2)"
                                        >
                                            <span class="card-section__btn-text-content"> Modifier </span>
                                            <span class="card-section__btn-icon-content">
                                                <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" >
                                                    <path
                                                        d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div class="card-section">
                                        <div>
                                            <div class="card-section__entitled">MOT DE PASSE</div>
                                            ********************
                                        </div>
                                        <button type="button"
                                            class="btn-default card-section__btn btn-default--green btn-default--sm create-panel__btn"
                                            @click="changeZone(3)"
                                        >
                                            <span class="card-section__btn-text-content"> Modifier </span>
                                            <span class="card-section__btn-icon-content">
                                                <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" >
                                                    <path
                                                        d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section v-if="activeZone == 1">
                        <h2 class="l-config__title">Utilisateur</h2>
                        <ModifyUserForm />
                    </section>

                    <section v-if="activeZone == 2">
                        <h2 class="l-config__title">Adresse e-mail</h2>
                        <ResetMailForm />
                    </section>

                    <section v-if="activeZone == 3">
                        <h2 class="l-config__title">Mot de passe</h2>
                        <ResetPasswordForm />
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from "vuex";

import ModifyUserForm from "@/components/form/configProfil/ModifyUserForm.vue";
import ResetMailForm from "@/components/form/configProfil/ResetMailForm.vue";
import ResetPasswordForm from "@/components/form/configProfil/ResetPasswordForm.vue";

export default {
    data() {
        return {
            activeZone: 0,
            listFile: null,
            sidebar : {
                visible : false
            }
        };
    },
    watch: {
        listFile() {
            if (this.listFile) this.modifyAvatar();
        },
    },
    computed: {
        ...mapGetters("userModule", ["user"]),
        ...mapState("userModule", ["configDisplay"]),
    },
    methods: {
        ...mapActions("userModule", ["shutDownConfigDisplay", "remove", "modify"]),
        changeZone(index) {
            this.activeZone = index;
        },
        browse() {
            this.$refs["inputFile"].click();
        },
        modifyAvatar() {
            const file = this.listFile[0];
            this.resetInputFile();

            this.modify({
                file,
                username: this.user.username,
                description: this.user.description,
            });
        },
        resetInputFile() {
            this.$refs["inputFile"].value = "";
            this.$refs["inputFile"].files = null;
        },
        setListFile() {
            this.listFile = this.$refs["inputFile"].files;
        },
        switchSidebarVisibility(){
            this.sidebar.visible = !this.sidebar.visible;
        },
        logout(){
            window.localStorage.removeItem('accessToken');
            this.$router.push({ name : 'Login' })
            this.shutDownConfigDisplay()
        }
    },
    components: {  ModifyUserForm, ResetMailForm, ResetPasswordForm },
};
</script>

<style lang="scss">
.user-card {
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    display: block;

    &__top {
        background-color: $grey-47;
        height: 60px;
        width: 100%;
    }

    &__main {
        padding: 64px 20px 20px 20px;
        background-color: $grey-25;
    }

    &__avatar {
        position: absolute;
        left: 12px;
        top: 9px;
    }

    &__section-container {
        border-radius: 4px;
        background-color: $grey-47;
        padding: 20px;
    }
}

.card-section {
    display: flex;
    font-size: 13px;

    &:not(:last-child) {
        margin: 0 0 20px 0;
    }

    &__entitled {
        @include setCircularStdFont("Bold");
        @include textEllipsis();
        color: $grey-193;
        margin: 0 0 3px 0;
    }

    &__btn {
        margin-left: auto;
        width: 100px;

        &-text-content{
            display : block;
        }

        &-icon-content{
            display : none;
        }

        @include setMediaScreen(mobile) {
            width: auto;
            &-text-content{
                display : none;
            }
            &-icon-content{
                display : block;
            }
        }
    }
}

.btn-change-avatar {
    padding: 7px;
    background-color: $grey-25;
    @include setCircle(89px);

    &__preview {
        position: relative;
        border-radius: 100px;
        overflow: hidden;
        @include setSizeFullContainer();

        &:hover .btn-change-avatar__showcase {
            @include setFlexCenter();
        }
    }

    &__thumb {
        left: 0;
        top: 0;
        position: absolute;
        @include setSizeFullContainer();
    }

    &__showcase {
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        @include setSizeFullContainer();
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.7);
    }

    &__action {
        @include setCircle(28px);
        @include setFlexCenter();
        background-color: $grey-215;
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 2;
        &:hover {
            background-color: darken($grey-215, 10%);
        }
    }
}

.form-avatar {
    display: none;
}
</style>

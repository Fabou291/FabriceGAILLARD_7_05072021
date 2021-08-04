<template>
    <div class="authentication">
        <div class="panel-authentication">
            <div class="panel-authentication__header">
                <svg class="panel-authentication__logo" xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100">
                    <path
                        fill="currentColor"
                        d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"
                    ></path>
                </svg>
            </div>
            <div class="panel-authentication__main">
                <section class="authentication-section" v-if="switchPanel">
                    <h1 class="authentication-section__title">Inscrivez-vous pour dialoguer en convialité, blablabla.</h1>
                    <form class="form-authentication" action="">
                        <div>
                            <input type="text" name="username" placeholder="Pseudonyme" v-model="subscribtion.username" />
                            <input type="email" name="email" placeholder="Adresse e-mail" v-model="subscribtion.email" />
                            <input type="password" name="password" placeholder="Mot de passe" v-model="subscribtion.password" />
                            <input
                                type="password"
                                name="password-confirm"
                                placeholder="Confirmation mot de passe"
                                v-model="subscribtion.passwordConfirm"
                            />
                        </div>
                        <button class="form-authentication__btn" type="submit">Continuer</button>
                    </form>
                    <div class="panel-authentication__switch">
                        <div>Vous avez déja un compte ?</div>
                        <ButtonSwitchPanel :innerHTML="'CONNECTEZ-VOUS'" @switchPanel="updateSwitchPanel" />
                    </div>
                </section>

                <section class="authentication-section" v-if="!switchPanel">
                    <h1 class="authentication-section__title">Connectez vous et profitez d'un espace libre</h1>
                    <form class="form-authentication" :class="{ 'was-validated' : wasValidated }" action="" ref="loginForm">
                        <div>
                            <InputFeedBack>
                                <template #input>
                                    <input type="email" name="email" placeholder="Addresse email" required="true" v-model="login.email" />
                                </template>
                                <template #invalid>
                                   <p>L'adresse renseignée n'est pas valide. adresseEmailExemple@domaine.fr</p>
                                </template>
                            </InputFeedBack>
                            <InputFeedBack>
                                <template #input>
                                    <input type="password" name="password" placeholder="Mot de passe" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$"  required="true" v-model="login.password" />
                                </template>
                                <template #invalid>
                                   <p>Le mot de passe que vous avez renseigné ne correspond pas aux critères requis</p>
                                    <ul>
                                        <li>Il doit comporter au moins 8 caractères</li>
                                        <li>
                                            Il doit comporter au moins :
                                            <ul>
                                                <li>1 caractère alphabétique</li>
                                                <li>1 caractère numérique</li>
                                                <li>1 caractère spéciale</li>
                                            </ul>
                                        </li>
                                        <li>Les espaces vides sont interdits</li>
                                    </ul>
                                </template>
                            </InputFeedBack>
                        </div>
                        <button class="form-authentication__btn" type="submit" @click.prevent="postLogin">Continuer</button>
                    </form>
                    <div class="panel-authentication__switch">
                        <div>Pas encore de compte ?</div>
                        <ButtonSwitchPanel :innerHTML="'INSCRIVEZ-VOUS'" @switchPanel="updateSwitchPanel" />
                    </div>
                </section>
            </div>


        </div>
    </div>
</template>

<script>

import InputFeedBack from "@/components/form/InputFeedback.vue"
import LoginSection from "@/components/authentication/LoginSection.vue"




import { mapActions } from 'vuex';
export default {
    components: {
        InputFeedBack
    },
    data() {
        return {
            switchPanel: false,
            subscribtion: {
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
            },
            login: {
                email: "",
                password: "",
            },
            wasValidated : false
        };
    },
    methods: {
        ...mapActions('userModule',['fetchLogin']),
        
        

        updateSwitchPanel() {
            this.switchPanel = !this.switchPanel;
        },
        postLogin() {
            //set la classe permettant d'afficher se qui ne va pas
            this.wasValidated = true;
            
            if (!this.$refs["loginForm"].checkValidity()) return;
            

            this.fetchLogin({ email: this.login.email, password: this.login.password })
        },
        postSubscribe() {
            //set la classe permettant d'afficher se qui ne va pas
            this.wasValidated = true;
            
            if (!this.$refs["loginForm"].checkValidity()) return;
            

            this.fetchLogin({ email: this.login.email, password: this.login.password })
        },
    },
};
</script>

<style lang="scss">
.authentication {
    width: 100%;
    height: 100%;
}
.panel-authentication {
    background-color: $grey-18;
    border-radius: 7px;
    max-width: 530px;
    padding: 0 80px 20px 80px;

    margin: 40px auto;

    &__header {
        padding: 39px 0 34px 0;
        text-align: center;
    }

    &__logo {
        width: 60px;
        height: 60px;
    }

    &__main {
    }

    &__switch {
        margin: 30px 0 0 0;
        padding: 40px 0;
        border-top: 1px solid #404243;
        font-size: 14px;
        letter-spacing: 2px;
        text-align: center;

        @include setCircularStdFont("Bold");
        div {
            color: #acaca9;
        }
    }
}




</style>

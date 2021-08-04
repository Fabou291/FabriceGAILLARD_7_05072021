<template>
    <section class="form-auth login-form">
        <h1 class="form-auth__title">
            Connectez-vous <br> pour continuer.
        </h1>
        <form :class="{ 'was-validated' : wasValidated }" action="" ref="formLogin">
            <div>
                <InputFeedBack class="form-auth__input" :isValid="null" >
                    <template #input>
                        <InputIcon >
                            <input type="email" name="email" placeholder="Addresse email" required="true" v-model="email" @input="isValid" />
                            <template #icon>
                                <svg width="24" height="24" viewBox="0 0 122.88 85.57">
                                    <path fill="currentcolor" d="M3.8,0,62.48,47.85,118.65,0ZM0,80.52,41.8,38.61,0,4.53v76ZM46.41,42.37,3.31,85.57h115.9L78,42.37,64.44,53.94h0a3,3,0,0,1-3.78.05L46.41,42.37Zm36.12-3.84,40.35,42.33V4.16L82.53,38.53Z"/>
                                </svg> 
                            </template>
                        </InputIcon>
                    </template>
                    <template #invalid>
                        <p>L'adresse renseignée n'est pas valide. adresseEmailExemple@domaine.fr</p>
                    </template>
                </InputFeedBack>
                <InputFeedBack class="form-auth__input">
                    <template #input> <InputPassword v-model="password" /> </template>
                    <template #icon></template>
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
                <div class="form-auth__input">
                    <a href="#"  >Réinitialiser le mot de passe</a>
                </div>                   
                <SwitchCheckbox login-form class="form-auth__input" id="rememberMe" name="rememberMe" :value="false" @checkSwitch="switchRemember" >Se souvenir de moi</SwitchCheckbox>
            </div>
            <RoundedBtn class="form-auth__submit-btn" type="submit" @click.prevent="post">Continuer</RoundedBtn>
        </form>        
    </section>
</template>

<script>
    import InputFeedBack from "@/components/form/InputFeedback.vue";
    import InputIcon from "@/components/form/InputIcon.vue";
    import InputPassword from "@/components/form/InputPassword.vue";
    import SwitchCheckbox from "@/components/form/SwitchCheckbox.vue";
    import RoundedBtn from "@/components/btn/RoundedBtn.vue";
    import { mapActions } from 'vuex';
    export default {
        components :{
            InputFeedBack, SwitchCheckbox, InputIcon, InputPassword, RoundedBtn
        },
        data() {
            return {
                email: "",
                password: "",
                remember : false,
                wasValidated : false
            }
        },
        methods: {
            ...mapActions('userModule',['fetchLogin']),
            switchRemember(){
                this.remember = !this.remember;
            },
            post() {
                //set la classe permettant d'afficher se qui ne va pas
                this.wasValidated = true;

                console.log(this.password)
                
                if (!this.$refs["formLogin"].checkValidity()) return;

                this.fetchLogin({ email: this.email, password: this.password })
            },
        },

    }
</script>

<style lang="scss">
    .form-auth {
        font-size : 14px;
        color : darken($grey-166,10%);

        a{
            color : darken($grey-166,10%);
            text-decoration: underline;
        }

        &__title {
            color : white;
            text-align : center;
            font-size : 2em;
            margin : 0 0 20px 0;
        }


        &__input{
            input {
                background-color: $grey-59;
                color: white;
                display: block;
                width: 100%;
                padding: 13px 8px;

                &::placeholder {
                    color: $grey-166;
                }

                &:focus,
                &:hover {
                    background-color: lighten($color: $grey-59, $amount: 2%);
                }
            }

            &:not(:first-child) {
                margin: 17px 0 0 0;
            }
            &:first-child {
                margin: 0;
            }
        }


        &__submit-btn{
            margin : 20px 0;
            @include setCircularStdFont("Black");
            background-color: white;
            color : black;
            text-transform: uppercase;
            letter-spacing: 2.6px;
            padding: 17px;
            border-radius: 100px;
            width: 100%;
            
            &:hover{
                transform : scale(1.1)
            }            
        }

    }

</style>
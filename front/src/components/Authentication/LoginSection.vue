<template>
    <DefaultModal title="Connectez-vous et profitez d'un espace libre">
        <template #title>Connectez-vous <br> pour continuer.</template>
        <template #content>
            <form class="form-authentication" :class="{ 'was-validated' : wasValidated }" action="" ref="loginForm">
                <div>
                    <InputFeedBack>
                        <template #input>
                            <input type="email" name="email" placeholder="Addresse email" required="true" v-model="email" />
                        </template>
                        <template #invalid>
                            <p>L'adresse renseignée n'est pas valide. adresseEmailExemple@domaine.fr</p>
                        </template>
                    </InputFeedBack>
                    <InputFeedBack>
                        <template #input>
                            <input type="password" name="password" placeholder="Mot de passe" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$"  required="true" v-model="password" />
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
                <RoundedBtn class="form-auth__submit-btn rounded-btn--success" type="submit" @click.prevent="submit">Continuer</RoundedBtn>
            </form>
        </template>
    </DefaultModal>
</template>

<script>
    import DefaultModal from "@/components/authentication/DefaultModal.vue";
    import InputFeedBack from "@/components/form/InputFeedback.vue"
    export default {
        data() {
            return {
                email: null,
                password: null,
            }
        },
        components : {

            DefaultModal, 
            InputFeedBack
        },
        methods : {
            post(){
                console.log('post')
            }
        }
    }
</script>

<style lang="scss">
    .form-authentication {
        font-size: 13px;
        input {
            background-color: $grey-59;
            color: white;
            display: block;
            width: 100%;
            padding: 13px 8px;

            &::placeholder {
                color: $grey-166;
            }

            &:not(:last-child) {
                margin: 0 0 17px 0;
            }
            &:last-child {
                margin: 0 0 30px 0;
            }

            &:focus,
            &:hover {
                background-color: lighten($color: $grey-59, $amount: 2%);
            }
        }

        button {
            @include setCircularStdFont("Black");
            background-color: #1db954;
            text-transform: uppercase;
            letter-spacing: 2.6px;
            padding: 17px;
            border-radius: 100px;
            width: 100%;
        }
    }
</style>
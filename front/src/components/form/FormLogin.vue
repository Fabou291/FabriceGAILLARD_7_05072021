<template>
    <FormAuthentication>
        <template #title>
            Connectez-vous <br />
            pour continuer.
        </template>
        <template #content>
            <div>
                <InputEmail class="form-auth__input" v-model="email"/>

                <InputPassword class="form-auth__input"  v-model="password" />

                <div class="form-auth__input"><a href="#">Réinitialiser le mot de passe</a></div>

                <CheckboxSwitch
                    login-form
                    class="form-auth__input"
                    id="rememberMe"
                    name="rememberMe"
                    :value="remember"
                    @checkSwitch="switchRemember"
                    >
                    Se souvenir de moi
                </CheckboxSwitch>
            </div>
            <BtnRounded class="form-auth__submit-btn" type="submit" @click.prevent="post">Continuer</BtnRounded>
        </template>
    </FormAuthentication>
</template>

<script>
import FormAuthentication from "@/components/authentication/FormAuthentication.vue";
import InputPassword from "@/components/form/input/InputPassword.vue";
import InputEmail from "@/components/form/input/InputEmail.vue";
import CheckboxSwitch from "@/components/form/input/CheckboxSwitch.vue";
import BtnRounded from "@/components/btn/BtnRounded.vue";
import { mapActions } from "vuex";

export default {
    components: {
        CheckboxSwitch,
        InputPassword,
        InputEmail,
        BtnRounded,
        FormAuthentication,
    },
    data() {
        return {
            email:  "",
            password: "",
            remember: false
        };
    },
    methods: {
        ...mapActions("userModule", ["fetchLogin"]),
        switchRemember() {
            this.remember = !this.remember;
        },
        setInSessionStorage(){
            const authentication = window.sessionStorage.getItem('authentication') ? JSON.parse(window.sessionStorage.getItem('authentication')) : {};
            window.sessionStorage.setItem('authentication', 
                JSON.stringify( { 
                    ...authentication,
                    email : this.email, 
                    remember : this.remember
                } )
            )
        },
        hydratefromStorage(){
            if(!window.sessionStorage.getItem('authentication')) return;
            const authentication = JSON.parse(window.sessionStorage.getItem('authentication'));
            this.email = authentication.email;
            this.remember = authentication.remember;
        },
        post() {
            this.setInSessionStorage();
            if (!document.querySelector(".form-auth form").reportValidity()) return;

            this.fetchLogin({ email: this.email, password: this.password });
        },
    },
    created(){
        this.hydratefromStorage();
    }
};
</script>

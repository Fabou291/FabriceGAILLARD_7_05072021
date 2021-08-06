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

                <SwitchCheckbox
                    login-form
                    class="form-auth__input"
                    id="rememberMe"
                    name="rememberMe"
                    :value="remember"
                    @checkSwitch="switchRemember"
                    >
                    Se souvenir de moi
                </SwitchCheckbox>
            </div>
            <RoundedBtn class="form-auth__submit-btn" type="submit" @click.prevent="post">Continuer</RoundedBtn>
        </template>
    </FormAuthentication>
</template>

<script>
import FormAuthentication from "@/components/authentication/FormAuthentication.vue";
import InputPassword from "@/components/form/InputPassword.vue";
import InputEmail from "@/components/form/InputEmail.vue";
import SwitchCheckbox from "@/components/form/SwitchCheckbox.vue";
import RoundedBtn from "@/components/btn/RoundedBtn.vue";
import { mapActions } from "vuex";

export default {
    components: {
        SwitchCheckbox,
        InputPassword,
        InputEmail,
        RoundedBtn,
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

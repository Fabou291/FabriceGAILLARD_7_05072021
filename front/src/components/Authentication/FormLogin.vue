<template>
    <FormAuthentication >
        <template #title>
            Connectez-vous <br> pour continuer.
        </template>
        <template #content >
            <div >
                <InputIcon class="form-auth__input">
                    <input type="email" name="email" placeholder="Addresse email" required="true" v-model="email.value" ref="email" />
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 122.88 85.57">
                            <path fill="currentcolor" d="M3.8,0,62.48,47.85,118.65,0ZM0,80.52,41.8,38.61,0,4.53v76ZM46.41,42.37,3.31,85.57h115.9L78,42.37,64.44,53.94h0a3,3,0,0,1-3.78.05L46.41,42.37Zm36.12-3.84,40.35,42.33V4.16L82.53,38.53Z"/>
                        </svg> 
                    </template>
                </InputIcon>                  
        
                <InputPassword class="form-auth__input" :invalidMessage="password.invalidMessage" v-model="password.value" />

                    
                <div class="form-auth__input"> <a href="#">Réinitialiser le mot de passe</a> </div>
                <SwitchCheckbox login-form class="form-auth__input" id="rememberMe" name="rememberMe" :value="false" @checkSwitch="switchRemember" >Se souvenir de moi</SwitchCheckbox>
            </div>
            <RoundedBtn class="form-auth__submit-btn" type="submit" @click.prevent="post" >Continuer</RoundedBtn>
        </template>
    </FormAuthentication>
</template>

<script>
    import FormAuthentication from "@/components/authentication/FormAuthentication.vue"
    import InputIcon from "@/components/form/InputIcon.vue";
    import InputPassword from "@/components/form/InputPassword.vue";
    import SwitchCheckbox from "@/components/form/SwitchCheckbox.vue";
    import RoundedBtn from "@/components/btn/RoundedBtn.vue";
    import { mapActions } from 'vuex';
    export default {
        components :{
            SwitchCheckbox, InputIcon, InputPassword, RoundedBtn, FormAuthentication
        },
        data() {
            return {
                email: {
                    value : "",
                    isValid : false,
                },
                password: {
                    value : "",
                    isValid : false,
                    invalidMessage : `
                        Veuillez respecter le format requis : 
                        - 8 Caractères minimum
                        - 1 minuscule minimum,
                        - 1 majuscule minimum, 
                        - 1 chiffre minimum, 
                        - 1 caractère spéciale minimum`
                },
                remember : false,
                submited : false
            }
        },
        methods: {
            ...mapActions('userModule',['fetchLogin']),
            switchRemember(){
                this.remember = !this.remember;
            },
            post() {
                this.submited = true;

                console.log(document.querySelector('.form-auth form').reportValidity())

                if (!document.querySelector('.form-auth form').reportValidity()) return;

                this.fetchLogin({ email: this.email.value, password: this.password.value })
            },
        },


    }
</script>

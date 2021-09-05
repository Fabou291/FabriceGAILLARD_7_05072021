<template>
    <div class="authentication">

       <DefaultModal>
            <template #header>
                <AuthenticationBrand/>
            </template>
            <template #main>
                <FormRegister/>
            </template>
            <template #footer>
                <SuggestionLink to="/login" anchor="CONNECTEZ-VOUS" suggestion="Vous avez déja un compte ?" />
            </template>
       </DefaultModal>

    </div>
</template>

<script>

import DefaultModal from "@/components/authentication/DefaultModal.vue";
import AuthenticationBrand from "@/components/authentication/authenticationBrand.vue";
import SuggestionLink from "@/components/authentication/SuggestionLink.vue";
import FormRegister from "@/components/authentication/FormRegister.vue";





import { mapActions } from 'vuex';
export default {
    components: {
        DefaultModal, AuthenticationBrand, SuggestionLink, FormRegister
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
        };
    },
    methods: {
        ...mapActions('userModule',['fetchLogin']),
        
        

        updateSwitchPanel() {
            this.switchPanel = !this.switchPanel;
        },


    },
};
</script>

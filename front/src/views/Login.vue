<template>
    <div class="authentication">
        <main class="authentication__main">
            <DefaultModal>
                <template #header>
                    <AuthenticationBrand/>
                </template>
                <template #main>
                    <FormLogin/>
                </template>
                <template #footer>
                    <SuggestionLink to="/register" anchor="INSCRIVEZ-VOUS" suggestion="Pas encore de compte ?" />
                </template>
            </DefaultModal>            
        </main>
    </div>
</template>

<script>

import DefaultModal from "@/components/modal/DefaultModal.vue";
import AuthenticationBrand from "@/components/authentication/AuthenticationBrand.vue";
import SuggestionLink from "@/components/authentication/SuggestionLink.vue";
import FormLogin from "@/components/form/FormLogin.vue";





import { mapActions } from 'vuex';
export default {
    components: {
        DefaultModal, AuthenticationBrand, SuggestionLink, FormLogin
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
    },
};
</script>
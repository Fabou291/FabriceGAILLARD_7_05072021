<template>
    <div class="authentication">
        <main class="authentication__main">
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
        </main>
    </div>
</template>

<script>

import DefaultModal from "@/components/modal/DefaultModal.vue";
import AuthenticationBrand from "@/components/authentication/AuthenticationBrand.vue";
import SuggestionLink from "@/components/authentication/SuggestionLink.vue";
import FormRegister from "@/components/form/FormRegister.vue";





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
    },
};
</script>

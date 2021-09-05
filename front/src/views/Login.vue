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

import DefaultModal from "@/components/authentication/DefaultModal.vue";
import AuthenticationBrand from "@/components/authentication/authenticationBrand.vue";
import SuggestionLink from "@/components/authentication/SuggestionLink.vue";
import FormLogin from "@/components/authentication/FormLogin.vue";





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
        
        

        updateSwitchPanel() {
            this.switchPanel = !this.switchPanel;
        },


    },
};
</script>

<style lang="scss">
    .authentication {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        @include setScrollBar($grey-59);
        padding : 10px;

        @include setMediaScreen(mobile){
            padding : 0px;
        }

        &__main{
            flex: 1;
        }
    }
</style>

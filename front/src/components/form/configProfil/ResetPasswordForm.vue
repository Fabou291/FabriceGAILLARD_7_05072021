<template>
    <form class="form-channel" ref="form" >
        <label class="create-panel__label" for="oldPassword">ANCIEN MOT DE PASSE</label>
        <input type="password" name="oldPassword" required ref="oldPassword" @input="setCustomValidity" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$" class="input-default input-default--colorA" v-model="oldPassword" placeholder="Indiquez votre ancien mot de passe"/>

        <label class="create-panel__label" for="password">NOUVEAU MOT DE PASSE</label>
        <input type="password" name="password" required ref="password" @input="setCustomValidity" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$" class="input-default input-default--colorA" v-model="password" placeholder="Indiquez votre nouveau mot de passe"/>

        <label class="create-panel__label" for="confirmPassword">CONFIRMEZ VOTRE NOUVEAU MOT DE PASSE</label>
        <input type="password" name="confirmPassword" required ref="confirmPassword" @input="setCustomValidity" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$" class="input-default input-default--colorA" v-model="confirmationPassword" placeholder="Confirmez votre nouveau mot de passe"/>

        <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" @click.prevent="checkValidity()" >Valider</BtnDefault>
    </form>
</template>

<script>
import BtnDefault from "@/components/btn/BtnDefault.vue";
import {  mapActions, mapState } from 'vuex';
import HTTPRequest from "@/js/HTTPRequest.js"


export default {
    data() {
        return { 
            oldPassword : null,
            password : null,
            confirmationPassword : null
        }
    },
    computed: {
        ...mapState('userModule',['user']),
    },
    methods: {
        ...mapActions('errorModule',['handleError']),
        ...mapActions('flashCardModule',['setFlashCard']),

        /**
         * @name checkValidity
         * @description Véirifie la validité du formulaire
         */
        async checkValidity(){
            try{
                if(!this.$refs['form'].reportValidity()) return;
                await HTTPRequest.put(`user/${this.user.id}/reset-password`, { oldPassword : this.oldPassword, password: this.password, confirmationPassword: this.confirmationPassword })
                this.setFlashCard({
                    message : 'Votre mot de passe à bien été modifié',
                    statu : 'success',
                    flashCardVisible : true
                }) 
            }
            catch(error){
                this.handleError(error)
            }
        },

        /**
         * @name setCustomValidity
         * @description Défini un message pour la validité des champs
         */
        setCustomValidity(){
            [ 'oldPassword', 'confirmPassword', 'password' ].forEach(ref => { 
                let message = `Veuillez respecter le format requis : 
                        - 8 Caractères minimum
                        - 1 minuscule minimum,
                        - 1 majuscule minimum, 
                        - 1 chiffre minimum, 
                        - 1 caractère spéciale minimum`;

                if(!this.$refs[ref].validity.patternMismatch) message = "";
                this.$refs[ref].setCustomValidity(message);
            });
            if(this.password != this.confirmationPassword) this.$refs['confirmPassword'].setCustomValidity('Le mot de passe de confirmation doit être identique à votre nouveau mot de passe');
            if(this.oldPassword == this.password) this.$refs['password'].setCustomValidity('Le nouveau mot de passe doit être différent du mot de passe actuel');        
        }
    },
    mounted(){
        this.$refs['oldPassword'].focus();
    },
    components : { BtnDefault },
}

</script>

<template>
    <form class="form-channel"  action="" ref="form" >
        <label class="create-panel__label" for="oldMail">ANCIENNE ADRESSE E-MAIL</label>
        <input type="email" name="oldMail" ref="oldMail" required="true" @input="setCustomValidity" pattern="^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$" class="input-default input-default--colorA" v-model="oldMail" placeholder="Indiquez votre ancien mot de passe"/>

        <label class="create-panel__label" for="email">NOUVELLE ADRESSE E-MAIL</label>
        <input type="email" name="email" ref="email" @input="setCustomValidity" required="true" pattern="^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$" class="input-default input-default--colorA" v-model="email" placeholder="Indiquez votre nouveau mot de passe"/>

        <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" @click.prevent="checkValidity()" >Valider</BtnDefault>
    </form>
</template>

<script>
import BtnDefault from "@/components/btn/btnDefault.vue";
import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js"
import { mapGetters } from 'vuex';

export default {
    data() {
        return { 
            oldMail : null,
            email : null,
        }
    },
    computed: {
        ...mapGetters('userModule',['user']),
        
    },
    methods: {
        checkValidity(){
            if(!this.$refs['form'].reportValidity()) return;
            this.fetch();
        },
        async fetch(){
            await HTTPRequest.put(`user/${this.user.id}/reset-email`, { oldMail : this.oldMail, email : this.email })
       
        },
        setCustomValidity(){
            ['oldMail','email'].forEach(ref=>{
                let message = "Veuillez indiquer une adresse email valide : contact@exemple.com";
                if(!this.$refs[ref].validity.patternMismatch) message = "";
                this.$refs[ref].setCustomValidity(message);
            });

            if(this.oldMail == this.email) this.$refs['email'].setCustomValidity('La nouvelle adresse doit être différente de l\'ancienne');
        },
    },
    components : { BtnDefault },
}

</script>

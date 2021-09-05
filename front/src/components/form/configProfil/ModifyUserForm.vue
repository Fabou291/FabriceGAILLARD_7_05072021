<template>
    <form class="form-channel"  ref="form" >
        <label class="create-panel__label" for="username">NOM D'UTILISATEUR</label>
        <input type="text" ref="input" name="username" required="true" id="username" class="input-default input-default--colorA" v-model="username" placeholder="Votre nom d'utilisateur"/>

        <label class="create-panel__label" for="description">MA DESCRIPTION</label>
        <textarea name="description" id="description" rows="10" class="input-default input-default--colorA" v-model="description" placeholder="Dites à tous le monde qui vous êtes !"></textarea>
        <BtnDefault type="submit" class="form-channel__submit btn-default--green create-panel__btn" @click.prevent="checkValidity()" >Valider</BtnDefault>
    </form>
</template>

<script>
import BtnDefault from "@/components/btn/btnDefault.vue";
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return { 
            username : null,
            description : null
        }
    },
    computed : {
        ...mapState('userModule',['user']),
    },
    methods: {
        ...mapActions('userModule',['modify']),
        ...mapMutations('userModule',['SET_CONFIG_DISPLAY_VISIBLE']),
        checkValidity(){
            if(!this.$refs['form'].reportValidity()) return;
            this.modify({
               avatar : this.user.avatar,
               username : this.username,
               description : this.description,
            })
            this.SET_CONFIG_DISPLAY_VISIBLE(false);
        }
    },
    created(){
        this.username = this.user.username;
        this.description = this.user.description;
        this.avatar = this.user.avatar;
    },
    mounted(){
        this.$refs['input'].focus();
    },
    components : { BtnDefault },
}

</script>

<template>
    <div class="flash-card" :class=" 'flash-card--' + type" v-if="error != null" >
        <CloseButton @click.prevent="close"/>
        <h2>{{title}}</h2>
        <p>{{ error.error.message }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CloseButton from "../btn/CloseButton.vue";
export default {
    data() {
        return {
            title : "",
            interval : null,
        }
    },
    watch : {
        error : function(){
            this.resetIntervalToClose();
            this.setTimerToClose();
        }
    },
    components : {
        CloseButton
    },
    computed : {
        ...mapState('errorModule', ['error'])
    },
    props : {
        type : { type: String, required: true }
    },
    methods: {
        ...mapActions('errorModule', ['setError']),
        setTitle(){
            let listTitle = {
                error : "Woops!"
            }
            this.title = listTitle[this.type];
        },
        setTimerToClose(){
            this.interval = setInterval(()=>{
                this.close();
            },2000);
        },
        resetIntervalToClose(){
            if(this.interval != null) clearInterval(this.interval)
            this.interval = null;
        },
        close(){
            this.resetIntervalToClose();
            this.setError(null);
        }
    },
    created() {
        this.setTitle();
    },

}
</script>


<style lang="scss">
    .flash-card{
        position : absolute;
        top : 50%;
        left : 50%;
        width : 500px;
        padding : 20px;
        background-color : $grey-32;
        transform : translate(-50%,-50%);
        border-radius: $border-radius;

        &--error{
            color : $danger
        }
    }
</style>
<template>
    <div class="flash-card" :class="`flash-card--${statu}`">
        {{ message }}
        <button class="flash-card__close-btn" type='button' @click.prevent="close" aria-label="Fermer">
            <svg  width="16" height="16" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                ></path>
            </svg>                
        </button>   
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            interval : null
        }
    },
    computed: {
        ...mapActions('flashCardModule',['reset']),
        ...mapState('flashCardModule',['message','statu']),
    },
    methods:{
        setTimerToClose(){
            this.interval = setInterval(()=>{
                this.close();
            },3000);
        },
        resetIntervalToClose(){
            if(this.interval != null){
                clearInterval(this.interval)
            } 
            this.interval = null;
        },
        close(){
            this.resetIntervalToClose();
            this.reset;
        }
    },
    created(){
        this.setTimerToClose();
    }

}
</script>
<style lang="scss">
    @keyframes popFromBelow{
        from{
            visibility: visible;
            transform : translateY(140%);
        }
        to{
            visibility: visible;
            transform : translateY(0%);
        }
    }

    .flash-card {
        position : absolute;
        bottom : 20px;
        left : 20px;
        padding : 15px;
        z-index: 100;
        border-radius: 4px 4px 0 0;
        visibility: hidden;

        transform : translateY(140%);
        animation : popFromBelow 0.5s forwards;

        background-color : $grey-47;
        &--success {
            background-color: darken($success,10);
        }

        &__close-btn {
            padding : 5px;
            margin-left : auto;
        }
    }
</style>
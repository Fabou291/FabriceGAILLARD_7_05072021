<template>
    <div class="headband" v-if="error != null" >
        <div class="headband__container">
            <p class="headband__message">Error : {{ getErrorMessage }}</p>
            <button class="headband__close-btn" type='button' @click.prevent="close">
                <svg  width="16" height="16" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                    ></path>
                </svg>                
            </button>            
        </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
        
    },
    computed : {
        ...mapState('errorModule', ['error']),
        getErrorMessage(){
            return this.error.message;
        }
    },
    props : {
        
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
            },3000);
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
    .headband{
        padding : 5px;
        width : 100%;
        background-color : $danger;


        &__container{
            max-width: 1440px;
            display: flex;
            align-items: center;
            margin: auto;
        }

        &__message {
            margin : 0;
            padding : 0 0 0 10px;
        }

        &__close-btn {
            padding : 5px;
            margin-left : auto;
        }
    }
</style>
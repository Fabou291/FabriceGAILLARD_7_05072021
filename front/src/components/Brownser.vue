<template>
    <div class="action-listing modal" ref="modal">
        <button type="button" class="action" @click.stop="showBrownser">
            <div class="action__explanation">
                <svg height="24px" aria-hidden="false" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"></path>
                </svg>
                Uploader une image
            </div>
            <div class="action__tip">
                Astuce : double cliquer sur
                <svg height="16px" viewBox="0 0 24 24">
                    <path
                        class="attachButtonPlus-jWVFah"
                        fill="currentColor"
                        d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
                    ></path>
                </svg>
            </div>
            <form action="" class="form-brownser" >
                <input type="file" ref="input" accept="image/*" @change="openImagePostDisplay"/>
            </form>          
        </button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            visible : false
        }
    },
    computed: {
        ...mapState('inputPostChannelModule',['content'])
    },
    methods : {
        ...mapActions('imagePostModule',['open']),
        show(){
            this.$refs['modal'].classList.add('show')
        },
        showBrownser(){
            this.$refs['modal'].classList.remove('show')
            this.$refs['input'].click();
        },
        openImagePostDisplay(e){
            this.open({ listFile : e.target.files, content: this.content() })
        }
    }
};
</script>
<style lang="scss">

.action-listing {
    position: absolute;
    border-radius: 4px;
    background-color: $grey-18;
    padding : 8px;
    text-align : left;
}

.action{
    padding : 8px;
    border-radius: 4px;
    &:hover{
        background-color : darken($success,10%);
        color : white;
        .action__tip, .action__explanation{
            color : white;
        }
    }
    &__explanation, &__tip{
            color : $grey-166;
        display : flex;
        align-items: center;
        gap : 8px;
        &:first-child{
            margin-bottom : 8px
        }
    }
    &__tip{
        font-size : 12px;
        color : $grey-89;
    }
}

.form-brownser{
    display : none;
}

</style>

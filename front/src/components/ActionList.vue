<template>
    <div class="action-listing" data-modal ref="modal">
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
            <form class="form-brownser" >
                <input type="file" ref="input" name="form-brownser-file" accept="image/*" @change="openImagePostDisplay"/>
            </form>
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                visible : false
            }
        },
        computed: {
            ...mapState('inputPostChannelModule',['listFile']),
            ...mapGetters('inputPostChannelModule',['getContent'])
        },
        methods : {
            ...mapActions('imagePostModule',['open']),
            ...mapMutations('imagePostModule',['SET_FILE']),
            ...mapMutations('postModule',['SET_ACTION_LIST_VISIBLE']),
            show(){
                this.$refs['input'].files = null;
                this.$refs['input'].value = null;
                this.SET_ACTION_LIST_VISIBLE(true);
            },
            showBrownser(){
                this.SET_ACTION_LIST_VISIBLE(false);
                this.$refs['input'].click();
            },
            openImagePostDisplay(){
                this.open({ listFile : this.$refs['input'].files, content: this.getContent })
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
            background-color : darken($primary,10%);
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

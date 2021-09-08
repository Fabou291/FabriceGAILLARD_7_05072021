<template>
    <nav class="emoji-panel-categorie">
        <ul class="emoji-panel-categorie__list">
            <li class="emoji-panel-categorie__list-item">
                <button class="emoji-panel-categorie__button" type="button" aria-label="Afficher les dernier emoji utilisé">
                    <svg aria-hidden="false" width="24" height="24">
                        <path fill="currentColor"
                            d="M12 2C6.4764 2 2 6.4764 2 12C2 17.5236 6.4764 22 12 22C17.5236 22 22 17.5236 22 12C22 6.4764 17.5236 2 12 2ZM12 5.6C12.4422 5.6 12.8 5.95781 12.8 6.4V11.5376L16.5625 13.7126C16.9453 13.9329 17.0703 14.4173 16.85 14.8001C16.6297 15.183 16.1453 15.3079 15.7625 15.0876L11.6873 12.7376C11.656 12.7251 11.6279 12.7048 11.5998 12.6876C11.3607 12.5486 11.1998 12.2954 11.1998 12.0001V6.4001C11.1998 5.9579 11.5578 5.6 12 5.6Z"
                        ></path>
                    </svg>
                </button>
            </li>

            <hr class="emoji-panel-categorie__delimitation">

            <li class="emoji-panel-categorie__list-item" v-for="(svgPaths, index) in listGroupEmoji" :key="svgPaths">
                <button class="emoji-panel-categorie__button" aria-label="Afficher la catégorie" :class="{ 'emoji-panel-categorie__button--active' : isSelectedGroup(index) }" type="button" @click="scrollToGroup(index)">
                    <svg  aria-hidden="false" width="24" height="24">
                        <path fill="currentColor" v-for="svgPath in svgPaths" :key="svgPath" :d="svgPath"></path>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "EmojiPanelCategorie",
    data: function() {
        return {
            activeElement : 0,
        }
    },
    computed: {
    },
    methods: {

        /**
         * @name scrollToGroup
         * @description emet l'evement scrollToGroup
         */
        scrollToGroup(index){
            this.$emit('scrollToGroup', index);
        },
        
        /**
         * @name isSelectedGroup
         * @description Défini si le groupe est selectionné
         * @param {Number} index
         */
        isSelectedGroup(index){
            return this.activeGroup == index
        },
    },
    props: ["listGroupEmoji", "active-group"],
};
</script>

<style lang="scss">
    .emoji-panel-categorie {
        background-color: $grey-32;
        width: 48px;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
        padding : 8px;
        color: $grey-193;

        &::-webkit-scrollbar {
            width: 0px;
            background-color: transparent;
        }

        &__list-item {
            padding: 0 0 8px 0;
        }

        &__delimitation{
            border : 1px solid $grey-47;
            margin : 0 0 8px 0;
        }

        &__button {
            width: 100%;
            border-radius: 4px;
            height: 32px;
            width: 32px;
            padding: 4px;

            &--active{
                background-color: $grey-47;
            }

            &:hover {
                background-color: $grey-47;
            }
        }
    }
</style>

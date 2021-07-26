<template>
    <nav class="emoji-panel-nav">
        <ul class="emoji-panel-nav__list">
            <li class="emoji-panel-nav__list-item" v-for="button in listButton" :key="button" >
                <button class="btn-nav" :class="{ 'btn-nav--active': button == actived }" @click="active(button)" type="button">{{ button }}</button>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    name: "EmojiPanelNav",
    data: () => {
        return {
            actived : "Emoji",
            listButton: ["GIF", "Emoji"],            
        }
    },
    methods: {
        active : function(button){
            this.actived = button;
            this.$emit('change',button)
        }
    },
    components: {
    },
};
</script>

<style lang="scss">
    .emoji-panel-nav{
        padding: 17px 19px 0 19px;
        &__list{
            display : flex;
            padding : 0 0 9px 0;
            @include setCircularStdFont("Medium");
            font-size: 15px;          
        }
        &__list-item{
            button{
                padding : 5px;
            }
        }
    }

    .btn-nav{

        padding: 6px 9px;
        border-radius: 4px;
        cursor : pointer;

        &:hover{
            color : lighten($grey-193, 20)
        }

        &--active {
            color: white;
            background-color: $grey-89;
        }

    }
</style>

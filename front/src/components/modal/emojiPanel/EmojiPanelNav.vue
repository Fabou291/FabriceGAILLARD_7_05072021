<template>
    <nav class="emoji-panel-nav">
        <ul class="emoji-panel-nav__list">
            <li class="emoji-panel-nav__list-item"  >
                <button class="btn-nav btn-nav--active" :aria-label="`Afficher la section Emoji`" type="button">Emoji</button>
            </li>
        </ul>
    </nav>
</template>


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
        color: $grey-193;
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

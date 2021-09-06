<template>
    <header class="header">
        <nav class="header__nav">

            <button type="button" class="header__nav-item show-list-btn" @click="switchVisibility" aria-label="Afficher la liste des channels">
                <svg class="show-list-btn__icon" :class="{ 'show-list-btn__icon--visible' : visible }" height="18" width="18" viewBox="0 0 20 20" >
                    <path 
                        d="m5.41667 4.2625 5.66573 5.7375-5.66573 5.7375 1.74426 1.7625 7.42237-7.5-7.42237-7.5z"
                        fill="currentcolor"
                        fill-rule="evenodd"
                    />
                </svg>                
            </button>

            <router-link :to="{ name: 'Home' }" class="header__nav-item" title="Accédez à la page d'accueil">
                <img class="header__logo" src="@/assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania" />
            </router-link>

        </nav>
    </header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    computed: {
        ...mapState('sidebarModule',['visible'])
    },
    methods: {
        ...mapActions('sidebarModule',['switchVisibility'])
    },
};
</script>

<style lang="scss">
.header {
    position: fixed;
    width: 100%;
    height: $header-height;
    background-color: $secondary;
    z-index: 6;

    &__nav {
        position: absolute;
        left: 10px;
        display: flex;
        gap : 8px;
    }

    &__nav-item{
        @include setFlexCenter();
        background-color:  darken($secondary,4);
        box-shadow: 0 2px 2px -1px black;
        border-radius: 0 0 9px 9px;
        padding: 9px 17px;

        &:hover{
            background-color: $secondary;
        }

    }

    &__logo {
        width: 110px;
    }
}

.show-list-btn {
    display: none;
    @include setMediaScreen(tablette){
        display: flex;
    }
    &__icon{
        transform: rotate(180deg);
        transition : transform 0.2s;
        &--visible{
            transform: rotate(90deg);
        }
    }
}
</style>

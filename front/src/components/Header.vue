<template>
    <header class="header">
        <nav class="header__nav">
            <router-link to="home/"  >
                <img class="header__logo" src="@/assets/logos/icon-left-font-monochrome-white.svg" alt="logo groupomania">
            </router-link>
        </nav>
    </header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .header {
        position :relative;
        height : 21px;
        background-color : $grey-11;
        
        &__nav{
            position : absolute;
            left : 10px;
            background-color: inherit;
            border-radius: 0 0 9px 9px;
            padding : 9px 17px;
        }
        &__logo{
            width : 110px;
        }
    }
    
    
</style>
<template>
    <button class="rounded-btn">
        <slot></slot>
    </button>
</template>
<style lang="scss">
    .rounded-btn{
        @include setCircularStdFont("Black");
        background-color: white;
        color : black;
        padding: 17px;
        border-radius: 100px;
        text-align : center; 
        &.rounded-btn--success {
            background-color : $success;
            color : white;          
        }
    }
</style>
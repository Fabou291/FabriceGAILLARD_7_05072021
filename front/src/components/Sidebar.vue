<template>
    <div class="sidebar">
        <div class="sidebar__content">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
    .sidebar{
        background-color : $grey-21;
        height : 100%;
        width : 25%;
        overflow: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding : 30px 0 0 0;

        @include setScrollBar(transparent);

        &:hover::-webkit-scrollbar-thumb {
            background-color: $grey-32;
        }




        &__content{
            width: 223px;
        }
    }
</style>

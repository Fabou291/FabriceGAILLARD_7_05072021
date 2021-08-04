<template>
    <div class="modal-default">
        <div class="modal-default__header">
            <slot name="header"></slot>
        </div>
        <div class="modal-default__main">
            <slot name="main"></slot>
        </div>
        <div class="modal-default__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    .modal-default {
        background-color: $grey-18;
        border-radius: 7px;
        max-width: 494px;
        padding: 60px 80px;

        margin: 40px auto;

        a{
            color : white;
        }

        &__header {
            padding: 0px 0 34px 0;
            text-align: center;

        }

        &__footer{
            margin: 30px 0 0 0;
            padding: 40px 0 0 0;
            border-top: 1px solid #404243;  
            text-align: center;         
        }
    }
</style>
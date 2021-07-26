<template>
    <button class="btn-default"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style lang="scss">
    .btn-default {
        font-size: 13px;
        @include setCircularStdFont("Bold");
        padding: 15px;
        border-radius: $border-radius;

        &--green {
            background-color: $green;
            &:hover{
                background-color: lighten($green, 3%);

                text-decoration: none !important;
            }
        }

        &:hover{
            text-decoration: underline;
        }
    }
</style>

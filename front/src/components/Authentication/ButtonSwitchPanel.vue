<template>
    <button type="button" class="btn-switch-panel" @click.prevent="switchPanel">
        <slot></slot>
    </button>
</template>

<script>
export default {

    methods : {
        switchPanel(){
            this.$emit('switchPanel');
        }
    }
}
</script>

<style lang="scss">
    .btn-switch-panel{
        letter-spacing : inherit;
        margin : 5px 0 0 0;
        padding : 5px;
        &:hover{
            text-decoration: underline
        }
    }
</style>
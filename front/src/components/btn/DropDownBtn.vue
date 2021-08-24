<template>
    <button class="drop-down-btn" aria-expanded="true" >
        <span class="drop-down-btn__icon">
            <DropDownIcon :visible="visible" />            
        </span>

        <span class="drop-down-btn__content">
            <slot></slot>
        </span>
    </button>
</template>
<script>
    import DropDownIcon from "@/components/DropDownIcon.vue";
    export default {
        components : { DropDownIcon },
        props : { 
            visible : { type : Boolean, required : true}
        }
    }
</script>
<style lang="scss">
    .drop-down-btn {
        padding: 9px 0;
        width: 100%;
        text-align: left;
        display: inline-flex;
        align-items: center;
        overflow: hidden;

        &__content{
            @include textEllipsis();
        }

        &__icon{
            padding : 0 5px 0 0;
        }

    }
</style>
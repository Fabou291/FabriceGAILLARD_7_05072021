<template>
    <svg viewBox="0 0 24 24" class="dropdown-icon" :class="{ 'dropdown-icon--active' : visible }">
        <path
            fill="currentColor"
            d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
        ></path>
    </svg>
</template>

<script>
export default {
    props : {
        visible : { type : Boolean, required : true }
    }
}
</script>

<style lang="scss">
    .dropdown-icon {
        height : 16px;
        transform: rotate(-90deg);
        transition: 0.1s transform;
        &--active {
            transform: rotate(0deg);
        }
    }
</style>
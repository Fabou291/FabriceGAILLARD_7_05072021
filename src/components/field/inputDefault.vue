<template>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-default"
    />
</template>

<script>
export default {
    props: {
        modelValue: { type: String, required: true },
    },
};
</script>

<style lang="scss">
.input-default {
    display: block;
    width: 100%;
    padding: 13px;
    border-radius: $border-radius;
    transition: box-shadow 0.2s, border 0.2s;

    &--colorA {
        background-color: $grey-25;
        border: 1px solid $grey-21;
        &:focus {
            border: 1px solid $green;
            box-shadow: 0 0 1px lighten($green, 15%), inset 0 0 1px darken($green, 15%);
        }

        &:hover{
            border: 1px solid $grey-18;
        }
    }
}
</style>

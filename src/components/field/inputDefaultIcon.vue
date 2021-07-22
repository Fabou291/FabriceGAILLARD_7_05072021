<template>
    <div class="input-default-zone" :class="{ 'input-default-zone--active' : modelValue != '' }">
        <div class="input-default-zone__icon">
            <slot ></slot>            
        </div>
        <input class="input-default input-default-zone__input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :name="name" :id="id" :aria-label="label" :placeholder="placeholder"/>

    
    </div>
</template>

<script>
    export default {

        components : {
        },
        props : {
            placeholder : { type : String, required : true},
            label : { type : String },
            type : { type : String, required : true },
            id : { type : String, required : true },
            name : { type : String, required : true },
            modelValue : { type : String, required : true  }
        }
    }
</script>

<style lang="scss">
    .input-default {
        display : block;
        width : 100%;
        padding : 13px; 
        border: 1px solid $grey-21;
        border-radius : $border-radius;
        background-color : $grey-25;
        transition : box-shadow 0.2s, border 0.2s;

        &:focus {
            border: 1px solid $green;
            box-shadow: 0 0 1px lighten($green,15%), inset 0 0 1px darken($green,15%) ;
        }       
    }
    .input-default-zone{
        position: relative;
        color : grey;
        &__input{
            padding-left : 40px;
            
        }

        &__icon{
            position : absolute;
            top : 50%;
            left : 10px;
            transform: translateY(-50%);
        }

        &--active{
            color : $grey-215;

        }
    }
</style>
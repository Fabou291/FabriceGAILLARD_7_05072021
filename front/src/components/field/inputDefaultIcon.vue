<template>
    <div class="input-default-icon-zone" :class="{ 'input-default-icon-zone--active' : modelValue != '' }">
        <div class="input-default-icon-zone__icon">
            <slot ></slot>            
        </div>
        <input ref="input" class="input-default-icon input-default-icon-zone__input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :name="name" :id="id" :aria-label="label" :placeholder="placeholder"/>
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
            modelValue : { required : true  },
            focus : {type : Boolean, default : false}
        },
        methods : {
            focusInput(){
                this.$refs['input'].focus();
            }
        },
        mounted(){
            if(this.focus) this.focusInput();
        }
    }
</script>

<style lang="scss">
    .input-default-icon {
        display : block;
        width : 100%;
        border: 1px solid $grey-18;
        border-radius : $border-radius;
        background-color : $grey-25;
        transition : box-shadow 0.2s, border 0.2s;

        &:focus {
            border: 1px solid $green;
            box-shadow: 0 0 1px lighten($green,15%), inset 0 0 1px darken($green,15%) ;
        }       
    }
    .input-default-icon-zone{
        position: relative;
        color : grey;
        &__input{
            padding : 13px 0 13px 40px
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
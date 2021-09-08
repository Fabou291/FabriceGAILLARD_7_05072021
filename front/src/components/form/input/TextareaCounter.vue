<template >
    <div class="textarea-counter">
        <textarea class="textarea-counter__textarea"  :rows="rows" :id="id" :name="name" :placeholder="placeholder"  :class="className" :maxlength="maxLength" :value="modelValue" @input="this.$emit('update:modelValue', $event.target.value)" >
        </textarea> 
        <span class="textarea-counter__counter"> {{ maxLength - lengthCharacter }} </span>       
    </div>

</template>
<script>
export default {
    props : {
        maxLength : { type : Number, required : true },
        modelValue : { required : true },
        className : { type : String, default : "" },
        rows : { type : Number, required : true },
        name : { type : String, required : true },
        id : { type : String, required : true },
        placeholder : { type : String, required : true },
    },
    computed: {
        
        /**
         * @name lengthCharacter
         * @description Calcul le nombre de caractère du textarea
         */
        lengthCharacter(){
            return this.modelValue ? this.modelValue.length : 0
        }
    }
}
</script>
<style lang="scss">
    .textarea-counter{
        position : relative;

        &__counter{
            position : absolute;
            right : 10px;
            bottom : 10px;
            color : $primary;
        }
    }
</style>
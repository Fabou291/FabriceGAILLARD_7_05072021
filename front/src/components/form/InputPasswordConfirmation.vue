<template>
    <InputPasswordStructure
        :name="name"
        :placeholder="placeholder"
        v-model="value"
        @input="$emit('update:modelValue',$event.target.value); areSamePassword($event)"
    />
</template>

<script>
import InputPasswordStructure from "./InputPasswordStructure.vue";

export default {
    data() {
        return {
            value : null
        };
    },
    props: {
        name: { type: String, default : "password" },
        placeholder: { type: String, default: "Mot de passe" },
        inputCorrespondanceValue : { type : String, required : true },
        modelValue : { type: String, required : true }
    },
    components: {
        InputPasswordStructure,
    },
    created() {
        this.value = this.modelValue;
    },
    methods: {
        areSamePassword($event){
            const el = $event.target;

            let message = 'Les mots de passe doivent être identique.';
            if( this.inputCorrespondanceValue  == el.value ) message = '';

            el.setCustomValidity(message);
        }
    },
};
</script>


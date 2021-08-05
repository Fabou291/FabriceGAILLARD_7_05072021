<template>
    <InputPasswordStructure
        :name="name"
        :placeholder="placeholder"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$"
        @input="checkValidity"
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
    },
    components: {
        InputPasswordStructure,
    },
    created() {
        this.value = this.modelValue;
    },
    methods: {
        checkValidity($event) {
            const el = $event.target;
            let message = '';
            if(el.validity.patternMismatch) 
                message = `Veuillez respecter le format requis : 
                        - 8 Caractères minimum
                        - 1 minuscule minimum,
                        - 1 majuscule minimum, 
                        - 1 chiffre minimum, 
                        - 1 caractère spéciale minimum`;
                        
            el.setCustomValidity(message)
        },
    },
};
</script>
<template>
    <InputIcon>
        <input
            type="email"
            name="email"
            pattern="^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$"
            placeholder="Addresse email"
            required="true"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value); checkValidity($event)"
        />
        <template #icon>
            <svg width="24" height="24" viewBox="0 0 122.88 85.57">
                <path
                    fill="currentcolor"
                    d="M3.8,0,62.48,47.85,118.65,0ZM0,80.52,41.8,38.61,0,4.53v76ZM46.41,42.37,3.31,85.57h115.9L78,42.37,64.44,53.94h0a3,3,0,0,1-3.78.05L46.41,42.37Zm36.12-3.84,40.35,42.33V4.16L82.53,38.53Z"
                />
            </svg>
        </template>
    </InputIcon>
</template>
<script>
import InputIcon from "@/components/form/InputIcon.vue";
export default {
    components: {
        InputIcon,
    },
    props : {
        modelValue : { type : String, required : true }
    },
    methods: {
        checkValidity($event) {
            const el = $event.target;
            let message = "";
            if (el.validity.patternMismatch) message = "Veuillez indiquer une adresse email valide : contact@exemple.com";

            el.setCustomValidity(message);
        },
    },
};
</script>

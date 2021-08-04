<template>
    <InputIcon class="input-password">
        <input
            :type="visible ? 'text' : 'password'"
            name="password"
            :placeholder="placeholder"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$"
            required="true"
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
            ref="input"
        />


        <template #icon>
            <div class="input-password__icon" @click="switchVisibility">
                <svg width="24" height="24" viewBox="0 0 24 24" v-if="!visible">
                    <path
                        fill="currentcolor"
                        d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"
                    />
                </svg>
                <!--<svg width="24" height="24" viewBox="0 0 24 24" v-if="visible">
                    <path fill="currentcolor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                </svg>-->
                <svg width="24" height="24" viewBox="0 0 24 24" v-if="visible">
                    <path
                        fill="currentcolor"
                        d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z"
                    />
                </svg>
            </div>
        </template>
    </InputIcon>
</template>

<script>
import InputIcon from "./InputIcon.vue";
export default {
    data() {
        return {
            visible: false,
        };
    },
    props:{
        modelValue : { type : String, required : true },
        placeholder : { type : String, default :  "Mot de passe"},
        invalidMessage : { type : String, default : "" }
    },
    components: {
        InputIcon,
    },
    methods: {
        switchVisibility() {
            this.visible = !this.visible;
        },
    },
    mounted() {
        console.log('eeeee')
        this.$refs['input'].setCustomValidity(this.invalidMessage);
    },
};
</script>

<style lang="scss">
.input-password {
    &__icon {
        user-select: none;
        pointer-events: auto;
    }
}
</style>

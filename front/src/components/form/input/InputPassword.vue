<template>
    <InputIcon class="input-password">
        <input
            ref="input"
            :type="visible ? 'text' : 'password'"
            :name="name"
            :placeholder="placeholder"
            required="true"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$"
            @input="checkValidityPattern($event); this.$emit('update:modelValue', $event.target.value);"
        />
        <template #icon>
            <div class="input-password__icon" @click="switchVisibility">
                <svg width="24" height="24" viewBox="0 0 24 24" v-if="!visible">
                    <path
                        fill="currentcolor"
                        d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"
                    />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" v-if="visible">
                    <path fill="currentcolor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                </svg>
            </div>
        </template>
    </InputIcon>
</template>

<script>
import InputIcon from "@/components/form/input/InputIcon.vue";
    export default {
        data() {
            return {
                value : null,
                visible : false
            };
        },
        props: {
            name: { type: String, default : "password" },
            placeholder: { type: String, default: "Mot de passe" },
        },
        components: {
            InputIcon,
        },
        created() {
            this.value = this.modelValue;
        },
        methods: {

            /**
             * @name switchVisibility
             * @description Switch la visibilité du contenu du champs
             */
            switchVisibility() {
                this.visible = !this.visible;
            },

            /**
             * @name checkValidityPattern
             * @description Vérifie la validité et défini un message particulier en cas d'echec
             */
            checkValidityPattern($event) {
                const el = $event.target;
                let message = '';
                if(el.validity.patternMismatch) 
                    message = `Veuillez respecter le format requis : 
                            - 8 Caractères minimum
                            - 1 minuscule minimum,
                            - 1 majuscule minimum, 
                            - 1 chiffre minimum, 
                            - 1 caractère spéciale minimum`;
                            
                this.setCustomValidity(message);
            },

            /**
             * @name setCustomValidity
             * @description  Défini un message pour la validation du formulaire
             */
            setCustomValidity(message){
                this.$refs['input'].setCustomValidity(message)
            }
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
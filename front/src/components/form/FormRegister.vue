<template>
    <FormAuthentication>
        <template #title>
            Inscrivez-vous <br />
            et venez discuter.
        </template>
        <template #content>
            <div>
                <InputEmail class="form-auth__input" v-model="email"  />

                <InputIcon class="form-auth__input">
                    <input
                        type="text"
                        name="username"
                        placeholder="Comment doit-on vous appeler ?"
                        required="true"
                        v-model="username"
                    />
                    <template #icon>
                        <svg height="20px" viewBox="0 0 1280.000000 1231.000000">
                            <g transform="translate(0.000000,1231.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path
                                    fill="currentcolor"
                                    d="M6190 12306 c-3 -2 -77 -12 -165 -21 -1161 -119 -2171 -691 -2854 -1615 -391 -529 -658 -1184 -745 -1830 -92 -682 -8 -1386 240 -2014 305 -769 812 -1399 1502 -1866 69 -47 126 -89 125 -95 0 -5 -20 -15 -44 -22 -759 -201 -1203 -363 -1714 -624 -660 -336 -1211 -752 -1629 -1229 -370 -422 -627 -878 -771 -1365 -95 -322 -157 -820 -126 -1018 6 -40 18 -178 26 -307 9 -129 18 -250 21 -267 l5 -33 6339 0 c3487 0 6340 1 6341 3 8 29 53 670 53 767 1 147 -23 380 -55 548 -221 1165 -1109 2207 -2474 2901 -492 251 -1076 466 -1628 601 -126 31 -140 37 -132 50 3 5 45 35 93 66 907 591 1549 1556 1746 2627 50 271 61 400 60 737 0 348 -14 497 -74 792 -251 1226 -1047 2253 -2170 2803 -432 211 -855 332 -1370 391 -138 16 -589 31 -600 20z"
                                />
                            </g>
                        </svg>
                    </template>
                </InputIcon>

                <InputPassword
                    ref="password"
                    class="form-auth__input"
                    placeholder="Saisissez un mot de passe."
                    v-model="password"
                />

                <InputPassword
                    ref="passwordConfirmation"
                    class="form-auth__input"
                    placeholder="Saisissez le même mot de passe."
                    v-model="passwordConfirmation"
                    @input="setCustomValidity"
                />


                <CheckboxSwitch
                    class="form-auth__input"
                    id="rememberMe"
                    name="rememberMe"
                    :value="remember"
                    @checkSwitch="switchRemember"
                    >Se souvenir de moi</CheckboxSwitch
                >
            </div>
            <BtnRounded class="form-auth__submit-btn rounded-btn--success" type="submit" @click.prevent="submit">Continuer</BtnRounded>
        </template>
    </FormAuthentication>
</template>

<script>
import FormAuthentication from "@/components/authentication/FormAuthentication.vue";
import InputEmail from "@/components/form/input/InputEmail.vue";
import InputIcon from "@/components/form/input/InputIcon.vue";
import InputPassword from "@/components/form/input/InputPassword.vue";
import CheckboxSwitch from "@/components/form/input/CheckboxSwitch.vue";
import BtnRounded from "@/components/btn/BtnRounded.vue";
import { mapActions } from "vuex";
export default {
    components: {
        FormAuthentication,
        CheckboxSwitch,
        InputIcon,
        InputPassword,
        BtnRounded,
        InputEmail,
    },
    data() {
        return {
            email: "",
            username: "",
            password: "",
            passwordConfirmation: "",
            remember: false,
        };
    },
    watch : {
        password() {
            this.setCustomValidity();
        }
    },
    methods: {
        ...mapActions("userModule", ["register"]),

        /**
         * @name areSamePassword
         * @description Détermine les password sont identique
         */
        areSamePassword(){
            return this.password  == this.passwordConfirmation
        },

        /**
         * @name setCustomValidity
         * @description Met en place un nouveau message pour la validité du formulaire
         */
        setCustomValidity(){
            const message = this.areSamePassword()
            ? ''
            : 'Les mots de passe doivent être identique.'
            this.$refs['passwordConfirmation'].setCustomValidity(message);
        },

        /**
         * @name switchRemember
         * @description Switch de la valeur de remember 
         * (La fonctionnalité permettant de retenir l'utilisateur ou non pour ses prochaine connexion n'est pas encore
         * implémentée)
         */
        switchRemember() {
            this.remember = !this.remember;
        },

        /**
         * @name setInSessionStorage
         * @description Ajoute les informations du formulaire dans le sessionStorage 
         * pour éviter de retapper systématiquement ses informations
         */
        setInSessionStorage() {
            const authentication = window.sessionStorage.getItem("authentication")
                ? JSON.parse(window.sessionStorage.getItem("authentication"))
                : {};
            window.sessionStorage.setItem(
                "authentication",
                JSON.stringify({
                    ...authentication,
                    email: this.email,
                    username: this.username,
                    remember: this.remember,
                })
            );
        },

        /**
         * @name hydratefromStorage
         * @description Rempli les variable à partir des infos récoltées dans le sessionStorage
         */
        hydratefromStorage() {
            if (!window.sessionStorage.getItem("authentication")) return;
            const authentication = JSON.parse(window.sessionStorage.getItem("authentication"));
            this.email = authentication.email;
            this.username = authentication.username;
            this.remember = authentication.remember;
        },
        
        /**
         * @name submit
         * @description Envoie du formulaire, après vérifications
         */
        submit() {
            this.setInSessionStorage();
            if (!document.querySelector(".form-auth form").reportValidity()) return;
            const avatarDefaultSet = ['A','B','C','D','E','F','G','H'];
            const getRandomInt = max => Math.floor(Math.random() * max);
            
            this.register(
                { 
                    email: this.email, 
                    password: this.password,
                    username: this.username,
                    avatar : `http://localhost:3000/images/avatarDefaultSet/${ avatarDefaultSet[getRandomInt(avatarDefaultSet.length)] }.svg`
                }
            );
        },
    },
    created(){
        this.hydratefromStorage();
    }
};
</script>

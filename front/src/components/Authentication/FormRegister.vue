<template>
    <FormAuthentication>
        <template #title>
            Inscrivez-vous <br> et venez discuter.
        </template>
        <template #content>
            <div>

                <InputIcon class="form-auth__input">
                    <input type="email" name="email" placeholder="Addresse email" required="true" v-model="email.value" @input="isValidInput($event,email)" />
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 122.88 85.57">
                            <path fill="currentcolor" d="M3.8,0,62.48,47.85,118.65,0ZM0,80.52,41.8,38.61,0,4.53v76ZM46.41,42.37,3.31,85.57h115.9L78,42.37,64.44,53.94h0a3,3,0,0,1-3.78.05L46.41,42.37Zm36.12-3.84,40.35,42.33V4.16L82.53,38.53Z"/>
                        </svg> 
                    </template>
                </InputIcon>
                <p v-if="submited && !email.isValid">L'adresse e-mail n'est pas valide.</p>

                <InputIcon class="form-auth__input">
                    <input type="text" name="username" placeholder="Comment doit-on vous appeler ?" required="true" v-model="username.value" @input="isValidInput($event,username)" />
                    <template #icon>
                        <svg height="20px" viewBox="0 0 1280.000000 1231.000000" >
                            <g transform="translate(0.000000,1231.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path fill="currentcolor" d="M6190 12306 c-3 -2 -77 -12 -165 -21 -1161 -119 -2171 -691 -2854 -1615 -391 -529 -658 -1184 -745 -1830 -92 -682 -8 -1386 240 -2014 305 -769 812 -1399 1502 -1866 69 -47 126 -89 125 -95 0 -5 -20 -15 -44 -22 -759 -201 -1203 -363 -1714 -624 -660 -336 -1211 -752 -1629 -1229 -370 -422 -627 -878 -771 -1365 -95 -322 -157 -820 -126 -1018 6 -40 18 -178 26 -307 9 -129 18 -250 21 -267 l5 -33 6339 0 c3487 0 6340 1 6341 3 8 29 53 670 53 767 1 147 -23 380 -55 548 -221 1165 -1109 2207 -2474 2901 -492 251 -1076 466 -1628 601 -126 31 -140 37 -132 50 3 5 45 35 93 66 907 591 1549 1556 1746 2627 50 271 61 400 60 737 0 348 -14 497 -74 792 -251 1226 -1047 2253 -2170 2803 -432 211 -855 332 -1370 391 -138 16 -589 31 -600 20z"/>
                            </g>
                        </svg> 
                    </template>
                </InputIcon>
                <p v-if="submited && !username.isValid">Le username doit comporter au moins, etc etc</p>

                <InputPassword v-model="password.value" class="form-auth__input" placeholder="Créez un mot de passe" @input="isValidInput($event,password)" />
                <div v-if="submited && !password.isValid">
                    <p>Le mot de passe que vous avez renseigné ne correspond pas aux critères requis</p>
                    <ul>
                        <li>Il doit comporter au moins 8 caractères</li>
                        <li>
                            Il doit comporter au moins :
                            <ul>
                                <li>1 caractère alphabétique</li>
                                <li>1 caractère numérique</li>
                                <li>1 caractère spéciale</li>
                            </ul>
                        </li>
                        <li>Les espaces vides sont interdits</li>
                    </ul>
                </div>

                <InputPassword v-model="passwordConfirmation.value" class="form-auth__input" placeholder="Saisissez à nouveau votre mot de passe" @input="isSamePassword()" />
                <p v-if="submited && !passwordConfirmation.isValid">Il doit être identique au mot de passe précedent</p>

                <SwitchCheckbox class="form-auth__input" id="rememberMe" name="rememberMe" :value="false" @checkSwitch="switchRemember" >Se souvenir de moi</SwitchCheckbox>
            </div>
            <RoundedBtn class="form-auth__submit-btn rounded-btn--success" type="submit" @click.prevent="post">Continuer</RoundedBtn>
        </template>
    </FormAuthentication>    
</template>

<script>
    import FormAuthentication from "@/components/authentication/FormAuthentication.vue"
    import InputIcon from "@/components/form/InputIcon.vue";
    import InputPassword from "@/components/form/InputPassword.vue";
    import SwitchCheckbox from "@/components/form/SwitchCheckbox.vue";
    import RoundedBtn from "@/components/btn/RoundedBtn.vue";
    import { mapActions } from 'vuex';
    export default {
        components :{
            FormAuthentication, SwitchCheckbox, InputIcon, InputPassword, RoundedBtn
        },
        data() {
            return {
                email: {
                    value : '',
                    isValid : false
                },
                username: {
                    value : '',
                    isValid : false
                },
                password: {
                    value : '',
                    isValid : false
                },
                passwordConfirmation: {
                    value : '',
                    isValid : false
                },
                remember : false,
                submited : false
            }
        },
        methods: {
            ...mapActions('userModule',['fetchLogin']),
            switchRemember(){
                this.remember = !this.remember;
            },
            post() {
                this.submited = true;

                console.log(this.password)
                
                if (!document.querySelector('.form-auth form').checkValidity()) return;


                this.fetchLogin({ email: this.email, password: this.password })
            },
            isValidInput($event, element){
                element.isValid = $event.target.checkValidity()
            },
            isSamePassword(){
                this.passwordConfirmation.isValid = this.password.value == this.passwordConfirmation.value;
            },
            d(){
                console.log('submited')
            }
        },

    }
</script>
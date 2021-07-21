<template>
    <div class="authentication">
      <div class="panel-authentication">
          <div class="panel-authentication__header">
              <svg class="panel-authentication__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                  <g
                      id="640fb903-7c97-3a8b-d0a7-369102908d0a"
                      fill="currentColor"

                      stroke="none"
                      transform="matrix(0.8499999999999999,0,0,0.8499999999999999,22.500006484985377,22.50005836486818)"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100">
                          <switch>
                              <g>
                                  <path
                                      d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"
                                  ></path>
                              </g>
                          </switch>
                      </svg>
                  </g>
              </svg>
          </div>
          <div class="panel-authentication__main">
              <div class="panel-subscribtion">
                  <h1 class="panel-authentication-subscribtion__title">Inscrivez-vous pour dialoguer en convialité, blablabla.</h1>
                  <form class="form-subscribtion" action="">
                      <div>
                        <input type="text" name="pseudonyme" placeholder="Pseudonyme" />
                        <input type="email" name="email" placeholder="Adresse e-mail" />
                        <input type="password" name="password" placeholder="Mot de passe" />
                        <input type="password" name="password-confirm" placeholder="Confirmation mot de passe" />
                      </div>
                      <button class="panel-authentication-btn" type="submit">Continuer</button>
                  </form>
                  
                  <div class="panel-authentication__switch">
                    <span class="" >Vous avez déja un compte ?</span>
                    <button class="btn-switch-panel">CONNECTEZ-VOUS</button>                      
                  </div>

              </div>

              <div class="panel-authentication__subscribtion">
                  <h1 class=""></h1>
              </div>
          </div>
      </div>      
    </div>

</template>

<script>
export default {};
</script>

<style lang="scss">
.authentication{
    width : 100%;
    height : 100%;
}
.panel-authentication {
    background-color: $grey-18;
    border-radius: 7px;
    max-width: 530px;
    padding : 0 80px 20px 80px;

    margin : 40px auto;

    &__header { 
      padding : 39px 0 34px 0;
      text-align : center;
    }

    &__logo {
        width: 60px;
        height: 60px;
    }

    &__main {
    }

    &__switch {
        margin : 30px 0 0 0;
        padding : 40px 0;
        border-top : 1px solid #404243;
        font-size : 14px;
        letter-spacing : 2px;
        text-align : center;
        
        @include setCircularStdFont('Bold');
        span {
            color : #ACACA9;
        }
    }
}

.form-subscribtion{
  font-size : 13px;
  input {
    background-color : $grey-59;
    color : white;
    display: block;
    width: 100%;
    padding : 13px 8px;
    
    &::placeholder{
        color : $grey-166;
    }

    &:not(:last-child){
        margin : 0 0 17px 0;        
    }
    &:last-child{
        margin : 0 0 30px 0;
    }


    &:focus, &:hover{
      background-color : lighten($color: $grey-59, $amount: 2%);
    }

  }
}

.panel-authentication-subscribtion {
  &__title{
    @include setCircularStdFont('Black');
    font-size : 30px;
    line-height : 40px;
    letter-spacing: -0.5px;
    text-align : center;
    margin : 0 0 43px;
  }
}

.btn-switch-panel{
    letter-spacing : inherit;
    margin : 5px 0 0 0;
    padding : 5px;
    &:hover{
        text-decoration: underline
    }
}

.panel-authentication-btn {
    @include setCircularStdFont('Black');
    background-color: #1DB954;
    text-transform: uppercase;
    letter-spacing: 2.6px;
    padding : 17px;
    border-radius: 100px;
    width : 100%;
}
</style>

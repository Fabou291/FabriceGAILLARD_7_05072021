<template>
    <section class="form-auth">
        <h1 class="form-auth__title">
            <slot name="title"></slot>
        </h1>
        <form>
            <slot name="content"></slot>
        </form>        
    </section>
</template>

<script>

</script>

<style lang="scss">
    .form-auth {
        font-size : 14px;
        color : darken($grey-166,10%);

        a{
            color : darken($grey-166,10%);
            text-decoration: underline;
        }

        &__title {
            color : white;
            text-align : center;
            font-size : 2em;
            margin : 0 0 20px 0;
        }


        &__input{
            input {
                background-color: $grey-59;
                color: white;
                display: block;
                width: 100%;
                padding: 13px 8px;

                &::placeholder {
                    color: $grey-166;
                }

                &:focus,
                &:hover {
                    background-color: lighten($color: $grey-59, $amount: 2%);
                }
            }

            &:not(:first-child) {
                margin: 17px 0 0 0;
            }
            &:first-child {
                margin: 0;
            }
        }


        &__submit-btn{
            margin : 20px 0;
            @include setCircularStdFont("Black");
            background-color: white;
            color : black;
            text-transform: uppercase;
            letter-spacing: 2.6px;
            padding: 17px;
            border-radius: 100px;
            width: 100%;
            
            &:hover{
                transform : scale(1.1)
            }            
        }

    }
</style>
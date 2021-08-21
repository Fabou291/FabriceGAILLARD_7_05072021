<template>
    <div class="input-icon">
        <div class="input-icon__input">
            <slot></slot>             
        </div>

        <div class="input-icon__icon">
            <slot  name="icon"></slot>             
        </div>        
    </div>
</template>


<style lang="scss">
    .input-icon {
        position : relative;

        &__input{
            input{
                width : 100%;
            }
        }

        &__icon {
            pointer-events : none; 
            position : absolute;
            right : 8px;
            top : 50%;
            transform : translateY(-50%);   
        }  
                  
    }

</style>


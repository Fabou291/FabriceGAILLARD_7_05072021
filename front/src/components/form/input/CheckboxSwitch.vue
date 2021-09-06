<template>
    <div class="switch-checkbox">
        <input type="checkbox" :name="name" :id="id" :checked="value" >
        <label :for="id" @click.stop>
            <span>
                <slot></slot>
            </span>
            <span></span>
            <span class="switch-checkbox__switch-btn" @click.prevent="this.$emit('checkSwitch')"></span>
        </label>
    </div>   
</template>

<script>
    export default {
        data() {
            return {}
        },
        props : {
            id : { type : String, required : true },
            name : { type : String },
            value : { type : Boolean, required : true }
        },
    }
</script>

<style lang="scss">
    $switchCheckBox : (
        height : 22px,
        border : 2px,
        transition-time : 0.2s
    );
    
    .switch-checkbox {
        position: relative;
    
        label{
            display : flex;
            align-items: center;
            pointer-events: none;
            

            span:nth-child(2){
                flex : 1;
            }

            & * {
                pointer-events: auto;
            }
        }

        &__switch-btn{
            display : block;
            position: relative;
            width : 38px; 
            height : map-get($switchCheckBox, height);
            border : 2px solid #43413F;
            background-color : black;
            border-radius : 50px;

            transition : background-color map-get($switchCheckBox, transition-time), border-color map-get($switchCheckBox, transition-time);
            &:hover{
                &::after{
                    background-color : darken(white,10%);
                }
            }

            &::after{
                content : "";
                position: absolute;
                display : block;
                top : (map-get($switchCheckBox, border)) * -1;
                left : (map-get($switchCheckBox, border)+ 1px) * -1;
                width : map-get($switchCheckBox, height);
                height : map-get($switchCheckBox, height);
                background : #B3B3B2;
                border-radius : 50px;
                transition : background-color map-get($switchCheckBox, transition-time), left map-get($switchCheckBox, transition-time);
            }

        }

        input {
            visibility: hidden;
            position : absolute;
            &:checked + label .switch-checkbox__switch-btn{
                background-color : $primary;
                border-color : $primary;
                
                &::after{
                    
                    left : calc( 100% - #{ map-get($switchCheckBox, height) - 2px } );
    
                    background-color : white;
                }
            }
        }

    }

</style>
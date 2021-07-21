<template>
    <div class="btn-pop-up">
        <button @mouseenter.stop="show">
            <slot></slot>
        </button>
        <div>{{ label }}</div>        
    </div>
</template>

<script>
export default {
    data(){
        return {
            visible : false
        }
    },
    props : {
        label : { type : String, required : true }
    },
    methods:{
        show(e){
            console.log(e.target)
            let boundingsElement =  e.target.getBoundingClientRect();
            console.log(boundingsElement)
            e.target.nextSibling.setAttribute(
                'style',
                `left : ${boundingsElement.left + (boundingsElement.width/2)}px;
                 top : ${boundingsElement.top - 15}px;`
            )
        }
    },

}
</script>

<style lang="scss" scoped>
    $bgColor : $grey-11;
    .btn-pop-up{
        
        button{
            &:hover + div{
                opacity: 1;
                visibility : visible;
                transform : translate(-50%,-100%) ;
            }
        }

        div{
            transition : opacity 0.1s, transform 0.1s;
            opacity: 0;
            visibility : hidden;
            position : absolute;
            transform : translate(-50%,-80%) ;
            z-index : 100;
            background-color : $bgColor;
            border-radius : 4px;
            padding : 8px;
            color : white;
            &::before{
                content:'';
                position: absolute;
                bottom : 0;
                left : 50%;
                transform : translate(-50%,100%);
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 6px 5px 0 5px;
                border-color: $bgColor transparent transparent transparent;
            }
        }
    }
</style>
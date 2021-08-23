<template>
    <div class="btn-pop-up"  >
        <button @mouseenter="fixPositionSidebar">
            <slot></slot>
        </button>
        <div :style="style">{{ label }}</div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            style : { marginTop : "0px" }
        }
    },
    props : {
        label : { type : String, required : true },
    },
    methods : {
        fixPositionSidebar(){
            console.log(document.getElementById('sidebarContent').scrollTop)
            this.style.marginTop = document.getElementById('sidebarContent').scrollTop*-1 + "px";
        }
    }
}
</script>

<style lang="scss" scoped>
    $bgColor : $grey-11;
    $btn-size : 18px;
    .btn-pop-up{

        button{
            &:hover + div{
                visibility : visible;
                transform : translate( calc(-50% + 18px / 2), calc(-100% - 18px - 10px )  ) scale(1) ;
            }
        }

        div{
            transition : transform 0.05s;
            visibility : hidden;
            position : absolute;
            transform : translate( calc(-50% + 18px / 2), calc(-90% - 18px - 10px )  ) scale(0.95) ;
            z-index : 100;
            background-color : $bgColor;
            border-radius : 4px;
            padding : 8px;
            color : white;
            white-space: nowrap;
            z-index: 2;
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
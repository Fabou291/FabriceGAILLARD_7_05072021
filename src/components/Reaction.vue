<template>
    <button class="reaction-btn" type="button">
        <img class="reaction-btn__emoji" :src="require('@/assets/twemoji/svg/' + reaction.unicode + '.svg')" alt="emoji">
        {{ reaction.length }}
    </button>
</template>

<script>
export default {
    props : {
        reaction : { type : Object, required : true}
    }
}
</script>

<style lang="scss">
    .reaction-btn{
        border-radius : 4px;
        background-color : rgba(0,0,0,0.2);
        border : 1px solid rgba(0,0,0,0.4);
        padding : 4px 8px;
        margin : 10px 4px 0 0;
        &__emoji{
            @include setSize(16px);
        }
        &:hover{
            background-color : rgba(0,0,0,0.4);
            background-color : rgba(0,0,0,0.6);
        }
    }
</style>
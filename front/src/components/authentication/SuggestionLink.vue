<template>
    <div class="suggestion-link">
        <div class="suggestion-link__suggestion"> {{ suggestion }} </div>
        <router-link class="suggestion-link__link" :to="to">{{ anchor }}</router-link>        
    </div>
</template>

<script>
    export default {
        props : {
            suggestion : { type : String, required : true},
            anchor : { type : String, required : true },
            to : {type : String, required : true}
        }
    }
</script>

<style lang="scss">
    .suggestion-link{
        font-size: 14px;
        letter-spacing: 2px;
        @include setCircularStdFont("Bold");

        &__suggestion {
            color: #acaca9;
            padding : 0 0 2px 0;
        }
        &__link {
            text-decoration : underline;
        }
    }
</style>

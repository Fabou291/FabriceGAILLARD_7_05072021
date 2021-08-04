<template>
    <section class="section" v-if="!switchPanel">
        <h1 class="section__title">
            <slot name="title"></slot>
        </h1>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">
    .section {
        &__title {
            @include setCircularStdFont("Black");
            font-size: 30px;
            line-height: 40px;
            letter-spacing: -0.5px;
            text-align: center;
            margin: 0 ;
        }
    }
</style>
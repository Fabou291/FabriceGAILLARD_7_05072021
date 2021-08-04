<template>
    <div class="input-feedback" >
      <slot name="label" v-if="this.$slots.label"></slot>
      <slot name="input" v-if="this.$slots.input"></slot>
      <div class="input-feedback__valid" v-if="this.$slots.valid && isValid">
          <slot name="valid"></slot>
      </div>
      <div class="input-feedback__invalid" v-if="this.$slots.invalid && !isValid">
          <slot name="invalid" ></slot>
      </div>
    </div>
</template>

<script>
    export default {
        props : ['isValid']
    }
</script>

<style lang="scss">


    
    

</style>
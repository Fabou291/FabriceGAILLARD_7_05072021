<template>
  <div class="container">
    <Header />
    <main class="main">
      <PrincipalNav />
      <div class="channel">

      </div>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import PrincipalNav from '@/components/PrincipalNav.vue';

export default {
  name: 'Home',
  components: {
    Header,
    PrincipalNav
  }
}
</script>

<style lang="scss">
  .channel{
    background-color :  $grey-18;
    height : 100%;
    flex: 1;
  }
</style>
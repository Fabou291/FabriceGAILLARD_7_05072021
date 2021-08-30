<template>
    <Headband />
  <router-view/>
</template>
  
<script>
  import Headband from "@/components/FlashCard/Headband.vue";
import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        
      }
    },
    components : { Headband },
    methods: {
      ...mapMutations('emojiModule',['CLOSE']),
      ...mapMutations('postModule',['SET_ACTION_LIST_VISIBLE']),
      shutDownModals() {
          this.CLOSE();
          this.SET_ACTION_LIST_VISIBLE(false);
      },
      shutDownModalsByKeyCode(e){
        if(e.code == 'Escape') this.shutDownModals(); 
      },
      shutDownByClick(e){
        let node = e.target;

        while( node != null && node.nodeType != Node.DOCUMENT_NODE){
            if(node.hasAttribute('data-modal')) return;
            node = node.parentNode;
        }

        this.shutDownModals();
      }
    },
    mounted(){
      window.addEventListener('click', this.shutDownByClick, true)
      window.addEventListener('keyup', this.shutDownModalsByKeyCode, true)

    },
    unmounted(){
      window.removeListener('click', this.shutDownByClick, true)
      window.removeListener('keyup', this.shutDownModalsByKeyCode, true)
    }
  }
</script>

<style lang="scss">

</style>

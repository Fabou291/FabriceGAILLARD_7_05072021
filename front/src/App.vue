<template>
    <Headband />
    <FlashCard v-if="flashCardVisible"/>
  <router-view/>
</template>
  
<script>
import { mapMutations, mapState } from 'vuex';
import Headband from '@/components/FlashCard/Headband.vue';
import FlashCard from '@/components/FlashCard/FlashCardDefault.vue';

  export default {
    components : { Headband, FlashCard },
    computed: {
      ...mapState('flashCardModule',['flashCardVisible'])
    },
    methods: {
      ...mapMutations('emojiModule',['CLOSE']),
      ...mapMutations('postModule',['SET_ACTION_LIST_VISIBLE']),
      /**
       * @name shutDownModals
       * @description Ferme un ensemble de modal
       */
      shutDownModals() {
          this.CLOSE();
          this.SET_ACTION_LIST_VISIBLE(false);
      },
      /**
       * @name shutDownModalsByKeyCode
       * @description Ferme les modals avec la touche echap
       */
      shutDownModalsByKeyCode(e){
        if(e.code == 'Escape') this.shutDownModals(); 
      },
      /**
       * @name shutDownByClick
       * @description Ferme les modals par le click
       * Pour toutes les modal, dont le click n'est pas fait à l'interieur d'elle, elle sera fermé
       */
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
      window.addEventListener('mousedown', this.shutDownByClick, true)
      window.addEventListener('keyup', this.shutDownModalsByKeyCode, true)
    },
    unmounted(){
      window.removeListener('mousedown', this.shutDownByClick, true)
      window.removeListener('keyup', this.shutDownModalsByKeyCode, true)
    }
  }
</script>

<style lang="scss">

</style>

<template>
    <div class="two-side">
        <PanelCreateChannel/>
        <ConfigChannel v-if="visible" />
        <ConfigProfil v-if="configDisplay.visible"/>
        <ImagePostDisplay v-if="listFile != null"/>

        <Header />
        <div class="container-full">
            <div class="scroll-y" id="scrollY">
                <div class="container">
                    
                    
                    <PrincipalNav />                                  
                    <main class="main">
                        <router-view></router-view>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import PrincipalNav from "@/components/PrincipalNav.vue";
import PanelCreateChannel from "@/components/PanelCreateChannel.vue";
import ConfigChannel from "@/components/ConfigChannel.vue";
import ConfigProfil from "@/components/ConfigProfil.vue";
import ImagePostDisplay from "@/components/ImagePostDisplay.vue"
import { mapState } from 'vuex';




//import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: { Header, PrincipalNav, PanelCreateChannel, ConfigChannel,ConfigProfil, ImagePostDisplay },
    computed: {
        ...mapState("configChannelModule", ["visible"]),
        ...mapState("userModule", ["configDisplay"]),
        ...mapState("imagePostModule", ["listFile"]),
    },

};
</script>

<style lang="scss">
    .two-side{
        background: linear-gradient(90deg, #151515 0%, #151515 50%, #121212 51%, #121212 100%);
    }

</style>

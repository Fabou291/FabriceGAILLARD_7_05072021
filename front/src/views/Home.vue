<template>
    <div class="two-side">
        <PanelCreateChannel v-if="createChannelVisibility"/>
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
import PrincipalNav from "@/components/sidebar/Sidebar.vue";
import PanelCreateChannel from "@/components/modal/PanelCreateChannel.vue";
import ConfigChannel from "@/components/display/ConfigChannel.vue";
import ConfigProfil from "@/components/display/ConfigProfil.vue";
import ImagePostDisplay from "@/components/modal/ImagePostDisplay.vue"
import { mapState } from 'vuex';




//import EmojiPanel from "../components/modal/emojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: { Header, PrincipalNav, PanelCreateChannel, ConfigChannel,ConfigProfil, ImagePostDisplay },
    computed: {
        ...mapState("configChannelModule", ["visible"]),
        ...mapState("userModule", ["configDisplay"]),
        ...mapState("imagePostModule", ["listFile"]),
        ...mapState({
            createChannelVisibility : state => state.createChannelDisplay.visible
        }),
    },

};
</script>

<style lang="scss">
    .two-side{
        background: linear-gradient(90deg, #151515 0%, #151515 50%, #121212 51%, #121212 100%);
    }

</style>

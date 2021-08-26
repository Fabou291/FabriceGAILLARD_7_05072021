<template>
    <div>
        <PanelCreateChannel/>
        <ConfigChannel/>
        <ConfigProfil/>
        <ImagePostDisplay/>

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



//import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: { Header, PrincipalNav, PanelCreateChannel, ConfigChannel,ConfigProfil, ImagePostDisplay
 

        //EmojiPanel,
    },
};
</script>

<style lang="scss">


</style>

<template>
    <div>
        <PanelCreateChannel/>
        <ConfigChannel/>
        <ImagePostDisplay/>
    

        <div class="container">
            <Header />
            <main class="main">
                <div class="left-side">
                    <div class="sidebar">
                        <PrincipalNav />
                    </div>  
                </div>
                <div class="principal-content">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import PrincipalNav from "@/components/PrincipalNav.vue";
import PanelCreateChannel from "@/components/PanelCreateChannel.vue";
import ConfigChannel from "@/components/ConfigChannel.vue";
import ImagePostDisplay from "@/components/ImagePostDisplay.vue"



//import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: { Header, PrincipalNav, PanelCreateChannel, ConfigChannel, ImagePostDisplay
 

        //EmojiPanel,
    },
};
</script>

<style lang="scss">
.container{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.principal-content {
    background-color: $grey-18;
    height: 100%;
    flex: 1;
    @include setScrollBar($grey-47)
}

</style>

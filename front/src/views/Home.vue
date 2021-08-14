<template>
    <div>
        <PanelCreateChannel/>

        <div class="container">
            <Header />
            <main class="main">
                <PrincipalNav />
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


//import EmojiPanel from "../components/EmojiPanel/EmojiPanel.vue";

export default {
    name: "Home",
    components: {
        Header,
        PrincipalNav,
        PanelCreateChannel,
        //EmojiPanel,
    },




};
</script>

<style lang="scss">
.principal-content {
    background-color: $grey-18;
    height: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $grey-47;
        border-radius: 30px;
    }
}

</style>

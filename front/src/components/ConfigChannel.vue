<template>
    <div class="container l-config-channel">
        <main class="main">
            <Sidebar>

            </Sidebar>
            <div class="principal-content">
                
            </div>
        </main>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
    components : { Sidebar }
}

</script>

<style lang="scss">
    .l-config-channel{
        position : absolute;
        width : 100%;
        left :0;
        top : 0;
        z-index: 5;
    }
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
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

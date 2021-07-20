<template>

    <div class="container">
        <Header />
        <main class="main">
            <PrincipalNav />
            <div class="principal-content">
                <section class="channel">
                    <span class="tag-content">CHANNEL</span>
                    <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
                    <p class="channel__description">C'est le début du salon #Groupe 1.</p>
                    <FormPost />
                    <div class="channel__posts">
                        <Post />                        
                    </div>
                </section>
            </div>
        </main>
    </div>

</template>

<script>

import Header from "@/components/Header.vue";
import PrincipalNav from "@/components/PrincipalNav.vue";
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";

export default {
    name: "Home",
    components: {
        Header,
        PrincipalNav,
        FormPost,
        Post,
    },
};
</script>

<style lang="scss">

.principal-content {
    background-color: $grey-18;
    height: 100%;
    flex: 1;
    overflow :hidden;
    overflow-y:auto;
    
    &::-webkit-scrollbar {
        width: 5px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $grey-47;
        border-radius: 30px;
    }
}
.channel {
    max-width: 800px;
    padding: 30px 15px 0 30px;

    &__title{
      color : white;
      font-size : 48px;
      @include setCircularStdFont("Black");
      letter-spacing: -2.7px;
      margin : 4px 0 10px 0; 
    }

    &__description{
      color : $grey-193;
      @include setCircularStdFont("Bold");
      font-size : 13px;
      letter-spacing: 0.3px;
      margin : 0 0 34px 0;
    }
    &__posts{
        margin : 25px 0 0 0;
    }
}

.tag-content {
    font-size: 12px;
    @include setCircularStdFont("Bold");
    color: white;
}
</style>

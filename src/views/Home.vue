<template>
    <div>
        <PanelCreateChannel
            :groupName="panelCreateChan.component.group.name"
            v-model="panelCreateChan.visible"
            v-if="panelCreateChan.visible"
        />
        <div class="container">
            <Header />
            <main class="main">
                <PrincipalNav />

                <div class="principal-content">
                    <section class="channel">
                        <span class="tag-content">CHANNEL</span>
                        <h1 class="channel__title">Bienvenue sur Groupe #1</h1>
                        <p class="channel__description">C'est le début du salon #Groupe 1.</p>
                        <FormPost  @addPost="addPost" v-model="formPostValue" />
                        <div class="channel__posts">
                            <Post :post="post" v-for="post in listPost" :key="post" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import PrincipalNav from "@/components/PrincipalNav.vue";
import FormPost from "@/components/FormPost.vue";
import Post from "@/components/Post.vue";
import PanelCreateChannel from "@/components/PanelCreateChannel.vue";
import { mapState } from "vuex";

export default {
    name: "Home",
    components: {
        Header,
        PrincipalNav,
        FormPost,
        Post,
        PanelCreateChannel,
    },
    data() {
        return {
            listPost: [
                {
                    user_id: 0,
                    user_avatar: require("@/assets/imageProfil.png"),
                    user_pseudo: "Fab",
                    date: "2021/07/20",
                    content:
                        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                    listComment: [
                        {
                            user_id: 0,
                            user_avatar: require("@/assets/imageProfil.png"),
                            user_pseudo: "Fab",
                            date: "2021/07/20",
                            content:
                                "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                        },
                        {
                            user_id: 0,
                            user_avatar: require("@/assets/imageProfil.png"),
                            user_pseudo: "Fab",
                            date: "2021/07/20",
                            content:
                                "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                        },
                        {
                            user_id: 0,
                            user_avatar: require("@/assets/imageProfil.png"),
                            user_pseudo: "Fab",
                            date: "2021/07/20",
                            content:
                                "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                        },
                        {
                            user_id: 0,
                            user_avatar: require("@/assets/imageProfil.png"),
                            user_pseudo: "Fab",
                            date: "2021/07/20",
                            content:
                                "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                        },
                        {
                            user_id: 0,
                            user_avatar: require("@/assets/imageProfil.png"),
                            user_pseudo: "Fab",
                            date: "2021/07/20",
                            content:
                                "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
                        },
                    ],
                    listReaction: [
                        {
                            unicode: "1f0cf",
                            length: 3,
                        },
                        {
                            unicode: "1f1f0",
                            length: 10,
                        },
                        {
                            unicode: "1f1ef",
                            length: 1,
                        },
                    ],
                },
            ],
            formPostValue : ''
        };
    },
    computed: {
        ...mapState(["user", "panelCreateChan"]),
    },
    methods: {
        addPost() {
            this.listPost.unshift({
                user_id: this.user.id,
                user_avatar: this.user.avatar,
                user_pseudo: this.user.pseudo,
                date: "2021/07/20",
                content: this.formPostValue,
                listComment: [],
            });
            this.formPostValue = '';
        },
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
.channel {
    max-width: 800px;
    padding: 30px 15px 0 30px;

    &__title {
        color: white;
        font-size: 48px;
        @include setCircularStdFont("Black");
        letter-spacing: -2.7px;
        margin: 4px 0 10px 0;
    }

    &__description {
        color: $grey-193;
        @include setCircularStdFont("Bold");
        font-size: 13px;
        letter-spacing: 0.3px;
        margin: 0 0 34px 0;
    }
    &__posts {
        margin: 25px 0 0 0;
    }
}

.tag-content {
    font-size: 12px;
    @include setCircularStdFont("Bold");
    color: white;
}
</style>

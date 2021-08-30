<template>
    <div :id="`post-id-${post.id}`" tabindex="0">
        <InteractionPost
            class="post__interaction"
            @addReactionToPost="SET_POST_ID(this.post.id)"
            :isOnRecursifPost="isRecursif"
            v-show="!isInModifyMode"
            :user_id="parseInt(post.user_id)"
            @replyPost="setIdPostToReply(post.id)"
            @removePost="remove"
            @modifyPost="SET_ID_POST_IN_MODIFY_MODE(post.id)"
        />
        <div class="post__sidebar"></div>
        <div class="post__main">
            <Avatar
                class="post__user-avatar"
                :user="{ username: post.user_username, avatar: `http://localhost:3000/images/${post.user_avatar}` }"
            />

            <div class="post__infos">
                <div class="post__aside">
                    <span class="post__user-username">{{ post.user_username }}</span>
                    <span class="post__date">{{ post.created_at }}</span>
                </div>

                <div v-if="isInModifyMode" class="post__modify-field">
                    <FormPost
                        class="post__modify-input"
                        :placeholder="'Modifier votre message'"
                        :value="post.content"
                        :canEmoji="true"
                        @escape="SET_ID_POST_IN_MODIFY_MODE(null)"
                        @submit="modify"
                    />
                    <span class="post__modify-infos"
                        >échap pour <a href="#" @click.prevent="SET_ID_POST_IN_MODIFY_MODE(null)">annuler</a> • entrée pour
                        enregistrer</span
                    >
                </div>

                <p class="post__content" v-html="getContent" v-if="!isInModifyMode"></p>

                <img :src="`http://localhost:3000/images/${post.image_url}`" v-if="post.image_url" class="post__image" alt="" />

                <div class="post__reaction">
                    <Reaction v-for="reaction in post.listReaction" :key="reaction" :reaction="reaction" @addReaction="addReactionToPost" @removeReaction="removeReactionToPost" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import InteractionPost from "@/components/InteractionPost.vue";
import Reaction from "@/components/Reaction.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import ContentParser from "../js/contentParser.js";
import FormPost from "@/components/FormPost.vue";

export default {
    components: {
        Avatar,
        InteractionPost,
        Reaction,
        FormPost,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState("postModule", ["idPostInModifyMode"]),
        ...mapState("emojiModule", ["emojisShortCodeIndex"]),
        isInModifyMode() {
            return this.idPostInModifyMode == this.post.id;
        },
        getContent() {
            return this.parseContent();
        },
    },
    props: {
        post: { type: Object, required: true },
        isRecursif: { type: Boolean, required: true },
    },
    methods: {
        ...mapActions("postModule", ["modifyPost", "removePost", "setIdPostToReply", "removeReaction","addReaction"]),
        ...mapMutations("postModule", ["SET_ID_POST_IN_MODIFY_MODE"]),
        ...mapMutations("emojiModule", ["SET_POST_ID"]),
        parseContent() {
            let contentParser = new ContentParser(this.post.content, this.emojisShortCodeIndex);
            return contentParser.parseEmoji().parseUrl().content;
        },
        modify(content) {
            this.modifyPost({ ...this.post, content });
        },
        remove() {
            this.removePost({ ...this.post });
        },
        addReactionToPost(emoji_id) {
            this.addReaction({ postId: this.post.id, emojiId: emoji_id });
        },
        removeReactionToPost(emoji_id) {
            this.removeReaction({ postId: this.post.id, emojiId: emoji_id });
        },
    },
};
</script>

<style lang="scss">
.post {
    display: flex;

    margin: 0 0 20px 0;
    position: relative;

    .reaction-btn {
        background-color: $grey-21;
    }

    &:focus-within,
    &:hover {
        .post__main {
            background-color: $grey-38;
        }

        .reaction-btn {
            background-color: $grey-25;
        }

        .reaction-btn:hover {
            background-color: $grey-32;
            border: 1px solid $grey-89;
        }
    }
    &:focus,
    &:focus-visible,
    &:focus-within,
    &:hover {
        .post__interaction {
            display: block;
        }
    }

    &.post--recursive {
        margin: 0 0 20px 40px;

        @include setMediaScreen(mobile) {
            margin: 0 0 20px 20px;
        }

        .post__main {
            border-radius: 4px;
            background-color: $grey-25;
            padding: 10px;
        }

        .reaction-btn {
            background-color: $grey-18;
        }

        &:hover,
        &:focus-within {
            .post__main {
                background-color: $grey-32;
            }

            .reaction-btn {
                background-color: $grey-21;
            }

            .reaction-btn:hover {
                background-color: $grey-32;
                border: 1px solid $grey-89;
            }
        }
    }

    &__sidebar {
        width: 0px;
        background-color: $grey-59;
        border-radius: 4px 0 0 4px;
    }

    &__main {
        background-color: $grey-32;
        padding: 20px;
        min-width: 0;

        @include setMediaScreen(mobile) {
            padding: 10px;
        }

        border-radius: 4px;
        display: flex;
        align-items: flex-start;
        flex: 1;
    }

    &__infos {
        flex: 1;
        min-width: 0;
    }

    &__interaction {
        position: absolute;
        display: none;
        top: -10px;
        right: 5px;
    }

    &__aside {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0 0px 0;
    }

    &__user-avatar {
        border-color: $grey-32;
        margin: -6px 8px 0 -6px;
    }

    &__user-username {
        @include setCircularStdFont("Medium");
        font-size: 15px;
        @include textEllipsis();
    }

    &__date {
        color: $grey-113;
        font-size: 11px;
        white-space: nowrap;
    }

    &__content {
        margin: 0px;
        letter-spacing: -0.1px;
        font-size: 16px;
        color: $grey-193;
        word-wrap: break-word;
    }

    &__image {
        display: block;
        max-width: 100%;
        max-height: 400px;
        margin: 8px 0 0 0;
        border-radius: 4px;
        background-color: $grey-18;
    }

    &__modify-input {
        background-color: $grey-47;

        .form-post__container {
            padding: 5px;
        }

        & .form-post__field {
            color: $grey-215;
        }

        & .form-post__field:before {
            color: $grey-142;
        }
    }

    &__modifiy-field {
        margin: 10px 0;
    }

    &__modify-infos {
        color: grey;
        font-size: 12px;
    }
}
</style>

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
                :user="{ username: post.user_username, avatar: `${post.user_avatar}` }"
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
                        ref="formPost"
                    />
                    <span class="post__modify-infos"
                        >échap pour <a href="#" @click.prevent="SET_ID_POST_IN_MODIFY_MODE(null)">annuler</a> • entrée pour
                        enregistrer</span
                    >
                </div>

                <p class="post__content" v-html="getContent" v-if="!isInModifyMode"></p>

                <img :src="`${post.image_url}`" v-if="post.image_url" class="post__image" :alt="`image du post n°${post.id}`" />

                <div class="post__reaction">
                    <ReactionPost v-for="reaction in post.listReaction" :key="reaction" :reaction="reaction" @addReaction="addReactionToPost"  @removeReaction="removeReactionToPost"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import InteractionPost from "@/components/post/InteractionPost.vue";
import ReactionPost from "@/components/post/ReactionPost.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import PostParser from "@/js/PostParser.js";
import FormPost from "@/components/form/FormPost.vue";

export default {
    components: {
        Avatar,
        InteractionPost,
        ReactionPost,
        FormPost,
    },

    computed: {
        ...mapState("postModule", ["idPostInModifyMode"]),
        ...mapState("emojiModule", ["emojisShortCodeIndex"]),

        /**
         * @name isInModifyMode
         * @description Détermine si le post en question est en cours de modification
         */
        isInModifyMode() {
            return this.idPostInModifyMode == this.post.id;
        },

        /**
         * @name getContent
         * @description Récupère le contenu du post
         */
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

        /**
         * @name parseContent
         * @description Analyse le contenu et l'adapte (emoji et url)
         */
        parseContent() {
            let postParser = new PostParser(this.post.content);
            return postParser.parseContent().parseEmoji().parseUrl().content;
        },

        /**
         * @name modify
         * @description Modifie le contenu du post
         */
        modify(content) {
            this.modifyPost({ ...this.post, content });
        },

        /**
         * @name remove
         * @description Supprime une post
         */
        remove() {
            this.removePost({ ...this.post });
        },

        /**
         * @name addReactionToPost
         * @description Ajoute une réaction au post
         */
        addReactionToPost(emoji_unicode) {
            this.addReaction({ postId: this.post.id, emojiUnicode: emoji_unicode });
        },

        /**
         * @name removeReactionToPost
         * @description Supprime une réaction du post
         */
        removeReactionToPost(reaction_id, emojiUnicode) {
            this.removeReaction({ postId: this.post.id, id: reaction_id, emojiUnicode });
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

    &:focus-visible,
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

    &:focus-visible {
        .post__main {
            box-shadow: 0 0 0 1px $primary inset,
            0 0 3px 4px rgba($primary,0.2) inset,
            0 0 3px 4px rgba($primary,0.2);
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
        line-height: 1.5;
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

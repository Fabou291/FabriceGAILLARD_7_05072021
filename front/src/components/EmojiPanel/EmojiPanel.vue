<template>
    <div class="display-emoji">
        <div class="display-emoji__sticky-top" id="displayEmojiStickyTop" >

            <div class="emoji-panel" data-modal="" ref="emojiPanel" v-show="display.visible" >
                <EmojiPanelNav v-on:change="aze" />
                <div v-show="actived == 'Emoji'">
                    <EmojiPanelSearch
                        :filterValue="filterValue"
                        placeholder="Trouve l'émoji parfait"
                        @updateFilterValue="updateFilterValue"
                        @updateSkinColor="changeSkin"
                    />
                    <div class="emoji-panel__main">
                        <EmojiPanelCategorie
                            :listGroupEmoji="getSvgPathsGroupIcon"
                            :activeGroup="activeGroup"
                            @scrollToGroup="scrollToGroup"
                        />
                        <div class="emoji-panel__container">
                            <div class="emoji-panel__emojis" @scroll="checkGroupActive">
                                <div class="emoji-group" v-for="(group, indexGroup) in getFilteredEmojis" :key="group">
                                    <!-- Header Group-->
                                    <div class="emoji-group__header" @click="hide(indexGroup)">
                                        <svg aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor" v-for="path in group.svgPathIcon" :key="path" :d="path"></path>
                                        </svg>

                                        {{ group.name }}

                                        <svg
                                            class="emoji-group__dropdown-icon"
                                            :class="{ 'emoji-group__dropdown-icon--active': !groupeHide[indexGroup] }"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
                                            ></path>
                                        </svg>
                                    </div>

                                    <!-- Emojis Group-->
                                    <ul class="emoji-group__list" v-if="!groupeHide[indexGroup]">
                                        <li
                                            class="emoji-group__list-item emoji-btn"
                                            :class="{ 'emoji-group__list-item--active': activeEmoji == emoji.i }"
                                            v-for="emoji in group.emojis"
                                            :key="emoji"
                                            @mouseenter="updateActiveEmoji(emoji.i)"
                                            @click="applyEmoji(emoji)"
                                        >
                                            <div
                                                class="emoji-btn__thumb"
                                                :class="(emoji.is != undefined) ? 'emoji-btn__thumb--' + skin : ''"
                                                :alt="emoji.i"
                                                :style="'background-position: ' + getPositionBackgroundEmoji(emoji)"
                                            ></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="emoji-panel__caption">
                                <img
                                    draggable="false"
                                    class="emoji-panel__caption-emoji"
                                    :src="require('@/assets/twemoji/svg/' + getSvgEmojiNameFile + '.svg')"
                                    :alt="emojisDataIndexed[activeEmoji].i"
                                />
                                <span>{{ emojisDataIndexed[activeEmoji].sc }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      
    </div>

</template>

<script>
import EmojiPanelSearch from "@/components/EmojiPanel/EmojiPanelSearch.vue";
import EmojiPanelNav from "@/components/EmojiPanel/EmojiPanelNav.vue";
import EmojiPanelCategorie from "@/components/EmojiPanel/EmojiPanelCategorie.vue";
import { mapActions, mapMutations, mapState } from 'vuex';


export default {
    name: "EmojiPanel",
    components: {
        EmojiPanelSearch,
        EmojiPanelNav,
        EmojiPanelCategorie,
    },
    data: function() {
        return {
            actived: "Emoji",
            activeGroup: 0,
            activeEmoji: 0,
            groupeHide : [ false, false, false, false, false, false, false, false ],
            filterValue: "",
        };
    },
    computed: {
        ...mapState('emojiModule', ['skin','emojisData','indexesColor','emojisDataIndexed','emojisShortCodeIndex','unicodeSkin', 'display']),
        getFilteredEmojis() {
            let emojisDataFiltered = JSON.parse(JSON.stringify(this.emojisData));

            if (this.filterValue == "") return emojisDataFiltered;
            else {
                for (const key in emojisDataFiltered) {
                    emojisDataFiltered[key].emojis = emojisDataFiltered[key].emojis.filter((emojiData) => {
                        if (emojiData.sc == null) return false;
                        if (emojiData.sc.search(this.filterValue) == -1) return false;
                        return true;
                    });
                }
            }
            return emojisDataFiltered;
        },
        getSvgPathsGroupIcon() {
            return Object.entries(this.emojisData).map((group) => group[1].svgPathIcon);
        },
        getSvgEmojiNameFile() {
            return this.emojisDataIndexed[this.activeEmoji].u
                .join("-")
                .toLowerCase()
                .replace(/^0+/g, "");
        },
    },
    methods: {
        ...mapMutations('emojiModule', ['SET_SIZE']),
        ...mapActions('emojiModule',['changeSkin']),
        aze: function(actived) {
            this.actived = actived;
        },
        hide: function(index) {
            this.groupeHide[index] = !this.groupeHide[index];
        },
        scrollToGroup: function(index) {
            document.querySelector(".emoji-panel__emojis").scrollTop = document.querySelectorAll(".emoji-group")[index].offsetTop;
        },
        checkGroupActive: function() {
            const scrollTop = document.querySelector(".emoji-panel__emojis").scrollTop;
            const emojiGroup = document.querySelectorAll(".emoji-group");

            for (let i = 0; i < emojiGroup.length; i++) {
                const bottom = emojiGroup[i].clientHeight + emojiGroup[i].offsetTop - 10;
                if (bottom > scrollTop) {
                    this.activeGroup = i;
                    break;
                }
            }
        },
        getPositionBackgroundEmoji(emoji) {
            const index = emoji.is != undefined ? emoji.is : emoji.i; //i = index, is = indexSkin
            const nbPerLine = 42;
            const x = (index % nbPerLine) * -32;
            const y = Math.trunc(index / nbPerLine) * -32;
            return `${x}px ${y}px`;
        },
        updateActiveEmoji(index) {
            this.activeEmoji = index;
        },
        updateFilterValue(value) {
            this.filterValue = value;
        },
        applyEmoji(emoji) {
            this.display.formPost.textarea.innerHTML = emoji.sc;
        }
    },
    mounted(){
        /*console.log(this.$refs['emojiPanel'].getBoundingClientRect())
        const bound = this.$refs['emojiPanel'].getBoundingClientRect();
        this.SET_SIZE({ width: bound.width, height: bound.height})*/
    }
};
</script>

<style lang="scss">
.display-emoji{
    position: absolute;
    top: 0;
    left: 50%;
    padding : 30px 35px 30px 30px;
    pointer-events : none;
    width: 100%;
    height : 100%;
    max-width: 1100px;
    transform: translateX(-50%);
    z-index: 10;

    &__sticky-top{
        display: flex;
        justify-content: flex-end;
        margin-top : 300px;
        position : sticky;
        top : 90px;
        z-index: 10;
        pointer-events : none;
    }


}

.emoji-panel {
    position : sticky;
    z-index : 10;
    width: 425px;
    border-radius: 7px;
    overflow: hidden;
    background-color: $grey-47;
    color: $grey-193;

    box-shadow: 0 0 8px rgba(black, 0.5);

    pointer-events : auto;

    &__main {
        display: flex;
        height: 346px;
    }

    &__container {
        flex: 1;
    }

    &__emojis {

        height: 299px;
        padding: 0 0 0 8px;
        position: relative;
        overflow: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            width: 5px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: $grey-32;
            border-radius: 30px;
        }
    }

    &__caption {
        height: 47px;
        background-color: $grey-38;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
    }

    &__caption-emoji {
        width: 32px;
        user-select: none;
    }
}

.emoji-group {
    @include setCircularStdFont("Medium");
    font-size: 11px;
    letter-spacing: 0.2px;
    margin: 0 0 12px 0;

    &__header {
        padding: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        background-color: $grey-47;
        position: sticky;
        top: 0;

        &:hover {
            color: lighten($grey-193, 10);
        }
    }

    &__dropdown-icon {
        transform: rotate(-90deg);
        transition: 0.1s transform;
        &--active {
            transform: rotate(0deg);
        }
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
    }

    &__list-item {
        &--active {
            background-color: $grey-89;
        }
    }
}

$listColorSkin : ('A', 'B', 'C', 'D', 'E', 'F');

.emoji-btn {
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    &__thumb {
        background-image: url("~@/assets/twemoji/all.png");
        background-size: calc(100% * 42);
        @include setSize(32px);

        @each $colorSkin in $listColorSkin{
            &--#{$colorSkin}{
                background-image: url("~@/assets/twemoji/#{$colorSkin}.png");          
            }
        }
    }
}
</style>

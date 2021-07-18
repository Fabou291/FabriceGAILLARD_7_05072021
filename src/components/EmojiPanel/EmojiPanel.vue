<template>
    <div class="emoji-panel" style=" margin : 50px auto">
        <EmojiPanelNav v-on:change="aze" />
        <div v-if="actived == 'Emoji'">
            <EmojiPanelSearch :filterValue="filterValue" placeholder="Trouve l'émoji parfait" @updateFilterValue="updateFilterValue" @updateSkinColor="updateSkinColor" />
            <div class="emoji-panel__main">
                <EmojiPanelCategorie :listGroupEmoji="svgPathsGroupIcon" :activeGroup="activeGroup" @scrollToGroup="scrollToGroup" />
                <div class="emoji-panel__container">
                    <div class="emoji-panel__emojis" @scroll="checkGroupActive">
                        <div class="emoji-group" v-for="(group, indexGroup) in getFilteredEmojis" :key="group" >
                            <!-- Header Group-->
                            <div class="emoji-group__header" @click="hide(indexGroup)">
                                <svg aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="currentColor" v-for="path in group.svgPathIcon" :key="path" :d="path"></path>
                                </svg>

                                {{ group.name }}

                                <svg
                                    class="emoji-group__dropdown-icon"
                                    :class="{ 'emoji-group__dropdown-icon--active': !group.hide }"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="currentColor" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                                </svg>
                            </div>

                            <!-- Emojis Group-->
                            <ul class="emoji-group__list" v-if="!group.hide">
                                <li class="emoji-group__list-item emoji-btn" :class="{'emoji-group__list-item--active' : activeEmoji == emoji.index }" v-for="emoji in group.emojis" :key="emoji" @mouseenter="updateActiveEmoji(emoji.index)">
                                    <div class="emoji-btn__thumb"  :alt="emoji.index" :style="'background-position: ' + getPositionBackgroundEmoji(emoji.index)"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="emoji-panel__caption">
                        <img draggable="false" class="emoji-panel__caption-emoji" :src="require('@/assets/twemoji/svg/' + indexedEmojis[activeEmoji].unicode.join('-').toLowerCase() + '.svg')" :alt="indexedEmojis[activeEmoji].emoji">
                        <span>{{ indexedEmojis[activeEmoji].shortCode }}</span>
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
const svgPathsGroupIcon = {
    smiley: [
        "M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.707L7.707 6.294L10.414 9L7.707 11.707L6.293 10.294L7.586 9L6.293 7.707ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z",
    ],
    nature: [
        "M6.814 8.982C4.539 11.674 4.656 15.591 6.931 18.153L4.034 21.579L5.561 22.87L8.463 19.437C9.569 20.127 10.846 20.513 12.161 20.513C14.231 20.513 16.183 19.607 17.516 18.027C20.069 15.01 20.771 6.945 21 3C17.765 3.876 9.032 6.356 6.814 8.982V8.982ZM8.935 17.331C6.826 15.548 6.56 12.382 8.342 10.272C9.592 8.793 14.904 6.845 18.764 5.698L8.935 17.331V17.331Z",
    ],
    food: [
        "M11 18H13V22H11V18Z",
        "M12 2C8.822 2 7 4.187 7 8V16C7 16.552 7.447 17 8 17H16C16.553 17 17 16.552 17 16V8C17 4.187 15.178 2 12 2ZM11 14.001H10V5.001H11V14.001ZM14 14.001H13V5.001H14V14.001Z",
    ],
    travel: [
        "M5.66487 5H18.3351C19.9078 5 21.2136 6.21463 21.3272 7.78329L21.9931 16.9774C22.0684 18.0165 21.287 18.9198 20.248 18.9951C20.2026 18.9984 20.1572 19 20.1117 19C18.919 19 17.8785 18.1904 17.5855 17.0342L17.0698 15H6.93015L6.41449 17.0342C6.12142 18.1904 5.08094 19 3.88826 19C2.84645 19 2.00189 18.1554 2.00189 17.1136C2.00189 17.0682 2.00354 17.0227 2.00682 16.9774L2.67271 7.78329C2.78632 6.21463 4.0921 5 5.66487 5ZM14.5 10C15.3284 10 16 9.32843 16 8.5C16 7.67157 15.3284 7 14.5 7C13.6716 7 13 7.67157 13 8.5C13 9.32843 13.6716 10 14.5 10ZM18.5 13C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10C17.6716 10 17 10.6716 17 11.5C17 12.3284 17.6716 13 18.5 13ZM6.00001 9H4.00001V11H6.00001V13H8.00001V11H10V9H8.00001V7H6.00001V9Z",
    ],
    activities: [
        "M22 17H19.725C19.892 16.529 20 16.029 20 15.5C20 13.015 17.985 11 15.5 11H13.5L12.276 8.553C12.107 8.214 11.761 8 11.382 8H7C6.448 8 6 8.447 6 9V11.051C3.753 11.302 2 13.186 2 15.5C2 17.986 4.015 20 6.5 20H15.5C16.563 20 17.527 19.616 18.297 19H22V17ZM6.5 16.75C5.81 16.75 5.25 16.19 5.25 15.5C5.25 14.81 5.81 14.25 6.5 14.25C7.19 14.25 7.75 14.81 7.75 15.5C7.75 16.19 7.19 16.75 6.5 16.75ZM11.5 16.75C10.81 16.75 10.25 16.19 10.25 15.5C10.25 14.81 10.81 14.25 11.5 14.25C12.19 14.25 12.75 14.81 12.75 15.5C12.75 16.19 12.19 16.75 11.5 16.75ZM16.5 16.75C15.81 16.75 15.25 16.19 15.25 15.5C15.25 14.81 15.81 14.25 16.5 14.25C17.19 14.25 17.75 14.81 17.75 15.5C17.75 16.19 17.19 16.75 16.5 16.75Z",
    ],
    objects: [
        "M18 5.999H17V4.999C17 4.448 16.553 3.999 16 3.999H4C3.447 3.999 3 4.448 3 4.999V12.999C3 14.488 3.47 15.865 4.265 16.999H15.722C16.335 16.122 16.761 15.105 16.92 13.999H18C20.205 13.999 22 12.205 22 9.999C22 7.794 20.205 5.999 18 5.999V5.999ZM18 12H17V8H18C19.104 8 20 8.897 20 10C20 11.102 19.104 12 18 12Z",
    ],
    symbols: [
        "M16 4.001C14.406 4.001 12.93 4.838 12 6.081C11.07 4.838 9.594 4.001 8 4.001C5.243 4.001 3 6.244 3 9.001C3 14.492 11.124 19.633 11.471 19.849C11.633 19.95 11.817 20.001 12 20.001C12.183 20.001 12.367 19.95 12.529 19.849C12.876 19.633 21 14.492 21 9.001C21 6.244 18.757 4.001 16 4.001V4.001Z",
    ],
    flags: [
        "M20 6.002H14V3.002C14 2.45 13.553 2.002 13 2.002H4C3.447 2.002 3 2.45 3 3.002V22.002H5V14.002H10.586L8.293 16.295C8.007 16.581 7.922 17.011 8.076 17.385C8.23 17.759 8.596 18.002 9 18.002H20C20.553 18.002 21 17.554 21 17.002V7.002C21 6.45 20.553 6.002 20 6.002Z",
    ],
};


function getEmojiDatas() {
    const emojiDatas = require("@/assets/twemoji/datas/all.json");
    let index = 0;
    for (const [i, [key, subgroup]] of Object.entries(Object.entries(emojiDatas))) {
        const emojis = Object.values(subgroup).flat();

        emojiDatas[key] = { 
            emojis : emojis,
            svgPathIcon : Object.values(svgPathsGroupIcon)[i],
            hide : false,
            name : key,
            length : emojis.length 
        };

        for (let ii=0; ii<emojiDatas[key].emojis.length; ii++) emojiDatas[key].emojis[ii].index = index++;
    }
    return emojiDatas;
}


const emojiDatas = getEmojiDatas();



function getIndexedEmojiDatas(){
    let indexedEmojiDatas = [];
    for (const index in emojiDatas) 
        indexedEmojiDatas = [...indexedEmojiDatas, ...emojiDatas[index].emojis];

    return indexedEmojiDatas;
}



export default {
    name: "EmojiPanel",
    data: function() {
        return {
            actived: "Emoji",
            activeGroup: 0,
            activeEmoji: 0,
            filterValue: '',
            skin : '',
            emojisData: emojiDatas,
            indexesColor : require("@/assets/twemoji/datas/indexesColor.json"),
            indexedEmojis: getIndexedEmojiDatas(),
            svgPathsGroupIcon: Object.values(svgPathsGroupIcon)
        };
    },
    computed: {
        getFilteredEmojis(){
            let emojisDataFiltered = JSON.parse(JSON.stringify(this.emojisData)); 


            if(this.filterValue == '') return emojisDataFiltered;
            else{
                for (const key in emojisDataFiltered){

                    emojisDataFiltered[key].emojis = emojisDataFiltered[key].emojis.filter(emojiData => {
                        if(emojiData.shortCode == null) return false
                        if(emojiData.shortCode.search(this.filterValue) == -1) return false
                        return true;
                    }) 
                }
            }
            return emojisDataFiltered
        }
    },
    methods: {
        aze: function(actived) {
            this.actived = actived;
        },
        hide: function(index) {
            this.emojisData[index].hide = !this.emojisData[index].hide;
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
        getPositionBackgroundEmoji(indexEmoji){
            const nbPerLine = 42; 
            const x = indexEmoji%nbPerLine*-32;
            const y = Math.trunc(indexEmoji/nbPerLine)*-32;
            return `${x}px ${y}px`;
        },
        updateActiveEmoji(index){
           this.activeEmoji = index; 
        },
        updateFilterValue(value){
            console.log(value)
            this.filterValue = value;
        },
        updateSkinColor(skin){
            let emojisDataUpdated = JSON.parse(JSON.stringify(this.emojisData));
            let index = 0;
            for (const i in emojisDataUpdated) {
                for (const j in emojisDataUpdated[i]) {
                    for (let k = 0; k < emojisDataUpdated[i][j].length; k++) {

                        const emoji = emojisDataUpdated[i][j][k];
                        if(indexesColor.includes(index++)){
                            emojisDataUpdated[i][j][k].push(skin)
                        }

                    }
                }
            }
            this.skin = skin;
            this.emojisData = emojisDataUpdated;
        }
    },
    components: {
        EmojiPanelSearch,
        EmojiPanelNav,
        EmojiPanelCategorie,
    }
};
</script>

<style lang="scss">
.emoji-panel {
    width: 425px;
    border-radius: 7px;
    overflow: hidden;
    background-color: $grey-32;
    color: $grey-193;

    &__top {
        padding: 17px 19px;
        position: relative;
    }

    &__main {
        display: flex;
        height: 346px;
    }

    &__container {
        flex: 1;
    }

    &__emojis {
        background-color: #202020;
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
            background-color: $grey-21;
            border-radius: 30px;
        }
    }

    &__caption {
        height: 47px;
        background-color: $grey-25;
        display : flex;
        align-items: center;
        gap : 8px;
        padding : 8px;
    }

    &__caption-emoji {
        width : 32px;
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
        background-color: $grey-32;
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
        &--active{
            background-color : $grey-89;
        }
    }
}

.emoji-btn {
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    vertical-align: bottom;
    &__thumb {
        background-image : url('~@/assets/twemoji/all.png');
        background-size: calc(100%*42);
        @include setSize(32px)
    }
}
</style>

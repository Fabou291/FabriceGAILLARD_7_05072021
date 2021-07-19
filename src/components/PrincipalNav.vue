<template>
    <div class="sidebar">
        <div class="sidebar__content">
            <div class="user">
                <div class="user__representation">
                    <div class="user__avatar avatar">
                        <img class="avatar__thumb" src="@/assets/imageProfil.png" alt="image de profil" />
                        <div class="avatar__circle"></div>
                    </div>
                    <button class="user__statu user__statu--online"></button>
                </div>

                <div class="user__identifying">
                    <div class="user__pseudo">Fab</div>
                    <div>#6452</div>
                </div>
                
                <button class="user__btn-setting">
                    <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        ></path>
                    </svg>
                </button>
            </div>

            <nav class="principal-nav">
                <ul>
                    <li class="channel-group" v-for="(group, i) in listGroup" :key="group">
                        <button class="channel-group__drop-down-btn" aria-expanded="true" @click="switchGroupVisibility(i)">
                            <dropDownIcon :visible="group.visible"/>
                            <span class="channel-group__title">{{ group.name }}</span>
                        </button>
                        <ul class="channel-group__list-channel" v-show="group.visible">
                            <li class="channel-group__list-item-channel" v-for="(channel, j) in group.listChannel" :key="channel" @click="update(i,j)">
                                <router-link class="btn-link" :class="{ 'btn-link--active' : j == activeChannel && i == activeGroup }" :to="channel.link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" >
                                        <path
                                            fill="currentColor"
                                            d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                        ></path>
                                    </svg>
                                    <span>{{ channel.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import dropDownIcon from "@/components/dropDownIcon.vue"
export default {
    components : {
        dropDownIcon
    },
    data(){
        return{
            activeChannel : 0,
            activeGroup : 0,
            listGroup : [
                {
                    name : 'Group 1',
                    visible : true,
                    listChannel : [ 
                        {
                            name : 'Channel 1',
                            link : '#'
                        },
                        {
                            name : 'Channel 2',
                            link : '#'
                        },
                        {
                            name : 'Channel 3',
                            link : '#'
                        },
                    ]
                },
                {
                    name : 'Group 1',
                    visible : true,
                    listChannel : [ 
                        {
                            name : 'Channel 1',
                            link : '#'
                        },
                        {
                            name : 'Channel 2',
                            link : '#'
                        },
                        {
                            name : 'Channel 3',
                            link : '#'
                        },
                    ]
                }
            ]
        }
    },
    methods : {
        update(groupIndex,channelIndex){
            this.activeChannel = channelIndex;
            this.activeGroup = groupIndex;
        },
        switchGroupVisibility(groupIndex){
            this.listGroup[groupIndex].visible = !this.listGroup[groupIndex].visible;
        }
    }
};
</script>

<style lang="scss">
.user {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    font-size: 15px;
    border-radius: 4px 0 0 4px;

    &:hover {
        background-color: $grey-32;
    }

    &__representation {
        position: relative;
    }

    &__statu {
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: 0;
        border-radius: 20px;
        width: 18px;
        height: 18px;
        border: 4px solid $grey-21;
        background-color: $grey-89;

        &--online {
            background-color: $green;
        }
    }

    &__btn-setting {
        color: $grey-142;
        padding: 8px;
        box-sizing: content-box;
        margin: 0 10px;
        &:hover {
            color: lighten($grey-142, 10);
        }
        svg {
            vertical-align: bottom;
        }
    }

    &__identifying {
        align-self: flex-end;
        flex: 1;
        padding: 4px;
    }

    &__pseudo {
        color: $green;
        @include setCircularStdFont("Bold");
    }
}

.avatar {
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px;

    &__thumb {
        position: relative;
        z-index: 1;
        width: 38px;
        height: 38px;
        border-radius: 60px;
        border: 2px solid $grey-21;
        box-sizing: content-box;
        cursor: pointer;
        &:hover {
            + .avatar__circle {
                transform: scale(1);
            }
        }
    }
    &__circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 60px;
        background-color: $green;
        transform: scale(0.8);
        transition: transform 0.1s;
    }
}

.principal-nav {
    padding: 0 15px;
}

.channel-group {
    color: $grey-142;
    padding-top: 15px;

    &__drop-down-btn {
        @include setCircularStdFont("Bold");
        padding: 9px 0;
        width: 100%;
        text-align: left;
        display: inline-flex;
        align-items: center;
        transition: color 0.1s;
        &:hover {
            color: $grey-193;
        }
    }

    &__title {
        text-transform: uppercase;
        padding: 0 0 0 5px;
    }

    &__list-item-channel {
        margin: 0 0 2px 0;
    }
}

.btn-link {
    display: flex;
    align-items: center;
    gap : 8px;
    padding: 5px 10px;
    color: inherit;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.1s, color 0.1s;
    &:hover {
        color: $grey-193;
        background-color: $grey-32;
    }
    &--active {
        background-color: $grey-47;
        color: white;
        @include setCircularStdFont("Bold");
        &:hover {
            background-color: $grey-47;
            color: white;
        }
    }
}
</style>

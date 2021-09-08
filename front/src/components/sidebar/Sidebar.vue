<template>

    <aside class="sidebar" :class="{'sidebar--active' : visible}" @click="switchVisibility">
        <div class="sidebar__container" @click.stop="">
            <div class="user">
                <div class="user__representation">
                    <Avatar class="user__avatar" @click="openConfigDisplay()" :user="{ username : user.username, avatar : `http://localhost:3000/images/${user.avatar}` }" />
                    <BtnUserStatu class="user__statu" />
                </div>

                <div class="user__identifying">
                    <div class="user__pseudo">{{ user.username }}</div>
                    <div class="user__id">#{{ user.id }}</div>
                </div>
                
                <button type="button" class="user__btn-setting" @click="openConfigDisplay()" aria-label="Ouvrir la panneau de configuration du channel" >
                    <svg aria-hidden="false" class="user__btn-setting-icon" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        ></path>
                    </svg>
                </button>
            </div>
            <div id="sidebarContent"  class="sidebar__content">
                <nav class="principal-nav">
                    <ul class="sidebar__list">
                        <ChannelGroup class="sidebar__list-item" v-for="(group,i) in listGroup" :key="group" :group="{...group, index : i}" />
                    </ul>
                </nav>
            </div>            
        </div>
    </aside>
    
</template>

<script>
import ChannelGroup from "@/components/sidebar/ChannelGroup.vue"
import BtnUserStatu from "@/components/btn/BtnUserStatu.vue"
import Avatar from '@/components/Avatar.vue';
import { mapActions, mapState } from 'vuex';

export default {
    components : {
        ChannelGroup,
        BtnUserStatu,
        Avatar
    },
    data(){
        return{
            activeChannel : 0,
            activeGroup : 0,
        }
    },
    computed : {
        ...mapState('sidebarModule', ['listGroup', 'visible']),
        ...mapState('userModule',['user']),
    },
    methods : {
        ...mapActions('sidebarModule',['setListGroup','switchVisibility']),
        ...mapActions('userModule',['openConfigDisplay']),
        
        /**
         * @name redirectToFirstChannel
         * @description Redirige vers le premier channel de la liste
         */
        redirectToFirstChannel(){
            const listChannel = this.listGroup.reduce( (a, group) => a = [...a, ...group.listChannel], [] );
            if(listChannel.length > 0){
                this.$router.push({
                    name : 'Channel',
                    params: { id: listChannel[0].id }
                })                   
            }
        }
    },
    async created() {
        await this.setListGroup();
        if(this.$route.name == "Home") this.redirectToFirstChannel();
    },

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
    padding : 0 15px;

    &__avatar{
        border-color : $grey-21;
    }

    &__representation {
        position: relative;
    }

    &__statu{
        position: absolute !important;
        border-color : $grey-21;
        z-index: 1;
        bottom: 0;
        right: 0;
    }

    &__btn-setting {
        color: $grey-142;
        padding: 8px 4px 8px 8px;
    }

    &__btn-setting-icon {
        transition : transform 0.2s;
        transform : rotate(0deg);
        &:hover {
            color: lighten($grey-142, 10);
            transform : rotate(90deg)
        }
    }

    &__identifying {
        align-self: flex-end;
        flex: 1;
        padding: 4px;
        overflow: hidden;
    }

    &__pseudo {
        @include setCircularStdFont("Bold");
        @include textEllipsis();
    }
    &__id {
        color : grey;
    }
}



.principal-nav {
    width : 100%;
    padding: 0 15px;

    
}


</style>

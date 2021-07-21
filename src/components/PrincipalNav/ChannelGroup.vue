<template>
    <li class="channel-group">
        <div class="channel-group__label">
            <button class="channel-group__drop-down-btn" aria-expanded="true" @click="switchVisibility()">
                <DropDownIcon :visible="visible" />
                <span class="channel-group__title">{{ group.name }}</span>
            </button>

            <ButtonPopUp :label="'Ajouter un groupe'">
                <AddIcon class="" />
            </ButtonPopUp>
                       
        </div>

        <ul class="channel-group__list-channel" v-show="visible">
            <li
                class="channel-group__list-item-channel"
                v-for="(channel, j) in group.listChannel"
                :key="channel"
                @click="activeThisChanel(j)"
            >
                <router-link
                    class="btn-link"
                    :class="{ 'btn-link--active': j == activeChannel && i == activeGroup }"
                    :to="channel.link"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24">
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
</template>

<script>
import DropDownIcon from "@/components/DropDownIcon.vue";
import AddIcon from "@/components/AddIcon.vue";
import ButtonPopUp from "@/components/ButtonPopUp.vue";
export default {
    components: {
        DropDownIcon,
        AddIcon,
        ButtonPopUp
    },
    data() {
        return {
            visible: true,
        };
    },
    props: {
        group: { type: Object, required: true },
    },
    methods: {
        activeThisChanel(channelIndex) {
            this.$emit("updateActiveChannel", channelIndex);
        },
        switchVisibility() {
            this.visible = !this.visible;
        },
    },
};
</script>

<style lang="scss">
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

    &__label {
        display: flex;
        align-items: center;
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
    gap: 8px;
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

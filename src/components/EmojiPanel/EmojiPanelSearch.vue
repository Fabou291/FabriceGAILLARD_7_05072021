<template>
    <form class="form-emoji">
        <div class="form-emoji__search-bar">
            <div class="form-emoji__field" :class="{ 'form-emoji__field--active': value }">
                <input
                    class="form-emoji__input"
                    type="text"
                    name="searchEmoji"
                    :placeholder="placeholder"
                    id="searchEmoji"
                    v-model="value"
                />

                <button type="button" class="form-emoji__btn" v-show="!value">
                    <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                        ></path>
                    </svg>
                </button>

                <button type="button" class="form-emoji__btn" v-show="value" @click="deleteValue">
                    <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                        ></path>
                    </svg>
                </button>
            </div>

        </div>
    </form>
</template>

<script>
export default {
    name: "EmojiPanelSearch",
    data: function() {
        return {
            value: null,
        };
    },
    props: {
        placeholder: { type: String, required: true },
    },
    methods: {
        deleteValue() {
            this.value = null;
        },
    },
};
</script>

<style lang="scss">
.form-emoji {
    padding: 0px 19px 17px 19px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 1px;
    &__search-bar {
        display: flex;
        align-items: center;
    }

    &__chooses {
       display: flex;
    }

    &__field {
        display: flex;
        flex : 1;
        align-items: center;
        background-color: $grey-21;
        border-radius: 4px;
        color: $grey-127;
        width: 100%;

        &--active {
            color: $grey-193;
        }
    }

    &__input {
        padding: 10px 13px;
        flex: 1;
        border-radius: 4px;
        &::placeholder {
            color: $grey-127;
        }
        &:focus {
            outline: none;
        }
    }
    &__btn {
        padding: 0 10px 0 10px;
        svg {
            vertical-align: bottom;
        }
    }
}
</style>

<template>
    <div class="avatar">
        <img class="avatar__thumb" :src="user.avatar" :alt="'image de profil de' + user.username" />
        <div class="avatar__circle" ></div>
    </div>
</template>

<script>
    export default {
        props : {
            user : { type : Object, required : true}
        }
    }
</script>

<style lang="scss">
    .avatar {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 4px;

        &__thumb {
            position: relative;
            z-index: 1;
            width: 38px;
            height: 38px;
            border-radius: 60px;
            border: 2px solid;
            border-color : inherit;
            box-sizing: content-box;
            cursor: pointer;
            background-color : black;
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
            background-color: $primary;
            transform: scale(0.7);
            transition: transform 0.1s;
        }
    }
</style>
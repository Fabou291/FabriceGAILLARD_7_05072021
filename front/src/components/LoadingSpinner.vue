!<template>
    <div class="loading-spinner" > <!--v-if="pagination.inProgress"-->
        <div class="loading-spinner__dot"></div>
        <div class="loading-spinner__dot"></div>
        <div class="loading-spinner__dot"></div>
    </div>
</template>

<style lang="scss">
    $anim-speed: 0.5s;
    $dot-size: 10px;
    .loading-spinner{
        display :flex;
        justify-content : center;
        padding : 20px 0;

        &__dot {
            width: $dot-size;
            height: $dot-size;
            border: ($dot-size / 5) solid $success;
            border-radius: 50%;
            margin: 0 ($dot-size / 2);
            transform: scale(0);
            animation : bubble $anim-speed ease infinite;

            &:nth-child(2) {
                animation : bubble $anim-speed ease infinite  $anim-speed * 1/3;
            }
            &:nth-child(3) {
                animation : bubble $anim-speed ease infinite  $anim-speed * 2/3;
            }
        }
    }
</style>
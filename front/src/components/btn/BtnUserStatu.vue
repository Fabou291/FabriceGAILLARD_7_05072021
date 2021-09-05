<template>
    <div class="statu-panel">
        <button type="button" class="statu-btn statu-btn--online" aria-label="Changer de statu"></button>
        <div class="statu-panel__list" v-show="visible">
            <div class="statu-panel__list-item">
                <div class="statu-btn statu-btn--online"></div>
                <span>En ligne</span>
            </div>
            <hr/>
            <div class="statu-panel__list-item">
                <div class="statu-btn statu-btn--absent"></div>
                <span>Absent</span>
            </div>
            <div class="statu-panel__list-item">
                <div class="statu-btn statu-btn--disturb"></div>
                <span>Ne pas déranger</span>
            </div>
            <div class="statu-panel__list-item">
                <div class="statu-btn statu-btn--unvisible"></div>
                <span>Invisible</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            visible : false,
            status : [ 'online', 'absent', 'disturb', 'unvisible' ]  
        }
    }
};
</script>

<style lang="scss">

.statu-panel{
    border-radius: 4px;

    hr{
        border-color : $grey-47;
        margin: 0;
    }

    &__list{
        font-size : 12px;
        color : $grey-142;
        padding : 12px;
        position: absolute;
        width: 220px;
        z-index : 2;
        
        background-color : $grey-11;

    }

    &__list-item{
        display: flex;
        align-items: center;
        gap : 8px;
        padding : 11px 0;
        border-color : $grey-11;
    }
}

$listStatusColors : (
    online : $green,
    absent : $orange,
    disturb : $red,
    unvisible : $grey-89
);

.statu-btn {
    border-radius: 20px;
    min-width: 18px;
    height: 18px;
    border: 4px solid black;
    border-color: inherit;
    background-color: $grey-89;

    @each $statu, $color in $listStatusColors {
        &--#{$statu} {
            background-color: $color;
        }
    }
}
</style>

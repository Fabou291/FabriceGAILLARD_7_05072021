<template>
    <div>
        <select name="" id="">
            <option value="" v-for="unicode in handsUnicode" :key="unicode">
                <div class="" :style="'background-image: url(' + getUrl(unicode) + ');'"></div>
            </option>
        </select>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            handsUnicode: ["1f44f", "1f44f-1f3fb", "1f44f-1f3fc", "1f44f-1f3fd", "1f44f-1f3fe", "1f44f-1f3ff"],
        };
    },
    computed: {
        getUrl(unicode) {
            return require("@/assets/twemoji/svg/" + unicode + ".svg");
        },
    },
};
</script>

<style lang="scss"></style>

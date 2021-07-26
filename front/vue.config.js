module.exports = {
    css: {
        loaderOptions: {
          sass: {
            prependData: `
              @import "@/sass/utils/_variables.scss";
              @import "@/sass/utils/_mixins.scss";
            `
          }
        }
    }
}
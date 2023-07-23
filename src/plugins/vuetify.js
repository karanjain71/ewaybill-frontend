import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
// VBtn.options.props.ripple.default = false;
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        hoverPrimary: "#DCE9F8",
        primary: "#188CD8",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
      dark: {},
    },
    components: {
      VBtn: {
        defaultProps: {
          outlined: true,
        },
      },
    },
    light: true,
  },
});

export default vuetify;

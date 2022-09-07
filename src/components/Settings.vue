<template>
  <div class="settings">
    <div class="settings_header">
      <span>Settings</span
      ><Close
        :aria-disabled="true"
        class="settings_header__close"
        :class="{ close_disabled: citiesList.length === 0 }"
        @click="citiesList.length > 0 && setDataFromLocalStorage()"
      />
    </div>
    <Search />
    <CitiesList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { cities } from "../../public/world-cities_json";
import Search from "./Search.vue";
import CitiesList from "./CitiesList.vue";
import Close from "./svg/Close.vue";

export default defineComponent({
  props: {
    userCity: {
      type: Object,
    },
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapMutations({
      setFirstStart: "setFirstStart",
      addCity: "cities/addCity",
    }),
    setDataFromLocalStorage() {
      localStorage.setItem("cities", JSON.stringify(this.citiesList));
      this.setFirstStart(false);
    },
    setFirstCity() {
      const firstCity = cities.filter(
        (el) =>
          el.name === this.userCity?.city &&
          el.country[0] === this.userCity?.country[0]
      )[0];
      this.addCity({
        city: firstCity.name,
        country: firstCity.country,
        id: firstCity.geonameid,
      });
    },
  },
  computed: {
    ...mapState("cities", ["citiesList"]),
  },
  mounted() {
    this.setFirstCity();
  },
  components: { Search, CitiesList, Close },
});
</script>

<style scoped lang="scss">
.settings {
  width: 300px;
  height: 300px;
  overflow: hidden;
  background: #e0e0e0;
  padding: 10px 5px 5px;
  position: relative;
  box-shadow: 0px 34px 101px rgba(9, 0, 63, 0.38);
  border-radius: 20px;

  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 10px;
    font-size: 14px;
    color: rgb(88, 88, 88);

    &__close {
      position: absolute;
      top: 5px;
      right: 15px;
      fill: rgb(88, 88, 88);
      &:hover {
        cursor: pointer;
        fill: rgb(61, 61, 61);
      }
    }
  }
  .close_disabled {
    fill: rgb(189, 189, 189);
    cursor: no-drop;
  }
}
</style>

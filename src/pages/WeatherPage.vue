<template>
  <div class="wrapper">
    <div>
      <Settings v-if="isSettingsVisible === true" :user-city="firstCity" />
      <div v-else class="items">
        <WeatherItem
          v-for="item in cities"
          :cityName="item.city"
          :key="item.id"
          @openSettings="openSettings"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Settings from "../components/Settings.vue";
import WeatherItem from "@/components/WeatherItem.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import { ICity } from "@/store/citiesModule";

export default defineComponent({
  components: { Settings, WeatherItem },
  data: () => {
    return {
      isSettingsVisible: {},
      cities: [] as ICity[],
      firstCity: {},
    };
  },
  methods: {
    ...mapMutations({
      setFirstStart: "setFirstStart",
    }),
    openSettings() {
      this.isSettingsVisible = true;
    },
    getDataFromLocalStorage() {
      if (localStorage.getItem("cities")) {
        this.setFirstStart(false);
        this.cities = JSON.parse(localStorage.getItem("cities") || "");
      } else {
        this.getLocationUser();
      }
    },
    async getLocationUser() {
      try {
        const response = await axios.get(
          `https://ipinfo.io/json?token=${process.env.VUE_APP_IP_INFO_TOKEN}`
        );
        this.firstCity = {
          city: response.data.city,
          country: response.data.country,
        };
        this.cities.push({
          city: response.data.city,
          country: response.data.country,
          id: 1,
        });
      } catch (e) {
        this.cities.push({
          city: "Rostov-na-Donu",
          country: "Russia",
          id: 1,
        });
        this.firstCity = {
          city: "Rostov-na-Donu",
          country: "Russia",
        };
      }
    },
  },
  computed: {
    ...mapState(["isFirstStart"]),
  },
  mounted() {
    this.getDataFromLocalStorage();
  },
  watch: {
    isFirstStart() {
      this.getDataFromLocalStorage();
      this.isSettingsVisible = false;
    },
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 700px;
}
</style>

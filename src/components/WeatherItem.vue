<template>
  <div>
    <div class="item item_loader" v-if="isLoading" />
    <div class="item item_error" v-else-if="isError">
      <span>No weather data </span>
    </div>
    <div v-else class="item" :class="{ item_night: isNight }">
      <Gear
        class="item_settings"
        :class="{ item_settings__night: isNight }"
        @click="openSettings"
        v-if="isFirstStart === true"
      />
      <div class="item_content">
        <h1 class="item_content__city">
          {{ weatherData?.name }}, {{ weatherData?.sys?.country }}
        </h1>
        <div class="item_content__weather">
          <img
            class="weather_img"
            :src="require(`../assets/img/${weatherData?.weather[0].icon}.svg`)"
          />
          <div class="weather_main">
            <span
              class="weather_main__temp"
              :class="{ weather_main__night: isNight }"
              >{{ Math.round(weatherData?.main?.temp) }}°</span
            >
            <span class="weather_main__description"
              >{{ weatherData?.weather[0].description[0].toUpperCase()
              }}{{ weatherData?.weather[0].description.slice(1) }}</span
            >
          </div>
        </div>
        <div class="item_content__info">
          <div class="info_block" :class="{ info_block__night: isNight }">
            <Wind />
            <span>{{ Math.round(weatherData?.wind?.speed) }} km/h</span>
          </div>
          <div class="info_block" :class="{ info_block__night: isNight }">
            <Humidity />
            <span> {{ weatherData?.main?.humidity }} %</span>
          </div>
          <div class="info_block" :class="{ info_block__night: isNight }">
            <Temp class="info_block__temp" />
            <span>
              <span>
                {{ Math.round(weatherData?.main?.feels_like) }}°C</span
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Gear from "./svg/Gear.vue";
import Wind from "./svg/Wind.vue";
import Humidity from "./svg/Humidity.vue";
import Temp from "./svg/Temp.vue";

export default defineComponent({
  name: "WeatherItem",
  emits: ["openSettings"],
  props: {
    cityName: {
      required: true,
    },
  },
  data: () => {
    return {
      weatherData: {} as {
        main: { temp: number; humidity: number; feels_like: number };
        name: string;
        sys: { country: string };
        wind: { speed: number };
        weather: { icon: string; description: string }[];
      },
      isError: false,
      isLoading: true,
      isNight: false,
    };
  },
  methods: {
    openSettings() {
      this.$emit("openSettings");
    },
    async fetchWeather() {
      try {
        const response = await axios.get(
          "http://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              units: "metric",
              q: this.cityName,
              appid: process.env.VUE_APP_OPEN_WEATHER_APP_ID,
            },
          }
        );
        if (response.data.weather[0].icon.slice(-1) === "n") {
          this.isNight = true;
        }
        console.log("res", response.data);
        this.weatherData = response.data;
      } catch (e) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapState(["isFirstStart"]),
  },
  mounted() {
    this.fetchWeather();
  },
  components: { Gear, Wind, Humidity, Temp },
});
</script>

<style lang="scss" scoped>
.item {
  width: 300px;
  height: 300px;
  background: #c9e5ff;
  padding: 30px 40px 40px;
  position: relative;
  box-shadow: 0px 34px 101px rgba(9, 0, 63, 0.38);
  border-radius: 20px;
  color: #658caf;
  &_error {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #1f2e54;
  }
  &_loader {
    overflow: hidden;
    background: rgb(202, 202, 202);
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: -150px;
      top: 0;
      height: 100%;
      width: 150px;
      background: linear-gradient(
        to right,
        transparent 0%,
        #e8e8e8 50%,
        transparent 100%
      );
      animation: load 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  &_night {
    background: #1f2e54;
    color: #6e85c1;
  }
  &_settings {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 10px;
    fill: #296399;
    &__night {
      fill: white;
    }
  }
  &_content {
    &__city {
      font-size: 18px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__weather {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: space-between;
    }
    &__info {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      align-items: center;
      margin-top: 20px;
      height: 60px;
    }
  }
}

@keyframes load {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}

.weather {
  &_img {
    width: 130px;
    height: 130px;
    position: relative;
    left: -15px;
  }
  &_main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__temp {
      font-size: 50px;
      font-weight: 600;
      background: linear-gradient(
        180deg,
        #296399 54.68%,
        rgba(255, 255, 255, 0) 187.46%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &__night {
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 187.46%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &_description {
      font-size: 18px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.info {
  &_block {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    & svg {
      fill: #296399;
    }
    &__night {
      & svg {
        fill: white;
      }
    }
    &__temp {
      position: relative;
      top: -2px;
      left: 0;
    }
  }
}
</style>

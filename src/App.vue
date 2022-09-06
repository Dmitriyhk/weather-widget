<template>
  <WeatherPage />
</template>

<script>
import WeatherPage from "@/pages/WeatherPage";

export default {
  components: { WeatherPage },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Public+Sans:wght@200;400;600&display=swap");

* {
  font-family: "Public Sans", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

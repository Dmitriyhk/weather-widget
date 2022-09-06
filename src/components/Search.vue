<template>
  <div class="search">
    <SearchIcon class="search_icon" />
    <input
      class="search_input"
      v-model="search"
      type="text"
      placeholder="Search..."
    />
    <div
      v-show="searchCity.length > 0 && search.length > 0"
      class="search_hints"
    >
      <button
        class="search_hints__hint"
        @click="updateCity(sData.name, sData.country, sData.geonameid)"
        :key="sData.geonameid"
        v-for="sData in searchCity"
      >
        {{ sData.name }}, {{ sData.country }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { cities } from "../../public/world-cities_json";
import SearchIcon from "./svg/SearchIcon.vue";
export default defineComponent({
  data: () => {
    return {
      search: "",
    };
  },
  methods: {
    ...mapMutations({
      addCity: "cities/addCity",
    }),
    updateCity(city: string, country: string, id: number) {
      const newCity = { city, country, id };
      this.addCity(newCity);
      this.search = "";
    },
  },
  computed: {
    searchCity() {
      return cities
        .filter((el) =>
          el.name.toLowerCase().startsWith(this.search.toLowerCase())
        )
        .slice(0, 6);
    },
  },
  components: { SearchIcon },
});
</script>

<style scoped lang="scss">
.search {
  position: relative;
  margin: 0 5px;
  &_input {
    width: 100%;
    font-size: 14px;
    padding: 6px 0 4px 35px;
    outline: none;
    border: none;
    background: rgb(178, 178, 178);
    border-radius: 8px;
    color: rgb(0, 0, 0);
    caret-color: black;
    &::placeholder {
      color: rgb(246, 246, 246);
    }
  }
  &_icon {
    position: absolute;
    top: 6px;
    left: 10px;
  }
  &_hints {
    top: 30px;
    left: 0;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-radius: 8px;
    background: rgb(178, 178, 178);
    z-index: 1;
    padding: 10px 0;
    &__hint {
      font-size: 14px;
      cursor: pointer;
      border: none;
      border-bottom: 1px solid rgb(219, 219, 219);
      background: none;
      text-align: start;
      padding: 5px;
      color: rgb(0, 0, 0);
    }
  }
}
</style>

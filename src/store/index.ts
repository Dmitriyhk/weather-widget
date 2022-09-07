import { createStore, StoreOptions } from "vuex";
import { citiesModule } from "./citiesModule";

export default createStore({
  state: {
    isFirstStart: true,
  },
  mutations: {
    setFirstStart(state, bool) {
      state.isFirstStart = bool;
    },
  },
  modules: {
    cities: citiesModule,
  },
} as StoreOptions<{ isFirstStart: boolean }>);

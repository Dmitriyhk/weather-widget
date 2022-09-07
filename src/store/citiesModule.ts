export interface ICity {
  id: number;
  city: string;
  country: string;
}

export const citiesModule = {
  state: () => ({
    citiesList: [] as ICity[],
  }),
  mutations: {
    addCity(state: { citiesList: ICity[] }, city: ICity) {
      console.log("city", city);
      console.log("state", state);
      state.citiesList = [
        city,
        ...state.citiesList.filter((el) => el.id !== city.id).slice(0, 3),
      ];
    },
    delCity(state: { citiesList: ICity[] }, index: number) {
      state.citiesList = [
        ...state.citiesList.slice(0, index),
        ...state.citiesList.slice(index + 1),
      ];
    },

    updateCities(state: { citiesList: ICity[] }, cities: ICity[]) {
      state.citiesList = cities;
    },
  },
  namespaced: true,
};

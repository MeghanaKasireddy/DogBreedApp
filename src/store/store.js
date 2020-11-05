import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    allBreedList: [],
    breedImages: [],
    subBreeds: [],
    subBreedImages: []
  },
  getters: {
    allBreedList: state => {
      return state.allBreedList;
    },
    breedImages: state => {
      return state.breedImages;
    },
    subBreeds: state => {
      return state.subBreeds;
    },
    subBreedImages: state => {
      return state.subBreedImages;
    }
  },

  mutations: {
    Fetch_Breeds(state, list) {
      state.allBreedList = list;
    },
    Set_Images(state, list) {
      state.breedImages = list;
    },
    Set_SubBreeds(state, list) {
      state.subBreeds = list;
    },
    Set_SubBreedImages(state, list) {
      state.subBreedImages = list;
    }
  },
  actions: {
    fetchBreeds({ commit }) {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then(response => {
          commit("Fetch_Breeds", response.data.message);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },

    fetchImages({ commit }, breed) {
      if (breed === "") {
        commit("Set_Images", []);
        commit("Set_SubBreeds", []);
        commit("Set_SubBreedImages", []);
      } else {
        axios
          .get(`https://dog.ceo/api/breed/${breed}/images`)
          .then(response => {
            commit("Set_Images", response.data.message);
          })
          .catch(error => {
            console.log(error.statusText);
          });
      }
    },

    fetchSubBreeds({ commit }, breed) {
      if (breed === "") {
        commit("Set_SubBreeds", []);
      } else {
        axios
          .get(`https://dog.ceo/api/breed/${breed}/list`)
          .then(response => {
            commit("Set_SubBreeds", response.data.message);
          })
          .catch(error => {
            console.log(error.statusText);
          });
      }
    },
    fetchSubBreedImages({ commit }, [breed, subBreed]) {
      axios
        .get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`)
        .then(response => {
          commit("Set_SubBreedImages", response.data.message);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    }
  }
});

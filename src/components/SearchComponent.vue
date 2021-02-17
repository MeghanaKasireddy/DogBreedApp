<template>
  <div class="search">
    <select v-model="inputValue" class="selectlist">
      <option value="" disabled selected hidden>Choose Breed</option>
      <option v-for="breed in breeds" :value="breed" :key="breed">
        {{ breed }}
      </option>
    </select>
    <b-button
      variant="info"
      :disabled="!inputValue"
      @click="selectBreed(inputValue)"
    >
      Search
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputValue: "",
      breeds: []
    };
  },
  mounted() {
    this.$store.dispatch("fetchImages", "");
    let array = this.$store.getters.allBreedList;
    this.getKeys(array);
  },
  methods: {
    getKeys(array) {
      if (array) {
        this.breeds = Object.keys(array);
      }
    },
    selectBreed(keys) {
      this.$router.push("/images/" + keys);
      this.inputValue = "";
    }
  },

  computed: mapGetters(["allBreedList"])
};
</script>

<style scoped>
.selectlist {
  height: 35px;
}
.search {
  padding-top: 10px;
}
</style>

<template>
  <div>
    <div class="heading">
      <h1>{{ $route.params.name | capitalise }} IMAGES</h1>
      <div v-if="subBreeds.length > 0">
        <b-dropdown text="SubBreeds" variant="info">
          <div v-for="s in subBreeds" :key="s">
            <b-dropdown-item @click="selectSubBreed($route.params.name, s)">
              {{ s }}
            </b-dropdown-item>
          </div>
        </b-dropdown>
      </div>
    </div>
    <br />

    <div v-if="subBreedImages.length > 0">
      <h4 class="subbreed">Images of {{ subBreed | capitaliseFirst }}</h4>
      <grid-layout
        :layout.sync="subBreedImages"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :margin="[5, 5]"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in subBreedImages" :key="item">
          <img class="image" :src="item" width="200" height="200" />
        </grid-item>
      </grid-layout>
    </div>

    <div v-else>
      <grid-layout
        :layout.sync="breedImages"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :margin="[5, 5]"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in breedImages" :key="item">
          <img :src="item" class="image" width="200" height="200" />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewImages",
  data() {
    return {
      subBreed: ""
    };
  },
  mounted() {
    this.$store.dispatch("fetchImages", "");
    this.$store.dispatch("fetchImages", this.$route.params.name);
    this.$store.dispatch("fetchSubBreeds", this.$route.params.name);
  },
  computed: mapGetters(["breedImages", "subBreeds", "subBreedImages"]),
  methods: {
    selectSubBreed(breed, subBreed) {
      this.subBreed = subBreed;
      this.$store.dispatch("fetchSubBreedImages", [breed, subBreed]);
    }
  },
  filters: {
    capitalise(value) {
      return value.toUpperCase();
    },
    capitaliseFirst(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.image {
  padding: 10px 10px;
  border-radius: 2rem;
}
.image:hover {
  transform: scale(1.2);
}
.head {
  display: inline;
  padding: 10px;
}
.heading {
  padding-top: 30px;
  padding-right: 10px;
}
.subbreed {
  font-weight: bold;
}
</style>

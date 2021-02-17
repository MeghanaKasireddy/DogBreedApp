<template>
  <div>
    <br />
    <h4 style="padding-left:10px">Welcome to Dog Breed App!</h4>
    <p style="padding-left:10px">
      Here are some sample images of each breed ,Select any breed to view more images of the Specific Breed
    </p>
    <grid-layout
      :layout.sync="allBreedList"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(value, keys) in allBreedList"
        :key="keys"
        @click="navigate(keys)"
      >
        <DisplayImage :name="keys" class="image"></DisplayImage>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import DisplayImage from "./DisplayImage";
import { mapGetters } from "vuex";

export default {
  name: "BreedList",
  components: {
    DisplayImage
  },
  computed: mapGetters(["allBreedList"]),

  methods: {
    navigate(keys) {
      this.$router.push("/images/" + keys);
    }
  }
};
</script>

<style scoped>
.image {
  display: inline-block;
  margin: 20px;
  cursor: pointer;
}
.image:hover {
  transform: scale(1.2);
  font-weight: bold;
}
</style>

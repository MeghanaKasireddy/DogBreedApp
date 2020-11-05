<template>
  <div>
    <img :src="image" width="210px" height="210px" />
    <div>
      {{ name | capitalise }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DisplayImage",
  props: ["name"],
  data() {
    return {
      image: ""
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    getImage() {
      axios
        .get(`https://dog.ceo/api/breed/${this.name}/images/random`)
        .then(response => {
          this.image = response.data.message;
        });
    }
  },
  filters: {
    capitalise(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>

</style>

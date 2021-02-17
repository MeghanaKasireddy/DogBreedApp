<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="success">
      <b-navbar-brand>Dog Breed Search App</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item align="right"
            ><router-link class="nav-link" to="/list"
              >Home</router-link
            ></b-nav-item
          >
          <b-nav-item align="right"
            ><router-link class="nav-link" to="/search"
              >Search</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped></style>

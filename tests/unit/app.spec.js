import { shallowMount, createLocalVue } from "@vue/test-utils";
import Router from "vue-router";
import app from "@/App";
import NavBar from "@/components/NavBar";

describe("In App Component", () => {
  let wrapper;
  let router = new Router(
    { path: "/list", name: "BreedList" },
    { path: "/images/:name", name: "ViewImages" },
    { path: "/search", name: "SearchComponent" },
    { path: "/", name: "default" }
  );

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Router);

    wrapper = shallowMount(app, {
      localVue,
      router
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is a Vue Instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("renders the correct tag", () => {
    expect(wrapper.html()).toContain('<div id="app">');
  });

  it("should have a div element with id=app", () => {
    expect(wrapper.attributes("id")).toBe("app");
  });

  describe("it should load navbar component", () => {
    it("it should have NavBar Component", () => {
      expect(NavBar).toBeTruthy();
    });

    it("it should have a navBar stub", () => {
      expect(wrapper.html()).toContain("<navbar-stub></navbar-stub>");
    });
  });
});

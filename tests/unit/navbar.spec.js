import { mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Router from "vue-router";
import NavBar from "@/components/NavBar.vue";

describe("In navbar component ", () => {
  let wrapper;
  var router = new Router();

  beforeEach(() => {
    const localVue = createLocalVue();
    Vue.config.ignoredElements = [
      "grid-layout",
      "grid-item",
      "b-navbar",
      "b-navbar-brand",
      "b-navbar-toggle",
      "b-collapse",
      "b-navbar-nav",
      "b-nav-item"
    ];
    localVue.use(Router);

    wrapper = mount(NavBar, {
      localVue,
      router
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is a vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('it should have b-navbar element with type="dark" ', () => {
    const byType = wrapper.find("b-navbar");
    expect(byType.attributes("type")).toBe("dark");
  });

  it('it should have a b-navbar-brand with text "Dog Breed"', () => {
    const text = wrapper.find("b-navbar-brand").text();
    expect(text).toMatch("Dog Breed Search App");
  });

  it("it should have nav-item with text Home", () => {
    const text = wrapper.find("b-nav-item").text();
    expect(text).toMatch("Home");
  });

  it("it should have a router-link with text home", () => {
    const text = wrapper.find("a").text();
    expect(text).toMatch("Home");
    const byhref = wrapper.find("a").attributes("href");
    expect(byhref).toMatch("/list");
  });
});

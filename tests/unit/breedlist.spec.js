import { shallowMount, createLocalVue } from "@vue/test-utils";
import BreedList from "@/components/BreedList.vue";
import DisplayImage from "@/components/DisplayImage.vue";
import Vuex from "vuex";
import Vue from "vue";

Vue.config.ignoredElements = ["grid-layout", "grid-item"];

const localVue = createLocalVue();
localVue.use(Vuex);
describe("In BreedList Component", () => {
  let wrapper;
  let getters;
  let store;
  var $router = {
    push: jest.fn()
  };
  beforeEach(() => {
    getters = { allBreedList: jest.fn() };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(BreedList, {
      localVue,
      store,
      mocks: {
        $router
      },
      computed: {
        allBreedList: () => {
          let list = ["hound"];
          return list;
        }
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it should have a welcome heading", () => {
    expect(wrapper.find("h4").text()).toEqual("Welcome to Dog Breed App!");
  });

  it("it should have paragraph tag", () => {
    expect(wrapper.find("p").text()).toEqual(
      "Here are some sample images of each breed ,Select any breed to view more images of the Specific Breed"
    );
  });

  it("it should have a grid layout , grid-item", () => {
    expect(wrapper.find("grid-layout").exists()).toBe(true);
    expect(wrapper.find("grid-item").exists()).toBe(true);
  });

  describe("it should load DisplayImage component", () => {
    it("it should have DisplayImage Component", () => {
      expect(DisplayImage).toBeTruthy();
    });

    it("it should have a DisplayImage stub", () => {
      expect(wrapper.find("displayimage-stub").exists()).toBe(true);
    });
  });

  it("it should call navigate() when clicked on grid-item", () => {
    wrapper.vm.navigate = jest.fn();
    wrapper.find("grid-item").trigger("click");
    expect(wrapper.vm.navigate).toHaveBeenCalled();
  });

  it(" when navigate() is called, it should push some string into route", () => {
    wrapper.vm.navigate("hound");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/images/hound");
  });
});

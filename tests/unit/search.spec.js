import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import router from "@/router/index.js";
import Router from "vue-router";
import SearchComponent from "@/components/SearchComponent.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);
describe("In Search Component", () => {
  let wrapper;
  let getters;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    getters = { allBreedList: jest.fn() };
    actions = { fetchImages: jest.fn() };
    state = { allBreedList: ["hound", "african"] };
    store = new Vuex.Store({
      getters,
      actions,
      state
    });

    wrapper = shallowMount(SearchComponent, {
      localVue,
      store,
      router,
      computed: {
        allBreedList() {
          return ["hound", "african"];
        }
      },
      data() {
        return {
          breeds: ["hound", "african"],
          inputValue: ""
        };
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is a Vue Instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("renders the correct tag", () => {
    expect(wrapper.html()).toContain('<div class="search">');
  });
  it("it should have a selectlist", () => {
    expect(wrapper.find("select")).toBeTruthy();
  });

  it("on selecting an option input value should change to selected option", () => {
    const options = wrapper.find("select").findAll("option");
    options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.text).toBe("hound");
    expect(wrapper.vm.inputValue).toBe("hound");
  });

  it("if we click the search button it should call selectBreed()", () => {
    wrapper.vm.inputValue = "hound";
    wrapper.vm.selectBreed = jest.fn();
    wrapper.find("b-button").trigger("click");
    expect(wrapper.vm.selectBreed).toHaveBeenCalled();
  });

  it("getKeys function should return keys of a json object", () => {
    let breedList = {
      hound: [],
      african: [],
      affenpinscher: ["boston", "english", "french"]
    };
    wrapper.vm.getKeys(breedList);
    expect(wrapper.vm.breeds).toStrictEqual([
      "hound",
      "african",
      "affenpinscher"
    ]);
  });

  it("when selectBreed function it should push new route into router", async () => {
    wrapper.vm.selectBreed("hound");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/images/hound");
  });
});

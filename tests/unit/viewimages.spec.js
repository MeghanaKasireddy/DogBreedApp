import { shallowMount, createLocalVue } from "@vue/test-utils";
import ViewImages from "@/components/ViewImages.vue";
import Vuex from "vuex";
import Vue from "vue";

Vue.config.ignoredElements = ["grid-layout", "grid-item"];

describe("In ViewImages Component", () => {
  let wrapper;
  let getters;
  let actions;
  let store;
  let state;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    (getters = {
      breedImages: jest.fn(),
      subBreeds: jest.fn(),
      subBreedImages: jest.fn()
    }),
      (actions = {
        fetchBreeds: jest.fn(),
        fetchImages: jest.fn(),
        fetchSubBreeds: jest.fn(),
        fetchSubBreedImages: jest.fn()
      });
    state = {
      allBreedList: [],
      breedImages: [],
      subBreeds: [],
      subBreedImages: []
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(ViewImages, {
      localVue,
      store,
      mocks: {
        $route: {
          params: { name: "affenpinscher" }
        },
        $store: {
          dispatch: jest.fn()
        }
      },
      computed: {
        breedImages() {
          return [];
        },
        subBreeds() {
          return [];
        },
        subBreedImages() {
          return [];
        }
      },
      filters: {
        capitalise: jest.fn()
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it should have a correct prop value", () => {
    expect(actions.fetchImages).toBeCalledTimes(2);
    expect(actions.fetchSubBreeds).toHaveBeenCalled();
    expect(state.subBreeds).toStrictEqual([]);
    expect(wrapper.vm.$route.params.name).toBe("affenpinscher");
  });

  it("it should have capitalise filter ", () => {
    const mockFilter = jest.spyOn(ViewImages.filters, "capitalise");
    const result = mockFilter("hound");
    expect(result).toBe("HOUND");
  });

  it("it should have capitaliseFirst filter ", () => {
    const mockFilter = jest.spyOn(ViewImages.filters, "capitaliseFirst");
    const result = mockFilter("hound");
    expect(result).toBe("Hound");
  });

  it("in select subBreed method", () => {
    wrapper.vm.$store.dispatch = jest.fn();
    wrapper.vm.selectSubBreed("hound", "afghan");
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalled();
    expect(wrapper.vm.subBreed).toBe("afghan");
  });
});

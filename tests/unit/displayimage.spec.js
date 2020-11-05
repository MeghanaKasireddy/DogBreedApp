jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: "" }))
}));

import { mount } from "@vue/test-utils";
import DisplayImage from "@/components/DisplayImage.vue";
import axios from "axios";

describe("In DisplayImage Component", () => {
  let wrapper;

  it("it should have a correct prop value", () => {
    wrapper = mount(DisplayImage, {
      propsData: {
        name: "affenpinscher"
      }
    });
    expect(wrapper.props().name).toBe("affenpinscher");
  });

  it("it should call getimage function", () => {
    const getImageMock = jest.spyOn(DisplayImage.methods, "getImage");
    wrapper = mount(DisplayImage, {
      propsData: {
        name: "affenpinscher"
      }
    });
    expect(getImageMock).toHaveBeenCalled();
  });

  it("Calls axios.get", () => {
    wrapper = mount(DisplayImage, {
      propsData: {
        name: "affenpinscher"
      }
    });
    expect(axios.get).toBeCalledWith(
      "https://dog.ceo/api/breed/affenpinscher/images/random"
    );
  });

  //   it("Calls axios.get and checks promise result", async () => {
  //     wrapper = mount(DisplayImage, {
  //         propsData: {
  //           name: 'affenpinscher'
  //         },
  //     });
  //     // const result = await wrapper.vm.getImage();
  //     // console.log(wrapper.vm.image);
  //     const response=DisplayImage.getImage();
  //     console.log(wrapper.vm.image);
  //     expect(response).toContain("affenpinscher");
  //   });
});

/* eslint-disable testing-library/no-debugging-utils */
import { shallow } from "enzyme";
import MeetupItem from "./MeetupItem";
import { useFavourites } from "../../providers/favourites-context/favourites-context-provider";


jest.mock("../../providers/favourites-context/favourites-context-provider", () => ({
  useFavourites: jest.fn(), 
}));

describe("<MeetupItem/>", () => {
  beforeEach(() => {
    useFavourites.mockReturnValue({
      favourites: [],
      addFavourite: jest.fn(),
      removeFavourite: jest.fn(),
      isFavourited: jest.fn(() => false), 
    });
  });

  it("<MeetupItem/> renders without crashing", () => {
    const wrapper = shallow(<MeetupItem data={{}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("<MeetupItem/> renders data correctly", () => {
    const data = {
      id: 1,
      title: "Test",
      image: "https://www.adams.es/blogs/alumno/files/2020/11/portada-test.jpg",
      address: "Test address",
      description: "Test description"
    }
    const wrapper = shallow(<MeetupItem data={data}/>);
    expect(wrapper.find('h3').text()).toEqual(data.title);
    expect(wrapper.find('img').prop('src')).toEqual(data.image);
    expect(wrapper.find('img').prop('alt')).toEqual(data.title);
    expect(wrapper.find('address').text()).toEqual(data.address);
    expect(wrapper.find('p').text()).toEqual(data.description);
  });
})


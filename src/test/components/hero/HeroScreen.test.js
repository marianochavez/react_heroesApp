import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe('HeroScreen test', () => {
  
    test('should do not show HeroScreen if hero does not exists', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )        
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
    });

    test('should show an heroe if exists', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )        

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('should return to previous screen', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        )        
        wrapper.find('button').simulate('click');
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test('should display No Hero Page if hero does not exists', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider1231321']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )        

        expect(wrapper.text()).toBe('No Hero Page');
    });
    
    
});

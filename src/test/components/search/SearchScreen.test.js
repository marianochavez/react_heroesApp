import {mount} from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('SearchScreen tests', () => {
  
    test('should display correctly', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <SearchScreen />
            </MemoryRouter>
        );  
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Busca un heroe!');
    });

    test('should display Batman and input queryString', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/?q=Batman']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper.find('input').prop('value')).toBe('Batman');
        expect(wrapper.find('.card-title').text().trim()).toBe('Batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('should display error if query doesnt exists', () => {
      
        const wrapper = mount(
            <MemoryRouter initialEntries={['/?q=Batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper.find('input').prop('value')).toBe('Batman123');
        expect(wrapper.find('.alert').text().trim()).toBe('No se encontro: Batman123');
    });
    
    test('should call navigate on the new screen', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'Batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });

        expect(mockNavigate).toHaveBeenCalledWith('?q=Batman');
    });

    
    
    
});

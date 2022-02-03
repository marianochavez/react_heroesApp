import {mount} from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import {Navbar} from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Navbar tests', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pepe',
            logged: true
        }
    }
  
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>                    
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Pepe');
    });

    test('should call logout, navigate and dispatch with arguments', () => {
      

        wrapper.find('button').prop('onClick')();
        // wrapper.find('button').simulate('click');

        expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout});
        expect(mockNavigate).toHaveBeenCalledWith('/login', {replace: true});


    });
    
    
});

import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import {AuthContext} from '../../auth/authContext';
import {PrivateRoute} from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>
}));

describe('PrivateRoute tests', () => {
  
    Storage.prototype.setItem = jest.fn();

    test('should display component if is authenticated and save it to localstorage', () => {
      
        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        // console.log(wrapper.debug());
        expect(wrapper.find('h1').text().trim()).toBe('Private Route');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    });
    
    test('should lock component if is not authenticated', () => {
        
        const contextValue = {
            user: {
                logged: false
            }
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper.find('span').text().trim()).toBe('Saliendo de aqui');
    });
    
    
});

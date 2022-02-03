import {mount} from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from "../../routers/AppRouter";

describe('AppRouter tests', () => {
  
    const contextValue = {
      user: {
          logged: false
      }
      };

    test('should display login if user is unauthenticated', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });
    
    test('should display marvel component if is autrhenticated', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    });
    
});

import { mount } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));


describe('LoginScreen tests', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pepe',
            logged: true
        }
    }
    
    test('should display correctly', () => {
      const wrapper = mount(
        <AuthContext.Provider value={{}}>
            <MemoryRouter initialEntries={['/login']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    test('should do the dispatch and navigation', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>    
                <MemoryRouter initialEntries={['/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenLastCalledWith({
            type: types.login,
            payload: {
                name: 'Pepe',
                email: 'pepe@gmail.com'
            }
        })
        expect(mockNavigate).toHaveBeenCalledWith('/marvel', {replace: true});
        localStorage.setItem('lastPath', '/dc');
        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith('/dc', {replace: true});
    });
    
});

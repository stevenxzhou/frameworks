import { createContext, useReducer, useContext } from "react";

const THEME = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
}

const initialState = {
    theme: THEME.DARK
}

export const ThemeAction = {
    TOGLE_THEME: 'TOGLE_THEME'
}

const reducer = (state, action) => {

    switch(action.type) {
        case ThemeAction.TOGLE_THEME:
            return {
                theme: state.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
            }
        default:
            return state;
    }
}


const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext)
};

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}
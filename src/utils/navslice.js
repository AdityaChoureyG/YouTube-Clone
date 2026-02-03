import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name : 'nav',
    initialState : {
        isMenuOpen : false,
        isBodyMenuOpen : true,
    },
    reducers : {
        toggleMenu : (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        
        closeMenu : (state) => {
            state.isMenuOpen = false;
        },

        toggleBodyMenu : (state) => {
            state.isBodyMenuOpen = !state.isBodyMenuOpen;
        }
    }
})

export const {toggleMenu, closeMenu, toggleBodyMenu} = navSlice.actions;
export default navSlice.reducer;
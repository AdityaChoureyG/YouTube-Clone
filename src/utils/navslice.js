import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name : 'nav',
    initialState : {
        isMenuOpen : false,
        isBodyMenuOpen : true,
        isSearchOpen : false,
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
        },

        openSearchBox : (state) => {
            state.isSearchOpen = true;
        },

        closeSearchBox : (state) => {
            state.isSearchOpen = false;
        }
    }
})

export const {toggleMenu, closeMenu, toggleBodyMenu, openSearchBox, closeSearchBox} = navSlice.actions;
export default navSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  openSubmenu: null,
  isMobile: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      if (state.isMobile) {
        state.isMobileOpen = !state.isMobileOpen;
      } else {
        state.isExpanded = !state.isExpanded;
      }
    },
    toggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setIsHovered: (state, action) => {
      state.isHovered = action.payload;
    },
    toggleSubmenu: (state, action) => {
      state.openSubmenu =
        state.openSubmenu === action.payload ? null : action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
      if (!action.payload) {
        state.isMobileOpen = false;
      }
    },
    setIsExpanded: (state, action) => {
      state.isExpanded = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  toggleSubmenu,
  setIsMobile,
  setIsExpanded,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;

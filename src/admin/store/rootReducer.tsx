import { combineReducers } from "@reduxjs/toolkit";
import { menuReducer } from "../slices/menuItems";

const rootReducer = combineReducers({
    menu: menuReducer
})


export default rootReducer;
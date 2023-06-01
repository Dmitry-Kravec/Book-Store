import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const rootReducer = () => {}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
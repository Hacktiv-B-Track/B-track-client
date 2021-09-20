import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { logger } from "../middlewares/logger";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;

import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import localtionReducer from "./locationReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  location: localtionReducer,
});

export default reducer;

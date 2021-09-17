import { SAVE_LOCATION } from "./actions";

const initialState = {
  location: null,
  energySupplier: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOCATION: {
      const { location, energySupplier } = action.payload;
      return {
        ...state,
        location: location,
        energySupplier: energySupplier,
      };
    }
    default:
      return { ...state };
  }
};
export default locationReducer;

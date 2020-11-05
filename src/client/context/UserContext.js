import createDataContext from "./createDataContext";

const initialState = {
  uuidRoom: null,
  uuidUser: null
};

const UserReducer = (state, payload) => {
  switch (payload.type) {
    case "updateUuidRoom": {
      console.log(payload, "payload")
      return {  ...state, uuidRoom: payload.uuidRoom };
    }
    case "updateUuidUser":
      return {  ...state, uuidUser: payload.uuidUser };
    default:
      return state;
  }
};

const updateUuidRoom = dispatch => uuidRoom => 
  dispatch({ type: "updateUuidRoom", uuidRoom });

const updateUuidUser = dispatch => uuidUser => 
  dispatch({ type: "updateUuidUser", uuidUser });

export const { Provider, Context } = createDataContext(
  //reducer :
  UserReducer,

  //action functions :
  {
    updateUuidRoom,
    updateUuidUser
  },

  //initialState :
  {
   ...initialState
  }
);
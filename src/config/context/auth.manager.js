export const authManager = (state = {},action) => {
    switch (action.type) {
      case "SIGN_IN":
        return {...action.payload, signed: true };
      case "SIGN_OUT":
        return { signed: false };
      default: return state;
    }
  };
  
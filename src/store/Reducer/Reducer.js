


const initialState = {
    user: null,
    isLoggedIn: false
};
  
function Reducer(state = initialState, action) {
    switch(action.type){
        case 'ADD_USER': 
            console.log("<<ADDING USER>>", action)
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }

        
        case 'REMOVE_USER': 
            console.log("<<REMOVING USER>>", action)
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }

        default:
            return state
    }
   
};
  export default Reducer;
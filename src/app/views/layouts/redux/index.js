export default function LayoutReducer(state = [], action) {
    switch (action.type) {

        case 'SET_LAYOUT':

            return action

        default:

            return state
    }
}
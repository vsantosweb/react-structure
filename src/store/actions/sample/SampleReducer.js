export default function SampleReducer(state = [], action) {
    switch (action.type) {

        case 'SAMPLE_ACTION':

            return action.sample

        default:

            return state
    }
}
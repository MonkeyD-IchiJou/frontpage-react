const chatbotReducer = (
    state = {
        clientsList: [],
        entities: [],
        intents: [],
        actions: [],
        stories: [],
        isTraining: false
    },
    action
) => {
    switch (action.type) {

        case "USR_REQ_CHATBOT_ML_DATA_FULFILLED":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            {
                const res = action.payload.result
                state.entities = res.entities
                state.intents = res.intents
                state.actions = res.actions
                state.stories = res.stories
            }

            break

        case "CHATBOT_UPDATE_CLIENTS":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            // update the online client list for this chatbot
            state.clientsList = action.payload.clientsList

            break

        case "USR_UPDATE_CHATBOT_ENTITIES":
            
            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.entities = action.payload.entities

            break

        case "USR_UPDATE_CHATBOT_INTENTS":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.intents = action.payload.intents

            break

        case "USR_UPDATE_CHATBOT_ACTIONS":
            
            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.actions = action.payload.actions

            break

        case "USR_UPDATE_CHATBOT_STORIES":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.stories = action.payload.stories

            break

        case "SAVE_CB_DATAS_FULFILLED":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.isTraining = false

            break

        case "SET_CHATBOT_TRAINING_STATUS":

            // deep clone first
            state = {
                ...state
            }
            state.clientsList = [...state.clientsList]
            state.entities = [...state.entities]
            state.intents = [...state.intents]
            state.actions = [...state.actions]
            state.stories = [...state.stories]

            state.isTraining = action.payload.isTraining

            break

        default:
            break
    }

    return state
}

export default chatbotReducer
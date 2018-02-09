const chatbotReducer = (
  state = {
    id: 0,
    uuid: '',
    createdby: 73,
    name: "",
    description: "",
    creationdate: "",
    combinedprojs: [],
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
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      {
        const res = action.payload.result
        state.entities = res.entities
        state.intents = res.intents
        state.actions = res.actions
        state.stories = res.stories
        state.combinedprojs = res.combinedprojs
      }

      break

    case "USR_REQ_CHATBOT_INFO_FULFILLED":

      // deep clone first
      state = {
        ...state,
        ...action.payload
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      break

    case "USR_UPDATE_CHATBOT_ENTITIES":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.entities = action.payload.entities

      break

    case "USR_UPDATE_CHATBOT_INTENTS":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.intents = action.payload.intents

      break

    case "USR_UPDATE_CHATBOT_ACTIONS":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.actions = action.payload.actions

      break

    case "USR_UPDATE_CHATBOT_STORIES":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.stories = action.payload.stories

      break

    case "USR_COMBINED_CHATBOT_PROJS":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.combinedprojs = action.payload.combinedprojs

      break

    case "SAVE_CB_DATAS_FULFILLED":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.isTraining = false

      break

    case "SET_CHATBOT_TRAINING_STATUS":

      // deep clone first
      state = {
        ...state
      }
      state.entities = [...state.entities]
      state.intents = [...state.intents]
      state.actions = [...state.actions]
      state.stories = [...state.stories]
      state.combinedprojs = [...state.combinedprojs]

      state.isTraining = action.payload.isTraining

      break

    default:
      break
  }

  return state
}

export default chatbotReducer
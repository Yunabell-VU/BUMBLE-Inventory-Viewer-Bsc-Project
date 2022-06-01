import {createStore} from 'vuex'
import { post, get } from "../utils/request";

const store = createStore({
    state: {
        modelInventory: {
            users: [],
            sessions: [],
            models: [],
            languages: [],
        },
        currentUser:[],
    },
    mutations: {
        setModelInventory(state, inventory) {
            state.modelInventory = inventory;
        }
    },
    actions: {
        async updateModelInventory() {
            const result = await get("/models/?modeluri=ModelInventory.xmi");
            const inventory = {
                users: result.data.users,
                sessions: result.data.collaborationSessions,
                models: result.data.model,
                languages: result.data.language,
            };
            this.commit('setModelInventory', inventory)
        },
    },
    getters: {
        modelInventory: (state) => {
            return state.modelInventory
        },
        users: (state) =>{
            return state.modelInventory.users
        }
    }
})

export default store
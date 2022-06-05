import {createStore} from 'vuex'
import { get } from "../../utils/request";

const store = createStore({
    state: {
        users:[],
        currentUser:[],
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        }
    },
    actions: {
        async setUsers() {
            const result = await get("/models/?modeluri=ModelInventory.xmi");
            const users = result.data.users
                
            this.commit('setUsers', users)
        },
    },
    getters: {
        users: (state) => {
            return state.users
        },
    }
})

export default store
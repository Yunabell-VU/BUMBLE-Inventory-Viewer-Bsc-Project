import {createStore} from 'vuex'
import { post, get } from "../utils/request";

const store = createStore({
    state: {
        inventoryTemplate: {},
        modelInventory: {
            users: [],
            sessions: [],
            models: [],
            languages: [],
            drivers: [],
            actionProviders: [],
            editAdapters:[],
            identityResolvers:[]
        },
        currentUser:{
            id: null,
            name: "",
            email: "",
        },
    },
    mutations: {
        setInventoryTemplate(state, data) {
            state.inventoryTemplate = data
        },
        setModelInventory(state, inventory) {
            state.modelInventory = inventory;
        },
        setCurrentUser(state) {
            const userID = localStorage.userID
            const currentUser = state.modelInventory.users.filter((user) => user.id == userID)
            state.currentUser.id = currentUser[0].id
            state.currentUser.name = currentUser[0].name
            state.currentUser.email = currentUser[0].email
        },
        clearCurrentUser(state) {
            state.currentUser = {
                id: null,
                name: "",
                email: "",
            }
        },
    },
    actions: {
        async updateModelInventory() {
            const result = await get("/models/?modeluri=ModelInventory.xmi");
            const inventory = {
                users: result.data.users,
                sessions: result.data.collaborationSessions,
                models: result.data.model,
                languages: result.data.language,
                drivers: result.data.drivers,
                actionProviders: result.data.actionproviders,
                editAdapters: result.data.editAdapters,
                identityResolvers: result.data.identityresolvers,

            };
            this.commit('setInventoryTemplate', result.data)
            this.commit('setModelInventory', inventory)
        },
        setCurrentUser() {
            this.commit('setCurrentUser')
        },
        clearCurrentUser() {
            this.commit('clearCurrentUser')
        },
    },
    getters: {
        inventoryTemplate: (state) => {
            return state.inventoryTemplate
        },
        modelInventory: (state) => {
            return state.modelInventory
        },
        users: (state) =>{
            return state.modelInventory.users
        },
        currentUser: (state) => {
            return state.currentUser
        },
    },
})

export default store
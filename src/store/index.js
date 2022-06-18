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
        },
        currentUser:{
            id: null,
            name: "",
            email: "",
        },
        currentView:{
            main: "Inventory",
            secondary: null,
        },
        currentModel:{
            name: ""
        }
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
        setCurrentView(state, view) {
            state.currentView = {
                main: view.main,
                secondary: view.secondary
            }
        },
        setCurrentModel(state, modelName) {
            state.currentModel = {
                name: modelName
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
        setCurrentView(vuexContex, view) {
            vuexContex.commit('setCurrentView', view)
        },
        setCurrentModel(vuexContex,modelName) {
            vuexContex.commit('setCurrentModel', modelName)
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
        currentView: (state) => {
            return state.currentView
        },
        currentModel: (state) => {
            return state.currentModel
        }
    },
})

export default store
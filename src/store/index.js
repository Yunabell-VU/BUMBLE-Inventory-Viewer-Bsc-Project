import {createStore} from 'vuex'
import { post, get } from "../utils/request";

const store = createStore({
    state: {
        modelInventory: {
        },
        inventoryStructure: {
        },
        currentUser:{
            id: null,
            name: "",
            email: "",
        },
    },
    mutations: {
        setModelInventory(state, inventory) {
            state.modelInventory = inventory;
        },
        setInventoryStructure(state, structure) {
            state.inventoryStructure = structure
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
            const inventory = result.data

            this.commit('setModelInventory', inventory)
        },
        setCurrentUser() {
            this.commit('setCurrentUser')
        },
        clearCurrentUser() {
            this.commit('clearCurrentUser')
        },
        async setInventoryStructure() {
            const result = await get("/models/?modeluri=modelInventory.ecore")
            this.commit('setInventoryStructure', result.data.eClassifiers)
        },
    },
    getters: {
        modelInventory: (state) => {
            return state.modelInventory
        },
        inventoryStructure: (state) => {
            return state.inventoryStructure
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
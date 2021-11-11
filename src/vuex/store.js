import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            /**
             * Navigation bar status
             * true:    Expanded
             * false:   Shrank
             */
            navigation_bar_status: false
        }
    },
    mutations: {
        // Expand or shrink navigation bar
        changeNavigationBarStatus(){
            this.state.navigation_bar_status = !this.state.navigation_bar_status
        }
    }
});

export default store;
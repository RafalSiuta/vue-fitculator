import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '../screens/HomePage.vue'
import CalculationsPage from '../screens/CalculationsPage.vue'
import ProfilePage from '../screens/ProfilePage.vue'
import SettingsPage from '../screens/SettingsPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/calc', component: CalculationsPage },
    { path: '/profile', component: ProfilePage },
    { path: '/settings', component: SettingsPage },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
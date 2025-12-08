<template>
    <background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
                <template v-if="rentedProjects.length === 0">
                    <p>Түрээсэлсэн төсөл одоогоор байхгүй</p>
                </template>
                <template v-else>
                    <ul>
                        <li v-for="rentedProject in rentedProjects">
                            <p>{{ rentedProject.id }}</p>
                        </li>
                    </ul>
                </template>
            </Info>
        </div>
    </background>
</template>
<script setup>
import background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import Info from './component/Info.vue';
import User from './component/User.vue';
import Userbar from './component/Userbar.vue';

import { ref, onBeforeMount, inject } from 'vue';
import { useRoute } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const api = inject('api')

const route = useRoute();
const user = ref('')
const userID = ref('')
const token = localStorage.getItem('authToken')

const rentedProjects = ref([])
const rentedProjectInfo = ref([])

onBeforeMount(async () => {
    const id = route.params.id
    if (!token) return

    try {
        const decoded = jwtDecode(token)
        user.value = decoded.username
        userID.value = decoded.sub

        const rentedResponse = await api.get(`/subscription/user/${id}`)
        rentedProjects.value = rentedResponse.data.data
        if (rentedResponse.status === 200) {
            const projectIds = rentedProjects.value.map(sub => sub.project_id)
            const projectPromises = projectIds.map(pid => api.get(`/projects/${pid}`))
            const projectResponses = await Promise.all(projectPromises)


            rentedProjectInfo.value = projectResponses.map(res => res.data)

            console.log('Rented projects with details:', rentedProjects.value)
            console.log('Rented projects with details:', rentedProjectInfo.value)
        }
    } catch (e) {
        console.error('error fetching: ', e)
    }
})
</script>
<style scoped>
.container {
    display: flex;
    margin: 50px 60px;
    gap: 50px;
}

.user-container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}
</style>
<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
                <ul>
                    <li v-for="value in projects" :key="value.id">
                        <p>{{ value.title }}</p>
                        <template v-if="value.price && value.price.length">
                            <p v-for="p in value.price.price" :key="p.id">
                                {{ p.price.toLocaleString() }}₮ / {{ p.type }}
                            </p>
                        </template>

                        <!-- Show message if price is undefined or empty -->
                        <p v-else>Үнэ ороогүй</p>
                    </li>
                </ul>
            </Info>
        </div>
        <Footer />
    </Background>
</template>
<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { jwtDecode } from 'jwt-decode';
import { useRoute } from 'vue-router';

import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';
import Userbar from './component/Userbar.vue';
import Info from './component/Info.vue';
import User from './component/User.vue';

const api = inject('api')
const route = useRoute()

let user = ref('')
let userID = ref('')
const projects = ref([])

const token = localStorage.getItem('authToken')

onBeforeMount(async () => {
    if (!token) return

    try {
        const decoded = jwtDecode(token)
        userID = decoded.sub
        user = decoded.username
        const response = await api.get(`/projects/user/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        projects.value = response.data

        const projectPrice = await Promise.all(
            projects.value.map(async (project) => {
                try {
                    const priceResponse = await api.get(`/rental-pricing/id/${project.id}`)

                    return {
                        ...project,
                        price: priceResponse.data
                    }
                } catch (e) {
                    console.error(`${project.id} tusliin uniin medeelel avahad aldaa garlaa`)
                    return {
                        ...project,
                        price: 0
                    }
                }
            })
        )
        projects.value = projectPrice
        console.log(projects.value)
    } catch (e) {
        console.error('error fetching: ', e)
    }
})
</script>

<style scoped>
.text {
    color: var(--secondary-text);
    font-size: 0.875rem;
}

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
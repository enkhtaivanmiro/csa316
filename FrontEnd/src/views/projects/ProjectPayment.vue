<template>
    <Background>
        <Navbar />
        <form action="">
            <input type="text">
            <input type="text">
        </form>
        <p>{{ projectData.title }}</p>
        <div v-if="priceData.length">
            <h3>Rental Prices:</h3>
            <ul>
                <li v-for="price in priceData" :key="price.id">
                     {{ typeInMongolian(price.type) }}: {{ price.price }}₮
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No pricing data available.</p>
        </div>
    </Background>
</template>

<script setup>
import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import { ref, inject, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const typeMap = {
  daily: 'Өдрөөр',
  weekly: 'Долоо хоногоор',
  monthly: 'Сараар'
};

const api = inject('api')

const route = useRoute()
const user = ref('')
const userID = ref('')
const token = localStorage.getItem('authToken')

const id = route.params.id

const projectData = ref('')
const priceData = ref('')

function typeInMongolian(type) {
  return typeMap[type] || type;
}

onBeforeMount(async () => {
    if (!token) return

    const decoded = jwtDecode(token)
    user.value = decoded.username
    userID.value = decoded.sub

    try {
        const projectResponse = await api.get(`/projects/${id}`)
        projectData.value = projectResponse.data

        const priceResponse = await api.get(`/rental-pricing/project/${id}`)
        priceData.value = priceResponse.data
    } catch (e) {
        console.error("Алдаа гарлаа", (e))
    }
})
</script>
<style scoped>
    li{
        color: white;
    }
</style>
<template>
    <Background>
        <Navbar />
        <div>
            <div class="user-container">
                <div class="user-pic">
                    <img src="/Landing Page/User.svg" alt="pic" class="user-dummy">
                    <p>{{ user }}</p>
                </div>
                <div class="navigation-container">
                    
                </div>
            </div>
            <div class="info-container"></div>
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

const api = inject('api')
const user = ref(null)
const route = useRoute()

const token = localStorage.getItem('authToken')

onBeforeMount(async () => {
    const id = route.params.id
    if (!token) return

    try {
        const decoded = jwtDecode(token)
        const userID = decoded.sub
        console.log(decoded)
        const res = await api.get(`/users/${userID}`)

        user.value = res.data.username
    }catch(e){
        console.error('error fetching: ', e)
    }
})
</script>

<style scoped>
.user-pic{
    display: flex;
    flex-direction: column;
    max-width: 220px;
    border-radius: 28px;
    border: 1px solid var(--secondary-text);
    background-color: var(--background-color);
    text-align: center;

    justify-content: center;
    align-items: center;  
}
.user-dummy{
    max-width: 150px;
}
</style>
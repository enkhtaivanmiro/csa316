<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
                <div>
                    <p class="text">Хэрэглэгчийн нэр</p>
                    <p class="info">{{ user }}</p>
                </div>
                <div>
                    <p class="text">Цахим шуудан</p>
                    <p class="info">{{ email }}</p>
                </div>
            </Info>
        </div>
        <Footer />
    </Background>
</template>
<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { jwtDecode } from 'jwt-decode';
import { useRoute, useRouter } from 'vue-router';

import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';
import Userbar from './component/Userbar.vue';
import Info from './component/info.vue';
import User from './component/User.vue';

const api = inject('api')
const route = useRoute()
const router = useRouter()

const user = ref(null)
const email = ref(null)
let userID = ref(null)


const token = localStorage.getItem('authToken')

onBeforeMount(async () => {
    const id = route.params.id
    if (!token) return

    try {
        const decoded = jwtDecode(token)
        userID = decoded.sub
        const res = await api.get(`/users/${userID}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        user.value = res.data.username
        email.value = res.data.email
    } catch (e) {
        console.error('error fetching: ', e)
    }
})

function logout(){
    localStorage.removeItem('authToken')
    router.push('/')
}
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
<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <div class="user-pic">
                    <img src="/Landing Page/User.svg" alt="pic" class="user-dummy">
                    <p id="username">{{ user }}</p>
                </div>
                <ul class="navigation-container">
                    <li>
                        <RouterLink to="/myprojects">Миний мэдээлэл</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/myprojects">Миний төслүүд</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/myprojects">Миний санхүү</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/myprojects">Төсөл оруулах</RouterLink>
                    </li>
                    <li>
                        <button @click="logout" class="logout">Гарах</button>
                    </li>
                </ul>
            </div>
            <div class="info-container">
                <div>
                    <p class="text">Хэрэглэгчийн нэр</p>
                    <p class="info">{{ user }}</p>
                </div>
                <div>
                    <p class="text">Цахим шуудан</p>
                    <p class="info">{{ email }}</p>
                </div>
            </div>
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

const api = inject('api')
const route = useRoute()
const router = useRouter()

const user = ref(null)
const email = ref(null)

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
#username {
    font-size: 1.5rem;
}

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

.user-pic {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 220px;
    border-radius: 28px;
    background-color: var(--background-color);
    border: 1px solid var(--secondary-text);
    text-align: center;
    padding: 1.5rem 0;
    justify-content: center;
    align-items: center;
}

.user-dummy {
    max-width: 150px;
}

.navigation-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: var(--background-color);
    max-width: 220px;
    border-radius: 28px;
    padding: 20px 20px;
    border: 1px solid var(--secondary-text);
}

.navigation-container a {
    text-decoration: none;
    color: var(--primary-text);
}

.navigation-container .logout {
    background: none;
    border: none;
    color: var(--primary-text);
    font: inherit;
    cursor: pointer;
    text-align: left;
}

.info-container {
    background-color: var(--background-color);
    border: 1px solid var(--secondary-text);
    flex: 1;
    border-radius: 28px;
    padding: 30px 30px;
}
</style>
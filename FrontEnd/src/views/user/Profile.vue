<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
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
import Info from './component/Info.vue';
import User from './component/User.vue';

const api = inject('api')
const route = useRoute()

const user = ref('')
const email = ref('')
let userID = ref('')


const token = localStorage.getItem('authToken')

onBeforeMount(async () => {
    const id = route.params.id
    if (!token) return
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
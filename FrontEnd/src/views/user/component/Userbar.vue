<template>
    <ul class="navigation-container">
        <li>
            <RouterLink :to="`/profile/${userID}`">Миний мэдээлэл</RouterLink>
        </li>
        <li>
            <RouterLink :to="`/profile/${userID}/projects`">Миний төслүүд</RouterLink>
        </li>
        <li>
            <RouterLink :to="`/profile/${userID}/sales`">Миний орлого</RouterLink>
        </li>
        <li>
            <RouterLink :to="`/profile/${userID}/rented`">Миний түрээсэлсэн</RouterLink>
        </li>
        <li>
            <RouterLink :to="`/profile/${userID}/create`">Төсөл оруулах</RouterLink>
        </li>
        <li>
            <button @click="logout" class="logout">Гарах</button>
        </li>
    </ul>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const userID = ref(null)

const token = localStorage.getItem('authToken')


onBeforeMount(async () => {
    if (!token) return

    try {
        const decoded = jwtDecode(token)

        userID.value = decoded.sub
    } catch (e) {
        console.error('aldaa garlaa: ', e)
    }

})

function logout(){
    localStorage.removeItem('authToken')
    router.push('/')
}
</script>
<style scoped>
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

li:hover {
    background-color: var(--orange);
}

.navigation-container a.router-link-exact-active {
    background-color: var(--orange);
}
</style>
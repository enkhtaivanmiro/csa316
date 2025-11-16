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
                    <li v-for="value in projects" :key="value.id" class="projects-list">
                        <div class="project-info">
                            <p class="title">{{ value.title }}</p>
                            <p class="price">
                                <template v-if="value.price && value.price.length">
                                    <span v-for="p in value.price.price" :key="p.id">
                                        {{ p.price.toLocaleString() }}₮ / {{ p.type }}
                                    </span>
                                </template>
                                <template v-else>Үнэ ороогүй</template>
                            </p>
                        </div>


                        <div class="actions">
                            <router-link :to="`/projects/edit/${value.id}`"><img src="/edit.svg" alt="edit"></router-link>
                            <button id="show-modal" @click="showModal = true"><img src="/delete.svg" alt="delete"
                                    class="delete"></button>
                        </div>
                        <Teleport to="body">
                            <modal :show="showModal" @close="showModal = false">
                                <template #header>
                                    <h3>Та төслийг устгахдаа итгэлтэй байна уу?</h3>
                                </template>
                                <template #body>
                                    <div class="modal-option">
                                        <button @click="showModal = false" class="confirmation">Үгүй</button>
                                        <button @click="deleteProject(value.id)" class="confirmation"
                                            style="background-color: var(--green);">Тийм</button>
                                    </div>
                                </template>
                            </modal>
                        </Teleport>
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
import { useRoute, useRouter } from 'vue-router';

import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';
import Userbar from './component/Userbar.vue';
import Info from './component/Info.vue';
import User from './component/User.vue';

import Modal from './component/DeleteConfirmation.vue'

const api = inject('api')
const router = useRouter()
const route = useRoute()

const showModal = ref(false)

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
    } catch (e) {
        console.error('error fetching: ', e)
    }
})

async function deleteProject(projectId) {
    try {
        const deleteResponse = await api.delete(`/projects/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        router.go(0)
    } catch (e) {
        console.error("Tusliig ustgahad aldaa garlaa ", e)
    }
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

.project-info {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.title {
    min-width: 200px;
}

.price {
    white-space: nowrap;
}

.actions {
    display: flex;
    gap: 1rem;
}

.projects-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.confirmation {
    background-color: var(--red);
    color: var(--primary-text);
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
}

.modal-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
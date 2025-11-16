<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
                <form @submit.prevent="UpdateProject">
                    <div class="section">
                        <label for="title">Төслийн нэр*</label>
                        <input type="text" v-model="title" required placeholder="Төслийн нэр........">
                    </div>

                    <div class="section">
                        <label for="description">Төслийн тайлбар</label>
                        <textarea v-model="description" placeholder="Төслийн тайлбарыг бичнэ үү...."
                            rows="5"></textarea>
                    </div>

                    <div class="section">
                        <label for="category">Төслийн ангилал</label>
                        <select name="category" id="category" v-model="category">
                            <option value="">-- Ангилал сонгох --</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>

                    <ul>
                        <li v-for="(item, index) in list" :key="index" class="price-section">
                            <label>Төслийн үнэлгээ {{ index + 1 }}:</label>
                            <select v-model="item.period">
                                <option value="daily">Өдрөөр</option>
                                <option value="weekly">7 хоногоор</option>
                                <option value="monthly">Сараар</option>
                            </select>
                            <input type="text" v-model="item.price" placeholder="Үнэ (₮)" />
                            <button type="button" @click="deleteSection(index)" :disabled="list.length === 1"
                                class="delete-button"><img src="/delete.svg" alt="хасах"></button>
                        </li>

                        <button type="button" @click="addSection" :disabled="list.length === 3">Нэмэх</button>
                    </ul>

                    <div class="section">
                        <label for="files">Файл оруулах</label>
                        <input type="file" name="files" @change="handleFileUpload" ref="fileInput">
                        <p v-if="currentFileName" class="current-file">Одоогийн файл: {{ currentFileName }}</p>
                    </div>

                    <div class="section">
                        <label for="thumbnail">Зураг оруулах</label>
                        <input type="file" name="thumbnail" @change="handleThumbnailUpload" ref="thumbnailInput"
                            accept="image/*">
                        <img v-if="currentThumbnail" :src="currentThumbnail" alt="Current thumbnail" class="thumbnail-preview">
                    </div>

                    <button type="submit" id="button" class="header_list">
                        Шинэчлэх
                    </button>
                </form>
            </Info>
        </div>
        <Footer />
    </Background>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import Background from '../components/background.vue';
import Footer from '../components/footer.vue';
import Navbar from '../components/navbar.vue';
import Info from './component/Info.vue';
import Userbar from './component/Userbar.vue';
import User from './component/User.vue';
import { inject } from 'vue';
import { jwtDecode } from 'jwt-decode';

const api = inject('api');
const route = useRoute();
const projectId = ref(route.params.id);

const title = ref('');
const description = ref('');
const category = ref('');
const user = ref('');
const userID = ref('');
const file = ref(null);
const thumbnail = ref(null);
const fileInput = ref(null);
const thumbnailInput = ref(null);
const currentFileName = ref('');
const currentThumbnail = ref('');

const categories = ref(null);
const list = ref([{ period: 'daily', price: '' }]);

const token = localStorage.getItem('authToken');

onBeforeMount(async () => {
    if (!token) return;
    const decoded = jwtDecode(token);
    user.value = decoded.username;
    userID.value = decoded.sub;

    const categoryResponse = await api.get('/categories');
    categories.value = categoryResponse.data;

    await loadProjectDetails();
});

async function loadProjectDetails() {
    try {
        const projectResponse = await api.get(`/projects/${projectId.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const project = projectResponse.data;
        title.value = project.title;
        description.value = project.description;
        category.value = project.category_id;
        currentFileName.value = project.file_url ? project.file_url.split('/').pop() : '';
        currentThumbnail.value = project.thumbnail;

        try {
            const rentalResponse = await api.get(`/rental-pricing?project_id=${projectId.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (rentalResponse.data && rentalResponse.data.length > 0) {
                list.value = rentalResponse.data.map(item => ({
                    id: item.id,
                    period: item.type,
                    price: item.price.toString()
                }));
            }
        } catch (e) {
            console.log('No rental pricing found');
        }
    } catch (e) {
        console.error('Error loading project:', e);
    }
}

function handleFileUpload(event) {
    file.value = event.target.files[0];
}

function handleThumbnailUpload(event) {
    thumbnail.value = event.target.files[0];
    if (event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentThumbnail.value = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}

async function UpdateProject() {
    try {
        const formData = new FormData();

        formData.append('user_id', userID.value);
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('category_id', category.value);
        formData.append('is_active', 'true');

        if (file.value) {
            formData.append('file_url', file.value);
        }

        if (thumbnail.value) {
            formData.append('thumbnail', thumbnail.value);
        }

        const projectResponse = await api.put(`/projects/${projectId.value}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (projectResponse.status === 200) {
            for (const item of list.value) {
                const rentalBody = {
                    project_id: projectId.value,
                    type: item.period,
                    price: Number(item.price),
                };

                if (item.id) {
                    await api.put(`/rental-pricing/${item.id}`, rentalBody, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } else {
                    await api.post('/rental-pricing', rentalBody, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }
            }

        }
    } catch (e) {
        console.error('Алдаа:', e);
    }
}

async function addSection() {
    list.value.push({ period: 'daily', price: '' });
}

async function deleteSection(index) {
    const item = list.value[index];
    
    if (item.id) {
        try {
            await api.delete(`/rental-pricing/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            console.error('Error deleting pricing:', e);
        }
    }
    
    list.value.splice(index, 1);
}
</script>

<style scoped>
.price-section {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
}

textarea,
input[type="text"],
select {
    background-color: var(--background-color);
    border: 1px solid var(--primary-text);
    border-radius: 0.4rem;
    padding: 0.5rem;
    color: var(--primary-text);
}

textarea {
    resize: none;
    height: 200px;
}

#button {
    max-width: 200px;
    margin-left: auto;
    background-color: var(--green);
    padding: 0.8rem 1.3rem;
    border: none;
    border-radius: 0.5rem;
    display: block;
}

#button:hover {
    filter: brightness(90%);
    cursor: pointer;
}

form {
    color: var(--primary-text);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

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

.delete-button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
}

.current-file {
    font-size: 0.875rem;
    color: var(--secondary-text);
    margin-top: 0.5rem;
}

.thumbnail-preview {
    max-width: 200px;
    max-height: 200px;
    margin-top: 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid var(--primary-text);
}
</style>
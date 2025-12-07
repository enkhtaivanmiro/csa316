<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <User :user="user"></User>
                <Userbar></Userbar>
            </div>
            <Info>
                <form @submit.prevent="AddProject">
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
                    </div>

                    <div class="section">
                        <label for="thumbnail">Зураг оруулах</label>
                        <input type="file" name="thumbnail" @change="handleThumbnailUpload" ref="thumbnailInput"
                            accept="image/*">
                    </div>

                    <button type="submit" id="button" class="header_list">
                        Оруулах
                    </button>
                </form>
            </Info>
        </div>
        <Footer />
    </Background>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import Background from '../components/background.vue';
import Footer from '../components/footer.vue';
import Navbar from '../components/navbar.vue';
import Info from './component/Info.vue';
import Userbar from './component/Userbar.vue';
import User from './component/User.vue';
import { inject } from 'vue';
import { jwtDecode } from 'jwt-decode';

const api = inject('api');

const user = ref('');
const userID = ref('');

const title = ref('');
const description = ref('');
const category = ref('');
const file = ref(null);
const thumbnail = ref(null);
const fileInput = ref(null);
const thumbnailInput = ref(null);

const categories = ref(null)

const period = ref('')
const price = ref('')

const list = ref([{ period: 'daily', price: '' }])

const token = localStorage.getItem('authToken');

onBeforeMount(async () => {
    if (!token) return;
    const decoded = jwtDecode(token);
    user.value = decoded.username;
    userID.value = decoded.sub;

    const category = await api.get('/categories')
    categories.value = category.data
});

function handleFileUpload(event) {
    file.value = event.target.files[0];
}

function handleThumbnailUpload(event) {
    thumbnail.value = event.target.files[0];
}

async function AddProject() {
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

        const ProjectResponse = await api.post('/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (ProjectResponse.status === 201) {
            const project_id = ProjectResponse.data.id;

            for (const item of list.value) {
                if (item.period && item.price) {
                    const rentalBody = {
                        project_id: project_id,
                        type: item.period,
                        price: Number(item.price)
                    };

                    await api.post('/rental-pricing', rentalBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                }
            }

            alert('Төсөл болон үнэлгээ амжилттай нэмэгдлээ!');

            title.value = '';
            description.value = '';
            category.value = '';
            file.value = null;
            thumbnail.value = null;

            list.value = [{ period: 'daily', price: '' }];

            if (fileInput.value) fileInput.value.value = '';
            if (thumbnailInput.value) thumbnailInput.value.value = '';
        }

    } catch (e) {
        console.error('Алдаа:', e);
        alert('Төсөл нэмэхэд алдаа гарлаа');
    }
}

async function addSection() {
    list.value.push({ period: 'daily', price: '' })
}
async function deleteSection(index) {
    list.value.splice(index, 1)
}

</script>

<style scoped>
.price-section {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
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
    background-color: var(--orange);
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
</style>
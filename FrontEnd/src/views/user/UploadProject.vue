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
                        <input type="text" v-model="title">
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
                            <option value="development">Хөгжүүлэлтийн хэрэгслүүд</option>
                            <option value="design">Дизайн ба бүтээлч ажил</option>
                            <option value="data">Өгөгдөл ба шинжилгээ</option>
                            <option value="ai">Хиймэл оюун ба машин сургалт</option>
                            <option value="business">Бизнес ба бүтээмж</option>
                            <option value="web">Веб хөгжүүлэлт ба хостинг</option>
                            <option value="security">Аюулгүй байдал ба сүлжээ</option>
                            <option value="game">Тоглоом хөгжүүлэлт</option>
                            <option value="education">Боловсрол ба судалгаа</option>
                            <option value="audio">Аудио ба хөгжмийн үйлдвэрлэл</option>
                            <option value="cad">3D ба CAD инженерчлэл</option>
                            <option value="cloud">Cloud ба DevOps хэрэгслүүд</option>
                        </select>
                    </div>

                    <div class="section">
                        <label for="files">Файл оруулах</label>
                        <input type="file" name="files">
                    </div>
                    <div class="section">
                        <label for="thumbnail">Зураг оруулах</label>
                        <input type="file" name="thumbnail">
                    </div>

                    <button type="submit" id="button" class="header_list">Оруулах</button>
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
import Userbar from './component/userbar.vue';
import User from './component/User.vue';

import { inject } from 'vue';
import { jwtDecode } from 'jwt-decode';

const api = inject('api')

const title = ref('')
const description = ref('')
const category = ref('')
const user = ref('')
const userID = ref('')

const token = localStorage.getItem('authToken')

onBeforeMount(async () => {
    if (!token) return

    const decoded = jwtDecode(token)
    user.value = decoded.username
    userID.value = decoded.sub
})


async function AddProject() {
    try {
        const ProjectData = {
            user_id: userID.value, //udahgui avna,
            title: title.value,
            description: description.value,
            category_id: category.value,
            file_url: file_url.value,
            thumbnail_url: thumbnail_url.value,
            is_active: active.value,
        }

        const response = await api.post(`/projects`, ProjectData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201) {

        }
    } catch (e) {
        console.error(e)
    }
}
</script>

<style scoped>
textarea, input[type="text"], select{
    background-color: var(--background-color);
    border: 1px solid var(--primary-text);
    border-radius: 0.4rem;
    padding: 0.5rem;
    color: var(--primary-text);
}

textarea{
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
</style>
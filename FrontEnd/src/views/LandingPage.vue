<template>
    <Background>
        <Navbar />
        <div class="intro-container">
            <div class="intro-text">
                <h1>Хүссэн үедээ хэрэгтэй программ хангамжаа түрээсэл</h1>
                <p id="description">Аж ахуй нэгж, хувь хүмүүст зориулсан хямд, уян хатан программ хангамжийн түрээс</p>
            </div>
            <div class="button-container">
                <button @click="scrollToCategory" class="intro-button header_list">
                    Танилцах
                </button>
                <router-link to="/login" class="login-button header_list">
                    Эхлэх
                </router-link>
            </div>
        </div>
        <div id="categories" class="categeory-container">
            <p class="cards-label">Санал болгох ангилал</p>
            <div class="cards-list">
                <Itemcard v-for="n in 5" :key="n" :title="`Card number ${n}`" />
            </div>
        </div>
        <div class="categeory-container">
            <p class="cards-label">Санал болгох бүтээгдэхүүн</p>
            <div v-if="data && data.length" class="cards-list">
                <Itemcard v-for="project in data" :title="project.title" :url="project.thumbnail_url" :id="project.id" />
            </div>
            <div v-else>
                <p>Одоогоор ямар нэгэн төсөл алга</p>
            </div>
        </div>
        <div class="feedbacks">
            <div class="feedback-container">
                <p class="emphasize">Давуу талууд</p>
                <div class="benefits-container">
                    <div class="benefit">
                        <img src="/Landing Page/Dollar sign.svg" alt="Good" class="benefit-icon">
                        <p>Хэмнэлт</p>
                    </div>
                    <div class="benefit">
                        <img src="/Landing Page/Clock.svg" alt="Good" class="benefit-icon">
                        <p>Толгойны өвчингүй</p>
                    </div>
                    <div class="benefit">
                        <img src="/Landing Page/Check.svg" alt="Good" class="benefit-icon">
                        <p>Аюулгүй, эрсдэлгүй</p>
                    </div>
                    <div class="benefit">
                        <img src="/Landing Page/always.svg" alt="Good" class="benefit-icon">
                        <p>24/7 дэмжлэг үзүүлнэ</p>
                    </div>
                </div>
            </div>
            <div class="review-container">
                <p class="emphasize">Хэрэглэгчийн сэтгэгдэл</p>
                <div class="user-card">
                    <p>“Энэ үйлчилгээ, манай бизнест маш их цаг хугацаа, мөнгө хэмнэж чадсан. Маш сэтгэл хангалуун
                        байгаа. ”</p>
                    <div class="username">
                        <img src="/Landing Page/User.svg" alt="">
                        <p>Бат</p>
                        <p>ABC ХХК</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </Background>
</template>

<script setup>
import Background from './components/background.vue';
import Navbar from './components/navbar.vue';
import Itemcard from './components/itemcard.vue';
import Footer from './components/footer.vue';
import { onMounted, inject, ref } from 'vue';

const api = inject('api')
const data = ref(null)

onMounted(async () => {
    const res = await api.get('/projects')
    data.value = res.data
})

function scrollToCategory() {
    const el = document.getElementById("categories");
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
}
</script>

<style scoped>
.intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    text-align: center;
    margin-top: 8rem;
    gap: 8rem;
}

.intro-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.button-container {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 3.125rem;
}

h1 {
    font-size: 3.75rem;
    font-weight: 600;
    color: var(--primary-text);
    max-width: 1150px;
    margin: 0;
}

#description {
    font-size: 1.5rem;
    color: var(--secondary-text);
    max-width: 650px;
}

.login-button {
    padding: 1rem 1.5rem;
    background-color: var(--cards);
    color: var(--primary-text);
    text-decoration: none;
    border-radius: 0.5rem;
}

.intro-button {
    padding: 1rem 1.5rem;
    background-color: var(--green);
    color: var(--primary-text);
    text-decoration: none;
    border-radius: 0.5rem;
}

.categeory-container {
    width: 100%;
    text-align: left;
    justify-content: space-between;

}

.cards-label {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-text);
}

.cards-list {
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.feedbacks {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.benefits-container {
    max-width: 587px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 2rem;
    justify-items: left;
}

.benefit-icon {
    max-width: 3rem;
    max-height: 3rem;
}

.benefit {
    display: flex;
    color: var(--primary-text);
    align-items: left;
    gap: 1rem;
}

.review-container {
    max-width: 523px;
}

.user-card {
    padding: 1.25rem;
    border-radius: 1.25rem;
    background-color: var(--cards);
}

.username {
    display: flex;
    gap: 0.5rem;
}
</style>

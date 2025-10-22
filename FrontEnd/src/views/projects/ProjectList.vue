<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="category-tabs">
                <button :class="['tab', { active: category === '' }]" @click="setCategory('')">
                    Бүгд
                </button>
                <button v-for="cat in categories" :key="cat.id" :class="['tab', { active: category === cat.id }]"
                    @click="setCategory(cat.id)">
                    {{ cat.name }}
                </button>
            </div>

            <div v-if="filteredData && filteredData.length" class="cards-list">
                <Itemcard v-for="project in filteredData" :key="project.id" :title="project.title"
                    :url="project.thumbnail_url" :id="project.id" />
            </div>
        </div>
        <Footer />
    </Background>
</template>

<script setup>
import Background from '../components/background.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import Itemcard from '../components/itemcard.vue'
import { ref, computed, onBeforeMount, inject } from 'vue'

const api = inject('api')
const data = ref([])
const categories = ref([])
const category = ref('')

onBeforeMount(async () => {
    const ItemsResponse = await api.get('/projects')
    data.value = ItemsResponse.data

    const CategoryResponse = await api.get('/categories')
    categories.value = CategoryResponse.data
})

const setCategory = (id) => {
    category.value = id
}

const filteredData = computed(() => {
    if (!category.value) return data.value
    return data.value.filter(item => item.category_id === Number(category.value))
})
</script>

<style scoped>
.container {
    margin: 4rem 3rem;
}

.category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
}

.tab {
    background-color: var(--background-color);
    border: 1px solid var(--secondary-text);
    color: var(--primary-text);
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.tab:hover {
    background-color: var(--background-color);
    color: var(--primary-text);
}

.tab.active {
    background-color: var(--primary-text);
    color: var(--background-color);
    border-color: var(--background-color);
}

.cards-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
}
</style>

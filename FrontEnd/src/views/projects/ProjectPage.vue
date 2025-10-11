<template>
  <Background>
    <Navbar />
    <div class="detail-container" v-if="project">
      <div class="pictures">
        <img :src="project.thumbnail_url" alt="Thumbnail" class="project-img" />
        <div class="other-pictures">
          <div>
            <img :src="project.thumbnail_url" alt="Thumbnail" class="small-img" />
          </div>
        </div>
      </div>
      <div class="information">
        <h1>{{ project.title }}</h1>
        <p class="desc">{{ project.description }}</p>
        <hr>
        <router-link to="/" class="back-button">Буцах</router-link>
      </div>
    </div>
    <div v-else class="loading">Төслийг ачааллаж байна...</div>
    <Footer />
  </Background>
</template>

<script setup>
import { onBeforeMount, ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import Background from '../components/background.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

const route = useRoute()
const api = inject('api')
const project = ref(null)

onBeforeMount(async () => {
  const id = route.params.id
  const res = await api.get(`/projects/${id}`)
  project.value = res.data
})
</script>

<style scoped>
.detail-container {
  margin-top: 5rem;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  text-align: center;
}

.pictures{
}
.information{
  text-align: left;
  width: 50%;
}
.project-img {
  height: auto;
  border-radius: 1rem;
}

.desc {
  font-size: 1.2rem;
  color: var(--secondary-text);
}

.back-button {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: white;
  background-color: var(--green);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
</style>

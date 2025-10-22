<template>
  <Background>
    <Navbar />
    <div class="detail-container" v-if="project">
      <div class="pictures">
        <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
          <Slide v-for="image in images" :key="image.id">
            <img :src="image.url" alt="Gallery Image" class="gallery-image" />
          </Slide>
        </Carousel>

        <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
          <Slide v-for="image in images" :key="image.id">
            <template #default="{ currentIndex, isActive }">
              <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
                <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image" />
              </div>
            </template>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="information">
        <h1>{{ project.title }}</h1>
        <p class="desc">{{ project.description }}</p>
        <hr>
        <div v-if="project.price && project.price.length">
          <p v-for="p in project.price" :key="p.id">
            {{ p.price.toLocaleString() }}₮ / {{ p.type }}
          </p>
        </div>
        <p v-else>Үнэ тодорхойлогдоогүй</p>
        <router-link to="/" class="back-button">Буцах</router-link>
      </div>
    </div>
    <div v-else class="loading">Төслийг ачааллаж байна...</div>
    <Footer />
  </Background>
</template>

<script setup>
import Background from '../components/background.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import { onBeforeMount, ref, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const api = inject('api')

const project = ref(null)
const images = ref([])

const currentSlide = ref(0)
const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  transition: 500,
}

const thumbnailsConfig = {
  itemsToShow: 6,
  wrapAround: true,
  gap: 10,
}

onBeforeMount(async () => {
  const id = route.params.id
  const res = await api.get(`/projects/${id}`)
  const price = await api.get(`/rental-pricing/project/${id}`)
  project.value = res.data
  Object.assign(project.value, { price: price.data })

  console.log(project)

  if (project.value.image_urls?.length) {
    images.value = project.value.image_urls.map((url, index) => ({
      id: index + 1,
      url,
    }))
  } else {
    images.value = [{ id: 1, url: project.value.thumbnail_url }]
  }
})
</script>

<style scoped>
.detail-container {
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: flex-start;
  gap: 2rem;
}

.information {
  text-align: left;
  width: 50%;
}

.pictures,
.information {
  flex: 1;
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

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
</style>

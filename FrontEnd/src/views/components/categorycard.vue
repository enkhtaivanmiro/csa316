<template>
    <div class="card-container">
        <div class="img-container">
            <img :src=url alt="Picture" class="card-image">
        </div>
        <div class="title-container">
            <p class="title">{{ title }}</p>
            <router-link :to="`/projects`" class="item-button">
                Сонирхох
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    url: String,
    catname: [String, Number]
})


</script>

<style scoped>
.card-container {
    width: 250px;
    height: 290px;
    background-color: var(--cards);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem;
}

.img-container {
    width: 100%;
    height: 120px;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.title-container {
    display: flex;
    margin-top: auto;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 10px;
}

.title {
    color: var(--primary-text);
    font-size: 1.5rem;
    font-weight: 800;
}

.item-button {
    color: var(--secondary-text);
    text-align: center;
}

.item-button:hover {
    text-decoration: none;
}
</style>
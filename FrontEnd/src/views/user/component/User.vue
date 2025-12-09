<template>
    <div class="user-pic">
        <img src="/Landing Page/User.svg" alt="pic" class="user-dummy">
        <p id="username">{{ user }}</p>
    </div>
</template>
<script setup>
    defineProps({
        user: String,
    })
</script>
<style scoped>
#username {
    font-size: 1.5rem;
}
.user-pic {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 220px;
    border-radius: 28px;
    background-color: var(--background-color);
    border: 2px solid var(--secondary-text);
    text-align: center;
    padding: 1.5rem 0;
    justify-content: center;
    align-items: center;
}

.user-dummy {
    max-width: 150px;
}
</style>
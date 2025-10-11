<template>
    <Background>
        <Navbar/>
        <p>{{ user }}</p>
        <Footer/>
    </Background>
</template>
<script setup>
import { ref, inject} from 'vue'

import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';

const user = ref('')
</script>
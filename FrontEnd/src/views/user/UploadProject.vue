<template>
    <Background>
        <Navbar />
        <div class="container">
            <div class="user-container">
                <div class="user-pic">
                    <img src="/Landing Page/User.svg" alt="pic" class="user-dummy">
                    <p id="username">{{ user }}</p>
                </div>
                <Userbar></Userbar>
            </div>
            <Info>
                <form @submit.prevent = "AddProject" >
                    
                </form>
            </Info>
        </div>
        <Footer />
    </Background>
</template>
<script setup>
import Background from '../components/background.vue';
import Footer from '../components/footer.vue';
import Navbar from '../components/navbar.vue';
import Info from './component/Info.vue';
import Userbar from './component/userbar.vue';

async function AddProject(){

}
</script>

<style scoped>
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
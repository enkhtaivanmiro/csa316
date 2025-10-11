<template>
    <Background>
        <div class="container">
            <div class="login">
                <h2>Нэвтрэх</h2>
                <form @submit.prevent="handleLogin" novalidate>
                    <div class="input-container">
                        <label for="email">Цахим шуудан</label>
                        <input v-model="email" type="email" required />
                    </div>
                    <div class="input-container">
                        <label for="password">Нууц үг</label>
                        <input v-model="password" type="password" required />
                        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                        <RouterLink to="/emailconfirmation" id="forgot-password">Нууц үгээ мартсан?</RouterLink>
                    </div>

                    <button type="submit" id="button" class="header_list">Нэвтрэх</button>
                </form>
                <p>Бүртгэлгүй хэрэглэгч? <RouterLink to="/register" id="register">Бүртгүүлэх</RouterLink>
                </p>
            </div>
            <div class="footer"></div>
            <Footer />
        </div>
    </Background>
</template>

<script setup>
import Background from './components/background.vue'
import Footer from './components/footer.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { inject } from 'vue'

const router = useRouter()
const api = inject('api')

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
    try {
        const RegisterData = {
            usernameOrEmail: email.value,
            password: password.value
        }

        const response = await api.post(`/users/login`, RegisterData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200 || response.status === 201) {
            if (response.data && response.data.token) {
                localStorage.setItem("authToken", response.data.token)
                localStorage.setItem("username", response.data.username)
            }
            router.push('/')
        }
    } catch (error) {
        console.error('Login error:', error)
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage.value = 'Цахим шуудан эсвэл нууц үг буруу байна'
            } else if (error.response.status === 404) {
                errorMessage.value = 'Хэрэглэгч олдсонгүй'
            } else if (error.response.data && error.response.data.message) {
                errorMessage.value = error.response.data.message
            } else {
                errorMessage.value = 'Нэвтрэхэд алдаа гарлаа'
            }
        } else if (error.request) {
            errorMessage.value = 'Сервертэй холбогдож чадсангүй'
        } else {
            errorMessage.value = 'Алдаа гарлаа. Дахин оролдоно уу'
        }
    }
    console.log('User logged in:', { email: email.value, password: password.value })
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;

}

.login {
    max-width: 420px;
    width: 100%;
    background-color: var(--cards);
    color: var(--primary-text);
    border-radius: 1.3rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 15px 0;
}

form {
    display: flex;
    flex-direction: column;
}

.input-container {
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    gap: 10px;
    text-align: left;
}

input[type="email"],
input[type="password"] {
    background-color: var(--background-color);
    border: 1px solid var(--orange);
    border-radius: 0.5rem;
    padding: 8px;
    color: var(--primary-text);
    outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus {
    background-color: var(--background-color);
    box-shadow: 0 0 12px var(--orange);
}

#button {
    background-color: var(--green);
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    margin: 20px auto;
    display: block;
}

#forgot-password {
    display: block;
    text-align: right;
    text-decoration: underline;
    color: var(--secondary-text);
}

#forgot-password:hover {
    text-decoration: none;
}

#register {
    color: var(--blue);
}

#register:hover {
    text-decoration: none;
}

.error {
    color: var(--red);
    font-size: 1rem;
}
</style>

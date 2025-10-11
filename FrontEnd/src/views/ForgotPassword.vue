<template>
    <Background>
        <div class="container">
            <div class="login">
                <h2>Нууц үг солих</h2>
                <form @submit.prevent="handlePassword" novalidate>
                    <div class="input-container">
                        <label for="validationCode">Баталгаажуулах код</label>
                        <input v-model="validationCode" type="text" required />
                    </div>
                    <div class="input-container">
                        <label for="password">Шинэ нууц үг</label>
                        <input v-model="password" type="password" required />
                    </div>
                    <div class="input-container">
                        <label for="confirmPassword">Шинэ нууц үг давтах</label>
                        <input v-model="confirmPassword" type="password" required />
                    </div>
                    <p v-if="password && confirmPassword">
                        <span v-if="passwordsMatch" style="color: var(--green);">Нууц үг тохирч байна</span>
                        <span v-else style="color: var(--red);">Нууц үг тохирохгүй байна</span>
                    </p>
                    <button type="submit" id="button" class="header_list" :disabled="!passwordsMatch">Солих</button>
                </form>
            </div>
            <div class="footer"></div>
            <Footer />
        </div>
    </Background>
</template>

<script setup>
import Background from './components/background.vue'
import Footer from './components/footer.vue'
import { ref, inject, watch } from 'vue'

const api = inject('api')

const validationCode = ref('')
const confirmPassword = ref('')
const password = ref('')

const passwordsMatch = ref(false)

watch([password, confirmPassword], () => {
  passwordsMatch.value = password.value === confirmPassword.value
})

async function handlePassword() {
    try {
        const PasswordResetData = {
            token: validationCode.value,
            newPassword: password.value
        }

        const response = await api.post(`/users/reset-password`, PasswordResetData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


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
    console.log('Password changed:', { password: password.value})
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
    /* margin-top: 100px; */
    max-width: 420px;
    width: 100%;
    background-color: var(--cards);
    color: var(--primary-text);
    border-radius: 1.3rem;
    display: flex;
    flex-direction: column;
    text-align: center;
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

.check-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 30px;
    text-align: right;
    color: var(--secondary-text);

}

input[type="checkbox"]:before {
    border: 1px solid var(--orange);
    background-color: var(--background-color);
}

input[type="text"],
input[type="password"] {
    background-color: var(--background-color);
    border: 1px solid var(--orange);
    border-radius: 0.5rem;
    padding: 8px;
    color: var(--primary-text);
    outline: none;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border: 1px solid var(--orange);
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
#button:disabled{
    background-color: var(--secondary-text);
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
</style>

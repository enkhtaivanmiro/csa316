<template>
    <Background>
        <div class="container">
            <div class="login">
                <h2>Бүртгүүлэх</h2>
                <form @submit.prevent="handleRegister" novalidate>
                    <div class="input-container">
                        <label for="username">Хэрэглэгчийн нэр</label>
                        <input v-model="username" type="username" required />
                    </div>
                    <div class="input-container">
                        <label for="email">Цахим шуудан</label>
                        <input v-model="email" type="email" required />
                    </div>
                    <div class="input-container">
                        <label for="password">Нууц үг</label>
                        <input v-model="password" type="password" required />
                    </div>
                    <transition-group name="fade" tag="ul" class="validation-list">
                        <li v-if="!validations.minLength" key="minLength">
                            Дор хаяж 8 урттай
                        </li>
                        <li v-if="!validations.hasUpper" key="hasUpper">
                            Дор хаяж нэг том үсэг
                        </li>
                        <li v-if="!validations.hasNumber" key="hasNumber">
                            Дор хаяж нэг тоо
                        </li>
                    </transition-group>

                    <div class="check-container">
                        <input v-model="checkboxes" type="checkbox" required>
                        <label for="checkboxes">
                            <RouterLink to="/termsofservice" class="terms">Үйлчилгээний нөхцөлтэй</RouterLink> танилцаж,
                            зөвшөөрсөн.
                        </label>
                    </div>

                    <button type="submit" id="button" class="header_list" :disabled="!isValid">Бүртгүүлэх</button>
                </form>
                <p>Бүртгэлтэй хэрэглэгч? <RouterLink to="/login" id="register">Нэвтрэх</RouterLink>
                </p>
            </div>
            <div class="footer"></div>
            <!-- <Footer /> -->
        </div>
    </Background>
</template>

<script setup>
import Background from './components/background.vue'
import Footer from './components/footer.vue'
import { ref, reactive, inject, watch, computed } from 'vue'

const api = inject('api')

const username = ref('')
const email = ref('')
const password = ref('')
const checkboxes = ref(false)

const validations = reactive({
    minLength: false,
    hasUpper: false,
    hasNumber: false
})

watch(password, (newVal) => {
    validations.minLength = newVal.length >= 8,
    validations.hasUpper = /[A-Z]/.test(newVal)
    validations.hasNumber = /\d/.test(newVal)
})

const PasswordIsValid = computed(()=>{
    return validations.minLength && validations.hasUpper && validations.hasNumber
})

const isValid = computed(() => {
    return  PasswordIsValid && checkboxes.value && email.value && username.value
})

async function handleRegister() {
    try {
        const RegisterData = {
            username: username.value,
            email: email.value,
            password: password.value
        }

        const response = await api.post(`/users/register`, RegisterData, {
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

input[type="email"],
input[type="password"],
input[type="username"] {
    background-color: var(--background-color);
    border: 1px solid var(--orange);
    border-radius: 0.5rem;
    padding: 8px;
    color: var(--primary-text);
    outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="username"]:focus {
    border: 1px solid var(--orange);
    box-shadow: 0 0 12px var(--orange);
}

ul {
    list-style: none;
    padding: 0;
    text-align: right;
    padding: 0 30px;
}

li {
    font-size: 0.95rem;
    color: var(--red);
    transition: color 0.3s ease;
}

li.ok {
    color: var(--green);
}

.terms {
    color: var(--secondary-text);

}

.terms:hover {
    text-decoration: none;
}

#button {
    background-color: var(--green);
    padding: 0.8rem 1.3rem;
    border: none;
    border-radius: 0.5rem;
    margin: 15px auto;
    display: block;
}

#button:hover {
    transition: 0.3s ease;
    background-color: var(--orange);
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

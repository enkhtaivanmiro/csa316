<template>
    <Background>
        <Navbar />
        <div class="container">
            <p>Төслийн нэр: {{ projectData.title }}</p>
            <div v-if="priceData.length">
                <h3>Түрээсийн хугацаагаа сонгоно уу</h3>
                <ul>
                    <label>Түрээслэх хугацаа</label>
                    <select v-model="selectedType">
                        <option v-for="price in priceData" :key="price.id" :value="price.type">
                            {{ typeInMongolian(price.type) }}
                        </option>
                    </select>

                    <p v-if="selectedPrice">
                        Үнэ: {{ selectedPrice }}₮
                    </p>
                </ul>
            </div>
            <div v-else>
                <p>No pricing data available.</p>
            </div>

            <div class="payment-container">
                <div class="payment-item" v-for="method in methods" :key="method.id"
                    :class="{ active: paymentMethod === method.value }" @click="paymentMethod = method.value">
                    <img :src="method.icon" class="payment-icon" />
                    <span>{{ method.label }}</span>
                </div>
            </div>
            <p v-if="errorMessage" style="color: var(--red);">{{ errorMessage }}</p>
            <div class="buttons">
                <router-link to="/" class="back-btn">Буцах</router-link>
                <button class="rent-btn" @click="rentProject">Түрээслэх</button>
            </div>
        </div>
    </Background>
</template>

<script setup>
import Background from '../components/background.vue';
import Navbar from '../components/navbar.vue';
import { ref, inject, onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { errorMessages } from 'vue/compiler-sfc';

const typeMap = {
    daily: 'Өдрөөр',
    weekly: 'Долоо хоногоор',
    monthly: 'Сараар'
};

const api = inject('api')

const route = useRoute()
const router = useRouter()
const user = ref('')
const userID = ref('')
const token = localStorage.getItem('authToken')

const id = route.params.id

const projectData = ref('')
const priceData = ref('')

const selectedType = ref('')

const paymentMethod = ref(``)

const errorMessage = ref('')

//Test ugugdul hugjuulegdene
const methods = [
    { id: 1, value: "Visa", label: "Card", icon: "/Payment/visa.png" },
    { id: 2, value: "Qpay", label: "QPay", icon: "/Payment/qpay.png" },
    { id: 3, value: "ApplePay", label: "ApplePay", icon: "/Payment/applepay.png" }
];

const selectedPrice = computed(() => {
    const item = priceData.value.find(p => p.type === selectedType.value)
    return item ? item.price : null
})

function typeInMongolian(type) {
    return typeMap[type] || type;
}

onBeforeMount(async () => {
    if (!token) return

    const decoded = jwtDecode(token)
    user.value = decoded.username
    userID.value = decoded.sub

    try {
        const projectResponse = await api.get(`/projects/${id}`)
        projectData.value = projectResponse.data

        const priceResponse = await api.get(`/rental-pricing/project/${id}`)
        priceData.value = priceResponse.data
    } catch (e) {
        console.error("Алдаа гарлаа", (e))
    }
})

async function rentProject() {
    if(!selectedType.value){
        errorMessage.value = "Түрээслэх хугацаагаа сонгоно уу"
        return
    }

    if(!paymentMethod.value){
        errorMessage.value = "Төлбөрийн аргыг сонгоно уу"
        return
    }

    const rentBody = {
        user_id: userID.value,
        project_id: id,
        length: selectedType.value,
    }
    const rentResponse = await api.post(`/subscription`, rentBody, {
        header: {
            'Content-Type': 'application/json'
        }
    })

    if(rentResponse.status === 201){
        router.push(`/profile/${userID.value}/rented`)
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: var(--cards);
    margin-top: 5rem;
    border-radius: 1rem;
    padding: 1rem 0;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.rent-btn {
    background-color: var(--orange);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    color: var(--primary-text);
}

.rent-btn:hover {
    box-shadow: inset;
}

.back-btn {
    color: var(--primary-text);
    text-decoration: none;
}

.back-btn:hover {
    text-decoration: underline;
}

.payment-container {
    display: flex;
    gap: 16px;
    margin: 20px 0;
}

.payment-item {
    padding: 16px 20px;
    border: 2px solid var(--primary-text);
    color: var(--primary-text);
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.25s ease;
    user-select: none;
}

.payment-item:hover {
    border-color: rgba(205, 138, 2, 0.35);
    background: #f0f7ff;
}

.payment-item.active {
    border-color: var(--orange);
    background: var(--primary-text);
    box-shadow: 0 0 10px rgba(205, 138, 2, 0.35);
    color: var(--background-color);
}

.payment-icon {
    width: 28px;
    height: 28px;
}

.selected-payment {
    margin-top: 10px;
    font-weight: 600;
}

</style>
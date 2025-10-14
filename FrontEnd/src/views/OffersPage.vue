```vue
<template>
    <Background>
        <Navbar />

        <div class="offers-container">
            <h1 class="page-title">Үнийн санал</h1>

            <div class="table-wrapper">
                <table class="offers-table">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Product ID</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.id }}</td>
                            <td>
                                <span v-for="n in 5" :key="n" class="star">
                                    <i
                                        :class="[
                                            'fa-star',
                                            n <= product.rating ? 'fas' : 'far'
                                        ]"
                                    ></i>
                                </span>
                            </td>
                            <td>{{ product.status }}</td>
                            <td class="creator-cell">
                                <img :src="product.avatar" class="avatar" />
                                <span>{{ product.creator }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Footer />
    </Background>
</template>

<script setup>
import Background from './components/background.vue';
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';

const products = [
    {
        name: "Software #1",
        price: "99 USD",
        id: "FP1564820",
        rating: 4,
        status: "Pending",
        creator: "Michael",
        avatar: "/Landing Page/User.svg",
    },
    {
        name: "Software #2",
        price: "89 USD",
        id: "FP1923775",
        rating: 5,
        status: "Pending",
        creator: "Michael",
        avatar: "/Landing Page/User.svg",
    },
    {
        name: "Software #3",
        price: "129 USD",
        id: "FP1985621",
        rating: 4,
        status: "Pending",
        creator: "Michael",
        avatar: "/Landing Page/User.svg",
    },
];
</script>

<style scoped>
.offers-container {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.page-title {
    font-size: 2rem;
    color: var(--primary-text);
    font-weight: 600;
}

.table-wrapper {
    width: 90%;
    max-width: 1200px;
    background-color: var(--cards);
    border-radius: 1.25rem;
    padding: 1rem;
    overflow-x: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.offers-table {
    width: 100%;
    border-collapse: collapse;
    color: var(--primary-text);
    font-size: 1rem;
}

.offers-table th {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
}

.offers-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.star {
    color: #ffcc00;
    margin-right: 2px;
}

.creator-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

@media (max-width: 768px) {
    .offers-table th,
    .offers-table td {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
}
</style>
```

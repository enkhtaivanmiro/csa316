<template>
    <footer>
        <ul class="footer-items">
            <li><RouterLink to="/aboutus" class="footer-list">Бидний тухай</RouterLink></li>
            <li><RouterLink to="/termsofservice" class="footer-list">Үйлчилгээний нөхцөл</RouterLink></li>
            <li><RouterLink to="/privacy" class="footer-list">Нууцлал</RouterLink></li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>
footer {
    max-height: 90px;
    margin-top: auto;
    width: 100%;
}

.footer-items {
    display: flex;
    gap: 4.375rem;
    list-style: none;
}

.footer-list {
    color: var(--secondary-text);
    text-decoration: none;
}
</style>
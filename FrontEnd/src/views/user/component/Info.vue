<template>
    <div class="info-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.info-container {
    background-color: var(--background-color);
    border: 1px solid var(--secondary-text);
    flex: 1;
    border-radius: 28px;
    padding: 30px 30px;
}
</style>
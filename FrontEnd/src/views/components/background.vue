<template>
    <div class="background">
        <div class="ellipse"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>

</template>

<style scoped>
.background {
    position: relative;
    background: #000000;
    overflow: hidden;
    min-height: 100vh;
}

.ellipse {
    position: absolute;
    width: 594px;
    height: 622px;
    left: 50%;
    top: -311px;
    transform: translateX(-50%);
    background: var(--orange);
    filter: blur(350px);
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
}

.content {
    position: relative;
    padding: 30px 50px 20px 50px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    pointer-events: all;
}
</style>
<template>
    <div class="loader-container">
        <span class="dot dot-1"></span>
        <span class="dot dot-2"></span>
        <span class="dot dot-3"></span>
    </div>
</template>

<style scoped lang="scss">
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.dot {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-primary);
    animation: loader infinite var(--transition-time) alternate;

    &.dot-2 {
        animation-delay: 0.05s;
    }
    &.dot-3 {
        animation-delay: 0.1s;
    }

    @keyframes loader {
        100% {
            transform: translateY(-30px);
        }
    }
}
</style>
<script setup lang="ts">
defineProps<{
    skeletons?: number;
}>();
</script>

<template>
     <article v-for="(_, i) of skeletons || 1" :key="i" class="card-post">
        <header>
            <div class="user">
                <div class="thumbnail skeleton"></div>

                <div class="infos">
                    <p class="skeleton"></p>
                    <p class="skeleton"></p>
                </div>
            </div>

            <div class="options">
                <span class="dot skeleton"></span>
                <span class="dot skeleton"></span>
                <span class="dot skeleton"></span>
            </div>
        </header>

        <main>
            <p class="skeleton"></p>
        </main>
    </article>
</template>

<style scoped lang="scss">
.skeleton {
    background: linear-gradient(
        120deg, 
        var(--color-skeleton) 30%,
        var(--color-white-2) 38%,
        var(--color-white-2) 40%,
        var(--color-skeleton) 48%
    );
    border-radius: var(--raduis);
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: loading 2s infinite;
}

@keyframes loading {
    100% {
        background-position: -100% 0;
    }
}

.card-post {
    padding: 2rem;
    margin-block: 2rem;
    background-color: var(--t-color-background-2);
    box-shadow: var(--shadow);
    border-radius: calc(var(--raduis) * 3);

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;

        .user {
            display: flex;
            align-items: center;
            gap: 1rem;

            .thumbnail {
                width: 50px;
                height: 50px;
                border-radius: 40%;
            }

            .infos > p {
                min-width: 50px;
                height: 10px;
                margin-top: 0.5rem;
            }
        }

        .options {
            display: flex;
            gap: 0.3rem;

            .dot {
                width: 5px;
                height: 5px;
            }
        }
    }

    main p {
        height: 60px;
    }
}
</style>
<template>
    <div class="wrapper-content  wrapper-content--fixed">
        <section>
            <div class="container">
                <h1 class="title">PAGE NOT FOUND!</h1>
                <p>Go to <router-link to="/" class="link">main page?</router-link></p>

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Example"
    }
</script>

<style scoped>
    .wrapper-content {
        display: flex;
        min-height: 80vh;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>
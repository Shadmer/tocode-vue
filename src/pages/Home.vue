<template>
    <div class="wrapper-content  wrapper-content--fixed">
        <section>
            <div class="container">

                <!--errors-->
                <div class="error" v-if="error" style="margin-bottom: 20px; color: red">
                    <p>{{error}}</p>
                </div>

                <!--search-->
                <search
                        :value="search"
                        placeholder="Type username..."
                        @search="search = $event"
                        @keyup.enter="getRepos"
                />
                <!--buttons-->
                <button v-if="!repos" class="btn btnPrimary" @click="getRepos">Search!</button>
                <button v-else class="btn btnPrimary" @click="getRepos">Search Again!</button>

                <!--wrapper-->
                <div class="repos__wrapper" v-if="repos">
                    <!--user info-->
                    <div class="repos-user">
                        <img :src="user.avatar_url" alt="user.login">
                        <span>Username: {{user.login}}</span>
                        <span>Repos count: {{user.public_repos}}</span>
                    </div>
                    <!--sorting-->
                    <div class="repos-sorting">
                        <span @click="sort('name')">Repos name &#8595;</span>
                        <span @click="sort('stargazers_count')">Stars &#8595;</span>
                    </div>
                    <!--item-->
                    <div class="repos-item" v-for="repo in reposSort" :key="repo.id">
                        <div class="repos-info">
                            <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
                            <span>{{ repo.stargazers_count }} ⭐</span>
                        </div>
                    </div>
                    <!--buttons-->
                    <section>
                        <div class="container">
                            <div class="button-list">
                                <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
                                <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    import search from '../components/Search';
    import axios from 'axios';

    export default {
        name: "Home",
        components: {search},
        data() {
            return {
                search: '',
                error: null,
                user: null,
                repos: null,
                sorting: {
                    currentSort: 'name',
                    currentSortDir: 'asc',
                },
                page: {
                    current: 1,
                    length: 4
                }
            }
        },
        computed: {
            reposSort() {
                return this.repos
                    .sort((a, b) => {
                        let mod = 1;
                        if (this.sorting.currentSortDir === 'desc') mod = -1;
                        if (a[this.sorting.currentSort] < b[this.sorting.currentSort]) return -1 * mod;
                        if (a[this.sorting.currentSort] > b[this.sorting.currentSort]) return mod;
                        return 0;
                    })
                    .filter((row, index) => {
                        let start = (this.page.current-1) * this.page.length;
                        let end = this.page.current * this.page.length;
                        if (index >= start && index < end) return true;
                    })
            }
        },
        methods: {
            sort(e) {
                if (e === this.sorting.currentSort) {
                    this.sorting.currentSortDir = this.sorting.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.sorting.currentSort = e;
            },
            prevPage() {
                if (this.page.current > 1) {
                    this.page.current -= 1;
                }
            },
            nextPage() {
                console.log(this.user.public_repos);
                if ((this.page.current * this.page.length) < this.user.public_repos) {
                    this.page.current += 1;
                }
            },
            getRepos() {
                axios
                    .get(`https://api.github.com/users/${this.search}/repos`)
                    .then(res => {
                        // console.log(res);
                        this.repos = res.data;
                        this.error = null;
                    })
                    .catch(err => {
                        console.log(err);
                        this.repos = null;
                        this.error = 'Can`t find this user';
                    });
                axios
                    .get(`https://api.github.com/users/${this.search}`)
                    .then(res => {
                        this.user = res.data;
                        this.error = null;
                    })
                    .catch(err => {
                        console.log(err);
                        this.repos = null;
                        this.error = 'Can`t find this user';
                    });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    button {
        margin-top: 40px;
    }

    .repos__wrapper {
        width: 600px;
        margin: 30px 0;
    }

    .repos-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #dbdbdb;
    }

    .repos-sorting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px 0;

        span {
            cursor: pointer;
        }
    }

    .repos-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px 0;

        img {
            width: 50px;
        }
    }

    .button-list {
        width: 100%;
        text-align: center;

        .btn {
            border-radius: 60px;
            margin: 0 20px;
        }
    }

</style>
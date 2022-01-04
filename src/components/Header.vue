<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">Logo</a>
            <button @click="showMenu = !showMenu" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span v-show="!showMenu"><i class="fa fa-bars"></i></span>
                <span v-show="showMenu"><i class="fa fa-minus"></i></span>
            </button>
            <div class="navbar-collapse collapse justify-content-end" id="navbarText">
                <ul class="nav navbar-nav">
                    <li class="nav-item">
                        <router-link
                            class="router-link"
                            :class="$route.path == '/dashboard' ? 'route-active' : 'route-inactive'"
                            :to="'dashboard'">
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            style="text-decoration: none !important;"
                            :class="$route.path == '/add-profile' ? 'route-active' : 'route-inactive'"
                            :to="'add-profile'">
                            Add Profile
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a
                            style="cursor: pointer; text-decoration: none !important;"
                            class="route-inactive"
                            @click="logout">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            <div class="text-end mt-3 w-100" v-show="showMenu">
                <ul class="nav navbar-nav">
                    <li class="nav-item">
                        <router-link
                            class="router-link"
                            :class="$route.path == '/dashboard' ? 'route-active' : 'route-inactive'"
                            :to="'dashboard'">
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            style="text-decoration: none !important;"
                            :class="$route.path == '/add-profile' ? 'route-active' : 'route-inactive'"
                            :to="'add-profile'">
                            Add Profile
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a
                            style="cursor: pointer; text-decoration: none !important;"
                            class="route-inactive"
                            @click="logout">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import Auth from '@/handler/authentication'

export default {
    data() {
        return {
            showMenu: false,
        }
    },
    methods: {
        logout() {
            Auth.logout();
            this.$router.push('/');
        }
    },
}
</script>

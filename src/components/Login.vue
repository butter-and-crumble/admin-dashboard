<template>
    <div class="login">
        <h3>Login</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <div v-show="loginError">
            <h3>Something went wrong</h3>
            {{ errorMessage }}
        </div>
        <button @click="login">Sign In</button>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapActions } = createNamespacedHelpers('user')
    import firebase from 'firebase';
    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                loginError: false,
                errorMessage: ''
            }
        },
        methods: {
            ...mapActions(['setCurrentUser']),
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.setCurrentUser(user)
                        this.$router.replace('/account')
                    },
                    (err) => {
                        this.loginError = true
                        this.errorMessage = err.message
                    }
                );
            }
        }
    }
</script>
<!--
<style lang="scss" scoped>
@import "@/styles/components/login.scss";
</style> -->

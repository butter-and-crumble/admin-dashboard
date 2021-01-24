<template>
   <v-app id="login">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                         <v-spacer />
                        <v-toolbar-title>Butter & Crumble Login</v-toolbar-title>
                        <v-spacer />
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="person"
                              name="email"
                              label="Email"
                              type="email"
                              v-model="email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                        <div v-show="loginError">
                            <p class="red--text text-center font-weight-medium">Something went wrong</p>
                            <p class="text-center">{{ errorMessage }}</p>
                        </div>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="login">Login</v-btn>
                        <v-spacer />
                     </v-card-actions>
                  </v-card>
               </v-flex>

            </v-layout>
         </v-container>
     </v-main>
   </v-app>
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
                        console.log(err.message)
                        this.errorMessage = err.message
                    }
                );
            }
        }
    }
</script>

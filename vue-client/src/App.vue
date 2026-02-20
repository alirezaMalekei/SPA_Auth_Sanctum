<script setup>
import {reactive} from "vue";
import useAuth from "@/composable/useAuth.js";
import Navigation from "@/components/navigation.vue";

const form = reactive({
    email: 'admin@admin.com',
    password: 'secret'

});

const {login: loginAuth, errors} = useAuth();

const login = async ()=>{
    loginAuth(form)
}

</script>

<template>
    <navigation />
    <form  @submit.prevent="login">
        <input
            v-model="form.email"
            type="text" name="email" id="email" placeholder="Email">
        <input
            v-model="form.password"
            type="password" name="password" id="password" placeholder="Password">
        <button type="submit">login</button>
    </form>
    <p v-if="errors.email">{{errors.email[0]}}</p>
    <p v-if="errors.password">{{errors.password[0]}}</p>
</template>

<style scoped></style>

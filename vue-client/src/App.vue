<script setup>
import {reactive} from "vue";
import axios from "axios";

const form = reactive({
    email: 'admin@admin.com',
    password: 'secret'

});

const login = async ()=>{
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/login', form);
    console.log(response);
}
</script>

<template>
    <form  @submit.prevent="login">
        <input
            v-model="form.email"
            type="text" name="email" id="email" placeholder="Email">
        <input
            v-model="form.password"
            type="password" name="password" id="password" placeholder="Password">
        <button type="submit">login</button>
    </form>
</template>

<style scoped></style>

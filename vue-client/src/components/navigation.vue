<script setup>

import useAuth from "@/composable/useAuth.js";

const {user, authenticated, logout} = useAuth();

</script>

<template>
    <div v-if="authenticated">
        {{user.name}}
    </div>
    <button @click="logout">Logout</button>
</template>

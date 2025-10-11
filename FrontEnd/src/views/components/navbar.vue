<template>
  <nav>
    <div class="nav-left">
      <p>LOGO</p>
    </div>
    <ul class="nav-center">
      <li><router-link to="/" class="header_list">Шийдлүүд</router-link> </li>
      <li><router-link to="/" class="header_list">Үнийн санал</router-link> </li>
      <li><router-link to="/" class="header_list">Бидний тухай</router-link> </li>
      <li><router-link to="/" class="header_list">Холбогдох</router-link> </li>
    </ul>
    <div class="nav-right">
      <router-link v-if="!auth" to="/login" class="login-button header_list">
        Нэвтрэх
      </router-link>

      <router-link v-else :to="`/profile/${id}`" class="login-button header_list">
        {{ username }}
      </router-link>
    </div>

  </nav>
</template>
<script setup>
  import {ref,onMounted} from 'vue'
  import { jwtDecode } from 'jwt-decode'
  // import { useRouter } from 'vue-router'

  // const router = userRouter()
  const username = ref('')
  const userID = ref(null)
  const auth = ref(false)
  onMounted(()=>{
    const token = localStorage.getItem('authToken')

    if(token){
      const decoded = jwtDecode(token)
      auth.value = true
      username.value = decoded.username
      userID.value = decoded.sub
    }
  })
</script>
<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* logo left, ul center, button right */
}

.nav-left {
  flex: 1;
  text-align: left;
  color: var(--primary-text);
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-right {
  flex: 1;
  text-align: right;
}

.logo {
  font-weight: bold;
  font-size: 1.5em;
}

.login-button {
  padding: 0.7rem 1rem;
  background-color: var(--cards);
  border-radius: 0.5em;
  color: var(--orange);
  text-decoration: none;
}

.login-button:hover {
  text-shadow: 2px 2px 20px var(--orange);
}
</style>
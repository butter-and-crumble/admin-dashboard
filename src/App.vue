<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/orders">Orders</router-link> |
      <router-link to="/blackouts">Blackouts</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/styles/global.scss";
</style>

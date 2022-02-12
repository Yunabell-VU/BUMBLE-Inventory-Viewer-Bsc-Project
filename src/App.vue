<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      Hello Yuna!
    </div>
  </header>

  <main>
  </main>
</template>

<style lang="scss">
@import './assets/base.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

.wrapper {
  width: 100px;
  height: 100px;
  background-color: brown;
  &:hover {
    background-color: aquamarine;
  }
}

</style>

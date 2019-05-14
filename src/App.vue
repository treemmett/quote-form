<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
$blue: #2196f3;
$red: #f44336;

body {
  margin: 0;
  overflow: hidden;
}

* {
  scroll-behavior: smooth;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button {
  padding: 8px 16px;
  font-size: inherit;
  border-radius: 5px;
  background-color: #fff;
  color: $blue;
  border: 1px solid $blue;
  appearance: none;
  margin-left: 1em;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  font-weight: 600;
  transition: background-color 0.1s ease-out;

  &:hover {
    background-color: lighten($blue, 35%);
  }

  &:active,
  &:focus {
    background-color: lighten($blue, 30%);
  }

  &.red {
    border-color: transparent;
    color: $red;

    &:hover {
      background-color: lighten($red, 35%);
    }

    &:active,
    &:focus {
      background-color: lighten($red, 30%);
    }
  }
}
</style>

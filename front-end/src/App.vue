<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      const viewheight = window.innerHeight
      const viewwidth = window.innerWidth
      const viewport = document.querySelector('meta[name=viewport]')
      viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`)
    }, 300)
  }
}
</script>

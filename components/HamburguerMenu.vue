<template>
  <span id="hamburguer-menu" class="hamburguer-menu" @click="openMenu">
    <i class="hamburguer-menu__line" />
    <i class="hamburguer-menu__line" />
    <i class="hamburguer-menu__line" />
  </span>
</template>
<script>
export default {
  methods: {
    openMenu () {
      const itemsMenuButton = document.getElementById('hamburguer-menu').children
      const asideBar = document.getElementById('aside-bar')

      const menuIsOpen = itemsMenuButton[0].classList.contains('hamburguer-menu__cancel')

      if (!menuIsOpen) {
        asideBar.className += ' aside-bar__opened'
      } else {
        asideBar.classList.remove('aside-bar__opened')
      }

      for (const item of itemsMenuButton) {
        if (menuIsOpen) {
          item.classList.remove('hamburguer-menu__cancel')
        } else {
          item.className += ' hamburguer-menu__cancel'
        }
      }
    }

  }
}
</script>
<style>
.hamburguer-menu{
    display: flex;
    width: 1.9em;
    height: 1.9em;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    margin: 0px .5em;
}
.hamburguer-menu__line{
    height: 4px;
    width: 100%;
    border-radius: 2px;
    background-color: #161616;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.hamburguer-menu__cancel:nth-child(1){
    transform: rotate( -45deg ) translateY( 180% ) translateX( -22% );
}
.hamburguer-menu__cancel:nth-child(2){
    transform: rotate( 45deg ) translateY( -8% ) translateX( 3% );
}
.hamburguer-menu__cancel:nth-child(3){
    background-color: transparent;
}
</style>

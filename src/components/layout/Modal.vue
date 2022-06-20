<template>
  <transition name="my-modal-fade">
    <div class="my-modal-backdrop" @click="$emit('close')">
      <div class="my-modal" @click.stop>
        <header class="my-modal-header" id="modalTitle">
          <slot name="header"> </slot>
        </header>

        <section class="my-modal-body" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <footer class="my-modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.my-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.my-modal-header,
.my-modal-footer {
  padding: 15px;
  display: flex;
}

.my-modal-header {
  position: relative;
  background-color: #262626;
  color: white;
  font-size: 1rem;
  justify-content: center;
}

.my-modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.my-modal-body {
  position: relative;
  padding: 20px 10px;
}

.my-modal-fade-enter,
.my-modal-fade-leave-to {
  opacity: 0;
}

.my-modal-fade-enter-active,
.my-modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

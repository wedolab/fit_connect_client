<div class="dark container">
  <slot></slot>
</div>

<style scoped>
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    max-height: 65vh;
    width: 80vw;
    overflow-y: auto;
    scrollbar-width: thin; /* Установите толщину скроллбара */
    scrollbar-color: var(--md-sys-color-on-secondary)
      var(--md-sys-color-secondary); /* Установите цвет скроллбара */
  }

  .container::-webkit-scrollbar {
    width: 5px; /* Установите ширину скроллбара для WebKit браузеров */
  }

  .container::-webkit-scrollbar-track {
    background: var(
      --md-sys-color-on-secondary
    ); /* Цвет фона дорожки скроллбара для WebKit браузеров */
  }

  .container::-webkit-scrollbar-thumb {
    background-color: var(
      --md-sys-color-secondary
    ); /* Цвет ползунка скроллбара для WebKit браузеров */
  }
</style>

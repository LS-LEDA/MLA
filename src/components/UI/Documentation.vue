<template>
  <div class='flex flex-col space-y-2' v-html='file' />
</template>

<script lang='ts'>
  export default {
    name: 'Documentation',
    props: {
      file: File,
    },
  };
</script>

<style scoped>
  :deep(h1) {
    font-size: 24px;
    font-weight: bold;
  }

  :deep(h3) {
    font-size: 18px;
    font-weight: bold;
  }

  :deep(ol) {
    list-style: none;
    counter-reset: styled-counter;
    margin-left: 2.5em;
  }

  :deep(ol li) {
    counter-increment: styled-counter;
    position: relative;
    display: block;
    padding: 0.4em 0.4em 0.4em 1.5em;
    margin: 0.5em;
    border-radius: 0.3em;
  }

  :deep(ol li::before) {
    content: counter(styled-counter);
    position: absolute;
    left: -1em;
    top: 50%;
    margin-top: -1em;
    background: #93c5fd;
    height: 2em;
    width: 2em;
    border: 0.3em solid rgba(255, 255, 255, 0.5);
    text-align: center;
    font-weight: bold;
    border-radius: 2em;
  }

  :deep(blockquote) {
    margin: 0;
    padding: 0 1em;
    color: #57606a;
    border-left: 0.25em solid #d0d7de;
  }

  :deep(code) {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
  }
</style>

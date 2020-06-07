<template>
<div class="progress-circle">
  <svg width="32" height="32" viewBox="0 0 100 100" version="1.1"
        xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
              stroke-dasharray="100"
              stroke-dashoffset="20"
      ></circle>
    </svg>
    <slot></slot>
</div>
</template>

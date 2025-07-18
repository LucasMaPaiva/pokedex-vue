<template>
  <div>
    <div v-if="isLoading" class="loading">
      Carregando fontes...
    </div>

    <div v-if="error" class="error">
      Erro: {{ error }}
    </div>

    <div class="font-examples">
      <h1 class="roboto">Texto com Roboto</h1>
      <h2 class="open-sans">Texto com Open Sans</h2>
      <p class="lato">Texto com Lato</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFonts } from '@/composables/useFonts'

// Usando o composable com injeção de dependência
const { loadMultipleFonts, isLoading, error } = useFonts('google')

onMounted(async () => {
  // Carregando múltiplas fontes do Google Fonts
  await loadMultipleFonts([
    {
      name: 'Roboto',
      url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap'
    },
    {
      name: 'Open Sans',
      url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap'
    },
    {
      name: 'Lato',
      url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap'
    }
  ])
})
</script>

<style scoped>
.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #e74c3c;
  font-weight: bold;
}

.font-examples {
  margin-top: 20px;
}

.roboto {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
}

.open-sans {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
}

.lato {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
}
</style>

import { ref } from 'vue'
import { FontService, GoogleFontsProvider, LocalFontsProvider } from '@/services/FontService'

// Factory para criar o serviço (Dependency Injection)
export function createFontService(providerType = 'google') {
  const provider = providerType === 'google'
    ? new GoogleFontsProvider()
    : new LocalFontsProvider()

  return new FontService(provider)
}

// Composable principal
export function useFonts(providerType = 'google') {
  const fontService = createFontService(providerType)
  const isLoading = ref(false)
  const error = ref(null)

  const loadFont = async (fontName, fontUrl) => {
    isLoading.value = true
    error.value = null

    try {
      await fontService.loadFont(fontName, fontUrl)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const loadMultipleFonts = async (fonts) => {
    isLoading.value = true
    error.value = null

    try {
      await fontService.loadMultipleFonts(fonts)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    loadFont,
    loadMultipleFonts,
    isLoading,
    error
  }
}

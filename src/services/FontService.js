// Interface/Contract para fontes
export class FontProvider {
  // eslint-disable-next-line no-unused-vars
  loadFont(fontName, fontUrl) {
    throw new Error('loadFont deve ser implementado')
  }
}

export class GoogleFontsProvider extends FontProvider {
  loadFont(fontName, fontUrl) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.href = fontUrl
      link.rel = 'stylesheet'
      link.onload = () => resolve(fontName)
      link.onerror = () => reject(new Error(`Falha ao carregar fonte: ${fontName}`))
      document.head.appendChild(link)
    })
  }
}

// Implementação para fontes locais
export class LocalFontsProvider extends FontProvider {
  loadFont(fontName, fontPath) {
    return new Promise((resolve) => {
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: '${fontName}';
          src: url('${fontPath}') format('woff2');
          font-display: swap;
        }
      `
      document.head.appendChild(style)
      resolve(fontName)
    })
  }
}

export class FontService {
  constructor(fontProvider) {
    this.fontProvider = fontProvider
    this.loadedFonts = new Set()
  }

  async loadFont(fontName, fontUrl) {
    if (this.loadedFonts.has(fontName)) {
      return fontName
    }

    try {
      await this.fontProvider.loadFont(fontName, fontUrl)
      this.loadedFonts.add(fontName)
      return fontName
    } catch (error) {
      console.error(`Erro ao carregar fonte ${fontName}:`, error)
      throw error
    }
  }

  async loadMultipleFonts(fonts) {
    const promises = fonts.map(({ name, url }) =>
      this.loadFont(name, url)
    )
    return Promise.all(promises)
  }
}

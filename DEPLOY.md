# 🚀 Guia de Deploy - Calculadora CUB Rondônia

## Opções de Hospedagem Gratuita

### 1. **GitHub Pages** (Recomendado)
```bash
# 1. Crie um repositório no GitHub
# 2. Faça upload dos arquivos
# 3. Vá em Settings > Pages
# 4. Selecione "Deploy from a branch" > main
# 5. Sua calculadora estará disponível em: username.github.io/repositorio
```

### 2. **Netlify**
```bash
# 1. Acesse netlify.com
# 2. Arraste a pasta do projeto para o deploy
# 3. Receba um link automático
# 4. (Opcional) Configure domínio personalizado
```

### 3. **Vercel**
```bash
# 1. Acesse vercel.com
# 2. Conecte com GitHub ou faça upload
# 3. Deploy automático
# 4. URL personalizada disponível
```

### 4. **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔧 Configurações Avançadas

### Analytics (Google Analytics)
Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### PWA (Progressive Web App)
Criar arquivo `manifest.json`:

```json
{
  "name": "Calculadora CUB Rondônia",
  "short_name": "CUB-RO",
  "description": "Calculadora CUB para construção civil em Rondônia",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker (Funciona Offline)
Criar arquivo `sw.js`:

```javascript
const CACHE_NAME = 'cub-calculator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

## 🎨 Personalizações Possíveis

### Cores e Tema
No `style.css`, altere as variáveis:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  --text-color: #2d3748;
}
```

### Logo Personalizado
Substitua o ícone do cabeçalho:

```html
<!-- Trocar -->
<i class="fas fa-calculator header-icon"></i>
<!-- Por -->
<img src="logo.png" alt="Logo" class="header-logo">
```

### Domínio Personalizado
Para sites profissionais, configure:
- **Registro.br**: Domínios .com.br
- **Cloudflare**: DNS e CDN gratuito
- **Let's Encrypt**: SSL gratuito

## 📊 Melhorias Futuras Sugeridas

### 1. **Backend com API**
```javascript
// Estrutura para dados dinâmicos
const API_BASE = 'https://api.sinduscon-ro.com.br/cub';

async function getCUBData(month, year) {
  const response = await fetch(`${API_BASE}/${month}/${year}`);
  return await response.json();
}
```

### 2. **Banco de Dados**
- **Firebase Firestore**: Para histórico de cálculos
- **Supabase**: Backend como serviço
- **MongoDB Atlas**: Banco NoSQL gratuito

### 3. **Funcionalidades Avançadas**
```javascript
// Correção monetária
function corrigirValor(valor, indice, dataBase, dataAtual) {
  const fator = calcularFatorCorrecao(indice, dataBase, dataAtual);
  return valor * fator;
}

// Comparativo de custos
function compararProjetos(projetos) {
  return projetos.map(projeto => ({
    ...projeto,
    custoTotal: calcularCusto(projeto),
    economiaPercentual: calcularEconomia(projeto)
  })).sort((a, b) => a.custoTotal - b.custoTotal);
}

// Simulador de financiamento
function simularFinanciamento(valorTotal, entrada, prazo, taxa) {
  const valorFinanciado = valorTotal - entrada;
  const parcela = calcularParcela(valorFinanciado, prazo, taxa);
  return { parcela, totalPago: parcela * prazo };
}
```

### 4. **Integrações Úteis**
- **API do Banco Central**: Índices econômicos
- **WhatsApp Business API**: Compartilhar orçamentos
- **Email.js**: Envio de relatórios por email
- **Google Maps API**: Localização da obra

## 🔒 Segurança e Performance

### Otimizações CSS
```css
/* Carregamento de fontes otimizado */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('fonts/inter.woff2') format('woff2');
}

/* Lazy loading de imagens */
img[loading="lazy"] {
  opacity: 0;
  transition: opacity 0.3s;
}
img[loading="lazy"].loaded {
  opacity: 1;
}
```

### Compressão de Arquivos
```bash
# Minificar CSS
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# Minificar JavaScript  
npm install -g uglify-js
uglifyjs script.js -o script.min.js -c -m
```

### Headers de Segurança
Para servidores próprios:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📈 Métricas e Monitoramento

### Google Analytics Events
```javascript
// Rastrear uso da calculadora
gtag('event', 'calculo_realizado', {
  'categoria': 'calculadora',
  'acao': 'calculo',
  'rotulo': tipoConstru + '_' + projeto
});

// Rastrear downloads de PDF
gtag('event', 'pdf_downloaded', {
  'categoria': 'relatorio',
  'acao': 'download',
  'valor': Math.round(custoTotal)
});
```

### Hotjar (Heatmaps)
```html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## 🎯 Marketing e SEO

### Meta Tags Essenciais
```html
<meta name="description" content="Calculadora CUB oficial para Rondônia. Calcule o custo de construção baseado na NBR 12721 com dados do SINDUSCON-RO.">
<meta name="keywords" content="CUB, Rondônia, construção civil, calculadora, NBR 12721, SINDUSCON">
<meta name="author" content="SINDUSCON-RO">

<!-- Open Graph -->
<meta property="og:title" content="Calculadora CUB - Rondônia 2026">
<meta property="og:description" content="Calcule o custo de sua construção com base no CUB oficial de Rondônia">
<meta property="og:image" content="https://seusite.com/preview.png">
<meta property="og:url" content="https://seusite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Calculadora CUB - Rondônia">
<meta name="twitter:description" content="Ferramenta oficial para cálculo de custos de construção">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora CUB Rondônia",
  "description": "Calculadora oficial do Custo Unitário Básico de construção para Rondônia",
  "url": "https://seusite.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
}
```

---

## 🚀 Checklist de Deploy

- [ ] Testar em diferentes navegadores
- [ ] Verificar responsividade mobile
- [ ] Validar cálculos com dados conhecidos  
- [ ] Configurar analytics
- [ ] Otimizar imagens (se houver)
- [ ] Minificar CSS/JS (produção)
- [ ] Configurar SSL/HTTPS
- [ ] Testar velocidade de carregamento
- [ ] Configurar domínio (se aplicável)
- [ ] Criar backup dos arquivos

**Tempo estimado de deploy: 30-60 minutos**

---

*Este guia foi criado para facilitar o deploy e evolução da Calculadora CUB Rondônia. Para dúvidas técnicas, consulte a documentação das respectivas plataformas.*
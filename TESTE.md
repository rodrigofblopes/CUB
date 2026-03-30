# 🧪 Plano de Testes - Calculadora CUB Rondônia

## ✅ Checklist de Funcionalidades

### Interface e Design
- [ ] **Layout responsivo**: Teste em desktop, tablet e mobile
- [ ] **Navegadores**: Chrome, Firefox, Safari, Edge  
- [ ] **Carregamento**: Fontes e ícones carregam corretamente
- [ ] **Animações**: Transições suaves funcionam
- [ ] **Cores e contraste**: Legibilidade em diferentes dispositivos

### Seleção de Dados
- [ ] **Tipo de Construção**: Todos os tipos aparecem no dropdown
- [ ] **Padrões**: Padrões corretos para cada tipo
- [ ] **Projetos**: Projetos específicos carregam dinamicamente
- [ ] **Descrições**: Help text aparece para cada projeto selecionado

### Cálculos Básicos
- [ ] **Área válida**: Aceita números decimais (ex: 150.50)  
- [ ] **Validação**: Rejeita valores inválidos (negativos, zero, texto)
- [ ] **Cálculo base**: CUB × Área = resultado correto
- [ ] **Formatação**: Valores em Real brasileiro (R$ 1.234,56)

### Custos Adicionais
- [ ] **Checkbox**: Liga/desliga seção de custos extras
- [ ] **Percentuais**: Aceita valores decimais (ex: 15.5%)
- [ ] **Cálculo correto**: Percentuais aplicados sobre custo base
- [ ] **Valores padrão**: Fundações 15%, Projetos 5%, BDI 25%

### Resultado e Relatório
- [ ] **Exibição**: Card de resultado aparece após cálculo
- [ ] **Detalhamento**: Todos os valores intermediários mostrados
- [ ] **PDF**: Geração de relatório funciona
- [ ] **Novo cálculo**: Botão limpa e reseta formulário

## 🎯 Casos de Teste

### Teste 1: Casa Unifamiliar Padrão Normal
```
Tipo: Residencial
Padrão: Normal  
Projeto: R-1 (R$ 2.626,12/m²)
Área: 150 m²
Custos Adicionais: NÃO

Resultado Esperado: R$ 393.918,00
```

### Teste 2: Prédio Comercial com Custos Extras
```
Tipo: Comercial
Padrão: Alto
Projeto: CSL-16 (R$ 3.481,14/m²)  
Área: 2.000 m²
Custos Adicionais: SIM
- Fundações: 20%
- Projetos: 8% 
- BDI: 30%
- Outros: 2%

Cálculo:
Custo Base: R$ 6.962.280,00
Custos Extras (60%): R$ 4.177.368,00
Resultado Esperado: R$ 11.139.648,00
```

### Teste 3: Galpão Industrial Simples
```
Tipo: Outros
Projeto: GI (R$ 1.295,48/m²)
Área: 500 m²
Custos Adicionais: NÃO

Resultado Esperado: R$ 647.740,00
```

### Teste 4: Residência Popular
```
Tipo: Outros  
Projeto: RP1Q (R$ 2.207,09/m²)
Área: 40 m²
Custos Adicionais: SIM
- Fundações: 10%
- BDI: 20%

Cálculo:
Custo Base: R$ 88.283,60
Custos Extras (30%): R$ 26.485,08
Resultado Esperado: R$ 114.768,68
```

## 🔍 Testes de Validação

### Dados Inválidos
- [ ] **Área zero**: Deve mostrar erro
- [ ] **Área negativa**: Deve mostrar erro  
- [ ] **Área com texto**: Deve mostrar erro
- [ ] **Seleções incompletas**: Deve impedir cálculo
- [ ] **Percentuais > 100%**: Deve aceitar (warning opcional)

### Limites e Edge Cases
- [ ] **Área muito pequena**: 0.01 m² deve funcionar
- [ ] **Área muito grande**: 999.999 m² deve funcionar
- [ ] **Percentuais decimais**: 15.75% deve funcionar  
- [ ] **Todos custos zero**: Deve mostrar apenas custo base

## 📱 Testes de Responsividade

### Breakpoints
- [ ] **Desktop**: ≥ 1024px - Layout em 2 colunas
- [ ] **Tablet**: 768px - 1023px - Layout adaptado  
- [ ] **Mobile Large**: 481px - 767px - Coluna única
- [ ] **Mobile Small**: ≤ 480px - Interface compacta

### Elementos Críticos Mobile
- [ ] **Formulário**: Campos fáceis de tocar (44px mínimo)
- [ ] **Dropdowns**: Funcionam nativamente no dispositivo
- [ ] **Botões**: Tamanho adequado para dedos
- [ ] **Scroll**: Suave em todas as seções
- [ ] **Zoom**: Não quebra layout

## ⚡ Testes de Performance

### Métricas Alvo
- [ ] **First Paint**: < 1 segundo
- [ ] **Interactive**: < 2 segundos  
- [ ] **Tamanho total**: < 1MB
- [ ] **Requests HTTP**: < 10

### Ferramentas de Teste
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: DevTools do Chrome
- **WebPageTest**: https://webpagetest.org/

## 🔐 Testes de Segurança

### Headers HTTP
```bash
# Teste com curl
curl -I https://seusite.com

# Verificar headers:
# Content-Security-Policy
# X-Frame-Options  
# X-Content-Type-Options
```

### Validação Client-side
- [ ] **Input sanitization**: Previne XSS básico
- [ ] **Type validation**: HTML5 input types
- [ ] **Range validation**: Min/max values
- [ ] **Required fields**: Validação obrigatória

## 🌐 Testes Cross-Browser

### Desktop Browsers
- [ ] **Chrome 70+**: Funcionalidade completa
- [ ] **Firefox 65+**: Funcionalidade completa  
- [ ] **Safari 12+**: Funcionalidade completa
- [ ] **Edge 79+**: Funcionalidade completa

### Mobile Browsers  
- [ ] **iOS Safari**: iPhone/iPad
- [ ] **Chrome Mobile**: Android
- [ ] **Samsung Internet**: Dispositivos Samsung
- [ ] **Firefox Mobile**: Android

### Funcionalidades por Browser
```javascript
// Teste de compatibilidade
const features = {
  promises: !!window.Promise,
  fetch: !!window.fetch,
  es6: (() => { try { eval('const a = 1'); return true; } catch(e) { return false; } })(),
  flexbox: CSS.supports('display', 'flex'),
  grid: CSS.supports('display', 'grid')
};

console.log('Browser support:', features);
```

## 📊 Dados de Teste

### Valores CUB para Validação
```javascript
// Dados conhecidos para verificar cálculos
const testeCUB = {
  'R-1-baixo': 2382.78,
  'R-1-normal': 2626.12, 
  'R-1-alto': 3512.64,
  'CSL-16-alto': 3481.14,
  'GI': 1295.48,
  'RP1Q': 2207.09
};

// Função de teste automático
function testarCalculo(projeto, area, esperado) {
  const calculado = CUB_DATA[projeto] * area;
  const diferenca = Math.abs(calculado - esperado);
  const tolerancia = 0.01; // 1 centavo
  
  return diferenca <= tolerancia;
}
```

## 🎨 Testes de Acessibilidade

### WCAG 2.1 Guidelines
- [ ] **Contraste de cores**: Mínimo 4.5:1
- [ ] **Navegação por teclado**: Tab funciona em todos elementos
- [ ] **Labels**: Todos inputs têm labels associados  
- [ ] **Alt text**: Imagens têm texto alternativo
- [ ] **Focus indicators**: Elementos focados são visíveis

### Ferramentas de Teste
- **axe DevTools**: Extensão do navegador
- **WAVE**: https://wave.webaim.org/
- **Lighthouse Accessibility**: Audit no Chrome DevTools

## 📝 Documentação dos Testes

### Template de Reporte
```
TESTE: [Nome do teste]
DATA: [DD/MM/YYYY]  
TESTADOR: [Nome]
AMBIENTE: [Browser + OS]

STEPS:
1. [Passo 1]
2. [Passo 2] 
3. [Passo 3]

RESULTADO ESPERADO:
[Descrição]

RESULTADO ATUAL:
[Descrição]

STATUS: ✅ PASSOU / ❌ FALHOU / ⚠️ PARCIAL

EVIDÊNCIA: [Screenshot/video se necessário]

OBSERVAÇÕES:
[Notas adicionais]
```

---

## 🚀 Execução dos Testes

### Ordem Recomendada
1. **Funcionalidade básica** (cálculos corretos)
2. **Interface e UX** (responsividade, navegação)  
3. **Performance** (velocidade, otimização)
4. **Compatibilidade** (browsers, devices)
5. **Acessibilidade** (WCAG compliance)
6. **Segurança** (validações, headers)

### Critérios de Aprovação
- ✅ **Funcionalidade**: 100% dos casos de teste passam
- ✅ **Performance**: Score > 90 no Lighthouse  
- ✅ **Responsivo**: Funciona em todos breakpoints
- ✅ **Cross-browser**: Suporte mínimo confirmado
- ✅ **Acessibilidade**: Score > 95 no axe

---

**Tempo estimado de testes completos: 2-4 horas**

*Mantenha este checklist atualizado conforme novas funcionalidades são adicionadas.*
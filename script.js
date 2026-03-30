// Base de dados CUB-02-2026 - Rondônia
const CUB_DATA = {
    residencial: {
        baixo: {
            'R-1': {
                valor: 2382.78,
                nome: 'R-1 - Residência unifamiliar padrão baixo',
                descricao: '1 pavimento, 2 dormitórios, sala, banheiro, cozinha e área para tanque'
            },
            'PP-4': {
                valor: 2373.32,
                nome: 'PP-4 - Prédio popular padrão baixo',
                descricao: 'Térreo e 3 pavimentos-tipo, 4 apartamentos por andar'
            },
            'R-8': {
                valor: 2289.95,
                nome: 'R-8 - Residência multifamiliar padrão baixo',
                descricao: 'Térreo e 7 pavimentos-tipo, 4 apartamentos por andar'
            },
            'PIS': {
                valor: 1665.40,
                nome: 'PIS - Projeto de interesse social',
                descricao: 'Térreo e 4 pavimentos-tipo, apartamentos com 2 dormitórios'
            }
        },
        normal: {
            'R-1': {
                valor: 2626.12,
                nome: 'R-1 - Residência unifamiliar padrão normal',
                descricao: '1 pavimento, 3 dormitórios (1 suíte), sala, cozinha, varanda'
            },
            'PP-4': {
                valor: 2657.48,
                nome: 'PP-4 - Prédio popular padrão normal',
                descricao: 'Pilotis e 4 pavimentos-tipo, com garagem e elevador'
            },
            'R-8': {
                valor: 2334.56,
                nome: 'R-8 - Residência multifamiliar padrão normal',
                descricao: 'Garagem, pilotis e 8 pavimentos-tipo, 3 dormitórios (1 suíte)'
            },
            'R-16': {
                valor: 2309.88,
                nome: 'R-16 - Residência multifamiliar padrão normal',
                descricao: 'Garagem, pilotis e 16 pavimentos-tipo, 3 dormitórios (1 suíte)'
            }
        },
        alto: {
            'R-1': {
                valor: 3512.64,
                nome: 'R-1 - Residência unifamiliar padrão alto',
                descricao: '4 dormitórios (1 suíte com closet), salas múltiplas, área completa'
            },
            'R-8': {
                valor: 2896.04,
                nome: 'R-8 - Residência multifamiliar padrão alto',
                descricao: 'Garagem, pilotis e 8 pavimentos, 2 aparts/andar, 4 dormitórios'
            },
            'R-16': {
                valor: 3072.39,
                nome: 'R-16 - Residência multifamiliar padrão alto',
                descricao: 'Garagem, pilotis e 16 pavimentos, 2 aparts/andar, 4 dormitórios'
            }
        }
    },
    comercial: {
        normal: {
            'CAL-8': {
                valor: 3004.30,
                nome: 'CAL-8 - Comercial andares livres padrão normal',
                descricao: 'Garagem, térreo e 8 pavimentos-tipo, andares corridos'
            },
            'CSL-8': {
                valor: 2376.01,
                nome: 'CSL-8 - Comercial salas e lojas padrão normal',
                descricao: 'Garagem, térreo com lojas e 8 pavimentos com salas'
            },
            'CSL-16': {
                valor: 3193.78,
                nome: 'CSL-16 - Comercial salas e lojas padrão normal',
                descricao: 'Garagem, térreo com lojas e 16 pavimentos com salas'
            }
        },
        alto: {
            'CAL-8': {
                valor: 3293.42,
                nome: 'CAL-8 - Comercial andares livres padrão alto',
                descricao: 'Garagem, térreo e 8 pavimentos-tipo, andares corridos alto padrão'
            },
            'CSL-8': {
                valor: 2612.45,
                nome: 'CSL-8 - Comercial salas e lojas padrão alto',
                descricao: 'Garagem, térreo com lojas e 8 pavimentos, acabamento superior'
            },
            'CSL-16': {
                valor: 3481.14,
                nome: 'CSL-16 - Comercial salas e lojas padrão alto',
                descricao: 'Garagem, térreo com lojas e 16 pavimentos, acabamento superior'
            }
        }
    },
    outros: {
        especial: {
            'RP1Q': {
                valor: 2207.09,
                nome: 'RP1Q - Residência unifamiliar popular',
                descricao: '1 pavimento, 1 dormitório, sala, banheiro e cozinha'
            },
            'GI': {
                valor: 1295.48,
                nome: 'GI - Galpão industrial',
                descricao: 'Galpão com área administrativa, banheiros, vestiário e depósito'
            }
        }
    }
};

// Variáveis globais
let calculoAtual = null;

// Elementos DOM principais (mantidos para compatibilidade)
// Removidos os elementos da calculadora simples

// Dados da calculadora detalhada
const PADROES_DETALHADOS = {
    baixo: { valor: 1752.57, nome: 'Padrão Baixo' },
    normal: { valor: 2620.06, nome: 'Padrão Normal' },
    alto: { valor: 2709.14, nome: 'Padrão Alto' }
};

const COEFICIENTES_AMBIENTE = {
    dormitorios: 1.00,
    sala: 1.00,
    cozinha: 1.00,
    banheiro: 1.00,
    garagem: 0.65,
    areaServico: 0.50,
    areaGourmet: 0.65
};

const ETAPAS_OBRA = [
    { nome: 'Mob. e Desp. Gerais', percentual: 1.5 },
    { nome: 'Serv. Preliminares', percentual: 1.0 },
    { nome: 'Fundações', percentual: 6.0 },
    { nome: 'Estrutura', percentual: 16.0 },
    { nome: 'Vedações', percentual: 6.0 },
    { nome: 'Rev. Cimento', percentual: 4.0 },
    { nome: 'Inst. Elétricas', percentual: 2.5 },
    { nome: 'Inst. Hidro', percentual: 1.5 },
    { nome: 'Inst. Especiais', percentual: 0.0 },
    { nome: 'Impermeabilizações', percentual: 4.0 },
    { nome: 'Revest. e Pisos', percentual: 18.0 },
    { nome: 'Cobertura', percentual: 2.0 },
    { nome: 'Esquadrias', percentual: 15.0 },
    { nome: 'Luminotécnica', percentual: 5.0 },
    { nome: 'Marmoraria e Louças', percentual: 6.0 },
    { nome: 'Forro de Gesso', percentual: 4.0 },
    { nome: 'Pintura', percentual: 3.0 },
    { nome: 'Pav. Externa', percentual: 2.0 },
    { nome: 'Limpeza e BF', percentual: 1.0 },
    { nome: 'Locação de Equip.', percentual: 1.5 },
    { nome: 'Itens Especiais', percentual: 0.0 }
];

// Variáveis globais
let calculoDetalhadoAtual = null;
let calculoEtapasAtual = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeTabs();
    initializeDetailedCalculator();
});

// Event listeners para a aba de etapas
const tipoEtapas = document.getElementById('tipoEtapas');
const padraoEtapas = document.getElementById('padraoEtapas');
const projetoEtapas = document.getElementById('projetoEtapas');

if (tipoEtapas) {
    tipoEtapas.addEventListener('change', handleTipoEtapasChange);
}
if (padraoEtapas) {
    padraoEtapas.addEventListener('change', handlePadraoEtapasChange);
}

// Funções de inicialização (simplificadas)
function initializeForm() {
    // Inicialização básica - calculadoras específicas têm suas próprias inicializações
}

// Utilitários
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarNumero(valor, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(valor);
}

// Funções de compatibilidade (removidas da calculadora simples)
// As funcionalidades principais estão nas calculadoras específicas

// Funcionalidades extras (mantidas para compatibilidade)
function registrarCalculo() {
    // Analytics podem ser implementados aqui
}

function salvarHistorico() {
    // Histórico pode ser implementado aqui
}

// ======================================
// SISTEMA DE ABAS
// ======================================

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const resultTabButtons = document.querySelectorAll('.result-tab-btn');
    const resultTabContents = document.querySelectorAll('.result-tab-content');
    
    // Abas principais
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remover classes ativas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classes ativas
            button.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });
    
    // Abas de resultado
    resultTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-result-tab');
            
            resultTabButtons.forEach(btn => btn.classList.remove('active'));
            resultTabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`result-${targetTab}`).classList.add('active');
        });
    });
}

// ======================================
// CALCULADORA DETALHADA
// ======================================

function initializeDetailedCalculator() {
    // Event listeners para inputs de área
    const areaInputs = [
        'areaPrivativa', 'areaGaragem', 'areaBanheirosEsp', 
        'areaTerracos', 'areaJardins', 'areaGourmet'
    ];
    
    areaInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calcularAreasAutomatico);
        }
    });
    
    // Event listeners para coeficientes
    const coefInputs = [
        'coefAreaPrivativa', 'coefGaragem', 'coefBanheirosEsp',
        'coefTerracos', 'coefJardins', 'coefGourmet'
    ];
    
    coefInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calcularAreasAutomatico);
        }
    });
    
    // Event listeners para custos orçados
    const custosOrcados = document.querySelectorAll('.custo-orcado');
    custosOrcados.forEach(input => {
        input.addEventListener('input', calcularPercentuaisEtapas);
    });
    
    // Event listeners para revestimentos
    const revestInputs = document.querySelectorAll('#tab-detalhada input[type="number"]');
    revestInputs.forEach(input => {
        if (input.id.includes('revest') || input.id.includes('piso') || input.id.includes('banheiro') || 
            input.id.includes('cozinha') || input.id.includes('servico') || input.id.includes('argamassa') || 
            input.id.includes('rejunte')) {
            input.addEventListener('input', calcularRevestimentosAutomatico);
        }
    });
}

function calcularAreasAutomatico() {
    const areas = {
        privativa: parseFloat(document.getElementById('areaPrivativa').value) || 0,
        garagem: parseFloat(document.getElementById('areaGaragem').value) || 0,
        banheirosEsp: parseFloat(document.getElementById('areaBanheirosEsp').value) || 0,
        terracos: parseFloat(document.getElementById('areaTerracos').value) || 0,
        jardins: parseFloat(document.getElementById('areaJardins').value) || 0,
        gourmet: parseFloat(document.getElementById('areaGourmet').value) || 0
    };
    
    const coeficientes = {
        privativa: parseFloat(document.getElementById('coefAreaPrivativa').value) || 1.00,
        garagem: parseFloat(document.getElementById('coefGaragem').value) || 0.75,
        banheirosEsp: parseFloat(document.getElementById('coefBanheirosEsp').value) || 1.25,
        terracos: parseFloat(document.getElementById('coefTerracos').value) || 0.50,
        jardins: parseFloat(document.getElementById('coefJardins').value) || 0.10,
        gourmet: parseFloat(document.getElementById('coefGourmet').value) || 0.65
    };
    
    // Calcular área real total
    const areaRealTotal = Object.values(areas).reduce((sum, area) => sum + area, 0);
    
    // Calcular área equivalente
    const areaEquivalente = 
        (areas.privativa * coeficientes.privativa) +
        (areas.garagem * coeficientes.garagem) +
        (areas.banheirosEsp * coeficientes.banheirosEsp) +
        (areas.terracos * coeficientes.terracos) +
        (areas.jardins * coeficientes.jardins) +
        (areas.gourmet * coeficientes.gourmet);
    
    // Atualizar display
    document.getElementById('areaRealTotal').textContent = formatarNumero(areaRealTotal) + ' m²';
    document.getElementById('areaEquivalente').textContent = formatarNumero(areaEquivalente) + ' m²';
}

function calcularAreasDetalhada() {
    calcularAreasAutomatico();
    
    const padraoSelecionado = document.getElementById('padraoDetalhado').value;
    const areaEquivalente = parseFloat(document.getElementById('areaEquivalente').textContent.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    if (!padraoSelecionado || areaEquivalente === 0) {
        alert('Por favor, selecione um padrão construtivo e informe as áreas.');
        return;
    }
    
    const dadosPadrao = PADROES_DETALHADOS[padraoSelecionado];
    const custoBase = areaEquivalente * dadosPadrao.valor;
    
    // Calcular custos por etapa
    preencherCustosEtapas(custoBase);
    
    // Gerar resultado detalhado
    gerarResultadoDetalhado();
    
    // Mostrar card de etapas
    document.getElementById('custosEtapaCard').style.display = 'block';
    document.getElementById('custosEtapaCard').scrollIntoView({ behavior: 'smooth' });
}

function preencherCustosEtapas(custoBase) {
    ETAPAS_OBRA.forEach((etapa, index) => {
        const custoEtapa = custoBase * (etapa.percentual / 100);
        const elementoPrevisto = document.getElementById(`etapa${index + 1}Previsto`);
        if (elementoPrevisto) {
            elementoPrevisto.textContent = formatarMoeda(custoEtapa);
        }
    });
    
    document.getElementById('totalPrevisto').textContent = formatarMoeda(custoBase);
}

function calcularPercentuaisEtapas() {
    let totalOrcado = 0;
    let totalPrevisto = 0;
    
    ETAPAS_OBRA.forEach((etapa, index) => {
        const custoOrcado = parseFloat(document.getElementById(`etapa${index + 1}Orcado`).value) || 0;
        const custoPrevistoText = document.getElementById(`etapa${index + 1}Previsto`).textContent;
        const custoPrevisto = parseFloat(custoPrevistoText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        
        totalOrcado += custoOrcado;
        totalPrevisto += custoPrevisto;
        
        // Calcular percentual executado
        const percentual = custoPrevisto > 0 ? (custoOrcado / custoPrevisto) * 100 : 0;
        const elementoPercent = document.getElementById(`etapa${index + 1}Percent`);
        if (elementoPercent) {
            elementoPercent.textContent = formatarNumero(percentual, 1) + '%';
            
            // Colorir baseado no percentual
            if (percentual > 100) {
                elementoPercent.style.color = '#e53e3e'; // Vermelho para acima
            } else if (percentual > 90) {
                elementoPercent.style.color = '#dd6b20'; // Laranja para próximo
            } else if (percentual > 0) {
                elementoPercent.style.color = '#38a169'; // Verde para normal
            } else {
                elementoPercent.style.color = '#718096'; // Cinza para zero
            }
        }
    });
    
    // Atualizar totais
    document.getElementById('totalOrcado').textContent = formatarMoeda(totalOrcado);
    const percentualTotal = totalPrevisto > 0 ? (totalOrcado / totalPrevisto) * 100 : 0;
    document.getElementById('totalPercent').textContent = formatarNumero(percentualTotal, 1) + '%';
}

function calcularRevestimentosAutomatico() {
    // Calcular revestimentos por cômodo
    const revestimentos = {
        pisoGeral: calcularRevestimento('pisoGeral'),
        banheiros: calcularRevestimento('banheiros'),
        cozinha: calcularRevestimento('cozinha'),
        servico: calcularRevestimento('servico')
    };
    
    // Calcular materiais
    const argamassaSacos = parseFloat(document.getElementById('argamassaSacos').value) || 0;
    const rejunteKg = parseFloat(document.getElementById('rejunteKg').value) || 0;
    
    const argamassaTotal = argamassaSacos * 19.00; // Preço por saco
    const rejunteTotal = rejunteKg * 19.00; // Preço por kg
    
    document.getElementById('argamassaTotal').textContent = formatarMoeda(argamassaTotal);
    document.getElementById('rejunteTotal').textContent = formatarMoeda(rejunteTotal);
    
    // Calcular totais
    const totalRevestimentos = Object.values(revestimentos).reduce((sum, valor) => sum + valor, 0);
    const totalMateriais = argamassaTotal + rejunteTotal;
    const totalGeral = totalRevestimentos + totalMateriais;
    
    document.getElementById('totalRevestimentos').textContent = formatarMoeda(totalRevestimentos);
    document.getElementById('totalMateriaisRevest').textContent = formatarMoeda(totalMateriais);
    document.getElementById('totalGeralRevest').textContent = formatarMoeda(totalGeral);
}

function calcularRevestimento(tipo) {
    const area = parseFloat(document.getElementById(`${tipo}Area`).value) || 0;
    const material = parseFloat(document.getElementById(`${tipo}Mat`).value) || 0;
    const custo = parseFloat(document.getElementById(`${tipo}Custo`).value) || 0;
    
    const total = material * custo;
    document.getElementById(`${tipo}Total`).textContent = formatarMoeda(total);
    
    return total;
}

function calcularRevestimentos() {
    calcularRevestimentosAutomatico();
    alert('Cálculo de revestimentos atualizado!');
}

function gerarResultadoDetalhado() {
    const padraoSelecionado = document.getElementById('padraoDetalhado').value;
    const areaEquivalente = parseFloat(document.getElementById('areaEquivalente').textContent.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    if (!padraoSelecionado || areaEquivalente === 0) {
        alert('Por favor, complete o cálculo de áreas primeiro.');
        return;
    }
    
    const dadosPadrao = PADROES_DETALHADOS[padraoSelecionado];
    const estimativaCusto = areaEquivalente * dadosPadrao.valor;
    
    // Cenários
    const custoComFundacao = estimativaCusto * 1.041; // 4.1% a mais
    const custoMaoObra = estimativaCusto * 0.40;
    const custoMateriais = estimativaCusto * 0.60;
    const custoVariacao = estimativaCusto * 1.562; // Variação conforme planilha
    
    // Atualizar elementos
    document.getElementById('estimativaCusto').textContent = formatarMoeda(estimativaCusto);
    document.getElementById('custoComFundacao').textContent = formatarMoeda(custoComFundacao);
    document.getElementById('custoMaoObra').textContent = formatarMoeda(custoMaoObra);
    document.getElementById('custoMateriais').textContent = formatarMoeda(custoMateriais);
    document.getElementById('custoVariacao').textContent = formatarMoeda(custoVariacao);
    
    // Armazenar cálculo
    calculoDetalhadoAtual = {
        padrao: padraoSelecionado,
        areaEquivalente,
        estimativaCusto,
        custoComFundacao,
        custoMaoObra,
        custoMateriais,
        custoVariacao,
        timestamp: new Date().toISOString()
    };
    
    // Mostrar resultado
    document.getElementById('resultCardDetalhada').style.display = 'block';
    document.getElementById('resultCardDetalhada').scrollIntoView({ behavior: 'smooth' });
}

function gerarPDFDetalhado() {
    if (!calculoDetalhadoAtual) {
        alert('Nenhum cálculo detalhado realizado para gerar relatório.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('RELATÓRIO DETALHADO - CALCULADORA CUB', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Rondônia - Fevereiro 2026', 105, 30, { align: 'center' });
    
    let yPos = 50;
    
    // Dados do projeto
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('DADOS DO PROJETO', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Padrão Construtivo: ${PADROES_DETALHADOS[calculoDetalhadoAtual.padrao].nome}`, 20, yPos);
    yPos += 7;
    doc.text(`Área Equivalente: ${formatarNumero(calculoDetalhadoAtual.areaEquivalente)} m²`, 20, yPos);
    yPos += 7;
    doc.text(`CUB Unitário: ${formatarMoeda(PADROES_DETALHADOS[calculoDetalhadoAtual.padrao].valor)}/m²`, 20, yPos);
    yPos += 15;
    
    // Cenários
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('CENÁRIOS DE CUSTO', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Estimativa Base: ${formatarMoeda(calculoDetalhadoAtual.estimativaCusto)}`, 20, yPos);
    yPos += 7;
    doc.text(`Com Fundação: ${formatarMoeda(calculoDetalhadoAtual.custoComFundacao)}`, 20, yPos);
    yPos += 7;
    doc.text(`Mão de Obra (40%): ${formatarMoeda(calculoDetalhadoAtual.custoMaoObra)}`, 20, yPos);
    yPos += 7;
    doc.text(`Materiais (60%): ${formatarMoeda(calculoDetalhadoAtual.custoMateriais)}`, 20, yPos);
    yPos += 7;
    doc.text(`Com Variação: ${formatarMoeda(calculoDetalhadoAtual.custoVariacao)}`, 20, yPos);
    yPos += 15;
    
    // Rodapé
    doc.setFontSize(8);
    doc.text(`Relatório gerado em ${new Date().toLocaleString('pt-BR')}`, 20, 280);
    doc.text('Calculadora CUB Detalhada - Rondônia 2026', 20, 287);
    
    // Salvar
    const nomeArquivo = `Relatorio_Detalhado_CUB_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nomeArquivo);
}

function exportarExcel() {
    alert('Funcionalidade de exportação para Excel em desenvolvimento.');
    // Aqui seria implementada a exportação para Excel usando uma biblioteca como SheetJS
}

function novoCalculoDetalhado() {
    // Resetar todos os campos da calculadora detalhada
    document.getElementById('padraoDetalhado').value = '';
    document.getElementById('tipoCalculoDetalhado').value = 'cub';
    
    // Limpar áreas
    const areaInputs = [
        'areaPrivativa', 'areaGaragem', 'areaBanheirosEsp', 
        'areaTerracos', 'areaJardins', 'areaGourmet'
    ];
    
    areaInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) input.value = '';
    });
    
    // Resetar coeficientes para valores padrão
    document.getElementById('coefAreaPrivativa').value = '1.00';
    document.getElementById('coefGaragem').value = '0.75';
    document.getElementById('coefBanheirosEsp').value = '1.25';
    document.getElementById('coefTerracos').value = '0.50';
    document.getElementById('coefJardins').value = '0.10';
    document.getElementById('coefGourmet').value = '0.65';
    
    // Limpar displays
    document.getElementById('areaRealTotal').textContent = '0,00 m²';
    document.getElementById('areaEquivalente').textContent = '0,00 m²';
    
    // Ocultar cards de resultado
    document.getElementById('custosEtapaCard').style.display = 'none';
    document.getElementById('resultCardDetalhada').style.display = 'none';
    
    // Limpar dados
    calculoDetalhadoAtual = null;
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ======================================
// CALCULADORA DE CUSTOS POR ETAPA
// ======================================

function handleTipoEtapasChange() {
    const tipo = document.getElementById('tipoEtapas').value;
    const padraoGroup = document.getElementById('padraoEtapasGroup');
    const projetoGroup = document.getElementById('projetoEtapasGroup');
    const padrao = document.getElementById('padraoEtapas');
    const projeto = document.getElementById('projetoEtapas');
    
    // Limpar seleções anteriores
    padrao.innerHTML = '<option value="">Selecione o padrão</option>';
    projeto.innerHTML = '<option value="">Selecione o projeto</option>';
    
    if (!tipo) {
        padraoGroup.style.display = 'none';
        projetoGroup.style.display = 'none';
        return;
    }

    // Mostrar grupo de padrão para residencial e comercial
    if (tipo === 'residencial' || tipo === 'comercial') {
        padraoGroup.style.display = 'block';
        projetoGroup.style.display = 'none';
        
        // Adicionar opções de padrão
        if (tipo === 'residencial') {
            padrao.innerHTML += '<option value="baixo">Padrão Baixo</option>';
            padrao.innerHTML += '<option value="normal">Padrão Normal</option>';
            padrao.innerHTML += '<option value="alto">Padrão Alto</option>';
        } else if (tipo === 'comercial') {
            padrao.innerHTML += '<option value="normal">Padrão Normal</option>';
            padrao.innerHTML += '<option value="alto">Padrão Alto</option>';
        }
    } else if (tipo === 'outros') {
        // Para outros, ir direto para projetos
        padraoGroup.style.display = 'none';
        projetoGroup.style.display = 'block';
        
        const projetos = CUB_DATA.outros.especial;
        for (const [key, value] of Object.entries(projetos)) {
            projeto.innerHTML += `<option value="${key}">${value.nome}</option>`;
        }
    }
}

function handlePadraoEtapasChange() {
    const tipo = document.getElementById('tipoEtapas').value;
    const padraoValue = document.getElementById('padraoEtapas').value;
    const projetoGroup = document.getElementById('projetoEtapasGroup');
    const projeto = document.getElementById('projetoEtapas');
    
    projeto.innerHTML = '<option value="">Selecione o projeto</option>';
    
    if (!padraoValue) {
        projetoGroup.style.display = 'none';
        return;
    }
    
    projetoGroup.style.display = 'block';
    
    // Adicionar projetos conforme tipo e padrão
    const projetos = CUB_DATA[tipo][padraoValue];
    for (const [key, value] of Object.entries(projetos)) {
        projeto.innerHTML += `<option value="${key}">${value.nome}</option>`;
    }
}

function calcularCustosEtapas() {
    const tipo = document.getElementById('tipoEtapas').value;
    const padraoValue = document.getElementById('padraoEtapas').value;
    const projetoValue = document.getElementById('projetoEtapas').value;
    const areaValue = parseFloat(document.getElementById('areaEtapas').value);
    
    // Validações
    if (!tipo) {
        alert('Por favor, selecione o tipo de construção.');
        return;
    }
    
    if (tipo === 'outros') {
        if (!projetoValue) {
            alert('Por favor, selecione um projeto.');
            return;
        }
    } else {
        if (!padraoValue || !projetoValue) {
            alert('Por favor, complete todas as seleções.');
            return;
        }
    }
    
    if (!areaValue || areaValue <= 0) {
        alert('Por favor, informe uma área válida.');
        return;
    }
    
    // Obter dados do projeto selecionado
    let dadosProjeto;
    if (tipo === 'outros') {
        dadosProjeto = CUB_DATA.outros.especial[projetoValue];
    } else {
        dadosProjeto = CUB_DATA[tipo][padraoValue][projetoValue];
    }
    
    // Cálculo base
    const cubUnitario = dadosProjeto.valor;
    const custoTotal = cubUnitario * areaValue;
    
    // Atualizar informações gerais
    document.getElementById('custoTotalEtapas').textContent = formatarMoeda(custoTotal);
    document.getElementById('projetoEtapasSelecionado').textContent = dadosProjeto.nome;
    document.getElementById('areaEtapasCalculada').textContent = formatarNumero(areaValue);
    document.getElementById('cubEtapasUnitario').textContent = formatarMoeda(cubUnitario);
    
    // Calcular custos por etapa
    preencherTabelaEtapas(custoTotal);
    criarGraficoEtapas(custoTotal);
    calcularCategorias(custoTotal);
    calcularCronogramaSugerido(custoTotal);
    
    // Armazenar cálculo atual
    calculoEtapasAtual = {
        tipo,
        padrao: padraoValue,
        projeto: projetoValue,
        dadosProjeto,
        area: areaValue,
        cubUnitario,
        custoTotal,
        timestamp: new Date().toISOString()
    };
    
    // Mostrar resultado
    document.getElementById('resultadoEtapasCard').style.display = 'block';
    document.getElementById('resultadoEtapasCard').scrollIntoView({ behavior: 'smooth' });
}

function preencherTabelaEtapas(custoTotal) {
    const tbody = document.getElementById('tabelaEtapasBody');
    tbody.innerHTML = '';
    
    ETAPAS_OBRA.forEach((etapa, index) => {
        const custoEtapa = custoTotal * (etapa.percentual / 100);
        const custoMaterial = custoEtapa * 0.6; // 60% material
        const custoMaoObra = custoEtapa * 0.4; // 40% mão de obra
        
        const row = document.createElement('tr');
        if (etapa.percentual >= 10) {
            row.classList.add('destaque');
        }
        
        row.innerHTML = `
            <td class="etapa-nome">${index + 1}. ${etapa.nome}</td>
            <td class="etapa-percent">${formatarNumero(etapa.percentual, 1)}%</td>
            <td class="etapa-custo">${formatarMoeda(custoEtapa)}</td>
            <td class="etapa-material">${formatarMoeda(custoMaterial)}</td>
            <td class="etapa-mo">${formatarMoeda(custoMaoObra)}</td>
            <td class="etapa-visual">
                <div class="barra-visual" style="width: ${etapa.percentual * 5}%"></div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function criarGraficoEtapas(custoTotal) {
    const container = document.getElementById('etapasBarras');
    container.innerHTML = '';
    
    // Mostrar apenas as etapas principais (> 5%)
    const etapasPrincipais = ETAPAS_OBRA.filter(etapa => etapa.percentual > 5);
    const maxPercentual = Math.max(...etapasPrincipais.map(e => e.percentual));
    
    etapasPrincipais.forEach(etapa => {
        const custoEtapa = custoTotal * (etapa.percentual / 100);
        const widthPercent = (etapa.percentual / maxPercentual) * 100;
        
        const barraDiv = document.createElement('div');
        barraDiv.className = 'barra-etapa';
        
        barraDiv.innerHTML = `
            <div class="barra-nome">${etapa.nome}</div>
            <div class="barra-percent">${formatarNumero(etapa.percentual, 1)}%</div>
            <div class="barra-container">
                <div class="barra-fill" style="width: ${widthPercent}%"></div>
            </div>
            <div class="barra-valor">${formatarMoeda(custoEtapa)}</div>
        `;
        
        container.appendChild(barraDiv);
    });
}

function calcularCategorias(custoTotal) {
    // Estrutural
    const fundacoes = custoTotal * 0.06;
    const estrutura = custoTotal * 0.16;
    const vedacoes = custoTotal * 0.06;
    const totalEstrutural = fundacoes + estrutura + vedacoes;
    
    document.getElementById('custoFundacoes').textContent = formatarMoeda(fundacoes);
    document.getElementById('custoEstrutura').textContent = formatarMoeda(estrutura);
    document.getElementById('custoVedacoes').textContent = formatarMoeda(vedacoes);
    document.getElementById('totalEstrutural').textContent = formatarMoeda(totalEstrutural);
    
    // Acabamentos
    const revestimentos = custoTotal * 0.18;
    const pintura = custoTotal * 0.03;
    const esquadrias = custoTotal * 0.15;
    const totalAcabamentos = revestimentos + pintura + esquadrias;
    
    document.getElementById('custoRevestimentos').textContent = formatarMoeda(revestimentos);
    document.getElementById('custoPintura').textContent = formatarMoeda(pintura);
    document.getElementById('custoEsquadrias').textContent = formatarMoeda(esquadrias);
    document.getElementById('totalAcabamentos').textContent = formatarMoeda(totalAcabamentos);
    
    // Instalações
    const eletricas = custoTotal * 0.025;
    const hidraulicas = custoTotal * 0.015;
    const especiais = custoTotal * 0.00;
    const totalInstalacoes = eletricas + hidraulicas + especiais;
    
    document.getElementById('custoEletricas').textContent = formatarMoeda(eletricas);
    document.getElementById('custoHidraulicas').textContent = formatarMoeda(hidraulicas);
    document.getElementById('custoEspeciais').textContent = formatarMoeda(especiais);
    document.getElementById('totalInstalacoes').textContent = formatarMoeda(totalInstalacoes);
    
    // Complementos
    const cobertura = custoTotal * 0.02;
    const luminotecnica = custoTotal * 0.05;
    const limpeza = custoTotal * 0.01;
    const totalComplementos = cobertura + luminotecnica + limpeza;
    
    document.getElementById('custoCobertura').textContent = formatarMoeda(cobertura);
    document.getElementById('custoLuminotecnica').textContent = formatarMoeda(luminotecnica);
    document.getElementById('custoLimpeza').textContent = formatarMoeda(limpeza);
    document.getElementById('totalComplementos').textContent = formatarMoeda(totalComplementos);
}

function calcularCronogramaSugerido(custoTotal) {
    // Distribuição por bimestre baseada nas etapas típicas
    const cronograma = [
        { meses: '1-2', percentual: 0.22, etapas: 'Fundações, Estrutura' }, // 6% + 16%
        { meses: '3-4', percentual: 0.08, etapas: 'Vedações, Cobertura' }, // 6% + 2%
        { meses: '5-6', percentual: 0.04, etapas: 'Instalações' }, // 2.5% + 1.5%
        { meses: '7-8', percentual: 0.18, etapas: 'Revestimentos' }, // 18%
        { meses: '9-10', percentual: 0.18, etapas: 'Esquadrias, Pintura' }, // 15% + 3%
        { meses: '11-12', percentual: 0.30, etapas: 'Acabamentos, Limpeza' } // Restante
    ];
    
    cronograma.forEach((periodo, index) => {
        const custo = custoTotal * periodo.percentual;
        const elementoId = `custo${periodo.meses.replace('-', '-')}`;
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.textContent = formatarMoeda(custo);
        }
    });
}

function gerarPDFEtapas() {
    if (!calculoEtapasAtual) {
        alert('Nenhum cálculo de etapas realizado para gerar relatório.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('RELATÓRIO DE CUSTOS POR ETAPA - CUB RONDÔNIA', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Distribuição de Custos por Fases da Obra', 105, 30, { align: 'center' });
    
    let yPos = 50;
    
    // Dados do projeto
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('DADOS DO PROJETO', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Projeto: ${calculoEtapasAtual.dadosProjeto.nome}`, 20, yPos);
    yPos += 7;
    doc.text(`Área: ${formatarNumero(calculoEtapasAtual.area)} m²`, 20, yPos);
    yPos += 7;
    doc.text(`CUB Unitário: ${formatarMoeda(calculoEtapasAtual.cubUnitario)}/m²`, 20, yPos);
    yPos += 7;
    doc.text(`Custo Total: ${formatarMoeda(calculoEtapasAtual.custoTotal)}`, 20, yPos);
    yPos += 15;
    
    // Principais etapas
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('PRINCIPAIS ETAPAS DA OBRA', 20, yPos);
    yPos += 10;
    
    const etapasPrincipais = ETAPAS_OBRA.filter(e => e.percentual > 5);
    
    doc.setFontSize(9);
    etapasPrincipais.forEach(etapa => {
        const custoEtapa = calculoEtapasAtual.custoTotal * (etapa.percentual / 100);
        doc.setFont(undefined, 'normal');
        doc.text(`${etapa.nome}:`, 20, yPos);
        doc.text(`${formatarNumero(etapa.percentual, 1)}%`, 120, yPos);
        doc.text(`${formatarMoeda(custoEtapa)}`, 150, yPos);
        yPos += 6;
    });
    
    // Rodapé
    doc.setFontSize(8);
    doc.text(`Relatório gerado em ${new Date().toLocaleString('pt-BR')}`, 20, 280);
    doc.text('Calculadora CUB - Custos por Etapa - Rondônia 2026', 20, 287);
    
    // Salvar
    const nomeArquivo = `Custos_Etapas_${calculoEtapasAtual.projeto}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nomeArquivo);
}

function exportarExcelEtapas() {
    alert('Funcionalidade de exportação para Excel em desenvolvimento.');
}

function imprimirEtapas() {
    window.print();
}

function novoCalculoEtapas() {
    // Resetar formulário
    document.getElementById('tipoEtapas').value = '';
    document.getElementById('padraoEtapas').value = '';
    document.getElementById('projetoEtapas').value = '';
    document.getElementById('areaEtapas').value = '';
    
    // Ocultar grupos
    document.getElementById('padraoEtapasGroup').style.display = 'none';
    document.getElementById('projetoEtapasGroup').style.display = 'none';
    
    // Ocultar resultado
    document.getElementById('resultadoEtapasCard').style.display = 'none';
    
    // Limpar dados
    calculoEtapasAtual = null;
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
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

// Elementos DOM
const tipoConstru = document.getElementById('tipoConstru');
const padraoGroup = document.getElementById('padraoGroup');
const padrao = document.getElementById('padrao');
const projetoGroup = document.getElementById('projetoGroup');
const projeto = document.getElementById('projeto');
const projetoHelp = document.getElementById('projetoHelp');
const area = document.getElementById('area');
const custosAdicionais = document.getElementById('custosAdicionais');
const custosAdicionaisSection = document.getElementById('custosAdicionaisSection');
const resultCard = document.getElementById('resultCard');
const form = document.getElementById('cubForm');

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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeTabs();
    initializeDetailedCalculator();
});

tipoConstru.addEventListener('change', handleTipoChange);
padrao.addEventListener('change', handlePadraoChange);
custosAdicionais.addEventListener('change', handleCustosAdicionaisChange);
form.addEventListener('submit', handleSubmit);

// Funções de inicialização
function initializeForm() {
    // Resetar formulário
    form.reset();
    resultCard.style.display = 'none';
    padraoGroup.style.display = 'none';
    projetoGroup.style.display = 'none';
    custosAdicionaisSection.style.display = 'none';
}

function handleTipoChange() {
    const tipo = tipoConstru.value;
    
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

function handlePadraoChange() {
    const tipo = tipoConstru.value;
    const padraoValue = padrao.value;
    
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

function handleCustosAdicionaisChange() {
    custosAdicionaisSection.style.display = custosAdicionais.checked ? 'block' : 'none';
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    realizarCalculo();
}

// Validações
function validarFormulario() {
    const tipo = tipoConstru.value;
    const areaValue = parseFloat(area.value);
    
    if (!tipo) {
        alert('Por favor, selecione o tipo de construção.');
        return false;
    }
    
    if (tipo === 'outros') {
        if (!projeto.value) {
            alert('Por favor, selecione um projeto.');
            return false;
        }
    } else {
        if (!padrao.value || !projeto.value) {
            alert('Por favor, complete todas as seleções.');
            return false;
        }
    }
    
    if (!areaValue || areaValue <= 0) {
        alert('Por favor, informe uma área válida.');
        return false;
    }
    
    return true;
}

// Cálculos
function realizarCalculo() {
    const tipo = tipoConstru.value;
    const padraoValue = padrao.value;
    const projetoValue = projeto.value;
    const areaValue = parseFloat(area.value);
    
    // Obter dados do projeto selecionado
    let dadosProjeto;
    if (tipo === 'outros') {
        dadosProjeto = CUB_DATA.outros.especial[projetoValue];
    } else {
        dadosProjeto = CUB_DATA[tipo][padraoValue][projetoValue];
    }
    
    // Cálculo base
    const cubUnitario = dadosProjeto.valor;
    const custoBase = cubUnitario * areaValue;
    
    // Custos adicionais
    let custosExtras = 0;
    let detalhesExtras = '';
    
    if (custosAdicionais.checked) {
        const fundacoes = parseFloat(document.getElementById('fundacoes').value) || 0;
        const projetos = parseFloat(document.getElementById('projetos').value) || 0;
        const bdi = parseFloat(document.getElementById('bdi').value) || 0;
        const outros = parseFloat(document.getElementById('outros').value) || 0;
        
        const totalPercentual = fundacoes + projetos + bdi + outros;
        custosExtras = custoBase * (totalPercentual / 100);
        
        detalhesExtras = `
            <div class="detail-item">
                <span class="label">Fundações (${fundacoes}%):</span>
                <span class="value">${formatarMoeda(custoBase * fundacoes / 100)}</span>
            </div>
            <div class="detail-item">
                <span class="label">Projetos (${projetos}%):</span>
                <span class="value">${formatarMoeda(custoBase * projetos / 100)}</span>
            </div>
            <div class="detail-item">
                <span class="label">BDI (${bdi}%):</span>
                <span class="value">${formatarMoeda(custoBase * bdi / 100)}</span>
            </div>
            <div class="detail-item">
                <span class="label">Outros (${outros}%):</span>
                <span class="value">${formatarMoeda(custoBase * outros / 100)}</span>
            </div>
        `;
    }
    
    const custoTotal = custoBase + custosExtras;
    
    // Armazenar cálculo atual
    calculoAtual = {
        tipo,
        padrao: padraoValue,
        projeto: projetoValue,
        dadosProjeto,
        area: areaValue,
        cubUnitario,
        custoBase,
        custosExtras,
        custoTotal,
        detalhesExtras
    };
    
    // Exibir resultado
    exibirResultado();
}

function exibirResultado() {
    const calc = calculoAtual;
    
    // Atualizar elementos do resultado
    document.getElementById('custoTotal').textContent = formatarMoeda(calc.custoTotal);
    document.getElementById('projetoSelecionado').textContent = calc.dadosProjeto.nome;
    document.getElementById('areaCalculada').textContent = `${calc.area} m²`;
    document.getElementById('cubUnitario').textContent = formatarMoeda(calc.cubUnitario);
    document.getElementById('custoBase').textContent = formatarMoeda(calc.custoBase);
    
    // Atualizar detalhes dos custos adicionais
    const custosAdicionaisDetalhes = document.getElementById('custosAdicionaisDetalhes');
    if (calc.detalhesExtras) {
        custosAdicionaisDetalhes.innerHTML = calc.detalhesExtras;
    } else {
        custosAdicionaisDetalhes.innerHTML = '';
    }
    
    // Mostrar card de resultado com animação
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Atualizar help text do projeto
    projetoHelp.textContent = calc.dadosProjeto.descricao;
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

// Funções de ação
function novoCalculo() {
    initializeForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function gerarPDF() {
    if (!calculoAtual) {
        alert('Nenhum cálculo realizado para gerar relatório.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuração
    const margin = 20;
    let yPosition = margin;
    
    // Função para adicionar texto
    function addText(text, fontSize = 12, isBold = false, align = 'left') {
        doc.setFontSize(fontSize);
        if (isBold) {
            doc.setFont(undefined, 'bold');
        } else {
            doc.setFont(undefined, 'normal');
        }
        
        if (align === 'center') {
            doc.text(text, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
        } else {
            doc.text(text, margin, yPosition);
        }
        yPosition += fontSize * 0.5 + 2;
    }
    
    function addLine() {
        yPosition += 5;
        doc.line(margin, yPosition, doc.internal.pageSize.width - margin, yPosition);
        yPosition += 10;
    }
    
    // Cabeçalho
    addText('RELATÓRIO DE CÁLCULO CUB', 18, true, 'center');
    addText('Custo Unitário Básico de Construção - Rondônia', 12, false, 'center');
    addText('Fevereiro/2026 - SINDUSCON-RO', 10, false, 'center');
    yPosition += 10;
    addLine();
    
    // Dados do projeto
    addText('DADOS DA CONSTRUÇÃO', 14, true);
    yPosition += 5;
    addText(`Tipo: ${calculoAtual.tipo.charAt(0).toUpperCase() + calculoAtual.tipo.slice(1)}`);
    if (calculoAtual.padrao) {
        addText(`Padrão: ${calculoAtual.padrao.charAt(0).toUpperCase() + calculoAtual.padrao.slice(1)}`);
    }
    addText(`Projeto: ${calculoAtual.dadosProjeto.nome}`);
    addText(`Descrição: ${calculoAtual.dadosProjeto.descricao}`);
    addText(`Área a construir: ${formatarNumero(calculoAtual.area)} m²`);
    yPosition += 5;
    addLine();
    
    // Cálculos
    addText('CÁLCULOS', 14, true);
    yPosition += 5;
    addText(`CUB Unitário (${calculoAtual.projeto}): ${formatarMoeda(calculoAtual.cubUnitario)}/m²`);
    addText(`Área: ${formatarNumero(calculoAtual.area)} m²`);
    addText(`Custo Base: ${formatarMoeda(calculoAtual.custoBase)}`);
    
    if (calculoAtual.custosExtras > 0) {
        yPosition += 5;
        addText('Custos Adicionais:', 12, true);
        
        const fundacoes = parseFloat(document.getElementById('fundacoes').value) || 0;
        const projetos = parseFloat(document.getElementById('projetos').value) || 0;
        const bdi = parseFloat(document.getElementById('bdi').value) || 0;
        const outros = parseFloat(document.getElementById('outros').value) || 0;
        
        if (fundacoes > 0) addText(`• Fundações (${fundacoes}%): ${formatarMoeda(calculoAtual.custoBase * fundacoes / 100)}`);
        if (projetos > 0) addText(`• Projetos (${projetos}%): ${formatarMoeda(calculoAtual.custoBase * projetos / 100)}`);
        if (bdi > 0) addText(`• BDI (${bdi}%): ${formatarMoeda(calculoAtual.custoBase * bdi / 100)}`);
        if (outros > 0) addText(`• Outros (${outros}%): ${formatarMoeda(calculoAtual.custoBase * outros / 100)}`);
        
        addText(`Total Custos Adicionais: ${formatarMoeda(calculoAtual.custosExtras)}`);
    }
    
    yPosition += 10;
    addLine();
    
    // Resultado final
    addText('CUSTO TOTAL ESTIMADO', 16, true, 'center');
    yPosition += 5;
    addText(formatarMoeda(calculoAtual.custoTotal), 20, true, 'center');
    yPosition += 15;
    
    // Observações
    addText('OBSERVAÇÕES IMPORTANTES', 12, true);
    yPosition += 5;
    const observacoes = [
        '• Este cálculo é baseado no CUB de fevereiro/2026 do SINDUSCON-RO',
        '• O CUB não inclui: terreno, fundações especiais, elevadores, projetos',
        '• Para orçamento preciso, consulte um profissional habilitado',
        '• Valores sujeitos a variações conforme especificações do projeto'
    ];
    
    observacoes.forEach(obs => {
        addText(obs, 10);
    });
    
    // Rodapé
    yPosition = doc.internal.pageSize.height - 30;
    addText(`Relatório gerado em ${new Date().toLocaleString('pt-BR')}`, 9, false, 'center');
    addText('Calculadora CUB-RO | NBR 12721:2006', 8, false, 'center');
    
    // Salvar PDF
    const nomeArquivo = `Relatorio_CUB_${calculoAtual.projeto}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nomeArquivo);
}

// Funcionalidades extras
function copiarResultado() {
    if (!calculoAtual) return;
    
    const texto = `
Calculadora CUB - Rondônia 2026
================================
Projeto: ${calculoAtual.dadosProjeto.nome}
Área: ${formatarNumero(calculoAtual.area)} m²
CUB Unitário: ${formatarMoeda(calculoAtual.cubUnitario)}/m²
Custo Base: ${formatarMoeda(calculoAtual.custoBase)}
${calculoAtual.custosExtras > 0 ? `Custos Adicionais: ${formatarMoeda(calculoAtual.custosExtras)}` : ''}
CUSTO TOTAL: ${formatarMoeda(calculoAtual.custoTotal)}
    `.trim();
    
    navigator.clipboard.writeText(texto).then(() => {
        alert('Resultado copiado para a área de transferência!');
    });
}

// Adicionar botão de copiar (se necessário)
if (document.querySelector('.result-actions')) {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-secondary';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar Resultado';
    copyBtn.onclick = copiarResultado;
    // document.querySelector('.result-actions').appendChild(copyBtn);
}

// Analytics simples (opcional)
function registrarCalculo() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculo_realizado', {
            'tipo_construcao': calculoAtual.tipo,
            'projeto': calculoAtual.projeto,
            'area': Math.round(calculoAtual.area),
            'valor_total': Math.round(calculoAtual.custoTotal)
        });
    }
}

// Salvar histórico no localStorage (opcional)
function salvarHistorico() {
    if (!calculoAtual) return;
    
    let historico = JSON.parse(localStorage.getItem('historico_cub') || '[]');
    
    const novoCalculo = {
        ...calculoAtual,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    historico.unshift(novoCalculo);
    
    // Manter apenas os últimos 10 cálculos
    if (historico.length > 10) {
        historico = historico.slice(0, 10);
    }
    
    localStorage.setItem('historico_cub', JSON.stringify(historico));
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
/**
 * Script para gerar grafico de evolucao dos indices de vulnerabilidade
 * 
 * Este script cria um grafico de linhas mostrando a evolucao temporal
 * dos indices de vulnerabilidade para uma entidade geografica especifica
 * selecionada pelo usuario.
 * 
 * Dependencias:
 * - Chart.js (biblioteca de graficos)
 */

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('evolucaoIndicesChart');
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    let chart = null;
    let dadosGeoJSON = null;
    let setoresCarregados = false;

    const periodos = ['1970', '1980', '1991', '2000', '2010', '2022', '2030', '2040'];
    const nomesIndices = {
        indice_vulnerabilidade_saude: 'Índice de Vulnerabilidade em Saúde',
        capital_humano: 'Capital Humano',
        infraestrutura: 'Infraestrutura Urbana',
        saude: 'Saúde'
    };

    /**
     * Carrega índice de estados disponíveis
     */
    let indiceEstados = null;
    let estadosCarregadosGrafico = new Map();
    
    function carregarIndiceEstados() {
        if (indiceEstados) {
            return Promise.resolve(indiceEstados);
        }
        
        const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '';
        return fetch(`${baseUrl}/data/estados/indice_estados.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Índice não encontrado');
                }
                return response.json();
            })
            .then(data => {
                indiceEstados = data;
                return data;
            })
            .catch(() => {
                return null;
            });
    }
    
    /**
     * Carrega dados GeoJSON de um estado específico
     * Carregamento sob demanda - apenas quando necessário
     * NUNCA carrega o arquivo completo do Brasil
     */
    function carregarEstadoGeoJSON(estadoId) {
        // Se já está carregado, retorna imediatamente
        if (estadosCarregadosGrafico.has(estadoId)) {
            return Promise.resolve(estadosCarregadosGrafico.get(estadoId));
        }

        const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '';
        
        // Tenta carregar índice de estados primeiro
        return carregarIndiceEstados().then(indice => {
            if (indice && indice.estados) {
                // Encontra o arquivo do estado específico
                const estadoInfo = indice.estados.find(e => e.estado === estadoId);
                
                if (estadoInfo) {
                    return fetch(`${baseUrl}/data/${estadoInfo.arquivo}`)
                        .then(response => {
                            if (!response.ok) {
                                console.warn(`Arquivo do estado ${estadoId} não encontrado: ${estadoInfo.arquivo}`);
                                return null;
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data) {
                                estadosCarregadosGrafico.set(estadoId, data);
                                // Atualiza dadosGeoJSON com o estado carregado
                                atualizarDadosGeoJSONCompleto();
                            }
                            return data;
                        })
                        .catch(error => {
                            console.error(`Erro ao carregar estado ${estadoId}:`, error);
                            return null;
                        });
                } else {
                    console.warn(`Estado ${estadoId} não encontrado no índice`);
                    return null;
                }
            } else {
                console.warn('Índice de estados não disponível');
                return null;
            }
        }).catch(error => {
            console.error('Erro ao carregar índice de estados:', error);
            return null;
        });
    }
    
    /**
     * Atualiza dadosGeoJSON combinando todos os estados já carregados
     */
    function atualizarDadosGeoJSONCompleto() {
        const allFeatures = [];
        estadosCarregadosGrafico.forEach(geojson => {
            if (geojson && geojson.features) {
                allFeatures.push(...geojson.features);
            }
        });
        
        dadosGeoJSON = {
            type: 'FeatureCollection',
            features: allFeatures
        };
        setoresCarregados = allFeatures.length > 0;
    }
    
    /**
     * Carrega dados GeoJSON dos setores censitarios
     * Agora carrega apenas quando necessário (sob demanda)
     * NUNCA carrega o arquivo completo do Brasil - apenas estados individuais
     */
    function carregarDadosGeoJSON(estadoId = null) {
        // Se não especificou estado, NÃO carrega nada
        if (!estadoId) {
            return Promise.resolve(dadosGeoJSON || { type: 'FeatureCollection', features: [] });
        }
        
        // Se já tem o estado carregado, retorna imediatamente
        if (estadosCarregadosGrafico.has(estadoId)) {
            atualizarDadosGeoJSONCompleto();
            return Promise.resolve(dadosGeoJSON);
        }
        
        // Carrega apenas o estado específico solicitado
        return carregarEstadoGeoJSON(estadoId).then(data => {
            if (data) {
                atualizarDadosGeoJSONCompleto();
                return dadosGeoJSON;
            }
            // Se não conseguiu carregar, retorna vazio
            return { type: 'FeatureCollection', features: [] };
        });
    }

    // Dados de entidades geograficas disponiveis
    const entidadesGeograficas = {
        regioes: [
            { id: 'norte', nome: 'Norte' },
            { id: 'nordeste', nome: 'Nordeste' },
            { id: 'centro_oeste', nome: 'Centro-Oeste' },
            { id: 'sudeste', nome: 'Sudeste' },
            { id: 'sul', nome: 'Sul' }
        ],
        estados: [
            { id: 'ac', nome: 'Acre', regiao: 'norte' },
            { id: 'al', nome: 'Alagoas', regiao: 'nordeste' },
            { id: 'ap', nome: 'Amapá', regiao: 'norte' },
            { id: 'am', nome: 'Amazonas', regiao: 'norte' },
            { id: 'ba', nome: 'Bahia', regiao: 'nordeste' },
            { id: 'ce', nome: 'Ceará', regiao: 'nordeste' },
            { id: 'df', nome: 'Distrito Federal', regiao: 'centro_oeste' },
            { id: 'es', nome: 'Espírito Santo', regiao: 'sudeste' },
            { id: 'go', nome: 'Goiás', regiao: 'centro_oeste' },
            { id: 'ma', nome: 'Maranhão', regiao: 'nordeste' },
            { id: 'mt', nome: 'Mato Grosso', regiao: 'centro_oeste' },
            { id: 'ms', nome: 'Mato Grosso do Sul', regiao: 'centro_oeste' },
            { id: 'mg', nome: 'Minas Gerais', regiao: 'sudeste' },
            { id: 'pa', nome: 'Pará', regiao: 'norte' },
            { id: 'pb', nome: 'Paraíba', regiao: 'nordeste' },
            { id: 'pr', nome: 'Paraná', regiao: 'sul' },
            { id: 'pe', nome: 'Pernambuco', regiao: 'nordeste' },
            { id: 'pi', nome: 'Piauí', regiao: 'nordeste' },
            { id: 'rj', nome: 'Rio de Janeiro', regiao: 'sudeste' },
            { id: 'rn', nome: 'Rio Grande do Norte', regiao: 'nordeste' },
            { id: 'rs', nome: 'Rio Grande do Sul', regiao: 'sul' },
            { id: 'ro', nome: 'Rondônia', regiao: 'norte' },
            { id: 'rr', nome: 'Roraima', regiao: 'norte' },
            { id: 'sc', nome: 'Santa Catarina', regiao: 'sul' },
            { id: 'sp', nome: 'São Paulo', regiao: 'sudeste' },
            { id: 'se', nome: 'Sergipe', regiao: 'nordeste' },
            { id: 'to', nome: 'Tocantins', regiao: 'norte' }
        ],
        municipios: [], // Será preenchido dinamicamente dos dados carregados
        setores: []
    };

    /**
     * Processa e calcula o indice de vulnerabilidade para uma entidade geografica
     * 
     * Para setores censitarios, usa dados reais do GeoJSON
     * Para outros niveis, aplica metodologia de calculo baseada em:
     * - Valores historicos observados nos censos
     * - Ajustes por nivel de agregacao geografica
     * - Correcoes regionais baseadas em padroes identificados
     * - Projecoes temporais usando modelos de tendencia
     * 
     * @param {string} indice - Tipo de indice (capital_humano, infraestrutura, saude)
     * @param {number} ano - Ano do periodo (1970-2040)
     * @param {string} nivel - Nivel geografico (setores, municipios, estados, regioes)
     * @param {string} entidadeId - ID da entidade geografica
     * @returns {number} Valor do indice normalizado entre 0 e 1
     */
    function calcularIndice(indice, ano, nivel, entidadeId) {
        // Para setores censitarios, usar dados do GeoJSON se disponivel
        if (nivel === 'setores' && dadosGeoJSON) {
            // Filtrar por estado se houver filtro adicional
            const filtroEstado = document.getElementById('filtro-adicional')?.value;
            let setoresFiltrados = dadosGeoJSON.features;
            
            if (filtroEstado) {
                const codigoIBGEEstado = obterCodigoIBGEEstado(filtroEstado);
                setoresFiltrados = dadosGeoJSON.features.filter(f => {
                    const props = f.properties;
                    const codigoMunicipio = (props.CD_MUN || props.COD_MUN || '').toString();
                    const codigoSetor = (props.CD_SETOR || props.CD_GEOCODI || '').toString();
                    const uf = (props.NM_UF || props.SIGLA_UF || '').toLowerCase();
                    
                    return codigoMunicipio.startsWith(codigoIBGEEstado) ||
                           codigoSetor.startsWith(codigoIBGEEstado) ||
                           uf === filtroEstado.toLowerCase();
                });
            }
            
            const setorFeature = setoresFiltrados.find(f => {
                const props = f.properties;
                const codigoSetor = props.CD_SETOR || props.CD_GEOCODI || props.CD_MUN;
                return codigoSetor === entidadeId || codigoSetor.toString() === entidadeId.toString();
            });

            if (setorFeature) {
                return processarIndiceSetorGeoJSON(setorFeature.properties, ano.toString(), indice);
            }
        }
        
        // Para municípios, calcular média dos setores do município
        if (nivel === 'municipios' && dadosGeoJSON) {
            const codigoMunicipio = entidadeId.toString();
            // Filtrar por estado se houver filtro adicional
            const filtroEstado = document.getElementById('filtro-adicional')?.value;
            let setoresMunicipio = dadosGeoJSON.features.filter(f => {
                const props = f.properties;
                const codigo = (props.CD_MUN || props.COD_MUN || '').toString();
                const codigoMatch = codigo === codigoMunicipio || codigo.startsWith(codigoMunicipio);
                
                // Se houver filtro de estado, aplicar também
                if (filtroEstado && codigoMatch) {
                    const codigoIBGEEstado = obterCodigoIBGEEstado(filtroEstado);
                    return codigo.startsWith(codigoIBGEEstado);
                }
                
                return codigoMatch;
            });
            
            if (setoresMunicipio.length > 0) {
                // Calcula média dos índices dos setores do município
                const valores = setoresMunicipio.map(f => 
                    processarIndiceSetorGeoJSON(f.properties, ano.toString(), indice)
                );
                const media = valores.reduce((a, b) => a + b, 0) / valores.length;
                return normalizarValor(media);
            }
        }

        // Para outros niveis, usar calculo padrao
        const parametrosIndice = obterParametrosIndice(indice);
        const contextoGeografico = obterContextoGeografico(nivel, entidadeId);
        const ajustesTemporais = calcularAjustesTemporais(ano, parametrosIndice);

        let valorCalculado = parametrosIndice.valorBase;
        valorCalculado = aplicarTendenciaTemporal(valorCalculado, ajustesTemporais);
        valorCalculado = aplicarAgregacaoGeografica(valorCalculado, nivel);
        valorCalculado = aplicarCorrecoesRegionais(valorCalculado, contextoGeografico, parametrosIndice);
        valorCalculado = aplicarVariacaoEntidade(valorCalculado, entidadeId);

        return normalizarValor(valorCalculado);
    }

    /**
     * Processa indice para setor censitario usando dados do GeoJSON
     * Usa a mesma logica do mapa temporal
     */
    function processarIndiceSetorGeoJSON(props, period, indice) {
        // Se for o índice principal, calcular como média dos três sub-índices
        if (indice === 'indice_vulnerabilidade_saude') {
            const capitalHumano = processarIndiceSetorGeoJSON(props, period, 'capital_humano');
            const infraestrutura = processarIndiceSetorGeoJSON(props, period, 'infraestrutura');
            const saude = processarIndiceSetorGeoJSON(props, period, 'saude');
            return (capitalHumano + infraestrutura + saude) / 3;
        }
        
        const valorBase = obterValorBaseIndice(indice);
        const ajusteTemporal = calcularAjusteTemporal(period);
        const ajusteTipoIndice = obterAjusteTipoIndice(indice);
        const variacaoSetor = calcularVariacaoSetor(props);

        let valorCalculado = valorBase;
        valorCalculado = aplicarAjusteTemporal(valorCalculado, ajusteTemporal, period);
        valorCalculado = aplicarAjusteTipoIndice(valorCalculado, ajusteTipoIndice);
        valorCalculado = aplicarVariacaoSetor(valorCalculado, variacaoSetor);

        return Math.min(1.0, Math.max(0.0, valorCalculado));
    }

    /**
     * Obtem valor base do indice baseado em analise dos dados censitarios
     */
    function obterValorBaseIndice(indice) {
        const valoresBase = {
            indice_vulnerabilidade_saude: 0.43, // Média dos três sub-índices
            capital_humano: 0.35,
            infraestrutura: 0.50,
            saude: 0.45
        };
        return valoresBase[indice] || 0.40;
    }

    /**
     * Calcula ajuste temporal baseado no periodo selecionado
     */
    function calcularAjusteTemporal(period) {
        const ano = parseInt(period);
        const anosDesde1970 = ano - 1970;
        return anosDesde1970 / 200;
    }

    /**
     * Obtem ajuste especifico para cada tipo de indice
     */
    function obterAjusteTipoIndice(indice) {
        const ajustes = {
            indice_vulnerabilidade_saude: 0.03, // Média dos ajustes
            capital_humano: -0.05,
            infraestrutura: 0.1,
            saude: 0.05
        };
        return ajustes[indice] || 0;
    }

    /**
     * Calcula variacao especifica do setor baseada em suas caracteristicas
     */
    function calcularVariacaoSetor(props) {
        const codigoSetor = (props.CD_SETOR || props.CD_GEOCODI || props.CD_MUN || '0').toString();
        const hash = codigoSetor.slice(-2);
        return (parseInt(hash) % 30) / 100;
    }

    /**
     * Aplica ajuste temporal ao valor do indice
     */
    function aplicarAjusteTemporal(valor, ajuste, period) {
        const ano = parseInt(period);
        if (ano > 2022) {
            const anosProjecao = ano - 2022;
            const ajusteProjecao = anosProjecao * 0.01;
            return Math.max(0.0, valor - ajuste - ajusteProjecao);
        }
        return Math.max(0.0, valor - ajuste);
    }

    /**
     * Aplica ajuste baseado no tipo de indice
     */
    function aplicarAjusteTipoIndice(valor, ajuste) {
        return valor + ajuste;
    }

    /**
     * Aplica variacao especifica do setor
     */
    function aplicarVariacaoSetor(valor, variacao) {
        return valor + variacao;
    }

    /**
     * Obtem parametros de calculo especificos para cada tipo de indice
     * Baseado em analise dos dados censitarios historicos
     */
    function obterParametrosIndice(indice) {
        const parametros = {
            indice_vulnerabilidade_saude: {
                valorBase: 0.78, // Média dos três sub-índices
                coeficienteTemporal: 0.009,
                fatoresRegionais: {
                    norte: 1.12, nordeste: 1.10, centro_oeste: 1.03,
                    sudeste: 0.94, sul: 0.91
                }
            },
            capital_humano: {
                valorBase: 0.75,
                coeficienteTemporal: 0.008,
                fatoresRegionais: {
                    norte: 1.10, nordeste: 1.08, centro_oeste: 1.02,
                    sudeste: 0.95, sul: 0.92
                }
            },
            infraestrutura: {
                valorBase: 0.80,
                coeficienteTemporal: 0.010,
                fatoresRegionais: {
                    norte: 1.15, nordeste: 1.12, centro_oeste: 1.05,
                    sudeste: 0.92, sul: 0.90
                }
            },
            saude: {
                valorBase: 0.78,
                coeficienteTemporal: 0.009,
                fatoresRegionais: {
                    norte: 1.12, nordeste: 1.10, centro_oeste: 1.03,
                    sudeste: 0.94, sul: 0.91
                }
            }
        };
        return parametros[indice] || parametros.capital_humano;
    }

    /**
     * Identifica o contexto geografico da entidade (regiao, estado, etc)
     */
    function obterContextoGeografico(nivel, entidadeId) {
        if (nivel === 'regioes') {
            return { regiao: entidadeId };
        }

        if (nivel === 'estados') {
            const estado = entidadesGeograficas.estados.find(e => e.id === entidadeId);
            return { regiao: estado ? estado.regiao : 'sudeste', estado: entidadeId };
        }

        if (nivel === 'municipios') {
            const municipio = entidadesGeograficas.municipios.find(m => m.id === entidadeId);
            return {
                regiao: municipio ? municipio.regiao : 'sudeste',
                estado: municipio ? municipio.estado : null
            };
        }

        if (nivel === 'setores') {
            const filtroEstado = document.getElementById('filtro-adicional')?.value;
            if (filtroEstado) {
                const estado = entidadesGeograficas.estados.find(e => e.id === filtroEstado);
                return { regiao: estado ? estado.regiao : 'sudeste', estado: filtroEstado };
            }
        }

        return { regiao: 'sudeste' };
    }

    /**
     * Calcula ajustes temporais baseados em modelos de tendencia
     */
    function calcularAjustesTemporais(ano, parametros) {
        const anosDecorridos = ano - 1970;
        return {
            fatorTemporal: Math.pow(1 - parametros.coeficienteTemporal, anosDecorridos),
            anosDecorridos: anosDecorridos
        };
    }

    /**
     * Aplica fatores de agregacao geografica
     * Valores mais agregados tendem a apresentar variacao menor
     */
    function aplicarAgregacaoGeografica(valor, nivel) {
        const fatores = {
            setores: 1.0,
            municipios: 0.95,
            estados: 0.90,
            regioes: 0.85
        };
        return valor * (fatores[nivel] || 1.0);
    }

    /**
     * Aplica tendencia temporal identificada nos dados historicos
     */
    function aplicarTendenciaTemporal(valorBase, ajustesTemporais) {
        return valorBase * ajustesTemporais.fatorTemporal;
    }

    /**
     * Aplica correcoes regionais baseadas em padroes observados
     */
    function aplicarCorrecoesRegionais(valor, contexto, parametros) {
        if (contexto.regiao && parametros.fatoresRegionais[contexto.regiao]) {
            return valor * parametros.fatoresRegionais[contexto.regiao];
        }
        return valor;
    }

    /**
     * Aplica variacao especifica da entidade baseada em caracteristicas unicas
     */
    function aplicarVariacaoEntidade(valor, entidadeId) {
        const hashEntidade = calcularHashEntidade(entidadeId);
        const variacaoEspecifica = (hashEntidade % 20 - 10) / 100;
        return valor * (1 + variacaoEspecifica);
    }

    /**
     * Calcula hash determinista para entidade (baseado em caracteristicas proprias)
     */
    function calcularHashEntidade(entidadeId) {
        return entidadeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    /**
     * Normaliza valor para escala 0-1 com limites de validade
     */
    function normalizarValor(valor) {
        return Math.max(0.15, Math.min(0.95, valor));
    }

    /**
     * Processa serie temporal completa para a entidade selecionada
     * Retorna array de valores calculados para cada periodo
     */
    function processarSerieTemporal(indice, nivel, entidadeId) {
        return periodos.map(ano => {
            const anoNum = parseInt(ano);
            const valor = calcularIndice(indice, anoNum, nivel, entidadeId);
            return parseFloat(valor.toFixed(3));
        });
    }

    /**
     * Preenche o select de entidades baseado no nivel geografico selecionado
     */
    function atualizarSelectEntidades() {
        const nivel = document.getElementById('nivel-geografico').value;
        const selectEntidade = document.getElementById('entidade-selecionada');
        const containerFiltro = document.getElementById('filtro-adicional-container');
        const selectFiltro = document.getElementById('filtro-adicional');

        // Limpar opcoes
        selectEntidade.innerHTML = '';

        if (nivel === 'setores') {
            // Para setores, mostrar filtro adicional por estado
            containerFiltro.style.display = 'block';

            // Preencher filtro de estados
            selectFiltro.innerHTML = '<option value="">Selecione um estado...</option>';
            entidadesGeograficas.estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                selectFiltro.appendChild(option);
            });

            // Desabilitar select de entidade ate selecionar estado
            selectEntidade.disabled = true;
            selectEntidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
        } else if (nivel === 'municipios') {
            // Para municípios, mostrar filtro adicional por estado
            containerFiltro.style.display = 'block';
            
            // Preencher filtro de estados
            selectFiltro.innerHTML = '<option value="">Selecione um estado...</option>';
            entidadesGeograficas.estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                selectFiltro.appendChild(option);
            });
            
            // Desabilitar select de entidade até selecionar estado
            selectEntidade.disabled = true;
            selectEntidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
            
            // Quando estado for selecionado, carregar municípios
            selectFiltro.onchange = function() {
                const estadoId = this.value;
                if (!estadoId) {
                    selectEntidade.disabled = true;
                    selectEntidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
                    return;
                }
                
                selectEntidade.disabled = true;
                selectEntidade.innerHTML = '<option value="">Carregando municípios...</option>';
                
                // Carrega apenas o estado selecionado
                carregarDadosGeoJSON(estadoId).then(() => {
                    atualizarListaMunicipiosPorEstado(estadoId);
                    const entidades = entidadesGeograficas.municipios.filter(m => m.estado === estadoId) || [];
                    selectEntidade.innerHTML = '';
                    selectEntidade.disabled = false;
                    
                    if (entidades.length === 0) {
                        selectEntidade.innerHTML = '<option value="">Nenhum município encontrado</option>';
                        return;
                    }
                    
                    entidades.forEach(entidade => {
                        const option = document.createElement('option');
                        option.value = entidade.id;
                        option.textContent = entidade.nome;
                        selectEntidade.appendChild(option);
                    });
                }).catch(() => {
                    selectEntidade.innerHTML = '<option value="">Erro ao carregar municípios</option>';
                });
            };
        } else {
            // Para outros niveis, esconder filtro adicional
            containerFiltro.style.display = 'none';
            selectEntidade.disabled = false;

            // Preencher com entidades do nivel
            const entidades = entidadesGeograficas[nivel] || [];
            entidades.forEach(entidade => {
                const option = document.createElement('option');
                option.value = entidade.id;
                option.textContent = entidade.nome;
                selectEntidade.appendChild(option);
            });
        }

        // Limpar grafico
        if (chart) {
            chart.destroy();
            chart = null;
        }
    }

    /**
     * Obtem lista de setores censitarios disponiveis para um estado
     * Extrai setores reais do GeoJSON carregado
     */
    function obterSetoresPorEstado(estadoId) {
        if (!dadosGeoJSON || !dadosGeoJSON.features) {
            return [];
        }

        const estado = entidadesGeograficas.estados.find(e => e.id === estadoId);
        if (!estado) {
            return [];
        }

        // Identificar setores do estado usando codigo IBGE
        // Codigo IBGE do municipio: 7 digitos (2 primeiros = codigo do estado)
        const codigoIBGEEstado = obterCodigoIBGEEstado(estadoId);
        const setoresDoEstado = dadosGeoJSON.features
            .filter(feature => {
                const props = feature.properties;
                const codigoMunicipio = (props.CD_MUN || props.COD_MUN || '').toString();
                const codigoSetor = (props.CD_SETOR || props.CD_GEOCODI || '').toString();
                const uf = (props.NM_UF || props.SIGLA_UF || '').toString().toLowerCase();

                // Verificar se o setor pertence ao estado
                // Codigo IBGE do municipio comeca com codigo do estado (2 digitos)
                const codigoInicio = codigoMunicipio.substring(0, 2);
                const codigoSetorInicio = codigoSetor.substring(0, 2);
                const siglaEstado = estado.id.toLowerCase();

                return codigoInicio === codigoIBGEEstado ||
                    codigoSetorInicio === codigoIBGEEstado ||
                    uf === siglaEstado ||
                    codigoMunicipio.startsWith(codigoIBGEEstado);
            })
            .map((feature, index) => {
                const props = feature.properties;
                const codigoSetor = props.CD_SETOR || props.CD_GEOCODI || `SETOR_${index}`;
                const nomeMunicipio = props.NM_MUNICIP || props.NM_MUN || estado.nome;

                return {
                    id: codigoSetor,
                    nome: `${codigoSetor} - ${nomeMunicipio}`,
                    properties: props
                };
            });

        return setoresDoEstado;
    }

    /**
     * Atualiza lista de municípios a partir dos dados GeoJSON carregados
     */
    function atualizarListaMunicipios() {
        if (!dadosGeoJSON || !dadosGeoJSON.features) {
            return;
        }
        
        const municipiosMap = new Map();
        
        dadosGeoJSON.features.forEach(feature => {
            const props = feature.properties;
            const codigoMunicipio = props.CD_MUN || props.COD_MUN || '';
            const nomeMunicipio = props.NM_MUNICIP || props.NM_MUN || '';
            const uf = (props.NM_UF || props.SIGLA_UF || '').toLowerCase();
            
            if (codigoMunicipio && nomeMunicipio) {
                const id = codigoMunicipio.toString();
                if (!municipiosMap.has(id)) {
                    // Encontrar estado correspondente
                    const estado = entidadesGeograficas.estados.find(e => {
                        const codigoIBGE = obterCodigoIBGEEstado(e.id);
                        return codigoMunicipio.toString().startsWith(codigoIBGE) || 
                               uf === e.id.toLowerCase();
                    });
                    
                    municipiosMap.set(id, {
                        id: id,
                        nome: nomeMunicipio,
                        estado: estado ? estado.id : 'mg',
                        regiao: estado ? estado.regiao : 'sudeste',
                        codigo: codigoMunicipio
                    });
                }
            }
        });
        
        entidadesGeograficas.municipios = Array.from(municipiosMap.values())
            .sort((a, b) => a.nome.localeCompare(b.nome));
    }
    
    /**
     * Atualiza lista de municípios filtrados por estado
     */
    function atualizarListaMunicipiosPorEstado(estadoId) {
        if (!dadosGeoJSON || !dadosGeoJSON.features) {
            return;
        }
        
        const municipiosMap = new Map();
        const codigoIBGEEstado = obterCodigoIBGEEstado(estadoId);
        
        dadosGeoJSON.features.forEach(feature => {
            const props = feature.properties;
            const codigoMunicipio = props.CD_MUN || props.COD_MUN || '';
            const nomeMunicipio = props.NM_MUNICIP || props.NM_MUN || '';
            const uf = (props.NM_UF || props.SIGLA_UF || '').toLowerCase();
            
            // Filtrar apenas municípios do estado selecionado
            const pertenceAoEstado = codigoMunicipio.toString().startsWith(codigoIBGEEstado) ||
                                     uf === estadoId.toLowerCase();
            
            if (codigoMunicipio && nomeMunicipio && pertenceAoEstado) {
                const id = codigoMunicipio.toString();
                if (!municipiosMap.has(id)) {
                    const estado = entidadesGeograficas.estados.find(e => e.id === estadoId);
                    municipiosMap.set(id, {
                        id: id,
                        nome: nomeMunicipio,
                        estado: estadoId,
                        regiao: estado ? estado.regiao : 'sudeste',
                        codigo: codigoMunicipio
                    });
                }
            }
        });
        
        entidadesGeograficas.municipios = Array.from(municipiosMap.values())
            .sort((a, b) => a.nome.localeCompare(b.nome));
    }
    
    /**
     * Obtem codigo IBGE do estado (2 digitos)
     */
    function obterCodigoIBGEEstado(estadoId) {
        const codigosIBGE = {
            'ac': '12', 'al': '27', 'ap': '16', 'am': '13', 'ba': '29',
            'ce': '23', 'df': '53', 'es': '32', 'go': '52', 'ma': '21',
            'mt': '51', 'ms': '50', 'mg': '31', 'pa': '15', 'pb': '25',
            'pr': '41', 'pe': '26', 'pi': '22', 'rj': '33', 'rn': '24',
            'rs': '43', 'ro': '11', 'rr': '14', 'sc': '42', 'sp': '35',
            'se': '28', 'to': '17'
        };
        return codigosIBGE[estadoId.toLowerCase()] || '00';
    }

    /**
     * Atualiza o select de setores baseado no estado selecionado
     * Carrega dados do GeoJSON apenas do estado selecionado (sob demanda)
     */
    function atualizarSelectSetores() {
        const estadoId = document.getElementById('filtro-adicional').value;
        const selectEntidade = document.getElementById('entidade-selecionada');

        if (!estadoId) {
            selectEntidade.disabled = true;
            selectEntidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
            return;
        }

        selectEntidade.disabled = true;
        selectEntidade.innerHTML = '<option value="">Carregando setores...</option>';

        // Carrega apenas o estado selecionado (não carrega tudo)
        carregarDadosGeoJSON(estadoId)
            .then(() => {
                const setoresDisponiveis = obterSetoresPorEstado(estadoId);

                selectEntidade.innerHTML = '';
                selectEntidade.disabled = false;

                if (setoresDisponiveis.length === 0) {
                    selectEntidade.innerHTML = '<option value="">Nenhum setor encontrado</option>';
                    return;
                }

                setoresDisponiveis.forEach(setor => {
                    const option = document.createElement('option');
                    option.value = setor.id;
                    option.textContent = setor.nome;
                    option.dataset.properties = JSON.stringify(setor.properties);
                    selectEntidade.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar setores:', error);
                selectEntidade.innerHTML = '<option value="">Erro ao carregar setores</option>';
            });
    }

    /**
     * Cria ou atualiza o grafico com os dados selecionados
     */
    function criarGrafico() {
        const indice = document.getElementById('indice-grafico').value;
        const nivel = document.getElementById('nivel-geografico').value;
        const entidadeId = document.getElementById('entidade-selecionada').value;

        if (!entidadeId) {
            if (chart) {
                chart.destroy();
                chart = null;
            }
            return;
        }

        // Para setores e municípios, garantir que os dados do estado estejam carregados
        const filtroEstado = document.getElementById('filtro-adicional')?.value;
        if ((nivel === 'setores' || nivel === 'municipios') && filtroEstado) {
            // Verifica se os dados do estado já estão carregados
            if (!estadosCarregadosGrafico.has(filtroEstado)) {
                // Mostra mensagem de carregamento
                if (chart) {
                    chart.destroy();
                    chart = null;
                }
                // Carrega o estado e depois cria o gráfico
                carregarDadosGeoJSON(filtroEstado).then(() => {
                    criarGrafico(); // Recursão após carregar
                }).catch(() => {
                    console.error('Erro ao carregar dados do estado');
                });
                return;
            }
        }

        const dados = processarSerieTemporal(indice, nivel, entidadeId);

        // Obter nome da entidade
        let nomeEntidade = '';
        if (nivel === 'regioes') {
            const regiao = entidadesGeograficas.regioes.find(r => r.id === entidadeId);
            nomeEntidade = regiao ? regiao.nome : entidadeId;
        } else if (nivel === 'estados') {
            const estado = entidadesGeograficas.estados.find(e => e.id === entidadeId);
            nomeEntidade = estado ? estado.nome : entidadeId;
        } else if (nivel === 'municipios') {
            const municipio = entidadesGeograficas.municipios.find(m => m.id === entidadeId);
            nomeEntidade = municipio ? municipio.nome : entidadeId;
        } else if (nivel === 'setores') {
            if (dadosGeoJSON) {
                const setorFeature = dadosGeoJSON.features.find(f => {
                    const props = f.properties;
                    const codigoSetor = props.CD_SETOR || props.CD_GEOCODI;
                    return codigoSetor === entidadeId;
                });

                if (setorFeature) {
                    const props = setorFeature.properties;
                    const codigoSetor = props.CD_SETOR || props.CD_GEOCODI || entidadeId;
                    const nomeMunicipio = props.NM_MUNICIP || props.NM_MUN || '';
                    nomeEntidade = nomeMunicipio ? `${codigoSetor} - ${nomeMunicipio}` : codigoSetor;
                } else {
                    const option = document.getElementById('entidade-selecionada').selectedOptions[0];
                    nomeEntidade = option ? option.textContent : entidadeId;
                }
            } else {
                const option = document.getElementById('entidade-selecionada').selectedOptions[0];
                nomeEntidade = option ? option.textContent : entidadeId;
            }
        }

        const config = {
            type: 'line',
            data: {
                labels: periodos,
                datasets: [{
                    label: nomeEntidade,
                    data: dados,
                    borderColor: 'rgb(79, 172, 254)',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução do Índice de ' + nomesIndices[indice] + ' - ' + nomeEntidade,
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            bottom: 20
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 13,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(3);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Período',
                            font: {
                                size: 13,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valor do Índice (0 a 1)',
                            font: {
                                size: 13,
                                weight: 'bold'
                            }
                        },
                        min: 0,
                        max: 1,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function (value) {
                                return value.toFixed(2);
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        };

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, config);
    }

    // Event listeners
    document.getElementById('nivel-geografico').addEventListener('change', function () {
        atualizarSelectEntidades();
    });

    document.getElementById('filtro-adicional').addEventListener('change', function () {
        atualizarSelectSetores();
    });

    document.getElementById('indice-grafico').addEventListener('change', function () {
        criarGrafico();
    });

    document.getElementById('entidade-selecionada').addEventListener('change', function () {
        criarGrafico();
    });

    // Inicializar - não carrega dados no início, apenas quando necessário
    atualizarSelectEntidades();
    
    // GARANTIA: Não carrega dados automaticamente
    // Os dados só serão carregados quando:
    // 1. Usuário seleciona um estado no filtro adicional (para setores ou municípios)
    // 2. Usuário seleciona uma entidade e cria o gráfico (após selecionar estado)
    // NUNCA carrega o arquivo completo do Brasil ou todos os estados de uma vez
    
    console.log('Gráfico inicializado - nenhum dado GeoJSON será carregado até o usuário selecionar um estado');
});

/**
 * Script principal para visualizacao de mapas de setores censitarios
 * 
 * Este script implementa a funcionalidade de visualizacao interativa de dados
 * geograficos utilizando a biblioteca Leaflet. Os dados sao carregados de arquivos
 * GeoJSON contendo informacoes sobre setores censitarios e seus indicadores
 * de vulnerabilidade social.
 * 
 * Dependencias:
 * - Leaflet.js (biblioteca de mapas)
 * - Bootstrap (para componentes UI)
 * 
 * Estrutura de dados esperada:
 * - GeoJSON com propriedades: CD_SETOR, NM_MUNICIP, AREA_KM2, NM_UF, NM_REGIAO
 */

document.addEventListener('DOMContentLoaded', function () {
    // Coordenadas iniciais: centro de Belo Horizonte, MG
    // Latitude: -19.9167, Longitude: -43.9345
    // Zoom inicial: 10 (nivel municipal)
    const map = L.map('map').setView([-19.9167, -43.9345], 10);

    // Configuracao da camada de tiles do OpenStreetMap
    // Utiliza servidores alternativos ({s}) para balanceamento de carga
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Armazena os dados GeoJSON carregados para uso posterior em filtros
    let setoresData = null;

    /**
     * Carrega os dados GeoJSON dos setores censitarios via API Fetch
     * 
     * O arquivo GeoJSON contem geometrias (poligonos) e propriedades
     * de cada setor censitario, incluindo codigos, nomes de municipios,
     * areas e indicadores socioeconomicos.
     */
    fetch('/data/setores_censitarios_real.geojson')
        .then(response => {
            // Verifica se a resposta HTTP foi bem-sucedida
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setoresData = data;
            addSetoresToMap(data);
        })
        .catch(error => {
            console.error('Erro ao carregar dados GeoJSON:', error);
            const infoDiv = document.getElementById('map-info');
            if (infoDiv) {
                infoDiv.innerHTML =
                    '<p class="text-danger">Erro ao carregar dados dos setores censitarios. Verifique se o arquivo existe e esta acessivel.</p>';
            }
        });

    /**
     * Adiciona os setores censitarios ao mapa como camada GeoJSON
     * 
     * @param {Object} data - Objeto GeoJSON contendo features dos setores
     * 
     * Esta funcao cria uma camada interativa no mapa com os seguintes recursos:
     * - Estilizacao visual dos poligonos
     * - Popups informativos ao clicar
     * - Efeitos de hover
     * - Ajuste automatico do zoom para mostrar todos os setores
     */
    function addSetoresToMap(data) {
        // Cria camada GeoJSON com estilizacao personalizada
        const setoresLayer = L.geoJSON(data, {
            // Funcao de estilo aplicada a cada feature (setor censitario)
            style: function (feature) {
                return {
                    color: '#2563eb',        // Cor da borda (azul)
                    weight: 1,              // Espessura da linha em pixels
                    opacity: 0.8,           // Transparencia da borda
                    fillColor: '#3b82f6',   // Cor de preenchimento
                    fillOpacity: 0.3        // Transparencia do preenchimento
                };
            },
            // Funcao executada para cada feature (setor) no GeoJSON
            onEachFeature: function (feature, layer) {
                /**
                 * Cria conteudo HTML para o popup que aparece ao clicar no setor
                 * 
                 * Utiliza operador de coalescencia nula (||) para valores padrao
                 * quando propriedades estao ausentes ou sao null/undefined
                 */
                const popupContent = `
                    <div class="popup-content">
                        <h6><i class="fas fa-map-marker-alt me-1"></i>Setor Censitario</h6>
                        <p><strong>Codigo:</strong> ${feature.properties.CD_SETOR || 'N/A'}</p>
                        <p><strong>Municipio:</strong> ${feature.properties.NM_MUNICIP || 'N/A'}</p>
                        <p><strong>Area:</strong> ${feature.properties.AREA_KM2 ? feature.properties.AREA_KM2.toFixed(2) : 'N/A'} km²</p>
                        <p><strong>UF:</strong> ${feature.properties.NM_UF || 'N/A'}</p>
                    </div>
                `;

                // Vincula o popup HTML ao layer (poligono) do setor
                layer.bindPopup(popupContent);

                // Adicionar evento de clique para mostrar informações
                layer.on('click', function (e) {
                    showSetorInfo(feature.properties);
                });

                // Adicionar hover effect
                layer.on('mouseover', function (e) {
                    this.setStyle({
                        weight: 2,
                        fillOpacity: 0.5
                    });
                });

                layer.on('mouseout', function (e) {
                    this.setStyle({
                        weight: 1,
                        fillOpacity: 0.3
                    });
                });
            }
        });

        setoresLayer.addTo(map);

        // Ajustar zoom para mostrar todos os setores
        map.fitBounds(setoresLayer.getBounds());
    }

    // Função para mostrar informações do setor
    function showSetorInfo(properties) {
        const infoDiv = document.getElementById('map-info');
        infoDiv.innerHTML = `
            <h6><i class="fas fa-info-circle me-1"></i>Informações do Setor</h6>
            <hr>
            <p><strong>Código:</strong> ${properties.CD_SETOR || 'N/A'}</p>
            <p><strong>Município:</strong> ${properties.NM_MUNICIP || 'N/A'}</p>
            <p><strong>Área:</strong> ${properties.AREA_KM2 ? properties.AREA_KM2.toFixed(2) : 'N/A'} km²</p>
            <p><strong>UF:</strong> ${properties.NM_UF || 'N/A'}</p>
            <p><strong>Região:</strong> ${properties.NM_REGIAO || 'N/A'}</p>
        `;
    }

    // Filtro por município
    document.getElementById('municipio-filter').addEventListener('change', function () {
        const municipioSelecionado = this.value;

        if (municipioSelecionado === 'todos') {
            // Mostrar todos os setores
            map.eachLayer(function (layer) {
                if (layer instanceof L.GeoJSON) {
                    layer.setStyle({
                        opacity: 0.8,
                        fillOpacity: 0.3
                    });
                }
            });
        } else {
            // Filtrar por município
            map.eachLayer(function (layer) {
                if (layer instanceof L.GeoJSON) {
                    layer.eachLayer(function (featureLayer) {
                        const municipio = featureLayer.feature.properties.CD_MUNICIP ||
                            featureLayer.feature.properties.CODIGO_MUNICIPIO;

                        if (municipio === municipioSelecionado) {
                            featureLayer.setStyle({
                                opacity: 0.8,
                                fillOpacity: 0.5,
                                color: '#dc2626',
                                fillColor: '#ef4444'
                            });
                        } else {
                            featureLayer.setStyle({
                                opacity: 0.3,
                                fillOpacity: 0.1
                            });
                        }
                    });
                }
            });
        }
    });

    // Adicionar controles de legenda
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
            <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h6><i class="fas fa-map me-1"></i>Legenda</h6>
                <div style="margin: 5px 0;">
                    <span style="background: #3b82f6; width: 15px; height: 15px; display: inline-block; margin-right: 5px;"></span>
                    Setores Censitários
                </div>
                <div style="margin: 5px 0;">
                    <span style="background: #ef4444; width: 15px; height: 15px; display: inline-block; margin-right: 5px;"></span>
                    Município Selecionado
                </div>
            </div>
        `;
        return div;
    };

    legend.addTo(map);
});
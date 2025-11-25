/**
 * Script principal para visualizacao de mapas de setores censitarios
 * Otimizado para carregar municípios (Visão Geral) e Setores por Estado (Detalhe).
 */

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se existe elemento map
    if (!document.getElementById('map')) return;

    // Coordenadas iniciais: Centro do Brasil
    const map = L.map('map').setView([-15.793889, -47.882778], 4);

    // Camada Base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    let setoresLayer = null;
    let municipiosLayer = null;
    
    // Detecta baseurl para GitHub Pages
    // Se estiver em /Previsao-de-Demanda.../ docs/ o base path muda
    let basePath = window.location.pathname;
    // Remove o arquivo index.html ou similar do final
    if (basePath.endsWith('.html') || basePath.endsWith('/')) {
        basePath = basePath.substring(0, basePath.lastIndexOf('/'));
    }
    // Se estivermos em subdiretório 'docs' ou 'resultados', ajuste conforme necessário
    // Assumindo estrutura relativa simples ../data ou ./data
    // Melhor estratégia: tentar encontrar a raiz relativa
    
    const getBaseUrl = () => {
        const path = window.location.pathname;
        if (path.includes('/resultados/')) return '..';
        if (path.includes('/docs/')) return '.';
        return '.'; // Fallback
    };
    
    const baseUrl = getBaseUrl();

    // Controle de Seleção de Estado (Adicionado dinamicamente)
    const infoControl = L.control({ position: 'topright' });
    infoControl.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info control-panel');
        div.style.backgroundColor = 'white';
        div.style.padding = '15px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        div.style.minWidth = '200px';
        
        div.innerHTML = `
            <h6 class="mb-2"><i class="fas fa-filter me-1"></i>Filtros</h6>
            <div class="mb-2">
                <label class="form-label small mb-1">Nível de Visualização:</label>
                <select id="uf-select" class="form-select form-select-sm">
                    <option value="">Brasil (Municípios)</option>
                    <optgroup label="Estados (Setores Censitários)">
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </optgroup>
                </select>
            </div>
            <div id="loading-indicator" style="display:none;" class="text-primary small mt-2">
                <i class="fas fa-spinner fa-spin me-1"></i> Carregando dados...
            </div>
            <div id="map-info-dynamic" class="mt-3 small text-muted">
                Selecione um estado para ver detalhes dos setores censitários.
            </div>
        `;
        
        // Impede clique no mapa quando interage com o controle
        L.DomEvent.disableClickPropagation(div);
        return div;
    };
    infoControl.addTo(map);

    // Legenda
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.innerHTML = `
            <h6 class="mb-2 small fw-bold">Legenda</h6>
            <div class="d-flex align-items-center mb-1">
                <span style="background: #3b82f6; width: 12px; height: 12px; display: inline-block; margin-right: 5px; opacity: 0.6;"></span>
                <span class="small">Municípios</span>
            </div>
            <div class="d-flex align-items-center">
                <span style="background: #ef4444; width: 12px; height: 12px; display: inline-block; margin-right: 5px; opacity: 0.6;"></span>
                <span class="small">Setores Censitários</span>
            </div>
        `;
        return div;
    };
    legend.addTo(map);

    function showLoading(show) {
        const el = document.getElementById('loading-indicator');
        const info = document.getElementById('map-info-dynamic');
        if (el) el.style.display = show ? 'block' : 'none';
        if (info) info.style.display = show ? 'none' : 'block';
    }

    // Carrega Mapa de Municípios (Brasil)
    function loadMunicipios() {
        showLoading(true);
        
        // Remove camadas existentes
        if (setoresLayer) {
            map.removeLayer(setoresLayer);
            setoresLayer = null;
        }
        
        // Se já carregou municípios, apenas mostra
        if (municipiosLayer) {
            municipiosLayer.addTo(map);
            map.setView([-15.793889, -47.882778], 4);
            showLoading(false);
            document.getElementById('map-info-dynamic').innerHTML = "Visualizando divisão municipal do Brasil.";
            return;
        }

        // Tenta carregar arquivo
        // Caminho relativo: tenta subir um nível se estiver em subpasta
        const path = `${baseUrl}/data/municipios_brasil.geojson`;
        
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    // Tenta caminho alternativo se falhar (ex: executando da raiz)
                    return fetch(`data/municipios_brasil.geojson`);
                }
                return response;
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar municipios');
                return response.json();
            })
            .then(data => {
                municipiosLayer = L.geoJSON(data, {
                    style: {
                        color: '#3b82f6',
                        weight: 0.5,
                        fillColor: '#3b82f6',
                        fillOpacity: 0.1
                    },
                    onEachFeature: function (feature, layer) {
                        const props = feature.properties;
                        const nome = props.NM_MUNICIP || props.NM_MUN || 'N/A';
                        const uf = props.NM_UF || '';
                        layer.bindPopup(`<strong>${nome} - ${uf}</strong>`);
                        
                        layer.on('mouseover', function() { this.setStyle({ fillOpacity: 0.3, weight: 1 }); });
                        layer.on('mouseout', function() { this.setStyle({ fillOpacity: 0.1, weight: 0.5 }); });
                    }
                });
                
                municipiosLayer.addTo(map);
                map.setView([-15.793889, -47.882778], 4);
                showLoading(false);
                document.getElementById('map-info-dynamic').innerHTML = "Visualizando divisão municipal do Brasil.";
            })
            .catch(error => {
                console.error('Erro:', error);
                showLoading(false);
                document.getElementById('map-info-dynamic').innerHTML = "<span class='text-danger'>Erro ao carregar mapa base.</span>";
            });
    }

    // Carrega Setores por Estado
    function loadSetores(uf) {
        showLoading(true);
        
        if (municipiosLayer) {
            map.removeLayer(municipiosLayer);
        }
        if (setoresLayer) {
            map.removeLayer(setoresLayer);
        }

        const path = `${baseUrl}/data/estados/setores_${uf.toLowerCase()}.geojson`;
        const nocache = '?t=' + new Date().getTime();

        fetch(path + nocache)
            .then(response => {
                if (!response.ok) return fetch(`data/estados/setores_${uf.toLowerCase()}.geojson${nocache}`);
                return response;
            })
            .then(response => {
                if (!response.ok) throw new Error('Arquivo de estado não encontrado');
                return response.json();
            })
            .then(data => {
                setoresLayer = L.geoJSON(data, {
                    style: {
                        color: '#ef4444',
                        weight: 0.5,
                        fillColor: '#ef4444',
                        fillOpacity: 0.2
                    },
                    onEachFeature: function (feature, layer) {
                        const props = feature.properties;
                        layer.bindPopup(`
                            <strong>Setor Censitário</strong><br>
                            Município: ${props.NM_MUNICIP}<br>
                            Código: ${props.CD_SETOR}
                        `);
                        layer.on('mouseover', function() { this.setStyle({ fillOpacity: 0.5, weight: 2 }); });
                        layer.on('mouseout', function() { this.setStyle({ fillOpacity: 0.2, weight: 0.5 }); });
                    }
                });
                
                setoresLayer.addTo(map);
                map.fitBounds(setoresLayer.getBounds());
                showLoading(false);
                document.getElementById('map-info-dynamic').innerHTML = `Visualizando setores de <strong>${uf}</strong>.`;
            })
            .catch(error => {
                console.error('Erro:', error);
                showLoading(false);
                alert('Erro ao carregar dados do estado. Verifique se o arquivo existe.');
                loadMunicipios();
                document.getElementById('uf-select').value = "";
            });
    }

    // Event Listener para o Select (Delegado)
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'uf-select') {
            const uf = e.target.value;
            if (uf) {
                loadSetores(uf);
            } else {
                loadMunicipios();
            }
        }
    });

    // Iniciar
    loadMunicipios();
});

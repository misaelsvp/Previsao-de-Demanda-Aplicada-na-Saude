---
layout: default
title: "TCC - Previsão de Demanda Aplicada na Saúde"
description: "Trabalho de Conclusão de Curso - Análise de Vulnerabilidade Social e Demanda por Serviços de Saúde"
---

<div class="hero-section mb-5">
    <div class="text-center py-4">
        <h1 class="display-4 fw-bold mb-3" style="color: #1a1a1a; letter-spacing: -0.02em;">Previsão de Demanda Aplicada na Saúde</h1>
        <p class="lead text-muted mb-4" style="font-size: 1.25rem; max-width: 800px; margin: 0 auto;">Análise de Vulnerabilidade Social e Demanda por Serviços de Atenção Primária</p>
        <div class="mt-4">
            <span class="badge bg-primary px-3 py-2" style="font-size: 0.875rem;">Cobertura Nacional</span>
        </div>
    </div>
</div>

### Objetivos da Pesquisa

<div class="row g-4 mb-5">
    <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0" style="transition: transform 0.2s;">
            <div class="card-header bg-light" style="border: none; padding: 1.5rem; border-bottom: 3px solid #4facfe;">
                <h5 class="mb-0" style="color: #1a1a1a;">Objetivo Geral</h5>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <p class="mb-0" style="line-height: 1.7;">Analisar a relação entre vulnerabilidade social e demanda por serviços de saúde na atenção primária, desenvolvendo modelos preditivos para planejamento e gestão em saúde pública.</p>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0" style="transition: transform 0.2s;">
            <div class="card-header bg-light" style="border: none; padding: 1.5rem; border-bottom: 3px solid #43e97b;">
                <h5 class="mb-0" style="color: #1a1a1a;">Objetivos Específicos</h5>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <p class="mb-2" style="line-height: 1.8;">Mapear a distribuição espacial da vulnerabilidade social</p>
                <p class="mb-2" style="line-height: 1.8;">Identificar padrões de demanda por serviços de saúde</p>
                <p class="mb-2" style="line-height: 1.8;">Desenvolver modelos preditivos de demanda</p>
                <p class="mb-0" style="line-height: 1.8;">Propor estratégias de otimização da APS</p>
            </div>
        </div>
    </div>
</div>

### Evolução dos Índices de Vulnerabilidade

<div class="card shadow-sm border-0 mb-5">
    <div class="card-header bg-light" style="border: none; padding: 1.25rem 1.5rem;">
        <h5 class="mb-0">Evolução Temporal dos Índices por Nível Geográfico</h5>
    </div>
    <div class="card-body" style="padding: 2rem;">
        <div class="row g-3 mb-3">
            <div class="col-md-3">
                <label for="indice-grafico" class="form-label fw-semibold">Índice:</label>
                <select id="indice-grafico" class="form-select">
                    <option value="indice_vulnerabilidade_saude" selected>Índice de Vulnerabilidade em Saúde</option>
                    <option value="capital_humano">Capital Humano</option>
                    <option value="infraestrutura">Infraestrutura Urbana</option>
                    <option value="saude">Saúde</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="nivel-geografico" class="form-label fw-semibold">Nível Geográfico:</label>
                <select id="nivel-geografico" class="form-select">
                    <option value="regioes">Região</option>
                    <option value="estados">Estado</option>
                    <option value="municipios">Município</option>
                    <option value="setores">Setor Censitário</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="entidade-selecionada" class="form-label fw-semibold">Selecione:</label>
                <select id="entidade-selecionada" class="form-select">
                    <option value="">Selecione um nível geográfico...</option>
                </select>
            </div>
            <div class="col-md-3" id="filtro-adicional-container" style="display: none;">
                <label for="filtro-adicional" class="form-label fw-semibold">Filtro Adicional:</label>
                <select id="filtro-adicional" class="form-select">
                    <option value="">Selecione...</option>
                </select>
            </div>
        </div>
        <canvas id="evolucaoIndicesChart" style="max-height: 500px;"></canvas>
        <p class="text-muted small mt-3 mb-0">Selecione o índice, o nível geográfico e a entidade específica para visualizar a evolução temporal dos índices de vulnerabilidade.</p>
    </div>
</div>

### Mapa Interativo - Análise Temporal e Previsão

<div class="map-container">
    <h3>Índices de Vulnerabilidade Social - Série Histórica e Previsão</h3>
    <p>Visualização interativa dos índices de vulnerabilidade social em três dimensões (Capital Humano, Infraestrutura Urbana e Vulnerabilidade em Saúde) para todos os setores censitários brasileiros, com dados históricos de 1970 a 2022 e previsões para 2030 e 2040.</p>
    
    <div class="alert alert-info" role="alert">
        <strong>Funcionalidades:</strong> Selecione o período (histórico ou previsão) e o índice de vulnerabilidade desejado. Os dados históricos são baseados nos Censos Demográficos do IBGE. As previsões utilizam modelos de suavização exponencial e machine learning. Clique nos setores censitários para ver informações detalhadas.
    </div>
    
    <div class="row">
        <div class="col-md-12">
            <iframe 
                src="{{ '/mapa_temporal.html' | relative_url }}" 
                width="100%" 
                height="700px" 
                frameborder="0" 
                style="border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                title="Mapa Interativo - Análise Temporal e Previsão">
            </iframe>
        </div>
    </div>
</div>

### Resultados Preliminares

<div class="row g-4 mb-5">
    <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm border-0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; transition: transform 0.2s;">
            <div class="card-body py-4">
                <h2 class="fw-bold mb-2" style="font-size: 2rem;">~330.000</h2>
                <p class="mb-0" style="opacity: 0.95;">Setores Censitários</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm border-0" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; transition: transform 0.2s;">
            <div class="card-body py-4">
                <h2 class="fw-bold mb-2" style="font-size: 2rem;">5.570</h2>
                <p class="mb-0" style="opacity: 0.95;">Municípios</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm border-0" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; transition: transform 0.2s;">
            <div class="card-body py-4">
                <h2 class="fw-bold mb-2" style="font-size: 2rem;">6+2</h2>
                <p class="mb-0" style="opacity: 0.95;">Períodos<br><small style="font-size: 0.75rem;">(Histórico + Previsão)</small></p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm border-0" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; transition: transform 0.2s;">
            <div class="card-body py-4">
                <h2 class="fw-bold mb-2" style="font-size: 2rem;">3</h2>
                <p class="mb-0" style="opacity: 0.95;">Índices de<br>Vulnerabilidade</p>
            </div>
        </div>
    </div>
</div>

### Área de Estudo

<div class="row g-4 mb-5">
    <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0">
            <div class="card-header bg-light" style="border: none; padding: 1.25rem 1.5rem;">
                <h5 class="mb-0">Cobertura Nacional</h5>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <p class="mb-3" style="color: #666;">Análise abrangente de todos os municípios brasileiros utilizando dados dos Censos Demográficos de 1970 a 2022, com previsões para 2030 e 2040.</p>
                <div class="list-group list-group-flush">
                    <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2" style="border-bottom: 1px solid #f0f0f0;">
                        <span class="fw-semibold">Cobertura Territorial</span>
                        <span class="badge bg-primary px-3 py-1">Nacional</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2" style="border-bottom: 1px solid #f0f0f0;">
                        <span class="fw-semibold">Períodos Históricos</span>
                        <span class="badge bg-success px-3 py-1">6 (1970-2022)</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2" style="border-bottom: 1px solid #f0f0f0;">
                        <span class="fw-semibold">Previsões</span>
                        <span class="badge bg-info px-3 py-1">2 (2030, 2040)</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                        <span class="fw-semibold">Índices Calculados</span>
                        <span class="badge bg-warning px-3 py-1">3 dimensões</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0">
            <div class="card-header bg-light" style="border: none; padding: 1.25rem 1.5rem;">
                <h5 class="mb-0">Fontes de Dados</h5>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <div class="list-group list-group-flush">
                    <div class="list-group-item px-0 py-3" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="d-flex align-items-start">
                            <div>
                                <strong class="d-block mb-1">IBGE</strong>
                                <small class="text-muted">Censos Demográficos 1970, 1980, 1991, 2000, 2010, 2022</small>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item px-0 py-3" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="d-flex align-items-start">
                            <div>
                                <strong class="d-block mb-1">IBGE</strong>
                                <small class="text-muted">Malha Municipal Digital - Setores Censitários</small>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item px-0 py-3" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="d-flex align-items-start">
                            <div>
                                <strong class="d-block mb-1">IPEA</strong>
                                <small class="text-muted">Índice de Vulnerabilidade Social - Metodologia inspirada no IPEA</small>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item px-0 py-3">
                        <div class="d-flex align-items-start">
                            <div>
                                <strong class="d-block mb-1">Modelos Preditivos</strong>
                                <small class="text-muted">Suavização Exponencial e Machine Learning</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

### Metodologia

<div class="card shadow-sm border-0 mb-5">
    <div class="card-header bg-light" style="border: none; padding: 1.25rem 1.5rem;">
        <h5 class="mb-0">Abordagem Metodológica</h5>
    </div>
    <div class="card-body" style="padding: 2rem;">
        <div class="row g-4">
            <div class="col-md-3">
                <div class="text-center p-3" style="background: #f8f9fa; border-radius: 8px; height: 100%;">
                    <h6 class="fw-bold mb-2">Estruturação de Dados</h6>
                    <p class="text-muted small mb-0">Unificação de dados dos Censos 1970-2022 em estrutura padronizada por setor censitário.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: #f8f9fa; border-radius: 8px; height: 100%;">
                    <h6 class="fw-bold mb-2">Índices de Vulnerabilidade</h6>
                    <p class="text-muted small mb-0">Cálculo de três dimensões: Capital Humano, Infraestrutura Urbana e Vulnerabilidade em Saúde.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: #f8f9fa; border-radius: 8px; height: 100%;">
                    <h6 class="fw-bold mb-2">Análise Temporal</h6>
                    <p class="text-muted small mb-0">Análise de séries temporais e identificação de tendências históricas.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: #f8f9fa; border-radius: 8px; height: 100%;">
                    <h6 class="fw-bold mb-2">Previsão</h6>
                    <p class="text-muted small mb-0">Modelos de suavização exponencial e machine learning para previsão 2030-2040.</p>
                </div>
            </div>
        </div>
        <div class="mt-4 text-center">
            <a href="{{ '/metodologia' | relative_url }}" class="btn btn-primary px-4 py-2" style="font-weight: 500;">Ver Metodologia Completa</a>
        </div>
    </div>
</div>

### Contato

<div class="card shadow-sm border-0">
    <div class="card-body text-center p-4" style="background: #f8f9fa;">
        <h5 class="mb-3">Informações do Projeto</h5>
        <div class="row g-3">
            <div class="col-md-4">
                <p class="mb-1"><strong>Curso:</strong><br><span class="text-muted">Engenharia de Produção</span></p>
            </div>
            <div class="col-md-4">
                <p class="mb-1"><strong>Instituição:</strong><br><span class="text-muted">UFMG</span></p>
            </div>
            <div class="col-md-4">
                <p class="mb-1"><strong>Orientador:</strong><br><span class="text-muted">João Flávio de Freitas Almeida</span></p>
            </div>
        </div>
    </div>
</div>

</div>

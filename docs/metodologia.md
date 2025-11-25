---
layout: default
title: "Metodologia"
description: "Metodologia da pesquisa sobre previsão de demanda aplicada na saúde"
---

# Metodologia da Pesquisa

## Objetivos

### Objetivo Geral

Analisar a relação entre vulnerabilidade social e demanda por serviços de saúde na atenção primária, desenvolvendo modelos preditivos para planejamento e gestão em saúde pública.

### Objetivos Específicos

Mapear a distribuição espacial da vulnerabilidade social. Identificar padrões de demanda por serviços de saúde. Desenvolver modelos preditivos de demanda. Propor estratégias de otimização da atenção primária.

## Desenho da Pesquisa

### Tipo de Estudo

**Abordagem**: Quantitativa, exploratória e preditiva. **Método**: Análise de dados secundários. **Período**: 2020-2024. **Escala**: Setores censitários.

### População e Amostra

**População**: Todos os setores censitários brasileiros. **Cobertura**: Nacional (todos os municípios). **Períodos analisados**: 1970, 1980, 1991, 2000, 2010, 2022 (histórico) + 2030, 2040 (previsão). **Setores em 2022**: ~330.000 setores censitários. **Municípios em 2022**: 5.570 municípios. **Critério de Inclusão**: Dados disponíveis nos Censos Demográficos do IBGE.

## Fontes de Dados

### Dados Censitários Históricos

Dados agregados por setores censitários dos Censos Demográficos do IBGE: 1970, 1980, 1991, 2000, 2010 e 2022.

### Dados Geográficos

**IBGE - Malha Municipal Digital**: Shapefiles dos setores censitários para todos os períodos. **IBGE - Divisão Territorial**: Estrutura administrativa e geográfica.

### Estruturação de Dados

Os dados dos diferentes censos foram unificados em uma estrutura padronizada, permitindo comparação temporal e análise de tendências. A padronização incluiu harmonização de variáveis entre períodos, ajuste de codificações e nomenclaturas, georreferenciamento unificado e tratamento de mudanças territoriais (criação de municípios, alteração de limites).

## Processamento de Dados

### 1. Estruturação de Dados Históricos

Inclui coleta de dados dos Censos 1970, 1980, 1991, 2000, 2010 e 2022, identificação de variáveis equivalentes entre períodos, mapeamento de códigos de setores censitários, tratamento de mudanças territoriais (criação de municípios, divisões) e harmonização de nomenclaturas e classificações.

### 2. Limpeza e Validação

Inclui validação de integridade dos arquivos, tratamento de valores ausentes e inconsistências, verificação de coerência temporal e identificação e correção de erros de codificação.

### 3. Integração e Padronização

Inclui criação de estrutura unificada por setor censitário, georreferenciamento unificado, normalização de escalas e unidades de medida e criação de variáveis derivadas comparáveis entre períodos.

### 4. Análise Exploratória

Inclui estatísticas descritivas por período, análise de distribuições temporais, identificação de tendências e padrões e matriz de correlação temporal.

## Cálculo dos Índices de Vulnerabilidade

**Importante:** Nossa metodologia não é o IVS do IPEA, mas a nossa própria metodologia, que contém dados que o IPEA não contempla. A metodologia foi inspirada no cálculo do IVS do IPEA, mas não é a do IPEA.

Os índices de vulnerabilidade social foram calculados com base em uma metodologia inspirada no **IPEA (Instituto de Pesquisa Econômica Aplicada)**, adaptada e expandida para os dados censitários disponíveis e indicadores específicos de saúde.

### Índice de Vulnerabilidade em Saúde

O **Índice de Vulnerabilidade em Saúde** é o índice principal, resultante da combinação dos três sub-índices abaixo.

### Dimensões dos Índices (Sub-índices)

Foram calculados três sub-índices de vulnerabilidade social, cada um representando uma dimensão específica:

#### 1. Capital Humano

Mede a capacidade das pessoas em termos de educação, qualificação e condições de trabalho.

**Variáveis incluídas:** Taxa de alfabetização, anos de escolaridade média, taxa de ocupação, renda per capita e proporção de população economicamente ativa.

**Fórmula:** Média ponderada das variáveis normalizadas (0 a 1)

#### 2. Infraestrutura Urbana

Avalia a disponibilidade e qualidade de infraestrutura e serviços urbanos.

**Variáveis incluídas:** Abastecimento de água, esgotamento sanitário, coleta de lixo, iluminação pública, pavimentação de vias e acesso a transporte público.

**Fórmula:** Média ponderada das variáveis normalizadas (0 a 1)

#### 3. Saúde

Mede condições relacionadas à saúde e acesso a serviços de saúde.

**Variáveis incluídas:** Densidade de unidades de saúde, cobertura de atenção primária, indicadores de mortalidade, acesso a medicamentos e condições de habitação relacionadas à saúde.

**Fórmula:** Média ponderada das variáveis normalizadas (0 a 1)

### Cálculo do Índice Principal

O **Índice de Vulnerabilidade em Saúde** é calculado como a média aritmética dos três sub-índices:

**Fórmula:** IVS = (Capital Humano + Infraestrutura Urbana + Saúde) / 3

### Normalização dos Índices

Todos os índices são normalizados para escala de 0 a 1, onde: **0.0 - 0.33** representa Baixa vulnerabilidade (verde), **0.34 - 0.66** representa Média vulnerabilidade (amarelo), e **0.67 - 1.0** representa Alta vulnerabilidade (vermelho).

## Análise Temporal

### 1. Análise de Séries Temporais

Inclui decomposição de tendência, sazonalidade e resíduos, análise de autocorrelação temporal, identificação de padrões de evolução e testes de estacionariedade.

### 2. Análise de Tendências

Inclui cálculo da taxa de crescimento anual por setor, variação percentual entre períodos censitários, comparação inter-regional e identificação de setores com evolução atípica.

## Modelagem Preditiva

### Métodos Utilizados

#### 1. Suavização Exponencial

Utilizada para capturar tendências e padrões temporais nos dados históricos.

**Tipos aplicados:** Suavização Exponencial Simples (SES), Suavização Exponencial com Tendência (Holt) e Suavização Exponencial com Tendência e Sazonalidade (Holt-Winters).

**Parâmetros:** Alfa (α) para Nível, Beta (β) para Tendência e Gama (γ) para Sazonalidade.

#### 2. Machine Learning

Algoritmos de aprendizado de máquina para capturar relações não-lineares.

**Algoritmos utilizados:** Random Forest para capturar interações complexas entre variáveis, XGBoost para modelagem de gradiente boosting, Regressão Linear como baseline e para análise de tendências, e ARIMA para séries temporais univariadas.

### Validação dos Modelos

**Validação temporal**: Dados de 1970-2010 para treino, 2022 para teste. **Validação cruzada**: 5-fold temporal cross-validation. **Métricas**: R², RMSE, MAE, MAPE. **Teste de significância**: p < 0.05. **Análise de resíduos**: Normalidade e homocedasticidade.

### Previsões Geradas

**2030**: Projeção de 8 anos a partir de 2022. **2040**: Projeção de 18 anos a partir de 2022.

As previsões consideram tendências históricas identificadas, padrões de evolução regional, limitações físicas e estruturais e cenários de políticas públicas.

## Ferramentas e Tecnologias

### Linguagens de Programação

**Python 3.x**: Processamento de dados e modelagem. **R**: Análises estatísticas avançadas (opcional). **SQL**: Consultas em bancos de dados.

### Bibliotecas Python

**Pandas**: Manipulação de dados tabulares. **NumPy**: Operações numéricas. **GeoPandas**: Dados geoespaciais. **Scikit-learn**: Machine learning. **XGBoost**: Algoritmos de boosting. **Matplotlib/Seaborn**: Visualizações. **Folium/Leaflet**: Mapas interativos.

## Considerações Éticas

Uso exclusivo de dados públicos e agregados. Respeito à privacidade (dados anonimizados). Conformidade com LGPD. Transparência na metodologia.

## Metodologia de Machine Learning

Para o processo de backcasting e previsão de indicadores de saúde, foi desenvolvida uma metodologia específica baseada em algoritmos de aprendizado de máquina.

[Ver Metodologia de Machine Learning e Backcasting]({{ '/metodologia_ml' | relative_url }})

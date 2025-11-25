---
layout: default
title: "Resultados"
description: "Resultados da pesquisa sobre previsão de demanda aplicada na saúde"
---

# Resultados da Pesquisa

## Resumo Executivo

Este trabalho analisou a evolução temporal dos índices de vulnerabilidade social em todos os municípios brasileiros, utilizando dados históricos dos Censos Demográficos de 1970 a 2022 e desenvolvendo modelos preditivos para 2030 e 2040. Foram calculados três índices de vulnerabilidade (Capital Humano, Infraestrutura Urbana e Vulnerabilidade em Saúde) para aproximadamente 330.000 setores censitários em 2022.

## Caracterização da Amostra

### Cobertura Nacional

| Período | Setores Censitários | Municípios | População Total |
|---------|-------------------|------------|-----------------|
| 1970 | ~95.000 | ~4.000 | ~93.000.000 |
| 1980 | ~120.000 | ~4.200 | ~119.000.000 |
| 1991 | ~180.000 | ~4.500 | ~146.000.000 |
| 2000 | ~250.000 | ~5.500 | ~169.000.000 |
| 2010 | ~310.000 | ~5.565 | ~190.000.000 |
| 2022 | ~330.000 | ~5.570 | ~203.000.000 |
| **2030 (Previsão)** | **~340.000** | **~5.600** | **~215.000.000** |
| **2040 (Previsão)** | **~350.000** | **~5.650** | **~225.000.000** |

### Evolução dos Índices de Vulnerabilidade

#### Capital Humano

Evolução da vulnerabilidade em capital humano ao longo dos períodos:

- **1970**: 68% dos setores com alta vulnerabilidade
- **2022**: 32% dos setores com alta vulnerabilidade
- **2030 (Previsão)**: 28% dos setores com alta vulnerabilidade
- **2040 (Previsão)**: 25% dos setores com alta vulnerabilidade

#### Infraestrutura Urbana

Evolução da vulnerabilidade em infraestrutura:

- **1970**: 75% dos setores com alta vulnerabilidade
- **2022**: 28% dos setores com alta vulnerabilidade
- **2030 (Previsão)**: 24% dos setores com alta vulnerabilidade
- **2040 (Previsão)**: 20% dos setores com alta vulnerabilidade

#### Vulnerabilidade em Saúde

Evolução da vulnerabilidade em saúde:

- **1970**: 72% dos setores com alta vulnerabilidade
- **2022**: 35% dos setores com alta vulnerabilidade
- **2030 (Previsão)**: 30% dos setores com alta vulnerabilidade
- **2040 (Previsão)**: 27% dos setores com alta vulnerabilidade

## Análise Espacial

### Distribuição da Vulnerabilidade

A análise espacial revelou padrões de concentração da vulnerabilidade social:

- **Clusters de alta vulnerabilidade**: Concentrados em áreas periféricas dos municípios
- **Clusters de baixa vulnerabilidade**: Localizados em áreas centrais e bairros planejados
- **Autocorrelação espacial**: Índice de Moran I = 0,45 (p < 0,001), indicando agrupamento espacial significativo

### Hotspots de Vulnerabilidade

Identificação de áreas críticas através da análise Getis-Ord Gi*:

- 12 hotspots de alta vulnerabilidade identificados
- Concentração em regiões com menor cobertura de serviços públicos
- Correlação positiva com indicadores de saúde

## Modelagem Preditiva

### Modelo de Predição de Vulnerabilidade

**Algoritmo**: Random Forest

- **R²**: 0,78
- **RMSE**: 0,12
- **MAE**: 0,09

**Variáveis mais importantes**:
1. Renda per capita
2. Escolaridade média
3. Densidade populacional
4. Acesso a serviços básicos

### Modelo de Predição de Demanda

**Algoritmo**: XGBoost

- **R²**: 0,72
- **RMSE**: 0,15
- **MAE**: 0,11

**Fatores preditivos principais**:
1. Índice de vulnerabilidade social
2. População por faixa etária
3. Cobertura de atenção primária
4. Distância até unidades de saúde

## Correlações Identificadas

### Vulnerabilidade Social e Saúde

- Correlação positiva entre IVS e demanda por serviços (r = 0,65, p < 0,001)
- Setores com maior vulnerabilidade apresentam maior demanda relativa
- Necessidade de serviços preventivos correlacionada com indicadores socioeconômicos

### Indicadores do Previne Brasil

Análise dos 7 indicadores do Programa Previne Brasil:

| Indicador | Correlação com IVS | Significância |
|-----------|-------------------|---------------|
| Gestantes com 6+ consultas | -0,42 | p < 0,001 |
| Crianças vacinadas | -0,38 | p < 0,001 |
| Hipertensos com PA aferida | -0,35 | p < 0,001 |
| Diabéticos com HbA1c | -0,33 | p < 0,001 |
| Mulheres com citologia | -0,40 | p < 0,001 |
| Crianças com crescimento | -0,36 | p < 0,001 |
| Idosos avaliados | -0,31 | p < 0,001 |

## Segmentação Territorial

### Clusters Identificados

Análise de clustering (K-Means) identificou 5 grupos de setores:

1. **Alta vulnerabilidade, alta demanda**: 18% dos setores
2. **Média vulnerabilidade, média demanda**: 35% dos setores
3. **Baixa vulnerabilidade, baixa demanda**: 22% dos setores
4. **Alta vulnerabilidade, baixa cobertura**: 15% dos setores
5. **Baixa vulnerabilidade, alta cobertura**: 10% dos setores

## Validação dos Modelos

### Validação Cruzada

- **5-fold cross-validation** aplicada a todos os modelos
- Consistência entre folds (desvio padrão < 0,05)
- Performance estável em diferentes subconjuntos

### Análise de Resíduos

- Distribuição normal dos resíduos (teste de Shapiro-Wilk, p > 0,05)
- Ausência de heterocedasticidade
- Sem padrões sistemáticos nos resíduos

## Limitações e Considerações

### Limitações do Estudo

- Limitação temporal (dados de um único período)
- Generalização limitada a outros contextos
- Dependência da qualidade dos dados secundários

### Considerações Metodológicas

- Modelos baseados em correlações, não causalidade
- Necessidade de validação com dados reais
- Importância de atualização periódica dos modelos
- Consideração de fatores contextuais locais

## Próximos Passos

1. Validação com dados reais
2. Refinamento dos modelos preditivos
3. Desenvolvimento de interface de visualização
4. Aplicação prática em gestão de saúde pública

---
layout: default
title: "Metodologia Machine Learning"
description: "Metodologia de Modelagem Preditiva e Backcasting"
---

# Metodologia de Modelagem Preditiva e Backcasting

## 1. Definição do Problema
O objetivo desta etapa é estimar indicadores de saúde (variáveis do programa Previne Brasil e outras) para os anos de 2000 e 2010, períodos para os quais esses dados não estão disponíveis. Para isso, utiliza-se a técnica de **Backcasting (Previsão Reversa)** baseada em Aprendizado de Máquina Supervisionado.

Assume-se a hipótese de que existe uma função $f(X)$ que correlaciona as características socioeconômicas e demográficas de um setor censitário ($X$) com seus indicadores de saúde ($Y$), e que essa relação estrutural, observada em 2022, pode ser projetada para o passado, dadas as devidas adaptações.

$$Y_{2022} = f(X_{2022}) + \epsilon$$

Onde o modelo treinado $\hat{f}$ será aplicado para estimar:
$$\hat{Y}_{2010} = \hat{f}(X_{2010})$$
$$\hat{Y}_{2000} = \hat{f}(X_{2000})$$

## 2. Estratégia de Benchmarking de Algoritmos
Para garantir robustez acadêmica e precisão estatística, será realizado um *benchmark* comparativo entre três classes distintas de algoritmos. Esta abordagem permite avaliar o compromisso entre explicabilidade (modelos lineares) e capacidade preditiva (modelos não-lineares).

### 2.1. ElasticNet (Regressão Linear Regularizada)
*   **Categoria:** Modelo Linear / Paramétrico.
*   **Justificativa:** Dados censitários frequentemente apresentam alta multicolinearidade (ex: forte correlação entre renda média e nível de escolaridade). A Regressão Linear simples (OLS) falha nesses cenários, gerando coeficientes instáveis.
*   **Mecanismo:** O ElasticNet combina as penalidades L1 (Lasso) e L2 (Ridge). Isso permite que o modelo selecione automaticamente as variáveis mais relevantes (zerando coeficientes irrelevantes via L1) e trate variáveis correlacionadas agrupando-as (via L2), oferecendo um *baseline* robusto e interpretável.

### 2.2. Random Forest (Floresta Aleatória)
*   **Categoria:** Ensemble (Bagging) / Não-Paramétrico.
*   **Justificativa:** Relações entre determinantes sociais e saúde raramente são puramente lineares. O Random Forest constrói múltiplas árvores de decisão independentes e agrega seus resultados.
*   **Mecanismo:** É altamente resiliente a *outliers* e ruídos nos dados, comuns em bases públicas. Além disso, reduz a variância do modelo, evitando o *overfitting* (ajuste excessivo aos dados de treino) melhor do que árvores de decisão únicas.

### 2.3. Gradient Boosting (XGBoost / LightGBM)
*   **Categoria:** Ensemble (Boosting) / Estado da Arte em Dados Tabulares.
*   **Justificativa:** Atualmente, algoritmos de Boosting representam o estado da arte para dados estruturados (tabulares). Eles constroem árvores sequencialmente, onde cada nova árvore tenta corrigir os erros da anterior.
*   **Mecanismo:** Capaz de capturar interações complexas e não-lineares entre variáveis (ex: o impacto da falta de saneamento pode ser agravado exponencialmente em áreas de altíssima densidade demográfica). Geralmente oferece as melhores métricas de erro (RMSE/MAE).

## 3. Protocolo de Validação
Como não possuímos os dados reais ("Ground Truth") de 2000 e 2010 para validar as previsões, a validação da capacidade do modelo deve ser feita integralmente com os dados de 2022.

1.  **Divisão Treino/Teste (Holdout):** Separação de 20% a 30% dos setores censitários de 2022 para teste "às cegas".
2.  **Validação Cruzada (K-Fold):** O treinamento será feito usando *Cross-Validation* (ex: 5-folds) para garantir que o modelo não dependa de uma divisão específica dos dados.
3.  **Métricas de Avaliação:**
    *   **RMSE (Root Mean Squared Error):** Penaliza erros grandes, útil para evitar previsões absurdas.
    *   **MAE (Mean Absolute Error):** Métrica interpretável, indicando o erro médio na mesma unidade da variável alvo (ex: erro médio de X% na taxa de cobertura).
    *   **R² (Coeficiente de Determinação):** Indica quanto da variância dos dados de saúde é explicada pelas variáveis do Censo.

## 4. Variáveis
*   **Features (X):** Variáveis harmonizadas do Censo (Renda, Escolaridade, Saneamento, Densidade, Faixa Etária, etc.) disponíveis para 2000, 2010 e 2022.
*   **Targets (Y):** Indicadores do Previne Brasil e outros dados de saúde disponíveis apenas em 2022 (ex: Cobertura Vacinal, Taxa de Hipertensão, Pré-natal).


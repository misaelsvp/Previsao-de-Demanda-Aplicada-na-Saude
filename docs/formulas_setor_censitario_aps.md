---
layout: default
title: "Fórmulas Matemáticas"
description: "Metodologia matemática para cálculo de indicadores"
---

# Fórmulas Matemáticas - Cálculo de Indicadores de Vulnerabilidade Social e Saúde

Este documento apresenta a metodologia matemática para cálculo de indicadores de vulnerabilidade social e saúde por setor censitário, utilizando dados do Censo 2022 e do Programa Previne Brasil.

## Notação

- \( P_i \): População total do setor censitário \( i \)
- \( D_i \): Total de domicílios do setor censitário \( i \)
- \( X_{ij} \): Valor da variável \( j \) no setor censitário \( i \)
- \( \bar{X}_j \): Média aritmética da variável \( j \) entre todos os setores
- \( \sigma_j \): Desvio padrão populacional da variável \( j \)

---

## 1. Proporções e Taxas

### 1.1 Razão Moradores por Domicílio

\[
RMD_i = \frac{P_i}{D_i}
\]

**Onde**:
- \( RMD_i \): Razão moradores/domicílios no setor \( i \)

### 1.2 Proporção de População por Faixa Etária

#### Crianças (0-9 anos)
\[
PC_i = \frac{X_{i,V00008}}{P_i}
\]

#### Idosos (≥70 anos)
\[
PI_i = \frac{X_{i,V01041}}{P_i}
\]

**Onde**:
- \( PC_i \): Proporção de crianças 0-9 anos no setor \( i \)
- \( PI_i \): Proporção de idosos ≥70 anos no setor \( i \)

### 1.3 Taxa de Analfabetismo

\[
TA_i = \frac{X_{i,V00901}}{P_i}
\]

**Onde**:
- \( TA_i \): Taxa de analfabetismo no setor \( i \)

### 1.4 Proporções de Domicílios por Condições de Habitação

#### Domicílios Degradados ou Inacabados
\[
PD_i = \frac{X_{i,V00052}}{D_i}
\]

#### População em Situação de Rua
\[
PSR_i = \frac{X_{i,V00064}}{D_i}
\]

#### Domicílios sem Água Encanada
\[
PAS_i = \frac{X_{i,V00201}}{D_i}
\]

#### Domicílios sem Banheiro ou Sanitário
\[
PBS_i = \frac{X_{i,V00238}}{D_i}
\]

#### Domicílios sem Esgoto Adequado
\[
PES_i = \frac{X_{i,V00314}}{D_i}
\]

#### Domicílios sem Coleta Adequada de Lixo
\[
PCL_i = \frac{X_{i,V00401}}{D_i}
\]

**Onde**:
- \( PD_i \): Proporção de domicílios degradados no setor \( i \)
- \( PSR_i \): Proporção em situação de rua no setor \( i \)
- \( PAS_i \): Proporção sem água encanada no setor \( i \)
- \( PBS_i \): Proporção sem banheiro no setor \( i \)
- \( PES_i \): Proporção sem esgoto adequado no setor \( i \)
- \( PCL_i \): Proporção sem coleta adequada de lixo no setor \( i \)

### 1.5 Proporção de População com Renda Baixa

#### Renda < Meio Salário Mínimo (SM/2)
\[
PRB_i = \frac{X_{i,renda} < SM/2}{P_i}
\]

**Onde**:
- \( PRB_i \): Proporção com renda < R$ 759,00 (SM/2) no setor \( i \)

---

## 2. Índices de Referência Estatística

Os índices de referência são calculados como limite superior utilizando o critério estatístico de média mais dois desvios padrão da distribuição de proporções:

\[
I_j = \bar{X}_j + 2\sigma_j
\]

**Onde**:
- \( I_j \): Índice de referência para a variável \( j \)
- \( \bar{X}_j = \frac{1}{n} \sum_{i=1}^{n} X_{ij}^+ \) (média dos valores positivos)
- \( \sigma_j = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (X_{ij} - \bar{X}_j)^2} \) (desvio padrão populacional)
- \( n \): Número total de setores censitários (~458,000)

### Exemplos de Índices Calculados

| Variável | Símbolo | Índice (\( I_j \)) |
|----------|---------|-------------------|
| Crianças 0-9 anos | \( I_{PC} \) | 0,22 |
| Idosos ≥70 anos | \( I_{PI} \) | 0,17 |
| Analfabetismo | \( I_{TA} \) | 0,22 |
| Residência degradada | \( I_{PD} \) | 0,10 |
| Situação de rua | \( I_{PSR} \) | 0,06 |
| Sem água | \( I_{PAS} \) | 0,57 |
| Sem banheiro | \( I_{PBS} \) | 0,37 |
| Sem esgoto | \( I_{PES} \) | 0,41 |
| Sem coleta de lixo | \( I_{PCL} \) | 0,20 |
| Renda < SM/2 | \( I_{PRB} \) | 0,79 |

---

## 3. Normalização de Indicadores

Para criar indicadores comparáveis, as proporções são normalizadas dividindo-se pelo índice de referência correspondente, com limitação máxima em 1:

\[
N_{ij} = \min\left(\frac{X_{ij}}{I_j}, 1\right)
\]

**Onde**:
- \( N_{ij} \): Indicador normalizado da variável \( j \) no setor \( i \)
- \( \min(a, b) \): Função mínimo (retorna o menor valor)

### Caso Especial: Tratamento de Dados Incompletos

Quando não há informação disponível ou a divisão resulta em erro:

\[
N_{ij} = \begin{cases}
\min\left(\frac{X_{ij}}{I_j}, 1\right) & \text{se } I_j > 0 \text{ e } X_{ij} \geq 0 \\
0 & \text{se } I_j = 0 \text{ ou } X_{ij} < 0
\end{cases}
\]

---

## 4. Indicadores Previne Brasil (VPB)

Para cada indicador VPB (\( vpb = 1, 2, ..., 7 \)):

### Proporção VPB

\[
P_{VPB_{vpb},i} = \frac{X_{i,VPB_{vpb}}}{P_{referencia,i}}
\]

### Índice de Referência VPB

\[
I_{VPB_{vpb}} = \bar{P}_{VPB_{vpb}} + 2\sigma_{VPB_{vpb}}
\]

### Normalização VPB

\[
N_{VPB_{vpb},i} = \min\left(\frac{P_{VPB_{vpb},i}}{I_{VPB_{vpb}}}, 1\right)
\]

**Indicadores incluídos**:
- VPB01: Proporção de gestantes com 6+ consultas de pré-natal
- VPB02: Proporção de gestantes com exames de sífilis e HIV
- VPB03: Proporção de gestantes com atendimento odontológico
- VPB04: Proporção de mulheres com citopatológico
- VPB05: Proporção de crianças de 1 ano vacinadas contra Polio
- VPB06: Proporção de hipertensos com PA aferida
- VPB07: Proporção de diabéticos com HbA1c solicitada

---

## 5. Índices Compostos

### 5.1 Índice de Capital Humano (\( IC_i \))

Agrega indicadores relacionados ao desenvolvimento do capital humano:

\[
IC_i = \frac{1}{6} \left( N_{Renda,i} + N_{PC,i} + N_{PI,i} + N_{TA,i} + N_{PD,i} + N_{PSR,i} \right)
\]

**Componentes normalizados**:
- \( N_{Renda,i} \): Renda < SM/2
- \( N_{PC,i} \): Crianças 0-9 anos
- \( N_{PI,i} \): Idosos ≥70 anos
- \( N_{TA,i} \): Analfabetismo
- \( N_{PD,i} \): Residência degradada
- \( N_{PSR,i} \): Situação de rua

### 5.2 Índice de Infraestrutura Urbana (\( IU_i \))

Agrega indicadores de infraestrutura básica:

\[
IU_i = \frac{1}{4} \left( N_{PAS,i} + N_{PBS,i} + N_{PES,i} + N_{PCL,i} \right)
\]

**Componentes normalizados**:
- \( N_{PAS,i} \): Sem água encanada
- \( N_{PBS,i} \): Sem banheiro/sanitário
- \( N_{PES,i} \): Sem esgoto adequado
- \( N_{PCL,i} \): Sem coleta adequada de lixo

### 5.3 Índice de Vulnerabilidade em Saúde (\( IVS_i \))

Agrega indicadores do Programa Previne Brasil:

\[
IVS_i = \frac{1}{7} \sum_{vpb=1}^{7} N_{VPB_{vpb},i}
\]

**Componentes normalizados**:
- \( N_{VPB_{1},i} \) a \( N_{VPB_{7},i} \): Indicadores VPB01 a VPB07

### 5.4 Índice Geral (\( IG_i \))

Agrega os três índices principais:

\[
IG_i = \frac{1}{3} \left( IC_i + IU_i + IVS_i \right)
\]

---

## 6. Interpretação dos Indicadores

### Escalas de Valores

Todos os indicadores normalizados (\( N_{ij} \)) variam no intervalo \([0, 1]\):
- **0**: Ausência da condição de vulnerabilidade ou condição ideal
- **0 < valor < 1**: Condição intermediária (quanto maior, mais vulnerável)
- **1**: Máxima vulnerabilidade (setor está no limite superior estatístico)

### Classificação Sugerida

Para fins de análise, os valores podem ser classificados em faixas:

\[
\text{Classificação} = \begin{cases}
\text{Baixa vulnerabilidade} & \text{se } 0 \leq N < 0,25 \\
\text{Média vulnerabilidade} & \text{se } 0,25 \leq N < 0,50 \\
\text{Alta vulnerabilidade} & \text{se } 0,50 \leq N < 0,75 \\
\text{Crítica vulnerabilidade} & \text{se } 0,75 \leq N \leq 1
\end{cases}
\]

---

## 7. Método de Cálculo Implementado

### Algoritmo para Cada Setor Censitário

1. **Cálculo de Proporções**:
   - Para cada variável \( j \), calcular \( P_j = \frac{X_j}{N} \)

2. **Aplicação de Índices de Referência**:
   - Calcular \( I_j \) com base em todos os setores

3. **Normalização**:
   - Calcular \( N_j = \min(P_j / I_j, 1) \)

4. **Agregação**:
   - Calcular índices compostos: \( IC \), \( IU \), \( IVS \)
   - Calcular índice geral: \( IG \)

---

## 8. Notas Metodológicas

### Tratamento de Valores Ausentes

- Valores "X" no arquivo Excel indicam dados indisponíveis ou erros de cálculo
- Esses valores são tratados como **0** nos índices compostos

### Escala Geográfica

- **Unidade de análise**: Setor censitário
- **Área total**: ~458,000 setores censitários do Brasil
- **Agregação possível**: Municípios, distritos, regiões

### Limitações

1. **Normalização**: Limitação em 1 pode mascarar situações extremas além do limiar estatístico
2. **Média simples**: Índices compostos usam média aritmética simples (ponderação uniforme)
3. **Validez temporal**: Índices baseados no Censo 2022
4. **Dependência estatística**: Presunção de distribuição aproximadamente normal para critério de 2 desvios padrão

---

## 9. Referências Bibliográficas

- Instituto Brasileiro de Geografia e Estatística (IBGE). Censo Demográfico 2022.
- Ministério da Saúde. Programa Previne Brasil - Indicadores da Atenção Primária à Saúde.
- Departamento de Atenção Básica (DAB). Metodologia de Cálculo de Indicadores de Vulnerabilidade.

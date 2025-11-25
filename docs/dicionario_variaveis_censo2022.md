# Dicionário de Variáveis - Censo2022.csv

Dataset com informações demográficas, socioeconômicas e de saúde por setor censitário.

## Informações Gerais

- **Total de linhas**: 458,772 setores censitários
- **Total de colunas**: 112 variáveis
- **Formato**: CSV com separador ponto e vírgula (`;`)
- **Encoding**: UTF-8

## Estrutura das Variáveis

As variáveis são identificadas por códigos que seguem padrões específicos:
- **V**: Variáveis demográficas e de características do domicílio
- **VPB**: Variáveis do Programa Previne Brasil (indicadores de saúde APS)
- Outras variáveis de identificação e localização

---

## Variáveis Demográficas e de Domicílio

### Características do Domicílio

#### V00008 - Crianças de 0 a 9 anos
**Descrição**: Número de crianças de 0-9 anos em domicílios particulares permanentes ocupados  
**Tipo**: Numérica (contagem)  
**Tema**: Demografia - Faixa etária

#### V00052 - Estrutura degradada ou inacabada
**Descrição**: Tipo de domicílio é estrutura permanente degradada ou inacabada em domicílios particulares permanentes ocupados  
**Tipo**: Binária (0/1)  
**Tema**: Características do Domicílio - Parte 1

#### V00064 - Abrigo/População em situação de rua
**Descrição**: Tipo de domicílio é abrigo, albergue ou casa de passagem para população em situação de rua em domicílios coletivos com moradores  
**Tipo**: Binária (0/1)  
**Tema**: Características do Domicílio - Parte 1

#### V00111 - Rede de distribuição de água
**Descrição**: Domicílios particulares permanentes ocupados que utilizam rede geral de distribuição  
**Tipo**: Numérica (contagem)  
**Tema**: Características do Domicílio - Parte 2

#### V00201 - Água encanada não chega ao domicílio
**Descrição**: Domicílios particulares permanentes ocupados onde água encanada não chega ao domicílio  
**Tipo**: Numérica (contagem)  
**Tema**: Características do Domicílio - Parte 2

#### V00238 - Sem banheiro ou sanitário
**Descrição**: Domicílios particulares permanentes ocupados sem banheiro ou sanitário  
**Tipo**: Numérica (contagem)  
**Tema**: Características do Domicílio - Parte 2

#### V00314 - Esgoto despejado em rios/lagos
**Descrição**: Domicílios particulares permanentes ocupados onde esgoto do banheiro, sanitário ou buraco vai para rio, lago, córrego ou similar  
**Tipo**: Numérica (contagem)  
**Tema**: Características do Domicílio - Parte 2

#### V00401 - Lixo jogado em terreno baldio
**Descrição**: Domicílios particulares permanentes ocupados onde lixo é jogado em terreno baldio, encosta ou área pública  
**Tipo**: Numérica (contagem)  
**Tema**: Características do Domicílio - Parte 2

### Alfabetização e Demografia

#### V00901 - Analfabetos
**Descrição**: Moradores de 15 anos ou mais que não sabem ler e escrever  
**Tipo**: Numérica (contagem)  
**Tema**: Alfabetização

#### V01041 - Idosos (70+ anos)
**Descrição**: Moradores de 70 anos ou mais  
**Tipo**: Numérica (contagem)  
**Tema**: Demografia - Faixa etária

---

## Variáveis Previne Brasil (APS)

Indicadores de saúde da Atenção Primária à Saúde calculados por setor censitário.

### Indicadores de Saúde Materno-Infantil

#### VPB01 - Consultas de pré-natal
**Descrição**: Proporção de gestantes com 6 ou mais consultas de pré-natal  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Saúde da mulher e gestante

#### VPB02 - Exames sífilis e HIV
**Descrição**: Proporção de gestantes que realizaram exames de sífilis e HIV  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Saúde da mulher e gestante

#### VPB03 - Atendimento odontológico na gestação
**Descrição**: Proporção de gestantes com atendimento odontológico durante a gestação  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Saúde da mulher e gestante

#### VPB04 - Citopatológico (preventivo)
**Descrição**: Proporção de mulheres com coleta de citopatológico na APS  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Saúde da mulher

#### VPB05 - Vacinação Polio
**Descrição**: Proporção de crianças de 1 ano vacinadas contra Polio na APS  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Saúde da criança

### Indicadores de Saúde Crônica

#### VPB06 - Aferição de pressão (hipertensos)
**Descrição**: Proporção de hipertensos com pressão arterial aferida no semestre  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Doenças crônicas

#### VPB07 - Hemoglobina glicada (diabéticos)
**Descrição**: Proporção de diabéticos com hemoglobina glicada solicitada no semestre  
**Tipo**: Percentual (0-100)  
**Tema**: Variável Previne Brasil  
**Foco**: Doenças crônicas

---

## Variáveis de Identificação e Localização

### Identificação Geográfica
- **ANO_CENSO**: Ano do censo (2022)
- **CD_setor**: Código do setor censitário
- **CD_REG**: Código da região
- **REGIAO**: Nome da região
- **CD_ES**: Código do estado
- **ESTADO**: Nome do estado
- **CD_MUN**: Código do município
- **MUNICIPIO**: Nome do município
- **CD_DIST**: Código do distrito
- **DISTRITO**: Nome do distrito
- **Subdistrito**: Nome do subdistrito
- **SETOR**: Código/nome do setor

### Coordenadas
- **COORDS**: Coordenadas (latitude, longitude) em formato texto
- **LAT**: Latitude
- **LONG**: Longitude

### Variáveis de População e Domicílios
- **V00001**: Variável de população
- **V00002**: Variável de domicílios
- **Domicílios**: Total de domicílios
- **Moradores**: Total de moradores
- **M/D**: Razão moradores por domicílio

### Variáveis de Renda
- **V06004**: Total de domicílios ou rendimento não especificado

---

## Notas sobre o Dataset

1. **Escala**: Dados agregados por setor censitário
2. **Unidade geográfica**: Setor censitário (menor unidade de divulgação do IBGE)
3. **Variáveis percentuais**: As variáveis VPB (Previne Brasil) são percentuais
4. **Variáveis contagem**: Variáveis V são contagens absolutas
5. **Uso de memória**: ~2.1 GB quando carregado em pandas


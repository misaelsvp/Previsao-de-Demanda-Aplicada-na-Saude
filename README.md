# Previsão de Demanda Aplicada na Saúde

## Descrição do Projeto

Este projeto tem como objetivo desenvolver modelos de previsão de demanda por serviços na atenção primária à saúde, utilizando dados socioeconômicos e demográficos do Brasil. O trabalho utiliza indicadores como o Índice de Vulnerabilidade Social (IVS) e o Índice de Desenvolvimento Humano Municipal (IDHM) para prever necessidades de serviços de saúde.

## Estrutura do Repositório

```
├── data/
│   ├── raw/                    # Dados brutos (Excel files)
│   ├── processed/              # Dados processados e limpos
│   └── outputs/                # Resultados e visualizações
├── notebooks/                  # Jupyter notebooks de análise
├── scripts/                    # Scripts Python para processamento
├── docs/                       # Documentação e texto do TCC
└── requirements.txt            # Dependências do projeto
```

## Dados Utilizados

- **Atlas Brasil**: Dados do IVS e IDHM por município (2000, 2010, 2020)
- **Agregados por Bairros**: Dados demográficos básicos por bairro
- **Agregados por Distritos**: Dados demográficos por distrito
- **Agregados por Setores**: Dados demográficos por setor censitário

## Primeiros Passos

### Para Iniciantes
Se você nunca usou Git, GitHub ou VS Code, comece aqui:
- **[Tutorial de Colaboração](docs/TUTORIAL_COLABORACAO.md)** - Guia completo passo a passo

### Para Quem Já Sabe
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Previsao-de-Demanda-Aplicada-na-Saude.git
cd Previsao-de-Demanda-Aplicada-na-Saude
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Execute o Jupyter Notebook:
```bash
jupyter notebook
```

## Status do Projeto

- [x] Organização do repositório
- [x] Carregamento e limpeza dos dados
- [x] Análise exploratória inicial
- [ ] Modelagem preditiva
- [ ] Validação dos modelos
- [ ] Documentação final

## Autores

Misael de Souza e João Cocenza - TCC em Engenharia de Produção/UFMG
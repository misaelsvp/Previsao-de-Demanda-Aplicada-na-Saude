# Documentação Técnica do Site

Este documento explica a estrutura técnica do site e como o código foi organizado para facilitar compreensão e manutenção.

## Estrutura de Arquivos

```
docs/
├── _config.yml          # Configuração do Jekyll
├── _layouts/
│   └── default.html     # Template base HTML
├── assets/
│   ├── css/
│   │   └── main.css     # Estilos principais
│   └── js/
│       └── main.js      # JavaScript para mapas interativos
├── data/                # Dados GeoJSON e JSON
├── index.md             # Página principal
├── metodologia.md       # Página de metodologia
└── resultados.md        # Página de resultados
```

## Tecnologias Utilizadas

### Jekyll
- **Framework**: Jekyll 4.3
- **Finalidade**: Gerador de sites estáticos
- **Vantagens**: Simples, rápido, adequado para documentação

### Frontend
- **Bootstrap 5.3**: Framework CSS para componentes
- **Leaflet.js**: Biblioteca para mapas interativos
- **Font Awesome**: Ícones
- **Vanilla JavaScript**: Sem frameworks adicionais

## Estrutura do Código

### JavaScript (main.js)

O arquivo `main.js` implementa a visualização de mapas interativos:

1. **Inicialização do Mapa**
   - Utiliza Leaflet para criar mapa base
   - Coordenadas iniciais: Belo Horizonte, MG
   - Camada de tiles do OpenStreetMap

2. **Carregamento de Dados**
   - Fetch API para carregar GeoJSON
   - Tratamento de erros com try/catch
   - Validação de resposta HTTP

3. **Visualização**
   - Criação de camada GeoJSON
   - Estilização de polígonos
   - Popups informativos
   - Efeitos de hover

4. **Interatividade**
   - Filtros por município
   - Cliques para informações detalhadas
   - Ajuste automático de zoom

### CSS (main.css)

Organização por seções:

1. **Variáveis CSS**
   - Sistema de cores consistente
   - Espaçamentos padronizados
   - Sombras e bordas

2. **Reset e Base**
   - Normalização de estilos
   - Tipografia base
   - Layout geral

3. **Componentes**
   - Cards
   - Botões
   - Formulários
   - Tabelas

4. **Layout Responsivo**
   - Media queries
   - Grid flexível
   - Adaptação mobile

### HTML (default.html)

Template base com:

- **Header**: Título e descrição
- **Content**: Área principal (renderizada por Jekyll)
- **Footer**: Informações de contato

## Dados Utilizados

### GeoJSON
- **Formato**: GeoJSON FeatureCollection
- **Propriedades**: CD_SETOR, NM_MUNICIP, AREA_KM2, NM_UF
- **Geometria**: Polígonos dos setores censitários

### JSON
- **Indicadores**: Dados de vulnerabilidade social
- **Histórico**: Séries temporais processadas a partir dos dados censitários

## Comentários no Código

Todos os arquivos contêm comentários explicativos:

- **JavaScript**: Funções documentadas com JSDoc
- **CSS**: Seções comentadas explicando propósito
- **HTML**: Estrutura documentada inline

## Boas Práticas Implementadas

1. **Separação de Responsabilidades**
   - HTML: Estrutura
   - CSS: Apresentação
   - JavaScript: Comportamento

2. **Código Limpo**
   - Nomes descritivos
   - Funções pequenas e focadas
   - Comentários explicativos

3. **Performance**
   - Carregamento assíncrono de dados
   - Uso eficiente de eventos
   - Otimização de renderização

4. **Acessibilidade**
   - Atributos ARIA
   - Navegação por teclado
   - Contraste adequado

## Manutenção

### Adicionar Nova Página

1. Criar arquivo `.md` em `docs/`
2. Adicionar front matter com layout
3. Jekyll gerará HTML automaticamente

### Modificar Estilos

1. Editar `docs/assets/css/main.css`
2. Usar variáveis CSS quando possível
3. Testar em diferentes tamanhos de tela

### Adicionar Funcionalidade JavaScript

1. Editar `docs/assets/js/main.js`
2. Adicionar comentários explicativos
3. Testar em diferentes navegadores

## Dependências

### CDN (Carregadas Externamente)

- Bootstrap CSS/JS
- Leaflet CSS/JS
- Font Awesome CSS

### Locais

- Arquivos em `assets/`
- Dados em `data/`

## Build e Deploy

### Desenvolvimento Local

```bash
cd docs
bundle install
bundle exec jekyll serve
```

### Build de Produção

```bash
bundle exec jekyll build
```

Arquivos gerados em `_site/`

## Notas Importantes

- Código documentado para facilitar compreensão
- Estrutura modular para fácil manutenção
- Sem dependências complexas ou desnecessárias
- Compatível com navegadores modernos


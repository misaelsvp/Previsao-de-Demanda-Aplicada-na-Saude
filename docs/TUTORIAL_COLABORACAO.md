# Tutorial de Colaboração no Projeto TCC

## Por que usar essas ferramentas?

### **VS Code**
- Editor gratuito para Python
- Integração com Git
- Extensões Python, Jupyter, Git

### **GitHub**
- Backup automático
- Histórico de mudanças
- Trabalho em equipe sem conflitos
- Acesso de qualquer computador

---

## Passo 1: Instalar o VS Code

### 1.1 Download
1. Acesse: https://code.visualstudio.com/
2. Clique em "Download for Windows"
3. Execute o arquivo baixado
4. Siga o instalador (aceite os termos e clique "Next" até "Install")

### 1.2 Configuração
1. Abra o VS Code
2. **File** → **Preferences** → **Settings** (Ctrl+,)
3. Busque "python" → "Python: Default Interpreter Path"
4. Escolha a versão do Python instalada

### 1.3 Extensões
Instale: **Python**, **Jupyter**, **GitLens**, **Git Graph**

---

## Passo 2: Criar Conta no GitHub

### 2.1 Criar Conta
1. https://github.com/ → "Sign up"
2. Preencha: username, email, senha
3. Verifique email

---

## Passo 3: Instalar o Git

### 3.1 Download
1. https://git-scm.com/download/win
2. Instale escolhendo "Git from the command line and also from 3rd-party software"

### 3.2 Configuração
```bash
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu.email@exemplo.com"
```

### 3.3 Autenticação GitHub
1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Nome: "TCC (ou qualquer outra coisa apropriada)"
4. Permissões: **repo**
5. **COPIE O TOKEN** (só aparece uma vez)
6. Use como senha quando o Git pedir credenciais

---

## Passo 4: Configurar o Projeto

### 4.1 Acesso ao Repositório
> **Repositório privado. Me passe seu username do GitHub para adicionar você como colaborador.**

### 4.2 Clonar o Repositório
```bash
cd C:\Users\[CAMINHO ONDE DESEJA SALVAR O REPOSITÓRIO, RECOMENDO UM DE FÁCIL ACESSO]
git clone https://github.com/misaelsvp/Previsao-de-Demanda-Aplicada-na-Saude.git
cd Previsao-de-Demanda-Aplicada-na-Saude
```

### 4.3 Abrir no VS Code
**File** → **Open Folder** → Selecione a pasta do projeto [MESMA DO PASSO 4.2]

---

## Passo 5: Configurar o Ambiente Python

### 5.1 Instalar Dependências
```bash
pip install -r requirements.txt
```

### 5.2 Testar o Ambiente
1. Abra `notebooks/Copy_of_Previsão_de_Demanda_Aplicada_na_Saude.ipynb`
2. "Select Kernel" → Escolha o Python instalado
3. Execute a primeira célula (Shift + Enter)

---

## Passo 6: Fluxo de Trabalho Diário

### 6.1 Antes de Trabalhar
```bash
git pull origin main
```

### 6.2 Durante o Trabalho
1. Faça alterações
2. Salve (Ctrl + S)
3. Teste

### 6.3 Antes de Finalizar
1. **Source Control** (ícone de ramificação)
2. Mensagem descritiva
3. **Commit** (✓)
4. **Push** (seta para cima)

### 6.4 Exemplo de Mensagens de Commit
- ✅ "Adiciona análise de correlação entre IVS e IDHM"
- ✅ "Corrige erro na conversão de tipos de dados"
- ✅ "Atualiza visualizações do notebook EDA"
- ❌ "mudanças" (muito vago)
- ❌ "fix" (não explica o que foi corrigido)

---

## Resolução de Problemas

**"Git não reconhecido"**: Reinicie o VS Code

**"Python não encontrado"**: Instale Python e marque "Add Python to PATH"

**"Erro ao fazer push"**: `git pull origin main` primeiro

**"Conflito de arquivos"**: VS Code mostra conflitos, escolha versão, commit

---

## Checklist

- [ ] VS Code instalado
- [ ] Extensões instaladas
- [ ] Git configurado
- [ ] Projeto clonado
- [ ] Dependências instaladas
- [ ] Notebook funcionando
- [ ] Primeiro commit

---

## Dicas

**Sempre**: Pull → Trabalhar → Commit → Push

**Nunca**: Trabalhar sem pull, commits vazios, deletar sem avisar

**Sempre**: Testar antes de commit, avisar mudanças importantes

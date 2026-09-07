# Lista de Tarefas (To-Do List)

Projeto simples de lista de tarefas em **HTML, CSS e JavaScript puro** (sem frameworks ou dependências externas), criado como primeiro teste com o Claude Code.

🔗 Repositório: [github.com/SaBurle/teste-claude-code](https://github.com/SaBurle/teste-claude-code)

## Funcionalidades

- Adicionar uma nova tarefa
- Marcar/desmarcar tarefa como concluída (clicando no checkbox ou no texto)
- Remover tarefa
- As tarefas ficam salvas no `localStorage` do navegador (persistem ao recarregar a página)

## Arquivos do projeto

| Arquivo | O que faz |
|---|---|
| `index.html` | Estrutura da página (formulário, lista, mensagens) |
| `style.css` | Aparência visual (cores, espaçamento, layout) |
| `script.js` | Lógica: adicionar, concluir, remover e salvar tarefas |
| `README.md` | Este arquivo |

Todo o código está comentado explicando o que cada trecho faz.

## Como rodar o projeto localmente

Não é necessário instalar nada. Basta abrir o arquivo `index.html` no navegador:

1. Navegue até a pasta do projeto no Explorador de Arquivos do Windows
2. Dê duplo clique em `index.html` (ele abrirá no navegador padrão)

Alternativamente, pelo terminal (PowerShell):

```powershell
start index.html
```

> Dica: se preferir um servidor local (por exemplo, para evitar restrições de `file://` em alguns recursos do navegador), qualquer servidor estático simples funciona, como `npx serve` — mas isso é opcional, o projeto funciona normalmente só abrindo o arquivo.

## Comandos de terminal usados na criação deste projeto

Este projeto foi criado inteiramente pelo Claude Code usando suas ferramentas de escrita de arquivo (sem necessidade de `npm install` ou dependências). O único comando de terminal utilizado durante a criação foi para conferir se a pasta estava vazia antes de gerar os arquivos:

```bash
ls -la "C:\Users\Samara\Claude\teste-claude-code"
```

Não foi criado repositório Git nesta sessão. Caso queira versionar o projeto futuramente, os comandos básicos seriam:

```bash
git init
git add .
git commit -m "Primeiro commit: lista de tarefas"
```

## Comandos/atalhos úteis do Claude Code (para sessões futuras)

| Comando | O que faz |
|---|---|
| `/init` | Analisa o repositório e cria/atualiza um `CLAUDE.md` com contexto do projeto para o Claude usar em sessões futuras |
| `/clear` | Limpa o histórico da conversa atual, começando do zero (útil ao trocar de tarefa) |
| `/compact` | Resume a conversa atual para liberar espaço de contexto, mantendo o essencial |
| `/help` | Mostra ajuda geral sobre como usar o Claude Code |
| `/config` | Abre configurações rápidas (tema, modelo, etc.) |
| `/review` ou `code-review` | Revisa o diff atual em busca de bugs e possíveis melhorias |
| `! <comando>` | Executa um comando de terminal diretamente e traz o resultado para a conversa (ex: `! git status`) |
| `Ctrl+C` (no terminal) | Interrompe a ação atual do Claude Code |

> Esses comandos são digitados diretamente na caixa de conversa do Claude Code (ex: `/init`), não no terminal do sistema.

## Próximos passos possíveis (opcional)

- Adicionar filtro para mostrar apenas tarefas pendentes/concluídas
- Adicionar contador de tarefas restantes
- Permitir editar o texto de uma tarefa já criada

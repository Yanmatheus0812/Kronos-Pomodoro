# Kronos Pomodoro

Aplicação web de produtividade baseada na técnica Pomodoro, com foco em ciclos de trabalho/descanso, histórico de tarefas e configuração de tempos personalizados. Aplicação desenvolvida junto ao curso avançado de React do Luiz Otávio Miranda

## Funcionalidades

- Início de tarefas com cronômetro regressivo em tempo real.
- Interrupção e conclusão automática de tarefas com atualização de status.
- Ciclos automáticos de foco, descanso curto e descanso longo.
- Histórico com ordenação (tarefa, duração, data) e limpeza completa.
- Configurações personalizáveis para tempos de foco e pausas.
- Persistência em `localStorage` para manter dados entre sessões.
- Feedback visual/mensagens de ação (toasts e confirmações).

## Regras de ciclo do Kronos

- Ciclos ímpares: foco.
- Ciclos pares: descanso curto.
- A cada 8º ciclo: descanso longo.

Os tempos padrão são:

- Foco: `25` min
- Descanso curto: `5` min
- Descanso longo: `15` min

## Stack

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `date-fns`
- `react-toastify`
- `lucide-react`

## Páginas

- `/` → tela principal com cronômetro e formulário de tarefa
- `/history` → histórico de tarefas
- `/settings` → configurações dos tempos
- `/about-pomodoro` → explicação da técnica Pomodoro

## Como executar localmente

### Pré-requisitos

- Node.js (recomendado versão `20+`)
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Estrutura principal

```text
src/
  components/         # Componentes reutilizáveis (UI, formulário, contador etc.)
  contexts/           # Estado global e reducer das tarefas
  pages/              # Páginas da aplicação
  routers/            # Configuração de rotas
  templates/          # Estruturas de layout
  utils/              # Funções utilitárias
  workers/            # Web Worker para controle do timer
```

## Comportamento do timer

O cronômetro usa um Web Worker para manter a contagem regressiva desacoplada da UI. Ao finalizar uma tarefa, o app registra conclusão no histórico e toca um aviso sonoro.

## Observações

- O estado é salvo em `localStorage` com a chave `state`.
- Ao recarregar a página, não existe tarefa ativa em andamento; o app restaura o histórico e configurações salvas.

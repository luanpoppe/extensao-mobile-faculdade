# Artes Foto Bahia - Controle de Estoque

Este é um aplicativo móvel desenvolvido para o controle de estoque da empresa **Artes Foto Bahia**, especializada em fotos de porcelana para túmulos e molduras.

## 🚀 Tecnologias Utilizadas

- **React Native**: Framework para construção de interfaces nativas.
- **Expo**: Plataforma para facilitar o desenvolvimento e publicação.
- **Expo SQLite**: Banco de dados local robusto para persistência de dados.
- **Lucide React Native**: Biblioteca de ícones modernos e elegantes.
- **React Native Safe Area Context**: Gerenciamento de áreas seguras da tela.

## ✨ Funcionalidades

- **Visão Geral Dinâmica**: Cards com resumo quantitativo de Porcelanas e Molduras.
- **Banco de Dados Local**: Sincronização e persistência de dados utilizando SQLite.
- **Alertas de Estoque Baixo**: Notificações visuais quando itens atingem níveis críticos.
- **Design Moderno**: Interface elegante com paleta de cores "Deep Navy & Gold", otimizada para dispositivos móveis e web.
- **Ações Rápidas**: Atalhos para adição de itens, consulta de histórico e relatórios.

## 📁 Estrutura do Projeto

```text
src/
├── database/     # Configuração e serviços do SQLite
├── screens/      # Telas principais do aplicativo
├── theme/        # Definições de cores, espaçamentos e estilos globais
└── components/   # Componentes reutilizáveis (em desenvolvimento)
```

## 🛠️ Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

3. **Para rodar no navegador:**
   Pressione `w` no terminal ou execute:
   ```bash
   npm run web
   ```

4. **Para limpar o cache (recomendado após novas instalações):**
   ```bash
   npx expo start --clear
   ```

## 🎨 Design System

O projeto utiliza um sistema de design personalizado definido em `src/theme/theme.ts`, garantindo consistência visual em toda a aplicação.

- **Primária:** #1A2A3A (Navy)
- **Destaque:** #D4AF37 (Dourado)
- **Fundo:** #F8F9FA (Cinza Claro)

---
Desenvolvido como projeto de extensão para a empresa Artes Foto Bahia.

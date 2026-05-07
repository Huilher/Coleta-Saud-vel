# Coleta-Saudável
# EcoRecicla: Jogo Interativo de Reciclagem
    Sobre o Projeto
O **EcoRecicla** é um jogo educativo desenvolvido para conscientizar sobre a separação correta de resíduos. Através de uma mecânica de *drag-and-drop* (arrastar e soltar), o jogador deve destinar diferentes tipos de lixo para as suas respectivas lixeiras (vidro, papel, plástico, metal, orgânico e não reciclável).

Este projeto foi concebido para o meu portfólio técnico, demonstrando habilidades em desenvolvimento web front-end e lógica de programação avançada com JavaScript puro (Vanilla JS).

    Tecnologias Utilizadas
- **HTML5:** Estrutura semântica das fases e elementos de interface (HUD).
- **CSS3:** Estilização visual, layouts posicionados e animações de feedback (efeitos de piscar).
- **JavaScript (ES6+):** Lógica de manipulação do DOM, sistema de detecção de colisão (AABB), gerenciamento de estados (vidas/tempo), mecânica de arrastar e lógica de progressão entre níveis.

      Funcionalidades
- **Mecânica de Drag-and-Drop:** Interação intuitiva para movimentação dos resíduos.
- **Progressão de Níveis:** Sistema que redireciona automaticamente o jogador da Fase 1 para a Fase 2 após a conclusão com sucesso.
- **Interface HUD:** Exibição dinâmica de vidas (ícones de coração) e cronômetro regressivo.
- **Feedback em Tempo Real:** Ícones visuais de acerto (L) e erro (X) que auxiliam na curva de aprendizado do jogador.
- **Controle de Jogo:** Sistema de pausa/play funcional que interrompe tanto o cronômetro quanto as interações.
- **Geração Aleatória:** Os itens de lixo "renascem" em posições randômicas a cada partida, aumentando o fator de desafio.

      Estrutura do Projeto
- `fase1.html` / `fase2.html`: Estrutura das fases.
- `estilo-fase1.css` / `estilo-fase2.css`: Estilização dos cenários e elementos visuais.
- `script-fase1.js` / `script-fase2.js`: Motores de lógica e eventos do jogo.

      Como Executar
1. Clone este repositório ou baixe os arquivos fonte.
2. Certifique-se de que os assets de imagem (cenários, ícones de lixo, corações) estejam no mesmo diretório.
3. Abra o arquivo `fase1.html` em qualquer navegador moderno.

Autores
Bismarc Oliveira Carvalho, Eric Gravatá Silva, Guilherme Nogueira Carvalho, Guilherme Tell Castro Matos

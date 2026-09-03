# Perfis de costureiras e ateliês

## Objetivo
Ao tocar em qualquer resultado da tela inicial, abrir uma página de perfil longa e rolável, seguindo a composição dos dois prints enviados.

## Implementação
- Transformar os cards de resultados em links para perfis individuais de costureiras e ateliês.
- Criar rotas de perfil para os dois tipos, preenchidas com os dados de cada resultado atual.
- Reproduzir o topo do print: voltar, favoritar, capa visual, nome, selo de verificação, avaliação, quantidade de avaliações e faixa de preço.
- Reproduzir o conteúdo inferior: “Sobre”, “Formação e Aprendizado”, serviços oferecidos, portfólio e local de atendimento com mapa ilustrativo.
- Manter no rodapé uma ação fixa “Entrar em Contato” e a navegação principal, sem cobrir o conteúdo rolável.
- Adaptar textos, serviços, preços, bairro e portfólio ao perfil selecionado, preservando o mesmo padrão visual.
- Garantir responsividade móvel e desktop, estados interativos de favorito/contato e metadados próprios nas novas rotas.

## Detalhes técnicos
- Usar rotas dinâmicas TanStack com navegação tipada por `Link`.
- Compartilhar a interface em um componente de perfil para evitar duplicação entre costureiras e ateliês.
- Manter cores e superfícies nos tokens semânticos do design system existente.
- Validar navegação, scroll, layout móvel e build após as alterações.

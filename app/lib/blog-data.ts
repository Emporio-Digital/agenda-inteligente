// app/lib/blog-data.ts

export const blogPosts: Record<string, { 
    id: number;
    title: string; 
    excerpt: string;
    date: string; 
    category: string; 
    timeToRead: string; 
    content: string;
    keywords: string[]; // O Segredo do SEO
  }> = {
    "sistema-para-restaurante": {
      id: 1,
      title: "Sistema para Restaurantes: Por que focar em Reservas vale mais que Delivery?",
      excerpt: "Sua casa cheia vale mais que 10 motoboys. Entenda como o Kairós organiza suas mesas e acaba com a fila de espera.",
      date: "08 FEV 2026",
      category: "Restaurantes",
      timeToRead: "4 min de leitura",
      // AQUI ESTÃO AS PALAVRAS-CHAVE QUE VOCÊ PEDIU
      keywords: ["sistema de agendamento", "reservas online", "restaurante", "bistrô", "gestão de mesas", "delivery vs salão"],
      content: `
        <p class="lead">Todo dono de restaurante sabe: o aplicativo de entrega traz volume, mas leva 30% do seu lucro. O dinheiro de verdade está nas mesas do seu salão.</p>
        <p>Muitos gestores confundem o <strong>Kairós</strong> com apps de delivery. Vamos esclarecer isso agora: Nós somos especialistas em lotar a sua casa física.</p>
        <h2>O Problema Invisível: A Fila de Espera Desorganizada</h2>
        <p>Sexta-feira à noite. Seu restaurante está bombando. Chega um grupo de 6 pessoas e você diz: "Tem uma espera de 40 minutos".</p>
        <p>O que acontece? Eles vão embora para o concorrente. Com nosso sistema de <strong>Reservas Inteligentes</strong>, o cliente garante a mesa dele pelo WhatsApp.</p>
        <h2>Delivery vs Experiência no Salão</h2>
        <p>Enquanto o delivery transforma sua comida em commodity, a experiência no salão fideliza. O Kairós permite organizar setores, garçons e histórico do cliente.</p>
        <h3>Conclusão</h3>
        <p>Pare de depender 100% de plataformas. Traga o cliente para dentro da sua casa e organize suas reservas com o Kairós.</p>
      `
    },
    "como-lotar-agenda-barbearia": {
      id: 2,
      title: "Como transformar o Instagram da sua Barbearia ou Studio em uma Máquina de Agendamentos",
      excerpt: "Descubra como o Link na Bio pode transformar seguidores em clientes fiéis em menos de 24 horas.",
      date: "05 FEV 2026",
      category: "Marketing",
      timeToRead: "5 min de leitura",
      // COBRINDO BARBEARIA, TATTOO E FOTOGRAFIA AQUI
      keywords: ["agendamento barbearia", "agenda studio tattoo", "fotografia", "agenda fotógrafo", "link na bio", "agendamento instagram", "agenda rápida online"],
      content: `
        <p class="lead">Você posta o corte do dia ou a tattoo nova, o cliente comenta "brabo demais 🔥", mas a cadeira continua vazia. O erro número 1 é dificultar o agendamento.</p>
        <h2>1. O Poder do Link na Bio para Barbearias, Tatuadores e Fotógrafos</h2>
        <p>O "Link na Bio" é o seu recepcionista 24 horas. Com o <strong>Kairós</strong>, você gera um link personalizado que serve para <strong>Barbearias, Studios de Tattoo, Salões e até Fotógrafos</strong>.</p>
        <p>O cliente clica, vê os horários livres REAIS e agenda. Sem trocar 10 mensagens no WhatsApp.</p>
        <h2>2. Acabando com o "E aí, tem horário pra hoje?"</h2>
        <p>A resposta automática deve ser o seu link oficial. Isso educa o cliente e libera você para trabalhar, seja tatuando ou cortando cabelo.</p>
      `
    },
    "planilha-vs-sistema": {
      id: 3,
      title: "Planilha vs Sistema de Agendamento: Onde você está perdendo dinheiro?",
      excerpt: "Você ainda perde tempo no Excel? Veja quanto dinheiro você deixa na mesa por não automatizar sua clínica ou escritório.",
      date: "01 FEV 2026",
      category: "Gestão",
      timeToRead: "3 min de leitura",
      // COBRINDO CLÍNICA, ESCRITÓRIO E SALÃO
      keywords: ["planilha agendamento", "sistema de gestão", "agenda online clínica", "escritório", "coworking", "automatização whatsapp", "agenda inteligente"],
      content: `
        <p class="lead">"Pra que pagar sistema se eu tenho o caderno?" Essa é a frase mais cara que um empreendedor pode dizer.</p>
        <h2>1. A Falha Humana em Clínicas e Escritórios</h2>
        <p>No caderno, você anota dois clientes no mesmo horário. No <strong>Kairós</strong>, o sistema bloqueia automaticamente. Zero conflito, ideal para dentistas, psicólogos, advogados e escritórios compartilhados.</p>
        <h2>2. O Lembrete Automático (O Matador de No-Show)</h2>
        <p>Quando o cliente recebe um lembrete automático no WhatsApp, a chance dele faltar cai em 90%.</p>
        <h3>Veredito</h3>
        <p>Planilha é para amadores. Sistemas são para profissionais que querem escalar.</p>
      `
    }
  };
  
  // Funções auxiliares para pegar os dados
  export const getPosts = () => Object.entries(blogPosts).map(([slug, post]) => ({ ...post, slug }));
  export const getPostBySlug = (slug: string) => blogPosts[slug];
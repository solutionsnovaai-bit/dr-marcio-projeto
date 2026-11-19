export const COMPANY = {
  name: 'Dr. Márcio Cesar da Silva',
  short: 'Dr. Márcio',
  crm: 'CRM 9177',
  whatsapp: '5511951007967',
  instagram: 'https://www.instagram.com/dr_marcio_cesar_da_silva/',
  instagramHandle: '@dr_marcio_cesar_da_silva',
  address: 'R. Dr. Próspero Cecílio Coimbra, 80 — Jardim São Gabriel, Marília/SP',
}

export const whatsappMessage = 'Olá! Vi a proposta e quero conversar.'

export const chapters = [
  { image: 'mercedes', category: 'Os carros', title: 'O carro certo merece ser visto.', text: 'Fotos tratadas e texto que vende transformam um anúncio comum em vitrine.', alt: 'Carro preto em uma garagem contemporânea' },
  { image: 'casa', category: 'A medicina', title: 'O seu tempo vale mais no centro cirúrgico.', text: 'Responder mensagem, confirmar horário e postar conteúdo não precisa ser tarefa sua.', alt: 'Médico conversando com a equipe no centro cirúrgico' },
  { image: 'viagem', category: 'Consultório', title: 'Agenda organizada sozinha.', text: 'A IA tira dúvidas, agenda e confirma consultas pelo WhatsApp, 24h por dia.', alt: 'Consultório com raio-X do quadril no monitor' },
  { image: 'iate', category: 'Pacientes', title: 'Quem sente dor procura no celular.', text: 'Conteúdo diário coloca o seu nome na frente de quem precisa de um ortopedista.', alt: 'Pessoa sentada com as mãos no joelho' },
  { image: 'chaves', category: 'Autoridade', title: 'Conteúdo que mostra quem sabe.', text: 'Coluna, joelho, ombro: explicações simples que geram confiança e consulta.', alt: 'Modelo anatômico da coluna lombar' },
  { image: 'bmw', category: 'Os carros', title: 'Anúncio parado não vende.', text: 'Renovação semanal mantém o estoque no topo do Marketplace.', alt: 'Detalhe do farol de um carro ao anoitecer' },
  { image: 'veleiro', category: 'Constância', title: 'Presença todos os dias.', text: 'Post diário no Instagram e no Facebook, sem o senhor parar para pensar nisso.', alt: 'Exercício de reabilitação com faixa elástica' },
  { image: 'destinos', category: 'Atendimento', title: 'Ninguém fica sem resposta.', text: 'Comprador ou paciente, a resposta chega em segundos, a qualquer hora.', alt: 'Pessoa com a mão no ombro' },
  { image: 'jetski', category: 'Uma só estrutura', title: 'Uma IA. Todas as frentes.', text: 'O que vende os carros também enche a agenda. A tecnologia é a mesma.', alt: 'Modelo anatômico do joelho' },
]

export const processSteps = [
  { title: 'Organizamos o estoque.', label: 'Primeiro, os seus carros.', text: 'Recebemos as fotos e as informações de cada veículo e organizamos tudo para que nenhum anúncio saia incompleto.', points: ['Fotos tratadas e padronizadas', 'Ficha completa de cada carro', 'Preço e condições definidos com você'] },
  { title: 'Criamos os anúncios.', label: 'Texto que vende.', text: 'Cada carro ganha título, descrição e destaques pensados para chamar atenção e gerar contato de quem realmente quer comprar.', points: ['Títulos e descrições estratégicas', 'Destaques de cada modelo', 'Padrão visual profissional'] },
  { title: 'Publicamos onde o comprador está.', label: 'Facebook, Marketplace e Instagram.', text: 'Os anúncios entram no ar nas principais vitrines do Meta, com os contatos direcionados para o seu WhatsApp.', points: ['Facebook e Marketplace', 'Instagram', 'Contato direto pelo WhatsApp'] },
  { title: 'Acompanhamos e renovamos.', label: 'Anúncio parado não vende.', text: 'Nos planos mensais, os anúncios são renovados e o perfil recebe conteúdo novo para manter os carros sempre em evidência.', points: ['Renovação ao longo do mês', 'Conteúdo e edição de vídeos', 'Atendimento 24h com IA no plano Secretária IA'] },
]

export const plans = [
  { name: 'Anúncios', tag: 'PACOTE ÚNICO', price: 'R$ 500', note: '50 carros · R$ 10 por anúncio', text: 'Seu estoque no ar, com padrão profissional.', points: ['50 anúncios criados e publicados', 'Facebook, Marketplace e Instagram', 'Contatos direto no seu WhatsApp', 'Abaixo de 50 carros: R$ 13 (30+), R$ 15 (15+) ou R$ 20 por anúncio'], featured: false },
  { name: 'Presença Digital', tag: 'MAIS ESCOLHIDO', price: 'R$ 800', note: 'por mês', text: 'Carros girando e o seu nome em evidência, todo dia.', points: ['Os 50 anúncios inclusos no 1º mês', 'Anúncios renovados toda semana', 'Carro novo no estoque entra sem custo', 'Post todo dia no Instagram e no Facebook', 'Conteúdo para a sua atuação médica também'], featured: true },
  { name: 'Secretária IA', tag: 'PARCERIA COMPLETA', price: 'R$ 1.200', note: 'por mês', text: 'Tudo do Presença Digital + uma secretária de IA trabalhando 24h.', points: ['Atende interessados nos carros em segundos', 'Envia fotos, preço e ficha, e agenda visitas', 'Também pode cuidar do consultório: dúvidas, agenda e confirmação de consultas', 'Automações sob medida para onde você atuar', 'Você só entra para fechar ou atender'], featured: false },
]

export const faqs = [
  { question: 'Onde os anúncios são publicados?', answer: 'No Facebook (incluindo o Marketplace) e no Instagram, as vitrines onde está a maior parte dos compradores de carros da região. Os contatos são direcionados para o seu WhatsApp.' },
  { question: 'O que eu preciso enviar?', answer: 'As fotos de cada carro e as informações básicas: modelo, ano, quilometragem, opcionais e preço. A partir disso, cuidamos da organização, dos textos e da publicação.' },
  { question: 'O pacote de 50 anúncios tem mensalidade?', answer: 'Não. O pacote de anúncios é um serviço único: R$ 10 por carro, R$ 500 pelos 50. Nos planos mensais, os 50 anúncios já estão inclusos no primeiro mês, e a renovação semanal também.' },
  { question: 'Como funciona a secretária de IA?', answer: 'É uma assistente que atende pelo WhatsApp a qualquer hora: responde dúvidas, envia informações e fotos dos carros, qualifica quem está interessado e organiza as visitas. Você recebe o cliente pronto para negociar.' },
  { question: 'Serve só para os carros?', answer: 'Não. A mesma estrutura de conteúdo, atendimento com IA e automações funciona para o consultório: dúvidas de pacientes, agendamento e confirmação de consultas. Os carros são o ponto de partida.' },
  { question: 'Em quanto tempo os anúncios entram no ar?', answer: 'Assim que as fotos e as informações chegam, os primeiros anúncios já começam a ser publicados. O prazo total depende da quantidade de carros e do material enviado.' },
]

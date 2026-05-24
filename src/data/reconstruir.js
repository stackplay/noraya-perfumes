const fs = require('fs');

function reconstruirArquivo() {
    console.log('🔧 RECONSTRUINDO ESTRUTURA DO CONTENT.JS...\n');
    
    // Estrutura base do arquivo
    const estruturaBase = `// =============================================================
// NORAYA — Conteúdo do site (PORTUGUÊS BRASIL)
// =============================================================

export const brand = {
  name: "NORAYA",
  tagline: "PERFUMES ÁRABES",
  logo: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/dqwqzxom_ChatGPT%20Image%2012_05_2026%2C%2019_31_54.png",
  instagram: "@noraya.perfumes",
};

export const nav = [
  { label: "VER TUDO", href: "#tudo" },
  { label: "NOVIDADES", href: "#novidades" },
  { label: "MAIS VENDIDOS", href: "#mais-vendidos" },
  { label: "PARA ELA", href: "#femininos" },
  { label: "PARA ELE", href: "#masculinos" },
  { label: "UNISSEX", href: "#tudo" },
];

export const hero = {
  kicker: "LANÇAMENTOS",
  titleLine1: "Asad",
  titleItalic: "Lattafa",
  description: "Sinta o poder. Notas amadeiradas, especiarias intensas e um rastro marcante que dura até 12 horas.",
  cta: "Comprar",
  background: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/ielqruif_ChatGPT%20Image%2012_05_2026%2C%2020_47_33.png",
};

export const bestSellers = {
  kicker: "ESSENCIAIS",
  titleLine1: "Mais",
  titleItalic: "vendidos",
  cta: "Comprar tudo",
  products: [
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/s516drc8_WhatsApp%20Image%202026-05-14%20at%2000.40.49.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/8549u3dz_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2818%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/zu2068bg_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2817%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/9qr12hr0_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2816%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/h4kkvoxu_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2815%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/ykifu7re_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2814%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/l6dni0ja_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2813%29.jpeg" },
    { image: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/nakvuko6_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2812%29.jpeg" },
  ],
};

export const banner = {
  kicker: "FRAGRÂNCIAS INTENSAS",
  titleLine1: "Para",
  titleItalic: "marcar",
  titleLine2: "presença",
  description: "Composições com âmbar, oud e baunilha. Inspiradas no Oriente Médio para criar memórias inesquecíveis.",
  cta: "Comprar",
  image: "/images/decant10.png",
};

export const feminine = {
  kicker: "ELEGÂNCIA",
  titleLine1: "Para",
  titleItalic: "Ela",
  description: "Fragrâncias delicadas e envolventes para momentos especiais.",
  products: [
    { id: 0, name: "Lattafa Yara Rosa 100ml", price: "31,51 €", oldPrice: "35,01 €", discount: "10%", image: "/images/Yara_Rosa_1.png", hoverImage: "/images/Yara_Rosa_2.png", brandLogo: "/images/logolattafa.png", tagline: "Abertura enérgica e vibrante", fullDescription: "YARA Lattafa Rosa Eau de Parfum.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2023", inspiration: "Fragrância original Lattafa", notes: { topo: "Orquídea, Heliotrópio, Tangerina", coracao: "Acorde Gourmand, Frutas tropicais", base: "Baunilha, Almíscar, Sândalo" }, sizes: [{ size: "3ml", price: 0.95 }, { size: "5ml", price: 1.58 }, { size: "100ml", price: 31.51 }], sku: "6291108735450", ean: "6291108735450", rating: 5, reviews: 3 },
    { id: 1, name: "Lattafa Yara Rosa 50ml", price: "11,25 €", oldPrice: "12,50 €", discount: "10%", image: "/images/Yara_50ml_1.png", hoverImage: "/images/Yara_50ml_1.png", brandLogo: "/images/logolattafa.png", tagline: "Versão de 50ml", fullDescription: "YARA Lattafa Rosa 50ml.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2023", inspiration: "Fragrância original Lattafa", notes: { topo: "Orquídea, Heliotrópio, Tangerina", coracao: "Acorde Gourmand, Frutas tropicais", base: "Baunilha, Almíscar, Sândalo" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "50ml", price: 11.25 }], sku: "6291108735462", ean: "6291108735462", rating: 0, reviews: 0 },
    { id: 2, name: "Lattafa Nebras Unissex 100ml", price: "35,67 €", oldPrice: "39,63 €", discount: "10%", image: "/images/Lattafa_Nebras_1.png", hoverImage: "/images/Lattafa_Nebras_2.png", brandLogo: "/images/logolattafa.png", tagline: "Obra-prima olfativa", fullDescription: "Lattafa Pride Nebras Eau de Parfum.", fragranceType: "Oriental Gourmand", bestFor: "Homens e mulheres", launchYear: "2022", inspiration: "Fragrância original Lattafa", notes: { topo: "Bagas vermelhas, Tangerina", coracao: "Baunilha, Raiz do cacau, Rosa", base: "Cumaru, Âmbar, Almíscar, Açúcar" }, sizes: [{ size: "3ml", price: 1.07 }, { size: "5ml", price: 1.78 }, { size: "100ml", price: 35.67 }], sku: "6291108735435", ean: "6291108735435", rating: 0, reviews: 0 },
    { id: 3, name: "Lattafa Opulent Dubai 100ml", price: "4,49 €", oldPrice: "4,99 €", discount: "10%", image: "/images/Lattafa_Opulent_Dubai_1.png", hoverImage: "/images/Lattafa_Opulent_Dubai_2.png", brandLogo: "/images/logolattafa.png", tagline: "Luxo e sofisticação", fullDescription: "Lattafa Opulent Dubai.", fragranceType: "Oriental Floral Gourmand", bestFor: "Ocasiões especiais", launchYear: "2025", inspiration: "Fragrância original Lattafa", notes: { topo: "Bergamota, Tangerina, Pêssego", coracao: "Jasmim, Rosa, Açafrão, Chocolate Dubai", base: "Âmbar, Oud, Baunilha" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "100ml", price: 4.49 }], sku: "6291108735452", ean: "6291108735452", rating: 5, reviews: 3 },
    { id: 4, name: "Lattafa Eclaire 100ml", price: "42,64 €", oldPrice: "47,38 €", discount: "10%", image: "/images/Lattafa_Eclaire_1.png", hoverImage: "/images/Lattafa_Eclaire_2.png", brandLogo: "/images/logolattafa.png", tagline: "Doçura envolvente", fullDescription: "Eclaire Lattafa.", fragranceType: "Gourmand", bestFor: "Uso diário", launchYear: "2024", inspiration: "Dupe de Bianco Latte", notes: { topo: "Caramelo, Açúcar, Leite", coracao: "Mel, Flores brancas", base: "Baunilha, Praliné, Almíscar" }, sizes: [{ size: "3ml", price: 1.28 }, { size: "5ml", price: 2.13 }, { size: "100ml", price: 42.64 }], sku: "6291108735453", ean: "6291108735453", rating: 5, reviews: 1 },
    { id: 5, name: "Lattafa Qimmah 100ml", price: "31,51 €", oldPrice: "35,01 €", discount: "10%", image: "/images/Qimmah_1.png", hoverImage: "/images/Qimmah_2.png", brandLogo: "/images/logolattafa.png", tagline: "A essência da sensualidade", fullDescription: "Lattafa Qimmah.", fragranceType: "Oriental Gourmand", bestFor: "Ocasiões especiais", launchYear: "2024", inspiration: "Fragrância original Lattafa", notes: { topo: "Amêndoas, Café", coracao: "Jasmim, Tuberosa, Fava Tonka", base: "Cacau, Baunilha, Sândalo" }, sizes: [{ size: "3ml", price: 0.95 }, { size: "5ml", price: 1.58 }, { size: "100ml", price: 31.51 }], sku: "6291108735463", ean: "6291108735463", rating: 5, reviews: 1 },
    { id: 6, name: "Lattafa Yara Elixir 100ml", price: "35,01 €", oldPrice: "45,00 €", image: "/images/Yara_Elixir_2.png", hoverImage: "/images/Yara_Elixir_2.png", brandLogo: "/images/logolattafa.png", tagline: "Elixir da feminilidade moderna", fullDescription: "Lattafa Yara Elixir.", fragranceType: "Frutada Gourmand", bestFor: "Todas as estações", launchYear: "2024", inspiration: "Fragrância original Lattafa", notes: { topo: "S'more, Morango, Groselha Negra", coracao: "Jasmim, Flor de Laranjeira", base: "Âmbar, Caramelo, Baunilha, Almíscar" }, sizes: [{ size: "3ml", price: 1.05 }, { size: "5ml", price: 1.75 }, { size: "100ml", price: 35.01 }], sku: "6291108735464", ean: "6291108735464", rating: 5, reviews: 1 },
    { id: 7, name: "Lattafa Bayaan 100ml", price: "29,62 €", oldPrice: "32,91 €", discount: "10%", image: "/images/Bayaan_1.png", hoverImage: "/images/Bayaan_2.png", brandLogo: "/images/logolattafa.png", tagline: "Frescura frutada com toque oriental", fullDescription: "BAYAAN de LATTAFA.", fragranceType: "Frutal Oriental", bestFor: "Qualquer ocasião", launchYear: "2024", inspiration: "Fragrância original Lattafa", notes: { topo: "Cassis, Lichia, Canela, Pimenta Rosa", coracao: "Praliné, Rosa, Cardamomo", base: "Musgo, Baunilha, Oud" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "100ml", price: 29.62 }], sku: "6291108735465", ean: "6291108735465", rating: 0, reviews: 0 }
  ]
};

export const masculine = {
  kicker: "PARA ELE",
  titleLine1: "Para",
  titleItalic: "ele",
  description: "Fragrâncias masculinas com presença marcante. Madeira, especiarias e couro.",
  products: [
    { id: 0, name: "Lattafa The Kingdom Man 100ml", price: "41,92 €", image: "/images/Lattafa - The Kingdom (For Men).png", hoverImage: "/images/Lattafa - The Kingdom (For Men).png", brandLogo: "/images/logolattafa.png", tagline: "A elegância do Oriente Médio", fullDescription: "Descubra a essência da elegância e sofisticação com o The Kingdom EDP Spray for Men da Lattafa.", fragranceType: "Amber Fougere", bestFor: "Uso diário", launchYear: "2024", inspiration: "Fragrância original Lattafa", notes: { topo: "Sálvia, Lavanda, Menta", coracao: "Tabaco, Baunilha, Flor de Laranjeira", base: "Benjoim, Fava Tonka, Ládano" }, sizes: [{ size: "3ml", price: 1.26 }, { size: "5ml", price: 2.10 }, { size: "100ml", price: 41.92 }], sku: "6291108735428", ean: "6291108735428", rating: 4, reviews: 3 },
    { id: 1, name: "French Avenue Spectre Ghost 80ml", price: "54,05 €", image: "/images/French Avenue - Spectre Ghost.png", hoverImage: "/images/French Avenue - Spectre Ghost.png", brandLogo: null, tagline: "Intensidade e Elegância", fullDescription: "French Avenue Spectre Ghost Eau de Parfum Masculino.", fragranceType: "Oriental Amadeirado", bestFor: "Uso diário", launchYear: "2024", inspiration: "Fragrância original", notes: { topo: "Bergamota, Gengibre, Cardamomo", coracao: "Rosa, Groselha Negra, Pimenta Rosa", base: "Patchouli, Madeira de Cedro, Baunilha" }, sizes: [{ size: "3ml", price: 1.62 }, { size: "5ml", price: 2.70 }, { size: "80ml", price: 54.05 }], sku: "6291108735429", ean: "6291108735429", rating: 5, reviews: 1 },
    { id: 2, name: "Lattafa Khamrah 100ml", price: "45,17 €", image: "/images/Lattafa - Khamrah.png", hoverImage: "/images/Lattafa - Khamrah.png", brandLogo: "/images/logolattafa.png", tagline: "O fascínio oriental", fullDescription: "Desvende a essência do fascínio oriental com LATTAFA Khamrah EDP.", fragranceType: "Aromática Picante", bestFor: "Uso diurno", launchYear: "2022", inspiration: "Fragrância original", notes: { topo: "Canela, Noz-moscada, Bergamota", coracao: "Tâmaras, Praliné, Tuberosa, Mahonial", base: "Baunilha, Fava Tonka, Benjoim, Mirra, Âmbar, Akigalawood" }, sizes: [{ size: "3ml", price: 1.36 }, { size: "5ml", price: 2.26 }, { size: "100ml", price: 45.17 }], sku: "6291108735430", ean: "6291108735430", rating: 0, reviews: 0 },
    { id: 3, name: "Lattafa Asad Zanzibar 100ml", price: "27,06 €", image: "/images/Lattafa - Asad Zanzibar.png", hoverImage: "/images/Lattafa - Asad Zanzibar.png", brandLogo: "/images/logolattafa.png", tagline: "Exótico e sofisticado", fullDescription: "Lattafa Asad ZANZIBAR Man 100ml.", fragranceType: "Fresca Amadeirada", bestFor: "Dias quentes", launchYear: "2024", inspiration: "Semelhante a 40 Knots", notes: { topo: "Lavanda, Pimenta Preta", coracao: "Água de Coco, Íris, Sal", base: "Baunilha, Incenso" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "100ml", price: 27.06 }], sku: "6291108735431", ean: "6291108735431", rating: 5, reviews: 1 },
    { id: 4, name: "Lattafa Asad Man 100ml", price: "32,90 €", image: "/images/Lattafa - Asad.png", hoverImage: "/images/Lattafa - Asad.png", brandLogo: "/images/logolattafa.png", tagline: "Revele a sua força", fullDescription: "Lattafa Asad Man Eau de Parfum 100ml.", fragranceType: "Gourmet Picante", bestFor: "Tempo frio", launchYear: "2021", inspiration: "Inspirado em Sauvage Elixir", notes: { topo: "Pimenta Negra, Tabaco, Abacaxi", coracao: "Patchouli, Café, Íris", base: "Baunilha, Âmbar, Madeira seca, Benjoim, Ládano" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "100ml", price: 32.90 }], sku: "6291108735411", ean: "6291108735411", rating: 4, reviews: 9 },
    { id: 5, name: "Lattafa Asad Bourbon 100ml", price: "37,12 €", image: "/images/Lattafa - Asad Bourbon.png", hoverImage: "/images/Lattafa - Asad Bourbon.png", brandLogo: "/images/logolattafa.png", tagline: "Intensidade e sofisticação", fullDescription: "Lattafa Asad Bourbon – Perfume Masculino 100ml.", fragranceType: "Amadeirado Gourmand", bestFor: "Noites especiais", launchYear: "2024", inspiration: "Edição premium", notes: { topo: "Canela, Pimenta Preta, Tabaco", coracao: "Baunilha, Oud, Âmbar", base: "Fava Tonka, Couro, Patchouli" }, sizes: [{ size: "3ml", price: 1.11 }, { size: "5ml", price: 1.86 }, { size: "100ml", price: 37.12 }], sku: "6290362340362", ean: "6290362340362", rating: 5, reviews: 7 },
    { id: 6, name: "Armaf Club de Nuit Intense Man", price: "49,90 €", image: "/images/Armaf - Club de Nuit Intense Man.png", hoverImage: "/images/Armaf - Club de Nuit Intense Man.png", brandLogo: null, tagline: "O clássico moderno", fullDescription: "Armaf Club de Nuit Intense Man.", fragranceType: "Cítrico Amadeirado", bestFor: "Uso diário", launchYear: "2015", inspiration: "Inspirado em Creed Aventus", notes: { topo: "Limão, Maçã Verde, Bergamota", coracao: "Jasmin, Rosa, Pimenta", base: "Âmbar, Patchouli, Musgo, Baunilha" }, sizes: [{ size: "3ml", price: 1.50 }, { size: "5ml", price: 2.50 }, { size: "105ml", price: 49.90 }], sku: "6291108735432", ean: "6291108735432", rating: 5, reviews: 12 },
    { id: 7, name: "Fakhar Black", price: "29,90 €", image: "/images/Fakhar_Black.png", hoverImage: "/images/Fakhar_Black1.png", brandLogo: "/images/logolattafa.png", tagline: "Elegância contemporânea", fullDescription: "Fakhar Black.", fragranceType: "Aromático Fougere", bestFor: "Uso diário", launchYear: "2020", inspiration: "Inspirado em YSL Y", notes: { topo: "Gengibre, Maçã, Bergamota", coracao: "Lavanda, Gerânio, Sálvia", base: "Cedro, Âmbar, Patchouli" }, sizes: [{ size: "3ml", price: 0.99 }, { size: "5ml", price: 1.65 }, { size: "100ml", price: 29.90 }], sku: "6291108735433", ean: "6291108735433", rating: 4, reviews: 15 }
  ]
};

export const trends = {
  kicker: "NÃO FIQUE SEM",
  titleLine1: "Últimas",
  titleItalic: "tendências",
  products: []
};

export const follow = {
  kicker: "Siga-nos",
  handle: "@noraya.perfumes",
  gallery: [
    "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/s516drc8_WhatsApp%20Image%202026-05-14%20at%2000.40.49.jpeg",
    "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/8549u3dz_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2818%29.jpeg",
    "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/zu2068bg_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2817%29.jpeg",
    "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/9qr12hr0_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2816%29.jpeg",
    "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/h4kkvoxu_WhatsApp%20Image%202026-05-14%20at%2000.40.49%20%2815%29.jpeg"
  ]
};

export const newsletter = {
  titleLine1: "Você está",
  titleItalic: "na lista?",
  description: "Receba lançamentos, ofertas exclusivas e novidades sobre as fragrâncias árabes mais desejadas.",
  placeholder: "Seu melhor e-mail",
  cta: "Inscrever"
};

export const footer = {
  columns: [
    { title: "LOJA", links: ["Ver tudo", "Novidades", "Mais vendidos", "Para Ela", "Para Ele"] },
    { title: "AJUDA", links: ["Frete e entrega", "Trocas e devoluções", "FAQ", "Fale conosco"] },
    { title: "INSTITUCIONAL", links: ["Sobre a Noraya", "Política de privacidade", "Termos de uso"] }
  ],
  copyright: "© 2026 NORAYA — Perfumes Árabes. Todos os direitos reservados."
};
`;

    fs.writeFileSync('content.js', estruturaBase);
    console.log('✅ content.js reconstruído com sucesso!');
}

reconstruirArquivo();

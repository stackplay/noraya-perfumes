// =============================================================
// NORAYA BR — Conteúdo do site (BRASIL) - PREÇOS EM REAIS
// =============================================================

export const brand = {
  name: "NORAYA BR",
  tagline: "PERFUMES ÁRABES",
  logo: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/dqwqzxom_ChatGPT%20Image%2012_05_2026%2C%2019_31_54.png",
  instagram: "NorayaOud",
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
  titleLine1: "Noraya",
  titleItalic: "Brasil",
  description: "Fragrâncias exclusivas com preços especiais para o mercado brasileiro.",
  cta: "Comprar",
  background: "https://customer-assets.emergentagent.com/job_content-builder-115/artifacts/ielqruif_ChatGPT%20Image%2012_05_2026%2C%2020_47_33.png",
};

export const bestSellers = {
  kicker: "ESSENCIAIS",
  titleLine1: "Mais",
  titleItalic: "vendidos",
  cta: "Comprar tudo",
  products: [
    { name: "Fakhar Black", image: "/images/Fakhar_Black.png", price: "R$ 359" },
    { name: "Asad Bourbon", image: "/images/Lattafa - Asad Bourbon.png", price: "R$ 359" },
    { name: "Club Intense", image: "/images/Armaf - Club de Nuit Intense Man.png", price: "R$ 429" },
    { name: "Yara Rosa", image: "/images/Yara_Rosa_1.png", price: "R$ 279" },
    { name: "9PM", image: "/images/Afnan_9PM_1.png", price: "R$ 449" },
    { name: "Teriaq Intense", image: "/images/Teriaq_Intense_1.png", price: "R$ 379" },
    { name: "Ansaam Gold", image: "/images/Ansaam_Gold_1.png", price: "R$ 459" },
    { name: "Hawas For Him", image: "/images/Hawas_For_Him.png", price: "R$ 369" }
  ]
};

export const banner = {
  kicker: "FRAGRÂNCIAS INTENSAS",
  titleLine1: "Para",
  titleItalic: "marcar",
  titleLine2: "presença",
  description: "Composições com âmbar, oud e baunilha. Inspiradas no Oriente Médio.",
  cta: "Comprar",
  image: "/images/decant10.png",
};

export const feminine = {
  kicker: "ELEGÂNCIA",
  titleLine1: "Para",
  titleItalic: "Ela",
  description: "Fragrâncias delicadas e envolventes para momentos especiais.",
  products: [
    { id: 0, name: "Sabah Sugar", price: "R$ 289", image: "/images/Sabah_Sugar_1.png", hoverImage: "/images/Sabah_Sugar_2.png", brandLogo: "/images/logolattafa.png", tagline: "Doçura oriental", fullDescription: "Sabah Sugar - Uma fragrância doce e envolvente.", fragranceType: "Gourmand", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Açúcar, Bergamota", coracao: "Baunilha, Jasmim", base: "Almíscar, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 1, name: "Sabah Valentine", price: "R$ 349", image: "/images/Sabah_Valentine_1.png", hoverImage: "/images/Sabah_Valentine_2.png", brandLogo: "/images/logolattafa.png", tagline: "Romance em forma de perfume", fullDescription: "Sabah Valentine - Perfeito para momentos românticos.", fragranceType: "Floral", bestFor: "Encontros", launchYear: "2024", notes: { topo: "Rosa, Framboesa", coracao: "Jasmim, Peônia", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 349 }] },
    { id: 2, name: "Cleopatra", price: "R$ 399", image: "/images/Cleopatra_1.png", hoverImage: "/images/Cleopatra_2.png", brandLogo: "/images/logolattafa.png", tagline: "A rainha do Egito", fullDescription: "Cleopatra - Uma fragrância real e marcante.", fragranceType: "Oriental Floral", bestFor: "Ocasiões especiais", launchYear: "2024", notes: { topo: "Bergamota, Pêssego", coracao: "Rosa, Jasmim, Íris", base: "Oud, Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 399 }] },
    { id: 3, name: "L'Aventure Grapefruit", price: "R$ 349", image: "/images/LAventure_Grapefruit_1.png", hoverImage: "/images/LAventure_Grapefruit_2.png", brandLogo: null, tagline: "Frescura cítrica", fullDescription: "L'Aventure Grapefruit - Energia e frescor.", fragranceType: "Cítrico", bestFor: "Dias quentes", launchYear: "2024", notes: { topo: "Toranja, Limão", coracao: "Flor de Laranjeira", base: "Almíscar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 349 }] },
    { id: 4, name: "Olivia", price: "R$ 279", image: "/images/Olivia_1.png", hoverImage: "/images/Olivia_2.png", brandLogo: "/images/logolattafa.png", tagline: "Elegância feminina", fullDescription: "Olivia - Fragrância suave e delicada.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Pêra, Bergamota", coracao: "Rosa, Jasmim", base: "Baunilha, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 279 }] },
    { id: 5, name: "Basir", price: "R$ 329", image: "/images/Basir_1.png", hoverImage: "/images/Basir_2.png", brandLogo: "/images/logolattafa.png", tagline: "Mistério e sedução", fullDescription: "Basir - Fragrância envolvente e misteriosa.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Açafrão, Bergamota", coracao: "Rosa, Jasmim", base: "Oud, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 329 }] },
    { id: 6, name: "Sabah Al Ward", price: "R$ 249", image: "/images/Sabah_Al_Ward_1.png", hoverImage: "/images/Sabah_Al_Ward_2.png", brandLogo: "/images/logolattafa.png", tagline: "Manhã de rosas", fullDescription: "Sabah Al Ward - Fragrância floral delicada.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Rosa, Jasmim", base: "Almíscar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 249 }] },
    { id: 7, name: "Fakhar Rose", price: "R$ 359", image: "/images/Fakhar_Woman_Rose_1.png", hoverImage: "/images/Fakhar_Woman_Rose_2.png", brandLogo: "/images/logolattafa.png", tagline: "Rosa exuberante", fullDescription: "Fakhar Rose - A força da rosa.", fragranceType: "Floral Oriental", bestFor: "Encontros românticos", launchYear: "2024", notes: { topo: "Flor de Laranjeira", coracao: "Jasmim, Tuberosa", base: "Vetiver, Patchouli" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] },
    { id: 8, name: "Ameerati", price: "R$ 239", image: "/images/Ameerati_1.png", hoverImage: "/images/Ameerati_2.png", brandLogo: "/images/logolattafa.png", tagline: "Princesa árabe", fullDescription: "Ameerati - Fragrância feminina e delicada.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim", base: "Almíscar, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 239 }] },
    { id: 9, name: "Leonie", price: "R$ 269", image: "/images/Leonie_1.png", hoverImage: "/images/Leonie_2.png", brandLogo: "/images/logolattafa.png", tagline: "Feminilidade radiante", fullDescription: "Leonie - Fragrância alegre e vibrante.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Frutas vermelhas", coracao: "Rosa, Jasmim", base: "Baunilha, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 269 }] },
    { id: 10, name: "Leonie Intense", price: "R$ 279", image: "/images/Leonie_Intense_1.png", hoverImage: "/images/Leonie_Intense_2.png", brandLogo: "/images/logolattafa.png", tagline: "Intensidade feminina", fullDescription: "Leonie Intense - Versão mais intensa e marcante.", fragranceType: "Floral Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim, Íris", base: "Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 279 }] },
    { id: 11, name: "Yara Rosa", price: "R$ 279", image: "/images/Yara_Rosa_1.png", hoverImage: "/images/Yara_Rosa_2.png", brandLogo: "/images/logolattafa.png", tagline: "Abertura enérgica e vibrante", fullDescription: "YARA Rosa Eau de Parfum.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2023", notes: { topo: "Orquídea, Heliotrópio, Tangerina", coracao: "Acorde Gourmand, Frutas tropicais", base: "Baunilha, Almíscar, Sândalo" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 279 }] },
    { id: 12, name: "Yara Candy", price: "R$ 289", image: "/images/Yara_Candy_1.png", hoverImage: "/images/Yara_Candy_2.png", brandLogo: "/images/logolattafa.png", tagline: "Doçura e frescor", fullDescription: "Yara Candy - Doce e divertida.", fragranceType: "Floral Frutal Gourmand", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Frutas vermelhas, Bergamota", coracao: "Flor de Laranjeira, Jasmim", base: "Baunilha, Almíscar, Caramelo" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 13, name: "Yara Tous", price: "R$ 289", image: "/images/Yara_Tous_1.png", hoverImage: "/images/Yara_Tous_2.png", brandLogo: "/images/logolattafa.png", tagline: "Festival de frutas tropicais", fullDescription: "YARA Tous - Frescor tropical.", fragranceType: "Frutal Tropical", bestFor: "Férias", launchYear: "2024", notes: { topo: "Coco, Manga, Maracujá", coracao: "Jasmim, Heliotrópio", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 14, name: "Yara Moi", price: "R$ 279", image: "/images/Yara_Moi_1.png", hoverImage: "/images/Yara_Moi_2.png", brandLogo: "/images/logolattafa.png", tagline: "Feminilidade e sofisticação", fullDescription: "Yara Moi - Sofisticada e elegante.", fragranceType: "Floral Amadeirado", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim, Íris", base: "Baunilha, Almíscar, Sândalo" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 279 }] },
    { id: 15, name: "Delilah", price: "R$ 299", image: "/images/Delilah_1.png", hoverImage: "/images/Delilah_2.png", brandLogo: "/images/logolattafa.png", tagline: "Sedução feminina", fullDescription: "Delilah - Fragrância envolvente.", fragranceType: "Floral Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Pêssego", coracao: "Rosa, Jasmim", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 299 }] },
    { id: 16, name: "Delilah Blanc", price: "R$ 399", image: "/images/Delilah_Blanc_1.png", hoverImage: "/images/Delilah_Blanc_2.png", brandLogo: "/images/logolattafa.png", tagline: "Pureza e elegância", fullDescription: "Delilah Blanc - Versão branca e sofisticada.", fragranceType: "Floral Branco", bestFor: "Ocasiões especiais", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Jasmim, Gardênia", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 399 }] },
    { id: 17, name: "Qaed Al Fursan Branco", price: "R$ 319", image: "/images/Qaed_Fursan_1.png", hoverImage: "/images/Qaed_Fursan_2.png", brandLogo: "/images/logolattafa.png", tagline: "Pureza e intensidade", fullDescription: "Qaed Al Fursan Branco.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Pimenta, Bergamota", coracao: "Patchouli, Cedro", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 319 }] },
    { id: 18, name: "Ansaam Gold", price: "R$ 459", image: "/images/Ansaam_Gold_1.png", hoverImage: "/images/Ansaam_Gold_2.png", brandLogo: "/images/logolattafa.png", tagline: "Perfume oriental e elegante", fullDescription: "Ansaam Gold - Luxo e sofisticação.", fragranceType: "Oriental Doce Frutado", bestFor: "Ocasiões especiais", launchYear: "2022", notes: { topo: "Tangerina, Pêra", coracao: "Jasmim, Rosa", base: "Baunilha, Almíscar, Framboesa" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 459 }] },
    { id: 19, name: "Como Moiselle", price: "R$ 319", image: "/images/Como_Moiselle_1.png", hoverImage: "/images/Como_Moiselle_2.png", brandLogo: null, tagline: "Charme francês", fullDescription: "Como Moiselle - Elegância francesa.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Rosa, Jasmim", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 319 }] },
    { id: 20, name: "Ajwad Rosa", price: "R$ 299", image: "/images/Ajwad_1.png", hoverImage: "/images/Ajwad_2.png", brandLogo: "/images/logolattafa.png", tagline: "Rosa encantadora", fullDescription: "Ajwad Rosa - Fragrância floral.", fragranceType: "Oriental Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Notas frutadas, Rosa Mel", coracao: "Rosa, Jasmim", base: "Almíscar, Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 299 }] },
    { id: 21, name: "Eclairie", price: "R$ 329", image: "/images/Lattafa_Eclaire_1.png", hoverImage: "/images/Lattafa_Eclaire_2.png", brandLogo: "/images/logolattafa.png", tagline: "Doçura iluminada", fullDescription: "Eclairie - Doce e radiante.", fragranceType: "Gourmand", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Caramelo, Leite", coracao: "Mel, Flores brancas", base: "Baunilha, Praliné" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 329 }] },
    { id: 22, name: "Reyna", price: "R$ 269", image: "/images/Reyna_1.png", hoverImage: "/images/Reyna_2.png", brandLogo: "/images/logolattafa.png", tagline: "Rainha da elegância", fullDescription: "Reyna - Perfume real e sofisticado.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 269 }] },
    { id: 23, name: "Ameerat Privé Rose", price: "R$ 239", image: "/images/Ameerat_Prive_Rose_1.png", hoverImage: "/images/Ameerat_Prive_Rose_2.png", brandLogo: "/images/logolattafa.png", tagline: "Rosa exclusiva", fullDescription: "Ameerat Privé Rose - Rosa premium.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim", base: "Almíscar, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 239 }] },
    { id: 24, name: "Ameerat Vermelho", price: "R$ 239", image: "/images/Ameerat_Vermelho_1.png", hoverImage: "/images/Ameerat_Vermelho_2.png", brandLogo: "/images/logolattafa.png", tagline: "Paixão vermelha", fullDescription: "Ameerat Vermelho - Fragrância intensa.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Frutas vermelhas", coracao: "Rosa, Jasmim", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 239 }] },
    { id: 25, name: "Teriaq", price: "R$ 359", image: "/images/Teriaq_1.png", hoverImage: "/images/Teriaq_2.png", brandLogo: "/images/logolattafa.png", tagline: "Fragrância intensa", fullDescription: "Teriaq - Perfume marcante.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Açafrão", coracao: "Ameixa, Canela", base: "Âmbar, Benjoim" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] },
    { id: 26, name: "Teriaq Intense", price: "R$ 379", image: "/images/Teriaq_Intense_1.png", hoverImage: "/images/Teriaq_Intense_2.png", brandLogo: "/images/logolattafa.png", tagline: "Ode à intensidade", fullDescription: "Teriaq Intense - Versão mais intensa.", fragranceType: "Oriental Especiado Gourmand", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Açafrão", coracao: "Licor de Ameixa, Canela", base: "Fava Tonka, Âmbar, Benjoim" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 379 }] },
    { id: 27, name: "Souvenir Floral", price: "R$ 359", image: "/images/Souvenir_Floral_1.png", hoverImage: "/images/Souvenir_Floral_2.png", brandLogo: "/images/logolattafa.png", tagline: "Memória floral", fullDescription: "Souvenir Floral - Fragrância floral inesquecível.", fragranceType: "Floral", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota", coracao: "Rosa, Jasmim", base: "Almíscar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] },
    { id: 28, name: "Her Confession", price: "R$ 429", image: "/images/Lattafa_His_Confession_1.png", hoverImage: "/images/Lattafa_His_Confession_2.png", brandLogo: "/images/logolattafa.png", tagline: "Confissão feminina", fullDescription: "Her Confession - Fragrância íntima.", fragranceType: "Amadeirado", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Canela, Tangerina", coracao: "Benjoim, Íris", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 29, name: "Selena", price: "R$ 289", image: "/images/Selena_1.png", hoverImage: "/images/Selena_2.png", brandLogo: "/images/logolattafa.png", tagline: "Brilho feminino", fullDescription: "Selena - Fragrância radiante.", fragranceType: "Floral Frutal", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Frutas vermelhas", coracao: "Rosa, Jasmim", base: "Baunilha, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 30, name: "Amnia", price: "R$ 339", image: "/images/Amnia_1.png", hoverImage: "/images/Amnia_2.png", brandLogo: "/images/logolattafa.png", tagline: "Segurança e confiança", fullDescription: "Amnia - Perfume seguro e marcante.", fragranceType: "Floral Amadeirado", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota", coracao: "Rosa, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 339 }] }
  ]
};

export const masculine = {
  kicker: "PARA ELE",
  titleLine1: "Para",
  titleItalic: "ele",
  description: "Fragrâncias masculinas com presença marcante.",
  products: [
    { id: 0, name: "Fakhar Black", price: "R$ 359", image: "/images/Fakhar_Black.png", hoverImage: "/images/Fakhar_Black1.png", brandLogo: "/images/logolattafa.png", tagline: "Elegância contemporânea", fullDescription: "Fakhar Black - Perfume masculino marcante.", fragranceType: "Aromático Fougere", bestFor: "Uso diário", launchYear: "2020", notes: { topo: "Gengibre, Maçã, Bergamota", coracao: "Lavanda, Gerânio", base: "Cedro, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] },
    { id: 1, name: "Fakhar Gold", price: "R$ 299", image: "/images/Fakhar_Gold_1.png", hoverImage: "/images/Fakhar_Gold_2.png", brandLogo: "/images/logolattafa.png", tagline: "Ouro líquido", fullDescription: "Fakhar Gold - Perfume masculino premium.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 299 }] },
    { id: 2, name: "Fakhar Platinum", price: "R$ 299", image: "/images/Fakhar_Platinum_1.png", hoverImage: "/images/Fakhar_Platinum_2.png", brandLogo: "/images/logolattafa.png", tagline: "Platina refinada", fullDescription: "Fakhar Platinum - Sofisticação em cada nota.", fragranceType: "Aromático", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Almíscar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 299 }] },
    { id: 3, name: "Asad", price: "R$ 319", image: "/images/Lattafa - Asad.png", hoverImage: "/images/Lattafa - Asad.1png.png", brandLogo: "/images/logolattafa.png", tagline: "Revele a sua força", fullDescription: "Asad - Perfume marcante e intenso.", fragranceType: "Gourmet Picante", bestFor: "Tempo frio", launchYear: "2021", notes: { topo: "Pimenta Negra, Tabaco", coracao: "Patchouli, Café", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 319 }] },
    { id: 4, name: "Asad Bourbon", price: "R$ 359", image: "/images/Lattafa - Asad Bourbon.png", hoverImage: "/images/Lattafa - Asad Bourbon1.png", brandLogo: "/images/logolattafa.png", tagline: "Intensidade e sofisticação", fullDescription: "Asad Bourbon - Edição premium.", fragranceType: "Amadeirado Gourmand", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Canela, Tabaco", coracao: "Baunilha, Oud", base: "Fava Tonka, Couro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] },
    { id: 5, name: "Club Urban Man Elixir", price: "R$ 479", image: "/images/Armaf_Urban_Elixir_1.png", hoverImage: "/images/Armaf_Urban_Elixir_2.png", brandLogo: null, tagline: "A essência da masculinidade moderna", fullDescription: "Club Urban Man Elixir.", fragranceType: "Cítrico Aromático Especiado", bestFor: "Dia a dia", launchYear: "2024", notes: { topo: "Bergamota, Jasmim", coracao: "Lavanda, Gerânio", base: "Âmbar, Patchouli" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "105ml", price: 479 }] },
    { id: 6, name: "Club Intense", price: "R$ 429", image: "/images/Armaf - Club de Nuit Intense Man.png", hoverImage: "/images/Armaf - Club de Nuit Intense Man2.png", brandLogo: null, tagline: "O clássico moderno", fullDescription: "Club Intense - Perfume icônico.", fragranceType: "Cítrico Amadeirado", bestFor: "Uso diário", launchYear: "2015", notes: { topo: "Limão, Maçã Verde", coracao: "Jasmim, Rosa", base: "Âmbar, Patchouli" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "105ml", price: 429 }] },
    { id: 7, name: "Club de Nuit Iconic", price: "R$ 449", image: "/images/Armaf_Iconic_1.png", hoverImage: "/images/Armaf_Iconic_2.png", brandLogo: null, tagline: "Ícone de elegância", fullDescription: "Club de Nuit Iconic.", fragranceType: "Cítrico Amadeirado", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Limão, Bergamota", coracao: "Jasmim, Rosa", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "105ml", price: 449 }] },
    { id: 8, name: "Club Lionheart", price: "R$ 599", image: "/images/Armaf_Lionheart_1.png", hoverImage: "/images/Armaf_Lionheart_2.png", brandLogo: null, tagline: "A força do leão", fullDescription: "Club Lionheart - Perfume poderoso.", fragranceType: "Oriental Fougère", bestFor: "Homens confiantes", launchYear: "2025", notes: { topo: "Hortelã, Lavanda", coracao: "Benjoim, Baunilha", base: "Tabaco, Mel" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 599 }] },
    { id: 9, name: "Oud For Glory", price: "R$ 339", image: "/images/Oud_For_Glory_1.png", hoverImage: "/images/Oud_For_Glory_2.png", brandLogo: "/images/logolattafa.png", tagline: "Glória do Oud", fullDescription: "Oud For Glory - Perfume amadeirado.", fragranceType: "Amadeirado", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota", coracao: "Oud, Patchouli", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 339 }] },
    { id: 10, name: "Al Noble Ameer", price: "R$ 329", image: "/images/Al_Noble_Ameer_1.png", hoverImage: "/images/Al_Noble_Ameer_2.png", brandLogo: "/images/logolattafa.png", tagline: "Príncipe nobre", fullDescription: "Al Noble Ameer - Perfume real.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Açafrão", coracao: "Patchouli, Cedro", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 329 }] },
    { id: 11, name: "Al Noble Safeer", price: "R$ 329", image: "/images/Al_Noble_Safeer_1.png", hoverImage: "/images/Al_Noble_Safeer_2.png", brandLogo: "/images/logolattafa.png", tagline: "Embaixador da elegância", fullDescription: "Al Noble Safeer - Perfume sofisticado.", fragranceType: "Oriental Amadeirado", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Cardamomo", coracao: "Patchouli, Cedro", base: "Âmbar, Oud" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 329 }] },
    { id: 12, name: "Al Noble Wazeer", price: "R$ 339", image: "/images/Noble_Wazeer_1.png", hoverImage: "/images/Noble_Wazeer_2.png", brandLogo: "/images/logolattafa.png", tagline: "O ministro da elegância", fullDescription: "Al Noble Wazeer - Perfume distinto.", fragranceType: "Oriental Amadeirado", bestFor: "Ocasiões especiais", launchYear: "2024", notes: { topo: "Bergamota, Açafrão", coracao: "Patchouli, Cedro", base: "Âmbar, Oud" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 339 }] },
    { id: 13, name: "Ameer Al Arab Preto", price: "R$ 319", image: "/images/Ameer_Al_Arab_Preto_1.png", hoverImage: "/images/Ameer_Al_Arab_Preto_2.png", brandLogo: "/images/logolattafa.png", tagline: "Príncipe árabe", fullDescription: "Ameer Al Arab Preto - Fragrância marcante.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pêra", coracao: "Rosa, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 319 }] },
    { id: 14, name: "Ameer Al Arab Azul", price: "R$ 319", image: "/images/Ameer_Al_Arab_Azul_1.png", hoverImage: "/images/Ameer_Al_Arab_Azul_2.png", brandLogo: "/images/logolattafa.png", tagline: "Príncipe do mar", fullDescription: "Ameer Al Arab Azul - Frescor aquático.", fragranceType: "Aquático", bestFor: "Dias quentes", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Gerânio", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 319 }] },
    { id: 15, name: "Ishq Gold", price: "R$ 399", image: "/images/Ishq_Gold_1.png", hoverImage: "/images/Ishq_Gold_2.png", brandLogo: "/images/logolattafa.png", tagline: "Amor dourado", fullDescription: "Ishq Gold - Perfume apaixonante.", fragranceType: "Oriental Amadeirado", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Limão, Bergamota", coracao: "Pimenta, Ananás", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 399 }] },
    { id: 16, name: "Ishq Silver", price: "R$ 399", image: "/images/Ishq_Silver_1.png", hoverImage: "/images/Ishq_Silver_2.png", brandLogo: "/images/logolattafa.png", tagline: "Amor prateado", fullDescription: "Ishq Silver - Perfume refinado.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Limão, Bergamota", coracao: "Pimenta, Ananás", base: "Âmbar, Cedro, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 399 }] },
    { id: 17, name: "Eternal Oud", price: "R$ 369", image: "/images/Eternal_Oud_1.png", hoverImage: "/images/Eternal_Oud_2.png", brandLogo: "/images/logolattafa.png", tagline: "Oud eterno", fullDescription: "Eternal Oud - Perfume amadeirado.", fragranceType: "Amadeirado", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Açafrão, Bergamota", coracao: "Oud, Patchouli", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 369 }] },
    { id: 18, name: "Al Nashama Caprice", price: "R$ 339", image: "/images/Al_Nashama_Caprice_1.png", hoverImage: "/images/Al_Nashama_Caprice_2.png", brandLogo: "/images/logolattafa.png", tagline: "Capricho oriental", fullDescription: "Al Nashama Caprice.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 339 }] },
    { id: 19, name: "9AM", price: "R$ 519", image: "/images/9AM_1.png", hoverImage: "/images/9AM_2.png", brandLogo: null, tagline: "Manhã radiante", fullDescription: "9AM - Perfume matinal.", fragranceType: "Cítrico", bestFor: "Dia a dia", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 519 }] },
    { id: 20, name: "9PM", price: "R$ 449", image: "/images/Afnan_9PM_1.png", hoverImage: "/images/Afnan_9PM_2.png", brandLogo: null, tagline: "Noite intensa", fullDescription: "9PM - Perfume noturno.", fragranceType: "Âmbar Baunilha", bestFor: "Noites especiais", launchYear: "2020", notes: { topo: "Maçã, Canela", coracao: "Flor de Laranjeira", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 449 }] },
    { id: 21, name: "9PM Elixir", price: "R$ 529", image: "/images/9PM_Elixir_1.png", hoverImage: "/images/9PM_Elixir_2.png", brandLogo: null, tagline: "Elixir noturno", fullDescription: "9PM Elixir - Versão mais intensa.", fragranceType: "Âmbar Gourmand", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Maçã, Canela", coracao: "Baunilha, Flor de Laranjeira", base: "Âmbar, Fava Tonka" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 529 }] },
    { id: 22, name: "9PM Rebel", price: "R$ 599", image: "/images/9PM_Rebel_1.png", hoverImage: "/images/9PM_Rebel_2.png", brandLogo: null, tagline: "Rebeldia noturna", fullDescription: "9PM Rebel - Perfume ousado.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Maçã, Canela", coracao: "Baunilha, Tabaco", base: "Âmbar, Couro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 599 }] },
    { id: 23, name: "Asad Zanzibar", price: "R$ 299", image: "/images/Lattafa - Asad Zanzibar.png", hoverImage: "/images/Lattafa - Asad Zanzibar1.png", brandLogo: "/images/logolattafa.png", tagline: "Exótico e sofisticado", fullDescription: "Asad Zanzibar - Perfume exótico.", fragranceType: "Fresca Amadeirada", bestFor: "Dias quentes", launchYear: "2024", notes: { topo: "Lavanda, Pimenta", coracao: "Água de Coco, Íris", base: "Baunilha, Incenso" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 299 }] },
    { id: 24, name: "Salvo Intense", price: "R$ 289", image: "/images/Salvo_Intense_1.png", hoverImage: "/images/Salvo_Intense_2.png", brandLogo: null, tagline: "Intensidade salvadora", fullDescription: "Salvo Intense - Perfume marcante.", fragranceType: "Oriental Fougère", bestFor: "Uso noturno", launchYear: "2024", notes: { topo: "Pimenta, Tabaco", coracao: "Patchouli, Café", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "60ml", price: 289 }] },
    { id: 25, name: "Salvo EDP", price: "R$ 289", image: "/images/Salvo_EDP_1.png", hoverImage: "/images/Salvo_EDP_2.png", brandLogo: null, tagline: "Salvador elegante", fullDescription: "Salvo EDP.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Pimenta, Tabaco", coracao: "Patchouli, Íris", base: "Baunilha, Âmbar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 26, name: "Especial Oud", price: "R$ 369", image: "/images/Especial_Oud_1.png", hoverImage: "/images/Especial_Oud_2.png", brandLogo: "/images/logolattafa.png", tagline: "Oud especial", fullDescription: "Especial Oud - Perfume amadeirado.", fragranceType: "Amadeirado", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota", coracao: "Oud, Patchouli", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 369 }] },
    { id: 27, name: "Hayaati", price: "R$ 289", image: "/images/Hayaati_1.png", hoverImage: "/images/Hayaati_2.png", brandLogo: "/images/logolattafa.png", tagline: "Minha vida", fullDescription: "Hayaati - Perfume vibrante.", fragranceType: "Cítrico", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 289 }] },
    { id: 28, name: "Victorioso Nero", price: "R$ 309", image: "/images/Victorioso_Nero_1.png", hoverImage: "/images/Victorioso_Nero_2.png", brandLogo: null, tagline: "Vitória negra", fullDescription: "Victorioso Nero - Perfume vitorioso.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 309 }] },
    { id: 29, name: "The Kingdom Masc", price: "R$ 429", image: "/images/Lattafa - The Kingdom (For Men).png", hoverImage: "/images/Lattafa - The Kingdom (For Men)1.png", brandLogo: "/images/logolattafa.png", tagline: "O reino masculino", fullDescription: "The Kingdom - Perfume real.", fragranceType: "Amber Fougere", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Sálvia, Lavanda", coracao: "Tabaco, Baunilha", base: "Benjoim, Fava Tonka" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 30, name: "Ansaam Silver", price: "R$ 429", image: "/images/Ansaam_Silver_1.png", hoverImage: "/images/Ansaam_Silver_2.png", brandLogo: "/images/logolattafa.png", tagline: "Prata ansiosa", fullDescription: "Ansaam Silver - Perfume elegante.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Tangerina, Pêra", coracao: "Jasmim, Rosa", base: "Baunilha, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 31, name: "Rayhaan Elixir", price: "R$ 429", image: "/images/Rayhaan_Elixir_1.png", hoverImage: "/images/Rayhaan_Elixir_2.png", brandLogo: null, tagline: "Elixir celestial", fullDescription: "Rayhaan Elixir.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 32, name: "Immortel", price: "R$ 429", image: "/images/Immortel_1.png", hoverImage: "/images/Immortel_2.png", brandLogo: null, tagline: "Imortal", fullDescription: "Immortel - Perfume eterno.", fragranceType: "Cítrico", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 33, name: "Art of Arabia", price: "R$ 529", image: "/images/Art_of_Arabia_1.png", hoverImage: "/images/Art_of_Arabia_2.png", brandLogo: null, tagline: "Arte da Arábia", fullDescription: "Art of Arabia - Perfume artístico.", fragranceType: "Oriental", bestFor: "Ocasiões especiais", launchYear: "2024", notes: { topo: "Bergamota, Açafrão", coracao: "Oud, Patchouli", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 529 }] },
    { id: 34, name: "Musamam Black Intense", price: "R$ 529", image: "/images/Musamam_Black_Intense_1.png", hoverImage: "/images/Musamam_Black_Intense_2.png", brandLogo: "/images/logolattafa.png", tagline: "Intensidade negra", fullDescription: "Musamam Black Intense.", fragranceType: "Amadeirado Aromático", bestFor: "Uso noturno", launchYear: "2025", notes: { topo: "Sálvia, Lavanda", coracao: "Gerânio, Cedro", base: "Fava Tonka, Patchouli" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 529 }] },
    { id: 35, name: "Shaheen Gold", price: "R$ 439", image: "/images/Shaheen_Gold_1.png", hoverImage: "/images/Shaheen_Gold_2.png", brandLogo: null, tagline: "Falcão dourado", fullDescription: "Shaheen Gold - Perfume nobre.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 439 }] },
    { id: 36, name: "Hawas Ice", price: "R$ 549", image: "/images/Hawas_Ice_1.png", hoverImage: "/images/Hawas_Ice_2.png", brandLogo: null, tagline: "Gelo ardente", fullDescription: "Hawas Ice - Frescor intenso.", fragranceType: "Aquático", bestFor: "Dias quentes", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 549 }] },
    { id: 37, name: "Hawas Black", price: "R$ 459", image: "/images/Hawas_Black_1.png", hoverImage: "/images/Hawas_Black_2.png", brandLogo: null, tagline: "Negro ardente", fullDescription: "Hawas Black.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Oud" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 459 }] },
    { id: 38, name: "Hawas For Him", price: "R$ 369", image: "/images/Hawas_For_Him.png", hoverImage: "/images/Hawas_For_Him1.png", brandLogo: null, tagline: "Para ele", fullDescription: "Hawas For Him - Perfume masculino.", fragranceType: "Aquático", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 369 }] },
    { id: 39, name: "Hawas Elixir", price: "R$ 549", image: "/images/Hawas_Elixir_1.png", hoverImage: "/images/Hawas_Elixir_2.png", brandLogo: null, tagline: "Elixir ardente", fullDescription: "Hawas Elixir - Versão intensa.", fragranceType: "Oriental", bestFor: "Noites especiais", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Tabaco", base: "Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 549 }] },
    { id: 40, name: "Liquid Brun", price: "R$ 479", image: "/images/Liquid_Brun_1.png", hoverImage: "/images/Liquid_Brun_2.png", brandLogo: null, tagline: "Marrom líquido", fullDescription: "Liquid Brun.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Maçã", coracao: "Lavanda, Gerânio", base: "Âmbar, Baunilha" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 479 }] },
    { id: 41, name: "Infinity Silver", price: "R$ 519", image: "/images/Infinity_Silver_1.png", hoverImage: "/images/Infinity_Silver_2.png", brandLogo: null, tagline: "Prata infinita", fullDescription: "Infinity Silver.", fragranceType: "Oriental", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Limão", coracao: "Lavanda, Jasmim", base: "Âmbar, Cedro" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 519 }] }
  ]
};

export const unissex = {
  kicker: "UNISSEX",
  titleLine1: "Para",
  titleItalic: "todos",
  description: "Fragrâncias que transcendem gêneros.",
  products: [
    { id: 0, name: "Khamrah", price: "R$ 399", image: "/images/Khamrah_1.png", hoverImage: "/images/Khamrah_2.png", brandLogo: "/images/logolattafa.png", tagline: "Doçura envolvente", fullDescription: "Khamrah - Perfume doce e envolvente.", fragranceType: "Gourmand", bestFor: "Noites especiais", launchYear: "2022", notes: { topo: "Canela, Noz-moscada", coracao: "Baunilha, Praliné", base: "Âmbar, Benjoim" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 399 }] },
    { id: 1, name: "Khamrah Qahwa", price: "R$ 429", image: "/images/Khamrah_Qahwa_1.png", hoverImage: "/images/Khamrah_Qahwa_2.png", brandLogo: "/images/logolattafa.png", tagline: "Café envolvente", fullDescription: "Khamrah Qahwa - Perfume com notas de café.", fragranceType: "Gourmand", bestFor: "Noites especiais", launchYear: "2023", notes: { topo: "Café, Canela", coracao: "Baunilha, Cardamomo", base: "Âmbar, Benjoim" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 429 }] },
    { id: 2, name: "Vulcan Fine", price: "R$ 359", image: "/images/Vulcan_Fine_1.png", hoverImage: "/images/Vulcan_Fine_2.png", brandLogo: null, tagline: "Fogo e elegância", fullDescription: "Vulcan Fine - Perfume intenso.", fragranceType: "Amadeirado", bestFor: "Uso diário", launchYear: "2024", notes: { topo: "Bergamota, Pimenta", coracao: "Cedro, Vetiver", base: "Âmbar, Almíscar" }, sizes: [{ size: "3ml", image: "/images/decant.png" }, { size: "5ml", image: "/images/decant1.png" }, { size: "100ml", price: 359 }] }
  ]
};

export const kits = {
  kicker: "KITS EXCLUSIVOS",
  titleLine1: "Escolha seu",
  titleItalic: "Kit",
  description: "Selecione um kit e monte com seus perfumes favoritos",
  products: [
    { 
      id: 0, 
      name: "Kit Ouro do Bonfim", 
      price: "R$ 79,90", 
      image: "/images/kit_ouro_bonfim_5ml.png", 
      slug: "kit-ouro-do-bonfim", 
      description: "Kit unissex com Khamrah, Khamrah Qahwa e Vulcan Fine",
      category: "unissex",
      perfumes: ["Khamrah", "Khamrah Qahwa", "Vulcan Fine"]
    },
    { 
      id: 1, 
      name: "Kit Brisa de Itapuã", 
      price: "R$ 79,90", 
      image: "/images/kit_brisa_itapua_5ml.png", 
      slug: "kit-brisa-de-itapua", 
      description: "Kit feminino com Yara Rosa, Yara Tous e Sabah Al Ward",
      category: "feminino",
      perfumes: ["Yara Rosa", "Yara Tous", "Sabah Al Ward"]
    },
    { 
      id: 2, 
      name: "Kit Noite no Pelourinho", 
      price: "R$ 79,90", 
      image: "/images/kit_noite_pelourinho_5ml.png", 
      slug: "kit-noite-no-pelourinho", 
      description: "Kit masculino com Asad, Asad Bourbon e 9PM",
      category: "masculino",
      perfumes: ["Asad", "Asad Bourbon", "9PM"]
    }
  ]
};

export const trends = {
  kicker: "NÃO FIQUE SEM",
  titleLine1: "Últimas",
  titleItalic: "tendências",
  products: [
    { name: "Fakhar Black", image: "/images/Fakhar_Black.png", price: "R$ 359" },
    { name: "Asad Bourbon", image: "/images/Lattafa - Asad Bourbon.png", price: "R$ 359" },
    { name: "9PM", image: "/images/Afnan_9PM_1.png", price: "R$ 449" },
    { name: "Yara Rosa", image: "/images/Yara_Rosa_1.png", price: "R$ 279" },
    { name: "Ansaam Gold", image: "/images/Ansaam_Gold_1.png", price: "R$ 459" },
    { name: "Teriaq Intense", image: "/images/Teriaq_Intense_1.png", price: "R$ 379" },
    { name: "Hawas For Him", image: "/images/Hawas_For_Him.png", price: "R$ 369" },
    { name: "Club Intense", image: "/images/Armaf - Club de Nuit Intense Man.png", price: "R$ 429" }
  ]
};

export const follow = {
  kicker: "Siga-nos",
  handle: "@noraya.oud",
  instagramUrl: "https://www.instagram.com/noraya.oud/",
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
  description: "Receba lançamentos, ofertas exclusivas e novidades.",
  placeholder: "Seu melhor e-mail",
  cta: "Inscrever"
};

export const footer = {
  columns: [
    { title: "LOJA", links: ["Ver tudo", "Novidades", "Mais vendidos", "Para Ela", "Para Ele", "Unissex"] },
    { title: "AJUDA", links: ["Frete e entrega", "Trocas e devoluções", "FAQ", "Fale conosco"] },
    { title: "INSTITUCIONAL", links: ["Sobre a Noraya BR", "Política de privacidade", "Termos de uso"] }
  ],
  copyright: "© 2026 NORAYA BR — Perfumes Árabes. Todos os direitos reservados."
};

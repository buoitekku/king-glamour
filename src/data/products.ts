import type { Product, ProductKind } from "@/lib/types";

type Seed = Omit<Product, "id" | "slug" | "sku" | "colors" | "rating" | "reviews" | "stock" | "lowestPrice30d"> & {
  lowestPrice30d?: number;
  colors?: { name: string; hex: string }[];
  rating?: number;
  reviews?: number;
  stock?: number;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const C = {
  black: { name: "Czarny", hex: "#1a1a1a" },
  navy: { name: "Granatowy", hex: "#1f2a44" },
  brown: { name: "Brązowy", hex: "#5a3a22" },
  white: { name: "Biały", hex: "#f4f1ea" },
  beige: { name: "Beżowy", hex: "#d9c7a5" },
  grey: { name: "Szary", hex: "#8a8a8a" },
  green: { name: "Butelkowa zieleń", hex: "#1f4d3a" },
  burgundy: { name: "Bordowy", hex: "#6b1f2e" },
  blue: { name: "Niebieski", hex: "#2d6fb5" },
  rose: { name: "Pudrowy róż", hex: "#d8a3a8" },
  olive: { name: "Oliwkowy", hex: "#6b6b3a" },
  cognac: { name: "Koniakowy", hex: "#a0602c" },
};

const HELMET = ["52", "53", "54", "55", "56", "57", "58", "59", "60", "61"];
const CLOTH = ["XS", "S", "M", "L", "XL", "XXL"];
const BRYCZESY = ["34", "36", "38", "40", "42", "44", "46"];
const SHOES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const GLOVES = ["6", "6.5", "7", "7.5", "8", "8.5", "9"];
const HORSE = ["Pony", "Cob", "Full", "X-Full"];
const RUG = ["115", "125", "135", "145", "155", "165"];
const BOOTS = ["S", "M", "L"];

const seeds: Seed[] = [
  // ---- KASKI ----
  { name: "Kask Samshield Shadowmatt", brand: "samshield", category: "kaski", kind: "helmet", price: 1899, description: "Ikona wśród kasków jeździeckich. Matowa skorupa, wentylacja z przodu i z tyłu, wymienna wkładka wewnętrzna z pianki pamięciowej. Certyfikat VG1 01.040 2014-12.", features: ["Skorupa z poliwęglanu wzmocnionego", "Wymienna, prana wkładka", "System wentylacji Samshield", "Certyfikat VG1 01.040"], sizes: HELMET, colors: [C.black, C.navy, C.brown], ships24h: true, isBestseller: true, rating: 4.9, reviews: 212 },
  { name: "Kask Samshield Miss Shield Glossy", brand: "samshield", category: "kaski", kind: "helmet", price: 2299, description: "Damska wersja z wydłużonym daszkiem i błyszczącym wykończeniem. Możliwość personalizacji obręczy i tylnej blaszki.", features: ["Wydłużony daszek", "Błyszczące wykończenie", "Personalizacja", "Certyfikat VG1"], sizes: HELMET, colors: [C.black, C.navy], ships24h: true, isNew: true, rating: 4.8, reviews: 64 },
  { name: "Kask KEP Cromo 2.0 Textile", brand: "kep-italia", category: "kaski", kind: "helmet", price: 1590, oldPrice: 1790, lowestPrice30d: 1490, description: "Lekki kask z tkaninową skorupą i bardzo wydajną wentylacją. Wymienne wkładki pozwalają dopasować rozmiar w zakresie 2 cm.", features: ["Waga 480 g", "Regulacja rozmiaru wkładkami", "Wentylacja Air Flow", "Certyfikat VG1"], sizes: HELMET, colors: [C.black, C.navy, C.grey], ships24h: true, rating: 4.7, reviews: 98 },
  { name: "Kask HKM Lady Shield Sparkle", brand: "hkm", category: "kaski", kind: "helmet", price: 349, description: "Przystępny cenowo kask z regulacją pokrętłem i wentylacją. Ozdobny pasek z kryształkami.", features: ["Regulacja pokrętłem", "Certyfikat VG1", "Odpinana wkładka"], sizes: ["S (52-55)", "M (55-58)", "L (58-61)"], colors: [C.black, C.navy, C.rose], ships24h: true, rating: 4.4, reviews: 141 },

  // ---- BUTY ----
  { name: "Oficerki DeNiro Salento", brand: "deniro", category: "buty", kind: "boots", price: 3290, description: "Ręcznie wykonane oficerki z miękkiej włoskiej skóry Quick. Klasyczna linia skokowa z elastyczną wstawką i zamkiem z tyłu.", features: ["Skóra cielęca Quick", "Elastyczna wstawka", "Zamek błyskawiczny YKK", "Wykonane we Włoszech"], sizes: SHOES, colors: [C.black, C.brown], ships24h: false, rating: 4.9, reviews: 43 },
  { name: "Sztyblety Pikeur Athens", brand: "pikeur", category: "buty", kind: "boots", price: 649, oldPrice: 749, description: "Skórzane sztyblety z gumowymi wstawkami, przeznaczone do jazdy i pracy w stajni.", features: ["Skóra naturalna", "Wyściółka oddychająca", "Antypoślizgowa podeszwa"], sizes: SHOES, colors: [C.black, C.brown], ships24h: true, isBestseller: true, rating: 4.6, reviews: 187 },
  { name: "Sztyblety HKM Free Style", brand: "hkm", category: "buty", kind: "boots", price: 229, description: "Lekkie sztyblety z syntetycznej skóry z zamkiem z przodu. Idealne dla początkujących.", features: ["Zamek z przodu", "Waga 450 g", "Łatwe do czyszczenia"], sizes: SHOES, colors: [C.black], ships24h: true, rating: 4.3, reviews: 322 },

  // ---- BRYCZESY ----
  { name: "Bryczesy Pikeur Candela Grip", brand: "pikeur", category: "bryczesy", kind: "breeches", price: 799, description: "Kultowy krój Pikeur z silikonowym gripem na pełnym lejku. Materiał McCrown z wysoką elastycznością.", features: ["Pełny lej silikonowy", "Materiał McCrown", "Wysoka talia", "Kieszenie z przodu"], sizes: BRYCZESY, colors: [C.navy, C.beige, C.black, C.white], ships24h: true, isBestseller: true, rating: 4.8, reviews: 256 },
  { name: "Bryczesy Schockemöhle Electra Style", brand: "schockemohle", category: "bryczesy", kind: "breeches", price: 599, oldPrice: 699, description: "Sportowe bryczesy z lejem z silikonu i ozdobnymi elementami. Szybkoschnący materiał z ochroną UV.", features: ["Grip silikonowy", "Ochrona UV 50+", "Kieszeń na telefon"], sizes: BRYCZESY, colors: [C.navy, C.grey, C.green], ships24h: true, rating: 4.7, reviews: 122 },
  { name: "Bryczesy HKM Basic Kids", brand: "hkm", category: "bryczesy", kind: "breeches", price: 149, description: "Dziecięce bryczesy z lejem z elastycznego materiału. Trwałe i wygodne na co dzień.", features: ["Lej z materiału", "Elastyczny pas", "Dla dzieci 116-164 cm"], sizes: ["116", "128", "140", "152", "164"], colors: [C.navy, C.black, C.rose], ships24h: true, rating: 4.5, reviews: 210 },

  // ---- KURTKI ----
  { name: "Kurtka Pikeur Sports Waterproof", brand: "pikeur", category: "kurtki", kind: "jacket", price: 1099, description: "Wodoodporna kurtka softshell z kapturem i przewiewnymi wstawkami pod pachami. Rozcięcia z tyłu na siodło.", features: ["Wodoodporność 10 000 mm", "Rozcięcia jeździeckie", "Odpinany kaptur"], sizes: CLOTH, colors: [C.navy, C.black, C.olive], ships24h: true, isNew: true, rating: 4.8, reviews: 37 },
  { name: "Bluza Eskadron Reflexx Sweat", brand: "eskadron", category: "kurtki", kind: "jacket", price: 449, description: "Bluza z kolekcji Reflexx z logo na piersi. Miękka bawełna z domieszką elastanu.", features: ["Bawełna 95%", "Kolekcja sezonowa", "Ściągacze przy rękawach"], sizes: CLOTH, colors: [C.beige, C.navy, C.green], ships24h: true, rating: 4.6, reviews: 88 },
  { name: "Kamizelka Imperial Riding Soft Shell Star", brand: "imperial-riding", category: "kurtki", kind: "jacket", price: 299, oldPrice: 379, description: "Lekka kamizelka softshellowa z ozdobnymi nitami w kształcie gwiazd.", features: ["Softshell", "Wysoki kołnierz", "Dwie kieszenie zamki"], sizes: CLOTH, colors: [C.navy, C.burgundy], ships24h: true, rating: 4.5, reviews: 51 },

  // ---- RĘKAWICZKI ----
  { name: "Rękawiczki Samshield V-Skin", brand: "samshield", category: "rekawiczki", kind: "gloves", price: 249, description: "Bardzo cienkie rękawiczki z syntetycznej skóry z ekranem dotykowym. Wzmocnienia między palcami.", features: ["Kompatybilne z ekranem dotykowym", "Wzmocnienie na wodze", "Oddychające"], sizes: GLOVES, colors: [C.black, C.navy, C.white], ships24h: true, isBestseller: true, rating: 4.7, reviews: 302 },
  { name: "Rękawiczki HKM Winter Grip", brand: "hkm", category: "rekawiczki", kind: "gloves", price: 79, description: "Ocieplane rękawiczki z polaru z silikonowym gripem na dłoni.", features: ["Ocieplenie polarowe", "Grip silikonowy", "Zapięcie na rzep"], sizes: GLOVES, colors: [C.black, C.navy], ships24h: true, rating: 4.3, reviews: 178 },

  // ---- KAMIZELKI ----
  { name: "Kamizelka ochronna KEP Airbag Compact", brand: "kep-italia", category: "kamizelki", kind: "vest", price: 2790, description: "Kamizelka z poduszką powietrzną aktywowaną linką. Ochrona kręgosłupa, żeber i szyi.", features: ["Czas napełnienia 0,1 s", "Wielokrotnego użytku", "Wymienne naboje CO2"], sizes: CLOTH, colors: [C.black], ships24h: false, isNew: true, rating: 4.9, reviews: 18 },
  { name: "Kamizelka HKM Body Protector Level 3", brand: "hkm", category: "kamizelki", kind: "vest", price: 389, description: "Kamizelka ochronna poziomu 3 zgodna z normą EN 13158:2018. Elastyczne panele dopasowują się do ciała.", features: ["Poziom 3 EN 13158", "Regulacja na ramionach i bokach", "Dla dorosłych i dzieci"], sizes: ["CS", "CM", "CL", "S", "M", "L", "XL"], colors: [C.black, C.navy], ships24h: true, rating: 4.5, reviews: 96 },

  // ---- SIODŁA ----
  { name: "Siodło skokowe Prestige X-Perience", brand: "prestige", category: "siodla", kind: "saddle", price: 12900, description: "Siodło skokowe z głębokim siedziskiem i przednimi klockami. Regulowana komora ułatwia dopasowanie.", features: ["Skóra pełna licowa", "Regulowana komora", "Poduszki lateksowe", "Rozmiar siedziska 17\" i 18\""], sizes: ["17", "17.5", "18"], colors: [C.brown, C.black], ships24h: false, rating: 4.9, reviews: 12 },
  { name: "Siodło ujeżdżeniowe Prestige Top Dressage", brand: "prestige", category: "siodla", kind: "saddle", price: 14500, description: "Ujeżdżeniowe siodło z długimi tybinkami i wąską budową, zapewniające bliski kontakt z koniem.", features: ["Głębokie siedzisko", "Długie tybinki", "Skóra Elite", "Wykonane we Włoszech"], sizes: ["17", "17.5", "18"], colors: [C.black, C.brown], ships24h: false, rating: 5, reviews: 8 },
  { name: "Siodło wszechstronne King Glamour Basic", brand: "king-glamour", category: "siodla", kind: "saddle", price: 2490, oldPrice: 2890, description: "Uniwersalne siodło ze skóry na koniach rekreacyjnych. Dobry wybór na pierwsze własne siodło.", features: ["Skóra naturalna", "Drzewo z włókna szklanego", "Komora regulowana przez rymarza"], sizes: ["16.5", "17", "17.5"], colors: [C.brown, C.black], ships24h: true, rating: 4.4, reviews: 39 },

  // ---- OGŁOWIA ----
  { name: "Ogłowie Schockemöhle Equitus Alpha", brand: "schockemohle", category: "oglowia", kind: "bridle", price: 899, description: "Anatomiczne ogłowie z odciążeniem potylicy i nerwów twarzowych. Wodze z gumowym gripem w zestawie.", features: ["Anatomiczny nagłówek", "Skóra bydlęca", "Wodze w zestawie"], sizes: HORSE, colors: [C.black, C.brown], ships24h: true, isBestseller: true, rating: 4.8, reviews: 145 },
  { name: "Ogłowie Kentucky Bridle Ergonomic", brand: "kentucky", category: "oglowia", kind: "bridle", price: 1190, description: "Miękka skóra z podszyciem, szeroki nagłówek odciążający kark i kryształowe zdobienia naczółka.", features: ["Skóra premium", "Poduszka nagłówka", "Naczółek z kryształkami"], sizes: HORSE, colors: [C.black, C.brown], ships24h: true, isNew: true, rating: 4.7, reviews: 42 },
  { name: "Ogłowie HKM Anatomic", brand: "hkm", category: "oglowia", kind: "bridle", price: 249, description: "Anatomiczne ogłowie z zestawem gumowanych wodzy. Dobre wykończenie w niskiej cenie.", features: ["Wodze w zestawie", "Podszycie na nagłówku", "Regulowany nachrapnik"], sizes: HORSE, colors: [C.black, C.brown], ships24h: true, rating: 4.4, reviews: 219 },

  // ---- KANTARY ----
  { name: "Kantar Eskadron Pin Buckle", brand: "eskadron", category: "kantary", kind: "halter", price: 189, description: "Kantar z kolekcji sezonowej Eskadron z ozdobną klamrą i podszyciem na nachrapniku.", features: ["Podszycie z polaru", "Klamra mosiężna", "Kolekcja sezonowa"], sizes: HORSE, colors: [C.navy, C.beige, C.green, C.burgundy], ships24h: true, isBestseller: true, rating: 4.7, reviews: 176 },
  { name: "Kantar skórzany King Glamour Classic", brand: "king-glamour", category: "kantary", kind: "halter", price: 159, description: "Skórzany kantar z mosiężnymi okuciami. Klasyczny wygląd i długa żywotność.", features: ["Skóra naturalna", "Okucia mosiężne", "Podwójne szwy"], sizes: HORSE, colors: [C.brown, C.black], ships24h: true, rating: 4.6, reviews: 84 },
  { name: "Uwiąz Imperial Riding Lucky", brand: "imperial-riding", category: "kantary", kind: "halter", price: 49, description: "Uwiąz z karabińczykiem panic w modnych kolorach kolekcji.", features: ["Karabińczyk panic", "Długość 2 m", "Miękki materiał"], colors: [C.navy, C.rose, C.olive], ships24h: true, rating: 4.5, reviews: 132 },

  // ---- DERKI ----
  { name: "Derka Horseware Rambo Original 200 g", brand: "horseware", category: "derki", kind: "blanket", price: 1290, description: "Legendarna derka padokowa 1000D z wypełnieniem 200 g. Kroj Original z zapięciem na piersi Rambo.", features: ["Wodoodporna 1000D", "Wypełnienie 200 g", "Klapa na ogon", "Gwarancja 3 lata"], sizes: RUG, colors: [C.navy, C.green], ships24h: true, isBestseller: true, rating: 4.9, reviews: 233 },
  { name: "Derka Kentucky Turnout All Weather 150 g", brand: "kentucky", category: "derki", kind: "blanket", price: 1490, oldPrice: 1690, description: "Derka padokowa 1680D z systemem wentylacji i podszyciem chroniącym przed otarciami.", features: ["Wytrzymałość 1680D", "Wodoodporna", "Podszycie antyotarciowe"], sizes: RUG, colors: [C.navy, C.grey], ships24h: true, rating: 4.8, reviews: 67 },
  { name: "Derka polarowa Eskadron Classic Sports", brand: "eskadron", category: "derki", kind: "blanket", price: 449, description: "Ciepła i lekka derka polarowa do transportu i po treningu. Haftowane logo Eskadron.", features: ["Polar 350 g/m²", "Zapięcie na piersi", "Regulowane pasy"], sizes: RUG, colors: [C.navy, C.beige, C.green], ships24h: true, rating: 4.7, reviews: 158 },
  { name: "Derka przeciwmuchowa HKM Fly Sheet", brand: "hkm", category: "derki", kind: "blanket", price: 219, description: "Lekka siatkowa derka z osłoną szyi chroniąca przed owadami na pastwisku.", features: ["Siatka oddychająca", "Osłona szyi", "Klapa na ogon"], sizes: RUG, colors: [C.grey, C.white], ships24h: true, rating: 4.3, reviews: 201 },

  // ---- OCHRANIACZE ----
  { name: "Ochraniacze Kentucky Air Tendon", brand: "kentucky", category: "ochraniacze", kind: "boot", price: 749, description: "Lekkie ochraniacze na ścięgna z wentylowaną skorupą i podszyciem Vegan Sheepskin.", features: ["Wentylowana skorupa", "Podszycie Vegan Sheepskin", "Zapięcie na dwa paski"], sizes: BOOTS, colors: [C.black, C.brown, C.white], ships24h: true, isBestseller: true, rating: 4.8, reviews: 189 },
  { name: "Ochraniacze Eskadron Flexisoft", brand: "eskadron", category: "ochraniacze", kind: "boot", price: 389, description: "Klasyczne ochraniacze z anatomicznym kształtem i miękkim neoprenem.", features: ["Neopren 3 mm", "Anatomiczny kształt", "Rzepy o dużej wytrzymałości"], sizes: BOOTS, colors: [C.navy, C.black, C.beige], ships24h: true, rating: 4.7, reviews: 143 },
  { name: "Kalosze Kentucky Solimbra", brand: "kentucky", category: "ochraniacze", kind: "boot", price: 549, description: "Kalosze skokowe z wkładką Solimbra chroniącą przed urazami i wodą.", features: ["Ochrona wodoodporna", "Podszycie Vegan Sheepskin", "Zapięcie elastyczne"], sizes: BOOTS, colors: [C.black, C.brown], ships24h: true, rating: 4.8, reviews: 77 },
  { name: "Bandaże polarowe HKM 4 szt.", brand: "hkm", category: "ochraniacze", kind: "boot", price: 69, description: "Komplet czterech bandaży polarowych z zapięciem na rzep.", features: ["Komplet 4 szt.", "Długość 3 m", "Rzep wysokiej jakości"], colors: [C.navy, C.black, C.rose, C.beige], ships24h: true, rating: 4.5, reviews: 412 },

  // ---- CZAPRAKI ----
  { name: "Czaprak Eskadron Cotton Reflexx", brand: "eskadron", category: "czapraki", kind: "saddlepad", price: 349, description: "Czaprak z limitowanej kolekcji Reflexx. Pikowana bawełna i haftowane logo.", features: ["Bawełna 100%", "Kolekcja sezonowa", "Skokowy / ujeżdżeniowy"], sizes: ["Skokowy", "Ujeżdżeniowy"], colors: [C.beige, C.navy, C.green], ships24h: true, isNew: true, rating: 4.8, reviews: 91 },
  { name: "Czaprak Kentucky Velvet", brand: "kentucky", category: "czapraki", kind: "saddlepad", price: 449, description: "Aksamitny czaprak z antypoślizgowym spodem i pikowaniem w romby.", features: ["Aksamit", "Antypoślizgowy spód", "Szybkoschnący"], sizes: ["Skokowy", "Ujeżdżeniowy"], colors: [C.navy, C.burgundy, C.green], ships24h: true, rating: 4.7, reviews: 54 },
  { name: "Czaprak HKM Cotton Basic", brand: "hkm", category: "czapraki", kind: "saddlepad", price: 89, description: "Podstawowy bawełniany czaprak w wielu kolorach.", features: ["Bawełna", "Pikowanie", "Można prać w 30°C"], sizes: ["Skokowy", "Ujeżdżeniowy"], colors: [C.navy, C.black, C.white, C.rose], ships24h: true, rating: 4.4, reviews: 366 },

  // ---- PIELĘGNACJA ----
  { name: "Zestaw szczotek Imperial Riding Grooming Kit", brand: "imperial-riding", category: "pielegnacja", kind: "brush", price: 179, description: "Kompletny zestaw pielęgnacyjny w torbie: zgrzebło, szczotka miękka i twarda, grzebień, kopystka.", features: ["6 elementów", "Torba w zestawie", "Kolory kolekcji"], colors: [C.navy, C.rose, C.olive], ships24h: true, isBestseller: true, rating: 4.6, reviews: 248 },
  { name: "Szczotka miękka King Glamour Natural", brand: "king-glamour", category: "pielegnacja", kind: "brush", price: 39, description: "Miękka szczotka z naturalnego włosia na drewnianym korpusie.", features: ["Włosie naturalne", "Drewno bukowe", "Pasek na dłoń"], colors: [C.brown], ships24h: true, rating: 4.7, reviews: 129 },
  { name: "Szampon HKM Shiny Coat 500 ml", brand: "hkm", category: "pielegnacja", kind: "brush", price: 45, description: "Delikatny szampon nadający połysk sierści i ułatwiający rozczesywanie ogona.", features: ["500 ml", "pH neutralne", "Zapach jabłkowy"], colors: [C.white], ships24h: true, rating: 4.5, reviews: 88 },

  // ---- ŻYWIENIE ----
  { name: "Musli St. Hippolyt Struktur E 20 kg", brand: "st-hippolyt", category: "zywienie", kind: "feed", price: 189, description: "Pasza strukturalna bez owsa dla koni w umiarkowanym treningu. Wysoka zawartość włókna.", features: ["20 kg", "Bez owsa", "Z olejem lnianym"], colors: [C.beige], ships24h: true, isBestseller: true, rating: 4.8, reviews: 174 },
  { name: "Suplement St. Hippolyt MicroVital 3 kg", brand: "st-hippolyt", category: "zywienie", kind: "supplement", price: 219, description: "Kompleks witamin i minerałów uzupełniający dietę opartą na sianie.", features: ["3 kg", "Witaminy i mikroelementy", "Bez cukru i melasy"], colors: [C.beige], ships24h: true, rating: 4.9, reviews: 92 },
  { name: "Lizawka mineralna King Glamour 10 kg", brand: "king-glamour", category: "zywienie", kind: "supplement", price: 59, description: "Lizawka solna z minerałami dla koni na padoku i w boksie.", features: ["10 kg", "Z uchwytem", "Sól kamienna"], colors: [C.white], ships24h: true, rating: 4.6, reviews: 61 },

  // ---- STAJNIA ----
  { name: "Siatka na siano drobne oczka King Glamour", brand: "king-glamour", category: "siatki", kind: "haynet", price: 49, description: "Siatka o oczkach 3 cm spowalniająca jedzenie. Wzmocniony sznur.", features: ["Oczka 3 cm", "Pojemność 8 kg", "Sznur PP 5 mm"], colors: [C.green, C.black], ships24h: true, rating: 4.5, reviews: 289 },
  { name: "Wiadro płaskie HKM 18 l", brand: "hkm", category: "wiadra", kind: "bucket", price: 39, description: "Elastyczne wiadro do wody i paszy. Odporne na mróz.", features: ["18 litrów", "Odporne na mróz", "Uchwyt metalowy"], colors: [C.navy, C.green, C.rose], ships24h: true, rating: 4.4, reviews: 158 },
  { name: "Karmnik narożny King Glamour 25 l", brand: "king-glamour", category: "wiadra", kind: "bucket", price: 119, description: "Trwały karmnik narożny do montażu w boksie. Zaokrąglone krawędzie.", features: ["25 litrów", "Montaż w narożniku", "Polietylen"], colors: [C.green, C.black], ships24h: true, rating: 4.6, reviews: 73 },
  { name: "Zabawka Jolly Ball Horse", brand: "king-glamour", category: "zabawki", kind: "toy", price: 129, description: "Wytrzymała piłka z uchwytem do zabawy w boksie i na padoku.", features: ["Średnica 25 cm", "Bardzo wytrzymała", "Zapach jabłkowy"], colors: [C.blue, C.burgundy, C.green], ships24h: true, rating: 4.7, reviews: 194 },
  { name: "Elektryzator King Glamour Power 2 J", brand: "king-glamour", category: "ogrodzenia", kind: "fence", price: 349, description: "Sieciowy elektryzator do ogrodzeń o długości do 12 km. Wskaźnik napięcia.", features: ["Energia 2 J", "Do 12 km ogrodzenia", "Zasilanie 230 V"], colors: [C.black], ships24h: false, rating: 4.5, reviews: 47 },
  { name: "Taśma ogrodzeniowa 40 mm / 200 m", brand: "king-glamour", category: "ogrodzenia", kind: "fence", price: 89, description: "Taśma z 8 przewodnikami ze stali nierdzewnej. Odporna na UV.", features: ["200 m", "8 przewodników", "Odporna na UV"], colors: [C.white, C.green], ships24h: true, rating: 4.4, reviews: 112 },

  // ---- SPECJALISTYCZNE ----
  { name: "Hobby horse King Glamour Champion", brand: "king-glamour", category: "hobby-horse", kind: "hobbyhorse", price: 249, description: "Ręcznie szyty hobby horse z kantarem i uzdą. Kij o długości 100 cm.", features: ["Ręcznie szyty", "Ogłowie w zestawie", "Kij 100 cm"], colors: [C.brown, C.black, C.beige], ships24h: true, isNew: true, rating: 4.9, reviews: 58 },
  { name: "Ogłowie hobby horse Imperial Riding Glitter", brand: "imperial-riding", category: "hobby-horse", kind: "hobbyhorse", price: 69, description: "Ozdobne ogłowie z wodzami dla hobby horse.", features: ["Brokatowe wykończenie", "Regulowane", "Z wodzami"], colors: [C.rose, C.navy], ships24h: true, rating: 4.7, reviews: 44 },
  { name: "Smycz Kentucky Dogwear Handmade Pearls", brand: "kentucky", category: "dla-psa", kind: "dog", price: 199, description: "Elegancka smycz z kolekcji Kentucky Dogwear z perełkami. Skóra i mosiądz.", features: ["Skóra", "Mosiężny karabińczyk", "Długość 120 cm"], colors: [C.navy, C.brown, C.rose], ships24h: true, rating: 4.8, reviews: 36 },
  { name: "Legowisko Kentucky Dog Bed Soft Sleep", brand: "kentucky", category: "dla-psa", kind: "dog", price: 449, description: "Miękkie legowisko z odpinanym, pranym pokrowcem.", features: ["Pokrowiec zdejmowany", "Wypełnienie z pianki", "Rozmiary S-L"], sizes: ["S", "M", "L"], colors: [C.grey, C.navy], ships24h: true, rating: 4.7, reviews: 29 },
];

export const products: Product[] = seeds.map((s, i) => ({
  ...s,
  id: `p${String(i + 1).padStart(3, "0")}`,
  slug: slugify(s.name),
  sku: `KG-${String(i + 1).padStart(4, "0")}`,
  colors: s.colors ?? [C.black],
  lowestPrice30d: s.oldPrice ? (s.lowestPrice30d ?? s.price) : undefined,
  rating: s.rating ?? 4.5,
  reviews: s.reviews ?? 12,
  stock: s.stock ?? (s.ships24h ? 12 : 3),
}));

export const kindLabels: Record<ProductKind, string> = {
  helmet: "Kask",
  boots: "Buty",
  breeches: "Bryczesy",
  jacket: "Odzież",
  gloves: "Rękawiczki",
  vest: "Kamizelka",
  saddle: "Siodło",
  bridle: "Ogłowie",
  halter: "Kantar",
  blanket: "Derka",
  boot: "Ochraniacze",
  saddlepad: "Czaprak",
  brush: "Pielęgnacja",
  feed: "Pasza",
  supplement: "Suplement",
  haynet: "Siatka",
  bucket: "Wiadro",
  toy: "Zabawka",
  fence: "Ogrodzenie",
  hobbyhorse: "Hobby horse",
  dog: "Dla psa",
};

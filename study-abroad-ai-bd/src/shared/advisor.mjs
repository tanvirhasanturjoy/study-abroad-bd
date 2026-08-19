const countries = [
  // ── ASIA-PACIFIC ──────────────────────────────────────────────────────────
  {
    country: 'Malaysia',
    yearlyNeedBdt: 1500000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Lowest practical cost for BD students', 'Fast admissions process', 'Many English-taught degrees'],
    universities: ['Taylor University', 'Asia Pacific University', 'INTI International University']
  },
  {
    country: 'China',
    yearlyNeedBdt: 1200000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very low tuition and living costs', 'Chinese government scholarships available', 'Many English-medium programs'],
    universities: ['Beijing Language and Culture University', 'Zhejiang University', 'Tongji University']
  },
  {
    country: 'Japan',
    yearlyNeedBdt: 2800000,
    minIelts: 5.5,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['High-quality education system', 'Part-time work allowed up to 28 hrs/week', 'Safe and organised country'],
    universities: ['Ritsumeikan Asia Pacific University', 'University of Aizu', 'Soka University']
  },
  {
    country: 'South Korea',
    yearlyNeedBdt: 2200000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Government scholarships (KGSP) available', 'Strong tech industry for internships', 'Affordable living in most cities'],
    universities: ['Korea University', 'Sungkyunkwan University', 'Keimyung University']
  },
  {
    country: 'Taiwan',
    yearlyNeedBdt: 1800000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 2,
    strengths: ['Affordable tuition with scholarships', 'Safe environment for students', 'English-taught programs in tech and business'],
    universities: ['National Taiwan University', 'Tamkang University', 'Feng Chia University']
  },
  {
    country: 'Singapore',
    yearlyNeedBdt: 3600000,
    minIelts: 6.5,
    minGpa: 3.5,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['World-class universities', 'Strong job market post-graduation', 'English-speaking hub in Asia'],
    universities: ['National University of Singapore', 'Nanyang Technological University', 'Singapore Management University']
  },
  {
    country: 'Thailand',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very low cost of living', 'Easy visa process', 'Growing international programs'],
    universities: ['Mahidol University', 'Chulalongkorn University', 'Asian Institute of Technology']
  },
  {
    country: 'Indonesia',
    yearlyNeedBdt: 900000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Extremely affordable', 'Welcoming to Muslim students', 'Growing higher education sector'],
    universities: ['Universitas Indonesia', 'Bandung Institute of Technology', 'Universitas Gadjah Mada']
  },
  {
    country: 'Philippines',
    yearlyNeedBdt: 1000000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Low tuition for medical and nursing degrees', 'Friendly visa process'],
    universities: ['University of Santo Tomas', 'University of the Philippines', 'De La Salle University']
  },
  {
    country: 'Vietnam',
    yearlyNeedBdt: 900000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable living costs', 'Growing number of English-taught programs', 'Easy admission process'],
    universities: ['Vietnam National University', 'Ho Chi Minh City University of Technology', 'Hanoi University of Science and Technology']
  },
  {
    country: 'India',
    yearlyNeedBdt: 800000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['No IELTS needed for most programs', 'Affordable world-class institutions', 'Strong engineering and IT degrees'],
    universities: ['Manipal Academy of Higher Education', 'VIT University', 'SRM Institute of Science and Technology']
  },
  {
    country: 'Sri Lanka',
    yearlyNeedBdt: 700000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very low cost', 'English-medium programs available', 'Culturally familiar for BD students'],
    universities: ['University of Colombo', 'University of Moratuwa', 'University of Kelaniya']
  },
  {
    country: 'Nepal',
    yearlyNeedBdt: 700000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Lowest cost option in the region', 'Easy admission', 'Familiar cultural setting'],
    universities: ['Kathmandu University', 'Tribhuvan University', 'Pokhara University']
  },
  {
    country: 'Myanmar',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Low cost of living', 'Easy admission for Bangladesh students', 'Medical programs available'],
    universities: ['University of Medicine 1 Yangon', 'Yangon University', 'Mandalay University of Distance Education']
  },
  {
    country: 'Cambodia',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable tuition', 'English-medium programs', 'Easy student visa'],
    universities: ['Royal University of Phnom Penh', 'Cambodia University of Technology and Science', 'Paññāsāstra University']
  },
  {
    country: 'Brunei',
    yearlyNeedBdt: 1500000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Low-cost quality education', 'Muslim-friendly country', 'Scholarships from government available'],
    universities: ['Universiti Brunei Darussalam', 'Universiti Islam Sultan Sharif Ali', 'Universiti Teknologi Brunei']
  },
  {
    country: 'Mongolia',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very low tuition', 'Easy admission', 'Growing number of English programs'],
    universities: ['National University of Mongolia', 'Mongolian University of Science and Technology', 'University of the Humanities']
  },
  {
    country: 'Australia',
    yearlyNeedBdt: 4600000,
    minIelts: 6.5,
    minGpa: 3.5,
    visaRisk: 'High',
    prScore: 4,
    strengths: ['Good post-study work visa options', 'Strong student support services', 'Popular destination for BD students'],
    universities: ['University of Wollongong', 'Deakin University', 'La Trobe University']
  },
  {
    country: 'New Zealand',
    yearlyNeedBdt: 3800000,
    minIelts: 6.0,
    minGpa: 3.3,
    visaRisk: 'Medium-high',
    prScore: 3,
    strengths: ['Post-study work visa for 3 years', 'Safe and welcoming environment', 'High quality of life'],
    universities: ['University of Waikato', 'Massey University', 'Auckland University of Technology']
  },
  {
    country: 'Papua New Guinea',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['English-medium education', 'Low competition for seats', 'Pacific region experience'],
    universities: ['University of Papua New Guinea', 'Papua New Guinea University of Technology', 'University of Natural Resources and Environment']
  },
  {
    country: 'Fiji',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English medium', 'Affordable Pacific island option', 'Easy student visa'],
    universities: ['University of the South Pacific', 'Fiji National University', 'University of Fiji']
  },
  {
    country: 'Hong Kong',
    yearlyNeedBdt: 3200000,
    minIelts: 6.5,
    minGpa: 3.5,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Top-ranked universities in Asia', 'Scholarships available for merit students', 'International financial hub'],
    universities: ['Hong Kong Polytechnic University', 'City University of Hong Kong', 'Hong Kong Baptist University']
  },

  // ── EUROPE ────────────────────────────────────────────────────────────────
  {
    country: 'Germany',
    yearlyNeedBdt: 1900000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 4,
    strengths: ['Low tuition fees at public universities', 'Strong engineering and CS programs', 'Good long-term settlement pathway'],
    universities: ['IU International University', 'Constructor University', 'SRH Universities']
  },
  {
    country: 'France',
    yearlyNeedBdt: 2100000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Low tuition at public universities', 'Strong business and engineering schools', 'Campus France support for BD students'],
    universities: ['Université de Paris', 'Grenoble INP', 'Université de Lyon']
  },
  {
    country: 'Netherlands',
    yearlyNeedBdt: 2500000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Many English-taught degree programs', 'Liberal student work rights', 'Strong international student community'],
    universities: ['University of Twente', 'Hanze University of Applied Sciences', 'Wittenborg University']
  },
  {
    country: 'Belgium',
    yearlyNeedBdt: 2200000,
    minIelts: 6.0,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Affordable EU education', 'English-medium programs available', 'Central European location'],
    universities: ['KU Leuven', 'Ghent University', 'Vrije Universiteit Brussel']
  },
  {
    country: 'Sweden',
    yearlyNeedBdt: 2600000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Many English master programs', 'Research-focused universities', 'Good social environment'],
    universities: ['Malmö University', 'Linnaeus University', 'University West']
  },
  {
    country: 'Norway',
    yearlyNeedBdt: 2800000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Free tuition at public universities', 'High quality of life', 'Part-time work up to 20 hrs/week'],
    universities: ['University of Stavanger', 'University of Agder', 'Norwegian University of Life Sciences']
  },
  {
    country: 'Denmark',
    yearlyNeedBdt: 2700000,
    minIelts: 6.5,
    minGpa: 3.3,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['High-quality education system', 'Good work-life balance', 'English widely spoken'],
    universities: ['Aalborg University', 'University of Southern Denmark', 'Roskilde University']
  },
  {
    country: 'Finland',
    yearlyNeedBdt: 2400000,
    minIelts: 6.0,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Strong STEM and technology programs', 'Affordable living outside Helsinki', 'Welcoming student culture'],
    universities: ['University of Oulu', 'University of Vaasa', 'Tampere University']
  },
  {
    country: 'Switzerland',
    yearlyNeedBdt: 3500000,
    minIelts: 6.5,
    minGpa: 3.5,
    visaRisk: 'Medium-high',
    prScore: 2,
    strengths: ['World-class research institutions', 'High graduate salaries', 'Multicultural environment'],
    universities: ['ETH Zurich', 'University of Zurich', 'University of Geneva']
  },
  {
    country: 'Austria',
    yearlyNeedBdt: 2200000,
    minIelts: 6.0,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Affordable public universities', 'Central European hub', 'Strong arts and science programs'],
    universities: ['University of Vienna', 'Vienna University of Technology', 'University of Graz']
  },
  {
    country: 'Italy',
    yearlyNeedBdt: 2000000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['English-taught master programs', 'Low tuition at public universities', 'Rich academic tradition'],
    universities: ['University of Bologna', 'Politecnico di Milano', 'University of Padua']
  },
  {
    country: 'Spain',
    yearlyNeedBdt: 1900000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable living costs', 'Growing English-taught programs', 'Warm and welcoming culture'],
    universities: ['IE University', 'Universidad de Navarra', 'Universidad Autónoma de Madrid']
  },
  {
    country: 'Portugal',
    yearlyNeedBdt: 1700000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable EU destination', 'Post-study visa pathways', 'English widely spoken in cities'],
    universities: ['University of Lisbon', 'University of Porto', 'Nova University Lisbon']
  },
  {
    country: 'Ireland',
    yearlyNeedBdt: 3200000,
    minIelts: 6.0,
    minGpa: 3.3,
    visaRisk: 'Medium-high',
    prScore: 3,
    strengths: ['Strong tech company hub', 'Post-study work visa available', 'English-speaking EU country'],
    universities: ['University College Dublin', 'University of Limerick', 'Dublin City University']
  },
  {
    country: 'Poland',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Low tuition fees', 'Growing English programs', 'EU residence possibilities'],
    universities: ['Warsaw University of Technology', 'AGH University', 'University of Warsaw']
  },
  {
    country: 'Hungary',
    yearlyNeedBdt: 1700000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Stipendium Hungaricum scholarship available', 'English-medium programs in medicine', 'Affordable central Europe'],
    universities: ['University of Debrecen', 'University of Pécs', 'Eötvös Loránd University']
  },
  {
    country: 'Czech Republic',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable EU education', 'Growing English-medium programs', 'Rich student life in Prague'],
    universities: ['Charles University', 'Czech Technical University', 'Brno University of Technology']
  },
  {
    country: 'Romania',
    yearlyNeedBdt: 1400000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Very affordable EU education', 'Medical and engineering programs in English', 'Easy admission process'],
    universities: ['University of Medicine and Pharmacy Cluj', 'Babes-Bolyai University', 'Politehnica University Timisoara']
  },
  {
    country: 'Bulgaria',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Lowest-cost EU destination', 'Medical degrees in English', 'EU degree recognition'],
    universities: ['Medical University of Sofia', 'Medical University Varna', 'Sofia University']
  },
  {
    country: 'Greece',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable Mediterranean living', 'EU academic recognition', 'English-taught programs growing'],
    universities: ['University of Athens', 'Aristotle University of Thessaloniki', 'University of Crete']
  },
  {
    country: 'Cyprus',
    yearlyNeedBdt: 2000000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['English-medium programs', 'EU degree recognition', 'Safe island environment'],
    universities: ['University of Cyprus', 'Cyprus University of Technology', 'European University Cyprus']
  },
  {
    country: 'Malta',
    yearlyNeedBdt: 2200000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['English-speaking EU country', 'Small and safe island', 'English-medium programs'],
    universities: ['University of Malta', 'Malta College of Arts, Science and Technology', 'American University of Malta']
  },
  {
    country: 'Slovakia',
    yearlyNeedBdt: 1500000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 2,
    strengths: ['Affordable EU education', 'Medical programs in English', 'Low cost of living'],
    universities: ['Comenius University Bratislava', 'Slovak University of Technology', 'University of Žilina']
  },
  {
    country: 'Slovenia',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable EU destination', 'Free public university for non-EU in select programs', 'English programs growing'],
    universities: ['University of Ljubljana', 'University of Maribor', 'University of Nova Gorica']
  },
  {
    country: 'Croatia',
    yearlyNeedBdt: 1500000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable EU education', 'English-taught programs available', 'Beautiful student life environment'],
    universities: ['University of Zagreb', 'University of Rijeka', 'University of Split']
  },
  {
    country: 'Estonia',
    yearlyNeedBdt: 1700000,
    minIelts: 6.0,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Digital-first society', 'English-medium programs', 'EU e-residency benefits'],
    universities: ['University of Tartu', 'Tallinn University of Technology', 'Tallinn University']
  },
  {
    country: 'Latvia',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Affordable EU option', 'Medical and IT programs in English', 'EU recognition'],
    universities: ['University of Latvia', 'Riga Technical University', 'Rīga Stradiņš University']
  },
  {
    country: 'Lithuania',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 2,
    strengths: ['Low cost EU country', 'English-taught programs', 'Growing tech sector'],
    universities: ['Vilnius University', 'Kaunas University of Technology', 'Vytautas Magnus University']
  },
  {
    country: 'Serbia',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable tuition', 'Medical programs in English', 'Easy admission process'],
    universities: ['University of Belgrade', 'University of Novi Sad', 'University of Niš']
  },
  {
    country: 'Bosnia and Herzegovina',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable education', 'Muslim-friendly country', 'Easy admission'],
    universities: ['University of Sarajevo', 'University of Tuzla', 'International University of Sarajevo']
  },
  {
    country: 'North Macedonia',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Lowest-cost Balkan option', 'Easy admission for BD students', 'English-taught programs available'],
    universities: ['Ss. Cyril and Methodius University', 'State University of Tetova', 'University of Information Science and Technology']
  },
  {
    country: 'Albania',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable destination', 'Muslim-majority country', 'Growing number of programs'],
    universities: ['University of Tirana', 'Polytechnic University of Tirana', 'European University of Tirana']
  },
  {
    country: 'Kosovo',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority country', 'English-medium programs'],
    universities: ['University of Pristina', 'University for Business and Technology', 'Rochester Institute of Technology Kosovo']
  },
  {
    country: 'Montenegro',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable Adriatic destination', 'English-taught programs', 'Relaxed visa process'],
    universities: ['University of Montenegro', 'Mediterranean University', 'University of Donja Gorica']
  },
  {
    country: 'Turkey',
    yearlyNeedBdt: 1100000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 2,
    strengths: ['Türkiye Burslari scholarship widely available', 'Muslim-friendly country', 'Strong medical and engineering programs'],
    universities: ['Middle East Technical University', 'Ankara University', 'Istanbul University']
  },
  {
    country: 'Russia',
    yearlyNeedBdt: 1200000,
    minIelts: 0.0,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Low tuition fees', 'Russian government scholarships available', 'Strong engineering and science programs'],
    universities: ['RUDN University', 'Peoples Friendship University of Russia', 'Kazan Federal University']
  },
  {
    country: 'Georgia',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable medical programs', 'Easy student visa', 'Muslim-friendly Caucasus country'],
    universities: ['Tbilisi State Medical University', 'University of Georgia', 'Caucasus University']
  },
  {
    country: 'Armenia',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable education', 'Easy admission', 'Medical programs popular for international students'],
    universities: ['Yerevan State Medical University', 'American University of Armenia', 'Yerevan State University']
  },
  {
    country: 'Azerbaijan',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority country', 'Affordable living costs', 'Oil-sector scholarships available'],
    universities: ['Baku State University', 'Azerbaijan State Oil and Industry University', 'ADA University']
  },
  {
    country: 'Kazakhstan',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable options', 'Muslim-majority country', 'Bolashak scholarship for high achievers'],
    universities: ['Nazarbayev University', 'Al-Farabi Kazakh National University', 'Kazakh-British Technical University']
  },
  {
    country: 'Kyrgyzstan',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Extremely affordable education', 'Popular for medical degrees', 'Easy admission for BD students'],
    universities: ['Kyrgyz State Medical Academy', 'International School of Medicine', 'Osh State University']
  },
  {
    country: 'Tajikistan',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very low cost', 'Muslim country', 'Medical programs accessible'],
    universities: ['Tajik State Medical University', 'Tajik National University', 'University of Central Asia']
  },
  {
    country: 'Uzbekistan',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable Muslim-majority country', 'Branch campuses of international universities', 'Easy student visa'],
    universities: ['Westminster International University Tashkent', 'Turin Polytechnic University Tashkent', 'Inha University Tashkent']
  },
  {
    country: 'Belarus',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Very affordable education', 'Medical and engineering programs', 'Low cost of living'],
    universities: ['Belarusian State Medical University', 'Belarusian State University', 'Belarusian National Technical University']
  },
  {
    country: 'Moldova',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable European education', 'Medical programs in English', 'Low competition'],
    universities: ['State University of Moldova', 'State Medical and Pharmaceutical University', 'Technical University of Moldova']
  },
  {
    country: 'Ukraine',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'High',
    prScore: 1,
    strengths: ['Historically affordable medical programs', 'English-medium programs available', 'Low tuition'],
    universities: ['Bogomolets National Medical University', 'V.N. Karazin Kharkiv National University', 'Sumy State University']
  },
  {
    country: 'Luxembourg',
    yearlyNeedBdt: 2800000,
    minIelts: 6.5,
    minGpa: 3.3,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['Multilingual EU country', 'Financial sector opportunities', 'Quality research university'],
    universities: ['University of Luxembourg']
  },
  {
    country: 'Iceland',
    yearlyNeedBdt: 2900000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium',
    prScore: 3,
    strengths: ['No tuition at public universities', 'Safe and progressive society', 'Unique research opportunities'],
    universities: ['University of Iceland', 'Reykjavik University', 'University of Akureyri']
  },

  // ── MIDDLE EAST ───────────────────────────────────────────────────────────
  {
    country: 'United Arab Emirates',
    yearlyNeedBdt: 2500000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Large Bangladeshi community', 'Strong job market post-graduation', 'English-medium universities'],
    universities: ['University of Sharjah', 'Ajman University', 'American University in Dubai']
  },
  {
    country: 'Saudi Arabia',
    yearlyNeedBdt: 1500000,
    minIelts: 5.0,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Saudi government scholarships available', 'Islamic studies hub', 'Low living cost for scholarship holders'],
    universities: ['King Abdulaziz University', 'King Fahd University of Petroleum and Minerals', 'Prince Sultan University']
  },
  {
    country: 'Qatar',
    yearlyNeedBdt: 2000000,
    minIelts: 6.0,
    minGpa: 3.2,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Branch campuses of top global universities', 'Qatar Foundation scholarships', 'Modern facilities'],
    universities: ['Qatar University', 'Carnegie Mellon University Qatar', 'Texas A&M University Qatar']
  },
  {
    country: 'Kuwait',
    yearlyNeedBdt: 1800000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Muslim-majority Gulf state', 'Large BD community', 'Scholarships from Kuwait government'],
    universities: ['Kuwait University', 'Gulf University for Science and Technology', 'American University of Kuwait']
  },
  {
    country: 'Bahrain',
    yearlyNeedBdt: 1600000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Affordable Gulf option', 'English-medium universities', 'Close to Saudi Arabia'],
    universities: ['University of Bahrain', 'Royal University for Women', 'Applied Science University']
  },
  {
    country: 'Oman',
    yearlyNeedBdt: 1700000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Peaceful Gulf destination', 'English-medium universities', 'Large BD expat community'],
    universities: ['Sultan Qaboos University', 'German University of Technology', 'Sohar University']
  },
  {
    country: 'Jordan',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority country', 'Affordable living', 'Arab-BD cultural similarities'],
    universities: ['University of Jordan', 'Jordan University of Science and Technology', 'German Jordanian University']
  },
  {
    country: 'Lebanon',
    yearlyNeedBdt: 1400000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Strong academic tradition', 'English and French programs', 'Mediterranean lifestyle'],
    universities: ['American University of Beirut', 'Lebanese American University', 'Saint Joseph University']
  },
  {
    country: 'Iran',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority country', 'Strong science programs'],
    universities: ['University of Tehran', 'Sharif University of Technology', 'Amirkabir University of Technology']
  },
  {
    country: 'Iraq',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority', 'Medical programs available'],
    universities: ['University of Baghdad', 'University of Basrah', 'Al-Nahrain University']
  },

  // ── AFRICA ────────────────────────────────────────────────────────────────
  {
    country: 'Egypt',
    yearlyNeedBdt: 900000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority country', 'Al-Azhar University Islamic programs'],
    universities: ['Cairo University', 'Al-Azhar University', 'Ain Shams University']
  },
  {
    country: 'Morocco',
    yearlyNeedBdt: 1000000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority country', 'French and English programs', 'Affordable living'],
    universities: ['Mohammed V University', 'Hassan II University', 'Al Akhawayn University']
  },
  {
    country: 'Tunisia',
    yearlyNeedBdt: 900000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Affordable North African option', 'Muslim-majority', 'French and English programs'],
    universities: ['University of Tunis', 'University of Sfax', 'University of Sousse']
  },
  {
    country: 'Algeria',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Free public university education', 'Muslim-majority country', 'Affordable living'],
    universities: ['University of Algiers', 'University of Oran', 'University of Constantine']
  },
  {
    country: 'Libya',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'High',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority', 'Medical programs available'],
    universities: ['University of Tripoli', 'University of Benghazi', 'Omar Al-Mukhtar University']
  },
  {
    country: 'Sudan',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'High',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority', 'Medical programs available'],
    universities: ['University of Khartoum', 'Omdurman Islamic University', 'Sudan University of Science and Technology']
  },
  {
    country: 'Ethiopia',
    yearlyNeedBdt: 800000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Growing university sector', 'Easy admission'],
    universities: ['Addis Ababa University', 'Jimma University', 'Bahir Dar University']
  },
  {
    country: 'Kenya',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'African tech hub', 'Affordable living'],
    universities: ['University of Nairobi', 'Kenyatta University', 'Strathmore University']
  },
  {
    country: 'Uganda',
    yearlyNeedBdt: 800000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Very affordable', 'Easy admission process'],
    universities: ['Makerere University', 'Uganda Christian University', 'Kampala International University']
  },
  {
    country: 'Tanzania',
    yearlyNeedBdt: 850000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium programs', 'Very affordable', 'Peaceful environment'],
    universities: ['University of Dar es Salaam', 'Muhimbili University of Health and Allied Sciences', 'Sokoine University of Agriculture']
  },
  {
    country: 'Rwanda',
    yearlyNeedBdt: 1000000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Fastest growing African economy', 'English-medium programs', 'Safe and clean country'],
    universities: ['University of Rwanda', 'African Leadership University', 'University of Kigali']
  },
  {
    country: 'Ghana',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking West Africa', 'Affordable', 'Growing tech sector'],
    universities: ['University of Ghana', 'Kwame Nkrumah University of Science and Technology', 'University of Cape Coast']
  },
  {
    country: 'Nigeria',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['English-medium education', 'Largest African economy', 'Growing universities'],
    universities: ['University of Lagos', 'Obafemi Awolowo University', 'University of Ibadan']
  },
  {
    country: 'Senegal',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority West Africa', 'French and English programs', 'Peaceful country'],
    universities: ['Cheikh Anta Diop University', 'University Gaston Berger', 'Université de Thiès']
  },
  {
    country: 'Cameroon',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Bilingual English-French', 'Affordable education', 'Medical programs'],
    universities: ['University of Yaoundé I', 'University of Buea', 'University of Douala']
  },
  {
    country: 'South Africa',
    yearlyNeedBdt: 1300000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Best universities in Africa', 'English-medium education', 'Affordable compared to western countries'],
    universities: ['University of Cape Town', 'University of the Witwatersrand', 'University of Pretoria']
  },
  {
    country: 'Mauritius',
    yearlyNeedBdt: 1400000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium programs', 'Stable island economy', 'Muslim-friendly environment'],
    universities: ['University of Mauritius', 'Université des Mascareignes', 'Charles Telfair Institute']
  },
  {
    country: 'Botswana',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium', 'Stable and peaceful', 'Growing higher education'],
    universities: ['University of Botswana', 'Botswana International University of Science and Technology', 'Limkokwing University Botswana']
  },
  {
    country: 'Namibia',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Peaceful and stable', 'Affordable southern Africa'],
    universities: ['University of Namibia', 'Namibia University of Science and Technology', 'International University of Management']
  },
  {
    country: 'Zimbabwe',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['English-medium education', 'Very affordable', 'Good medical programs'],
    universities: ['University of Zimbabwe', 'Midlands State University', 'National University of Science and Technology']
  },
  {
    country: 'Zambia',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking southern Africa', 'Affordable', 'Easy admission'],
    universities: ['University of Zambia', 'Copperbelt University', 'Mulungushi University']
  },

  // ── NORTH AMERICA & CARIBBEAN ─────────────────────────────────────────────
  {
    country: 'United States',
    yearlyNeedBdt: 5200000,
    minIelts: 6.5,
    minGpa: 3.6,
    visaRisk: 'High',
    prScore: 3,
    strengths: ['Best research and CS universities globally', 'Large scholarship range', 'Strong tech job market'],
    universities: ['University of South Dakota', 'Minnesota State University', 'Wichita State University']
  },
  {
    country: 'Canada',
    yearlyNeedBdt: 4200000,
    minIelts: 6.5,
    minGpa: 3.5,
    visaRisk: 'High',
    prScore: 5,
    strengths: ['Strong PR and immigration pathway', 'High-quality universities', 'Good post-study work visa'],
    universities: ['University of Manitoba', 'Memorial University', 'University of Regina']
  },
  {
    country: 'Mexico',
    yearlyNeedBdt: 1400000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Affordable Latin American option', 'English-medium programs growing', 'UNAM scholarships available'],
    universities: ['National Autonomous University of Mexico', 'Tecnológico de Monterrey', 'Universidad Iberoamericana']
  },
  {
    country: 'Cuba',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Free medical education with government scholarships', 'High-quality medical training', 'Cuba-Bangladesh bilateral agreements'],
    universities: ['University of Havana', 'Latin American School of Medicine', 'University of Medical Sciences of Havana']
  },
  {
    country: 'Jamaica',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['English-speaking Caribbean', 'Affordable living', 'Good medical programs'],
    universities: ['University of the West Indies', 'University of Technology Jamaica', 'Northern Caribbean University']
  },
  {
    country: 'Trinidad and Tobago',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['English-medium education', 'Caribbean hub university', 'Oil and gas focused programs'],
    universities: ['University of the West Indies St Augustine', 'University of Trinidad and Tobago', 'Arthur Lok Jack Global School of Business']
  },
  {
    country: 'Barbados',
    yearlyNeedBdt: 1400000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['English-medium education', 'Safe Caribbean island', 'University of West Indies campus'],
    universities: ['University of the West Indies Cave Hill', 'Codrington College', 'American University of Barbados']
  },
  {
    country: 'Guyana',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking', 'Affordable', 'Growing medical programs'],
    universities: ['University of Guyana', 'American University of Antigua College of Medicine', 'Texila American University']
  },
  {
    country: 'Belize',
    yearlyNeedBdt: 1200000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking Central America', 'Easy admission', 'Affordable'],
    universities: ['University of Belize', 'Galen University', 'Central Caribbean University']
  },
  {
    country: 'Panama',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Growing service economy', 'US dollar economy', 'International business hub'],
    universities: ['Universidad de Panama', 'Universidad Tecnológica de Panama', 'Florida State University Panama']
  },
  {
    country: 'Costa Rica',
    yearlyNeedBdt: 1300000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Peaceful Central American country', 'English programs available', 'Growing tech sector'],
    universities: ['Universidad de Costa Rica', 'EARTH University', 'Tecnológico de Costa Rica']
  },
  {
    country: 'Dominican Republic',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Affordable Caribbean option', 'Medical programs available', 'Spanish and English programs'],
    universities: ['Universidad Autónoma de Santo Domingo', 'Pontificia Universidad Católica Madre y Maestra', 'INTEC']
  },

  // ── SOUTH AMERICA ─────────────────────────────────────────────────────────
  {
    country: 'Brazil',
    yearlyNeedBdt: 1200000,
    minIelts: 0.0,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Free public university education', 'Strong engineering and medicine', 'Vibrant student culture'],
    universities: ['University of São Paulo', 'State University of Campinas', 'Federal University of Rio de Janeiro']
  },
  {
    country: 'Argentina',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Free public university for international students', 'Strong medical programs', 'Affordable living'],
    universities: ['University of Buenos Aires', 'National University of Córdoba', 'National University of La Plata']
  },
  {
    country: 'Chile',
    yearlyNeedBdt: 1400000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Most stable South American economy', 'Strong universities', 'Growing English programs'],
    universities: ['University of Chile', 'Pontificia Universidad Católica de Chile', 'Universidad de Concepción']
  },
  {
    country: 'Colombia',
    yearlyNeedBdt: 1200000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Improving quality of life', 'Affordable education', 'English-medium programs growing'],
    universities: ['Universidad Nacional de Colombia', 'Universidad de los Andes', 'Universidad de Antioquia']
  },
  {
    country: 'Peru',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Affordable South American option', 'Medical programs available', 'Easy admission'],
    universities: ['Pontificia Universidad Católica del Perú', 'Universidad Nacional Mayor de San Marcos', 'Universidad Peruana Cayetano Heredia']
  },
  {
    country: 'Ecuador',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Affordable dollarized economy', 'Medical programs popular', 'Biodiversity research opportunities'],
    universities: ['Central University of Ecuador', 'Pontificia Universidad Católica del Ecuador', 'Universidad San Francisco de Quito']
  },
  {
    country: 'Bolivia',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable medical degrees', 'Easy admission for international students', 'Free public universities'],
    universities: ['Mayor de San Andrés University', 'San Simón University', 'Gabriel René Moreno Autonomous University']
  },
  {
    country: 'Uruguay',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 3.0,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Most progressive and stable South American country', 'Free public university', 'Safe environment'],
    universities: ['University of the Republic', 'ORT Uruguay University', 'Catholic University of Uruguay']
  },
  {
    country: 'Paraguay',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Easy admission', 'Medical and law programs popular'],
    universities: ['National University of Asunción', 'Catholic University Our Lady of the Assumption', 'American University of Asunción']
  },
  {
    country: 'Venezuela',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'High',
    prScore: 1,
    strengths: ['Free public university historically', 'Medical programs available', 'Low cost option'],
    universities: ['Central University of Venezuela', 'Simón Bolívar University', 'University of the Andes']
  },

  // ── UNITED KINGDOM + IRELAND ──────────────────────────────────────────────
  {
    country: 'United Kingdom',
    yearlyNeedBdt: 3900000,
    minIelts: 6.0,
    minGpa: 3.3,
    visaRisk: 'Medium-high',
    prScore: 3,
    strengths: ['Short 1-year master degrees', 'Many scholarships including Chevening', 'Large Bangladeshi diaspora'],
    universities: ['University of Hertfordshire', 'Coventry University', 'University of Portsmouth']
  },

  // ── ADDITIONAL COVERED COUNTRIES ──────────────────────────────────────────
  {
    country: 'Pakistan',
    yearlyNeedBdt: 750000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-low',
    prScore: 1,
    strengths: ['Very affordable', 'No language barrier for Urdu-speakers', 'Medical and engineering programs'],
    universities: ['COMSATS University', 'University of Management and Technology', 'Lahore University of Management Sciences']
  },
  {
    country: 'Maldives',
    yearlyNeedBdt: 1500000,
    minIelts: 5.5,
    minGpa: 3.0,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority island nation', 'English-medium programs', 'Close to Bangladesh'],
    universities: ['The Maldives National University', 'Villa College', 'Cyryx College']
  },
  {
    country: 'Laos',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Easy admission', 'Growing higher education sector'],
    universities: ['National University of Laos', 'Souphanouvong University', 'University of Health Sciences Laos']
  },
  {
    country: 'Turkmenistan',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Muslim-majority Central Asia', 'Very affordable', 'Medical programs available'],
    universities: ['Magtymguly Turkmen State University', 'International University for Humanities and Development', 'Oguz han Engineering and Technology University']
  },
  {
    country: 'Djibouti',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority', 'Strategic Horn of Africa location', 'Easy admission'],
    universities: ['University of Djibouti', 'Ecole Supérieure des Etudes Islamiques', 'Institut Supérieur des Sciences de la Santé']
  },
  {
    country: 'Comoros',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Muslim-majority island nation', 'Medical programs available', 'Very affordable'],
    universities: ['University of Comoros', 'Said Mohamed Cheikh University', 'Comoros Polytechnic University']
  },
  {
    country: 'Solomon Islands',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium programs', 'Peaceful Pacific environment', 'Easy admission'],
    universities: ['Solomon Islands National University', 'University of the South Pacific Solomon Islands']
  },
  {
    country: 'Vanuatu',
    yearlyNeedBdt: 1100000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English and French programs', 'Peaceful island nation', 'University of the South Pacific campus'],
    universities: ['University of the South Pacific Vanuatu', 'Vanuatu Institute of Technology']
  },
  {
    country: 'Samoa',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Pacific island experience', 'University of the South Pacific campus'],
    universities: ['National University of Samoa', 'University of the South Pacific Samoa']
  },
  {
    country: 'Tonga',
    yearlyNeedBdt: 1200000,
    minIelts: 5.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium', 'Pacific island education', 'Small welcoming community'],
    universities: ['University of the South Pacific Tonga', 'Tonga Institute of Higher Education', 'Atenisi Institute']
  },
  {
    country: 'Honduras',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Very affordable Central America', 'Medical programs available', 'Easy admission process'],
    universities: ['Universidad Nacional Autónoma de Honduras', 'Universidad Tecnológica Centroamericana', 'Universidad Pedagógica Nacional Francisco Morazán']
  },
  {
    country: 'Guatemala',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Affordable Central American option', 'Medical and law programs', 'Spanish and English programs'],
    universities: ['Universidad de San Carlos de Guatemala', 'Universidad del Valle de Guatemala', 'Universidad Mariano Gálvez']
  },
  {
    country: 'El Salvador',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['US dollar economy', 'Affordable living', 'Growing higher education sector'],
    universities: ['Universidad de El Salvador', 'Universidad Don Bosco', 'Universidad Tecnológica de El Salvador']
  },
  {
    country: 'Nicaragua',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Lowest cost Central American option', 'Medical programs available', 'Easy admission'],
    universities: ['Universidad Nacional Autónoma de Nicaragua', 'Universidad Centroamericana', 'Universidad Americana']
  },
  {
    country: 'Ivory Coast',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Largest economy in West Africa', 'French-medium programs', 'Growing higher education sector'],
    universities: ['Université Félix Houphouët-Boigny', 'Université Nangui Abrogoua', 'Institut National Polytechnique Félix Houphouët-Boigny']
  },
  {
    country: 'Madagascar',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'French and English programs', 'Unique biodiversity research environment'],
    universities: ['University of Antananarivo', 'University of Toamasina', 'University of Mahajanga']
  },
  {
    country: 'Mozambique',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Portuguese-medium programs', 'Growing economy'],
    universities: ['Eduardo Mondlane University', 'University Pedagogica', 'Catholic University of Mozambique']
  },
  {
    country: 'Angola',
    yearlyNeedBdt: 1000000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Oil-rich growing economy', 'Portuguese-medium programs', 'Affordable living'],
    universities: ['Agostinho Neto University', 'Catholic University of Angola', 'University of Lusíada Angola']
  },
  {
    country: 'Gabon',
    yearlyNeedBdt: 1100000,
    minIelts: 0.0,
    minGpa: 2.8,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Stable Central African country', 'French-medium programs', 'Oil sector employment prospects'],
    universities: ['Omar Bongo University', 'University of Science and Technology of Masuku', 'Institut Universitaire des Sciences de l\'Organisation']
  },
  {
    country: 'Democratic Republic of the Congo',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Very affordable', 'French-medium education', 'Large country with diverse programs'],
    universities: ['University of Kinshasa', 'University of Lubumbashi', 'University of Kisangani']
  },
  {
    country: 'Malawi',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Very affordable', 'Peaceful environment'],
    universities: ['University of Malawi', 'Lilongwe University of Agriculture and Natural Resources', 'Mzuzu University']
  },
  {
    country: 'Mali',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Very affordable', 'Muslim-majority West Africa', 'French-medium programs'],
    universities: ['University of Bamako', 'University of Sciences, Techniques and Technologies of Bamako', 'University of Letters and Human Sciences']
  },
  {
    country: 'Burkina Faso',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Muslim-majority', 'Very affordable', 'French-medium programs'],
    universities: ['Joseph Ki-Zerbo University', 'Thomas Sankara University', 'Nazi Boni University']
  },
  {
    country: 'Niger',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Muslim-majority Sahel country', 'Very affordable', 'French programs available'],
    universities: ['Abdou Moumouni University', 'University of Zinder', 'University of Maradi']
  },
  {
    country: 'Guinea',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium',
    prScore: 1,
    strengths: ['Muslim-majority', 'Affordable West Africa', 'French-medium programs'],
    universities: ['University of Conakry', 'University of Labé', 'Gamal Abdel Nasser University of Conakry']
  },
  {
    country: 'Benin',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Stable West African country', 'Muslim and Christian mixed society', 'French-medium programs'],
    universities: ['University of Abomey-Calavi', 'University of Parakou', 'University of Agriculture of Kétou']
  },
  {
    country: 'Togo',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['Very affordable', 'Stable West Africa', 'French and English programs'],
    universities: ['University of Lomé', 'University of Kara', 'Université Catholique de l\'Afrique de l\'Ouest']
  },
  {
    country: 'Chad',
    yearlyNeedBdt: 950000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Medium-high',
    prScore: 1,
    strengths: ['Muslim-majority', 'Very affordable', 'French-medium programs'],
    universities: ['University of N\'Djamena', 'King Faisal University Chad', 'University of Moundou']
  },
  {
    country: 'Sierra Leone',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking West Africa', 'Very affordable', 'Growing university sector'],
    universities: ['Fourah Bay College', 'Ernest Bai Koroma University', 'Njala University']
  },
  {
    country: 'Liberia',
    yearlyNeedBdt: 900000,
    minIelts: 0.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-speaking', 'Very affordable', 'US-influenced academic system'],
    universities: ['University of Liberia', 'Cuttington University', 'African Methodist Episcopal University']
  },
  {
    country: 'Eswatini',
    yearlyNeedBdt: 950000,
    minIelts: 5.0,
    minGpa: 2.5,
    visaRisk: 'Low',
    prScore: 1,
    strengths: ['English-medium education', 'Stable small kingdom', 'Affordable southern Africa'],
    universities: ['University of Eswatini', 'Limkokwing University Eswatini', 'Southern Africa Nazarene University']
  }
];

export const countryNames = countries.map((item) => item.country);

export function recommendCountries(profile, researchItems = [], universitiesByCountry = {}) {
  const priority = profile.priority || 'balanced';
  const recommendations = countries
    .map((item) => {
      const fundingGapBdt = Math.max(0, item.yearlyNeedBdt - Number(profile.budgetBdt || 0));
      const budgetFit = clamp(100 - (fundingGapBdt / item.yearlyNeedBdt) * 100);
      const englishFit = Number(profile.ielts || 0) >= item.minIelts ? 100 : clamp(60 - (item.minIelts - Number(profile.ielts || 0)) * 35);
      const academicFit = Number(profile.gpa || 0) >= item.minGpa ? 100 : clamp(65 - (item.minGpa - Number(profile.gpa || 0)) * 20);
      const visaFit = (profile.hasBankStatement ? 24 : 8) + (profile.hasSponsorDocs ? 24 : 8) + (budgetFit * 0.35) + (englishFit * 0.17);
      const prFit = item.prScore * 20;
      const weights = priorityWeights(priority);
      const affordabilityBonus = priority === 'budget' ? (1 - item.yearlyNeedBdt / 5_400_000) * 55 : 0;
      const score = Math.round(clamp(
        budgetFit * weights.budget +
        englishFit * weights.english +
        academicFit * weights.academic +
        visaFit * weights.visa +
        prFit * weights.pr +
        affordabilityBonus
      ));
      const gaps = [];

      if (fundingGapBdt > 0) gaps.push(`Funding gap around ${formatBdt(fundingGapBdt)} for first year.`);
      if (Number(profile.ielts || 0) < item.minIelts) gaps.push(`IELTS target: ${item.minIelts}+.`);
      if (Number(profile.gpa || 0) < item.minGpa) gaps.push(`Academic profile should be strengthened for this route.`);
      if (!profile.hasBankStatement) gaps.push('Bank statement history is missing.');
      if (!profile.hasSponsorDocs) gaps.push('Sponsor documents are missing.');

      const liveUniversities = universitiesByCountry[item.country];
      const universities = liveUniversities && liveUniversities.length
        ? liveUniversities
        : item.universities.map((name) => ({ name, country: item.country, stateProvince: null, website: null, domain: null }));

      return {
        ...item,
        score,
        fundingGapBdt,
        estimatedFirstYearBdt: item.yearlyNeedBdt,
        universities,
        reasons: buildReasons(item, profile, budgetFit, researchItems),
        gaps
      };
    })
    .sort((a, b) => b.score - a.score);

  return {
    generatedAt: new Date().toISOString(),
    summary: buildSummary(recommendations[0], profile),
    recommendations,
    visaChecklist: buildVisaChecklist(profile),
    researchItems
  };
}

function priorityWeights(priority) {
  if (priority === 'budget') return { budget: 0.42, english: 0.14, academic: 0.14, visa: 0.22, pr: 0.08 };
  if (priority === 'pr') return { budget: 0.18, english: 0.14, academic: 0.14, visa: 0.24, pr: 0.3 };
  if (priority === 'visa') return { budget: 0.2, english: 0.18, academic: 0.14, visa: 0.38, pr: 0.1 };
  return { budget: 0.26, english: 0.16, academic: 0.16, visa: 0.28, pr: 0.14 };
}

function buildReasons(country, profile, budgetFit, researchItems) {
  const reasons = [...country.strengths];
  if (budgetFit >= 90) reasons.unshift('Fits your declared yearly budget well.');
  if (profile.subject) reasons.push(`${profile.subject} has searchable options in this destination.`);
  if (researchItems.some((item) => item.snippet.toLowerCase().includes(country.country.toLowerCase()))) {
    reasons.push('Matched in current web research snippets.');
  }
  return reasons.slice(0, 5);
}

function buildVisaChecklist(profile) {
  const checklist = [
    'Keep passport, academic certificates, and translations ready.',
    'Shortlist programs from official university pages before paying application fees.',
    'Prepare a clear study plan explaining why this subject and country fits your career.'
  ];
  if (Number(profile.ielts || 0) < 6) checklist.unshift('Improve IELTS to at least 6.0 before applying to stronger options.');
  if (!profile.hasSponsorDocs) checklist.push('Prepare sponsor income documents and relationship proof.');
  if (!profile.hasBankStatement) checklist.push('Prepare a clean bank statement history before visa submission.');
  return checklist;
}

function buildSummary(top, profile) {
  return `${top.country} is the best first target for a ${profile.degree || 'degree'} in ${profile.subject || 'your subject'} based on your budget, English score, academic result, and visa readiness.`;
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function formatBdt(value) {
  return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(value);
}

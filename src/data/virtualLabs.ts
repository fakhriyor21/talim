import type { EduModuleId } from "./eduModules";

export type LabStatus = "live" | "soon";

export type CatalogLab = {
  id: string;
  moduleId: EduModuleId;
  title: string;
  /** `public/labs` dagi HTML — faqat `live` uchun */
  slug?: string;
  status: LabStatus;
  /** 7-11 sinflar kesimida mos sinf */
  grades: number[];
};

const GRADES = [7, 8, 9, 10, 11] as const;

type ModuleBlueprint = {
  id: EduModuleId;
  prefix: string;
  liveSlug: string;
  liveTitle: string;
  templatesByGrade: Record<number, string[]>;
};

const moduleBlueprints: ModuleBlueprint[] = [
  {
    id: "fizika",
    prefix: "vf",
    liveSlug: "stem-fizika",
    liveTitle: "Matematik mayatnichik (3D)",
    templatesByGrade: {
      7: ["Boshlang‘ich mexanika", "Tekis harakat", "Notekis harakat", "Massa va og‘irlik", "Zichlik amaliyoti", "Bosim tushunchasi", "Arximed qonuni", "Suyuqlik bosimi", "Gaz bosimi", "Ish va quvvat", "Oddiy mexanizmlar", "Issiqlik manbalari", "Harorat o‘lchovi", "Issiqlik almashinuvi", "Qattiq-jism xossalari", "Tebranish kirish", "To‘lqin kirish", "Yorug‘lik to‘g‘ri tarqalishi", "Ko‘zgu qonuni", "Sinish hodisasi", "Linza kirish", "Energiyaning turlari", "Energiyaning saqlanishi", "Yakuniy fizika loyiha"],
      8: ["Nyutonning 1-qonuni", "Nyutonning 2-qonuni", "Nyutonning 3-qonuni", "Ishqalanish kuchi", "Markazga intilma kuch", "Moment va muvozanat", "Qattiq jism aylanishi", "Issiqlik sig‘imi", "Erish va qaynash", "Bug‘lanish fizikasi", "Gazlar modeli", "Boyl-Mariott qonuni", "Sharl qonuni", "Elektr zanjiri kirish", "Tok kuchi va ampermetr", "Kuchlanish va voltmetr", "Ohm qonuni", "Qarshilik va reostat", "Parallel ulash", "Ketma-ket ulash", "Magnit maydon kirish", "Elektromagnit", "Generator modeli", "8-sinf yakuniy amaliyot"],
      9: ["Mexanik energiya", "Impuls va saqlanish", "Zarbalar tahlili", "Tebranish tenglamasi", "Rezonans tajribasi", "To‘lqin tezligi", "Interferensiya", "Difraksiya", "Yorug‘lik dispersiyasi", "Prizma va spektr", "Linza formulasi", "Optik asboblar", "Elektrostatika", "Kulon qonuni", "Elektr maydon kuchlanganligi", "Kondensator asoslari", "Doimiy tok manbalari", "Joule-Lenz qonuni", "Magnit induksiya", "Amper kuchi", "Lorens kuchi", "Induksiya toki", "Transformator kirish", "9-sinf loyiha laboratoriyasi"],
      10: ["Molekulyar-kinetik nazariya", "Ideal gaz tenglamasi", "Termodinamika 1-qonuni", "Termodinamika 2-qonuni", "Issiqlik dvigateli", "Sikl samaradorligi", "Elektromagnit tebranish", "AC zanjirlar", "Reaktiv qarshilik", "Quvvat faktori", "Elektromagnit to‘lqin", "Radioaloqa asoslari", "Geometrik optika", "To‘lqin optikasi", "Polarizatsiya", "Fotoeffekt kirish", "Atom modeli", "Bohr postulatlari", "Spektral analiz", "Yadro fizikasi kirish", "Radioaktivlik", "Doza va himoya", "Fizik eksperiment dizayni", "10-sinf tadqiqot ishi"],
      11: ["Nisbiylik kirish", "Lorens transformatsiyasi", "Kvant fizikasi", "De-Broyl to‘lqini", "Shredinger modeli", "Yadro reaksiyalari", "Bo‘linish va sintez", "Elementar zarralar", "Plazma fizikasi", "Astrofizika kirish", "Qora jism nurlanishi", "Kosmologik model", "Yuqori kuchlanish texnikasi", "Yarimo‘tkazgichlar", "Diod va tranzistor", "Mikroelektronika", "Signalni qayta ishlash", "O‘lchov noaniqligi", "Eksperimental statistika", "Laboratoriya protokoli", "Fizik modellashtirish", "STEAM integratsiya", "Imtihon darajasi amaliyot", "11-sinf yakuniy loyiha"],
    },
  },
  {
    id: "kimyo",
    prefix: "vk",
    liveSlug: "stem-kimyo",
    liveTitle: "Suv molekulasi H₂O (3D)",
    templatesByGrade: {
      7: ["Modda va aralashma", "Fizik/kimyoviy hodisa", "Element tushunchasi", "Oddiy birikmalar", "Kimyoviy formula yozish", "Valentlik kirish", "Kislorod xossalari", "Vodorod xossalari", "Suvning tarkibi", "Eritmalar", "Eruvchanlik", "Massaning saqlanishi", "Kimyoviy tenglama kirish", "Reaksiya turlari", "Laboratoriya xavfsizligi", "Asbob-uskunalar", "Kislota kirish", "Ishqor kirish", "Tuzlar kirish", "Neytrallanish", "Gaz ajralish reaksiyasi", "Cho‘kma reaksiyasi", "Kimyo va ekologiya", "7-sinf kimyo loyihasi"],
      8: ["Atom tuzilishi", "Elektron konfiguratsiya", "Davriy qonun", "Davriy jadval", "Metallar xossalari", "Nometallar xossalari", "Oksidlar", "Asoslar", "Kislotalar", "Tuzlar", "Ion almashinish", "pH amaliyoti", "Redoks kirish", "Oksidlanish darajasi", "Reaktivlik qatori", "Gazlar laboratoriyasi", "Ammiak va nitratlar", "Oltingugurt birikmalari", "Karbonat tizimi", "Suv qattiqligi", "Kimyoviy hisob-kitob", "Molyar massa", "Kimyoda tajriba dizayni", "8-sinf yakuniy amaliyot"],
      9: ["Organik kimyo kirish", "Uglevodorodlar", "Alkanlar", "Alkenlar", "Alkinlar", "Aromatiklar", "Spirtlar", "Fenollar", "Aldegidlar", "Ketonlar", "Karboksil kislotalar", "Esterlar", "Yog‘lar", "Uglevodlar", "Oqsillar kirish", "Polimerlar", "Neft qayta ishlash", "Yonish jarayoni", "Izomerlar", "Funksional guruh tahlili", "Organik sintez kirish", "Spektral kirish", "Laboratoriya protokoli", "9-sinf organik loyiha"],
      10: ["Fizik kimyo asoslari", "Termokimyo", "Entalpiya", "Entropiya", "Kinetika", "Reaksiya tezligi", "Kataliz", "Muvozanat konstantasi", "Le-Shatele prinsipi", "Eritma konsentratsiyasi", "Titrimetrik analiz", "Gravimetrik analiz", "Elektrokimyo", "Galvanik element", "Elektroliz", "Korrozion jarayon", "Kompleks birikmalar", "Koordinatsion kimyo", "Sirt hodisalari", "Kolloid tizimlar", "Analitik hisobot", "Xatolik tahlili", "Sanoat kimyo jarayonlari", "10-sinf tadqiqot ishlari"],
      11: ["Biokimyo kirish", "Fermentlar", "DNK va RNK kimyosi", "Metabolizm", "Farmatsevtik kimyo", "Materiallar kimyosi", "Nanokimyo", "Yashil kimyo", "Atrof-muhit kimyosi", "Atmosfera kimyosi", "Suv ifloslanishi kimyosi", "Toksikologiya", "Ilmiy maqola tahlili", "Ma’lumotlar interpretatsiyasi", "Ilmiy tajriba rejalash", "Kimyoviy model yaratish", "NMR/IR kirish", "Xromatografiya", "Mass-spektrometriya kirish", "Sintez loyihasi", "Kimyoda AI vositalari", "Imtihon darajasi masalalar", "Yakuniy laboratoriya amaliyoti", "11-sinf kimyo capstone"],
    },
  },
  {
    id: "robot",
    prefix: "vr",
    liveSlug: "stem-robotika",
    liveTitle: "Manipulyator va bo‘g‘imlar (3D)",
    templatesByGrade: {
      7: ["Robototexnika kirish", "Oddiy algoritm", "Blokli dasturlash", "Motorni ishga tushirish", "LED va signal", "Masofa sensori kirish", "Line follower kirish", "Boshqaruv pulti", "If-else mantiq", "Loop amaliyoti", "Xatolarni topish", "Robot yig‘ish", "Qismlar funksiyasi", "Batareya xavfsizligi", "Tezlik nazorati", "Yo‘l xaritasi", "Soddalashtirilgan loyiha", "Ko‘rsatma yozish", "Jamoa bilan ishlash", "Robot etikasi", "Mini-musobaqa", "Natija tahlili", "Prezentatsiya", "7-sinf robot loyihasi"],
      8: ["Mikrokontroller kirish", "Pinlar bilan ishlash", "Servo boshqaruv", "DC motor drayver", "Ultrasonik sensor", "IR sensorlar", "Line follower algoritmi", "Kalibrovka", "PID kirish", "Senzor ma’lumotlari", "Serial monitor", "Debugging", "Bluetooth boshqaruv", "Mobil ilova ulash", "Robot trayektoriya", "Obstacle avoidance", "Map navigatsiya", "Avtomatik to‘xtash", "Power management", "Chassis dizayn", "Test protokoli", "Samaradorlik tahlili", "Mini capstone", "8-sinf robot yakuniy"],
      9: ["C/C++ asoslari", "Funksiya va modul", "Interruptlar", "Timerlar", "Encoder o‘qish", "IMU sensor", "Kinematika kirish", "Forward kinematics", "Manipulator kirish", "Gripper nazorati", "Path planning kirish", "Trajectory smoothing", "Vision kirish", "Rang aniqlash", "Object tracking", "MQTT kirish", "IoT telemetriya", "Cloud log", "Robot xavfsizlik qoidasi", "Fail-safe mantiq", "Jamoaviy sprint", "Code review", "Tadqiqot ishlanma", "9-sinf loyiha"],
      10: ["Embedded arxitektura", "RTOS kirish", "Task scheduling", "PID chuqur", "Kalman filter kirish", "Sensor fusion", "Inverse kinematics", "Manipulator optimizatsiya", "Computer vision pipeline", "OpenCV kirish", "YOLO kirish", "ROS asoslari", "Robot simulyatsiya", "Gazebo kirish", "PLC integratsiya", "SCADA ulanish", "Sanoat protokollari", "Robot diagnostika", "Reliability test", "HMI dizayn", "Energiya optimizatsiya", "Field test", "10-sinf loyiha", "Texnik hisobot"],
      11: ["Autonomous systems", "SLAM kirish", "Localization", "Path planning advanced", "Control theory", "MPC kirish", "Machine vision", "Depth sensing", "Edge AI kirish", "Model deployment", "ROS2 kirish", "Real-time constraints", "Industrial safety SIL", "Human-robot interaction", "Collaborative robots", "Predictive maintenance", "Digital twin", "Cybersecurity for robots", "Dataset labeling", "Benchmarking", "Research method", "Capstone design", "Demo day tayyorgarlik", "11-sinf robot capstone"],
    },
  },
  {
    id: "agro",
    prefix: "va",
    liveSlug: "stem-agro",
    liveTitle: "Issiqxona va sug‘orish modeli (3D)",
    templatesByGrade: {
      7: ["O‘simlik hayot sikli", "Tuproq turlari", "Namlik tushunchasi", "Oddiy sug‘orish", "Urug‘ tanlash", "Ekish oralig‘i", "Fotosintez kirish", "Yorug‘lik ta’siri", "Mini issiqxona", "Harorat nazorati", "Suv tejash kirish", "Organik o‘g‘it kirish", "O‘simlik kasalligi kirish", "Zararkunanda kirish", "Agro xavfsizlik", "Mehnat gigiyenasi", "Hosil kuzatuvi", "Vegetatsiya kundaligi", "Bog‘dorchilik amaliyoti", "Qishloq xo‘jalik asboblari", "Agro ekologiya", "Mahalliy ekinlar", "Yakuniy amaliy topshiriq", "7-sinf agro loyiha"],
      8: ["Tuproq tarkibi analiz", "pH va tuproq", "Namlik sensori", "Tomchilatib sug‘orish", "Suv balansi", "O‘g‘itlash jadvali", "NPK kirish", "Iqlim monitoringi", "Issiqxona boshqaruvi", "Ventilyatsiya", "Kasallik belgilari", "Zararkunanda tahlili", "Biologik himoya", "Agro texnika parvarishi", "Hosildorlik ko‘rsatkichi", "Ma’lumot kiritish", "Agro xarita kirish", "Fermer kundaligi", "Sifat nazorati", "Saqlash sharoiti", "Mahsulot saralash", "Statistik tahlil kirish", "Mini loyiha", "8-sinf agro yakuniy"],
      9: ["Aniq dehqonchilik kirish", "Agro-sensor tarmog‘i", "Iqlim modeli", "Evapotranspiratsiya", "Sug‘orish algoritmi", "Issiqxona avtomatika", "CO2 monitoring", "Yorug‘lik boshqaruvi", "Nutrient management", "Kasallik diagnostika", "Image-based monitoring", "Dron kirish", "NDVI tushunchasi", "Hosil prognozi", "Risk tahlili", "Agro iqtisodiyot kirish", "Resurs optimizatsiya", "Agro ma’lumotlar bazasi", "Dashboard yaratish", "Sifat audit", "Loyiha hujjati", "Jamoaviy dala amaliyoti", "9-sinf agro loyiha", "Capstone demo"],
      10: ["Agrotexnika tizimlari", "Precision irrigation", "IoT integratsiya", "Weather API ulash", "Yield modeling", "Soil analytics", "Disease classification", "Remote sensing", "Agro dron marshrut", "Pest prediction", "Greenhouse digital twin", "Energy-water nexus", "Supply chain basics", "Post-harvest analytics", "Quality metrics", "Experiment design", "A/B dala tajribasi", "Monitoring protokoli", "Data cleaning", "Forecast validation", "Agro AI kirish", "Samaradorlik KPI", "10-sinf tadqiqot", "Yakuniy hisobot"],
      11: ["Sustainable agriculture", "Climate-smart farming", "Carbon footprint", "Water governance", "Soil regeneration", "Advanced fertigation", "AI crop advisor", "Computer vision agronomy", "Drone analytics", "Satellite data fusion", "Econometric agro model", "Risk mitigation", "Insurance analytics", "Policy and regulation", "Food safety standards", "Traceability systems", "Agro startup model", "Investment pitch", "Field experiment advanced", "Scientific writing", "Research ethics", "Capstone planning", "Pilot implementation", "11-sinf agro capstone"],
    },
  },
  {
    id: "energiya",
    prefix: "ve",
    liveSlug: "stem-energiya",
    liveTitle: "Quyosh paneli va quvvat (3D)",
    templatesByGrade: {
      7: ["Energiya tushunchasi", "Energiya turlari", "Quyosh energiyasi kirish", "Shamol energiyasi kirish", "Suv energiyasi kirish", "Issiqlik energiyasi", "Elektr xavfsizligi", "Oddiy zanjir", "Batareya kirish", "Zaryadlash asoslari", "Quvvat nima?", "Samaradorlik kirish", "Uy energiya sarfi", "Tejash usullari", "Lampalar taqqoslash", "Issiqlik izolyatsiya", "Mini quyosh modeli", "Mini shamol modeli", "Mahalliy resurslar", "Ekologiya va energiya", "Karbon izi kirish", "Energiyada kasblar", "Amaliy loyiha", "7-sinf energiya yakuniy"],
      8: ["Quyosh panel fizikasi", "Panel burchagi", "Irradiatsiya", "Shamol turbina tuzilishi", "Pervanel geometriya", "Mikro GES model", "Generator kirish", "AC va DC", "Invertor vazifasi", "Batareya kimyosi", "SOC va SOH", "Energiya saqlash kirish", "Yuklama turlari", "Peak load", "Tarqatish tarmog‘i", "Yo‘qotishlar", "Energiya audit", "Tejamkorlik KPI", "Smart meter kirish", "Monitoring dashboard", "Xavfsizlik protokoli", "Sifat ko‘rsatkichlari", "Mini tadqiqot", "8-sinf energiya yakuniy"],
      9: ["Qayta tiklanuvchi manbalar", "PV tizim dizayni", "String konfiguratsiya", "Shamol potentsial", "Gidro resurs tahlili", "BESS amaliyoti", "Charge controller", "MPPT kirish", "Grid tie kirish", "Off-grid tizim", "Hybrid tizim", "Yuklama balans", "Energiya prognozi", "Talab va taklif", "LCOE kirish", "Karbon tahlili", "Sanoat energiya audit", "Energiya siyosati kirish", "Risk tahlili", "Case study", "Model kalibrovka", "Hisobot tayyorlash", "9-sinf loyiha", "Demo himoya"],
      10: ["Power electronics", "Inverter topologiya", "Power quality", "Harmonics kirish", "Reactive power", "Transmission model", "Grid stability", "Demand response", "Forecasting advanced", "PV-wind hybrid optimization", "BESS dispatch", "Hydro scheduling", "SCADA kirish", "Substation basics", "Protection systems", "Relay coordination", "Energy economics", "Tariff model", "Carbon market", "Efficiency benchmarking", "Field data analysis", "Model validation", "10-sinf energiya loyiha", "Technical report"],
      11: ["Smart grid advanced", "Microgrid control", "EMS platform", "AI in energy", "Predictive maintenance", "Fault detection", "Resilience planning", "Cybersecurity in grid", "DER integration", "Virtual power plant", "Ancillary services", "Battery degradation modeling", "Hydrogen energy kirish", "Fuel cell basics", "Climate scenarios", "Policy and regulation", "Investment model", "Feasibility study", "Scientific experiment", "Publication style report", "Capstone architecture", "Pilot simulation", "Final demo day", "11-sinf energiya capstone"],
    },
  },
  {
    id: "ai",
    prefix: "ai",
    liveSlug: "stem-robotika",
    liveTitle: "AI yordamchi o‘qituvchi (3D amaliy)",
    templatesByGrade: {
      7: ["AI nima?", "Raqamli mantiq kirish", "Ma’lumot turlari", "Oddiy tasniflash", "Rasm tanish kirish", "Ovozli buyruq kirish", "Chatbot asoslari", "Prompt nima?", "Etika kirish", "Internet xavfsizligi", "Algoritm va qadamlar", "Flowchart tuzish", "Mini dataset", "Oddiy model o‘yini", "Noto‘g‘ri javobni tahlil", "AI va fanlar", "AI va hayot", "Ko‘nikma mashqi", "Jamoa topshirig‘i", "Prezentatsiya", "Savol-javob", "Mini test", "Yakuniy mashg‘ulot", "7-sinf AI loyiha"],
      8: ["ML kirish", "Dataset yig‘ish", "Data cleaning", "Labeling", "Classification", "Regression kirish", "Model trening", "Validation kirish", "Accuracy", "Confusion matrix", "Feature kirish", "Bias tushunchasi", "NLP kirish", "Tokenlar", "Chatbot workflow", "Vision kirish", "Edge AI kirish", "API kirish", "AI xavfsizlik", "Etik holatlar", "Case study", "Hisobot", "Mini loyiha", "8-sinf AI yakuniy"],
      9: ["Supervised learning", "Unsupervised learning", "Clustering", "Feature engineering", "Model tuning", "Cross-validation", "Overfitting", "Regularization", "NLP pipeline", "Vectorization", "Embeddings kirish", "Prompt engineering", "Vision pipeline", "Object detection", "OCR kirish", "Deployment kirish", "Inference speed", "Monitoring", "Fairness", "Explainability", "AI for education", "A/B test", "9-sinf AI loyiha", "Capstone demo"],
      10: ["Deep learning kirish", "Neural network", "Backprop basics", "CNN kirish", "RNN kirish", "Transformer kirish", "Fine-tuning", "Hyperparameter search", "MLOps kirish", "Model registry", "API deployment", "Latency optimization", "Security testing", "Prompt safety", "Bias mitigation", "Evaluation suite", "Synthetic data", "Data governance", "Cost optimization", "Reliability", "Research method", "Technical writing", "10-sinf AI loyiha", "Demo report"],
      11: ["Advanced ML systems", "LLM architecture", "RAG kirish", "Vector DB", "Agent systems", "Tool calling", "Computer vision advanced", "Multimodal AI", "Speech systems", "Realtime inference", "Scalable serving", "Model observability", "AI ethics advanced", "Regulatory compliance", "Red teaming", "Adversarial testing", "Scientific benchmarking", "Experiment tracking", "Product strategy", "Startup case", "Capstone planning", "Pilot deployment", "Final thesis demo", "11-sinf AI capstone"],
    },
  },
];

function makeLabsForBlueprint(bp: ModuleBlueprint): CatalogLab[] {
  const labs: CatalogLab[] = [];
  for (const grade of GRADES) {
    const gradeTemplates = bp.templatesByGrade[grade];
    gradeTemplates.forEach((tpl, idx) => {
      const isLive = idx === 0;
      labs.push({
        id: `${bp.prefix}-${grade}-${idx + 1}`,
        moduleId: bp.id,
        title: `${tpl} · ${grade}-sinf`,
        slug: isLive ? bp.liveSlug : undefined,
        status: isLive ? "live" : "soon",
        grades: [grade],
      });
    });
    labs.push({
      id: `${bp.prefix}-${grade}-live-core`,
      moduleId: bp.id,
      title: `${bp.liveTitle} · ${grade}-sinf`,
      slug: bp.liveSlug,
      status: "live",
      grades: [grade],
    });
  }
  return labs;
}

/** Har bir fan va 7-11 sinf uchun 24+ laboratoriya */
export const catalogLabs: CatalogLab[] = moduleBlueprints.flatMap(makeLabsForBlueprint);

export function getCatalogLabById(id: string): CatalogLab | undefined {
  return catalogLabs.find((l) => l.id === id);
}

export function getLabGrades(lab: CatalogLab): number[] {
  return lab.grades;
}

export function labsForModule(moduleId: EduModuleId): CatalogLab[] {
  return catalogLabs.filter((l) => l.moduleId === moduleId);
}

export function labsForModuleAndGrade(moduleId: EduModuleId, grade: number): CatalogLab[] {
  return catalogLabs.filter((l) => l.moduleId === moduleId && getLabGrades(l).includes(grade));
}

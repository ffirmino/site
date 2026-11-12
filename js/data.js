/* ==========================================================
   FSK IT — Dados do portfólio (fonte única para as 2 versões)
   Para adicionar um projeto, basta incluir um item em PROJECTS.
   ========================================================== */
const PROFILE = {
  name: "Fabio Firmino",
  fullName: "Fabio do Nascimento Firmino",
  role: "Desenvolvedor .NET Sênior · Full-Stack",
  location: "São Paulo · Brasil",
  email: "ffirmino@live.com",
  linkedin: "https://www.linkedin.com/in/fafirmino",
  gitlab: "https://gitlab.com/ffirmino",
  github: "https://github.com/ffirmino",
  whatsapp: "https://api.whatsapp.com/send?phone=5511938037232&text=Ol%C3%A1%20Fabio!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.",
  brand: "FSK IT",
  years: 17,
  summary:
    "Desenvolvedor .NET com 17 anos de experiência construindo APIs, sistemas corporativos, " +
    "robôs (RPAs) e integrações. Atuo de ponta a ponta: back-end em C#/.NET, front-end em " +
    "Angular e React, modelagem de banco (SQL Server, Oracle, PostgreSQL) e deploy em nuvem.",
  highlights: [
    "Meios de pagamento, adquirência e conciliação eletrônica (Adyen, PayGo)",
    "Mensageria com RabbitMQ, Kafka e AWS SQS",
    "APIs REST, microsserviços e integrações REST/SOAP",
    "RPAs, jobs agendados e sistemas legados .NET Framework",
    "Cloud AWS e Azure, Docker, CI/CD com Azure DevOps e GitHub Actions"
  ]
};

/* status: "online" | "dev" | "local" */
const PROJECTS = [
  {
    id: "radar-vagas",
    name: "Radar de Vagas",
    tagline: "Vagas do LinkedIn direto no Telegram, resumidas por IA",
    description:
      "Coleta vagas de fontes plugáveis (busca pública do LinkedIn e API JSearch), grava em PostgreSQL " +
      "e distribui por um bot do Telegram. Cada vaga traz um resumo gerado com a API do Claude e o link " +
      "para a vaga completa. Roda de graça na nuvem com GitHub Actions agendado e banco no Neon.",
    stack: [".NET 8", "Worker Service", "PostgreSQL", "Docker Compose", "Telegram Bot", "React", "Claude API", "GitHub Actions"],
    status: "online",
    year: "2026",
    links: [
      { label: "GitHub", url: "https://github.com/ffirmino/radar-vagas-dotnet8-rest" },
      { label: "GitLab", url: "https://gitlab.com/ffirmino/radar-vagas-dotnet8-rest" }
    ]
  },
  {
    id: "tabela-fipe",
    name: "Tabela FIPE",
    tagline: "API e front-end para consulta de preços de veículos",
    description:
      "API REST em .NET 8 que consulta a Tabela FIPE (marcas, modelos, anos e preço) com endpoints POST/JSON " +
      "e CORS configurado. Front-end em Angular 17 com autocomplete para marca, modelo e ano. " +
      "API publicada no Render e front-end na Netlify, com CI a partir do GitLab.",
    stack: [".NET 8", "Angular 17", "REST", "Render", "Netlify", "GitLab"],
    status: "online",
    year: "2026",
    links: [
      { label: "Ver online", url: "https://fipe-api-front.netlify.app/" },
      { label: "API (Swagger)", url: "https://fipe-api-dotnet8.onrender.com/swagger/index.html" },
      { label: "GitLab API", url: "https://gitlab.com/fsk-fipe-api/fipe-api-dotnet8" },
      { label: "GitLab Front", url: "https://gitlab.com/fsk-fipe-api/fipe-api-front" }
    ]
  },
  {
    id: "documento-consulta",
    name: "Documento Consulta",
    tagline: "Consulta de CNPJ/CPF com autenticação, auditoria e dashboards",
    description:
      "Aplicação full-stack para consulta de documentos CNPJ/CPF, com login JWT, área administrativa, " +
      "log de auditoria, dashboards com Recharts e exportação para Excel.",
    stack: [".NET 9", "React 18", "PostgreSQL", "JWT", "Docker", "Recharts", "Render", "Netlify"],
    status: "online",
    year: "2026",
    links: [
      { label: "Ver online", url: "https://documento-consulta-front.netlify.app/" },
      { label: "GitLab Front", url: "https://gitlab.com/ffirmino/documento-consulta-front" }
    ]
  },
  {
    id: "medflow",
    name: "MedFlow",
    tagline: "Gestão completa de clínicas e consultórios",
    description:
      "Cadastro de pacientes e médicos, validação de registro médico (CRM) via CFM, agenda e fechamento de " +
      "consultas, estoque, vendas e senha/fila de atendimento. API em arquitetura hexagonal (ports & adapters).",
    stack: [".NET 9", "Arquitetura Hexagonal", "React", "Vite", "TypeScript", "PostgreSQL"],
    status: "dev",
    year: "2026",
    links: []
  },
  {
    id: "integra-brasil-api",
    name: "IntegraBrasilApi",
    tagline: "Integração .NET com a BrasilAPI",
    description:
      "API em .NET que consome a BrasilAPI (CEP, bancos e outros dados públicos), com camadas bem separadas, " +
      "DTOs e tratamento de erros.",
    stack: [".NET", "C#", "REST", "Swagger"],
    status: "online",
    year: "2023",
    links: [{ label: "GitHub", url: "https://github.com/ffirmino/IntegraBrasilApi" }]
  }
];

/* Resumo da trajetória — detalhes completos ficam no LinkedIn */
const EXPERIENCE_SUMMARY =
  "17 anos desenvolvendo em .NET para bancos (cartões de crédito e débito), meios de pagamento, " +
  "e-procurement (Mercado Eletrônico) e distribuição farmacêutica (Grupo SC / Oncoprod), " +
  "em consultorias como BRQ, Cognizant e Tecmaster.";
const EXPERIENCE_DOMAINS = ["Bancos & cartões", "Meios de pagamento", "E-procurement", "Saúde & farma", "Sistemas legados"];

const EXPERIENCE = [
  {
    role: "Desenvolvedor .NET Sênior (PJ)",
    company: "Grupo SC · Oncoprod — via FSK Code",
    period: "Out 2023 — Atual",
    description:
      "Evolução e sustentação do KraftSales, sistema corporativo de vendas em ASP.NET WebForms com SQL Server: " +
      "novas telas, stored procedures, RPAs e correções em produção, com Azure DevOps e Git.",
    stack: ["ASP.NET WebForms", "C#", "SQL Server", "RPA", "Azure DevOps"]
  },
  {
    role: "Software Engineer",
    company: "Mercado Eletrônico",
    period: "Jun 2022 — Set 2023",
    description:
      "APIs públicas e privadas em .NET Core 6 com OData. SQL Server, Oracle e MongoDB. Mensageria com " +
      "RabbitMQ e Kafka. Sustentação de legado em ASP.NET MVC 5, ASP Clássico e JavaScript.",
    stack: [".NET 6", "OData", "RabbitMQ", "Kafka", "MongoDB", "Oracle"]
  },
  {
    role: "Analista Desenvolvedor Sênior",
    company: "BRQ Digital Solutions",
    period: "Jun 2020 — Mai 2022",
    description:
      "Cliente bancário, área de cartões de crédito e débito: novas soluções e legado em ASP.NET WebForms, " +
      "MVC, WPF, Windows Forms e Xamarin, com SQL Server.",
    stack: ["ASP.NET", "WPF", "Xamarin", "SQL Server"]
  },
  {
    role: "Analista Desenvolvedor Sênior",
    company: "Cognizant",
    period: "Set 2019 — Mai 2020",
    description:
      "Mesmo cliente bancário de cartões: desenvolvimento e sustentação em ASP.NET, WPF e Xamarin.",
    stack: ["ASP.NET", "WPF", "Xamarin"]
  },
  {
    role: "Analista Desenvolvedor Sênior",
    company: "Tecmaster",
    period: "Set 2019 — Mai 2020",
    description:
      "App mobile para cliente bancário em .NET Core 3.0, migrado para 3.2, no time de desenvolvimento e suporte.",
    stack: [".NET Core 3", "Mobile"]
  }
];

const SKILLS = [
  { group: "Back-end", items: ["C#", ".NET 8/9", ".NET Framework 4.x", "ASP.NET Core", "WebForms", "MVC", "Web API", "OData", "EF Core", "Dapper", "ADO.NET", "VB.NET"] },
  { group: "Front-end", items: ["Angular", "React", "TypeScript", "JavaScript", "HTML/CSS", "Bootstrap", "Blazor"] },
  { group: "Dados", items: ["SQL Server (T-SQL)", "Oracle (PL/SQL)", "PostgreSQL", "MongoDB", "MySQL", "Power BI"] },
  { group: "Mensageria & Cloud", items: ["RabbitMQ", "Kafka", "AWS (SQS, S3, EC2, IAM)", "Azure", "Docker", "Kubernetes"] },
  { group: "DevOps & Processo", items: ["Azure DevOps", "Git / TFS", "GitHub Actions", "GitLab CI", "Scrum", "Kanban"] },
  { group: "Automação & IA", items: ["RPA", "Jobs agendados", "Integrações REST/SOAP", "Bots Telegram", "Claude API"] }
];

const EDUCATION = [
  { course: "Pós-graduação — DevOps Engineering and Planning", school: "Centro de Inovação VincIT (UNICIV)", period: "2019 — 2020" },
  { course: "Pós-graduação — Arquitetura de Soluções na Plataforma .NET", school: "Centro de Inovação VincIT (UNICIV)", period: "2018 — 2019" },
  { course: "Tecnologia em Análise e Desenvolvimento de Sistemas", school: "Universidade Ítalo Brasileiro", period: "2013 — 2016" }
];

const CERTS = [
  "Scrum Foundation Professional Certificate",
  "Microsoft Azure Data Fundamentals",
  "Microsoft Power BI",
  "AWS Cloud Practitioner Essentials",
  "AWS na prática (40h)",
  "Kubernetes e Docker — do básico ao avançado",
  ".NET Core OData — Microsoft",
  "Arquitetura de Microsserviços com ASP.NET, .NET 6 e C# (20h)",
  "Full-Stack React + .NET 6 + EF Core (16h)",
  "Angular 7/8 + Material + Node.js + MongoDB + Firebase (40h)"
];

const INTERESTS = "Atividades ao ar livre, culturas orientais e artes marciais, motos customizadas, ficção científica, fantasia, animes e culinária.";

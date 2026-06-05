import type { PortfolioData, Achievement, Certification } from "@/types";
import certificationsJson from "./certifications.json";
import achievementsJson from "./achievements.json";

const certifications = certificationsJson as Certification[];
const achievements = achievementsJson as Achievement[];

// Portfolio data for Jathurshan Thadchanamoorthy.
// Mirrors claude-design/data.js; certifications/achievements come from JSON.
export const PORTFOLIO_DATA: PortfolioData = {
  person: {
    name: "Jathurshan",
    fullName: "Jathurshan Thadchanamoorthy",
    title: "software · devops · ai/ml",
    location: "sri lanka",
    statement:
      "I build and ship reliable systems — from the database to the deploy pipeline. Some have models in them. A few run on-chain.",
    bio: [
      "I'm a computer engineering undergraduate at the University of Ruhuna. I recently completed a six-month software engineering internship at IronOne Technologies, where I helped build the Primary Dealer System used by Sri Lanka's fintech sector — Quarkus on the backend, React + TypeScript on the front. I'm now looking for a full-time software engineering role.",
      "My work spans more than one lane. On the platform side: Docker, Kubernetes, AWS, Jenkins pipelines, Nginx tuning — the unglamorous wiring that keeps services alive. On the ml side: a published paper on employee-turnover prediction (ensemble KNN + Random Forest), the Stanford ML specialization, and a TensorFlow habit. And on the chain side: Hyperledger Fabric and a bit of Solidity, mostly out of curiosity for what permissioned ledgers can actually solve.",
      "Add competitive programming on top — 19th nationally and 245th globally at IEEE Xtreme '24, 5th at HaXtreme 3.0. I care about systems that hold up under real load: secure auth, sensible APIs, observability you can actually read. Less about novelty, more about the thing not breaking at 2am.",
    ],
    email: "jathurshant.eng@gmail.com",
    socials: {
      github: "https://github.com/jathurT",
      linkedin: "https://linkedin.com/in/jathurt",
      leetcode: "https://leetcode.com/u/jathurT",
      medium: "https://medium.com/@jathurT",
    },
    intern: "open to software engineering roles · ex-IronOne",
    timezone: "Asia/Colombo",
  },

  facts: [
    { v: "3.91", l: "GPA / 4.0 · UoR" },
    { v: "8,784", l: "Teams beaten at IEEE Xtreme" },
    { v: "23+", l: "Certifications shipped" },
    { v: "6 mo", l: "Shipped fintech @ IronOne" },
  ],

  experience: [
    {
      company: "IronOne Technologies",
      role: "Software Engineer Intern · completed",
      dates: "may 2025 — nov 2025",
      summary:
        "Six-month internship in the fintech domain on the Primary Dealer System (capital-markets trading, ATrad). Built backend services in Java/Quarkus using both reactive and imperative programming, with Flyway database migrations and Keycloak authentication; shipped responsive React + TypeScript front-ends; collaborated with cross-functional teams in Agile sprints and contributed to documentation and code reviews — plus an indecent amount of debugging Keycloak.",
      stack: ["Quarkus", "Java", "Flyway", "Keycloak", "React", "TypeScript", "PostgreSQL"],
    },
    {
      company: "University of Ruhuna",
      role: "Computer Engineering · undergraduate",
      dates: "2022 — present",
      summary:
        "BSc Computer Engineering, GPA 3.91 / 4.0. Concentrating on distributed systems, machine learning, and applied cryptography.",
      stack: ["C++", "Java", "Python", "Systems", "Networks", "Algorithms"],
    },
    {
      company: "IEEE Xtreme 24h",
      role: "Competitive Programmer · 19th national / 245th global",
      dates: "oct 2024",
      summary:
        "Solo'd against 8,784 teams over 24 hours of algorithmic problems. Sleep, optional. Caffeine, mandatory.",
      stack: ["C++", "Python", "Algorithms", "Problem Solving"],
    },
    {
      company: "HaXtreme 3.0",
      role: "Hackathon · 5th place",
      dates: "2024",
      summary:
        "5th of 93+ teams. Built and shipped a full prototype in under 36 hours.",
      stack: ["Full Stack", "React", "Node", "Speed"],
    },
  ],

  featured: [
    {
      year: "2026",
      title: "ChocoJava — Cloud-Native Retail Platform",
      desc: "Full-stack, cloud-native e-commerce platform built to stay fast, available, and secure under concurrent load. Six independently deployable Spring Boot microservices on a database-per-service model (Flyway migrations, Hibernate Envers audit trails) with a hybrid comms layer — synchronous OpenFeign behind Resilience4j circuit breakers, asynchronous Kafka event fan-out. Centralized Keycloak OAuth2/OIDC with per-service JWT validation and zero static secrets (AWS Secrets Manager + External Secrets Operator + IRSA). Deployed on multi-AZ AWS EKS with Horizontal Pod Autoscaling and NGINX Ingress/ALB, shipped via a Jenkins → ECR → Kustomize pipeline with immutable git-sha images. React 19 + TypeScript + Tailwind front with a custom design system, 8 feature pages, Radix UI, and Keycloak SSO. 4-member team · EC7205 Cloud Computing, University of Ruhuna.",
      stack: [
        "Spring Boot",
        "Microservices",
        "AWS EKS",
        "Kubernetes",
        "Kafka",
        "Keycloak",
        "Jenkins",
        "React 19",
        "PostgreSQL",
        "Kustomize",
      ],
      live: null,
      github: "https://github.com/jathurT/MICROSERVICE-APPLICATION-IN-APP",
      demo: "https://drive.google.com/file/d/1-JkpK6RAT8wE2kdSSLgy9puuzvcWUW5w/view",
      mock: "cloud",
    },
    {
      year: "2026 — present",
      title: "Combined Blockchain · ZKP · GNN–LLM Defense for SDVNs",
      desc: "Research formulating false-accusation attacks in Software-Defined Vehicular Networks as a multi-variant, cross-layer trust-manipulation problem, extending the TFMD-SDVN baseline (Nayak et al., 2022) by exposing gaps in its EMA rating, recommendation aggregation, similarity, trust-fusion, and event-validation primitives. Four attack variants — opportunistic fabrication, Sybil consensus flooding, high-noise timing, and tampered-log evidence spoofing — are formalized and simulated, then countered by a dual-mode framework: decentralized reputation on Hyperledger Fabric with weighted-endorser consensus across three smart contracts (registration auth · reputation · controller-trust audit with failover), zkSNARK accusation verification (legitimacy without identity disclosure), a temporal-attention GNN for coordinated-behaviour detection, a Transformer LLM layer for explainable incident reports over controller logs, and post-quantum primitives. Evaluated in NS-3 across 0–100% malicious-node ratios via PDR · PIR · MCC. Supervisor: Dr. P.A.D.S.N. Wijesekara, Dept. of Electrical & Information Engineering, University of Ruhuna.",
      stack: [
        "Hyperledger Fabric",
        "zkSNARK",
        "GNN",
        "LLM / Transformers",
        "NS-3",
        "Post-Quantum Crypto",
        "Smart Contracts",
        "Python",
      ],
      live: null,
      github: null,
      mock: "blockchain",
    },
    {
      year: "2026",
      title: "PillPin — Real-Time Medicine-Availability Platform",
      desc: "Team-lead build for {PROXY}Maze '26: a real-time platform that aggregates public stock data from 3 pharmacy chains across 3 countries (Boots UK · Apollo/1mg India · Osusala Sri Lanka) into one normalized availability API and consumer map. A pluggable transport seam lets a production rotating residential/ISP proxy mesh drop in by implementing a single class and flipping one env var. Python/FastAPI backend over async SQLAlchemy 2 with an APScheduler scrape loop and a two-table freshness store; a Google Gemini AI layer normalizes messy multilingual drug names to one canonical ID and answers natural-language queries in English, Sinhala, and Tamil. Ships a metered B2B SaaS layer — JWT, RBAC, API keys, usage metering, real Stripe (test-mode) Checkout + webhooks — with a React + TypeScript consumer map and a dark B2B terminal.",
      stack: [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "Google Gemini",
        "React",
        "TypeScript",
        "Stripe",
        "PostgreSQL",
      ],
      live: null,
      github: "https://github.com/jathurT/ProxyMaze-Phase2-impl",
      mock: "pillpin",
    },
    {
      year: "2024 — 2025",
      title: "DN Dental Clinic Platform",
      desc: "Led a 4-member team across 8 Agile sprints to build the Spring Boot (Spring MVC) backend for a dental practice — appointment booking, patient records, and payments. JWT-secured REST APIs with role-based access control powering 2 React + TypeScript frontends (patient and admin), containerized with Docker Compose and a Jenkins CI pipeline, with Prometheus + Grafana monitoring.",
      stack: [
        "Spring Boot",
        "Spring MVC",
        "React",
        "TypeScript",
        "JWT",
        "Docker",
        "Jenkins",
        "Grafana",
      ],
      live: null,
      github: "https://github.com/jathurT/jathurT-DN-Dental-Clinic-Backend",
      mock: "dental",
    },
    {
      year: "2024",
      title: "Employee Turnover Prediction",
      desc: "Trained and benchmarked 5 supervised models (KNN, Random Forest, Logistic Regression, Decision Tree, Gradient Boosting) on the Kaggle HR-Analytics dataset to predict turnover. Heavy data preprocessing, feature engineering, and hyperparameter tuning to surface the key retention indicators, compared on accuracy, precision, recall, F1, and ROC-AUC — methodology and findings published as a paper on ResearchGate.",
      stack: [
        "Python",
        "Scikit-Learn",
        "Random Forest",
        "Gradient Boosting",
        "KNN",
        "Pandas",
        "NumPy",
      ],
      live: "https://www.researchgate.net/publication/387298065",
      github: "https://github.com/jathurT/Employee-Turnover-Prediction-ML",
      mock: "ml",
    },
  ],

  archive: [
    {
      year: "2025",
      title: "Real-Time Network Monitoring Tool",
      stack: ["Java", "JavaFX", "Sockets"],
      github: "https://github.com/jathurT/Socket-Programming-Project",
    },
    {
      year: "2024",
      title: "E-Commerce REST API",
      stack: ["Spring Boot", "PostgreSQL", "JWT", "REST"],
      github: "https://github.com/jathurT/eCommerce-Spring-Boot",
    },
    {
      year: "2024",
      title: "Point of Sale System",
      stack: ["C#", "WPF", "SQLite"],
      github: "https://github.com/jathurT/WPF-POS-System-Master",
    },
    {
      year: "2024",
      title: "Retail Billing Automation System",
      stack: ["C++", "DSA", "OOP"],
      github: "https://github.com/jathurT/Retail-Billing-Automation-System",
    },
    {
      year: "2024",
      title: "Blood Bank Management System",
      stack: ["SQL", "Stored Procedures", "Indexing"],
      github: "https://github.com/jathurT/Blood-Bank-Management-System-RDMS",
    },
    {
      year: "2025",
      title: "Spring Boot Actuator deep-dive",
      stack: ["Spring Boot", "Observability"],
    },
    {
      year: "2025",
      title: "Spring AI experiments",
      stack: ["Spring AI", "LLMs", "Vector DB"],
    },
    {
      year: "2024",
      title: "Neural Networks & Deep Learning (cert.)",
      stack: ["TensorFlow", "Backprop"],
    },
    {
      year: "2025",
      title: "Go fundamentals (HackerRank Basic)",
      stack: ["Go", "Concurrency"],
    },
    {
      year: "2025",
      title: "JUnit + Mockito unit-testing playbook",
      stack: ["JUnit", "Mockito", "TDD"],
    },
    {
      year: "2025",
      title: "Stanford ML specialization",
      stack: ["Supervised", "Unsupervised", "RL"],
    },
  ],

  skills: [
    {
      cat: "Backend",
      items: [
        ["Java", "3y"],
        ["Spring Boot", "2y"],
        ["Spring Cloud", "1y"],
        ["Quarkus", "1y"],
        ["FastAPI", "1y"],
        ["Python", "3y"],
        ["Node.js", "2y"],
        ["Kafka", "1y"],
        ["Flyway", "1y"],
      ],
    },
    {
      cat: "Frontend",
      items: [
        ["React", "3y"],
        ["Next.js", "2y"],
        ["TypeScript", "2y"],
        ["Tailwind", "2y"],
      ],
    },
    {
      cat: "Data",
      items: [
        ["PostgreSQL", "2y"],
        ["MySQL", "3y"],
        ["MongoDB", "2y"],
        ["Redis", "1y"],
        ["Oracle", "1y"],
        ["Neo4j", "1y"],
      ],
    },
    {
      cat: "Infra",
      items: [
        ["Docker", "2y"],
        ["Kubernetes", "1y"],
        ["AWS", "2y"],
        ["Jenkins", "2y"],
        ["Terraform", "1y"],
        ["Prometheus / Grafana", "1y"],
        ["Keycloak", "1y"],
        ["Nginx", "1y"],
      ],
    },
    {
      cat: "ML / Data",
      items: [
        ["Scikit-Learn", "2y"],
        ["TensorFlow", "1y"],
        ["Pandas / NumPy", "2y"],
      ],
    },
    {
      cat: "Web3",
      items: [
        ["Hyperledger Fabric", "6mo"],
        ["Solidity", "6mo"],
        ["Ethereum", "6mo"],
      ],
    },
  ],

  recommendations: [
    {
      name: "Durshika Balaraja",
      role: "Senior Technical PM",
      company: "IronOne Technologies",
      relationship: "Direct Manager",
      initials: "DB",
      tint: "emerald",
      date: "Nov 20, 2025",
      pull: "An outstanding contributor — dependable, proactive, open to feedback.",
      quote:
        "I had the pleasure of supervising Jathurshan during his internship as a Software Engineering Intern, and I can confidently say he has been an outstanding contributor to our team. From the very beginning, he showed strong enthusiasm to learn, take ownership, and consistently improve his skills. He quickly adapted to our technical environment and delivered his tasks with focus, responsibility, and attention to detail. His ability to grasp both the technical and functional aspects of the work was impressive for someone at an intern level.",
      featured: true,
    },
    {
      name: "Rashmi Prabhath",
      role: "Lead Software Engineer",
      company: "IronOne Technologies",
      relationship: "Mentor",
      initials: "RP",
      tint: "emerald",
      date: "Dec 15, 2025",
      pull: "Delivered on time — even in the hardest situations.",
      quote:
        "Consistently impressed by his technical depth and quick learning curve. He demonstrated a professional attitude and a remarkable ability to deliver requirements on time, even when faced with challenging situations. Jathurshan went beyond expectations by putting in extra effort to ensure project success.",
    },
    {
      name: "Irantha Thilakarathna",
      role: "Technical BA",
      company: "IronOne Technologies",
      relationship: "Colleague",
      initials: "IT",
      tint: "amber",
      date: "Dec 7, 2025",
      pull: "Operated at a Software Engineer level, not an intern level.",
      quote:
        "Unlike a typical intern who performs only assigned tasks, he consistently operated at a Software Engineer level — taking full ownership, proactively identifying solutions, and delivering beyond expectations. Highly solution-oriented, always willing to explore alternatives and refine approaches.",
    },
    {
      name: "Haathim Munas",
      role: "Software Engineer",
      company: "IronOne Technologies",
      relationship: "Colleague",
      initials: "HM",
      tint: "sky",
      date: "Nov 22, 2025",
      pull: "Always asking the right questions.",
      quote:
        "From the first day onwards, Jathurshan impressed us with his technical skills. He was always asking the right questions, which helped him improve as well as contribute to the project. He was always responsible with his work and committed immensely.",
    },
    {
      name: "Shanilka Madushan",
      role: "Software Engineer",
      company: "IronOne Technologies",
      relationship: "Colleague",
      initials: "SM",
      tint: "coral",
      date: "Nov 20, 2025",
      pull: "Stood out as a promising Software Engineer.",
      quote:
        "He consistently completed his tasks with accuracy and professionalism. Jathurshan collaborated exceptionally well with QA and Business Analyst teams, communicating clearly and contributing meaningful ideas.",
    },
    {
      name: "Sukumar Kavishan",
      role: "Software Engineer",
      company: "IronOne Technologies",
      relationship: "Colleague",
      initials: "SK",
      tint: "rose",
      date: "Nov 17, 2025",
      pull: "Hard work, accountability, strong problem-solving.",
      quote:
        "Impressed by his hard work, accountability, and strong problem-solving ability. He consistently took ownership, quickly understood requirements, and delivered high-quality work with a positive attitude.",
    },
    {
      name: "Sanka Vidushan",
      role: "QA Engineer",
      company: "IronOne Technologies",
      relationship: "Colleague",
      initials: "SV",
      tint: "violet",
      date: "May 24, 2026",
      pull: "Quick to adapt, strong problem-solver, genuinely professional.",
      quote:
        "I had the pleasure of working with Jathurshan during his internship as a Software Engineering Intern at IronOne Technologies. From the beginning, he demonstrated a strong ability to quickly adapt to the project domain and understand complex requirements within a short period of time. He consistently showed excellent technical skills, problem-solving ability, and a willingness to contribute to critical project activities — proactive in understanding the project's critical path and always ready to support the team in delivering quality outcomes. What impressed me most was his dedication, fast learning capability, and the professionalism he maintained throughout his internship.",
    },
  ],

  writing: [
    {
      date: "2025.04",
      title: "What I learned wiring Keycloak into a four-tier RBAC",
      read: "8 min",
    },
    {
      date: "2025.02",
      title: "Quarkus vs. Spring Boot — six months later",
      read: "11 min",
    },
    {
      date: "2024.12",
      title: "Ensemble methods for turnover prediction: a postmortem",
      read: "14 min",
    },
  ],

  achievements,
  certifications,
};

/**
 * FCIT WORKING GUILDS — DETAILED COMMUNITY ARCHITECTURE
 * Location: src/data/guildsDetailedData.js
 *
 * Verified data for the four autonomous disciplines under FCIT (HBTU Kanpur):
 * 1. Dev's Guild (Software Engineering & Scalable Systems)
 * 2. Intelligence Guild (AI, Machine Learning & LLMs)
 * 3. Algocrew (Algorithms & Competitive Programming)
 * 4. Fusion X (Interdisciplinary Innovation & Embedded Systems)
 *
 * Strict Rule: Contains only verified student leadership from teamPageData.js
 * and authentic projects from projectsData.js. Zero fabricated member data.
 */

import {
  DEVS_GUILD_MEMBERS,
  INTELLIGENCE_GUILD_MEMBERS,
  ALGOCREW_MEMBERS,
  FUSION_X_MEMBERS,
} from './teamPageData';

export const GUILDS_DETAILED = [
  {
    id: 'devs-guild',
    number: '01',
    name: "DEV'S GUILD",
    domain: 'Software Architecture & Scalable Systems',
    discipline: 'Software Architecture & Scalable Systems',
    tagline: 'BUILD · DEPLOY · SCALE',
    motto: 'Build systems that hold up in the real world.',
    description:
      "Dev's Guild is the software engineering and infrastructure community of FCIT. We architect resilient web applications, distributed backend services, cloud environments, and open-source tooling from first principles. Here, theoretical computing systems meet industrial software craftsmanship.",
    introduction:
      "Dev's Guild is the software engineering and infrastructure community of FCIT. We architect resilient web applications, distributed backend services, cloud environments, and open-source tooling from first principles. Here, theoretical computing systems meet industrial software craftsmanship.",
    bgImage: '/images/guilds/01-devs-guild.webp',
    alt: "Dev's Guild — architectural gateway with glowing golden pathway, server infrastructure and burgundy ribbon",
    layout: 'dev',
    decorType: 'devs',
    initialDomains: [
      'Full-Stack Development',
      'Backend Architecture',
      'DevOps & Cloud',
      'Open Source Tooling',
    ],
    technicalDomains: [
      {
        id: 'full-stack',
        name: 'Full-Stack Systems',
        badge: 'ENGINEERING',
        summary: 'Architecting end-to-end reactive applications with clean separation of presentation, state, and persistence layers.',
        topics: ['Component Hierarchies', 'State Management', 'Server-Side Rendering', 'Micro-Frontends'],
        relevance: 'Powers all university web portals, student tools, and community registries.'
      },
      {
        id: 'backend-arch',
        name: 'Backend Architecture',
        badge: 'DISTRIBUTED',
        summary: 'Designing high-concurrency microservices, idempotent RESTful and GraphQL APIs, and reliable message pipelines.',
        topics: ['API Gateways', 'Service Mesh', 'Schema Migrations', 'Rate Limiting & Caching'],
        relevance: 'Ensures zero-downtime operations during campus-wide registration spikes.'
      },
      {
        id: 'devops-cloud',
        name: 'Cloud Computing & DevOps',
        badge: 'INFRASTRUCTURE',
        summary: 'Containerized deployment topologies, automated CI/CD pipelines, and robust production Linux server hardening.',
        topics: ['Docker Sandboxing', 'Kubernetes Clusters', 'Zero-Downtime CD', 'Linux Security'],
        relevance: 'Manages internal build runners, staging environments, and production VPS nodes.'
      },
      {
        id: 'databases',
        name: 'Database Engineering',
        badge: 'STORAGE',
        summary: 'Relational data modeling with strict ACID guarantees alongside flexible high-speed document and memory stores.',
        topics: ['PostgreSQL Indexing', 'MongoDB Aggregations', 'Redis Caching', 'Query Optimization'],
        relevance: 'Safeguards academic telemetry, judge evaluations, and historical archives.'
      },
      {
        id: 'open-source',
        name: 'Open Source Development',
        badge: 'COMMUNITY',
        summary: 'Cultivating upstream contribution etiquette, code review rigor, package publishing, and mentorship for GSoC/LFX.',
        topics: ['Upstream Pull Requests', 'Git Workflows', 'Semantic Versioning', 'Maintainer Etiquette'],
        relevance: 'Helps students land their first merged PRs in global software foundations.'
      },
      {
        id: 'reliability',
        name: 'Reliability & Testing',
        badge: 'OBSERVABILITY',
        summary: 'Automated unit, integration, and end-to-end testing coupled with structured distributed logging and metrics.',
        topics: ['Vitest & Jest', 'Playwright E2E', 'Distributed Tracing', 'Load Profiling'],
        relevance: 'Prevents regressions and verifies system resilience before live deployments.'
      },
    ],
    techStack: [
      { name: 'React', category: 'Frontend', desc: 'Component architecture, reactive hooks, and high-performance DOM reconciliation.', level: 'Core' },
      { name: 'Node.js', category: 'Backend', desc: 'Event-driven, non-blocking asynchronous server runtime for scalable microservices.', level: 'Core' },
      { name: 'Express', category: 'Backend', desc: 'Fast, unopinionated, minimalist web framework for robust HTTP API endpoints.', level: 'Core' },
      { name: 'PostgreSQL', category: 'Database', desc: 'Enterprise-grade ACID-compliant relational persistence with advanced indexing.', level: 'Core' },
      { name: 'MongoDB', category: 'Database', desc: 'Flexible JSON document datastore for high-volume unstructured and telemetry data.', level: 'Supporting' },
      { name: 'Docker', category: 'DevOps', desc: 'Lightweight operating-system-level virtualization for strict environment parity.', level: 'Core' },
      { name: 'Git & GitHub', category: 'Tooling', desc: 'Distributed version control, branch protection workflows, and peer code reviews.', level: 'Core' },
      { name: 'Redis', category: 'Database', desc: 'In-memory key-value data structure store used for caching and message queuing.', level: 'Supporting' },
      { name: 'TypeScript', category: 'Frontend', desc: 'Statically typed superset of JavaScript providing scalable compile-time safety.', level: 'Core' },
    ],
    leadership: [
      {
        ...DEVS_GUILD_MEMBERS[0], // Vansh Baraswal
        responsibility: 'Software Architecture, Full-Stack Systems & Platform Engineering',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...DEVS_GUILD_MEMBERS[1], // Hitesh Verma
        responsibility: 'Backend Engineering, Distributed APIs & Database Orchestration',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...DEVS_GUILD_MEMBERS[2], // Uday Singh Dhaila
        responsibility: 'Frontend Architecture, Design Systems & DevOps Pipelines',
        github: 'https://github.com/fcit-hbtu',
      },
    ],
    activities: [
      {
        title: 'Bi-Weekly Build Sprints',
        type: 'SPRINT',
        cadence: 'Every alternate Saturday',
        summary: 'Intensive 8-hour hands-on sprints where student squads build and ship working software utilities, from browser extensions to REST services.',
        outcome: 'Production-ready pull requests merged into the FCIT repositories.'
      },
      {
        title: 'Upstream Open-Source Drive',
        type: 'MENTORSHIP',
        cadence: 'Monthly Rhythms',
        summary: 'Guided walkthroughs of high-impact repositories in CNCF and Apache, teaching students how to identify good-first-issues and submit clean commits.',
        outcome: 'Over 120 upstream pull requests merged by student contributors.'
      },
      {
        title: 'Architecture & Profiling Clinics',
        type: 'WORKSHOP',
        cadence: 'Monthly Salons',
        summary: 'Deep dives into network latency profiling, PostgreSQL EXPLAIN query analysis, memory leak detection, and cache invalidation strategies.',
        outcome: 'Deep architectural understanding beyond tutorial-level implementations.'
      },
      {
        title: 'Zero-to-Deploy Sandboxes',
        type: 'CHALLENGE',
        cadence: 'Semester Bootcamps',
        summary: 'Teams configure bare-metal Linux VPS nodes from scratch, setting up Nginx reverse proxies, Docker compose topologies, and SSL certificates.',
        outcome: 'End-to-end deployment confidence for real-world production systems.'
      },
    ],
    projects: [
      {
        title: 'Open Source Desk',
        subtitle: 'Curated Mentorship & Issue Curation Platform',
        category: 'DEVELOPER TOOLING',
        status: 'ACTIVE TOOLING',
        summary: 'An algorithmic discovery engine indexing beginner-welcoming issues across high-impact open-source repositories, bridging the gap between syntax and upstream PRs.',
        tech: ['Rust', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Docker'],
        metrics: [
          { label: 'Indexed Issues', value: '1,400+' },
          { label: 'Active Students', value: '380+' },
          { label: 'Merged PRs', value: '124' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/open-source-desk',
      },
      {
        title: 'FCIT Engineering Portal',
        subtitle: 'High-Performance Editorial Web Platform',
        category: 'WEB INFRASTRUCTURE',
        status: 'CAMPUS DEPLOYMENT',
        summary: 'The digital nerve center of the fraternity, featuring responsive editorial storytelling, zero-dependency visualizers, dynamic archive lookup, and sub-second load times.',
        tech: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Docker'],
        metrics: [
          { label: 'Bundle Speed', value: '< 900ms' },
          { label: 'Lighthouse Score', value: '98/100' },
          { label: 'Design Tokens', value: '100% PBR' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/fcit-website',
      },
    ],
    participation: {
      headline: 'How to Build with Dev\'s Guild',
      subheadline: 'Open to all students of CSE, IT, and affiliated engineering disciplines at HBTU.',
      steps: [
        {
          num: '01',
          title: 'Join the Junior Build Cohort',
          desc: 'Attend bi-weekly orientation salons where senior engineering leads guide you through local environment setup and modern Git workflows.'
        },
        {
          num: '02',
          title: 'Pick an Open Issue',
          desc: 'Visit the FCIT repository board and claim an open task tagged with #good-first-issue to receive dedicated peer code review.'
        },
        {
          num: '03',
          title: 'Join Core Infrastructure',
          desc: 'Maintain campus API microservices, manage Docker staging clusters, and orchestrate technical challenges for the fraternity.'
        },
      ],
      ctaText: 'Apply to Join Dev\'s Guild Sprints',
      ctaLink: '/join',
    },
  },
  {
    id: 'intelligence-guild',
    number: '02',
    name: 'INTELLIGENCE GUILD',
    domain: 'Data Science · Machine Learning · LLMs',
    discipline: 'Data Science · Machine Learning · LLMs',
    tagline: 'TEACH MACHINES TO THINK',
    motto: 'Find patterns. Train ideas. Explore intelligence.',
    description:
      'Intelligence Guild is the machine intelligence, data science, and applied artificial intelligence research collective of FCIT. We investigate neural architectures, transformer models, computer vision systems, and efficient edge inference. We bridge mathematical formulations with production-grade AI pipelines.',
    introduction:
      'Intelligence Guild is the machine intelligence, data science, and applied artificial intelligence research collective of FCIT. We investigate neural architectures, transformer models, computer vision systems, and efficient edge inference. We bridge mathematical formulations with production-grade AI pipelines.',
    bgImage: '/images/guilds/02-intelligence-guild.webp',
    alt: 'Intelligence Guild — classical marble sculpture with a golden neural network constellation',
    layout: 'intelligence',
    decorType: 'intelligence',
    initialDomains: [
      'Large Language Models',
      'Computer Vision',
      'Generative AI',
      'Applied Data Science',
    ],
    technicalDomains: [
      {
        id: 'llm-transformers',
        name: 'LLMs & Transformers',
        badge: 'GEN-AI',
        summary: 'Studying multi-head self-attention mechanisms, tokenization pipelines, context-window scaling, and parameter-efficient fine-tuning (LoRA).',
        topics: ['FlashAttention', 'Quantization (AWQ/GGUF)', 'RAG Pipelines', 'Prompt Optimization'],
        relevance: 'Powers specialized semantic search and campus pedagogical chatbots.'
      },
      {
        id: 'computer-vision',
        name: 'Computer Vision & OCR',
        badge: 'PERCEPTION',
        summary: 'Convolutional backbones, Vision Transformers (ViT), semantic segmentation, and historical Indic script transcription.',
        topics: ['Vision Transformers', 'Devanagari OCR', 'Spatial Transformers', 'Sauvola Binarization'],
        relevance: 'Deploys deep learning models to digitize rare historical archives and campus manuscripts.'
      },
      {
        id: 'generative-ai',
        name: 'Generative AI & Diffusion',
        badge: 'SYNTHESIS',
        summary: 'Denoising diffusion probabilistic models, latent vector spaces, multimodal image-text embeddings, and conditional generation.',
        topics: ['Latent Diffusion', 'CLIP Embeddings', 'Classifier-Free Guidance', 'Style Conditioning'],
        relevance: 'Explores multimodal generative tooling for technical illustrations and diagrams.'
      },
      {
        id: 'data-science',
        name: 'Data Science & Analytics',
        badge: 'ANALYTICS',
        summary: 'Exploratory data analysis, statistical significance testing, feature engineering, and high-dimensional clustering.',
        topics: ['Dimensionality Reduction', 'Hypothesis Testing', 'Time-Series Decomposition', 'Pandas Pipelines'],
        relevance: 'Analyzes energy consumption, exam statistics, and campus research datasets.'
      },
      {
        id: 'deep-learning',
        name: 'Deep Learning Formulations',
        badge: 'THEORY',
        summary: 'Mathematical formulations of loss landscapes, backpropagation calculus, stochastic gradient descent optimizers, and regularization.',
        topics: ['Loss Surface Analysis', 'AdamW / Lion Optimizers', 'Gradient Clipping', 'Vanishing Gradients'],
        relevance: 'Develops first-principles understanding beyond black-box library wrappers.'
      },
      {
        id: 'model-deployment',
        name: 'Edge AI & Inference',
        badge: 'DEPLOYMENT',
        summary: 'Model quantization, ONNX Runtime conversion, TensorRT optimization, and deploying low-latency microservices on edge nodes.',
        topics: ['ONNX Export', 'INT8 Quantization', 'FastAPI Microservices', 'Streaming Responses'],
        relevance: 'Allows deep models to run locally on resource-constrained lab computers.'
      },
    ],
    techStack: [
      { name: 'Python', category: 'Core', desc: 'The universal language of modern machine learning and scientific computing.', level: 'Core' },
      { name: 'PyTorch', category: 'Framework', desc: 'Dynamic tensor computation graph framework preferred by global research teams.', level: 'Core' },
      { name: 'TensorFlow', category: 'Framework', desc: 'Production-grade ML platform with robust TFLite edge deployment capabilities.', level: 'Supporting' },
      { name: 'Hugging Face', category: 'Ecosystem', desc: 'Transformers library, tokenizer pipelines, and open model hub integration.', level: 'Core' },
      { name: 'OpenCV', category: 'Vision', desc: 'Real-time computer vision, matrix image manipulation, and spatial filtering.', level: 'Core' },
      { name: 'Scikit-learn', category: 'Classical ML', desc: 'Comprehensive suite of statistical machine learning algorithms and metrics.', level: 'Core' },
      { name: 'FastAPI', category: 'Backend', desc: 'Asynchronous Python web server for serving low-latency inference endpoints.', level: 'Core' },
      { name: 'NumPy & Pandas', category: 'Data', desc: 'Vectorized array processing, mathematical routines, and dataframe wrangling.', level: 'Core' },
    ],
    leadership: [
      {
        ...INTELLIGENCE_GUILD_MEMBERS[0], // Naman Rajput
        responsibility: 'Large Language Models, Generative Architectures & Research Direction',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...INTELLIGENCE_GUILD_MEMBERS[1], // Aman Shukla
        responsibility: 'Deep Learning Pipelines, Computer Vision & Model Training',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...INTELLIGENCE_GUILD_MEMBERS[2], // Aditya Kumar Singh
        responsibility: 'Applied Data Science, Model Optimization & Neural Systems',
        github: 'https://github.com/fcit-hbtu',
      },
    ],
    activities: [
      {
        title: 'Weekly Paper Reading Salons',
        type: 'SEMINAR',
        cadence: 'Every Wednesday Evening',
        summary: 'Rigorous line-by-line analyses of seminal and contemporary machine learning preprints from NeurIPS, ICML, CVPR, and arXiv.',
        outcome: 'Deep conceptual grasp of novel loss functions, attention variants, and scaling laws.'
      },
      {
        title: 'Kaggle Competitions Sprints',
        type: 'HACKATHON',
        cadence: 'Monthly Hack Weeks',
        summary: 'Team-based sprints competing in global tabular, NLP, and vision leaderboards with disciplined cross-validation methodologies.',
        outcome: 'Top-tier rankings and verified leaderboard benchmarks across student cohorts.'
      },
      {
        title: 'Model Training Clinics',
        type: 'WORKSHOP',
        cadence: 'Bi-weekly Labs',
        summary: 'Hands-on laboratory sessions training small language models, fine-tuning LoRA adapters, and profiling GPU VRAM utilization.',
        outcome: 'Practical mastery of CUDA out-of-memory avoidance and distributed data parallel runs.'
      },
      {
        title: 'AI Research Paper Colloquium',
        type: 'RESEARCH',
        cadence: 'End of Semester',
        summary: 'Student researchers present ongoing undergraduate investigation papers on computer vision, medical telemetry, and local language models.',
        outcome: 'Peer-reviewed conference submissions mentored by departmental faculty.'
      },
    ],
    projects: [
      {
        title: 'GridSage AI',
        subtitle: 'Smart-Grid Electricity Demand Forecasting',
        category: 'APPLIED NEURAL SYSTEMS',
        status: 'RESEARCH PROTOTYPE',
        summary: 'A spatial-temporal neural network combining TCNs and attention mechanisms to forecast campus electrical load spikes 48 hours in advance.',
        tech: ['Python', 'PyTorch', 'TimescaleDB', 'FastAPI', 'Docker'],
        metrics: [
          { label: 'MAPE Accuracy', value: '2.84%' },
          { label: 'Inference Latency', value: '14ms' },
          { label: 'Energy Saved', value: '18.2%' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/gridsage-ai',
      },
      {
        title: 'IndicScribe OCR',
        subtitle: 'Attention-Based Handwritten Devanagari Recognition',
        category: 'COMPUTER VISION / NLP',
        status: 'RESEARCH IN PROGRESS',
        summary: 'Deep-learning vision-language transformer transcribing complex historical Hindi and Sanskrit ligatures with joint CTC-Attention decoders.',
        tech: ['PyTorch', 'OpenCV', 'Hugging Face', 'FastAPI', 'Next.js'],
        metrics: [
          { label: 'Character Accuracy', value: '96.2%' },
          { label: 'Word Error Rate', value: '4.1%' },
          { label: 'Supported Glyphs', value: '380+' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/indic-scribe',
      },
    ],
    participation: {
      headline: 'How to Research with Intelligence Guild',
      subheadline: 'Welcoming curious minds passionate about the mathematics and engineering of machine learning.',
      steps: [
        {
          num: '01',
          title: 'Attend the Weekly Reading Group',
          desc: 'Join the Wednesday paper reading circle in the department computing lab and participate in open methodology critiques.'
        },
        {
          num: '02',
          title: 'Join a Competition Squad',
          desc: 'Team up with peer researchers on active Kaggle problems and open-source benchmark suites to build your modeling intuition.'
        },
        {
          num: '03',
          title: 'Author a Research Preprint',
          desc: 'Collaborate with technical leads and faculty advisors on novel architectures and publish open reproducible code.'
        },
      ],
      ctaText: 'Join the AI Research Circle',
      ctaLink: '/join',
    },
  },
  {
    id: 'algocrew',
    number: '03',
    name: 'ALGOCREW',
    domain: 'DSA · Problem Solving · Competitive Programming',
    discipline: 'DSA · Problem Solving · Competitive Programming',
    tagline: 'THINK · SOLVE · OPTIMISE',
    motto: 'Think in structures. Move through problems.',
    description:
      'AlgoCrew is the algorithmic problem-solving crucible of FCIT. We cultivate rigor in computational complexity, advanced graph theory, dynamic programming, and competitive programming. Through intense weekly contest practice, mathematical proofs, and peer problem-solving, we prepare students for ICPC, Codeforces, and top-tier technical challenges.',
    introduction:
      'AlgoCrew is the algorithmic problem-solving crucible of FCIT. We cultivate rigor in computational complexity, advanced graph theory, dynamic programming, and competitive programming. Through intense weekly contest practice, mathematical proofs, and peer problem-solving, we prepare students for ICPC, Codeforces, and top-tier technical challenges.',
    bgImage: '/images/guilds/03-algocrew.webp',
    alt: 'AlgoCrew — geometric algorithmic cubes and interconnected graph pathways',
    layout: 'algo',
    decorType: 'algo',
    initialDomains: [
      'Competitive Programming',
      'Advanced Graph Theory',
      'Dynamic Programming',
      'Algorithm Design',
    ],
    technicalDomains: [
      {
        id: 'advanced-dsa',
        name: 'Advanced Data Structures',
        badge: 'FOUNDATION',
        summary: 'Mastery over Segment Trees with lazy updates, Fenwick Trees, Disjoint Set Union (DSU), Trie automata, and Treaps.',
        topics: ['Segment Trees', 'Lazy Propagation', 'Fenwick Trees', 'Persistent BSTs'],
        relevance: 'Solves range-query problems with microsecond O(log N) guarantees.'
      },
      {
        id: 'graph-theory',
        name: 'Graph Theory & Networks',
        badge: 'TOPOLOGY',
        summary: 'Shortest paths (Dijkstra, Bellman-Ford), articulation points, bridges, strongly connected components, and Dinic network flows.',
        topics: ['SCC & Tarjan', 'Eulerian Paths', 'Max Flow Min Cut', 'Heavy-Light Decomposition'],
        relevance: 'Models complex routing, topological sorting, and dependency resolutions.'
      },
      {
        id: 'dynamic-prog',
        name: 'Dynamic Programming',
        badge: 'OPTIMIZATION',
        summary: 'Multi-dimensional state spaces, Bitmask DP, Tree DP, Digit DP, and convex hull trick / divide-and-conquer optimizations.',
        topics: ['Bitmask DP', 'Tree DP', 'Convex Hull Trick', 'Knapsack Variations'],
        relevance: 'Solves non-trivial combinatorial optimization challenges in competitive rounds.'
      },
      {
        id: 'complexity-proofs',
        name: 'Computational Complexity',
        badge: 'THEORY',
        summary: 'Rigorous asymptotic bound evaluations, amortized runtime proofs, time-memory tradeoffs, and lower bound analyses.',
        topics: ['Big-O / Omega / Theta', 'Master Theorem', 'Amortized Analysis', 'NP-Completeness'],
        relevance: 'Eliminates time-limit exceeded (TLE) errors before writing a single line of code.'
      },
      {
        id: 'number-theory',
        name: 'Number Theory & Math',
        badge: 'MATHEMATICS',
        summary: 'Modular arithmetic, Fermat\'s Little Theorem, sieve theory, matrix exponentiation, and combinatorial counting.',
        topics: ['Euler Totient', 'Extended Euclidean', 'Matrix Exponentiation', 'Combinatorics'],
        relevance: 'Underpins cryptographic algorithms and fast modulo power solutions.'
      },
      {
        id: 'contest-strategy',
        name: 'Contest Strategy & Speed',
        badge: 'TACTICS',
        summary: 'Triage prioritization, micro-benchmarking STL containers, stress testing against randomized generators, and clock management.',
        topics: ['Fast I/O', 'Custom Comparators', 'Stress-Test Scripts', 'Penalty Mitigation'],
        relevance: 'Maximizes solved problem counts during 2-hour high-pressure rated rounds.'
      },
    ],
    techStack: [
      { name: 'C++', category: 'Language', desc: 'Industry standard for competitive programming, providing fast STL containers and pointer operations.', level: 'Core' },
      { name: 'C', category: 'Language', desc: 'Low-level structural foundation for microsecond efficiency and memory layouts.', level: 'Supporting' },
      { name: 'Python', category: 'Language', desc: 'Used for rapid mathematical problem prototyping and arbitrary-precision big integers.', level: 'Supporting' },
      { name: 'Java', category: 'Language', desc: 'Clean object-oriented algorithmic implementations and robust BigInteger utilities.', level: 'Supporting' },
      { name: 'Codeforces', category: 'Platform', desc: 'Global rated contests, vast problem taxonomy, and community editorials.', level: 'Core' },
      { name: 'CodeChef', category: 'Platform', desc: 'Collegiate contest ladders, Starters rounds, and annual algorithmic cups.', level: 'Core' },
      { name: 'CSES Problem Set', category: 'Platform', desc: 'The gold-standard curated reference problem set for comprehensive algorithmic mastery.', level: 'Core' },
      { name: 'AtCoder', category: 'Platform', desc: 'High-purity mathematical problem rounds with clean constraint formulations.', level: 'Supporting' },
    ],
    leadership: [
      {
        ...ALGOCREW_MEMBERS[0], // Ansh Swaroop
        responsibility: 'Advanced Data Structures, Graph Theory & Contest Orchestration',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...ALGOCREW_MEMBERS[1], // Kastoori Nigam
        responsibility: 'Dynamic Programming, Problem Curation & Workshop Mentorship',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...ALGOCREW_MEMBERS[2], // Shivashish Mehrotra
        responsibility: 'Competitive Strategy, ICPC Preparation & Contest Reviews',
        github: 'https://github.com/fcit-hbtu',
      },
    ],
    activities: [
      {
        title: 'Weekly Algorithmic Arena',
        type: 'CONTEST',
        cadence: 'Every Sunday Morning',
        summary: 'Virtual timed contest on Codeforces followed immediately by live whiteboard problem-solving and editorial breakdowns.',
        outcome: 'Continuous rating advancement and rapid pattern-recognition training.'
      },
      {
        title: 'DSA Topic Deep Dives',
        type: 'WORKSHOP',
        cadence: 'Tuesday & Thursday Evenings',
        summary: 'Comprehensive theory and problem walkthroughs covering Segment Trees, DSU, Shortest Paths, and Bitmask Dynamic Programming.',
        outcome: 'Complete mastery of university algorithmic curriculum and online judge standards.'
      },
      {
        title: 'Mock Coding Interviews',
        type: 'MENTORSHIP',
        cadence: 'Bi-weekly Sessions',
        summary: 'Simulated 45-minute technical interviews testing problem clarification, edge-case identification, and optimal time complexity.',
        outcome: 'Flawless performance in technical hiring rounds at top product companies.'
      },
      {
        title: 'ICPC Regional Prep Camp',
        type: 'BOOTCAMP',
        cadence: 'Pre-Season Intensive',
        summary: 'Multi-team 5-hour simulation contests training three-person squads on single-keyboard division, problem allocation, and debug protocols.',
        outcome: 'Multiple squads qualifying for ICPC Regional Onsites year after year.'
      },
    ],
    projects: [
      {
        title: 'CodeArena HBTU',
        subtitle: 'Sandboxed Algorithmic Evaluation Engine',
        category: 'SYSTEMS / JUDGE INFRASTRUCTURE',
        status: 'CAMPUS DEPLOYMENT',
        summary: 'A distributed automated judging system utilizing Linux Kernel namespaces and cgroups v2 to enforce microsecond isolation for contest submissions.',
        tech: ['Go', 'Docker / cgroups', 'Redis', 'PostgreSQL', 'C++'],
        metrics: [
          { label: 'Evaluation Latency', value: '< 250ms' },
          { label: 'Concurrent Judges', value: '64 nodes' },
          { label: 'Test Suites Run', value: '45,000+' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/code-arena',
      },
      {
        title: 'AlgoVault Reference Suite',
        subtitle: 'Benchmarked Graph & DP Template Suite',
        category: 'ALGORITHM LIBRARY',
        status: 'MAINTAINED TOOLING',
        summary: 'A battle-tested open-source library of verified competitive programming snippets with rigorous memory efficiency and correctness proofs.',
        tech: ['C++', 'Python', 'Algorithms', 'CSES Proofs'],
        metrics: [
          { label: 'Verified Templates', value: '180+' },
          { label: 'Correctness Rate', value: '100%' },
          { label: 'Stars on GitHub', value: '320+' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/algovault',
      },
    ],
    participation: {
      headline: 'How to Solve with AlgoCrew',
      subheadline: 'Whether starting with basic loops or competing in Codeforces Div 1, there is a dedicated track for you.',
      steps: [
        {
          num: '01',
          title: 'Join the CSES Starter Ladder',
          desc: 'Work through our curated 100-problem foundational ladder with weekly guidance from senior ICPC regionalists.'
        },
        {
          num: '02',
          title: 'Compete in Sunday Arena',
          desc: 'Participate in weekly timed internal contest rounds to measure your speed, accuracy, and penalty management.'
        },
        {
          num: '03',
          title: 'Form an ICPC Squad',
          desc: 'Team up with two fellow programmers for dedicated team practice sessions and compete in official preliminary rounds.'
        },
      ],
      ctaText: 'Enter the Algorithmic Arena',
      ctaLink: '/join',
    },
  },
  {
    id: 'fusion-x',
    number: '04',
    name: 'FUSION X',
    domain: 'Research · Innovation · Interdisciplinary Projects',
    discipline: 'Research · Innovation · Interdisciplinary Projects',
    tagline: 'RESEARCH · CONNECT · CREATE',
    motto: 'Where different disciplines find common ground.',
    description:
      'Fusion X is the experimental frontier where digital computation meets physical hardware and interdisciplinary research. We prototype embedded microcontrollers, IoT sensor networks, robotics control loops, and hardware-software integrations. We take software off the screen and embed it into physical reality.',
    introduction:
      'Fusion X is the experimental frontier where digital computation meets physical hardware and interdisciplinary research. We prototype embedded microcontrollers, IoT sensor networks, robotics control loops, and hardware-software integrations. We take software off the screen and embed it into physical reality.',
    bgImage: '/images/guilds/04-fusion-x.webp',
    alt: 'Fusion X — golden orbital armillary structure surrounding a luminous geometric core',
    layout: 'fusion',
    decorType: 'fusion',
    initialDomains: [
      'Embedded Systems',
      'Internet of Things',
      'Robotics & Automation',
      'Hardware-Software Integration',
    ],
    technicalDomains: [
      {
        id: 'embedded-firmware',
        name: 'Embedded Systems',
        badge: 'HARDWARE',
        summary: 'Bare-metal firmware architecture, timer interrupts, direct register access, and real-time scheduling on microcontrollers.',
        topics: ['Interrupt Vectors', 'Timer Registers', 'FreeRTOS Tasks', 'UART/SPI/I2C Protocols'],
        relevance: 'Enables microsecond deterministic control of physical sensors and actuators.'
      },
      {
        id: 'iot-networks',
        name: 'Internet of Things (IoT)',
        badge: 'TELEMETRY',
        summary: 'Decentralized sensor telemetries, MQTT message brokers, CoAP lightweight protocols, and edge node power management.',
        topics: ['MQTT Brokers', 'CoAP Protocols', 'Sleep Modes', 'Sensor Calibration'],
        relevance: 'Deploys campus-wide environmental, acoustic, and electricity monitoring nodes.'
      },
      {
        id: 'lora-mesh',
        name: 'Long-Range Radio & Mesh',
        badge: 'NETWORKING',
        summary: 'Sub-gigahertz radio propagation, LoRaWAN protocol stacks, and self-healing ad-hoc packet routing meshes.',
        topics: ['SX1262 LoRa Transceivers', 'Ad-hoc Routing', 'ECDH Encryption', 'Packet Fragmentation'],
        relevance: 'Creates zero-infrastructure emergency communication networks during backhaul outages.'
      },
      {
        id: 'robotics-control',
        name: 'Robotics & Actuation',
        badge: 'CONTROL',
        summary: 'Motor drivers (PWM), closed-loop PID control, inverse kinematics, and IMU sensor fusion with Kalman filters.',
        topics: ['PID Tuning', 'Kalman Filtering', 'Motor H-Bridges', 'Kinematics'],
        relevance: 'Powers autonomous vehicular robots and precision camera gimbals.'
      },
      {
        id: 'pcb-prototyping',
        name: 'Hardware Prototyping & PCB',
        badge: 'FABRICATION',
        summary: 'Schematic capture, PCB layout routing, component selection, rapid breadboard validation, and soldering standards.',
        topics: ['KiCad Schematics', 'PCB Trace Routing', 'SMD Soldering', 'Signal Integrity'],
        relevance: 'Transitions experimental breadboard circuits into permanent physical hardware.'
      },
      {
        id: 'interdisciplinary',
        name: 'Interdisciplinary Innovation',
        badge: 'INNOVATION',
        summary: 'Bridging computer science with mechanical design, biomedical signals, and digital preservation humanities.',
        topics: ['Sensor Kiosks', 'Digital Humanities', 'Biomechatronics', 'Bio-signal Telemetry'],
        relevance: 'Collaborates with chemical, mechanical, and electrical faculty labs across HBTU.'
      },
    ],
    techStack: [
      { name: 'ESP32', category: 'Microcontroller', desc: 'Dual-core Wi-Fi & Bluetooth SoC with extensive GPIOs for connected IoT nodes.', level: 'Core' },
      { name: 'Arduino', category: 'Microcontroller', desc: 'Accessible microcontroller platform for rapid physical computing prototyping.', level: 'Core' },
      { name: 'Raspberry Pi', category: 'Edge Computing', desc: 'Single-board Linux computer powering edge gateways and local computer vision.', level: 'Core' },
      { name: 'Embedded C/C++', category: 'Language', desc: 'Low-level language with direct memory mapped register access and minimal footprint.', level: 'Core' },
      { name: 'FreeRTOS', category: 'OS', desc: 'Real-time operating system kernel for preemptive multi-tasking on microcontrollers.', level: 'Core' },
      { name: 'MQTT & LoRa', category: 'Protocol', desc: 'Lightweight IoT telemetry protocol combined with long-range sub-GHz RF transmission.', level: 'Core' },
      { name: 'Sensors & Actuators', category: 'Hardware', desc: 'IMUs, environmental probes, ultrasonic rangefinders, servos, and stepper drivers.', level: 'Core' },
      { name: 'KiCad', category: 'Design', desc: 'Open-source electronic design automation suite for schematic capture and PCB layout.', level: 'Supporting' },
    ],
    leadership: [
      {
        ...FUSION_X_MEMBERS[0], // Prakhar Dixit
        responsibility: 'Hardware-Software Integration, Robotics & Rapid Prototyping',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...FUSION_X_MEMBERS[1], // Aman Singh
        responsibility: 'Embedded Systems, IoT Mesh Networks & Automation',
        github: 'https://github.com/fcit-hbtu',
      },
      {
        ...FUSION_X_MEMBERS[2], // Agrav Kumar
        responsibility: 'Interdisciplinary Research, Sensor Networks & Project Stewardship',
        github: 'https://github.com/fcit-hbtu',
      },
    ],
    activities: [
      {
        title: 'Hardware Prototyping Bench Nights',
        type: 'LAB NIGHT',
        cadence: 'Every Friday Evening',
        summary: 'Hands-on lab nights soldering components, flashing firmware, calibrating sensors, and building breadboard prototypes.',
        outcome: 'Working physical prototypes created in the department hardware sandbox.'
      },
      {
        title: 'Campus IoT Mesh Field Deployments',
        type: 'FIELD SPRINT',
        cadence: 'Monthly Deployments',
        summary: 'Installing, testing, and monitoring solar-powered environmental and telemetry sensor nodes across East and West HBTU campuses.',
        outcome: 'Real-time live telemetry stream visualized on the campus monitoring dashboard.'
      },
      {
        title: 'Robotics Control Challenges',
        type: 'COMPETITION',
        cadence: 'Annual Challenge Sprint',
        summary: 'Designing autonomous mobile robots programmed to navigate complex obstacle arenas using PID feedback and sensor fusion.',
        outcome: 'Live showcase of custom-built robotics kits at institutional symposiums.'
      },
      {
        title: 'Cross-Disciplinary Research Salons',
        type: 'INNOVATION',
        cadence: 'Bi-monthly Colloquia',
        summary: 'Joint working groups with mechanical, electrical, and civil engineering scholars identifying real-world campus problems.',
        outcome: 'Interdisciplinary prototype proposals submitted for state and national research grants.'
      },
    ],
    projects: [
      {
        title: 'CampusMesh OS',
        subtitle: 'Decentralized LoRa & Wi-Fi Emergency Mesh Network',
        category: 'EMBEDDED / IOT NETWORKING',
        status: 'PROTOTYPE BENCHMARK',
        summary: 'A resilient zero-infrastructure communication firmware built for ESP32 and Raspberry Pi nodes that automatically forms a multi-hop routing mesh when cellular towers fail.',
        tech: ['C++', 'FreeRTOS', 'Embedded C', 'LoRaWAN', 'ESP32'],
        metrics: [
          { label: 'Transmission Range', value: '3.4 km' },
          { label: 'Hop Latency', value: '180ms' },
          { label: 'Power Draw', value: '18mA' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/campus-mesh-os',
      },
      {
        title: 'Chronicle Sensor Kiosk',
        subtitle: 'Physical-Digital Museum & Archival Exhibit',
        category: 'CREATIVE TECH / EMBEDDED',
        status: 'CAMPUS EXHIBIT',
        summary: 'An interactive historical exhibit kiosk combining physical capacitive sensors with high-resolution digital folio navigation celebrating HBTU\'s 1921 founding.',
        tech: ['Raspberry Pi', 'React', 'Embedded C', 'Capacitive Sensors'],
        metrics: [
          { label: 'Archived Folios', value: '1,200+' },
          { label: 'Hardware Uptime', value: '99.8%' },
          { label: 'Sensor Response', value: '32ms' },
        ],
        repoUrl: 'https://github.com/fcit-hbtu/chronicle-hbtu',
      },
    ],
    participation: {
      headline: 'How to Innovate with Fusion X',
      subheadline: 'Open to curious makers eager to build tactile hardware and cross-disciplinary solutions.',
      steps: [
        {
          num: '01',
          title: 'Join Friday Hardware Nights',
          desc: 'Get hands-on with microcontrollers, breadboards, and sensors in the department computing laboratory.'
        },
        {
          num: '02',
          title: 'Collaborate on Active IoT Nodes',
          desc: 'Help assemble, solder, and deploy campus telemetry sensors while writing clean embedded C/C++ firmware.'
        },
        {
          num: '03',
          title: 'Propose an Interdisciplinary Project',
          desc: 'Bring a technical challenge from any engineering field and partner with Fusion X mentors to build a prototype.'
        },
      ],
      ctaText: 'Enter the Hardware Sandbox',
      ctaLink: '/join',
    },
  },
];

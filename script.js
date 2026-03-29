/* eslint-disable no-inner-declarations */
/* Premium single-page "route" renderer (no build step) */

(function () {
  const root = document.getElementById("pageRoot");
  const mainScroll = document.getElementById("mainScroll");
  const loadingScreen = document.getElementById("loadingScreen");
  const toTopBtn = document.getElementById("toTopBtn");
  const themeToggle = document.getElementById("themeToggle");
  const yearSpan = document.getElementById("yearSpan");

  const FRAMER = window.framerMotion;
  const animate = FRAMER && FRAMER.animate ? FRAMER.animate : null;
  const useInView = FRAMER && FRAMER.useInView ? FRAMER.useInView : null; // for potential future usage

  const DESIGN = {
    routes: ["/", "/about", "/academics", "/departments", "/departments/cse", "/departments/ece", "/placements", "/research", "/campus-life", "/students", "/alumni", "/contact", "/admissions"],
    navKeys: [
      { key: "home", match: (p) => p === "/" },
      { key: "about", match: (p) => p.startsWith("/about") },
      { key: "academics", match: (p) => p.startsWith("/academics") },
      { key: "departments", match: (p) => p.startsWith("/departments") },
      { key: "placements", match: (p) => p.startsWith("/placements") },
      { key: "research", match: (p) => p.startsWith("/research") },
      { key: "campus-life", match: (p) => p.startsWith("/campus-life") },
      { key: "students", match: (p) => p.startsWith("/students") },
      { key: "alumni", match: (p) => p.startsWith("/alumni") },
      { key: "contact", match: (p) => p.startsWith("/contact") }
    ]
  };

  const IMAGES = {
    logo: "images/bms-logo.png",
    campus: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80",
      "images/academics-1.png"
    ],
    students: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80"
    ],
    events: [
      "https://images.unsplash.com/photo-1516524383747-7d0b31b7bb2c?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=80"
    ],
    library: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b0608f?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1522120692536-dfd8f3d48a52?auto=format&fit=crop&w=1800&q=80",
      "images/academics-2.png"
    ],
    hero: [
      "images/academics-1.png",
      "images/academics-2.png",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=80"
    ],
    building: "images/academics-1.png",
    principal: "images/principal-bmsce.png",
    founder: "images/founders-bmset.png"
  };

  const departments = [
    {
      slug: "cse",
      name: "Computer Science & Engineering",
      short: "AI, cloud, cybersecurity, software engineering, and scalable systems.",
      banner: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80",
        "https://images.unsplash.com/photo-1522071820081-0cc7c9b7b0c8?auto=format&fit=crop&w=1800&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
      ],
      hod: {
        name: "Dr. A. S. Meenakshi",
        qualification: "Ph.D. • Data Engineering",
        experience: "17+ years",
        photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
        message:
          "Our department blends rigorous foundations with modern engineering practice. Students learn to build, validate, and deploy intelligent systems—guided by mentorship, lab immersion, and real-world problem solving."
      }
    },
    {
      slug: "ece",
      name: "Electronics & Communication Engineering",
      short: "VLSI, embedded systems, signal processing, communication networks, and IoT.",
      banner: [
        "https://images.unsplash.com/photo-1581090464777-f6f74db2e7b0?auto=format&fit=crop&w=1800&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80",
        "https://images.unsplash.com/photo-1581091870622-7e5a7d0a1c5a?auto=format&fit=crop&w=1800&q=80"
      ],
      hod: {
        name: "Dr. S. Praveena",
        qualification: "Ph.D. • VLSI & Embedded",
        experience: "16+ years",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
        message:
          "We empower students with hands-on lab learning and research-ready problem exploration. From circuits to systems, our focus is on design excellence and dependable innovation."
      }
    },
    { slug: "mech", name: "Mechanical Engineering", short: "Design, manufacturing, robotics, thermal systems, and production innovation." },
    { slug: "civil", name: "Civil Engineering", short: "Structures, transportation, sustainability, and resilient infrastructure engineering." },
    { slug: "ise", name: "Information Science & Engineering", short: "Analytics, enterprise systems, and information-driven computing solutions." },
    { slug: "eee", name: "Electrical & Electronics Engineering", short: "Power systems, controls, renewable energy, and efficient electrical design." }
  ];

  const courseList = [
    {
      slug: "cse",
      title: "B.E. in Computer Science & Engineering",
      description:
        "Learn core algorithms, modern software engineering, and scalable system design. The curriculum emphasizes applied projects, team-based development, and hands-on labs that connect theory with real products.",
      career: "Graduates pursue roles in software engineering, data engineering, cloud platforms, AI engineering, cybersecurity, and product development. Project portfolios and internship mentorship help students move confidently into industry.",
      duration: "4 Years",
      curriculum: [
        "Foundations: Programming, Data Structures, Discrete Mathematics",
        "Core Systems: Operating Systems, Computer Networks, Databases",
        "Modern Tracks: AI/ML, Cloud, Cybersecurity, DevOps & Reliability",
        "Capstone: Industry-aligned project with validation and documentation"
      ]
    },
    {
      slug: "ece",
      title: "B.E. in Electronics & Communication Engineering",
      description:
        "Develop the ability to design electronics and communication systems from circuit level to end-to-end systems. Students gain exposure to embedded computing, VLSI workflows, signal processing, and IoT architectures.",
      career: "Careers include embedded systems engineer, VLSI/verification roles, RF & communication specialist, IoT engineer, and electronics product developer across semiconductor and telecom ecosystems.",
      duration: "4 Years",
      curriculum: [
        "Circuits & Signals: Analog, digital basics, DSP foundations",
        "Embedded & Networks: Microcontrollers, communication fundamentals",
        "Design Practice: VLSI concepts, systems integration",
        "Capstone: Build, test, and iterate a system prototype"
      ]
    },
    {
      slug: "mech",
      title: "B.E. in Mechanical Engineering",
      description:
        "Build strong mechanical foundations with modern manufacturing, robotics, and product design. The curriculum encourages iterative prototyping, experimentation, and optimization for performance and safety.",
      career:
        "Graduates find opportunities in automotive engineering, robotics and automation, design engineering, thermal systems, and industrial product development. Project work strengthens readiness for prototyping roles.",
      duration: "4 Years",
      curriculum: [
        "Thermal & Mechanical Core: Thermodynamics, mechanics, materials",
        "Manufacturing: CNC, CAD/CAM, quality and production planning",
        "Robotics & Automation: sensing, control, and mechatronics integration",
        "Capstone: Design challenge with analysis, build, and validation"
      ]
    },
    {
      slug: "civil",
      title: "B.E. in Civil Engineering",
      description:
        "Study structures, transportation systems, and sustainable construction strategies. Students are trained for design thinking, safety considerations, and practical site-based engineering understanding.",
      career:
        "Career paths include structural design, transportation planning support, sustainability consultant roles, and construction technology positions across government and industry.",
      duration: "4 Years",
      curriculum: [
        "Engineering Mechanics & Materials",
        "Structures & Foundations: design concepts and practical modeling",
        "Infrastructure & Sustainability: water, transport, and resilience",
        "Capstone: Realistic design with documentation and review"
      ]
    },
    {
      slug: "ise",
      title: "B.E. in Information Science & Engineering",
      description:
        "Combine computing foundations with information systems and analytics-oriented thinking. The program prepares students to build enterprise-grade solutions with quality and user-centric design.",
      career:
        "Students typically move into software engineering, analytics engineering, systems integration, and product-focused roles where data and systems come together.",
      duration: "4 Years",
      curriculum: [
        "Foundations: Programming, math & system basics",
        "Enterprise Core: databases, distributed systems concepts",
        "Analytics & Applications: data pipelines, reporting, insights",
        "Capstone: end-to-end application with performance evaluation"
      ]
    },
    {
      slug: "eee",
      title: "B.E. in Electrical & Electronics Engineering",
      description:
        "Understand electrical networks, power systems, and controls for efficient energy engineering. The curriculum supports experimentation in simulations and lab-based learning for dependable designs.",
      career:
        "Graduates work in power systems, controls, renewable energy technology, industrial automation, and embedded control engineering across utilities and manufacturing.",
      duration: "4 Years",
      curriculum: [
        "Electrical Core: circuits, networks, machine foundations",
        "Power & Control: basics of generation, transmission, and regulation",
        "Renewables & Efficiency: solar/wind integration concepts",
        "Capstone: design a solution with evaluation and documentation"
      ]
    },
    {
      slug: "ai-ml-track",
      title: "B.E. (Specialization) Artificial Intelligence & Machine Learning",
      description:
        "A project-driven specialization focused on building ML systems, evaluating models responsibly, and integrating intelligent features into software products and services.",
      career:
        "Roles include AI engineer, applied ML developer, MLOps practitioner, data scientist pathway, and product engineer building intelligent experiences.",
      duration: "4 Years (with AI/ML electives)",
      curriculum: [
        "Model Foundations: supervised learning, evaluation, and fundamentals",
        "Applied Practice: ML pipelines and dataset engineering",
        "Responsible AI: fairness, reliability, and safe deployment thinking",
        "Capstone: deploy an AI-enabled system with measurable outcomes"
      ]
    },
    {
      slug: "cybersecurity-track",
      title: "B.E. (Specialization) Cybersecurity & Secure Systems",
      description:
        "Learn to design and assess secure systems with hands-on labs covering secure coding, network security basics, and practical threat analysis and remediation approaches.",
      career:
        "Graduates can pursue security engineering, vulnerability research pathways, secure software roles, and cloud security operations.",
      duration: "4 Years (with Security electives)",
      curriculum: [
        "Secure Software: secure coding, testing, and code review thinking",
        "Network & System Security: threat models and defenses",
        "Security Engineering Practice: incident-style exercises",
        "Capstone: security assessment report + remediation plan"
      ]
    },
    {
      slug: "iot-track",
      title: "B.E. (Specialization) IoT Systems & Embedded Design",
      description:
        "Build connected device systems and embedded prototypes. Students learn sensors, communication patterns, edge computing thinking, and hardware-software integration.",
      career:
        "Opportunities include embedded systems engineer, IoT developer, edge computing roles, and prototyping engineer in device-based companies.",
      duration: "4 Years (with IoT electives)",
      curriculum: [
        "Embedded Essentials: microcontroller workflows and debugging",
        "IoT Architecture: data flows, connectivity basics, and edge ideas",
        "Prototyping: build and iterate on a working device system",
        "Capstone: end-to-end prototype with tests and documentation"
      ]
    },
    {
      slug: "robotics-track",
      title: "B.E. (Specialization) Robotics & Automation",
      description:
        "Develop robotics and automation concepts with a focus on practical integration. Students work across sensing, control logic, and mechanical-electrical system collaboration.",
      career:
        "Graduates can pursue robotics engineer tracks, automation roles, industrial systems integration, and prototyping-based engineering careers.",
      duration: "4 Years (with Robotics electives)",
      curriculum: [
        "Sensing & Control: measurement, actuation and control patterns",
        "Mechatronics Integration: cross-domain systems thinking",
        "Automation Projects: iterative design and safety mindset",
        "Capstone: build a robot/automation prototype with evaluation"
      ]
    },
    {
      slug: "cloud-devops-track",
      title: "B.E. (Specialization) Cloud Platforms & DevOps",
      description:
        "Learn modern cloud engineering practices including reliability, CI/CD thinking, containerized deployments, and monitoring and incident readiness approaches.",
      career:
        "Students move into cloud engineer roles, platform engineering, DevOps pathways, and application reliability engineering across product companies.",
      duration: "4 Years (with Cloud/DevOps electives)",
      curriculum: [
        "Cloud Fundamentals: services and architecture thinking",
        "DevOps Practice: CI/CD, pipelines, and quality gates",
        "Reliability: monitoring, alerts, and performance mindset",
        "Capstone: production-like deployment with documented checks"
      ]
    },
    {
      slug: "data-systems-track",
      title: "B.E. (Specialization) Data Engineering & Systems",
      description:
        "Build data pipelines with strong systems thinking—ingestion, storage, processing, and analytics enablement. The program emphasizes reliability and end-to-end validation.",
      career:
        "Graduates work in data engineering, analytics engineering, platform data roles, and data-centric software development pathways.",
      duration: "4 Years (with Data electives)",
      curriculum: [
        "Data Foundations: modeling, ingestion concepts, and quality checks",
        "Pipelines & Processing: transformation, scheduling, and validation",
        "Data for Decision: dashboards, reporting, and insights",
        "Capstone: build a robust pipeline with tests and documentation"
      ]
    }
  ];

  const faculty = [
    {
      id: "dr-ananya-murthy",
      name: "Dr. Ananya Murthy",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. (CS) • AI Systems",
      experience: "14 years",
      subjects: ["Machine Learning", "AI Systems", "Data Mining", "Responsible AI"],
      research:
        "Her research focuses on building trustworthy ML systems that perform reliably under real-world constraints. Students work on dataset curation, evaluation strategy, and model deployment validation—bridging the gap between research prototypes and production-ready outcomes.",
      publications: [
        "Trustworthy evaluation frameworks for high-stakes ML",
        "Scalable pipelines for multimodal data processing",
        "Benchmarking methods for robust learning on noisy signals"
      ]
    },
    {
      id: "dr-raghav-menon",
      name: "Dr. Raghav Menon",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Distributed Systems",
      experience: "16 years",
      subjects: ["Distributed Systems", "Cloud Architecture", "Performance Engineering", "Databases"],
      research:
        "He leads projects on scalable system design, performance modeling, and operational excellence. Students learn to build distributed services with measurable latency, reliability, and resource-aware behavior—supported by lab-based instrumentation practice.",
      publications: ["Resource-aware scheduling for distributed services", "Latency modeling for cloud APIs", "Validation strategies for data correctness"]
    },
    {
      id: "dr-neha-kulkarni",
      name: "Dr. Neha Kulkarni",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1520975693416-35a5f87b5f7b?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Cybersecurity",
      experience: "12 years",
      subjects: ["Secure Software", "Network Security", "Threat Modeling", "AppSec Testing"],
      research:
        "Her work combines security engineering education with practical assessments. Students conduct threat modeling workshops, build secure-by-design code samples, and learn how to reason about vulnerabilities with a remediation-first mindset.",
      publications: ["Secure coding patterns for modern web apps", "Practical threat modeling in team projects", "Automated checks for security regression"]
    },
    {
      id: "dr-sai-prasad",
      name: "Dr. Sai Prasad",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1557862921-1d4c6a0b3f0a?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Software Engineering",
      experience: "11 years",
      subjects: ["Software Engineering", "DevOps", "Testing", "Systems Design"],
      research:
        "He guides capstone teams on engineering discipline: quality gates, test strategy, maintainable architecture, and release readiness. Students experience end-to-end development cycles with documentation that mirrors industry review practices.",
      publications: ["Quality-aware development for maintainable systems", "CI/CD checks for robust releases", "Testing strategy for evolving codebases"]
    },
    {
      id: "dr-kiran-rao",
      name: "Dr. Kiran Rao",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Human-Computer Interaction",
      experience: "12 years",
      subjects: ["Human-Centered Design", "HCI Evaluation", "UX Engineering", "Interaction Systems"],
      research:
        "His work explores how engineers can build interfaces that remain reliable under real user behavior. Students learn evaluation methods, usability-driven iteration, and design-to-implementation workflows that translate UX thinking into dependable software outcomes.",
      publications: ["Evaluation methods for interactive systems", "Design-to-implementation pipelines", "Reliability thinking for user-facing software"]
    },
    {
      id: "dr-sneha-gowda",
      name: "Dr. Sneha Gowda",
      dept: "cse",
      photo: "https://images.unsplash.com/photo-1520975693416-35a5f87b5f7b?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Data Systems",
      experience: "13 years",
      subjects: ["Data Systems", "Information Retrieval", "Scalable Storage", "Analytics Engineering"],
      research:
        "She focuses on building data pipelines with correctness and operational excellence. Students learn modeling, validation strategies, and end-to-end enablement patterns so analytics systems can perform reliably across changing data reality.",
      publications: ["Correctness-aware data modeling", "Validation strategies for ETL pipelines", "Operational reliability for analytics systems"]
    },
    {
      id: "dr-vinay-shetty",
      name: "Dr. Vinay Shetty",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • VLSI & Embedded",
      experience: "15 years",
      subjects: ["Embedded Systems", "VLSI Basics", "Digital Design", "System Integration"],
      research:
        "His lab work explores efficient design and verification methods to help students build electronics prototypes with confidence. The focus is on integration: designing hardware concepts that map cleanly to system-level requirements.",
      publications: ["Verification strategies for efficient digital design", "Edge-device prototyping workflows", "System integration patterns for embedded deployments"]
    },
    {
      id: "dr-meera-sharma",
      name: "Dr. Meera Sharma",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Signal Processing",
      experience: "13 years",
      subjects: ["Signal Processing", "Communication Systems", "IoT Fundamentals", "DSP Practice"],
      research:
        "She focuses on applied signal processing techniques for real-world communication and sensing. Students learn to validate processing pipelines with practical tests, ensuring that outcomes remain accurate beyond ideal assumptions.",
      publications: ["Robust signal processing for communication pipelines", "Sensing prototypes with measurable accuracy", "Evaluation methods for DSP workflows"]
    },
    {
      id: "dr-karthik-iyer",
      name: "Dr. Karthik Iyer",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Control & Automation",
      experience: "14 years",
      subjects: ["Control Systems", "Automation", "Power Electronics Basics", "Embedded Control"],
      research:
        "He leads projects on dependable control strategies and verification-friendly system design. Students explore simulation-to-lab workflows and build prototypes that behave predictably under realistic conditions.",
      publications: ["Control verification for embedded systems", "Automation prototypes with robust sensing", "Design patterns for stable system behavior"]
    },
    {
      id: "dr-sowmya-n",
      name: "Dr. Sowmya N.",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • VLSI Architecture",
      experience: "15 years",
      subjects: ["VLSI Architecture", "Digital Design", "Verification", "Low-Power Systems"],
      research:
        "Her research supports students with design and verification thinking—helping prototypes remain correct, efficient, and testable. Students practice mapping system requirements into efficient digital designs with verification workflows that feel production-like.",
      publications: ["Low-power design verification approaches", "Efficient digital architecture workflows", "Testability strategies for student prototypes"]
    },
    {
      id: "dr-arun-karthik",
      name: "Dr. Arun Karthik",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Communication Networks",
      experience: "14 years",
      subjects: ["Communication Networks", "RF Basics", "IoT Connectivity", "Network Performance"],
      research:
        "He leads learning modules on network behavior and performance measurement. Students learn to reason about constraints, validate assumptions in labs, and build intuition for reliable communication systems—from basics to measurable outcomes.",
      publications: ["Performance measurement for connectivity pipelines", "Reliability-aware communication thinking", "Prototyping workflows for IoT communication"]
    },
    {
      id: "dr-sruthi-prabhu",
      name: "Dr. Sruthi Prabhu",
      dept: "ece",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      qualification: "Ph.D. • Signal Processing",
      experience: "11 years",
      subjects: ["DSP Practice", "Signal Analytics", "Sensing Systems", "Communication Signal Workflows"],
      research:
        "She connects signal processing concepts to sensing prototypes and real-world data. Students learn to validate processing steps with measurable accuracy, ensuring that learning remains robust beyond ideal examples.",
      publications: ["Measured-accuracy signal processing workflows", "Sensing evaluation strategies", "Reliable DSP practice for real data"]
    }
  ];

  const alumni = [
    {
      id: "a-1",
      name: "Aarav N.",
      branch: "CSE",
      cgpa: "8.76",
      company: "Google",
      package: "31 LPA",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      story:
        "Aarav credits BMSCE for shaping his engineering mindset through disciplined lab practice and project reviews. During his final year, he led a team building a system that improved campus engagement workflows. The real-world validation taught him to measure impact, not only build features. Today, he works on scalable platform services and values the foundation of engineering rigor he built at BMSCE."
    },
    {
      id: "a-2",
      name: "Sahana K.",
      branch: "ECE",
      cgpa: "8.61",
      company: "Microsoft",
      package: "28 LPA",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
      story:
        "Sahana developed confidence in hardware and embedded design through hands-on experiments. She recalls the way mentoring turned ambiguity into clarity: every prototype review had measurable next steps. At Microsoft, she applies that approach to dependable device integrations, building systems that remain stable across real usage environments."
    },
    {
      id: "a-3",
      name: "Vihaan P.",
      branch: "ISE",
      cgpa: "8.42",
      company: "Amazon",
      package: "30 LPA",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      story:
        "Vihaan’s journey highlights the BMSCE culture of structured learning. He enjoyed how academic concepts were tied to project deliverables and how students were encouraged to document their decisions. Now in retail systems engineering, he focuses on building reliable services with observability—an extension of how he learned to validate outcomes at BMSCE."
    },
    {
      id: "a-4",
      name: "Meera R.",
      branch: "CSE",
      cgpa: "8.91",
      company: "Infosys",
      package: "24 LPA",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
      story:
        "Meera’s best memories are about teamwork and mentorship. She participated in interdisciplinary hackathons and learned how to prototype quickly while maintaining quality. Today she helps teams ship features with strong test coverage and user-centric thinking, inspired by her BMSCE experience with iterative improvement."
    },
    {
      id: "a-5",
      name: "Rahul S.",
      branch: "MECH",
      cgpa: "8.33",
      company: "Wipro",
      package: "19 LPA",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      story:
        "Rahul gained practical confidence through design and manufacturing labs. He learned how to iterate on prototypes based on measured results and how to articulate trade-offs clearly. In his current role, he works on automation and industrial engineering workflows, bringing a build-validate-improve approach rooted in his BMSCE training."
    },
    {
      id: "a-6",
      name: "Ananya T.",
      branch: "EEE",
      cgpa: "8.59",
      company: "TCS",
      package: "21 LPA",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
      story:
        "Ananya’s story revolves around curiosity and perseverance. She found clarity in structured learning and used mentorship sessions to refine her understanding of power systems. At TCS, she works on reliable energy-aware solutions, ensuring systems perform safely and predictably under varying conditions."
    },
    {
      id: "a-7",
      name: "Nikhil V.",
      branch: "CIVIL",
      cgpa: "8.28",
      company: "Accenture",
      package: "20 LPA",
      photo: "https://images.unsplash.com/photo-1522071820081-0cc7c9b7b0c8?auto=format&fit=crop&w=1200&q=80",
      story:
        "Nikhil learned to treat engineering as a public responsibility. BMSCE helped him develop structured documentation and a mindset of safety and sustainability. Today, he supports infrastructure solutions and uses data-driven reasoning to help stakeholders make better design decisions."
    },
    {
      id: "a-8",
      name: "Ishita M.",
      branch: "ECE",
      cgpa: "8.72",
      company: "Deloitte",
      package: "26 LPA",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
      story:
        "Ishita’s experience highlights how BMSCE empowers students beyond technical skills. She built confidence through presentations, team leadership, and applied learning. Now in consulting, she bridges technology and business outcomes, ensuring solutions are measurable, responsible, and implementable."
    },
    {
      id: "a-9",
      name: "Arjun D.",
      branch: "CSE",
      cgpa: "8.47",
      company: "IBM",
      package: "23 LPA",
      photo: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=80",
      story:
        "Arjun credits lab mentorship for teaching him how to learn efficiently. He learned to break down complex system problems, validate each assumption, and communicate clearly. At IBM, he works on cloud-native solutions and values the iterative, evidence-based approach he built at BMSCE."
    },
    {
      id: "a-10",
      name: "Pooja K.",
      branch: "ISE",
      cgpa: "8.65",
      company: "Oracle",
      package: "27 LPA",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
      story:
        "Pooja found her direction through structured academic progress and project-based learning. She learned how to validate solutions through tests and how to deliver with clarity. Today, she works on enterprise systems and continues to practice the same engineering discipline she formed at BMSCE."
    }
  ];

  const placements = {
    banner: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80"
    ],
    logos: [
      { name: "Google", icon: "google" },
      { name: "Microsoft", icon: "microsoft" },
      { name: "Amazon", icon: "amazon" },
      { name: "Infosys", icon: "infosys" },
      { name: "Wipro", icon: "wipro" },
      { name: "TCS", icon: "tata" },
      { name: "Accenture", icon: "accenture" },
      { name: "Deloitte", icon: "deloitte" },
      { name: "IBM", icon: "ibm" },
      { name: "Oracle", icon: "oracle" },
      { name: "Adobe", icon: "adobe" }
    ],
    stats: {
      highest: 43,
      average: 10,
      median: 9
    },
    testimonials: [
      {
        name: "Riya S.",
        role: "Software Engineer",
        quote:
          "The placement process felt premium—training, mock rounds, and recruiter-ready project storytelling. Mentors gave clear feedback and actionable improvements.",
        photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Shivam R.",
        role: "Cloud Engineer",
        quote:
          "I learned to structure my thinking and communicate clearly in interviews. The code practice and confidence-building sessions were exactly what I needed.",
        photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Kavya P.",
        role: "Product Analyst",
        quote:
          "Training helped me translate projects into outcomes. I also appreciated the focus on clarity—data, impact, and storytelling were coached thoughtfully.",
        photo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Vikram T.",
        role: "Embedded Systems",
        quote:
          "Labs and mentorship made me interview-ready. I could explain trade-offs, testing methods, and design decisions with confidence.",
        photo: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Anika S.",
        role: "Security Engineer",
        quote:
          "The training approach felt structured and premium. Mock rounds, secure coding practice, and feedback sessions helped me translate preparation into confident interview performance.",
        photo: "https://images.unsplash.com/photo-1520975693416-35a5f87b5f7b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Arnav P.",
        role: "Data Engineer",
        quote:
          "I improved how I communicate project outcomes. The mentorship focused on evidence, impact, and clarity—exactly what recruiters asked for in technical conversations.",
        photo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Meghana G.",
        role: "Consulting Analyst",
        quote:
          "Placement readiness included soft-skills coaching and portfolio review. It helped me express technical decisions in a business-ready way and stay calm during recruitment cycles.",
        photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  };

  const researchFolders = [
    {
      folder: "publications",
      title: "Publications",
      heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
      highlights: [
        "Mentorship for journal writing and conference submission",
        "Research reviews with reproducibility checklists",
        "Support for formatting, references, and technical documentation"
      ],
      projects: ["Reproducible ML evaluation toolkit", "Embedded systems validation notes", "Systems benchmarking workbook"]
    },
    {
      folder: "funding",
      title: "Funding",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
      highlights: ["Grant readiness support", "Budget planning and reporting templates", "Industry partnership co-funding guidance"],
      projects: ["Lab modernization co-fund plan", "Prototype validation with industry partners", "Research roadmap and milestone schedule"]
    },
    {
      folder: "patents",
      title: "Patents",
      heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80",
      highlights: ["Patentable idea mapping", "Prior art checking workflow", "Drafting support and review sessions"],
      projects: ["Novel sensor fusion concept", "Method for reliability-aware deployment", "Prototype with measurable advantages"]
    },
    {
      folder: "innovation",
      title: "Innovation",
      heroImage: "https://images.unsplash.com/photo-1581092334651-7d3e9b6c6ad1?auto=format&fit=crop&w=1800&q=80",
      highlights: ["Prototype-first learning", "Interdisciplinary build sessions", "Mentorship for product thinking"],
      projects: ["Student hackathon-to-prototype pipeline", "Interdepartmental robotics challenge", "Reliability-first device demo"]
    },
    {
      folder: "events",
      title: "Events",
      heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      highlights: ["Guest lectures and technical talks", "Research showcases and demos", "Workshops on research methods and writing"],
      projects: ["Annual research showcase", "Student-led technical meetup series", "Workshops on reproducibility & evaluation"]
    }
  ];

  const campusItems = [
    {
      item: "fests",
      title: "Fests & Culture",
      hero: "https://images.unsplash.com/photo-1516524383747-7d0b31b7bb2c?auto=format&fit=crop&w=1800&q=80",
      paragraphs: [
        "Campus fests at BMSCE are more than celebrations—they are platforms for creative engineering, expressive leadership, and cross-disciplinary collaboration. Students build concepts from scratch, coordinate teams, and deliver experiences that feel polished and professional.",
        "From stage design to content scripting, from event technology to logistics, each fest becomes a practical training ground. Workshops and rehearsals sharpen planning and execution skills, helping students graduate with confidence beyond the classroom.",
        "Culture is sustained through community: student anchors, faculty encouragement, and peer mentorship turn events into a tradition of excellence. The result is a campus identity that feels energetic, inclusive, and future-ready."
      ],
      gallery: ["https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1516524383747-7d0b31b7bb2c?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80"]
    },
    {
      item: "sports",
      title: "Sports & Fitness",
      hero: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=80",
      paragraphs: [
        "Sports at BMSCE cultivate discipline, resilience, and teamwork. Training routines develop physical strength and a mindset of continuous improvement—habits that directly benefit academic performance and long-term career readiness.",
        "Students participate in indoor and outdoor competitions, learn structured training approaches, and build leadership through team roles. The campus supports training with dedicated spaces and a culture that respects both effort and sportsmanship.",
        "Whether you are starting your athletic journey or competing at higher levels, the sports ecosystem helps you develop focus, energy management, and confidence under pressure."
      ],
      gallery: ["https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80"]
    },
    {
      item: "clubs",
      title: "Clubs & Innovation",
      hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
      paragraphs: [
        "Student clubs at BMSCE create a professional environment for learning through doing. Technical clubs push for experimentation, design reviews, and measurable outcomes—while creative and social clubs build empathy, communication, and leadership confidence.",
        "Across coding, robotics, entrepreneurship, design, and outreach initiatives, students learn to collaborate effectively. Regular showcases and mentoring ensure that ideas turn into prototypes and projects that demonstrate real value.",
        "Clubs also strengthen career readiness: students build portfolios, refine presentation skills, and develop engineering discipline through regular deadlines and iterative improvements."
      ],
      gallery: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80"]
    },
    {
      item: "hostel-life",
      title: "Hostel Life",
      hero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80",
      paragraphs: [
        "Hostel life at BMSCE supports both academic growth and personal well-being. Students get secure accommodation with community spaces for collaboration, discussion, and focused study.",
        "Structured routines—study groups, skill sharing sessions, and mentorship touchpoints—create a supportive ecosystem. The goal is to ensure that students feel energized, connected, and prepared for both exams and opportunities.",
        "A well-balanced campus experience also matters: hostel life builds friendships, teaches time management, and strengthens communication—skills that remain valuable long after graduation."
      ],
      gallery: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1522120692536-dfd8f3d48a52?auto=format&fit=crop&w=1800&q=80", "images/academics-1.png"]
    }
  ];

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function normalizePath(pathname) {
    try {
      const p = pathname || "/";
      let x = p.split("?")[0].split("#")[0];
      if (!x.startsWith("/")) x = "/" + x;
      // When opened via `file://.../index.html`, pathname ends with index.html.
      if (x.toLowerCase().endsWith("/index.html") || x.toLowerCase().endsWith("index.html")) return "/";
      if (x.length > 1 && x.endsWith("/")) x = x.slice(0, -1);
      return x;
    } catch (e) {
      return "/";
    }
  }

  function getNavKey(path) {
    const p = normalizePath(path);
    if (p.startsWith("/faculty/")) return "departments";
    const item = DESIGN.navKeys.find((x) => x.match(p));
    return item ? item.key : "home";
  }

  function showLoading(ms = 520) {
    if (!loadingScreen) return;
    loadingScreen.style.display = "grid";
    loadingScreen.style.opacity = "1";
    loadingScreen.style.pointerEvents = "all";
    loadingScreen.style.transition = "opacity 0.25s ease";
    if (animate) animate(loadingScreen, { opacity: [1, 1] }, { duration: 0.001 });
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 250);
    }, ms);
  }

  function animatePageIn(container) {
    if (animate && container) {
      container.style.opacity = "0";
      container.style.transform = "translateY(12px)";
      animate(container, { opacity: 0, transform: "translateY(12px)" }, { duration: 0.001 });
      animate(container, { opacity: [0, 1] }, { duration: 0.35, ease: "easeOut" });
      animate(container, { transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.35, ease: "easeOut" });
    }
  }

  function revealOnScroll(scope = document) {
    if (!animate) {
      // Fallback: ensure content is readable even if Framer Motion fails to load.
      const els = Array.from(scope.querySelectorAll("[data-reveal]"));
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }
    const els = Array.from(scope.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.dataset.revealed = "1";
          animate(
            el,
            { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0px)"] },
            { duration: 0.55, ease: "easeOut" }
          );
          io.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
  }

  function initCarousels(scope = document) {
    const carousels = Array.from(scope.querySelectorAll(".js-carousel"));
    carousels.forEach((carouselEl) => {
      const stage = carouselEl.querySelector(".carousel-stage");
      const slides = Array.from(stage ? stage.querySelectorAll(".carousel-slide") : []);
      if (!slides.length) return;

      let activeIndex = Math.max(0, slides.findIndex((s) => s.classList.contains("active")));
      const autoplay = carouselEl.getAttribute("data-autoplay") !== "false";
      const interval = Number(carouselEl.getAttribute("data-interval") || "4500");
      let timer = null;

      const dotsWrap = carouselEl.querySelector(".carousel-dots");
      if (dotsWrap && dotsWrap.children.length) {
        Array.from(dotsWrap.children).forEach((d, i) => {
          d.classList.toggle("active", i === activeIndex);
          d.onclick = () => {
            stop();
            goTo(i);
          };
        });
      } else if (dotsWrap) {
        dotsWrap.innerHTML = "";
        slides.forEach((_, i) => {
          const btn = document.createElement("button");
          btn.className = "dot";
          btn.type = "button";
          btn.setAttribute("aria-label", `Slide ${i + 1}`);
          if (i === activeIndex) btn.classList.add("active");
          btn.onclick = () => {
            stop();
            goTo(i);
          };
          dotsWrap.appendChild(btn);
        });
      }

      const goTo = (i) => {
        activeIndex = clamp(i, 0, slides.length - 1);
        slides.forEach((s, idx) => s.classList.toggle("active", idx === activeIndex));
        const dotButtons = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".dot")) : [];
        dotButtons.forEach((b, idx) => b.classList.toggle("active", idx === activeIndex));
      };

      const start = () => {
        if (!autoplay || slides.length < 2) return;
        timer = setInterval(() => goTo((activeIndex + 1) % slides.length), interval);
      };
      const stop = () => {
        if (timer) clearInterval(timer);
        timer = null;
      };

      carouselEl.addEventListener("mouseenter", stop);
      carouselEl.addEventListener("mouseleave", start);

      start();
    });
  }

  function initHeroSlider() {
    const hero = document.querySelector(".js-hero");
    if (!hero) return;
    const slides = Array.from(hero.querySelectorAll(".hero-slide"));
    const dotsWrap = hero.querySelector(".hero-dots");
    if (!slides.length || !dotsWrap) return;

    let activeIndex = Math.max(0, slides.findIndex((s) => s.classList.contains("active")));
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = "dot" + (i === activeIndex ? " active" : "");
      btn.type = "button";
      btn.setAttribute("aria-label", `Hero slide ${i + 1}`);
      btn.onclick = () => goTo(i, true);
      dotsWrap.appendChild(btn);
    });

    let timer = null;
    const interval = Number(hero.getAttribute("data-interval") || "5200");
    const goTo = (i, resetTimer = false) => {
      activeIndex = clamp(i, 0, slides.length - 1);
      slides.forEach((s, idx) => s.classList.toggle("active", idx === activeIndex));
      Array.from(dotsWrap.querySelectorAll(".dot")).forEach((d, idx) => d.classList.toggle("active", idx === activeIndex));
      if (resetTimer) {
        if (timer) clearInterval(timer);
        timer = setInterval(() => goTo((activeIndex + 1) % slides.length), interval);
      }
    };

    const start = () => {
      timer = setInterval(() => goTo((activeIndex + 1) % slides.length), interval);
    };

    hero.addEventListener("mouseenter", () => timer && clearInterval(timer));
    hero.addEventListener("mouseleave", start);
    start();
  }

  function initCounters(scope = document) {
    const counters = Array.from(scope.querySelectorAll("[data-counter]"));
    if (!counters.length) return;

    const main = mainScroll || document;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          if (el.dataset.started === "1") return;
          el.dataset.started = "1";

          const target = Number(el.getAttribute("data-counter") || "0");
          const duration = 1350;
          const startTs = performance.now();

          const animateNumber = () => {
            const now = performance.now();
            const t = clamp((now - startTs) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            el.textContent = String(value);
            if (t < 1) requestAnimationFrame(animateNumber);
          };

          requestAnimationFrame(animateNumber);
          io.unobserve(el);
        });
      },
      { threshold: 0.35, root: main instanceof Element ? main : null }
    );

    counters.forEach((c) => io.observe(c));
  }

  function initCharts(scope = document) {
    const bars = Array.from(scope.querySelectorAll(".chart-bars .bar-fill"));
    if (!bars.length) return;
    if (!animate) return;

    const values = {
      highest: scope.querySelector("[data-chart-highest]"),
      average: scope.querySelector("[data-chart-average]"),
      median: scope.querySelector("[data-chart-median]")
    };

    const chartCard = scope.querySelector(".chart-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const card = e.target;

          const highest = Number(values.highest ? values.highest.textContent : 0);
          const average = Number(values.average ? values.average.textContent : 0);
          const median = Number(values.median ? values.median.textContent : 0);
          const maxV = Math.max(highest, average, median, 1);

          const targets = [highest, average, median].map((v) => (v / maxV) * 100);
          const fills = Array.from(card.querySelectorAll(".bar-fill"));

          fills.forEach((fill, idx) => {
            const to = targets[idx] || 0;
            animate(fill, { height: [`0%`, `${to}%`] }, { duration: 0.9, ease: "easeOut" });
          });

          io.unobserve(card);
        });
      },
      { threshold: 0.3 }
    );

    if (chartCard) io.observe(chartCard);
  }

  function initTooltipCards(scope = document) {
    const logoItems = Array.from(scope.querySelectorAll("[data-tooltip]"));
    if (!logoItems.length) return;
    logoItems.forEach((item) => {
      const tipText = item.getAttribute("data-tooltip");
      let tip = null;
      item.addEventListener("mouseenter", () => {
        tip = document.createElement("div");
        tip.className = "tooltip";
        tip.textContent = tipText;
        document.body.appendChild(tip);
        const r = item.getBoundingClientRect();
        tip.style.left = r.left + r.width / 2 + "px";
        tip.style.top = r.top - 10 + "px";
      });
      item.addEventListener("mouseleave", () => {
        if (tip) tip.remove();
        tip = null;
      });
    });
  }

  function ensureTooltipsCSS() {
    if (document.getElementById("tooltip-css")) return;
    const style = document.createElement("style");
    style.id = "tooltip-css";
    style.textContent =
      ".tooltip{position:fixed;transform:translate(-50%,-100%);z-index:2000;padding:10px 12px;border-radius:14px;background:rgba(11,61,145,0.95);color:#fff;font-weight:850;font-family:Poppins,system-ui,sans-serif;box-shadow:0 30px 90px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(10px);white-space:nowrap;pointer-events:none;opacity:1;}";
    document.head.appendChild(style);
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function placeholderSvgDataUrl(label) {
    const safe = String(label || "BMSCE").slice(0, 60);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">` +
      `<defs>` +
      `<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">` +
      `<stop offset="0" stop-color="#0B3D91" stop-opacity="0.95"/><stop offset="1" stop-color="#D32F2F" stop-opacity="0.65"/>` +
      `</linearGradient>` +
      `</defs>` +
      `<rect width="1200" height="750" fill="url(#g)"/>` +
      `<circle cx="210" cy="180" r="160" fill="#ffffff" opacity="0.10"/>` +
      `<circle cx="1020" cy="140" r="220" fill="#ffffff" opacity="0.08"/>` +
      `<circle cx="980" cy="660" r="260" fill="#ffffff" opacity="0.06"/>` +
      `<text x="70" y="430" fill="#ffffff" font-size="64" font-family="Poppins, Inter, Arial" font-weight="800">BMSCE</text>` +
      `<text x="70" y="500" fill="#ffffff" font-size="32" font-family="Inter, Arial" font-weight="700" opacity="0.92">${escapeHtml(safe)}</text>` +
      `</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function imgOnErrorAttr(label) {
    const u = placeholderSvgDataUrl(label);
    return `this.onerror=null;this.src='${u}';`;
  }

  function renderHero({ title, subtitle, category, quote, ctas, slides }) {
    const slideEls = slides
      .map(
        (src, i) => `
        <div class="hero-slide ${i === 0 ? "active" : ""}" style="background-image:url('${src}')"></div>
      `
      )
      .join("");
    const ctaEls = ctas
      .map(
        (c) => `
        <a href="${c.href}" data-nav class="btn ${c.kind}" role="button">
          ${escapeHtml(c.label)}
        </a>
      `
      )
      .join("");
    return `
      <section class="hero js-hero" data-interval="5400" aria-label="${escapeHtml(title)}">
        <div class="hero-stage">
          ${slideEls}
          <div class="hero-gradient" aria-hidden="true"></div>
          <div class="hero-content">
            <div class="hero-inner" data-reveal>
              ${category ? `<div class="hero-category">${escapeHtml(category)}</div>` : ''}
              <div class="hero-title">${escapeHtml(title)}</div>
              ${subtitle ? `<div class="hero-subtitle">${escapeHtml(subtitle)}</div>` : ''}
              ${quote ? `<div class="hero-quote">${escapeHtml(quote)}</div>` : ''}
              <div class="hero-actions">
                ${ctas.length > 2 ? `
                  <div class="hero-input-group">
                    <input type="text" placeholder="Are you ready to get started on your university journey ?" readonly />
                    <a href="${ctas[0].href}" data-nav class="btn ${ctas[0].kind}" role="button">${escapeHtml(ctas[0].label)}</a>
                  </div>
                  <div class="hero-buttons">
                    ${ctas.slice(1).map(c => `<a href="${c.href}" data-nav class="btn ${c.kind}" role="button">${escapeHtml(c.label)}</a>`).join('')}
                  </div>
                ` : ctas.map(c => `<a href="${c.href}" data-nav class="btn ${c.kind}" role="button">${escapeHtml(c.label)}</a>`).join('')}
              </div>
            </div>
          </div>
          <div class="hero-dots" aria-label="Hero navigation"></div>
        </div>
      </section>
    `;
  }

  function renderCarousel({ title, desc, slides, autoplay = true, interval = 4500 }) {
    const slideEls = slides
      .map(
        (s, i) => `
        <div class="carousel-slide ${i === 0 ? "active" : ""}" style="background-image:url('${s.src}')">
          <div class="carousel-overlay" aria-hidden="true"></div>
        </div>
      `
      )
      .join("");

    const dotsCount = slides.length;
    const dotsEls = new Array(dotsCount).fill(0).map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" type="button" aria-label="Slide ${i + 1}"></button>`).join("");

    return `
      <div class="carousel js-carousel" data-autoplay="${autoplay}" data-interval="${interval}">
        <div class="carousel-stage">
          ${slideEls}
          <div class="carousel-overlay" aria-hidden="true"></div>
          <div class="carousel-content">
            <div class="carousel-meta" data-reveal>
              <div class="carousel-title">${escapeHtml(title)}</div>
              <div class="carousel-desc">${escapeHtml(desc)}</div>
            </div>
          </div>
        </div>
        <div class="carousel-dots">${dotsEls}</div>
      </div>
    `;
  }

  function renderGallery({ items }) {
    const gridClass = items.length >= 3 ? "gallery gallery-3" : "gallery gallery-2";
    const cards = items
      .map(
        (it) => `
      <a href="${it.href}" data-nav class="gallery-card" aria-label="${escapeHtml(it.caption)}">
        <img src="${it.src}" alt="${escapeHtml(it.caption)}" loading="lazy" onerror="${imgOnErrorAttr(it.caption)}" />
        <div class="gallery-caption">${escapeHtml(it.caption)}</div>
      </a>
    `
      )
      .join("");
    return `<div class="${gridClass}" data-reveal>${cards}</div>`;
  }

  function renderHome() {
    const heroSlides = [IMAGES.building];

    const campusCarousel = renderCarousel({
      title: "Campus",
      desc: "Modern facilities, learning spaces, and a vibrant engineering ecosystem designed for excellence.",
      slides: IMAGES.campus.slice(0, 5).map((src) => ({ src })),
      autoplay: true,
      interval: 4200
    });
    const eventsCarousel = renderCarousel({
      title: "Events",
      desc: "Hackathons, conferences, cultural fests, and research showcases that turn ideas into outcomes.",
      slides: IMAGES.events.slice(0, 5).map((src) => ({ src })),
      autoplay: true,
      interval: 4600
    });
    const studentsCarousel = renderCarousel({
      title: "Students",
      desc: "Teamwork, mentorship, and project-driven growth across technical and leadership journeys.",
      slides: IMAGES.students.slice(0, 5).map((src) => ({ src })),
      autoplay: true,
      interval: 4300
    });
    const libraryCarousel = renderCarousel({
      title: "Library",
      desc: "A quiet place to learn deeply—plus discovery through digital resources, curated collections, and research support.",
      slides: IMAGES.library.slice(0, 5).map((src) => ({ src })),
      autoplay: true,
      interval: 4800
    });

    const awards = [
      { title: "Student Innovation", desc: "Prototype-driven learning with review cycles that sharpen engineering excellence." },
      { title: "Research Momentum", desc: "Mentorship for publications, reproducibility thinking, and scalable project outcomes." },
      { title: "Industry Readiness", desc: "Internship pathways, interview coaching, and recruiter-aligned project storytelling." }
    ];

    const introLong =
      "BMS College of Engineering is a portal of possibilities—where foundations become advanced skills and curiosity turns into disciplined engineering practice. The institution’s engineering culture is built on outcomes: students learn to validate ideas with evidence, collaborate with clarity, and deliver solutions that respect reliability, safety, and real-world constraints. From structured academic progress to research mentorship and recruiter-ready training, BMSCE is designed to move students smoothly from learning to impact. Every semester strengthens not just knowledge, but the confidence to lead, build, test, iterate, and communicate with professional maturity.";

    const naacLong =
      "NAAC accreditation reflects continuous improvement, transparent governance, and a commitment to quality assurance across academic and administrative processes. At BMSCE, accreditation is treated as a living system—measured through student feedback, outcome mapping, faculty development initiatives, and continuous curriculum refinement. The focus is on learner-centric education, supportive teaching-learning mechanisms, and robust evaluation practices. Quality assurance also extends to infrastructure, digital learning resources, research support, and well-being frameworks that help students succeed holistically. This system strengthens credibility, strengthens student learning, and ensures that every program remains aligned with modern engineering expectations and professional ethics.";

    return `
      ${renderHero({
        title: "BMS College of Engineering",
        subtitle: "Empowering Innovation & Excellence Since 1946",
        quote: "Empowering next generation of engineers to build, innovate, and lead the future.",
        category: "PROSPECTIVE STUDENTS",
        ctas: [
          { href: "/admissions", label: "Apply Now", kind: "btn-primary" },
          { href: "/departments", label: "Explore Departments", kind: "btn-secondary" },
          { href: "/admissions", label: "Admissions Open", kind: "btn-outline" }
        ],
        slides: heroSlides
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-3">
            <a href="/about" data-nav class="card" data-reveal>
              <div class="card-title">NAAC Accreditation</div>
              <div class="muted">Quality assurance, outcome-based learning, and continuous improvement culture.</div>
            </a>
            <a href="/placements" data-nav class="card" data-reveal>
              <div class="card-title">Rankings & Outcomes</div>
              <div class="muted">Consistency in performance, recruiter confidence, and innovation metrics.</div>
            </a>
            <a href="/research" data-nav class="card" data-reveal>
              <div class="card-title">Awards & Innovation</div>
              <div class="muted">Student projects, publications, and multidisciplinary collaborations.</div>
            </a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="kicker" data-reveal>Premium Highlights</div>
          <div class="h2 heading" style="margin-top:10px" data-reveal>Experience the Campus Story</div>
          <div class="lead" data-reveal>
            Scroll through a visual journey of learning spaces, student achievements, and research momentum—crafted to feel like a real official portal.
          </div>

          <div style="height:16px"></div>
          <div class="grid grid-2" style="align-items:stretch">
            <div style="min-width:0">${campusCarousel}</div>
            <div style="min-width:0">${eventsCarousel}</div>
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-2" style="align-items:stretch">
            <div style="min-width:0">${studentsCarousel}</div>
            <div style="min-width:0">${libraryCarousel}</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="kicker" data-reveal>Animated Stats</div>
          <div class="h2 heading" style="margin-top:10px" data-reveal>Outcomes that Speak Clearly</div>
          <div class="lead" data-reveal>
            Modern engineering education is measured by outcomes. Here are a few live-style metrics that animate as you scroll.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-4">
            <div class="card" data-reveal>
              <div class="counter" data-counter="95">0</div>
              <div class="counter-sub">Placement Share (demo metric)</div>
            </div>
            <div class="card" data-reveal>
              <div class="counter" data-counter="220">0</div>
              <div class="counter-sub">Recruiter Engagements (demo metric)</div>
            </div>
            <div class="card" data-reveal>
              <div class="counter" data-counter="43">0</div>
              <div class="counter-sub">Highest LPA (demo metric)</div>
            </div>
            <div class="card" data-reveal>
              <div class="counter" data-counter="10">0</div>
              <div class="counter-sub">Average LPA (demo metric)</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>BMSCE Introduction</div>
          <div class="para" data-reveal>${introLong}</div>
          <div class="para" data-reveal>
            Our teaching-learning experience is designed to feel premium and purposeful. Students build clarity through structured fundamentals, deepen competence through lab immersion, and develop professional confidence through mentoring, portfolios, and recruiter-aligned practice. The portal you’re viewing is built with the same philosophy: clarity, consistency, and modern responsiveness—so you can discover BMSCE as a complete ecosystem, not as a set of pages.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>NAAC Accreditation</div>
          <div class="para" data-reveal>${naacLong}</div>

          <div style="height:14px"></div>
          <div class="grid grid-3">
            <div class="card" data-reveal>
              <div class="card-title">Teaching-Learning Quality</div>
              <div class="muted">Outcome mapping, continuous evaluation, and academic support pathways.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Infrastructure & Resources</div>
              <div class="muted">Labs, library systems, digital learning resources, and well-designed learning spaces.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Continuous Improvement</div>
              <div class="muted">Feedback loops, curriculum refinement, and transparent academic processes.</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Rankings</div>
              <div class="para">
                BMSCE’s rankings represent more than numbers—they reflect a consistent culture of excellence. Our focus includes academic rigor, practical learning outcomes, research momentum, and professional readiness supported by mentorship and structured evaluation. Students are encouraged to build portfolios of work, communicate clearly, and learn with modern engineering discipline.
              </div>
              <div class="para">
                The ecosystem supports progression from foundation to specialization, combining lab immersion with project delivery and continuous feedback. That is how academic performance becomes career readiness and how student effort turns into measurable success.
              </div>
              <div style="height:12px"></div>
              <a href="/placements" data-nav class="btn btn-primary">See Placement Outcomes</a>
            </div>
            <div data-reveal>
              <div class="h2 heading">Achievements & Awards</div>
              <div class="muted" style="margin-top:10px">
                Cards below highlight key categories of achievement—innovation, research, and industry readiness.
              </div>
              <div style="height:12px"></div>
              <div class="grid grid-1">
                ${awards
                  .map(
                    (a) => `
                      <div class="card" style="display:grid;gap:6px" data-reveal>
                        <div class="card-title">${escapeHtml(a.title)}</div>
                        <div class="muted">${escapeHtml(a.desc)}</div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
              <div style="height:12px"></div>
              <a href="/research" data-nav class="btn btn-outline">Explore Research Impact</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAbout() {
    const historyImg = IMAGES.campus[1];
    const visionImg = IMAGES.library[0];
    const founderImg = IMAGES.founder;
    const principalImg = IMAGES.principal;

    const timeline = [
      { year: "1980s", text: "Institutional growth strengthened program delivery and academic culture through modern evaluation systems." },
      { year: "1990s", text: "Expansion of laboratories and research initiatives created stronger industry-aligned learning pathways." },
      { year: "2000s", text: "Digital resources, training centers, and project-based learning expanded student outcome focus." },
      { year: "2010s", text: "Research momentum increased with publication support, innovation workshops, and interdisciplinary projects." },
      { year: "2020s", text: "Modern curriculum, student mentorship models, and premium campus experiences shaped future-ready engineering outcomes." }
    ];

    return `
      ${renderHero({
        title: "About BMSCE",
        subtitle: "Legacy, values, and leadership for future-ready engineering education.",
        ctas: [{ href: "/admissions", label: "Start Your Journey", kind: "btn-primary" }, { href: "/contact", label: "Talk to Admissions", kind: "btn-outline" }],
        slides: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80", "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80", "images/academics-2.png", "images/academics-1.png"]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>History</div>
          <div class="grid grid-2" style="align-items:start; margin-top:14px">
            <div data-reveal>
              <div class="para">
                BMS College of Engineering is recognized for building a respected legacy through continuous evolution in engineering education standards. Over decades, BMSCE expanded academic programs, strengthened research capabilities, and deepened industry collaborations—while preserving a core commitment to student outcomes and ethical engineering practice.
              </div>
              <div class="para">
                The institution’s growth reflects a consistent philosophy: faculty mentorship matters, practical learning must stay connected to outcomes, and student confidence grows when knowledge is validated through projects. As technology advances, BMSCE adapts its curriculum and teaching approaches so graduates remain aligned with modern engineering expectations.
              </div>
              <div class="para">
                Alumni across global companies, startups, public service, and research institutions contribute to the BMSCE reputation. Their progress reinforces the same message for current students: learning becomes impact when education is structured with purpose, clarity, and continuous improvement.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Campus Moments</div>
              <div class="muted">Learning spaces that support focus, collaboration, and research-ready thinking.</div>
              <div style="height:10px"></div>
              <img src="${historyImg}" alt="BMSCE history" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Founder: Sreenivasaiah</div>
              <div class="para">
                The vision behind BMSCE is rooted in a belief that engineering education should be empowering, disciplined, and socially responsible. The founder, Sreenivasaiah, envisioned a learning institution that develops technical competence alongside character—so students become capable of building, innovating, and leading.
              </div>
              <div class="para">
                That vision is reflected in the present-day campus ecosystem: structured academic pathways, hands-on labs, project-driven learning, and mentorship that helps students grow with confidence. BMSCE’s approach encourages curiosity, rewards hard work, and turns learning into meaningful outcomes.
              </div>
              <div class="para">
                The founder’s guiding mindset continues to influence how the portal is designed: clarity, consistency, and premium user experience—so every student, parent, and recruiter can quickly understand BMSCE’s strengths and discover opportunities with trust.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Vision in Practice</div>
              <div class="muted">A leadership philosophy that blends excellence and responsibility.</div>
              <div style="height:10px"></div>
              <img src="${founderImg}" alt="Founder Sreenivasaiah" loading="lazy" style="width:100%;height:auto;border-radius:14px;" />
              <div style="height:12px"></div>
              <div class="muted">
                “Engineering excellence is built by doing—reviewing, improving, and validating ideas with integrity.”
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Vision & Mission</div>
          <div class="grid grid-2" style="margin-top:14px">
            <div class="card" data-reveal>
              <div class="card-title">Vision</div>
              <div class="muted">
                To be a globally recognized institution shaping engineers with strong technical knowledge, social responsibility, and leadership capabilities.
              </div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Mission</div>
              <div class="muted">
                To provide learner-focused education, promote interdisciplinary research, build meaningful industry partnerships, and encourage innovation for societal development.
              </div>
            </div>
          </div>
          <div style="height:12px"></div>
          <div class="para" data-reveal>
            Our mission is delivered through structured academic processes, practical lab experiences, and research-focused mentorship. Students learn to communicate clearly, collaborate effectively, and build solutions responsibly. That is what transforms an education into professional confidence.
          </div>
          <div style="height:12px"></div>
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal class="card">
              <div class="card-title">Academic Governance</div>
              <div class="muted">
                Transparent decision-making and consistent review mechanisms strengthen quality across the institution—from curriculum design to evaluation standards.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Quality Assurance Culture</div>
              <div class="muted">
                Continuous improvement cycles ensure learning remains aligned with modern engineering needs. Student feedback and outcome mapping guide refinements.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Principal Message</div>
              <div class="para">
                Leadership in BMSCE is anchored in inclusive growth, transparent governance, and academic excellence. We believe in nurturing students through mentorship, practical exposure, and values-driven learning—so they graduate as responsible professionals and innovators.
              </div>
              <div class="para">
                This portal is designed to help you discover opportunities efficiently. Browse departments, explore placements, understand our research ecosystem, and plan your academic path with confidence. The goal is to make the institution feel approachable, modern, and genuinely helpful.
              </div>
              <div class="para">
                <strong style="color:#0b3d91">Qualification (Highlight):</strong> Ph.D. • Academic Leadership & Outcome-Based Education (profile-style summary)<br />
                <strong style="color:#0b3d91">Academic focus:</strong> student mentorship, research culture, transparent governance, and placement readiness.
              </div>
              <div style="height:12px"></div>
              <a href="/academics" data-nav class="btn btn-primary">Explore Academic Programs</a>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Leadership & Mentorship</div>
              <div class="muted">A focus on student confidence, research readiness, and outcome-based excellence.</div>
              <div style="height:10px"></div>
              <img src="${principalImg}" alt="Principal" loading="lazy" style="width:100%;height:auto;border-radius:14px;" />
              <div style="height:10px"></div>
              <div class="muted" style="font-weight:1000;color:rgba(11,61,145,0.95)">Dr. Bheemsha Arya • Principal</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Founder & Donor Trustee (BMSET)</div>
              <div class="para">
                BMSCE is guided by a legacy of vision and responsibility. The founding leadership established a culture where engineering education is treated as a long-term public contribution—built on discipline, values, and student-first mentorship.
              </div>
              <div class="para">
                The founder’s vision emphasizes strong fundamentals, integrity in learning, and continuous improvement. The donor trustee’s support strengthens infrastructure and resources so students can access high-quality academic environments and career-ready learning pathways.
              </div>
              <div class="para">
                This section is included to reflect the real official story of BMSCE—leadership, legacy, and the institution’s commitment to excellence.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Institution Leadership Legacy</div>
              <div class="muted">Founder (BMSET) and Donor Trustee (BMSET)</div>
              <div style="height:10px"></div>
              <img src="${founderImg}" alt="Founder and Donor Trustee" loading="lazy" style="width:100%;height:auto;border-radius:14px;" />
              <div style="height:10px"></div>
              <div class="muted">
                Founder: Sri B. M. Sreenivasaiah (BMSET)<br/>
                Donor Trustee: Late Sri B. S. Narayan (BMSET)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Timeline of Growth</div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${timeline
              .map(
                (t) => `
              <div class="card" data-reveal>
                <div class="card-title">${escapeHtml(t.year)}</div>
                <div class="muted">${escapeHtml(t.text)}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div style="height:16px"></div>
          ${renderGallery({
            items: [
              { href: "/departments", src: visionImg, caption: "Engineering Learning Spaces" },
              { href: "/research", src: IMAGES.events[1], caption: "Research Showcase Moments" },
              { href: "/placements", src: IMAGES.campus[3], caption: "Career Outcomes & Mentorship" }
            ]
          })}
        </div>
      </section>
    `;
  }

  function renderAcademics() {
    const calendar = [
      { month: "Jan–Feb", label: "Teaching & Assessments", detail: "Core lectures, labs, quizzes, and mid-semester evaluations." },
      { month: "Mar–Apr", label: "Project Reviews", detail: "Design reviews, prototype demonstrations, and continuous improvement." },
      { month: "May–June", label: "Exams & Reflection", detail: "Final evaluations, feedback cycles, and learning outcome tracking." },
      { month: "July–Aug", label: "Specialized Tracks", detail: "Electives, workshops, internships, and skill-building sessions." },
      { month: "Sep–Oct", label: "Capstone Milestones", detail: "Team deliverables, mentoring check-ins, and documentation milestones." },
      { month: "Nov–Dec", label: "Industry Readiness", detail: "Mock interviews, recruiter-aligned coaching, and portfolio refinement." }
    ];

    const curriculumAcc = [
      {
        q: "Outcome-based learning (OBE)",
        a: "Each program maps learning outcomes to curriculum, labs, assessments, and projects so students know what ‘excellent’ looks like. OBE also improves transparency—students can track progress through measurable skills rather than only marks."
      },
      {
        q: "Project-driven curriculum",
        a: "Labs and projects are integrated throughout the semester. Students practice iteration—build, test, review, and refine—so outcomes become reliable. This is how theory becomes confidence: students learn to validate, not guess."
      },
      {
        q: "Mentorship & reviews",
        a: "Faculty mentorship is structured through review checkpoints. Students receive clear feedback on technical decisions, documentation quality, and communication. Reviews focus on measurable improvement, not vague comments."
      },
      {
        q: "Curriculum design (Foundations → Core → Tracks → Capstone)",
        a: "Students begin with foundations, then move into core engineering subjects, then specialization electives, and finally a capstone milestone. The capstone emphasizes evidence-based delivery: problem framing, implementation, testing, and final presentation."
      },
      {
        q: "Professional readiness (placements + internships)",
        a: "The ecosystem includes communication training, resume structuring, mock interviews, coding rounds practice, and recruiter-ready project storytelling. Internship mentoring helps students connect coursework with real deliverables."
      },
      {
        q: "Continuous improvement",
        a: "Feedback loops (student input + performance signals + industry expectations) guide curriculum refinement. The goal is to keep learning modern, relevant, and balanced—without losing strong fundamentals."
      }
    ];

    const mentorFaculty = faculty.slice(0, 8);
    const mentorCards = mentorFaculty
      .map((f) => {
        const topSubjects = (f.subjects || []).slice(0, 3).join(" • ");
        return `
          <a href="/faculty/${f.id}" data-nav class="card" data-reveal style="display:grid;gap:10px">
            <img src="${f.photo}" alt="${f.name}" loading="lazy" onerror="${imgOnErrorAttr(f.name)}" style="height:180px;object-fit:cover" />
            <div class="card-title">${escapeHtml(f.name)}</div>
            <div class="muted" style="font-weight:900;color:rgba(211,47,47,0.92)">${escapeHtml(f.qualification)}</div>
            <div class="muted"><strong style="color:#0b3d91">Subjects:</strong> ${escapeHtml(topSubjects)}</div>
            <div class="muted">${escapeHtml(String(f.research || "").slice(0, 140))}…</div>
            <div class="muted" style="color:rgba(11,61,145,0.95);font-weight:1000">Open Faculty Profile →</div>
          </a>
        `;
      })
      .join("");

    const projectRoadmap = [
      {
        year: "Year 1",
        title: "Foundations + Mini Projects",
        detail:
          "Programming fundamentals, problem-solving, math foundations, and lab practice. Projects focus on clarity: building small systems with clean structure and basic testing."
      },
      {
        year: "Year 2",
        title: "Core Systems + Lab Depth",
        detail:
          "Core engineering subjects supported by lab experiments. Students build projects with data storage, networking basics, electronics prototypes, or design workflows depending on branch."
      },
      {
        year: "Year 3",
        title: "Specialization Tracks + Industry Style Delivery",
        detail:
          "Electives and specialization tracks (AI/ML, cybersecurity, IoT, robotics, cloud, data systems). Students practice measurable outcomes, documentation, and review cycles."
      },
      {
        year: "Year 4",
        title: "Capstone + Internship + Portfolio",
        detail:
          "Major capstone project with mentor reviews, evaluation strategy, and final presentation. Internship experience and placement readiness sessions strengthen real-world confidence."
      }
    ];

    const courseCards = courseList
      .map(
        (c) => `
          <a href="/academics/${c.slug}" data-nav class="card" data-reveal>
            <div class="card-title">${escapeHtml(c.title)}</div>
            <div class="muted">${escapeHtml(c.description).slice(0, 150)}…</div>
            <div style="height:10px"></div>
            <div class="muted"><strong style="color:#0b3d91">Duration:</strong> ${escapeHtml(c.duration)}</div>
          </a>
        `
      )
      .join("");

    return `
      ${renderHero({
        title: "Academics",
        subtitle: "Programs designed for strong foundations and modern engineering skills.",
        ctas: [{ href: "/departments", label: "Choose a Department", kind: "btn-blue" }, { href: "/admissions", label: "Admissions Process", kind: "btn-outline" }],
        slides: IMAGES.hero.slice(0, 3)
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Programs at a Glance</div>
          <div class="grid grid-3" style="margin-top:14px">
            <div class="card" data-reveal>
              <div class="card-title">Undergraduate Programs</div>
              <div class="muted">
                Engineering streams with structured foundations, lab immersion, project-based learning, and mentorship—so skills translate into real outcomes.
              </div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Postgraduate Programs</div>
              <div class="muted">
                Advanced pathways for domain depth, applied research, and specialization—supported by faculty mentorship and lab-ready experiences.
              </div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Doctoral Programs</div>
              <div class="muted">
                Research-focused training with publication support, reproducibility mindset, and interdisciplinary collaboration guidance.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="kicker" data-reveal>Courses (Clickable)</div>
          <div class="h2 heading" data-reveal style="margin-top:10px">Explore All Courses</div>
          <div class="lead" data-reveal>
            Every course card opens a dedicated page with detailed curriculum structure, career scope, and a clear learning roadmap.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-3">${courseCards}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="kicker" data-reveal>Mentors (Clickable)</div>
          <div class="h2 heading" data-reveal style="margin-top:10px">Academic Mentors & Faculty Highlights</div>
          <div class="para" data-reveal>
            These mentors guide students through subjects, labs, and project reviews. Click a faculty card to view full profile, research work, and teaching areas.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-4">${mentorCards}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Academic Calendar</div>
          <div class="para" data-reveal>
            Our academic calendar is built to ensure smooth learning progression—balancing lectures, labs, reviews, assessments, internships, and capstone milestones.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${calendar
              .map(
                (x) => `
                <div class="card" data-reveal>
                  <div class="card-title">${escapeHtml(x.month)}</div>
                  <div class="muted"><strong style="color:#0b3d91">${escapeHtml(x.label)}:</strong> ${escapeHtml(x.detail)}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Project & Curriculum Roadmap</div>
          <div class="para" data-reveal>
            To avoid “empty” topics, this roadmap explains how projects grow year-by-year. The goal is to make learning feel structured, premium, and realistic—like an official college portal.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-2">
            ${projectRoadmap
              .map(
                (p) => `
                  <div class="card" data-reveal>
                    <div class="card-title">${escapeHtml(p.year)} • ${escapeHtml(p.title)}</div>
                    <div class="muted">${escapeHtml(p.detail)}</div>
                  </div>
                `
              )
              .join("")}
          </div>
          <div style="height:14px"></div>
          <div class="card" data-reveal>
            <div class="card-title">How Projects Are Evaluated</div>
            <div class="muted">
              Projects are reviewed using practical criteria: clarity of problem statement, correctness, testing quality, documentation, teamwork, and presentation. Mentors help students iterate until outcomes become reliable and measurable—this is a core part of BMSCE’s learning culture.
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Curriculum Explanation</div>
          <div class="para" data-reveal>
            The curriculum is designed around learning outcomes, practical relevance, and structured feedback cycles. Students progress from foundations to advanced application through labs, projects, and evaluation checkpoints.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-2">
            ${curriculumAcc
              .map(
                (it) => `
                  <div class="card" data-reveal>
                    <details>
                      <summary style="cursor:pointer; list-style:none; font-family:Poppins,system-ui,sans-serif; font-weight:1000; color:#0b3d91">
                        ${escapeHtml(it.q)}
                      </summary>
                      <div class="muted" style="margin-top:10px">${escapeHtml(it.a)}</div>
                    </details>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderCourseDetail(slug) {
    const c = courseList.find((x) => x.slug === slug);
    if (!c) return renderNotFound();

    return `
      ${renderHero({
        title: c.title,
        subtitle: "A detailed learning roadmap built around outcomes, projects, and career readiness.",
        ctas: [{ href: "/departments", label: "Browse Departments", kind: "btn-blue" }, { href: "/admissions", label: "Apply Now", kind: "btn-primary" }],
        slides: IMAGES.library.slice(0, 3)
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Description</div>
          <div class="para" data-reveal>${c.description}</div>
          <div class="para" data-reveal>
            This course emphasizes measurable skill development through structured labs, curated projects, and feedback cycles that build technical confidence and professional communication maturity.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-3">
            <div class="card" data-reveal>
              <div class="card-title">Duration</div>
              <div class="muted">${escapeHtml(c.duration)}</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Career Scope</div>
              <div class="muted">${escapeHtml(c.career)}</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Learning Approach</div>
              <div class="muted">Outcome mapping, project-driven practice, lab immersion, and mentorship-led iteration.</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Curriculum Structure</div>
          <div class="para" data-reveal>
            Students progress through foundations, core engineering principles, modern specialization tracks, and a capstone milestone that validates learning with evidence.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-2">
            ${c.curriculum
              .map(
                (it) => `
                <div class="card" data-reveal>
                  <div class="card-title">${escapeHtml(it.split(":")[0] || "Module")}</div>
                  <div class="muted">${escapeHtml(it)}</div>
                </div>
              `
              )
              .join("")}
          </div>
          <div style="height:14px"></div>
          <div class="card" data-reveal>
            <div class="card-title">Capstone & Professional Readiness</div>
            <div class="muted">
              The capstone is designed to reflect professional engineering workflows. Teams plan deliverables, build prototypes, test under realistic conditions, and document decisions. Mentors focus on reliability, clarity of communication, and measurable outcomes—so students can present their work with confidence.
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderDepartments() {
    const deptCards = departments
      .map(
        (d) => `
        <a href="/departments/${d.slug === "cse" ? "cse" : d.slug === "ece" ? "ece" : d.slug}" data-nav class="card dept-card" data-dept="${escapeHtml(d.slug)}" data-reveal>
          <div class="card-title">${escapeHtml(d.name)}</div>
          <div class="muted">${escapeHtml(d.short || "Core and emerging branches with modern lab depth.")}</div>
          <div style="height:10px"></div>
          <div class="muted" style="color:rgba(211,47,47,0.95);font-weight:950">Open Department Page →</div>
        </a>
      `
      )
      .join("");

    const deptPills = departments
      .map((d) => {
        const href = d.slug === "cse" || d.slug === "ece" ? `/departments/${d.slug}` : `/departments/${d.slug}`;
        return `<a href="${href}" data-nav class="pill">${escapeHtml(d.slug.toUpperCase())} • ${escapeHtml(d.name)}</a>`;
      })
      .join("");

    return `
      ${renderHero({
        title: "Departments",
        subtitle: "Core and emerging branches with strong academic depth and industry-ready learning.",
        ctas: [{ href: "/academics", label: "View Courses", kind: "btn-blue" }, { href: "/placements", label: "Placement Outcomes", kind: "btn-outline" }],
        slides: IMAGES.campus.slice(1, 4)
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Search Departments</div>
          <div class="para" data-reveal>
            Use the search to quickly locate a department. Each department page opens a dedicated portal section with vision, programs, faculty, labs, achievements, and HOD details.
          </div>

          <div class="pill-row" data-reveal aria-label="Department chooser (horizontal)">
            ${deptPills}
          </div>

          <div style="height:14px"></div>
          <div class="card" data-reveal>
            <div class="card-title">Department Search</div>
            <div class="muted">Type to filter departments instantly.</div>
            <div style="height:10px"></div>
            <input id="deptSearch" type="search" placeholder="Search e.g. CSE, ECE, MECH…" style="width:100%;padding:12px 14px;border-radius:16px;border:1px solid rgba(11,61,145,0.22);outline:none;font:inherit;font-weight:750" />
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-3" id="deptGrid">${deptCards}</div>
        </div>
      </section>
    `;
  }

  function renderDepartmentDetail(slug) {
    const dept = departments.find((x) => x.slug === slug);
    if (!dept) return renderNotFound();

    const isCse = slug === "cse";
    const isEce = slug === "ece";
    const banner = isCse || isEce ? dept.banner : IMAGES.campus.slice(0, 3);
    const facultyForDept = faculty.filter((f) => f.dept === slug);

    const labs = [
      { title: "Modern Learning Labs", img: "https://images.unsplash.com/photo-1581092334651-7d3e9b6c6ad1?auto=format&fit=crop&w=1600&q=80" },
      { title: "Prototype & Design Space", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80" },
      { title: "Research & Validation", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" }
    ];

    const hod = dept.hod || {
      name: "Department Leadership",
      qualification: "Ph.D. • Engineering",
      experience: "Years of mentorship",
      photo: IMAGES.principal
    };

    const facultyGrid = (facultyForDept.length ? facultyForDept : faculty.slice(0, 3)).slice(0, 10).map((f) => `
      <a href="/faculty/${f.id}" data-nav class="card" data-reveal style="display:grid;gap:10px">
        <img src="${f.photo}" alt="${f.name}" loading="lazy" onerror="${imgOnErrorAttr(f.name)}" style="height:170px;object-fit:cover" />
        <div class="card-title">${f.name}</div>
        <div class="muted">${f.qualification}</div>
      </a>
    `).join("");

    const visionText =
      "To be an academic hub that develops globally competitive engineers through rigorous foundations, modern labs, mentorship-driven projects, and research-aligned learning outcomes.";

    const programsText =
      "Students build strong core competence and then progress into specialized learning tracks through electives, practical workshops, and capstone-style deliverables that mirror industry workflows.";

    const achievements = [
      "Student project excellence through iterative review cycles",
      "Mentored research practice with publication-readiness support",
      "Industry collaboration through recruiter-aligned training and portfolio development",
      "Lab-based learning that validates engineering concepts under realistic constraints"
    ];

    const deptAbout = isCse
      ? "BMSCE Computer Science & Engineering prepares students for modern software and intelligent systems. The program emphasizes secure engineering thinking, scalable design, and applied AI/ML exploration through structured labs and project mentorship. Students learn to validate solutions with evidence and communicate outcomes professionally."
      : isEce
        ? "BMSCE Electronics & Communication Engineering trains students to design reliable electronics and communication systems from fundamentals to integrated prototypes. Students gain practical exposure through embedded design workflows, signal processing exploration, and laboratory experimentation that supports confidence in real-world system behavior."
        : dept.short || "A robust engineering pathway with modern lab depth and structured mentorship.";

    const programItems = [
      "Structured foundations with outcome mapping",
      "Lab immersion with prototype validation",
      "Specialization tracks across modern industry domains",
      "Capstone milestones emphasizing evidence-based delivery"
    ];

    return `
      <div class="section" style="padding-top:0">
        ${renderHero({
          title: dept.name,
          subtitle: dept.short || "Department portal with vision, faculty, labs, and research outcomes.",
          ctas: [{ href: "/academics", label: "See Courses", kind: "btn-blue" }, { href: "/admissions", label: "Admissions", kind: "btn-outline" }],
          slides: banner
        })}
      </div>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">About the Department</div>
              <div class="para">${deptAbout}</div>
              <div class="para">
                The department’s approach balances fundamentals and specialization. Students practice design thinking through lab sessions, and mentorship ensures that outcomes remain measurable. This creates a learning experience that feels professional, structured, and genuinely helpful.
              </div>
              <div style="height:12px"></div>
              <a href="/placements" data-nav class="btn btn-primary">See Careers & Placements</a>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Department Snapshot</div>
              <div class="muted">A quick visual overview of engineering spaces and learning energy.</div>
              <div style="height:10px"></div>
              ${renderGallery({
                items: banner.slice(0, 3).map((src, i) => ({ href: "#", src, caption: i === 0 ? "Design & Learning" : i === 1 ? "Research Momentum" : "Lab Excellence" }))
              })}
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Vision</div>
          <div class="para" data-reveal>${visionText}</div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${programItems
              .map(
                (x) => `
              <div class="card" data-reveal>
                <div class="card-title">Program Pillar</div>
                <div class="muted">${escapeHtml(x)}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-2">
            <div class="card" data-reveal>
              <div class="card-title">Programs & Curriculum</div>
              <div class="muted">${programsText}</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Engineering Outcomes</div>
              <div class="muted">
                Students build portfolios of project deliverables, learn to communicate decisions, and practice validation under real constraints—so skills become career-ready capabilities.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Faculty (Click to Open)</div>
          <div class="para" data-reveal>
            Faculty mentoring is built into the learning structure. Click a profile to view qualification, experience, subjects, and research work.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-4">${facultyGrid}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Labs</div>
          <div class="para" data-reveal>
            Modern labs strengthen engineering competence through hands-on experimentation. Students learn to prototype, test, and refine designs with a reliability-first mindset.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${labs
              .map(
                (l) => `
              <div class="gallery-card" data-reveal style="cursor:default">
                <img src="${l.img}" alt="${l.title}" loading="lazy" />
                <div class="gallery-caption">${escapeHtml(l.title)}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Research & Achievements</div>
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="card">
                <div class="card-title">Research Focus</div>
                <div class="muted">
                  Students participate in mentored research practice. Research outcomes include prototype deliverables, publication readiness sessions, and measurable improvements through structured evaluation workflows.
                </div>
              </div>
              <div style="height:12px"></div>
              <div class="card">
                <div class="card-title">Key Achievements</div>
                <div class="muted">
                  <ul style="padding-left:18px; margin-top:6px; color:rgba(26,26,26,0.7); font-weight:650; line-height:1.9">
                    ${achievements.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">HOD Details</div>
              <div class="muted">Department leadership message and professional focus areas.</div>
              <div style="height:10px"></div>
              <img src="${hod.photo}" alt="${hod.name}" loading="lazy" style="height:200px;object-fit:cover" />
              <div style="height:10px"></div>
              <div class="card-title">${escapeHtml(hod.name)}</div>
              <div class="muted">${escapeHtml(hod.qualification)} • ${escapeHtml(hod.experience)}</div>
              <div style="height:10px"></div>
              <div class="muted">${escapeHtml(hod.message || "Leading with mentorship, structured learning, and outcome-driven excellence.")}</div>
              <div style="height:12px"></div>
              <a href="/contact" data-nav class="btn btn-primary">Contact Department</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderFacultyDetail(id) {
    const f = faculty.find((x) => x.id === id);
    if (!f) return renderNotFound();
    const deptName = departments.find((d) => d.slug === f.dept)?.name || "Department";

    return `
      ${renderHero({
        title: f.name,
        subtitle: `${deptName} • ${f.qualification}`,
        ctas: [{ href: "/departments", label: "Back to Departments", kind: "btn-blue" }, { href: "/contact", label: "Reach Out", kind: "btn-outline" }],
        slides: [f.photo, IMAGES.hero[2], IMAGES.hero[3]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal class="card">
              <div class="card-title">Profile</div>
              <div style="height:10px"></div>
              <img src="${f.photo}" alt="${f.name}" loading="lazy" onerror="${imgOnErrorAttr(f.name)}" style="height:320px;object-fit:cover" />
              <div style="height:10px"></div>
              <div class="muted"><strong style="color:#0b3d91">Qualification:</strong> ${escapeHtml(f.qualification)}</div>
              <div class="muted"><strong style="color:#0b3d91">Experience:</strong> ${escapeHtml(f.experience)}</div>
            </div>
            <div data-reveal>
              <div class="h2 heading">Teaching & Subjects</div>
              <div class="para">${f.research}</div>
              <div style="height:12px"></div>
              <div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">
                ${f.subjects
                  .map(
                    (s) => `
                    <div class="card" style="box-shadow:none;background:rgba(255,255,255,0.45)">
                      <div class="card-title" style="font-size:0.98rem">${escapeHtml(s)}</div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Research Work & Publications</div>
          <div class="para" data-reveal>
            Students learn research practice in a structured way: motivation, evidence-based evaluation, documentation, and reproducibility thinking. The goal is to build confidence in producing results and communicating them clearly.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${f.publications
              .map(
                (p) => `
                <div class="card" data-reveal>
                  <div class="card-title">Selected Work</div>
                  <div class="muted">${escapeHtml(p)}</div>
                </div>
              `
              )
              .join("")}
          </div>
          <div style="height:14px"></div>
          <a href="/research" data-nav class="btn btn-primary">Explore Research Ecosystem</a>
        </div>
      </section>
    `;
  }

  function renderStudents() {
    return `
      ${renderHero({
        title: "Students",
        subtitle: "Achievements, clubs, resources, and support services designed for holistic growth.",
        ctas: [{ href: "/campus-life", label: "Explore Campus Life", kind: "btn-blue" }, { href: "/placements", label: "Placement Ecosystem", kind: "btn-outline" }],
        slides: IMAGES.students.slice(0, 3)
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Student Ecosystem</div>
          <div class="grid grid-3" style="margin-top:14px">
            <div class="card" data-reveal>
              <div class="card-title">Clubs</div>
              <div class="muted">Technical, entrepreneurship, design, robotics, and service clubs that build leadership and collaboration.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Achievements</div>
              <div class="muted">Recognition through hackathons, research showcases, and national-level competition performance.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Resources</div>
              <div class="muted">Digital library support, mentoring frameworks, and project-based learning guidance.</div>
            </div>
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal class="card">
              <div class="card-title">Support Services</div>
              <div class="muted">
                Student welfare includes academic advising, practice sessions, placement mentoring, scholarship facilitation, and a supportive peer-learning ecosystem.
                Students are guided to plan milestones, build portfolios, and maintain well-being routines that help them succeed long-term.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Professional Growth</div>
              <div class="muted">
                The ecosystem encourages professional maturity: structured resume building, interview rehearsal, and recruiter-aligned project storytelling.
                Students learn to present engineering decisions clearly, validate outcomes with evidence, and communicate professionally under time constraints.
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAlumni() {
    const cards = alumni
      .map(
        (a) => `
        <a href="/alumni/${a.id}" data-nav class="card" data-reveal style="display:grid;gap:10px">
          <img src="${a.photo}" alt="${a.name}" loading="lazy" onerror="${imgOnErrorAttr(a.name)}" style="height:180px;object-fit:cover" />
          <div class="card-title">${escapeHtml(a.name)}</div>
          <div class="muted"><strong style="color:#0b3d91">Branch:</strong> ${escapeHtml(a.branch)} • <strong style="color:#0b3d91">CGPA:</strong> ${escapeHtml(a.cgpa)}</div>
          <div class="muted"><strong style="color:#0b3d91">Company:</strong> ${escapeHtml(a.company)}</div>
          <div class="muted" style="color:rgba(211,47,47,0.95);font-weight:1000">${escapeHtml(a.package)}</div>
        </a>
      `
      )
      .join("");

    return `
      ${renderHero({
        title: "Alumni",
        subtitle: "Success stories, mentorship, and lifelong engagement with BMSCE.",
        ctas: [{ href: "/contact", label: "Connect", kind: "btn-outline" }, { href: "/placements", label: "See Outcomes", kind: "btn-primary" }],
        slides: IMAGES.students.slice(0, 3)
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Alumni Stories (Clickable)</div>
          <div class="para" data-reveal>
            Each alumni card opens a detailed page with career journey, achievements, and a narrative of how BMSCE shaped engineering confidence and professional clarity.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-4">${cards}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Alumni Achievements</div>
              <div class="para">
                Alumni demonstrate the BMSCE emphasis on engineering excellence and professional communication.
                Their careers span product engineering, analytics, embedded systems, entrepreneurship, and public service—reinforcing that the foundation at BMSCE supports diverse career outcomes.
              </div>
              <div class="para">
                Through mentorship, alumni guidance helps students build portfolios, navigate interviews, and align project work with industry expectations. That connection turns knowledge into a collaborative community.
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Join the Alumni Network</div>
              <div class="muted">
                Help the next generation of engineers with career guidance, mentorship sessions, and internship referrals.
                Your experience can strengthen student confidence and make the campus ecosystem more vibrant.
              </div>
              <div style="height:12px"></div>
              <a href="/contact" data-nav class="btn btn-primary">Become an Alumni Mentor</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAlumniDetail(id) {
    const a = alumni.find((x) => x.id === id);
    if (!a) return renderNotFound();

    const gallery = [IMAGES.students[0], IMAGES.events[0], IMAGES.campus[0], IMAGES.library[2]];

    return `
      ${renderHero({
        title: a.name,
        subtitle: `${a.branch} • ${a.company} • ${a.package}`,
        ctas: [{ href: "/alumni", label: "Back to Alumni", kind: "btn-blue" }, { href: "/contact", label: "Request Mentorship", kind: "btn-outline" }],
        slides: [a.photo, gallery[1], gallery[2]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal class="card">
              <div class="card-title">Career Highlights</div>
              <div style="height:10px"></div>
              <img src="${a.photo}" alt="${a.name}" loading="lazy" onerror="${imgOnErrorAttr(a.name)}" style="height:320px;object-fit:cover" />
              <div style="height:10px"></div>
              <div class="muted"><strong style="color:#0b3d91">Branch:</strong> ${escapeHtml(a.branch)}</div>
              <div class="muted"><strong style="color:#0b3d91">CGPA:</strong> ${escapeHtml(a.cgpa)}</div>
              <div class="muted"><strong style="color:#0b3d91">Company:</strong> ${escapeHtml(a.company)}</div>
              <div class="muted" style="color:rgba(211,47,47,0.95);font-weight:1000"><strong>Package:</strong> ${escapeHtml(a.package)}</div>
            </div>
            <div data-reveal>
              <div class="h2 heading">Alumni Story</div>
              <div class="para">${a.story}</div>
              <div class="para">
                The shared theme across alumni is a structured approach to learning: build foundations, validate understanding with projects, communicate decisions clearly, and continuously improve. BMSCE nurtures that growth so students can transition confidently into professional environments.
              </div>
              <div style="height:12px"></div>
              <a href="/alumni" data-nav class="btn btn-primary">Explore More Alumni Journeys</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Gallery Moments</div>
          <div style="height:14px"></div>
          <div class="gallery gallery-2">
            ${gallery
              .map(
                (src, idx) => `
              <div class="gallery-card" data-reveal style="cursor:default">
                <img src="${src}" alt="Alumni gallery ${idx + 1}" loading="lazy" />
                <div class="gallery-caption">${idx === 0 ? "Campus Memories" : idx === 1 ? "Project Showcases" : idx === 2 ? "Mentorship & Talks" : "Community Moments"}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderPlacements() {
    const banner = renderCarousel({
      title: "Placements",
      desc: "Career-focused ecosystem with training, internship pathways, and recruitment excellence.",
      slides: placements.banner.map((src) => ({ src })),
      autoplay: true,
      interval: 4600
    });

    const logos = placements.logos
      .map((l) => {
        const svgLogo = `https://cdn.simpleicons.org/${l.icon}/0B3D91`;
        return `
          <div class="card" data-reveal style="padding:10px 10px;display:flex;align-items:center;justify-content:center;min-height:92px"
               data-tooltip="${escapeHtml(l.name)} • Recruiter Partner">
            <img
              src="${svgLogo}"
              alt="${l.name} logo"
              loading="lazy"
              style="height:38px;object-fit:contain;border-radius:10px"
              onerror="this.style.display='none'; this.parentElement.innerHTML = '<div style=&quot;font-family:Poppins,system-ui,sans-serif;font-weight:1000;color:rgba(11,61,145,0.95)&quot;>${escapeHtml(
                l.name
              )}</div>';"
            />
          </div>
        `;
      })
      .join("");

    return `
      ${banner}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Recruiter Partners</div>
          <div class="para" data-reveal>
            The placement experience is supported by structured training and recruiter-aligned practice. Below is a premium-style logo grid with hover tooltips.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-4">${logos}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Placement Stats</div>
          <div class="para" data-reveal>
            Animated charts visualize key metrics (demo). Hover interactions provide quick context.
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-2" style="align-items:start">
            <div class="card chart-card" data-reveal style="padding:18px">
              <div class="card-title">Highest • Average • Median (Demo)</div>
              <div class="chart-wrap">
                <div class="muted">Values displayed in LPA.</div>
                <div class="chart-bars" aria-label="Placement stats chart">
                  <div class="bar">
                    <div class="bar-fill" data-bar="highest"></div>
                    <div class="bar-label">Highest</div>
                    <div class="bar-value" data-chart-highest>${placements.stats.highest}</div>
                  </div>
                  <div class="bar">
                    <div class="bar-fill" data-bar="average"></div>
                    <div class="bar-label">Average</div>
                    <div class="bar-value" data-chart-average>${placements.stats.average}</div>
                  </div>
                  <div class="bar">
                    <div class="bar-fill" data-bar="median"></div>
                    <div class="bar-label">Median</div>
                    <div class="bar-value" data-chart-median>${placements.stats.median}</div>
                  </div>
                </div>
                <div class="muted">
                  Tip: training, mentoring, and project storytelling support consistent performance across recruitment cycles.
                </div>
              </div>
            </div>
            <div class="card" data-reveal style="padding:18px">
              <div class="card-title">How Training Converts Into Outcomes</div>
              <div class="muted">
                Students receive structured support across aptitude practice, coding rounds, communication development, and role-specific interview mentoring. Internships and alumni guidance add real-world confidence by connecting learning with measurable outcomes.
              </div>
              <div style="height:12px"></div>
              <div class="grid" style="grid-template-columns:1fr;gap:10px">
                <div class="card" style="box-shadow:none;background:rgba(255,255,255,0.45)" data-reveal>
                  <div class="card-title">Internship Support</div>
                  <div class="muted">Project evaluation cycles, mentor feedback, and portfolio strengthening for employability.</div>
                </div>
                <div class="card" style="box-shadow:none;background:rgba(255,255,255,0.45)" data-reveal>
                  <div class="card-title">Placement Readiness</div>
                  <div class="muted">Mock interviews, resume guidance, and recruiter-aligned practice sessions.</div>
                </div>
                <div class="card" style="box-shadow:none;background:rgba(255,255,255,0.45)" data-reveal>
                  <div class="card-title">Student Feedback Loop</div>
                  <div class="muted">Continuous improvements based on student experience and recruitment readiness data.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Testimonials</div>
          <div class="para" data-reveal>Student voices that highlight training, mentorship, and portfolio confidence.</div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${placements.testimonials
              .map(
                (t) => `
                <div class="card" data-reveal>
                  <img src="${t.photo}" alt="${t.name}" loading="lazy" style="height:170px;object-fit:cover;margin-bottom:10px"/>
                  <div class="card-title">${escapeHtml(t.name)}</div>
                  <div class="muted" style="font-weight:900;color:rgba(211,47,47,0.92)">${escapeHtml(t.role)}</div>
                  <div class="muted" style="margin-top:10px">${escapeHtml(t.quote)}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderResearch() {
    const cards = researchFolders
      .map((r) => {
        return `
          <a href="/research/${r.folder}" data-nav class="card" data-reveal style="overflow:hidden">
            <div style="position:relative">
              <img src="${r.heroImage}" alt="${r.title}" loading="lazy" style="height:190px;object-fit:cover;border-radius:14px"/>
            </div>
            <div style="height:10px"></div>
            <div class="card-title">${escapeHtml(r.title)}</div>
            <div class="muted">Open the research section for details, projects, and learning outcomes.</div>
          </a>
        `;
      })
      .join("");

    return `
      ${renderHero({
        title: "Research",
        subtitle: "Labs, publications, projects, funding, patents, and innovation ecosystem building.",
        ctas: [{ href: "/departments", label: "Explore Departments", kind: "btn-blue" }, { href: "/contact", label: "Collaborate", kind: "btn-outline" }],
        slides: [IMAGES.hero[2], IMAGES.hero[3], IMAGES.library[1]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Research Folders (Clickable)</div>
          <div class="para" data-reveal>
            Every folder opens a new page with long-form content, images, and mentored project highlights.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">${cards}</div>
        </div>
      </section>
    `;
  }

  function renderResearchFolder(folder) {
    const r = researchFolders.find((x) => x.folder === folder);
    if (!r) return renderNotFound();

    return `
      ${renderHero({
        title: `Research • ${r.title}`,
        subtitle: "Long-form details, projects, and a premium visual experience.",
        ctas: [{ href: "/research", label: "Back to Research", kind: "btn-blue" }, { href: "/contact", label: "Partner with Us", kind: "btn-outline" }],
        slides: [r.heroImage, IMAGES.campus[1], IMAGES.library[2]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">What This Folder Covers</div>
              <div class="para">
                ${r.title} is designed to strengthen research outcomes through structured mentorship, careful evaluation, and professional documentation practice. Students learn how to set milestones, build prototypes, validate results, and communicate outcomes with clarity.
              </div>
              <div class="para">
                The ecosystem encourages evidence-based improvement: you don’t just build—you review, test, and iterate until outcomes become reliable. This mindset transforms curiosity into disciplined research capability.
              </div>
              <div style="height:14px"></div>
              <div class="grid grid-2">
                ${r.highlights.map((h) => `<div class="card" data-reveal><div class="card-title">Key Focus</div><div class="muted">${escapeHtml(h)}</div></div>`).join("")}
              </div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Research Gallery</div>
              <div class="muted">A visual peek into project and mentorship moments.</div>
              <div style="height:10px"></div>
              <div class="gallery gallery-2">
                ${[r.heroImage, IMAGES.library[0], IMAGES.events[0], IMAGES.campus[0]]
                  .slice(0, 4)
                  .map(
                    (src, idx) => `
                  <div class="gallery-card" style="cursor:default">
                    <img src="${src}" alt="Research image ${idx + 1}" loading="lazy" />
                    <div class="gallery-caption">${idx === 0 ? r.title : idx === 1 ? "Mentorship Reviews" : idx === 2 ? "Prototype Sessions" : "Showcase Moments"}</div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Projects & Deliverables</div>
          <div class="para" data-reveal>
            Example project themes represent how students apply knowledge in structured research workflows. Each theme includes measurable milestones and review checkpoints.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            ${r.projects.map((p) => `<div class="card" data-reveal><div class="card-title">Project Highlight</div><div class="muted">${escapeHtml(p)}</div></div>`).join("")}
          </div>
          <div style="height:14px"></div>
          <a href="/departments" data-nav class="btn btn-primary">Explore Department Research</a>
        </div>
      </section>
    `;
  }

  function renderCampusLife() {
    const cards = campusItems
      .map(
        (it) => `
          <a href="/campus-life/${it.item}" data-nav class="card" data-reveal>
            <img src="${it.hero}" alt="${it.title}" loading="lazy" style="height:220px;object-fit:cover" />
            <div style="height:10px"></div>
            <div class="card-title">${escapeHtml(it.title)}</div>
            <div class="muted">Open the dedicated portal page with images and detailed content.</div>
          </a>
        `
      )
      .join("");

    return `
      ${renderHero({
        title: "Campus Life",
        subtitle: "Fests, sports, clubs, and hostel life—where engineering confidence becomes community pride.",
        ctas: [{ href: "/students", label: "Student Ecosystem", kind: "btn-blue" }, { href: "/contact", label: "Reach Out", kind: "btn-outline" }],
        slides: [IMAGES.campus[2], IMAGES.events[0], IMAGES.students[1]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Choose a Campus Experience</div>
          <div class="para" data-reveal>
            Each item opens a new page with images, detailed content, and an immersive scrolling experience.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-2">${cards}</div>
        </div>
      </section>
    `;
  }

  function renderCampusItem(item) {
    const ci = campusItems.find((x) => x.item === item);
    if (!ci) return renderNotFound();

    const galleryItems = ci.gallery.map((src, idx) => ({
      href: "/campus-life/" + ci.item,
      src,
      caption: idx === 0 ? "Campus Energy" : idx === 1 ? "Community Moments" : "Learning & Celebration"
    }));

    return `
      ${renderHero({
        title: `Campus Life • ${ci.title}`,
        subtitle: "Images, detailed stories, and premium portal experience.",
        ctas: [{ href: "/campus-life", label: "Back to Campus Life", kind: "btn-blue" }, { href: "/admissions", label: "Explore Admission Options", kind: "btn-outline" }],
        slides: [ci.hero, IMAGES.campus[0], IMAGES.events[2]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Story</div>
              ${ci.paragraphs.map((p) => `<div class="para">${p}</div>`).join("")}
            </div>
            <div data-reveal class="card">
              <div class="card-title">Gallery</div>
              <div class="muted">Hover zoom and premium image presentation.</div>
              <div style="height:10px"></div>
              ${renderGallery({ items: galleryItems })}
            </div>
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-3">
            <div class="card" data-reveal>
              <div class="card-title">Leadership Growth</div>
              <div class="muted">Students learn coordination, responsibility, and presentation confidence through active campus participation.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Community & Support</div>
              <div class="muted">Peer learning, mentorship, and structured routines help students stay motivated and focused.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Career Readiness</div>
              <div class="muted">Skills developed through campus life—teamwork, clarity, and execution—translate directly to professional environments.</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderContact() {
    return `
      ${renderHero({
        title: "Contact",
        subtitle: "Connect with admissions and support teams—fast, clear, and reliable.",
        ctas: [{ href: "/admissions", label: "Admissions", kind: "btn-primary" }, { href: "/about", label: "About BMSCE", kind: "btn-outline" }],
        slides: [IMAGES.campus[3], IMAGES.library[0], IMAGES.students[0]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal class="card">
              <div class="card-title">Contact Form</div>
              <div class="muted">Send your message—this demo form includes validation and premium micro-interactions.</div>
              <div style="height:12px"></div>
              <form id="contactForm" style="display:grid;gap:10px">
                <input id="name" type="text" required placeholder="Your name" style="width:100%;padding:12px 14px;border-radius:16px;border:1px solid rgba(11,61,145,0.22);outline:none;font:inherit;font-weight:750" />
                <input id="email" type="email" required placeholder="Email address" style="width:100%;padding:12px 14px;border-radius:16px;border:1px solid rgba(11,61,145,0.22);outline:none;font:inherit;font-weight:750" />
                <textarea id="message" rows="6" required placeholder="How can we help?" style="width:100%;padding:12px 14px;border-radius:16px;border:1px solid rgba(11,61,145,0.22);outline:none;font:inherit;font-weight:750;resize:vertical"></textarea>
                <button class="btn btn-primary" type="submit">Submit Message</button>
              </form>
              <div id="formMessage" class="muted" style="margin-top:12px;font-weight:900"></div>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Address & Map</div>
              <div class="muted">Bull Temple Road, Basavanagudi, Bengaluru, Karnataka 560019</div>
              <div style="height:12px"></div>
              <div class="muted"><strong style="color:#0b3d91">Email:</strong> admissions@bmsce.ac.in</div>
              <div class="muted"><strong style="color:#0b3d91">Phone:</strong> +91 80 2662 2130</div>
              <div style="height:12px"></div>
              <iframe
                title="BMSCE Location Map"
                loading="lazy"
                style="width:100%;min-height:320px;border:0;border-radius:16px"
                src="https://www.google.com/maps?q=BMS%20College%20of%20Engineering%20Bengaluru&output=embed">
              </iframe>
            </div>
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-3">
            <div class="card" data-reveal>
              <div class="card-title">Admissions</div>
              <div class="muted">Applications, eligibility checks, and program guidance.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Departments</div>
              <div class="muted">Learn about faculty, labs, research, and curriculum details.</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Research Collaborations</div>
              <div class="muted">Partnerships, funding, publications, patents, and innovation support.</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAdmissions() {
    return `
      ${renderHero({
        title: "Admissions",
        subtitle: "A step-by-step portal experience for eligibility, process clarity, and confident applications.",
        ctas: [{ href: "/contact", label: "Contact Admissions", kind: "btn-primary" }, { href: "/academics", label: "Browse Programs", kind: "btn-outline" }],
        slides: [IMAGES.library[3], IMAGES.campus[2], IMAGES.hero[1]]
      })}

      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>How to Apply (Step-by-Step)</div>
          <div class="para" data-reveal>
            We designed this admissions portal experience to be clear and premium. Follow the steps below to apply confidently, track required documents, and plan your timeline.
          </div>
          <div style="height:14px"></div>
          <div class="grid grid-2">
            ${[
              { n: "1", t: "Choose Program", d: "Select the department and course that matches your goals. Review course pages for duration, career scope, and curriculum structure." },
              { n: "2", t: "Check Eligibility", d: "Confirm academic eligibility and required entrance details. If you have questions, contact admissions for guidance." },
              { n: "3", t: "Prepare Documents", d: "Keep marksheets, ID proof, photos, and entrance score-related documents ready. Use a checklist for completeness." },
              { n: "4", t: "Submit Application", d: "Register online, fill the application carefully, and upload the required documents. Validate the information before final submission." },
              { n: "5", t: "Counselling & Verification", d: "Attend counselling and complete verification steps for seat confirmation. Keep originals available for inspection." },
              { n: "6", t: "Enrollment & Orientation", d: "After confirmation, complete enrollment formalities and join the orientation program to start your BMSCE journey." }
            ]
              .map(
                (s) => `
              <div class="card" data-reveal>
                <div class="card-title">Step ${s.n}: ${escapeHtml(s.t)}</div>
                <div class="muted">${escapeHtml(s.d)}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="grid grid-2" style="align-items:start">
            <div data-reveal>
              <div class="h2 heading">Eligibility</div>
              <div class="para">
                Eligibility depends on the selected program and academic background. The admissions team verifies qualification criteria and may require entrance-related information to complete consideration.
              </div>
              <div class="para">
                For a smooth application, ensure documents are accurate and up to date. If you face uncertainty about eligibility, reach out using the contact form—our team will guide you quickly and clearly.
              </div>
              <div style="height:12px"></div>
              <a href="/contact" data-nav class="btn btn-primary">Verify Eligibility</a>
            </div>
            <div data-reveal class="card">
              <div class="card-title">Important Timeline (Demo)</div>
              <div class="muted">
                Application opens: March 2026<br />
                Last date: May 2026<br />
                Counselling: June 2026<br />
                Session begins: August 2026
              </div>
              <div style="height:12px"></div>
              <div class="card" style="box-shadow:none;background:rgba(255,255,255,0.45)" data-reveal>
                <div class="card-title">Scholarships & Support</div>
                <div class="muted">Merit opportunities and financial assistance pathways for eligible students.</div>
              </div>
            </div>
          </div>

          <div style="height:14px"></div>
          <div class="grid grid-3">
            <div class="card" data-reveal>
              <div class="card-title">Quick CTA</div>
              <div class="muted">Apply now and submit documents with confidence.</div>
              <div style="height:10px"></div>
              <a href="/contact" data-nav class="btn btn-primary">Get Application Help</a>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Documents Checklist</div>
              <div class="muted">Marksheets, ID proof, photographs, entrance details, and category certificates (if applicable).</div>
            </div>
            <div class="card" data-reveal>
              <div class="card-title">Admissions Guidance</div>
              <div class="muted">Our team clarifies eligibility, timeline steps, and submission guidance.</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderNotFound() {
    return `
      <section class="section">
        <div class="section-inner">
          <div class="h2 heading" data-reveal>Page Not Found</div>
          <div class="para" data-reveal>
            The portal couldn’t find this route. Use the sidebar navigation to continue exploring BMSCE’s official sections.
          </div>
          <div style="height:14px"></div>
          <a href="/" data-nav class="btn btn-primary" data-reveal>Go Home</a>
        </div>
      </section>
    `;
  }

  function renderRoute(path) {
    const p = normalizePath(path);

    if (p === "/") return renderHome();
    if (p === "/about") return renderAbout();
    if (p === "/academics") return renderAcademics();
    if (p === "/departments") return renderDepartments();
    if (p === "/departments/cse") return renderDepartmentDetail("cse");
    if (p === "/departments/ece") return renderDepartmentDetail("ece");
    if (p.startsWith("/departments/")) return renderDepartmentDetail(p.split("/")[2]);
    if (p.startsWith("/academics/")) return renderCourseDetail(p.split("/")[2]);
    if (p === "/placements") return renderPlacements();
    if (p === "/research") return renderResearch();
    if (p.startsWith("/research/")) return renderResearchFolder(p.split("/")[2]);
    if (p === "/campus-life") return renderCampusLife();
    if (p.startsWith("/campus-life/")) return renderCampusItem(p.split("/")[2]);
    if (p === "/students") return renderStudents();
    if (p === "/alumni") return renderAlumni();
    if (p.startsWith("/alumni/")) return renderAlumniDetail(p.split("/")[2]);
    if (p.startsWith("/faculty/")) return renderFacultyDetail(p.split("/")[2]);
    if (p === "/contact") return renderContact();
    if (p === "/admissions") return renderAdmissions();
    return renderNotFound();
  }

  function postRenderInit(path) {
    yearSpan && (yearSpan.textContent = String(new Date().getFullYear()));

    // Active sidebar highlight
    const activeKey = getNavKey(path);
    const portalLinks = Array.from(document.querySelectorAll("[data-route]"));
    portalLinks.forEach((a) => {
      const match = a.getAttribute("data-route") === activeKey;
      a.classList.toggle("active", match);
    });

    // Route-specific init
    if (document.getElementById("deptSearch")) {
      const input = document.getElementById("deptSearch");
      const cards = Array.from(document.querySelectorAll(".dept-card"));
      input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        cards.forEach((c) => {
          const d = (c.getAttribute("data-dept") || "").toLowerCase();
          const name = (c.querySelector(".card-title") ? c.querySelector(".card-title").textContent : "").toLowerCase();
          const show = !q || d.includes(q) || name.includes(q);
          c.style.display = show ? "block" : "none";
        });
      });
    }

    if (document.getElementById("contactForm")) {
      const form = document.getElementById("contactForm");
      const formMessage = document.getElementById("formMessage");
      formMessage && (formMessage.textContent = "");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = (document.getElementById("name").value || "").trim();
        const email = (document.getElementById("email").value || "").trim();
        const message = (document.getElementById("message").value || "").trim();
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!name || !email || !message) {
          formMessage.style.color = "rgba(211,47,47,0.95)";
          formMessage.textContent = "Please fill in all required fields.";
          return;
        }
        if (!emailPattern.test(email)) {
          formMessage.style.color = "rgba(211,47,47,0.95)";
          formMessage.textContent = "Please enter a valid email address.";
          return;
        }
        formMessage.style.color = "rgba(11,61,145,0.95)";
        formMessage.textContent = "Thank you. Your message has been prepared (demo).";
        form.reset();
      });
    }

    ensureTooltipsCSS();
    initHeroSlider();
    initCarousels();
    initCounters();
    initCharts();
    revealOnScroll();
    initTooltipCards();
  }

  function navigateTo(path, { replace = false } = {}) {
    const normalized = normalizePath(path);
    if (!normalized) return;

    if (replace) history.replaceState({}, "", normalized);
    else history.pushState({}, "", normalized);

    showLoading(430);
    if (animate && root) {
      animate(root, { opacity: [1, 0] }, { duration: 0.16, ease: "easeIn" });
    }
    // Scroll to top of the content area for each "new page"
    if (mainScroll) mainScroll.scrollTo({ top: 0, behavior: "auto" });

    // Render after a brief frame for the transition feel
    requestAnimationFrame(() => {
      root.innerHTML = renderRoute(normalized);
      postRenderInit(normalized);
      animatePageIn(root);
    });
  }

  function handleLinkClicks() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-nav]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      e.preventDefault();
      navigateTo(href);
    });
  }

  function handleScrollButtons() {
    const handler = () => {
      const y = mainScroll ? mainScroll.scrollTop : window.scrollY;
      if (!toTopBtn) return;
      if (y > 560) toTopBtn.classList.add("show");
      else toTopBtn.classList.remove("show");
    };
    handler();
    if (mainScroll) mainScroll.addEventListener("scroll", handler);
    else window.addEventListener("scroll", handler);

    toTopBtn && toTopBtn.addEventListener("click", () => {
      if (mainScroll) mainScroll.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initTheme() {
    const stored = localStorage.getItem("bmsce-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    if (themeToggle) themeToggle.dataset.on = dark ? "1" : "0";

    themeToggle &&
      themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("bmsce-theme", next ? "dark" : "light");
        themeToggle.dataset.on = next ? "1" : "0";
        // Micro-interaction
        if (animate) animate(themeToggle, { scale: [1, 1.02] }, { duration: 0.14 });
      });
  }

  function initOnLoad() {
    // Hide loading screen quickly if JS loads fast.
    if (loadingScreen) {
      loadingScreen.style.opacity = "1";
      loadingScreen.style.display = "grid";
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 240);
      }, 700);
    }

    // Footer year
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

    // Render initial route
    const params = new URLSearchParams(window.location.search);
    const routeParam = params.get("route");
    const pathFromQuery = routeParam ? normalizePath(routeParam) : null;
    const pathFromLocation = normalizePath(window.location.pathname);
    const path = pathFromQuery || pathFromLocation || "/";
    root.innerHTML = renderRoute(path === "" ? "/" : path);
    postRenderInit(path === "" ? "/" : path);
    animatePageIn(root);
  }

  // Router popstate (back/forward)
  window.addEventListener("popstate", () => {
    const path = normalizePath(window.location.pathname);
    showLoading(320);
    root.innerHTML = renderRoute(path);
    postRenderInit(path);
    animatePageIn(root);
  });

  // Apply click interception
  handleLinkClicks();
  handleScrollButtons();
  initTheme();
  initOnLoad();
})();


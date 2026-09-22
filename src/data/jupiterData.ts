import { 
  CapabilityItem, 
  ApproachStep, 
  ArchitectureLayer, 
  EnterpriseProblem, 
  ArchitecturalCaseStudy,
  SystemNode 
} from '../types';

export const COMPANY_DETAILS = {
  legalName: 'JupiterGenX AI Limited',
  shortName: 'JupiterGenX AI',
  tagline: 'WE BUILD SYSTEMS THAT LAST.',
  subtagline: 'Engineering reliable, enterprise-grade technology infrastructure and intelligent software systems.',
  philosophy: 'Technology should empower organizations rather than restrict them.',
  established: 2015,
  headquarters: 'San Fernando, Trinidad & Tobago',
  timezone: 'AST (UTC-4)',
  corePillars: [
    'Engineering',
    'Intelligence',
    'Reliability',
    'Transformation'
  ],
  coreAreas: [
    'Enterprise Software',
    'Cloud Infrastructure',
    'Applied Artificial Intelligence',
    'Data & Analytics',
    'Custom Software Engineering',
    'Network & Physical Systems',
    'Digital Transformation',
    'Systems Reliability',
    'Long-term Technology Support'
  ]
};

export const ENTERPRISE_PROBLEMS: EnterpriseProblem[] = [
  {
    id: 'scaling',
    name: 'Scaling Bottlenecks',
    challenge: 'Architectures engineered for initial convenience collapse under concurrent load, unbounded query patterns, and asynchronous data volume.',
    traditionalFailureMode: 'Vertical server stacking, ad-hoc caching patches, cascading database locks, and frequent outages during peak demand.',
    jupiterEngineeredRemedy: 'Stateless distributed primitives, partitioned event streams, horizontally scalable micro-services, and deterministic load-shedding.',
    technicalImpact: 'Linear scaling characteristics without exponential operating cost or latency degradation.'
  },
  {
    id: 'legacy',
    name: 'Legacy Entanglement',
    challenge: 'Core operations trapped inside monolithic codebases where changes introduce unexpected regressions and fragile dependencies.',
    traditionalFailureMode: 'High-risk big-bang rewrites that exceed budgets or prolonged stagnation driven by fear of system instability.',
    jupiterEngineeredRemedy: 'Domain-driven strangler fig architectures, automated regression harnesses, and bi-directional synchronization gateways.',
    technicalImpact: 'Zero-downtime continuous migration preserving existing business logic while modernizing runtime infrastructure.'
  },
  {
    id: 'data',
    name: 'Data Complexity & Silos',
    challenge: 'Critical operational intelligence fragmented across disparate relational stores, flat exports, and vendor lock-in interfaces.',
    traditionalFailureMode: 'Nightly batch jobs that fail silently, inconsistent schema evolutions, and operational decisions based on stale figures.',
    jupiterEngineeredRemedy: 'Unified schema governance, real-time change data capture (CDC), immutable audit ledgers, and governed data pipelines.',
    technicalImpact: 'Deterministic data consistency, single source of truth, and low-latency analytical readiness.'
  },
  {
    id: 'friction',
    name: 'Process & Operational Friction',
    challenge: 'Manual operational handoffs, disconnected physical-to-digital workflows, and systems that impose rigid constraints on operators.',
    traditionalFailureMode: 'Fragmented tooling requiring swivel-chair data re-entry, high error rates, and operator burnout.',
    jupiterEngineeredRemedy: 'Human-centric workflow automation, unified enterprise APIs, ergonomic interface design, and intelligent event triggers.',
    technicalImpact: 'Systems that conform to institutional strengths rather than forcing human teams into artificial constraints.'
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'BUILD',
    title: 'BUILD',
    subtitle: 'Custom Software Engineering',
    descriptor: 'Mission-critical software architectures engineered from first principles for performance, durability, and maintainability.',
    badge: 'Core Engineering',
    leadParagraph: 'We build custom software systems designed to withstand decades of operational reality. From high-throughput distributed transactional backends to precision enterprise web platforms, every component is rigorously architected.',
    accentColor: '#E5C388', // Champagne Gold
    accentBg: 'rgba(229, 195, 136, 0.08)',
    accentBorder: 'rgba(229, 195, 136, 0.28)',
    pillars: [
      {
        title: 'Distributed Systems & Backends',
        description: 'Fault-tolerant microservices, event-driven architectures, and high-concurrency transactional processing engines.'
      },
      {
        title: 'Enterprise Applications',
        description: 'Bespoke operational software tailored to institutional workflows with uncompromising speed, stability, and security.'
      },
      {
        title: 'API & Gateway Engineering',
        description: 'Resilient integration layers, rate-controlled gateways, and protocol bridges connecting legacy and contemporary environments.'
      }
    ],
    deliverables: [
      'Microservices & Core Backends',
      'Enterprise Web & Mobile Systems',
      'Transactional Processing Engines',
      'Integration APIs & Connectors',
      'Automated Test Harnesses'
    ],
    techFocus: ['Stateless Services', 'Event Sourcing', 'Type-Safe Contracts', 'Defensive Concurrency', 'Zero-Allocation Hotpaths'],
    operationalStandard: 'Sub-millisecond internal routing, deterministic error handling, and complete telemetry coverage.'
  },
  {
    id: 'INTELLIGENCE',
    title: 'INTELLIGENCE',
    subtitle: 'Applied AI & Data Systems',
    descriptor: 'Applied machine intelligence and data pipelines engineered into operational workflows as reliable software systems.',
    badge: 'Applied AI',
    leadParagraph: 'We demystify artificial intelligence by treating it as an engineering discipline. We build deterministic data processing pipelines and tightly controlled inference workflows that deliver repeatable, auditable value.',
    accentColor: '#D4B07B', // Brushed Platinum Bronze
    accentBg: 'rgba(212, 176, 123, 0.08)',
    accentBorder: 'rgba(212, 176, 123, 0.28)',
    pillars: [
      {
        title: 'Automated Inference Pipelines',
        description: 'Production model deployment, low-latency scoring endpoints, and real-time classification engines.'
      },
      {
        title: 'Data & Analytics Architecture',
        description: 'Scalable data warehousing, real-time stream ingestion, transformation layers, and business intelligence modeling.'
      },
      {
        title: 'Operational Decision Systems',
        description: 'Rule-augmented machine intelligence systems that automate complex multi-variable operational evaluations.'
      }
    ],
    deliverables: [
      'Production Inference Endpoints',
      'Streaming Data Pipelines',
      'Semantic Search & Knowledge Systems',
      'Analytical Processing Warehouses',
      'Automated Decision Engines'
    ],
    techFocus: ['Input Validation', 'Model Orchestration', 'Deterministic Fallbacks', 'Schema-Enforced Outputs', 'Drift Monitoring'],
    operationalStandard: 'Verifiable model bounds, auditable decision trails, and sub-100ms inference service level targets.'
  },
  {
    id: 'TRANSFORM',
    title: 'TRANSFORM',
    subtitle: 'Digital Transformation & Modernization',
    descriptor: 'Systematic migration and modernization of foundational business systems without operational disruption.',
    badge: 'Modernization',
    leadParagraph: 'Digital transformation is not a buzzword; it is the deliberate decommissioning of technical debt and the architectural migration of vital business assets to modern, resilient platforms.',
    accentColor: '#34D399', // Imperial Jade Emerald
    accentBg: 'rgba(52, 211, 153, 0.08)',
    accentBorder: 'rgba(52, 211, 153, 0.28)',
    pillars: [
      {
        title: 'Strangler Fig Monolith Migration',
        description: 'Incremental decomposition of legacy codebases into modern components with bi-directional fallback safety.'
      },
      {
        title: 'Process Digitization & Automation',
        description: 'Replacing manual spreadsheet-driven and paper bottlenecks with automated digital workflows.'
      },
      {
        title: 'System Integration & Consolidation',
        description: 'Harmonizing fragmented software tools across departments into coherent, unified operational ecosystems.'
      }
    ],
    deliverables: [
      'De-risked Migration Blueprints',
      'Dual-Write Data Gateways',
      'Automated Workflow Platforms',
      'Unified Identity & Access Architecture',
      'System Retirement Roadmaps'
    ],
    techFocus: ['Zero-Downtime Cutover', 'Data Parity Verification', 'Shadow Traffic Analysis', 'Phased Rollouts', 'Rollback Guarantees'],
    operationalStandard: '100% operational continuity throughout modernization milestones with zero data loss.'
  },
  {
    id: 'OPERATE',
    title: 'OPERATE',
    subtitle: 'Infrastructure, Reliability & Support',
    descriptor: 'Industrial-grade cloud foundations, network architectures, and continuous systems reliability engineering.',
    badge: 'Reliability Engineering',
    leadParagraph: 'Software is only as good as the infrastructure beneath it. We design, provision, and maintain robust cloud environments and physical networks with rigorous multi-layer observability and proactive reliability.',
    accentColor: '#E2A876', // Warm Titanium Bronze
    accentBg: 'rgba(226, 168, 118, 0.08)',
    accentBorder: 'rgba(226, 168, 118, 0.28)',
    pillars: [
      {
        title: 'Cloud & Hybrid Infrastructure',
        description: 'Reproducible infrastructure as code, multi-region high-availability configurations, and containerized runtimes.'
      },
      {
        title: 'Network & Physical Systems',
        description: 'Secure enterprise network topologies, on-premise hardware orchestration, and resilient edge deployments.'
      },
      {
        title: 'Continuous Reliability & Support',
        description: 'Long-term technology support, proactive health audits, vulnerability management, and rapid incident response.'
      }
    ],
    deliverables: [
      'Infrastructure as Code (IaC) Repositories',
      'Comprehensive Telemetry & Observability',
      'Disaster Recovery & Failover Systems',
      'Physical Network Topologies',
      'Service Level Objective (SLO) Monitoring'
    ],
    techFocus: ['Immutable Infrastructure', 'Automated Failover', 'Distributed Tracing', 'Synthetic Monitoring', 'Hardened Security Posture'],
    operationalStandard: 'Continuous automated health checks, redundant communication paths, and structured incident triage.'
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    phase: 'DISCOVERY',
    title: 'Deep Domain & Systems Discovery',
    durationEstimate: 'Phase 1',
    description: 'We audit existing architectures, technical dependencies, data flows, and institutional constraints before writing a single line of code.',
    keyOutputs: [
      'System Dependency Graph',
      'Bottleneck & Risk Matrix',
      'Data Lineage Map',
      'Stakeholder Architectural Requirements'
    ],
    engineeringControls: 'Comprehensive source and environment audits with quantitative baseline measurements.'
  },
  {
    number: '02',
    phase: 'BLUEPRINT',
    title: 'Architectural Blueprint & Modeling',
    durationEstimate: 'Phase 2',
    description: 'Detailed specification of system topology, database schemas, API contracts, security perimeters, and failover mechanics.',
    keyOutputs: [
      'Formal System Topology Diagrams',
      'Database Entity & State Models',
      'API Interface Specifications (OpenAPI / gRPC)',
      'Security & Threat Model'
    ],
    engineeringControls: 'Peer-reviewed RFC design documents with explicit non-functional performance guarantees.'
  },
  {
    number: '03',
    phase: 'ENGINEERING',
    title: 'Iterative Precision Engineering',
    durationEstimate: 'Phase 3',
    description: 'Implementation using strict type safety, modular design patterns, clean separation of concerns, and automated testing suites.',
    keyOutputs: [
      'Modular Source Codebase',
      'Comprehensive Unit & Integration Test Suites',
      'Continuous Integration Verification Pipelines',
      'Isolated Ephemeral Preview Environments'
    ],
    engineeringControls: 'Mandatory automated code validation, static analysis, and security scanning on every commit.'
  },
  {
    number: '04',
    phase: 'HARDENING',
    title: 'Stress Testing & Hardening',
    durationEstimate: 'Phase 4',
    description: 'Subjecting systems to synthetic load spikes, network partition simulations, penetration tests, and edge-case failure drills.',
    keyOutputs: [
      'Load & Concurrency Benchmark Reports',
      'Chaos Engineering Fault Injection Logs',
      'Security Penetration Audit Remediation',
      'Runbooks & Operational Playbooks'
    ],
    engineeringControls: 'Verification that systems gracefully degrade and self-heal without human intervention.'
  },
  {
    number: '05',
    phase: 'DEPLOYMENT',
    title: 'Zero-Downtime Deployment',
    durationEstimate: 'Phase 5',
    description: 'Orchestrated cutovers using canary rollouts, blue-green environments, or strangler proxies to ensure uninterrupted continuity.',
    keyOutputs: [
      'Automated CD Pipelines',
      'Blue-Green Deployment Infrastructure',
      'Real-Time Telemetry Dashboard',
      'Rollback Triggers & Automated Health Monitors'
    ],
    engineeringControls: 'Zero-data-loss cutover gates with immediate roll-back safeguards verified in pre-flight.'
  },
  {
    number: '06',
    phase: 'EVOLUTION',
    title: 'Long-Term Reliability & Evolution',
    durationEstimate: 'Ongoing',
    description: 'Continuous telemetry surveillance, proactive security patching, performance tuning, and architectural adaptation as organizations grow.',
    keyOutputs: [
      '24/7 Telemetry & SLO Tracking',
      'Proactive Capacity Planning Reports',
      'Scheduled Security & Dependency Upgrades',
      'Strategic Architecture Evolution Reviews'
    ],
    engineeringControls: 'Guaranteed operational support agreements with strict response windows and continuous monitoring.'
  }
];

export const TECH_ECOSYSTEM_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-physical',
    level: 1,
    name: 'Hardware & Edge Layer',
    role: 'Physical Infrastructure & Sensory Endpoints',
    description: 'On-premise server appliances, IoT telemetry endpoints, physical security controls, and edge networking equipment.',
    components: ['Bare-Metal Servers', 'Industrial Edge Gateways', 'Physical Network Switches', 'Environmental Sensors'],
    resilienceMechanism: 'Redundant power supplies (UPS), hardware RAID, out-of-band management (IPMI), and environmental failovers.',
    securityBoundary: 'Physical access controls, TPM chip attestation, and isolated management VLANs.'
  },
  {
    id: 'layer-network',
    level: 2,
    name: 'Network & Mesh Layer',
    role: 'Transport Security & Traffic Routing',
    description: 'Resilient private networking, SD-WAN interconnects, site-to-site VPN tunnels, and intelligent load balancers.',
    components: ['Zero-Trust Mesh', 'BGP Anycast Routing', 'TLS 1.3 Termination', 'WAF & DDoS Mitigation'],
    resilienceMechanism: 'Multi-homed transit providers, automatic BGP path failover, and geographic routing health probes.',
    securityBoundary: 'mTLS microsegmentation, egress firewalls, and encrypted packet tunnels.'
  },
  {
    id: 'layer-cloud',
    level: 3,
    name: 'Cloud & Compute Foundation',
    role: 'Virtualized Runtimes & Orchestration',
    description: 'Elastic compute clusters, container orchestration, serverless event execution, and infrastructure-as-code automation.',
    components: ['Kubernetes Clusters', 'Container Registries', 'Terraform & OpenTofu', 'Auto-Scaling Worker Pools'],
    resilienceMechanism: 'Cross-Availability-Zone node pools, automated pod rescheduling, and health check restarts.',
    securityBoundary: 'Role-Based Access Control (RBAC), container image signing, and immutable host operating systems.'
  },
  {
    id: 'layer-data',
    level: 4,
    name: 'Data & Storage Engine',
    role: 'State Persistence, Streams & Transactions',
    description: 'ACID-compliant relational databases, distributed key-value stores, real-time message brokers, and object storage.',
    components: ['PostgreSQL Replicas', 'Distributed Kafka Streams', 'Redis Memory Caching', 'Encrypted Object Stores'],
    resilienceMechanism: 'Synchronous replication, point-in-time recovery (PITR), multi-region backup snapshots, and WAL archiving.',
    securityBoundary: 'Column-level encryption, AES-256 at rest, strict TLS in transit, and immutable audit logs.'
  },
  {
    id: 'layer-logic',
    level: 5,
    name: 'Business Logic & Services',
    role: 'Core Domain Execution & Workflow Rules',
    description: 'Type-safe domain services, event processors, workflow state machines, and transactional controllers.',
    components: ['Domain Microservices', 'Temporal State Workflows', 'Background Job Queues', 'Event Sourcing Handlers'],
    resilienceMechanism: 'Idempotent request keys, circuit breakers, dead-letter queues, and exponential backoff retries.',
    securityBoundary: 'Cryptographic JWT validation, domain-level authorization gates, and strict input validation schemas.'
  },
  {
    id: 'layer-api',
    level: 6,
    name: 'API & Gateway Layer',
    role: 'Protocol Mediation & External Surface',
    description: 'High-performance API gateways, reverse proxies, rate limiting, and contract-governed endpoints.',
    components: ['GraphQL Federations', 'gRPC Protobuf Services', 'REST OpenAPI Endpoints', 'WebSocket Push Gateways'],
    resilienceMechanism: 'Token bucket rate limiting, edge caching, graceful degradation, and adaptive concurrency limits.',
    securityBoundary: 'CORS policies, API key hashing, OAuth 2.0 / OIDC tokens, and request size throttles.'
  },
  {
    id: 'layer-ui-ai',
    level: 7,
    name: 'Applied AI & Interface Surface',
    role: 'Human Interaction & Machine Intelligence',
    description: 'Low-latency operator web portals, operational intelligence dashboards, and production machine learning inference.',
    components: ['Responsive Enterprise Portals', 'Real-Time Telemetry Panels', 'Inference Pipelines', 'Decision Support Engines'],
    resilienceMechanism: 'Optimistic UI updates, offline-first client caches, deterministic AI fallbacks, and streaming error recovery.',
    securityBoundary: 'Content Security Policy (CSP), subresource integrity, sanitized input rendering, and audited prompt envelopes.'
  }
];

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'node-hardware',
    name: 'Hardware & Edge Tier',
    layer: 'hardware',
    label: 'HARDWARE',
    description: 'Physical server appliances, edge sensors, and compute chassis housing low-level execution environments.',
    specs: 'Dual Xeon Scalable, ECC RAM, Redundant Platinum PSUs',
    connectedTo: ['node-network'],
    status: 'optimal',
    throughput: '100 Gbps Interface',
    latency: '< 0.05 ms internal bus'
  },
  {
    id: 'node-network',
    name: 'Zero-Trust Network',
    layer: 'network',
    label: 'NETWORK',
    description: 'Encrypted overlay mesh with software-defined traffic shaping, firewalls, and anycast DNS routing.',
    specs: 'mTLS 1.3 WireGuard Mesh, BGP Multi-homed',
    connectedTo: ['node-hardware', 'node-compute'],
    status: 'optimal',
    throughput: '40 Gbps aggregate',
    latency: '0.8 ms local transit'
  },
  {
    id: 'node-compute',
    name: 'Compute & Runtime',
    layer: 'compute',
    label: 'COMPUTE',
    description: 'Isolated container runtimes orchestrated with dynamic autoscaling and declarative health checks.',
    specs: 'Kubernetes 1.30, Alpine Container Engines, Pod Autoscalers',
    connectedTo: ['node-network', 'node-database', 'node-logic'],
    status: 'optimal',
    throughput: '320 Cores Allocated',
    latency: '1.2 ms schedule time'
  },
  {
    id: 'node-database',
    name: 'Resilient Data Tier',
    layer: 'database',
    label: 'DATABASE',
    description: 'High-availability partitioned database clusters with synchronous replication and automated WAL archiving.',
    specs: 'PostgreSQL 16 High-Availability Cluster + Redis Cache Cluster',
    connectedTo: ['node-compute', 'node-logic'],
    status: 'optimal',
    throughput: '14,500 txn / sec',
    latency: '0.4 ms read / 1.8 ms write'
  },
  {
    id: 'node-logic',
    name: 'Core Application Logic',
    layer: 'logic',
    label: 'LOGIC',
    description: 'Idempotent domain execution services containing business rules, financial validations, and state machines.',
    specs: 'Stateless Go / Node / Rust Services, Temporal Workflow Engine',
    connectedTo: ['node-database', 'node-api', 'node-intelligence'],
    status: 'optimal',
    throughput: '99.99% successful cycles',
    latency: '4.5 ms avg execution'
  },
  {
    id: 'node-api',
    name: 'API Gateway & Ingress',
    layer: 'api',
    label: 'API',
    description: 'Unified ingress proxy handling authentication, rate regulation, schema validation, and protocol transformation.',
    specs: 'Envoy Proxy, Envoy Gateway, OpenAPI 3.1 & gRPC contracts',
    connectedTo: ['node-logic', 'node-ui', 'node-telemetry'],
    status: 'optimal',
    throughput: '28,000 req / sec',
    latency: '1.8 ms gateway tax'
  },
  {
    id: 'node-ui',
    name: 'Interface & Portal Surface',
    layer: 'ui',
    label: 'UI',
    description: 'Responsive, accessible operational dashboards and field applications engineered for rapid human decision-making.',
    specs: 'React 19, Tailwind, WebSockets, Hardware-Accelerated Rendering',
    connectedTo: ['node-api'],
    status: 'optimal',
    throughput: '60 FPS render',
    latency: '< 16 ms frame budget'
  },
  {
    id: 'node-intelligence',
    name: 'Applied AI & Inference',
    layer: 'intelligence',
    label: 'INTELLIGENCE',
    description: 'Operational machine intelligence modules performing anomaly detection, automated scoring, and predictive scheduling.',
    specs: 'Quantized Inference Pipeline, Vector Embeddings, Deterministic Guards',
    connectedTo: ['node-logic', 'node-telemetry'],
    status: 'optimal',
    throughput: '450 inferences / sec',
    latency: '42 ms p95'
  },
  {
    id: 'node-telemetry',
    name: 'Telemetry & Observability',
    layer: 'telemetry',
    label: 'TELEMETRY',
    description: 'Continuous metrics, distributed traces, structured logs, and automated alerting loops watching all system tiers.',
    specs: 'OpenTelemetry, Prometheus, Grafana, Distributed Tracing',
    connectedTo: ['node-hardware', 'node-network', 'node-compute', 'node-database', 'node-logic', 'node-api', 'node-ui', 'node-intelligence'],
    status: 'optimal',
    throughput: '2.5M metrics / min',
    latency: 'Real-time 1s window'
  }
];

export const ARCHITECTURAL_CASE_STUDIES: ArchitecturalCaseStudy[] = [
  {
    id: 'case-telemetry-engine',
    classification: 'SYSTEMS ENGINEERING',
    domain: 'Industrial & Remote Infrastructure',
    headline: 'High-Reliability Distributed Telemetry & Fault Isolation',
    context: 'An operational environment requiring continuous ingestion from distributed physical monitoring endpoints across intermittent network connectivity.',
    architecturalChallenge: 'Packet loss, delayed store-and-forward syncing, and catastrophic telemetry blind spots caused by rigid client-server assumptions in legacy polling systems.',
    engineeringApproach: 'Designed an offline-first edge gateway protocol coupled with an append-only event stream broker that buffers locally during network degradation and reconciles state idempotently upon reconnection.',
    technicalExecution: [
      'Edge Gateway Daemons with local SQLite circular write-ahead log buffers',
      'MQTT over TLS with QoS 1/2 message delivery guarantees',
      'Distributed Kafka streaming broker handling out-of-order event reconstitution',
      'Continuous anomaly detection identifying sensor drift in sub-second windows'
    ],
    systemReliabilityImpact: 'Zero lost telemetry events across network interruption periods, reducing mean time to fault detection from hours to 850 milliseconds.'
  },
  {
    id: 'case-monolith-migration',
    classification: 'DIGITAL TRANSFORMATION',
    domain: 'Enterprise Transaction Processing',
    headline: 'Zero-Downtime Strangler Migration for Mission-Critical Core',
    context: 'A mission-critical enterprise operations platform operating on a legacy 15-year-old monolithic database architecture with high schema coupling.',
    architecturalChallenge: 'Inability to introduce modern customer-facing APIs without risking database lockups and system-wide transactional downtime during business hours.',
    engineeringApproach: 'Implemented an automated change-data-capture (CDC) pipeline alongside a transparent proxy router, allowing selective routing of read and write traffic while continuously verifying data parity between old and new stores.',
    technicalExecution: [
      'Debezium-based WAL streaming replicating transactional records in real time',
      'Shadow traffic comparator validating business rule parity before cutover',
      'Containerized microservices running isolated domain boundaries',
      'Dual-write validation layer maintaining rollback readiness throughout'
    ],
    systemReliabilityImpact: 'Complete migration achieved with 0 minutes of unscheduled production downtime, eliminating schema bottlenecks and enabling continuous deployment.'
  },
  {
    id: 'case-ai-decision-pipeline',
    classification: 'APPLIED ARTIFICIAL INTELLIGENCE',
    domain: 'Operational Logistics & Resource Scheduling',
    headline: 'Deterministic Machine Intelligence for Dynamic Logistics',
    context: 'Complex multi-variable scheduling operations previously reliant on manual spreadsheet triage resulting in dispatch conflicts and high operating overhead.',
    architecturalChallenge: 'Balancing probabilistic machine learning recommendations with strict institutional rules, safety constraints, and regulatory requirements.',
    engineeringApproach: 'Engineered a two-tier architecture: a statistical optimization model proposing potential assignments, filtered through a deterministic constraint validation gate ensuring 100% policy adherence.',
    technicalExecution: [
      'Constraint Satisfaction Engine (SMT solver) acting as hard gatekeeper',
      'Low-latency model inference microservice deployed close to application layer',
      'Audit log recorder capturing feature weights and input variables per decision',
      'Human-in-the-loop review interface for edge cases and threshold excursions'
    ],
    systemReliabilityImpact: 'Reduced scheduling calculation time from 4.5 hours of manual effort to 12 seconds of automated execution with zero policy violations.'
  }
];

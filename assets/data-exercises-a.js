/* COMP2120/6120 Final Thoughts — exercises part A: Matching + Selection */
window.EX_MATCHING = [
  {
    id: 'mt-01', topic: 'process',
    prompt: 'A development team works in two-week sprints, holds daily stand-up meetings, and regularly reprioritises requirements based on customer feedback. Which concept best describes this approach?',
    options: ['Waterfall model', 'Agile development', 'Formal code inspection', 'Continuous deployment'],
    answer: 1,
    explain: 'Short, repeating iterations with continuous customer feedback are the defining features of Agile. Waterfall would freeze requirements and execute phases once, in order.'
  },
  {
    id: 'mt-02', topic: 'process',
    prompt: 'A contractor must deliver a system for a government agency. Requirements are fixed in a signed document, then analysis produces models and business rules, then architecture, then code, then testing, then operations. Change requests must go through a formal change board. Which model is this?',
    options: ['Agile development', 'Waterfall model', 'Kaizen', 'Canary release'],
    answer: 1,
    explain: 'Strictly sequential phases with a frozen requirements baseline and formal change control describe the waterfall model. It suits stable requirements and contractual accountability.'
  },
  {
    id: 'mt-03', topic: 'inspection',
    prompt: 'A team books a meeting room, assigns a moderator, a reader, a scribe and a verifier, and follows planning, overview, preparation, meeting, rework and follow-up to examine an entire existing module. What are they doing?',
    options: ['Modern code review', 'Pair programming', 'Formal code inspection', 'Unit testing'],
    answer: 2,
    explain: 'Defined roles plus a six-phase synchronous process over the whole artefact is a formal inspection. A modern review would examine a single change asynchronously.'
  },
  {
    id: 'mt-04', topic: 'inspection',
    prompt: 'A developer pushes a branch, opens a pull request with an explanation, a colleague comments inline the next morning, and CI runs the tests. Which practice is this?',
    options: ['Formal inspection', 'Walkthrough', 'Passaround (modern code review)', 'Ad hoc review'],
    answer: 2,
    explain: 'Passaround review is asynchronous and distributed, has preparation but rarely a meeting, and examines each change. Tool support (pull requests, inline comments, CI) is its signature.'
  },
  {
    id: 'mt-05', topic: 'inspection',
    prompt: 'Two developers sit at one computer: one types the code, the other watches, asks questions and suggests improvements, and they swap roles regularly. Which practice is this?',
    options: ['Pair programming', 'Formal inspection', 'Continuous integration', 'A/B testing'],
    answer: 0,
    explain: 'Pair programming pairs a driver (typing) with a navigator (reviewing, questioning). It costs more development time but reduces defects and spreads knowledge.'
  },
  {
    id: 'mt-06', topic: 'measurement',
    prompt: 'A manager ranks developers by number of commits. Developers respond by splitting each change into many trivial commits. Which phenomenon does this illustrate?',
    options: ['The streetlight effect', 'Metric gaming ("you get what you measure")', 'Construct validity', 'Confirmation bias'],
    answer: 1,
    explain: 'The metric became a target, so behaviour changed to optimise the number rather than the underlying goal. This is the classic "you get what you measure" failure.'
  },
  {
    id: 'mt-07', topic: 'measurement',
    prompt: 'A team measures "number of tests written" because the CI tool reports it for free, while escaped defects — the thing they actually care about — are never tracked. Which bias does this illustrate?',
    options: ['The streetlight effect', 'Survivorship bias', 'Sampling bias', 'Anchoring'],
    answer: 0,
    explain: 'They look where the light is: the easiest available measurement, not the most decision-relevant one. That is exactly the streetlight effect.'
  },
  {
    id: 'mt-08', topic: 'devops',
    prompt: 'A team deploys the new version to 1% of users, watches error rates and latency, then routes 10%, 50% and finally 100% of traffic to it. Which deployment strategy is this?',
    options: ['Big-bang deployment', 'Blue/green deployment', 'Rolling deployment', 'Canary deployment'],
    answer: 3,
    explain: 'A canary exposes a small slice of traffic to the new version first, limiting the blast radius, then expands once the metrics look healthy.'
  },
  {
    id: 'mt-09', topic: 'devops',
    prompt: 'A company runs two identical production environments. Traffic is switched from the old environment to the new one by changing the load balancer, and switching back takes seconds. Which strategy is this?',
    options: ['Rolling deployment', 'Blue/green deployment', 'Canary deployment', 'Continuous integration'],
    answer: 1,
    explain: 'Blue/green keeps two full environments and flips traffic at the load balancer. Rollback is instant, at the cost of duplicated infrastructure.'
  },
  {
    id: 'mt-10', topic: 'devops',
    prompt: 'A fleet of twelve servers is updated three at a time; each batch is health-checked before the next batch is replaced. Which strategy is this?',
    options: ['Big-bang deployment', 'Rolling deployment', 'Blue/green deployment', 'Canary deployment'],
    answer: 1,
    explain: 'Replacing instances in batches is a rolling deployment. The fleet is a mix of versions during the rollout, so backward compatibility matters.'
  },
  {
    id: 'mt-11', topic: 'devops',
    prompt: 'Every merge to the main branch that passes the pipeline is released to production automatically, with no human approval. Which practice is this?',
    options: ['Continuous integration', 'Continuous delivery', 'Continuous deployment', 'Continuous improvement'],
    answer: 2,
    explain: 'Continuous delivery stops at a manual approval; continuous deployment removes that gate and releases every passing change automatically.'
  },
  {
    id: 'mt-12', topic: 'testing',
    prompt: 'A tool feeds thousands of randomly generated and malformed inputs to a JSON parser and reports any crash or hang. Which technique is this?',
    options: ['Mutation testing', 'Fuzz testing', 'Unit testing', 'A/B testing'],
    answer: 1,
    explain: 'Random or malformed input aimed at robustness failures is fuzzing. It needs no output oracle for crashes, which is why it scales cheaply.'
  },
  {
    id: 'mt-13', topic: 'testing',
    prompt: 'A team changes `if (a > b)` to `if (a >= b)` in a copy of the source, runs the test suite, and records whether any test fails. Which technique is this?',
    options: ['Fuzz testing', 'Mutation testing', 'Regression testing', 'Performance testing'],
    answer: 1,
    explain: 'Deliberately injecting a small syntactic change and checking whether tests "kill" it is mutation testing — a measure of test-suite strength.'
  },
  {
    id: 'mt-14', topic: 'debugging',
    prompt: 'A bug appears only when commits 17 and 23 are both present. A tool repeatedly splits the set of commits, asks "does this subset still fail?", and narrows it to exactly those two. Which technique is this?',
    options: ['Delta debugging', 'Bisection by build number', 'Static analysis', 'Triage'],
    answer: 0,
    explain: 'Delta debugging finds a minimal interesting subset (here {17, 23}) using divide-and-conquer, and it handles the case where a single element is not enough.'
  },
  {
    id: 'mt-15', topic: 'defects',
    prompt: 'A crash occurs in a deprecated internal tool that no customer uses; the team agrees it must eventually be fixed but schedules it for next quarter. Which pair of concepts best explains this decision?',
    options: ['Severity and priority', 'Resolution and assignment', 'Triage and verification', 'Validation and verification'],
    answer: 0,
    explain: 'The crash may be severe in impact but low in urgency. Severity measures impact ("cost of not fixing"), priority measures when it will be fixed.'
  },
  {
    id: 'mt-16', topic: 'architecture',
    prompt: 'A retailer splits its application into catalogue, orders and payments services. Each has its own database, is deployed independently, and communicates over HTTP APIs. Which architecture is this?',
    options: ['Monolith', 'Plug-in architecture', 'Microservices', 'Client–server'],
    answer: 2,
    explain: 'Independent deployment, own data store per service and web-API communication are the defining traits of microservices.'
  },
  {
    id: 'mt-17', topic: 'architecture',
    prompt: 'A service is approaching its CPU limit, so the team adds four more identical instances behind a load balancer instead of buying a larger machine. Which is this?',
    options: ['Vertical scaling', 'Horizontal scaling', 'Normalisation', 'Caching'],
    answer: 1,
    explain: 'Adding more machines is horizontal scaling (scale out). Buying a bigger machine would be vertical scaling (scale up).'
  },
  {
    id: 'mt-18', topic: 'requirements',
    prompt: 'A specification states: "The system shall be user-friendly and respond quickly." Which description fits best?',
    options: ['A functional requirement', 'A verifiable quality requirement', 'A vague, unverifiable requirement', 'A domain assumption'],
    answer: 2,
    explain: '"User-friendly" and "quickly" have no measurable threshold, so no test can decide whether they are satisfied. Precision and verifiability are missing.'
  },
  {
    id: 'mt-19', topic: 'oss',
    prompt: 'A startup links a GPL-licensed library into its closed-source product and distributes the binary. It is told it must release the combined work under the GPL. Which property of the licence causes this?',
    options: ['Permissive licensing', 'Copyleft', 'Public domain', 'Trademark protection'],
    answer: 1,
    explain: 'Copyleft requires derivative works to remain under the same licence, which is why linking GPL code into a closed product triggers source-release obligations.'
  },
  {
    id: 'mt-20', topic: 'testing',
    prompt: 'A team achieves 100% line coverage, but none of the tests contain assertions. What is the most accurate description of the situation?',
    options: ['The tests are complete but slow', 'Coverage is high but there is no oracle, so defects can pass unnoticed', 'The suite is equivalent to mutation testing', 'The code is proven correct'],
    answer: 1,
    explain: 'Coverage records that code ran; it says nothing about whether results were checked. Without an oracle, a failing behaviour can still be "green".'
  },
  {
    id: 'mt-21', topic: 'architecture',
    prompt: 'A desktop application ships language packs as separate repositories. Each pack is built independently but loaded into the same running process, and the core team does not rebuild the application to add one. Which architectural style is this?',
    options: ['Plug-in architecture', 'Service-oriented architecture', 'Microservices', 'Monolithic architecture'],
    answer: 0,
    explain: 'Plug-ins separate development (distinct repositories, independent release) but still run inside one monolithic runtime. SOA and microservices would use separate processes and messages or APIs.'
  }

];

window.EX_SELECTION = [
  {
    id: 'sl-01', topic: 'testing',
    prompt: 'Which statements about testing are correct? Select all that apply.',
    options: [
      '100% code coverage guarantees that the software is defect-free.',
      'Mutation testing can help evaluate the effectiveness of a test suite.',
      'Fuzz testing can reveal defects caused by unexpected or malformed inputs.',
      'Static analysis always requires running the program.'
    ],
    answers: [1, 2],
    explain: 'B and C are correct. Coverage only shows what was executed (A is false), and static analysis examines code without executing it (D is false).'
  },
  {
    id: 'sl-02', topic: 'requirements',
    prompt: 'Which of the following are quality (non-functional) requirements? Select all that apply.',
    options: [
      'The service must answer p95 requests within 200 ms at 1,000 requests per second.',
      'The system must let a user reset a password by email.',
      'The service must be available 99.9% of the time.',
      'The interface must look modern.'
    ],
    answers: [0, 2],
    explain: 'A and C describe how well the system behaves, with measurable thresholds. B is functional; D is a quality aspiration but not verifiable as written.'
  },
  {
    id: 'sl-03', topic: 'process',
    prompt: 'Which properties belong to the INVEST guidelines for good user stories? Select all that apply.',
    options: [
      'Independent — stories can be scheduled in any order.',
      'Negotiable — details are discussed rather than frozen.',
      'Estimable — the team can size the story.',
      'Detailed — every UI element is specified up front.',
      'Testable — there is a way to decide whether it is done.'
    ],
    answers: [0, 1, 2, 4],
    explain: 'INVEST stands for Independent, Negotiable, Valuable, Estimable, Small and Testable. Over-specifying detail contradicts "negotiable" and "small".'
  },
  {
    id: 'sl-04', topic: 'inspection',
    prompt: 'Which statements about formal code inspections are correct? Select all that apply.',
    options: [
      'A group of developers meets and follows a defined process to examine code.',
      'Studies reported that inspections found 60–90% of bugs.',
      'Inspections are cheap and fast compared with modern code review.',
      'Management should attend so that developer performance can be evaluated.',
      'The author decides whether to fix each problem that is raised.'
    ],
    answers: [0, 1, 4],
    explain: 'Inspections are expensive (about one developer-day per session) and should exclude management and HR use. The author retains the decision to fix.'
  },
  {
    id: 'sl-05', topic: 'devops',
    prompt: 'Which practices are part of continuous integration? Select all that apply.',
    options: [
      'Commit and check in code frequently.',
      'Ensure you know precisely where the build breaks.',
      'Run automated feedback and tests on commits.',
      'Build artefacts manually on a developer laptop before each release.',
      'Version code, infrastructure and documentation together.'
    ],
    answers: [0, 1, 2, 4],
    explain: 'CI is about frequent integration, precise failure localisation, automated testing, artefacts and versioning everything. Manual local builds contradict automation.'
  },
  {
    id: 'sl-06', topic: 'architecture',
    prompt: 'Which are genuine challenges of microservice architectures? Select all that apply.',
    options: [
      'Network latency, faults and data inconsistencies.',
      'More system states and more points of failure.',
      'Monitoring and testing become simpler because services are small.',
      'Operational complexity increases.',
      'Strong consistency across services comes for free.'
    ],
    answers: [0, 1, 3],
    explain: 'Distribution adds latency, partial failure and inconsistency; monitoring and testing get harder, not simpler, and strong consistency is expensive.'
  },
  {
    id: 'sl-07', topic: 'debugging',
    prompt: 'Which assumptions does delta debugging rely on? Select all that apply.',
    options: [
      'Monotonicity: if X is interesting, then X ∪ {c} is interesting.',
      'Unambiguity: if X and Y are interesting, then X ∩ Y is interesting.',
      'Consistency: for any X, Interesting(X) is Yes or No.',
      'The minimal interesting set always has size 1.',
      'The input set must be sorted.'
    ],
    answers: [0, 1, 2],
    explain: 'The three assumptions are monotonicity, unambiguity and consistency. The minimal set may have size > 1 (as in {3, 6}), and no ordering is required.'
  },
  {
    id: 'sl-08', topic: 'defects',
    prompt: 'Which of the following are valid Bugzilla-style resolutions? Select all that apply.',
    options: ['FIXED', 'WONTFIX', 'WORKSFORME', 'PENDINGREVIEW', 'DUPLICATE'],
    answers: [0, 1, 2, 4],
    explain: 'FIXED, WONTFIX, WORKSFORME and DUPLICATE are resolutions (alongside INVALID, MOVED, NOTABUG, NOTOURBUG, INSUFFICIENTDATA). PENDINGREVIEW is not one.'
  },
  {
    id: 'sl-09', topic: 'oss',
    prompt: 'Which statements about permissive open-source licences are correct? Select all that apply.',
    options: [
      'MIT allows a derivative work to be released as closed source.',
      'Apache 2.0 requires you to distribute your source code.',
      'BSD requires the copyright statement in both source and binary distributions.',
      'Apache 2.0 grants permission to use the project’s trademark.',
      'MIT provides the software “as is”, without warranty.'
    ],
    answers: [0, 2, 4],
    explain: 'Permissive licences allow closed derivatives; Apache does not require source distribution and explicitly does not grant trademark rights.'
  },
  {
    id: 'sl-10', topic: 'measurement',
    prompt: 'Which statements about software metrics are correct? Select all that apply.',
    options: [
      'Many metrics rest on plausibility arguments rather than rigorous validation.',
      'Cyclomatic complexity is a well-validated predictor of defects.',
      'Metrics can be gamed, so you get what you measure.',
      'Metrics should be calibrated using project history.',
      'Collecting more metrics always leads to better decisions.'
    ],
    answers: [0, 2, 3],
    explain: 'Most metrics are controversial and cyclomatic complexity has been repeatedly refuted. Metrics must be calibrated, and more data is not automatically better.'
  },
  {
    id: 'sl-11', topic: 'defects',
    prompt: 'Which statements about severity and priority are correct? Select all that apply.',
    options: [
      'Severity measures the degree of impact of a defect.',
      'Priority indicates the importance or urgency of fixing a defect.',
      'A high-severity defect always has high priority.',
      'A visible typo on a flagship product’s homepage can be low severity but high priority.',
      '“Blocker” is a Bugzilla severity label.'
    ],
    answers: [0, 1, 3, 4],
    explain: 'Severity and priority are independent: a severe crash in an unused component can wait, and a cosmetic issue on a front page may not.'
  },
  {
    id: 'sl-12', topic: 'devops',
    prompt: 'Which statements about deployment strategies are correct? Select all that apply.',
    options: [
      'A canary release limits the blast radius by exposing only a small share of traffic.',
      'Blue/green deployment allows an almost instant rollback by switching traffic back.',
      'A big-bang deployment is the safest option because all users get the same version.',
      'A rolling deployment replaces instances in batches.',
      'Canary deployment requires two complete production environments.'
    ],
    answers: [0, 1, 3],
    explain: 'Big bang has the largest blast radius; two full environments is blue/green, not canary. Canary and rolling both limit exposure progressively.'
  },
  {
    id: 'sl-13', topic: 'testing',
    prompt: 'Which of these are code coverage criteria? Select all that apply.',
    options: ['Statement coverage', 'Branch coverage', 'Path coverage', 'Employee coverage', 'Instruction coverage'],
    answers: [0, 1, 2, 4],
    explain: 'Statement, branch, path and instruction coverage all measure executed program structure. “Employee coverage” is not a code coverage criterion.'
  },
  {
    id: 'sl-14', topic: 'requirements',
    prompt: 'Which are among the four “denials” that hide requirements problems? Select all that apply.',
    options: [
      'Denial by prior knowledge (“we have done this before”).',
      'Denial by hacking (fascination with the machine).',
      'Denial by abstraction (elegant models that obscure the world).',
      'Denial by vagueness (implying machine descriptions describe the world).',
      'Denial by testing (the tests pass, so the requirements are right).'
    ],
    answers: [0, 1, 2, 3],
    explain: 'The four denials are prior knowledge, hacking, abstraction and vagueness. “Denial by testing” is not part of the framework.'
  },
  {
    id: 'sl-15', topic: 'oss',
    prompt: 'Which statements about copyright and open source are correct? Select all that apply.',
    options: [
      'Open-source software is generally still protected by copyright.',
      'Public domain means nobody may claim exclusive property rights.',
      'Copyleft requires linked code to remain under the same licence.',
      'MIT is a copyleft licence.',
      'Apache 2.0 includes an explicit patent grant.'
    ],
    answers: [0, 1, 2, 4],
    explain: 'Open source relies on copyright licences; MIT is permissive, not copyleft. Apache 2.0 adds a patent grant.'
  },

  {
    id: 'sl-16', topic: 'debugging',
    prompt: 'Delta debugging can be applied to which of the following tasks? Select all that apply.',
    options: [
      'Finding a minimal set of code changes that causes a failure.',
      'Minimising a failure-inducing input while preserving the failure.',
      'Finding a harmful thread schedule that triggers a concurrency bug.',
      'Proving that a program contains no defects.',
      'Determining whether a test oracle is correct.'
    ],
    answers: [0, 1, 2],
    explain: 'Delta debugging minimises an “interesting” set: commits, input bytes or thread schedules. It cannot prove absence of defects, and it takes the oracle as given rather than validating it.'
  }
];

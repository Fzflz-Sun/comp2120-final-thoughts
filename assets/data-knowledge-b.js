/* COMP2120/6120 Final Thoughts — knowledge base, part B (modules 07–11) */
window.KNOWLEDGE_B = [
  {
    id: 'testing',
    num: '07',
    zh: '测试',
    en: 'Testing',
    lead: 'Testing is the dominant dynamic technique for quality assurance — and the hardest part is usually knowing what the right answer is.',
    slides: 'Slides 51–66',
    cards: [
      {
        t: 'Quality Assurance',
        en: 'Quality assurance maintains desired product properties through process choices — the way work is organised, reviewed and tested — rather than by inspecting the product only at the end. Testing is one activity inside QA, not a synonym for it.',
        zh: '质量保证（QA）通过“过程选择”来维持产品应有的属性——包括工作如何组织、如何评审、如何测试——而不是只在最后检验产品。测试只是 QA 中的一项活动，二者不能划等号。',
        list: [
          'Static techniques: reviews, inspections, static analysis.',
          'Dynamic techniques: testing (running the program and observing behaviour).'
        ]
      },
      {
        t: 'Testing',
        en: 'Testing involves running the program and inspecting its results or behaviour. It is the dominant approach to software quality assurance and the most common dynamic technique. There are many methods: unit testing, mutation testing, fuzzing, performance testing and A/B testing, among others.',
        zh: '测试是运行程序并检查其结果或行为。它是软件质量保证的主流方法，也是最常见的动态技术。测试方法很多：单元测试、变异测试、模糊测试、性能测试、A/B 测试等。',
        list: [
          'A test consists of input, execution and an oracle that decides pass or fail.',
          'Testing can show the presence of defects, never their absence.'
        ]
      },
      {
        t: 'Unit Testing',
        en: 'Unit tests exercise small sections of a system, such as a single class, with emphasis on the accuracy of the actual code against its specification. Test data is usually chosen by the developers based on their understanding of the specification and knowledge of the unit; it can be at various levels of granularity and can be open-box or closed-box. If unit testing is not thorough, system testing becomes almost impossible — so do not rush unit testing on a late project.',
        zh: '单元测试针对系统中的小片段（如单个类），重点验证实际代码是否符合规格。测试数据通常由开发者根据对规格的理解和对该单元的熟悉程度来选取；粒度可大可小，可以是白盒也可以是黑盒。单元测试不充分，系统测试几乎无法进行——所以项目再赶，也不要压缩单元测试。',
        list: [
          'Scope: a class or small unit; fast and cheap to run.',
          'Open box (developer knows internals) or closed box (tester does not).'
        ]
      },
      {
        t: 'Test Oracle',
        en: 'An oracle is the mechanism that decides whether an execution passed or failed. Oracles are obvious for some programs (a sort function) but hard for others (encryption, UI behaviour). A lack of good oracles limits the scalability of testing: it is easy to generate lots of input data, but not easy to validate that the output is correct.',
        zh: '测试预言（oracle）是判定一次执行“通过还是失败”的机制。有些程序很容易判断（排序），有些则很难（加密、界面行为）。缺乏好的 oracle 会限制测试的可扩展性：生成大量输入很容易，但验证输出是否正确很难。',
        list: [
          'Oracle examples: expected output, invariants, differential testing, metamorphic relations.',
          '“No oracle” is a design problem, not a testing-tool problem.'
        ]
      },
      {
        t: 'Mutation Testing',
        en: 'Mutation testing injects bugs by mutating the source code. Ideally at least one test fails on the mutated program, meaning the mutant is “killed”; if all tests still pass, the mutant “survives”. Mutation score = mutants killed / total mutants, and it is a better predictor of bug-finding capability than coverage. It rests on the competent programmer assumption: programs are mostly correct except for very small errors.',
        zh: '变异测试通过修改源代码来“注入缺陷”。理想情况下至少有一个测试在变异程序上失败，称该变异体被“杀死”；若所有测试仍然通过，则变异体“存活”。变异得分 = 被杀死的变异体数 / 变异体总数，它比覆盖率更能预测测试发现缺陷的能力。其理论基础是“胜任程序员假设”：程序大体正确，只存在很小的错误。',
        list: [
          'Mutants killed / total mutants = mutation score.',
          'Tests are falsifiable at the boundary of the implementation, not just the specification.',
          'Popular Java tool: Pitest.'
        ]
      },
      {
        t: 'Mutation Operators',
        en: 'Typical mutations: change a + b to a − b; change if (a > b) to if (a >= b) or if (b > a); change i++ to i−−; replace an integer variable with 0; change return x to return true or another constant; delete lines containing void method calls such as x.setFoo(1). Over time researchers have curated standard lists of mutators.',
        zh: '典型变异操作：把 a + b 改成 a − b；把 if (a > b) 改成 if (a >= b) 或 if (b > a)；把 i++ 改成 i−−；把整型变量替换为 0；把 return x 改成 return true 或其它常量；删除仅含 void 方法调用的语句（如 x.setFoo(1)）。研究者已逐步整理出标准的变异算子列表。',
        list: [
          'Arithmetic operator replacement · relational operator replacement · constant replacement · statement deletion',
          'A mutant is only useful if it is not equivalent to the original program.'
        ]
      },
      {
        t: 'Fuzz Testing',
        en: 'Fuzz testing feeds programs unexpected or malformed inputs — often random data — and watches for crashes, hangs or other violations. It is cheap to run at scale and good at finding robustness bugs in parsers and system utilities: a 1990 study found crashes in adb, as, bc, col, emacs, ftp, indent, lex, make, nroff, prolog, spell, vi and many more.',
        zh: '模糊测试向程序输入意外或畸形的数据（常为随机数据），观察是否崩溃、挂起或出现其它违规行为。它成本低、易规模化，特别擅长发现解析器和系统工具中的健壮性缺陷：1990 年的一项研究在 adb、as、bc、col、emacs、ftp、indent、lex、make、nroff、prolog、spell、vi 等大量程序中发现了崩溃。',
        list: [
          'Strengths: no oracle needed for crashes; enormous input volume.',
          'Weaknesses: shallow coverage without guidance; may miss semantic bugs.'
        ]
      },
      {
        t: 'Performance Testing',
        en: 'The goal is to identify performance bugs: unexpected bad performance on some subset of inputs, performance degradation over time, and performance differences across versions or platforms. It is harder than functional testing because the oracle is unclear (fast = good, slow = bad — but what is the threshold?), measurements are noisy, and debugging where the issue lies is difficult.',
        zh: '性能测试的目标是发现性能缺陷：某些输入下异常糟糕的性能、随时间推移的性能退化、以及跨版本或跨平台的性能差异。它比功能测试更难：oracle 不清晰（快=好、慢=坏，但阈值是多少？）、测量噪声大、定位问题困难。',
        list: [
          'Define a threshold and a workload before measuring.',
          'Control the environment: same hardware, same data, repeated runs.'
        ]
      },
      {
        t: 'Profiling',
        en: 'Profiling finds bottlenecks in execution time and memory. Flame graphs are a popular visualisation of resource consumption by call stack: the width of a frame shows how much time (or memory) that call path consumed, so the widest stacks are the first place to look.',
        zh: '性能剖析（profiling）用于定位执行时间与内存的瓶颈。火焰图（flame graph）是常用的可视化方式，按调用栈展示资源消耗：某一帧的宽度表示该调用路径消耗的时间（或内存）比例，因此最宽的栈就是最该先看的地方。',
        list: [
          'Profile before optimising — intuition about hot spots is usually wrong.',
          'Flame graph: x-axis is the call stack, width is cost, height is depth.'
        ]
      },
      {
        t: 'Usability: A/B Testing',
        en: 'A/B testing is a controlled randomised experiment with two variants, A and B, which are the control and the treatment. One group of users is given A (the current system) and another random group is given B; outcomes are compared. It is often used in web or GUI applications, especially for advertising, GUI element placement and design decisions.',
        zh: 'A/B 测试是一种受控随机实验，有两个变体 A 和 B，分别作为对照组与实验组。一组用户使用 A（当前系统），另一组随机用户使用 B，然后比较结果。它常用于 Web 或 GUI 应用，尤其是广告、界面元素位置与设计决策。',
        list: [
          'Random assignment is what makes the comparison causal.',
          'Needs enough sample size and a pre-declared success metric; otherwise the result is noise.'
        ]
      },
      {
        t: 'Code Coverage',
        en: 'Coverage measures how much of the program a test suite exercises: line coverage, statement coverage, branch coverage, instruction coverage, basic-block coverage, edge coverage, path coverage and more. Coverage tells you what was executed, not whether the results were checked — 100% coverage is compatible with a defect-free-looking but useless test suite.',
        zh: '覆盖率衡量测试套件执行了程序的多少部分：行覆盖、语句覆盖、分支覆盖、指令覆盖、基本块覆盖、边覆盖、路径覆盖等。覆盖率只说明“哪些代码被执行过”，不说明“结果是否被检验”——100% 覆盖率完全可以与一套毫无断言、毫无用处的测试共存。',
        list: [
          'Coverage = execution, not verification.',
          'Branch coverage is stronger than line coverage; path coverage is usually infeasible.'
        ]
      }
    ],
    callout: {
      zh: '本章高频考点：变异得分 vs 覆盖率、oracle 问题、模糊测试的优缺点、内部质量 vs 外部质量。',
      en: 'Frequent exam targets: mutation score vs coverage, the oracle problem, fuzzing trade-offs, internal vs external quality.'
    }
  },

  {
    id: 'architecture',
    num: '08',
    zh: '架构：微服务',
    en: 'Architecture: Microservices',
    lead: 'Modularity is a spectrum — from one runtime with plug-ins, to independent services talking over the network.',
    slides: 'Slides 67–73',
    cards: [
      {
        t: 'Monolithic Architecture',
        en: 'A monolithic architecture bundles all functionality together into a single deployable unit. It is simple to develop, test and deploy at small scale, but as the system grows, the codebase becomes hard to change, a small change requires redeploying everything, and teams cannot scale independently.',
        zh: '单体架构把所有功能打包成一个可部署单元。在小规模时开发、测试、部署都简单；但随着系统增长，代码库变得难以修改，一个小改动就要重新部署整个系统，团队之间也无法独立扩展。',
        list: [
          'One build, one deployable, one database is the typical shape.',
          'Strength: simplicity and low operational overhead. Weakness: coupling at scale.'
        ]
      },
      {
        t: 'A Spectrum of Modularity',
        en: 'Modular architectures divide systems into independent parts, in several forms. Plug-in architectures keep distinct code repositories linked into a monolithic runtime (Linux kernel modules, WordPress themes, IDE language packs), separating development but running as one. Service-oriented architectures use distinct processes communicating via messages (e.g. web browsers), separating runtime resource management, failure and security. Distributed microservices are independent, autonomous services communicating via web APIs, separating almost all concerns.',
        zh: '模块化架构把系统划分为相互独立的部分，有多种形式。插件架构：代码仓库彼此独立，但链接进同一个单体运行时（Linux 内核模块、WordPress 主题、IDE 语言包），只分离开发，运行上仍是“一个”。面向服务的架构（SOA）：不同进程通过消息通信（如浏览器），分离了运行时资源管理、故障与安全问题。分布式微服务：独立自治的服务通过 Web API 通信，几乎分离了所有关注点。',
        table: {
          head: ['Form', 'Boundary', 'Separates'],
          rows: [
            ['Plug-in', 'Linked into one runtime', 'Development'],
            ['Service-oriented', 'Separate processes, messages', 'Runtime resources, failure, security'],
            ['Microservices', 'Independent services, web APIs', 'Almost all concerns, including deployment']
          ]
        }
      },
      {
        t: 'Microservices',
        en: 'Microservices are independent, autonomous services communicating via web APIs. They bring benefits such as scalability and flexibility — each service can be deployed, scaled and replaced on its own — but also introduce trade-offs such as complexity and operational overhead.',
        zh: '微服务是独立自治、通过 Web API 通信的服务。它带来可扩展性与灵活性等收益：每个服务可以独立部署、独立扩容、独立替换；但也引入复杂性与运维开销等代价。微服务不是“更先进的单体”，而是一种不同的权衡。',
        list: [
          'Benefit: independent deploy and scale; technology heterogeneity; failure isolation (if designed).',
          'Cost: network calls, distributed data, more moving parts, harder debugging.'
        ]
      },
      {
        t: 'Vertical vs. Horizontal Scaling',
        en: 'Vertical scaling increases or decreases the capacity of existing services or instances — a bigger machine. Horizontal scaling adds more resources, such as virtual machines, and spreads the workload across them. Vertical scaling is simple but has a ceiling and a single point of failure; horizontal scaling is elastic but requires the system to be designed for distribution.',
        zh: '垂直扩展（scale up）增减现有服务或实例的容量——换一台更强的机器。水平扩展（scale out）增加更多资源（如虚拟机），把负载分散到多台机器上。垂直扩展简单但有上限，且存在单点故障；水平扩展弹性更好，但要求系统在设计上支持分布式。',
        table: {
          head: ['', 'Vertical', 'Horizontal'],
          rows: [
            ['Action', 'Bigger machine', 'More machines'],
            ['Limit', 'Hardware ceiling', 'Coordination overhead'],
            ['Failure', 'Single point of failure', 'Redundancy possible']
          ]
        }
      },
      {
        t: 'Principles of Microservices (Sam Newman)',
        en: 'Sam Newman’s principles: model around the business domain (domain-driven modelling); build a culture of automation; hide implementation details; decentralise governance; deploy independently; put the consumer first; and isolate failures.',
        zh: 'Sam Newman 的微服务原则：围绕业务领域建模（领域驱动设计）；建立自动化文化；隐藏实现细节；去中心化治理；独立部署；以消费者为先；隔离故障。',
        list: [
          'Domain-driven modelling · Culture of automation · Hide implementation details',
          'Decentralised governance · Deploy independently · Consumer first · Isolate failures'
        ]
      },
      {
        t: 'Microservice Challenges',
        en: 'Microservices bring too many choices, a delay between investment and payback, the complexities of distributed systems (network latency, faults, inconsistencies), testing challenges, more complex monitoring, more system states, more points of failure and operational complexity. They are frequently adopted by breaking down a monolithic application — which is itself a difficult migration.',
        zh: '微服务带来诸多挑战：选择太多、投入与回报之间存在延迟、分布式系统的复杂性（网络延迟、故障、不一致）、测试困难、监控更复杂、系统状态更多、故障点更多、运维复杂度更高。实践中常通过拆分单体应用来采用微服务，而这本身就是一个困难的迁移过程。',
        list: [
          'Distributed systems fail partially: timeouts, retries, duplicate messages, stale data.',
          'Observability (logs, metrics, traces) becomes mandatory rather than optional.'
        ]
      }
    ],
    callout: {
      zh: '考试常用问法：给出一个场景，判断该用单体还是微服务，并用“独立部署 / 故障隔离 / 运维复杂度 / 数据一致性”来论证。',
      en: 'Typical question: choose monolith or microservices for a scenario, and justify with independent deployment, failure isolation, operational cost and data consistency.'
    }
  },

  {
    id: 'defects',
    num: '09',
    zh: '缺陷报告与分诊',
    en: 'Defect Reporting and Triage',
    lead: 'A defect report is a communication artefact with a lifecycle; triage decides which few of the many reports get fixed first.',
    slides: 'Slides 74–81',
    cards: [
      {
        t: 'Defect Report',
        en: 'A software defect report includes information and communications related to addressing a software issue. It has many components — a summary, reproduction steps, expected vs actual behaviour, environment, evidence, and discussion — and is subject to triage based on severity and priority.',
        zh: '软件缺陷报告包含与处理某个软件问题相关的信息和沟通内容。它由多个部分组成：摘要、复现步骤、期望行为与实际行为、环境、证据以及讨论记录；并会依据严重程度与优先级进行分诊。',
        list: [
          'A good report is reproducible: someone else can trigger the same failure.',
          'Expected vs actual behaviour is the core of the report; without it, triage is guesswork.'
        ]
      },
      {
        t: 'Defect Report Lifecycle',
        en: 'The lifecycle has stages and actions including reporting, confirmation, triage, assignment, resolution and verification. Not every report follows the same path: the process is not linear, with multiple entry points, some cycles and multiple exit points — and some reports never leave. The status (“new”, “resolved”, …) tracks the report’s position in this lifecycle.',
        zh: '缺陷报告生命周期包括报告、确认、分诊、指派、解决与验证等阶段和动作。并非每份报告都走同一条路径：过程不是线性的，有多个入口、若干循环和多个出口——有些报告永远停留在系统中。状态字段（“new”、“resolved” 等）标记报告在生命周期中的位置。',
        flow: ['Report', 'Confirm', 'Triage', 'Assign', 'Resolve', 'Verify'],
        list: [
          'Multiple entry points: a user report, a failing test, a crash dump.',
          'Cycles: a fix fails verification and the report is reopened.',
          'States: UNCONFIRMED → NEW → ASSIGNED → RESOLVED → VERIFIED → CLOSED, with REOPEN and re-assignment loops.'
        ]
      },
      {
        t: 'Triage',
        en: 'Triage is the assignment of degrees of urgency to wounds or illnesses to decide the order of treatment of a large number of patients. In software there are always more defect reports than resources to address them, so triage is a cost-benefit analysis: how expensive is it to fix this bug, and how expensive is it to not fix it?',
        zh: '分诊（triage）原指按紧急程度对伤病员排序，以决定大量伤员的治疗顺序。在软件中，缺陷报告总是多于可用的处理资源，因此分诊本质上是成本收益分析：修这个缺陷要多大代价？不修它又要多大代价？',
        list: [
          'Cost to fix vs cost of not fixing — both sides matter.',
          'Triage decides order, not blame; it is repeated as new information arrives.'
        ]
      },
      {
        t: 'Severity',
        en: 'Severity is the degree of impact that a defect has on the development or operation of a component or system — “the cost of not fixing it”. Bugzilla’s severity labels are Blocker (blocks further development or testing), Critical (crashes or data loss in a widely used, important component), Major (major loss of function in an important area), Normal (default), Minor, Trivial (cosmetic) and Enhancement (a request for new functionality).',
        zh: '严重程度（severity）是缺陷对组件或系统的开发与运行造成影响的程度——即“不修它的代价”。Bugzilla 的等级为：Blocker（阻塞后续开发或测试）、Critical（广泛使用的重要组件崩溃或数据丢失）、Major（重要区域功能严重受损）、Normal（默认）、Minor（轻微）、Trivial（装饰性问题）与 Enhancement（新功能请求）。',
        table: {
          head: ['Severity', 'Meaning'],
          rows: [
            ['Blocker', 'Blocks further development and/or testing work.'],
            ['Critical', 'Crashes or data loss in a widely used, important component.'],
            ['Major', 'Major loss of function in an important area.'],
            ['Normal', 'Default / average.'],
            ['Minor', 'Minor loss of function, or an easy workaround exists.'],
            ['Trivial', 'Cosmetic problem, e.g. a typo or misaligned text.'],
            ['Enhancement', 'Request for a new feature or change in functionality.']
          ]
        }
      },
      {
        t: 'Priority',
        en: 'Defect priority indicates the importance or urgency of fixing a defect — when it should be fixed, independent of how bad it is. Phabricator’s levels: Needs Triage (default, undetermined), Unbreak Now! (something is broken and must be fixed immediately), High (someone is working on it soon), Normal, Low, and Lowest (nobody plans to work on it).',
        zh: '缺陷优先级（priority）表示修复该缺陷的重要程度或紧迫程度——即“什么时候修”，它与缺陷有多严重是两回事。Phabricator 的等级为：Needs Triage（默认，未定）、Unbreak Now!（必须立刻修）、High（很快会有人处理）、Normal、Low、Lowest（没人打算处理）。',
        list: [
          'Severity = impact; priority = scheduling. A crash in an unused feature can be high severity, low priority.',
          'A typo on the homepage of a flagship product can be low severity, high priority.'
        ]
      },
      {
        t: 'Bug Assignment',
        en: 'Bug assignment answers “who should fix this bug?”. Assignment may be automatic (component owners, round-robin, load balancing) or manual (a triager or developer takes possession). It interacts with the lifecycle: a developer takes possession and the report moves from NEW to ASSIGNED; if ownership changes, it returns to the pool.',
        zh: '缺陷指派回答“谁应该修这个缺陷？”。指派可以是自动的（组件负责人、轮询、负载均衡），也可以是手动的（分诊者或开发者“认领”）。它与生命周期相互作用：开发者认领后状态从 NEW 变为 ASSIGNED；若负责人变更，则回到待认领池。',
        list: [
          'Right person = knows the component, has context, and has capacity.',
          'Wrong assignment is a common cause of stalled reports.'
        ]
      },
      {
        t: 'Possible Resolutions',
        en: 'Bugzilla resolutions: FIXED (with a commit number), INVALID (the report is invalid), WONTFIX (never planned to fix), DUPLICATE (link to the other report), WORKSFORME (cannot reproduce, “WFM”), MOVED (filed against the wrong project), NOTABUG (the report describes expected behaviour), NOTOURBUG (a real bug, but not in our software) and INSUFFICIENTDATA (cannot triage or fix without more information).',
        zh: 'Bugzilla 的解决结果：FIXED（附提交号）、INVALID（报告本身无效）、WONTFIX（永不打算修）、DUPLICATE（与另一报告重复）、WORKSFORME（无法复现，简称 WFM）、MOVED（提交到了错误的项目）、NOTABUG（描述的是预期行为）、NOTOURBUG（确实是缺陷，但不在我们的软件中）、INSUFFICIENTDATA（信息不足，无法分诊或修复）。',
        list: [
          'A resolution is a claim about the report, not necessarily a code change.',
          '“Won’t fix” and “not a bug” are legitimate outcomes — but they need a reason.'
        ]
      }
    ],
    callout: {
      zh: '高频区分：severity（多严重 / 不修的代价）vs priority（多紧急 / 何时修）；以及 9 种 resolution 的适用场景。',
      en: 'High-frequency distinction: severity (impact) vs priority (scheduling); plus when each of the nine resolutions applies.'
    }
  },

  {
    id: 'debugging',
    num: '10',
    zh: '调试即假设检验',
    en: 'Debugging as Hypothesis Testing',
    lead: 'Delta debugging automates the search for a minimal cause — a minimal set of changes, a minimal input, or a minimal thread schedule.',
    slides: 'Slides 82–90',
    cards: [
      {
        t: 'Delta Debugging',
        en: 'Delta debugging is an automated debugging approach that finds a minimal interesting subset of a given set. It is very efficient because it is based on divide-and-conquer, and it relies heavily on critical assumptions: monotonicity, unambiguity and consistency. It can find which code changes cause a bug, minimise failure-inducing inputs, and even find harmful thread schedules.',
        zh: '增量调试（delta debugging）是一种自动化调试方法，用于在给定集合中找出“最小的有趣子集”。它基于分治，效率很高，但严重依赖三个关键假设：单调性、无歧义性和一致性。它可以定位哪些代码变更导致缺陷、最小化触发失败的输入，甚至找出有害的线程调度。',
        list: [
          'Input: a set of changes, plus a test that says “interesting” or “not interesting”.',
          'Output: a 1-minimal subset that still reproduces the interesting behaviour.'
        ]
      },
      {
        t: 'The Delta Debugging Interface',
        en: 'Given a set C = {c₁, …, cₙ} of changes and a function Interesting : subset → Yes/No, where Interesting(C) = Yes and Interesting({}) = No, delta debugging returns a minimal “interesting” subset M of C: Interesting(M) = Yes, and for all m in M, Interesting(M \\ {m}) = No.',
        zh: '给定变更集合 C = {c₁, …, cₙ} 和一个函数 Interesting：子集 → Yes/No，且已知 Interesting(C) = Yes、Interesting({}) = No，增量调试返回 C 的一个最小“有趣”子集 M：Interesting(M) = Yes，并且对 M 中任意 m，都有 Interesting(M \\ {m}) = No。',
        code: [
          'Given: Interesting(C) = Yes,  Interesting({}) = No',
          'Find:  M ⊆ C  such that',
          '         Interesting(M) = Yes',
          '         ∀ m ∈ M : Interesting(M \\ {m}) = No'
        ]
      },
      {
        t: 'Three Critical Assumptions',
        en: 'Delta debugging assumes that any subset of changes may be interesting (not just singletons, as in binary search); that Interesting is monotonic (if X is interesting, then X ∪ {c} is interesting); that it is unambiguous (if X and Y are both interesting, then X ∩ Y is interesting); and that it is consistent (for any X, Interesting(X) is either Yes or No).',
        zh: '增量调试假设：任意子集都可能是“有趣的”（不限于二分查找中的单元素）；Interesting 是单调的（若 X 有趣，则 X ∪ {c} 也有趣）；是无歧义的（若 X 与 Y 都有趣，则 X ∩ Y 也有趣）；是一致/确定的（对任意 X，结果只能是 Yes 或 No，某些形式化中允许 Unknown）。',
        list: [
          'Monotonic: Interesting(X) ⇒ Interesting(X ∪ {c})',
          'Unambiguous: Interesting(X) ∧ Interesting(Y) ⇒ Interesting(X ∩ Y)',
          'Consistent: Interesting(X) ∈ {Yes, No}'
        ]
      },
      {
        t: 'The Algorithm',
        en: 'DD(P, C) splits C into P1 and P2. If n = 1 it returns {c₁}. If P ∪ P1 is interesting it recurses on P1; otherwise if P ∪ P2 is interesting it recurses on P2. Otherwise neither half is interesting alone, and the algorithm recurses on the two “interference” combinations: DD(P ∪ P2, P1) and DD(P ∪ P1, P2). The first two cases are essentially binary search, and they work when the minimal interesting set has size 1.',
        zh: 'DD(P, C) 把 C 分成 P1 与 P2。若 n = 1 返回 {c₁}。若 P ∪ P1 有趣，则递归处理 P1；否则若 P ∪ P2 有趣，则递归处理 P2。若两半单独都无趣，说明存在“干扰”，算法分别递归 DD(P ∪ P2, P1) 与 DD(P ∪ P1, P2)。前两种情况本质上就是二分查找，只在最小有趣集大小为 1 时足够。',
        code: [
          'DD(P, {c₁, …, cₙ}) =',
          '  if n = 1 then return {c₁}',
          '  let P1 = {c₁, …, cₙ/₂}',
          '  let P2 = {cₙ/₂₊₁, …, cₙ}',
          '  if Interesting(P ∪ P1) = Yes then return DD(P, P1)',
          '  if Interesting(P ∪ P2) = Yes then return DD(P, P2)',
          '  else return DD(P ∪ P2, P1) ∪ DD(P ∪ P1, P2)'
        ]
      },
      {
        t: 'The Interference Insight',
        en: 'When neither half is interesting by itself, interestingness comes from a combination — interference. Find a minimal subset D2 of P2 such that P1 ∪ D2 is interesting, and a minimal subset D1 of P1 such that P2 ∪ D1 is interesting. Then by unambiguity, (P1 ∪ D2) ∩ (P2 ∪ D1) = D1 ∪ D2 is also interesting, and it is the minimal combination.',
        zh: '当两半单独都不有趣时，“有趣”来自组合——干扰（interference）。先找 P2 的最小子集 D2 使 P1 ∪ D2 有趣，再找 P1 的最小子集 D1 使 P2 ∪ D1 有趣。由无歧义性，(P1 ∪ D2) ∩ (P2 ∪ D1) = D1 ∪ D2 也有趣，且正是最小组合。',
        code: [
          'P1 ∪ D2  is interesting     (D2 ⊆ P2)',
          'P2 ∪ D1  is interesting     (D1 ⊆ P1)',
          '⇒ (P1 ∪ D2) ∩ (P2 ∪ D1) = D1 ∪ D2 is interesting'
        ]
      },
      {
        t: 'Worked Example: {3, 6}',
        en: 'For the set {1, …, 8} where a subset is interesting only if it contains both 3 and 6, the answer is {3, 6}. Splitting {1,2,3,4} and {5,6,7,8} yields two “No” answers, the interference case; the recursion narrows each side until only 3 and 6 remain. The result is not a single element — this is exactly why plain binary search is insufficient.',
        zh: '在集合 {1, …, 8} 中，若一个子集“有趣”当且仅当它同时包含 3 和 6，则答案是 {3, 6}。把集合分成 {1,2,3,4} 与 {5,6,7,8} 都会得到 No，从而进入干扰分支；递归不断缩小两侧，直到只剩 3 与 6。答案并不是单个元素——这正是普通二分查找不够用的原因。',
        list: [
          'Two independent causes can be “interesting” only together.',
          'The minimal set can have size > 1; the algorithm must handle combinations.'
        ]
      },
      {
        t: 'Delta Debugging Thread Schedules',
        en: 'Tools such as DejaVu (IBM) and CHESS (Microsoft) apply delta debugging to concurrency. The thread schedule becomes part of the input: we control when the scheduler preempts one thread, record the schedule that triggers the failure, and then delta-debug schedules to find a minimal harmful interleaving that replays deterministically.',
        zh: 'DejaVu（IBM）、CHESS（Microsoft）等工具把增量调试用于并发问题。线程调度成为输入的一部分：我们控制调度器何时抢占某个线程，记录触发失败的调度，再对调度进行增量调试，找到能确定性重放的最小有害交错。',
        list: [
          'A race condition is often triggered by a specific interleaving, not by a specific input.',
          'Replay makes a non-deterministic failure deterministic enough to debug.'
        ]
      }
    ],
    callout: {
      zh: '必须能背：单调性 / 无歧义性 / 一致性三个假设，以及 DD 的四个分支（P1、P2、干扰两种情况）。',
      en: 'Must know: the three assumptions (monotonic, unambiguous, consistent) and the four branches of DD (P1, P2, and the two interference recursions).'
    }
  },

  {
    id: 'oss',
    num: '11',
    zh: '开源与许可',
    en: 'Open Source and Licensing',
    lead: 'Copyright protects the expression, not the idea; a licence decides what others may do with that expression.',
    slides: 'Slides 91–99',
    cards: [
      {
        t: 'Copyright and Software',
        en: 'Copyright protects creative, intellectual and artistic works — including software. It arises automatically for new work unless a licence authorises alternative uses, with exceptions for trivial works and ideas. The copyright holder can grant a licence for use, placing restrictions on how the work may be used, perhaps for a fee.',
        zh: '版权保护创造性、智力性与艺术性作品——包括软件。新作品自动获得版权，除非许可证授权了其它使用方式；琐碎作品与思想不受保护。版权持有人可以授予使用许可，并对使用方式附加限制，也可以收费。',
        list: [
          'Protects the expression (source code), not the idea or algorithm.',
          'Automatic: no registration needed for the right to exist.',
          'A licence is permission granted by the rightsholder — the default is “all rights reserved”.'
        ]
      },
      {
        t: 'Public Domain and Trademark',
        en: 'An alternative to copyright is the public domain, where nobody may claim exclusive property rights. Trademark is a different right: it protects the name and logo of a product, so a project’s code may be open while its name and marks remain controlled.',
        zh: '版权的替代方案之一是公共领域（public domain）：没有人可以主张独占的财产权。商标是另一种权利：保护产品的名称与标识，因此一个项目的代码可以开源，但其名称与商标仍受控制。',
        list: [
          'Public domain: no exclusive rights at all.',
          'Trademark: protects identity (name, logo), not the code.'
        ]
      },
      {
        t: 'Open-Source Licensing',
        en: 'Open-source software is generally copyrighted, with copyright retained by contributors or assigned to the entity that maintains it. The licence grants permissions — to use, modify and redistribute — and may impose conditions. Open source is therefore a licensing strategy built on top of copyright, not an absence of copyright.',
        zh: '开源软件通常仍受版权保护：版权由贡献者保留，或转让给维护它的实体。许可证授予使用、修改与再分发的权限，也可能附加条件。因此开源是建立在版权之上的许可策略，而不是“没有版权”。',
        list: [
          'Retained by contributors OR assigned to a foundation/company.',
          'A licence is required precisely because copyright exists.',
          'Examples from the lecture — open source: Linux, Firefox, Java, Android, Telegram; proprietary: Instagram, Uber, Windows, TikTok, Netflix.'
        ]
      },
      {
        t: 'Copyleft vs. Permissive',
        en: 'A permissive licence allows you to combine open-source code with your product and release your product under a different licence, perhaps not even open source; this encourages adoption. A copyleft licence “protects the commons” by requiring all linked code to be under the same licence, transitively requiring more sharing. The underlying philosophy: do we force participation, or try to grow and incentivise it in other ways?',
        zh: '宽松许可（permissive）允许你把开源代码与自己的产品结合，并以不同许可证发布产品（甚至可以闭源），从而鼓励采用。著佐权（copyleft）通过要求所有链接代码使用同一许可证来“保护公地”，并传递性地要求更多共享。其背后的哲学是：我们应当强制参与，还是用其它方式培育与激励参与？',
        table: {
          head: ['', 'Permissive', 'Copyleft'],
          rows: [
            ['Examples', 'MIT, Apache-2.0, BSD', 'GPL, AGPL'],
            ['Derivative work', 'May be closed-source', 'Must remain under the same licence'],
            ['Goal', 'Maximum adoption', 'Protect the commons']
          ]
        }
      },
      {
        t: 'MIT License',
        en: 'The MIT licence is a simple, commercial-friendly licence: you must retain the copyright credit; the software is provided “as is”; the authors are not liable for the software; there are no other restrictions.',
        zh: 'MIT 许可证是简单、商业友好的许可：必须保留版权声明；软件按“原样”提供；作者不承担担保责任；除此之外没有其它限制。',
        list: [
          'Retain copyright notice · No warranty · No liability · No other restrictions'
        ]
      },
      {
        t: 'Apache License',
        en: 'The Apache licence is similar to MIT: it is not copyleft, you are not required to distribute source code, it does not grant permission to use the project’s trademark, and it does not require modifications to use the same licence. It adds an explicit patent grant and a notice of changes.',
        zh: 'Apache 许可证与 MIT 类似：不是著佐权，不要求分发源代码，不授予使用项目商标的权限，也不要求修改后的代码沿用同一许可证。它额外包含明确的专利授权，并要求声明修改。',
        list: [
          'Not copyleft · No source distribution requirement · No trademark grant',
          'Modifications may use another licence; includes a patent grant.'
        ]
      },
      {
        t: 'BSD License',
        en: 'The BSD licence provides no liability and is provided “as is”. The copyright statement must be included in source and binary, and the copyright holder does not endorse any extensions without explicit written consent.',
        zh: 'BSD 许可证不承担担保责任，软件按“原样”提供。版权声明必须包含在源代码与二进制分发中；未经明确书面同意，版权持有人不为任何扩展背书。',
        list: [
          'No liability · “As is” · Copyright notice in source and binary · No implied endorsement'
        ]
      },
      {
        t: 'Copyright vs. Intellectual Property',
        en: 'Intellectual property and patents cover an idea for solving a problem — machine designs, pharmaceutical processes, controversially some algorithms. They have expiry dates and can be licensed or sold. Copyright covers a particular expression of a work — books, music, art, source code — and is assigned automatically. The distinction matters: re-implementing an idea is not copyright infringement, but copying the expression is.',
        zh: '知识产权与专利覆盖“解决问题的方法/思想”——机器设计、制药工艺、以及有争议的算法；它们有有效期，可以许可、出售或转让。版权覆盖作品的具体表达——书籍、音乐、艺术、源代码——并自动产生。这个区分很关键：重新实现一个思想不侵犯版权，复制其表达则侵权。',
        list: [
          'Patent: idea, time-limited, transferable, expensive to obtain.',
          'Copyright: expression, automatic, long duration, free to obtain.'
        ]
      },
      {
        t: 'Risks of Not Open-Sourcing',
        en: 'Keeping a technology closed has strategic risks. The MapReduce paper described a technique that others re-implemented as Hadoop, building a large ecosystem around it. If your platform is closed, competitors can implement the idea, the community cannot extend your version, and you may lose the standard. The counter-argument is control, revenue and support — which is why licence choice is a business decision, not only a legal one.',
        zh: '把技术封闭起来存在战略风险。MapReduce 论文描述的技术被他人重新实现为 Hadoop，并围绕它建立了庞大生态。如果平台是封闭的，竞争者可以自己实现这个思想，社区无法扩展你的版本，你可能会失去“标准”的地位。反方的理由是控制权、收入与支持服务——所以许可证选择是商业决策，而不仅是法律决策。',
        list: [
          'Ideas leak; implementations can be rebuilt by others.',
          'Ecosystem effects favour the version others can adopt and extend.'
        ]
      }
    ],
    callout: {
      zh: '高频考点：permissive vs copyleft 的区别与后果；MIT / Apache / BSD 的细微差别；版权与专利保护对象的不同。',
      en: 'Frequent exam targets: permissive vs copyleft consequences; MIT/Apache/BSD differences; copyright protects expression while patents protect ideas.'
    }
  }
];

/* COMP2120/6120 Final Thoughts — knowledge base, part A (modules 01–06) */
window.KNOWLEDGE_A = [
  {
    id: 'foundations',
    num: '01',
    zh: '软件工程基础',
    en: 'Software Engineering Foundations',
    lead: 'Two definitions that frame the entire course: engineering as design under constraint, and software engineering as the disciplined production of reliable software at an economic cost.',
    slides: 'Slides 3–4',
    cards: [
      {
        t: 'Engineering as “Design Under Constraint”',
        en: 'Bill Wulf (NAE President, 2008) calls engineering “design under constraint”: we create what can be, but always within limits imposed by nature, cost, safety, reliability, environmental impact, manufacturability, maintainability and many other “ilities”. Engineering is therefore not free invention — every design decision trades one desirable property against another.',
        zh: '工程学的核心不是“发明”，而是“在约束下设计”。约束来自自然规律、成本、安全、可靠性、环境影响、可制造性、可维护性等一系列“-ility”属性。因此每一个设计决策本质上都是权衡：提升某一属性往往要以牺牲另一属性为代价。',
        list: [
          'Constraints are not obstacles to engineering — they are what makes it engineering.',
          'Many constraints are quality attributes (“ilities”), which is why requirements and measurement matter.'
        ]
      },
      {
        t: 'Software Engineering (Bauer, 1975)',
        en: '“[Software Engineering is] the establishment and use of sound engineering principles in order to obtain economically software that is reliable and works efficiently on real machines.” The definition contains three testable goals: economic viability, reliability, and efficiency on real hardware.',
        zh: 'Bauer 1975 年的经典定义：软件工程是“建立并运用健全的工程原则，以便经济地获得在真实机器上可靠且高效运行的软件”。这句话包含三个可检验的目标：经济性（成本可控）、可靠性（不出错）、高效性（在真实硬件上跑得动）。',
        list: [
          'Economically — software must be affordable to build and maintain.',
          'Reliable — it must do what it is supposed to do.',
          'Efficiently on real machines — performance is measured on real hardware, not in theory.'
        ]
      }
    ],
    callout: {
      zh: '本课程反复出现的三个问题：我们如何组织工作（process）、我们如何知道做得对不对（measurement、inspection、testing）、以及我们如何在约束中做取舍（requirements、architecture、licensing）。',
      en: 'Every later lecture is an instance of design under constraint: process choice, review intensity, test strategy, architecture and licence are all trade-offs.'
    }
  },

  {
    id: 'process',
    num: '02',
    zh: '过程、风险与排期',
    en: 'Process, Risk and Scheduling',
    lead: 'A process organises activity into phases; estimation turns history into a plan; risk is the uncertainty that the plan must absorb.',
    slides: 'Slides 5–12',
    cards: [
      {
        t: 'Software Development Process',
        en: 'A software development process organises activity into distinct phases (for example design, coding and testing). A process can increase efficiency and make work repeatable, but processes are often implemented poorly, and a bad process can be worse than no process at all.',
        zh: '软件开发过程把开发活动组织成若干明确的阶段（如设计、编码、测试）。好的过程能提高效率、让工作可重复；但过程常常被实施得很糟——形式化的流程、过多的文档与会议，反而会拖慢团队。',
        list: [
          'Typical activities: discuss what must be written → write code → test to find defects → debug to find causes → fix defects.',
          'A process is a coordination device: it tells people who does what, when, and what “done” means.'
        ]
      },
      {
        t: 'Waterfall Model',
        en: 'In the waterfall model the phases are carried out in order, each one completing before the next begins: system and software requirements (captured in a document), analysis (models, schema, business rules), design (software architecture), coding (development, proving and integration), testing (systematic discovery and debugging of defects) and operations (installation, migration, support and maintenance).',
        zh: '瀑布模型按顺序执行各阶段，前一阶段完成后才进入下一阶段：需求（形成文档）→ 分析（模型、模式、业务规则）→ 设计（软件架构）→ 编码（开发、验证、集成）→ 测试（系统性地发现并调试缺陷）→ 运维（安装、迁移、支持与维护）。它强调文档与阶段评审，适合需求稳定、变更成本高的项目。',
        list: [
          'Strength: clear milestones, heavy documentation, easy to audit and contract.',
          'Weakness: late feedback; a requirements change invalidates work already “completed”.'
        ]
      },
      {
        t: 'Agile Development',
        en: 'Agile development replaces one big sequential pass with short iterations that loop through plan, design, develop, test, deploy and review. Working software and customer feedback drive the next iteration, so requirements can change as understanding grows.',
        zh: '敏捷开发用短迭代取代一次性的大瀑布：计划 → 设计 → 开发 → 测试 → 部署 → 回顾，循环往复。可运行的软件与客户反馈决定下一步做什么，因此需求可以随着理解加深而调整。它适合需求不确定、需要快速交付价值的场景。',
        list: [
          'Iteration length is a design parameter: short enough to get feedback, long enough to finish something useful.',
          'Agile is not “no process”: it still needs planning, estimation, review and testing — just on a shorter cadence.'
        ],
        flow: ['Plan', 'Design', 'Develop', 'Test', 'Deploy', 'Review']
      },
      {
        t: 'Sprint (Iteration)',
        en: 'A sprint is a fixed, short time box (commonly two weeks) in which a team completes a small, valuable increment. Daily stand-ups synchronise the team, and a review or retrospective at the end turns what was learned into adjustments for the next sprint.',
        zh: '冲刺（Sprint）是一个固定长度的时间盒（常见为两周），团队在其中完成一个小而有价值的增量。每日站会用于同步进展，迭代末尾的评审与回顾把学到的东西转化为下一轮的调整。',
        list: [
          'Fixed time box: scope flexes, the date does not.',
          'Two-week sprints + daily meetings + feedback-driven requirements is the classic signature of Agile.'
        ]
      },
      {
        t: 'Kaizen: Continuous Improvement',
        en: 'Kaizen is a continuous-improvement cycle: get employees involved, gather a list of problems, encourage solutions and choose one idea, test the solution, regularly measure and analyse the results, adopt the solution if successful, then repeat on an ongoing basis.',
        zh: '改善（Kaizen）是持续改进循环：让员工参与 → 收集问题清单 → 鼓励提出方案并选出一个想法 → 测试方案 → 定期度量并分析结果 → 成功则采纳 → 持续重复。它强调自下而上的小步改进，而不是一次性的“大变革”。',
        list: [
          'Small, frequent improvements compound; each cycle produces evidence for the next.',
          'Requires measurement — otherwise “improvement” is only opinion.'
        ]
      },
      {
        t: 'User Story',
        en: 'A user story is a short, plain-language description of a feature told from the user’s perspective: “As a <role>, I want <goal>, so that <benefit>.” It is a placeholder for a conversation, not a complete specification.',
        zh: '用户故事是用用户视角写的一句话需求：“作为<角色>，我想要<目标>，以便<收益>”。它是“对话的占位符”，而不是完整规格——细节通过团队与客户之间的沟通补足。',
        list: [
          'Format: As a … I want … so that …',
          'Good stories are small enough to finish inside one sprint, and carry acceptance criteria.'
        ]
      },
      {
        t: 'INVEST Principles',
        en: 'Good user stories follow INVEST: Independent (can be scheduled in any order), Negotiable (details are discussed, not frozen), Valuable (delivers value to a user or customer), Estimable (the team can size it), Small (fits within a sprint) and Testable (you can tell whether it is done).',
        zh: '好的用户故事满足 INVEST：独立（可任意排序开发）、可协商（细节留待沟通，不写死）、有价值（对用户或客户有意义）、可估算（团队能给规模）、足够小（一个冲刺内可完成）、可测试（能判断是否完成）。',
        list: [
          'Independent · Negotiable · Valuable · Estimable · Small · Testable',
          '“Estimable” usually requires enough detail — but not so much that the story becomes a frozen spec.'
        ]
      },
      {
        t: 'Acceptance Criteria',
        en: 'Acceptance criteria are the conditions a story must satisfy to be accepted. They are part of the story, turn a vague wish into something testable, and are often written as concrete examples or Given/When/Then scenarios.',
        zh: '验收标准是故事被接受必须满足的条件。它是故事的一部分，把模糊的愿望变成可测试的判据，常用具体示例或 Given/When/Then 场景来描述。没有验收标准的故事无法判断“做完了没有”。',
        list: [
          'They define the boundary of the story and become the basis for acceptance tests.',
          'They should cover the happy path, edge cases and failure behaviour.'
        ]
      },
      {
        t: 'Effort Estimation',
        en: 'Effort estimation predicts how much work a task will take, using historical information such as models and past experience. It is complicated by uncertainty, which stems from risk; the estimate is therefore a range with assumptions, not a promise.',
        zh: '工作量估算使用历史信息（估算模型、过往经验）预测任务需要多少工作。它被不确定性所困扰，而不确定性来自风险；因此估算应当是一个带假设的区间，而不是一个承诺。',
        list: [
          'Inputs: historical data, models, expert judgement, analogy with past projects.',
          'Outputs: ranges and confidence, not single numbers.'
        ]
      },
      {
        t: 'Risk and Uncertainty',
        en: 'Risk is the possibility that something will happen and hurt the project. It can be managed: identify risks early, estimate their likelihood and impact, then minimise or mitigate them (prototype, spike, buffer, fallback plan). Uncertainty in estimates is largely a consequence of unmanaged risk.',
        zh: '风险是“可能发生并造成损害的事情”。风险可以被管理：尽早识别，评估可能性与影响，然后降低或缓解（做原型、技术验证、预留缓冲、准备备选方案）。估算中的不确定性，很大程度上是未被管理的风险的体现。',
        list: [
          'Identify → analyse → plan a response → monitor.',
          'Technical risk is often retired cheapest by building a small prototype early.'
        ]
      },
      {
        t: 'Project Plan and Progress',
        en: 'A project plan records milestones and deliverables together with estimates, risks and the process to be followed. Measuring real progress is difficult: activity is visible, but completed value is not, so teams routinely report “90% done” for a long time.',
        zh: '项目计划记录里程碑与交付物，并纳入估算、风险和所采用的过程。真正衡量进度很困难：活动是可见的，但“完成的价值”并不可见，所以团队常常长期停留在“完成了 90%”。',
        list: [
          'Milestone: a checkpoint in time. Deliverable: an artefact handed over.',
          'Progress is best measured by working, tested functionality — not by hours spent or documents produced.'
        ]
      }
    ],
    callout: {
      zh: '考试常见对比：瀑布（文档驱动、变更昂贵）vs 敏捷（迭代、反馈驱动）；以及“过程能提高效率，但实施不当会适得其反”。',
      en: 'Exam pattern: be able to argue for a process choice using the constraints of the project — regulation, team size, requirement stability, cost of change.'
    }
  },

  {
    id: 'measurement',
    num: '03',
    zh: '度量',
    en: 'Measurement',
    lead: 'Metrics support decisions, but most are validated by plausibility rather than evidence — and what you measure is what you get.',
    slides: 'Slides 13–18',
    cards: [
      {
        t: 'Software Metric',
        en: 'A software metric is a quantitative measure of some property of software, its development process or its use, used to support decision-making. Metrics are widely used in industry, but are often inadequately supported by evidence, and therefore lack validity.',
        zh: '软件度量是对软件、开发过程或使用方式的某种属性进行量化测量，用来支持决策。它在工业界被广泛使用，但很多度量缺乏充分的证据支撑，因而缺乏效度（validity）——测的东西未必是它声称在测的东西。',
        list: [
          'A metric needs a clear definition, a measurement procedure and evidence that it predicts what it claims.',
          'Examples: cyclomatic complexity, code coverage, defect density, lead time, deployment frequency.'
        ]
      },
      {
        t: 'The Streetlight Effect',
        en: 'The streetlight effect is an observational bias: people search for something only where it is easiest to look. In software, teams measure what the tools happen to produce (lines of code, commit counts) rather than what actually matters (delivered value, defect escape rate).',
        zh: '路灯效应是一种观察偏差：人们只在“最容易看见”的地方寻找答案，就像醉汉在路灯下找钥匙，因为那里有光。在软件中表现为：团队只度量工具恰好能产出的东西（代码行数、提交次数），而不是真正重要的东西（交付价值、缺陷逃逸率）。',
        list: [
          'The bias is in the choice of where to look, not in the arithmetic.',
          'Mitigation: start from the decision you need to make, then choose the measurement.'
        ]
      },
      {
        t: 'Metric Validity Warning',
        en: 'Most software metrics are controversial because they rest on plausibility arguments rather than rigorous validation. Cyclomatic complexity, for example, was repeatedly refuted as a predictor of defects or effort, yet it is still widely used. Measuring programmer quality by a metric has been compared to measuring intelligence by the weight or circumference of the brain.',
        zh: '大多数软件度量是有争议的，因为它们建立在“听起来合理”的论证上，而非严格验证。例如圈复杂度（cyclomatic complexity）作为缺陷或工作量的预测指标已被多次反驳，却仍被广泛使用。用某个度量衡量程序员水平，被比作“用大脑重量或头围衡量智力”。',
        list: [
          'Plausibility ≠ validity: a metric can look sensible and still not predict anything.',
          'A refuted metric can survive for decades through convention and tooling.'
        ]
      },
      {
        t: 'Metric Advice',
        en: 'Use metrics carefully: avoid claims about human factors (such as readability) and quality unless they have been validated; calibrate metrics against your own project history and the history of other projects; and remember that metrics can be gamed — you get what you measure.',
        zh: '使用度量的建议：除非经过验证，不要用度量去断言人的因素（如可读性）或质量；用本项目和其它项目的历史数据来校准度量；并牢记度量可以被“刷”——你度量什么，就会得到什么。',
        list: [
          'Calibrate locally: thresholds that work for one codebase may be meaningless for another.',
          'Prefer metrics that are hard to game and close to the outcome you care about.'
        ]
      },
      {
        t: 'Software Qualities',
        en: 'Quality attributes describe how well software delivers its functionality: installability, maintainability, functionality (e.g. data integrity), availability, ease of use, privacy, energy efficiency, scalability, security, extensibility, documentation, performance, consistency and portability.',
        zh: '质量属性描述软件“以何种方式”提供功能：可安装性、可维护性、功能性（如数据完整性）、可用性、易用性、隐私、能效、可扩展性、安全性、可扩展/可延伸性（extensibility）、文档、性能、一致性、可移植性。它们常常彼此冲突，需要权衡。',
        list: [
          'Installability · Maintainability · Functionality · Availability · Ease of use · Privacy · Energy efficiency',
          'Scalability · Security · Extensibility · Documentation · Performance · Consistency · Portability'
        ]
      },
      {
        t: 'Internal vs. External Quality',
        en: 'Internal quality is about the code itself: is it well structured, understandable and well documented? External quality is about behaviour as experienced by users: does the software crash, does it meet requirements, is the UI well designed? Internal quality is a leading indicator; external quality is what customers see.',
        zh: '内部质量关注代码本身：结构是否良好、是否易理解、文档是否充分。外部质量关注用户可感知的行为：会不会崩溃、是否满足需求、界面设计是否合理。内部质量是“先行指标”，外部质量是客户真正看到的结果。',
        list: [
          'Internal: structure, readability, documentation, testability.',
          'External: crashes, requirement satisfaction, usability, performance.'
        ]
      },
      {
        t: 'Perverse Incentives',
        en: 'Any metric used to reward or punish people will change behaviour, often in unintended ways. If bug counts are punished, developers stop reporting bugs; if lines of code are rewarded, code gets longer. This is why “you get what you measure” is a warning, not a slogan.',
        zh: '任何被用于奖励或惩罚的度量都会改变行为，而且往往朝意想不到的方向改变。按缺陷数惩罚，开发者就不报缺陷；按代码行数奖励，代码就会变长。这就是“你度量什么，就得到什么”是一句警告而不是口号的原因。',
        list: [
          'Goodhart-style effect: the measure becomes the target and stops being a good measure.',
          'Prefer metrics at team/system level, used for learning rather than individual evaluation.'
        ]
      }
    ],
    callout: {
      zh: '本章的核心不是记住某个公式，而是理解：度量服务于决策，必须有效、可校准、难以被滥用。',
      en: 'Key exam skill: criticise a proposed metric — what decision does it support, what is the evidence, and how could it be gamed?'
    }
  },

  {
    id: 'inspection',
    num: '04',
    zh: '代码审查与正式检查',
    en: 'Code Review and Inspection',
    lead: 'Static quality assurance: reviewing code instead of running it. Reviews are cheap and continuous; inspections are expensive and thorough; both find different things.',
    slides: 'Slides 19–29',
    cards: [
      {
        t: 'Code Review (Modern)',
        en: 'In a code review, another developer examines your proposed change together with your explanation, offers feedback, and decides whether to accept it. Modern code reviews have significant tool support (pull requests, inline comments, CI checks) and are typically asynchronous and distributed.',
        zh: '代码审查（现代代码评审）中，另一位开发者检查你提交的变更及说明，给出反馈，并决定是否接受。现代代码评审有强大的工具支持（Pull Request、行内评论、CI 检查），通常是异步、分布式的，不要求开会。',
        list: [
          'Reviews examine each change (the diff), not the whole program.',
          'Cheap enough to run on every change; good at catching local mistakes and spreading knowledge.'
        ]
      },
      {
        t: 'Formal Code Inspection',
        en: 'In a formal code inspection a group of developers meets to review code or other artefacts, following a defined process. Popularised by IBM in the 1970s and broadly adopted in the 1980s, it is viewed as the most effective approach to finding bugs — studies reported 60–90% of bugs found by inspection — but it is very expensive and labour-intensive.',
        zh: '正式代码检查由一组开发者开会，按既定流程审查代码或其它制品。它由 IBM 在 1970 年代推广，1980 年代被广泛采用，被视为发现缺陷最有效的方法（研究报告称 60%–90% 的缺陷由检查发现），但非常昂贵且耗费人力。',
        list: [
          'Whole-program scope, synchronous meeting, defined roles.',
          'Cost: roughly one developer-day per session.'
        ]
      },
      {
        t: 'Whole Program vs. Each Change',
        en: 'Inspection examines the whole program: expensive if the program changes, but good when a new concern arises that must be checked everywhere. Review examines each change: an inductive argument that if the existing version is good and this change is good, the next version is good — which fails if the definition of “good” changes.',
        zh: '检查针对整个程序：程序变更时代价高昂，但当出现需要全面排查的新关注点时非常合适。评审针对每一次变更：它是一个归纳论证——“若现有版本是好的，且这次变更是好的，则下一版本是好的”；一旦“好”的定义改变，这个归纳就失效。',
        list: [
          'Induction: V(0) good; V(n) good ⇒ V(n+1) good.',
          'The induction breaks when requirements, standards or the definition of “good” change.'
        ]
      },
      {
        t: 'Inspection Process and Roles',
        en: 'The process runs planning, overview, preparation, meeting, rework and follow-up. Roles: a moderator runs the process, the author wrote the artefact and decides whether to fix each issue, and inspectors (one scribe, one reader, one verifier) examine it. The author decides whether to fix the problem — reviewers advise, they do not command.',
        zh: '检查流程为：计划 → 概览 → 准备 → 会议 → 返工 → 跟踪。角色包括：主持人（moderator）掌控流程；作者（author）编写制品并决定是否修复每个问题；检查员（inspectors）负责审查，其中一人记录（scribe）、一人朗读（reader）、一人验证（verifier）。作者决定是否修复——审查者提建议，不下命令。',
        flow: ['Planning', 'Overview', 'Preparation', 'Meeting', 'Rework', 'Follow-up'],
        list: [
          'Moderator · Author · Inspectors (scribe, reader, verifier)',
          'Meeting is for finding problems; fixing happens in rework, not in the room.'
        ]
      },
      {
        t: 'Inspection Incentives',
        en: 'Meetings should not include management, and code reviews must not be used for HR evaluation. A policy such as “finding more than five bugs counts against the author” produces avoidance: fragmented submissions, defects not pointed out, pre-reviews before the official one. Quality remains the author’s responsibility, not the reviewer’s — otherwise authors think “why fix this, reviewers will find it”.',
        zh: '检查会议不应有管理层在场，代码评审绝不能用于人事考核。诸如“在检查中发现超过 5 个缺陷就算作者的问题”这样的政策会导致规避行为：拆分提交、故意不指出缺陷、在正式检查前先私下“预审”。质量责任应留在作者身上，而不是推给审查者，否则作者会想“我何必修，审查者会发现的”。',
        list: [
          'No management in the room; no HR use of review outcomes.',
          'Punishing authors for found defects destroys the incentive to submit honestly.'
        ]
      },
      {
        t: 'Comparing Review Types',
        en: 'Review types differ in which phases they include. A formal inspection has planning, preparation, a meeting, correction and verification. A walkthrough has all but verification. Pair programming has planning, no preparation, continuous “meeting”, correction and verification. Passaround (modern code review) has no planning, has preparation, rarely meets, corrects but does not verify. Ad hoc review is meeting plus correction only.',
        zh: '不同评审类型包含的阶段不同。正式检查：计划、准备、会议、修正、验证俱全。走查（walkthrough）：除验证外都有。结对编程：有计划、无准备、持续“会议”、有修正与验证。传递式评审（现代代码评审）：无计划、有准备、很少开会、有修正但无验证。临时评审（ad hoc）：只有会议与修正。',
        table: {
          head: ['Review type', 'Planning', 'Preparation', 'Meeting', 'Correction', 'Verification'],
          rows: [
            ['Formal inspection', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
            ['Walkthrough', 'Yes', 'Yes', 'Yes', 'Yes', 'No'],
            ['Pair programming', 'Yes', 'No', 'Continuous', 'Yes', 'Yes'],
            ['Passaround (modern code review)', 'No', 'Yes', 'Rarely', 'Yes', 'No'],
            ['Ad hoc review', 'No', 'No', 'Yes', 'Yes', 'No']
          ]
        }
      },
      {
        t: 'Pair Programming',
        en: 'Pair programming is a well-studied Agile technique in which two programmers work together at one computer on the same design, algorithm, code or test. The driver actively types or records the design; the navigator watches the work, identifies problems, asks clarifying questions and makes suggestions. Both are continuous brainstorming partners.',
        zh: '结对编程是敏捷中研究得很充分的技术：两名程序员在同一台电脑前共同处理同一份设计、算法、代码或测试。驾驶员（driver）负责动手输入或记录设计；领航员（navigator）观察工作、发现问题、提出澄清性问题并给出建议。两人同时是持续的头脑风暴伙伴。',
        list: [
          'Increases development time but decreases defects; knowledge spreads immediately.',
          'No formal preparation phase, but continuous review and correction.'
        ]
      },
      {
        t: 'The Cost of Reviewing',
        en: 'Formal inspections are very expensive — about one developer-day per session — while passaround review is distributed and asynchronous, so it scales better. Code reviews are claimed to be more cost-effective than testing for the defects they find, and certainly cheaper than not finding the bug at all. The right choice depends on defect cost, risk and available time.',
        zh: '正式检查非常昂贵——每次会议约需一个开发者日；而传递式评审是分布式、异步的，因此更容易规模化。对于它们能发现的缺陷，代码评审被认为比测试更具成本效益，当然也比“根本没发现这个缺陷”便宜。选择哪种方式取决于缺陷代价、风险与可用时间。',
        list: [
          'Inspection: high cost per session, high yield, whole-program view.',
          'Review: low marginal cost per change, asynchronous, diff-scoped.'
        ]
      },
      {
        t: 'Worked Example: the Leap-Year Bug',
        en: 'A classic inspection exercise. The loop subtracts 366 days only when days > 366 and the year is a leap year. When days == 366 on a leap year, neither branch changes days, so the loop never terminates. The minimal fix is to test days >= 366; the deeper lesson is that boundary conditions are exactly what inspections are good at finding.',
        zh: '经典检查练习：循环在闰年时只有 days > 366 才减去 366 天。当闰年且 days == 366 时，两个分支都不会修改 days，循环永不终止。最小修复是把条件改成 days >= 366。更深的教训是：边界条件正是人工检查最擅长发现的问题。',
        code: [
          'year = ORIGINYEAR;  /* = 1980 */',
          'while (days > 365) {',
          '    if (IsLeapYear(year)) {',
          '        if (days > 366) { days -= 366; year += 1; }',
          '    } else {',
          '        days -= 365; year += 1;',
          '    }',
          '}'
        ]
      }
    ],
    callout: {
      zh: '一句话区分：inspection = 整个程序 + 开会 + 昂贵；review = 每次变更 + 异步 + 便宜；pair programming = 持续的两个人。',
      en: 'Distinguish by scope (whole program vs diff), synchrony (meeting vs asynchronous) and cost (developer-day vs minutes).'
    }
  },

  {
    id: 'requirements',
    num: '05',
    zh: '需求与规格',
    en: 'Requirements and Specifications',
    lead: 'Requirements describe the relationship between the machine we build and the world it lives in — what is, and what should be.',
    slides: 'Slides 30–37',
    cards: [
      {
        t: 'Requirements',
        en: 'Requirements articulate the relationship and interface between a desired system and its environment. They cover both what is (or is expected) and what should be, and they can describe variables, inputs and outputs together with the assumptions that relate them.',
        zh: '需求阐明“期望的系统”与其环境之间的关系与接口，既包括现状（或预期），也包括“应当如此”的目标；可以描述变量、输入、输出，以及连接它们的假设。需求不是“功能清单”，而是系统与世界的契约。',
        list: [
          'Requirements are about the world, not only about the software.',
          'They must state assumptions explicitly, because hidden assumptions become defects.'
        ]
      },
      {
        t: 'Functional Requirements',
        en: 'Functional requirements describe what the machine should do — “get the right answer”. They cover inputs, outputs, interfaces, responses to events and criteria. They are usually stated per feature or per event.',
        zh: '功能需求描述机器“应该做什么”——“给出正确答案”。它涵盖输入、输出、接口、对事件的响应以及判据，通常按功能或按事件来陈述。',
        list: [
          'Input, output, interface, response to events, criteria.',
          'Example: “When the user submits a valid order, the system reserves stock and returns an order ID.”'
        ]
      },
      {
        t: 'Quality (Non-Functional) Requirements',
        en: 'Quality requirements specify not the functionality but the manner in which it is delivered. They can be more critical than functional requirements: missing functionality can sometimes be worked around, but a low-quality system may be unusable. They must be stated in measurable terms to be verifiable.',
        zh: '质量需求（非功能需求）不规定“做什么”，而规定“以何种方式做”。它们有时比功能需求更关键：缺失的功能有时可以绕过，但质量低下的系统可能根本无法使用。质量需求必须可度量，才能被验证。',
        list: [
          'Examples: response time, availability, security, privacy, energy efficiency, maintainability.',
          '“Fast” is not a requirement; “p95 response under 200 ms at 1,000 requests/second” is.'
        ]
      },
      {
        t: 'Completeness, Consistency, Precision',
        en: 'Requirements should be complete (all requirements are documented), consistent (no conflicts between them) and precise (no ambiguity). A fourth practical test is verifiability: a requirement is verifiable if some observation or test can decide whether it is satisfied. Informal statements are useful for conversation but are not verifiable requirements.',
        zh: '需求应当完整（所有需求都被记录）、一致（需求之间不冲突）、精确（没有歧义）。第四个实用判据是可验证性：如果某种观察或测试能够判定它是否被满足，它就是可验证的。非正式陈述适合沟通，但不能作为可验证的需求。',
        list: [
          'Completeness · Consistency · Precision · Verifiability',
          'Ambiguity is a defect in the requirement, not a defect in the implementer.'
        ]
      },
      {
        t: 'Environment vs. Machine',
        en: 'We separate world phenomena, shared phenomena and machine phenomena. In the automobile example, DriverWantsToStart and HandbrakeReleased are world phenomena; motor.Regime = “up” and errorCode = 013 are machine phenomena; handBrakeCtrl = “off” and stateDatabase updated are shared — observable at the interface.',
        zh: '我们把现象分为世界现象、共享现象和机器现象。以汽车为例：驾驶员想启动（DriverWantsToStart）、手刹已松开（HandbrakeReleased）是世界现象；发动机状态 motor.Regime = "up"、错误码 errorCode = 013 是机器现象；handBrakeCtrl = "off"、状态数据库被更新是共享现象——它们在接口处可被双方观察。',
        list: [
          'World phenomena — only the environment can observe or control them.',
          'Shared phenomena — at the interface; this is where requirements live.',
          'Machine phenomena — only the software observes or controls them.'
        ]
      },
      {
        t: 'System vs. Software Requirements',
        en: 'System requirements describe relationships between monitored and controlled variables in the world. Software requirements describe relationships between inputs and outputs of the software. Domain properties and assumptions state the relationships between the two — for example, that a sensor reading faithfully reflects the physical quantity it measures.',
        zh: '系统需求描述世界中“被监控变量”与“被控制变量”之间的关系；软件需求描述软件输入与输出之间的关系；领域属性与假设则陈述两者之间的连接——例如“传感器读数忠实反映它所测量的物理量”。如果领域假设不成立，软件即使满足规格也会在现实中出错。',
        list: [
          'System requirement: world-level, monitored → controlled.',
          'Software requirement: input → output.',
          'Domain assumption: the bridge between them, and a common source of field failures.'
        ]
      },
      {
        t: 'Four Denials in Requirements',
        en: '“I’m already good at this” shows up as four denials: denial by prior knowledge (“we have done this before, so we know what is required”), denial by hacking (fascination with machines dominates attention to the “how”), denial by abstraction (elegant models that obscure or downplay the real world), and denial by vagueness (implying that machine descriptions are descriptions of the world).',
        zh: '“我已经很擅长这个了”会表现为四种否认：以既有经验否认（“我们做过，所以知道需求”）、以技术迷恋否认（沉迷机器实现而忽视“如何被使用”）、以抽象否认（优雅模型遮蔽或淡化了真实世界）、以模糊否认（含混地暗示“机器的描述就是世界的描述”）。',
        list: [
          'Prior knowledge · Hacking · Abstraction · Vagueness',
          'Each denial replaces evidence about the world with an assumption about it.'
        ]
      },
      {
        t: 'The Requirements Document as a Hub',
        en: 'The requirements document feeds almost every downstream artefact: call for tenders and proposal evaluation, the project contract, the work plan, project estimations (size, cost, schedule), follow-up directives, software architecture, software evolution directives, documentation, the user manual, QA checklists, acceptance test data, implementation directives and prototypes or mock-ups.',
        zh: '需求文档是几乎所有下游制品的枢纽：招标与投标评估、项目合同、工作计划、项目估算（规模、成本、进度）、后续指令、软件架构、演化指令、软件文档、用户手册、质量保证检查表、验收测试数据、实现指令以及原型/界面草图。需求一旦变化，这些制品都会被波及——这正是变更昂贵的根源。',
        list: [
          'Tenders · Contract · Work plan · Estimations · Architecture · Acceptance tests · User manual · QA checklists',
          'Because so much depends on it, requirement errors are the most expensive to fix late.'
        ]
      }
    ],
    callout: {
      zh: '本章高频考点：功能 vs 质量需求、完整/一致/精确、可验证性、环境 vs 机器、四种否认。',
      en: 'Frequent exam targets: functional vs quality requirements; completeness/consistency/precision; verifiability; world vs machine phenomena; the four denials.'
    }
  },

  {
    id: 'devops',
    num: '06',
    zh: 'DevOps 与团队沟通',
    en: 'DevOps and Team Communication',
    lead: 'Bring development and operations together, automate the path from commit to production, and keep the feedback loop short.',
    slides: 'Slides 38–50',
    cards: [
      {
        t: 'DevOps',
        en: 'DevOps is a culture and a set of practices that bring development and operations teams together to build, test and release software faster and more reliably. It is the integration and automation of software development and IT operations.',
        zh: 'DevOps 是一种文化与实践集合，把开发团队与运维团队结合起来，以更快、更可靠地构建、测试和发布软件。它本质上是“软件开发”与“IT 运维”的集成与自动化。',
        list: [
          'Not a tool, not a team name — a way of organising responsibility and feedback.',
          'Breaks the traditional wall between “feature delivery” and “keeping it running”.'
        ]
      },
      {
        t: 'Dev vs. Ops Metrics',
        en: 'The two groups are traditionally measured differently: development on features completed and code shipped, operations on stability, reliability and availability. These metrics pull in opposite directions, which is exactly why integrating the groups is hard. DevOps claims two benefits: increased velocity (how quickly products reach release) and increased quality (successful delivery of features).',
        zh: '两个群体传统上的考核指标不同：开发看完成了多少功能、交付了多少代码；运维看稳定性、可靠性和可用性。这两组指标方向相反，正是“整合困难”的根源。DevOps 声称带来两个收益：更快的速度（产品多快能发布）和更高的质量（功能能否成功交付）。',
        list: [
          'Velocity: time from idea to release.',
          'Quality: successful delivery, not merely “shipped”.'
        ]
      },
      {
        t: 'DevOps Phases',
        en: 'The DevOps lifecycle forms an infinite loop with a DEV half and an OPS half. DEV: plan, create, verify, package. OPS: release, configure, monitor. Monitoring feeds the next plan — the loop never closes permanently.',
        zh: 'DevOps 生命周期是一个无限循环，分为 DEV 与 OPS 两半。DEV：计划（plan）→ 创建（create）→ 验证（verify）→ 打包（package）。OPS：发布（release）→ 配置（configure）→ 监控（monitor）。监控的结果回流到下一轮计划，循环永不真正结束。',
        flow: ['Plan', 'Create', 'Verify', 'Package', 'Release', 'Configure', 'Monitor']
      },
      {
        t: 'Continuous Integration (CI)',
        en: 'CI means code changes are integrated and tested automatically. Practices: commit and check in frequently (history can be squashed later); commits build on previous commits so you know precisely where the build breaks; automated feedback and testing on every commit; artifact creation (container images, WAR files); and versioning code, infrastructure and documentation together.',
        zh: '持续集成（CI）指代码变更被自动集成并测试。实践包括：频繁提交（历史之后可以压缩）；每次提交都基于前一次，因此能精确定位构建在哪一步断裂；每次提交都触发自动反馈与测试；产出制品（容器镜像、WAR 包等）；把代码、支撑基础设施和文档一起纳入版本控制。',
        list: [
          'Frequent commits · linear history · automated tests · artifacts · everything versioned together',
          'The point is fast, precise feedback — not merely “a build server”.'
        ]
      },
      {
        t: 'Continuous Delivery vs. Continuous Deployment',
        en: 'Continuous delivery keeps every change in a releasable state, with a manual approval before production. Continuous deployment goes further: every change that passes the pipeline is deployed to production automatically, with no human gate.',
        zh: '持续交付（continuous delivery）让每一次变更都处于“可发布”状态，但上生产前需要人工批准。持续部署（continuous deployment）更进一步：通过流水线的每一次变更都自动部署到生产，没有人工闸门。二者常被统称为 CD，区别只在最后一道门。',
        table: {
          head: ['', 'Continuous Delivery', 'Continuous Deployment'],
          rows: [
            ['Production release', 'Manual approval', 'Automatic'],
            ['Every change releasable', 'Yes', 'Yes'],
            ['Typical use', 'Regulated / high-risk systems', 'Low-risk, high-frequency services']
          ]
        }
      },
      {
        t: 'A Typical DevOps Pipeline',
        en: 'Develop (check in, peer review) → Build (style check, compilation, unit tests, build container images) → Test (integration tests, load tests, penetration tests, manual approval to advance) → Deploy (deploy to production) → Monitor (record errors). Each stage is automated and produces evidence for the next.',
        zh: '典型流水线：开发（提交、同行评审）→ 构建（风格检查、编译、单元测试、构建容器镜像）→ 测试（集成测试、负载测试、渗透测试、人工批准后推进）→ 部署（发布到生产）→ 监控（记录错误）。每个阶段都自动化，并为下一阶段产出证据。',
        flow: ['Develop', 'Build', 'Test', 'Deploy', 'Monitor'],
        list: [
          'Build gate: does it compile and pass unit tests?',
          'Test gate: does it survive integration, load and security testing?',
          'Monitor: are errors visible immediately after release?'
        ]
      },
      {
        t: 'Deployment Strategies',
        en: 'Big bang replaces the whole system at once (simple, but a failure affects everyone at once). Rolling replaces instances in batches, so the fleet moves gradually from the old version to the new. Blue/green runs two identical environments and switches traffic via the load balancer, giving instant rollback. Canary sends a small share of traffic to the new version first, watches error rates, then expands.',
        zh: '“大爆炸”式部署一次性替换整个系统：简单，但失败会同时影响所有人。滚动部署分批替换实例，使整个集群逐步从旧版本迁移到新版本。蓝绿部署运行两套完全相同的环境，通过负载均衡器切换流量，可瞬间回滚。金丝雀部署先把少量流量导向新版本，观察错误率后再扩大范围。',
        table: {
          head: ['Strategy', 'Mechanism', 'Rollback', 'Risk'],
          rows: [
            ['Big bang', 'Replace everything at once', 'Restore backup', 'Highest — all users at once'],
            ['Rolling', 'Replace instances in batches', 'Roll back batch by batch', 'Medium'],
            ['Blue/green', 'Two environments, switch traffic', 'Switch back instantly', 'Low, but doubles infrastructure'],
            ['Canary', 'Small traffic share first, then expand', 'Stop and shift traffic back', 'Lowest blast radius']
          ]
        }
      },
      {
        t: '“Faster Is Safer”',
        en: 'Continuous delivery’s key values invert the intuition that speed is dangerous: release frequently in small batches, maintain key performance indicators to evaluate the impact of updates, phase roll-outs, and evaluate the business impact of new features. Small releases are easier to diagnose, test and roll back than large ones.',
        zh: '持续交付的核心价值观颠倒了“快就危险”的直觉：小批量、频繁发布；维护关键绩效指标以评估更新的影响；分阶段灰度发布；评估新功能的业务影响。小发布比大发布更容易诊断、测试和回滚，所以“更快”反而“更安全”。',
        list: [
          'Small batch → small blast radius → fast diagnosis → safe rollback.',
          'Measure after release: KPIs turn deployment into an experiment with evidence.'
        ]
      },
      {
        t: 'Team Communication',
        en: 'Software teams communicate more effectively by using tools (for example Slack, Jira and GitHub) to share updates, track work and collaborate in real time. Communication is not overhead: you cannot solve any problem without it, and most process failures are communication failures in disguise.',
        zh: '软件团队通过工具（如 Slack、Jira、GitHub）更有效地沟通：共享进展、跟踪工作、实时协作。沟通不是“额外开销”——没有沟通就无法解决任何问题，而大多数过程失败本质上都是沟通失败。',
        list: [
          'Synchronous (chat, stand-up) for coordination; asynchronous (issues, docs) for decisions and record.',
          'A defect report, a review comment and a commit message are all communication artefacts.'
        ]
      }
    ],
    callout: {
      zh: '高频对比：CI / 持续交付 / 持续部署；四种部署策略的爆炸半径与回滚方式。',
      en: 'High-frequency comparisons: CI vs continuous delivery vs continuous deployment; blast radius and rollback of each deployment strategy.'
    }
  }
];

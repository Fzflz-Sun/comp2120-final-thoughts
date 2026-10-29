/* COMP2120/6120 Final Thoughts — exercises part B: Short answers + Applied problems */
window.EX_SHORT = [
  {
    id: 'sa-01', topic: 'inspection',
    prompt: 'A team is developing safety-critical software under severe time constraints. Would you recommend formal code inspections or modern code reviews? Give two reasons to justify your choice and discuss the trade-off.',
    answerHtml: `
      <p><strong>Recommendation.</strong> Use a hybrid: formal inspections for the safety-critical core (fault detection, control logic, anything whose failure could injure someone), and modern code reviews for everything else.</p>
      <p><strong>Reasons.</strong></p>
      <ol>
        <li><strong>Effectiveness where it matters.</strong> Inspections are reported to find 60–90% of defects and examine the whole artefact, so they catch cross-cutting and specification-level problems that a diff-based review cannot see.</li>
        <li><strong>Affordability everywhere else.</strong> Reviews are asynchronous and cheap per change, so they can run on every commit without consuming a developer-day per session. Applying inspections to the whole codebase would not fit the schedule.</li>
      </ol>
      <p><strong>Trade-offs.</strong> An inspection costs roughly one developer-day per session and needs preparation and a moderator; under time pressure this is a real cost. Reviews are cheaper but narrower (each change only), rarely verify the fix, and can miss design-level issues. Mitigate by scoping inspections to high-risk modules, time-boxing them, and keeping management and HR out of the room so authors are not punished for found defects.</p>
      <p><strong>What a strong answer adds.</strong> A concrete scoping rule (risk × change frequency), and the observation that inspections also build shared understanding of the safety case.</p>`
  },
  {
    id: 'sa-02', topic: 'testing',
    prompt: 'Explain why 100% code coverage does not imply that the software is defect-free, and what mutation testing adds.',
    answerHtml: `
      <p>Coverage records <em>execution</em>, not <em>verification</em>. A test suite can execute every line while asserting nothing, or assert the wrong thing, or use inputs that never reach the interesting states. Coverage also ignores data-flow combinations, concurrency interleavings, timing and performance. So 100% coverage is compatible with a suite that would happily accept a broken program.</p>
      <p>Mutation testing probes exactly this gap. It injects small faults (change <code>&gt;</code> to <code>&gt;=</code>, <code>+</code> to <code>-</code>, replace a return value) and checks whether some test fails. A mutant that survives shows a behaviour the suite does not actually constrain. The mutation score — killed / total — therefore measures the <em>strength</em> of the assertions, which is a better predictor of bug-finding capability than coverage.</p>
      <p>Caveats: mutation testing is expensive (many builds), and equivalent mutants cannot be killed. Best practice is to use coverage to find untested code and mutation testing to judge test quality, not to chase either number.</p>`
  },
  {
    id: 'sa-03', topic: 'measurement',
    prompt: 'Explain the streetlight effect and give a software example. How would you mitigate it?',
    answerHtml: `
      <p>The streetlight effect is an observational bias: we search for answers where it is easiest to look, not where the answer actually is — like looking for keys under the lamp because that is where the light is.</p>
      <p><strong>Software example.</strong> A team reports "quality" using the number of unit tests and line coverage because CI produces them automatically, while escaped defects, incident duration and customer-reported bugs are never tracked. The numbers look healthy while the product keeps breaking in production.</p>
      <p><strong>Mitigation.</strong></p>
      <ul>
        <li>Start from the decision: what would change if the number were different? If nothing, do not measure it.</li>
        <li>Instrument the outcome (defects escaped to production, mean time to restore, lead time), even if it is harder to collect.</li>
        <li>Triangulate with qualitative evidence (interviews, incident reviews) and calibrate against project history.</li>
        <li>Audit the metric periodically: is it still measuring what it claims, and can it be gamed?</li>
      </ul>
      <p>The bias is in the choice of where to look, not in the arithmetic.</p>`
  },
  {
    id: 'sa-04', topic: 'measurement',
    prompt: 'A manager proposes measuring developer productivity by lines of code per day. Critique this proposal and suggest a better alternative.',
    answerHtml: `
      <p><strong>Validity.</strong> Lines of code measure typing, not value. A 10-line fix can be worth more than 1,000 lines of generated boilerplate; refactoring and deletion reduce the count while improving the system. The metric has no established causal link to productivity or quality.</p>
      <p><strong>Gaming.</strong> The moment it is used for evaluation it becomes a target: verbose code, copy-paste, avoiding deletion, splitting commits. This is the "you get what you measure" failure, and it can make the codebase worse while the number improves.</p>
      <p><strong>Context blindness.</strong> It ignores difficulty, review effort, mentoring, incident response and design work — much of which is exactly where senior engineers add value.</p>
      <p><strong>Better alternatives.</strong> Measure outcomes at team level: cycle time from commit to production, deployment frequency, change failure rate, mean time to restore, and escaped defects (the DORA-style set). Combine with qualitative review and goal-based assessment. If individual data is needed for coaching, use it privately and never as a ranking.</p>`
  },
  {
    id: 'sa-05', topic: 'defects',
    prompt: 'Explain the difference between severity and priority, using an example where they diverge.',
    answerHtml: `
      <p><strong>Severity</strong> is the degree of impact a defect has on development or operation — essentially the cost of <em>not</em> fixing it. Bugzilla labels run Blocker, Critical, Major, Normal, Minor, Trivial, Enhancement.</p>
      <p><strong>Priority</strong> is the importance or urgency of <em>fixing</em> it — when it should be scheduled. Phabricator labels run Unbreak Now!, High, Normal, Low, Lowest.</p>
      <p><strong>Divergence example.</strong> A checkout service crashes for every user during a sales campaign: high severity, high priority. A typo in the headline of the company's flagship marketing page: trivial severity, but high priority because it is the first thing every customer sees. Conversely, a crash in a deprecated internal reporting tool used by two people once a quarter: critical severity in principle, low priority in practice.</p>
      <p><strong>Why it matters.</strong> Triage needs both axes, plus the cost of fixing. Using severity as the only ordering rule either wastes capacity on rare disasters or delays embarrassing, highly visible defects. Neither axis alone is a schedule.</p>`
  },
  {
    id: 'sa-06', topic: 'requirements',
    prompt: 'Distinguish functional from quality (non-functional) requirements, and explain why quality requirements can be more critical.',
    answerHtml: `
      <p><strong>Functional requirements</strong> describe what the machine should do: inputs, outputs, interfaces, responses to events and acceptance criteria. Example: "When a valid order is submitted, reserve stock and return an order ID."</p>
      <p><strong>Quality requirements</strong> describe the manner in which functionality is delivered: performance, availability, security, privacy, usability, maintainability, energy efficiency. Example: "p95 checkout latency ≤ 300 ms at 5,000 requests per second."</p>
      <p><strong>Why quality can dominate.</strong> Missing functionality can sometimes be worked around (a manual process, a script), but a system that is unavailable, insecure or unusable cannot be worked around at all. A slow payment page loses revenue directly; a leaky one loses trust and creates legal exposure. Quality also constrains the architecture, so it is expensive to add later.</p>
      <p><strong>Practical rule.</strong> Both must be measurable. "Fast" and "user-friendly" are not requirements; thresholds, workloads and acceptance tests are.</p>`
  },
  {
    id: 'sa-07', topic: 'process',
    prompt: 'A medical-device company must document every requirement and every test for regulatory approval. Would you recommend waterfall or agile? Justify your answer and note the trade-off.',
    answerHtml: `
      <p><strong>Recommendation.</strong> A staged hybrid: agile inside each stage, with mandatory gate reviews and a traceability baseline at the points regulators care about. Pure waterfall is too rigid for discovery; pure agile without artefacts will fail the audit.</p>
      <p><strong>Why.</strong> The regulator requires evidence: requirements, risk analysis, verification and traceability from requirement to test. That is a documentation obligation, not necessarily a sequential process. Short iterations still reduce risk by surfacing requirement misunderstandings early, and each iteration can produce the traceability records as a by-product.</p>
      <p><strong>Trade-off.</strong> Agile delivery with heavy documentation overhead can erode the very feedback loop it is meant to create; teams may treat the documents as the goal. Conversely, waterfall gives clean auditability but late feedback, and a requirements error found during validation is extremely expensive.</p>
      <p><strong>Practical design.</strong> Fix the regulated artefacts (risk file, traceability matrix, verification reports) as non-negotiable deliverables per iteration; let scope and design emerge inside them.</p>`
  },
  {
    id: 'sa-08', topic: 'devops',
    prompt: 'Explain the difference between continuous delivery and continuous deployment. Which would you choose for a retail bank’s core ledger, and why?',
    answerHtml: `
      <p><strong>Continuous delivery</strong> keeps every change in a releasable state and automates build, test and staging, but a human approves promotion to production. <strong>Continuous deployment</strong> removes that gate: every change that passes the pipeline goes to production automatically.</p>
      <p><strong>For a core ledger, choose continuous delivery.</strong> The ledger is subject to audit, change-control and segregation-of-duties requirements; a named approver with evidence is part of the control framework, not bureaucracy. The blast radius of a bad posting rule is financial and regulatory, and some changes (schema migrations, interest calculations) need a scheduled window and reconciliation.</p>
      <p><strong>But push automation as far as possible.</strong> Everything up to the gate should be automated — build, unit and integration tests, migration rehearsal, reconciliation checks — so approval is a decision, not a manual deployment. Use canary or blue/green behind the gate.</p>
      <p><strong>Trade-off.</strong> The manual gate slows the loop and can become a rubber stamp; measure approval latency and keep it small. For lower-risk internal tools, continuous deployment is appropriate.</p>`
  },
  {
    id: 'sa-09', topic: 'foundations',
    prompt: 'Using a concrete product, explain what “engineering is design under constraint” means.',
    answerHtml: `
      <p>Take a smartphone. The team wants a thin body, a large battery, a bright display, fast wireless, water resistance and a low price. Physics sets a floor on volume; battery chemistry sets energy density; thermal limits cap sustained performance; certification and spectrum rules constrain the radio; the price target constrains the bill of materials; repairability and recyclability constrain the adhesive and fasteners.</p>
      <p>Every one of these is a constraint, and they conflict. A thinner phone means a smaller battery or a camera bump; more water resistance means more sealing and less repairability; more performance means more heat and less battery life. Engineering is the disciplined search for a design point that satisfies the hard constraints and makes a defensible trade among the soft ones.</p>
      <p>The same logic applies to software: reliability versus time to market, security versus usability, microservice flexibility versus operational cost, copyleft sharing versus commercial adoption. Recognising the trade-off — and stating which constraint is binding — is what distinguishes engineering judgement from invention.</p>`
  },
  {
    id: 'sa-10', topic: 'inspection',
    prompt: 'Explain why code review can be described as an inductive argument, and describe a situation in which the argument fails.',
    answerHtml: `
      <p>A reviewer reasons: the current version V(0) is good; this change is good; therefore the next version V(n+1) is good. Applied to every change, this is induction over the sequence of versions. It is attractive because each review is cheap and local.</p>
      <p><strong>Where it fails.</strong> The induction depends on a stable definition of "good". If the definition changes — new security requirements, a performance target, a new platform — then every previously accepted change must be re-evaluated, and no amount of per-change review will reveal it. It also fails when "good" is a global property: a change can be locally correct yet create a deadlock, a privacy leak or an architectural drift that is only visible across modules. Finally, reviewing each diff cannot catch what was never written: a missing feature or an unhandled case has no diff to review.</p>
      <p><strong>Mitigation.</strong> Periodically review the whole system against current requirements (an inspection, threat model or architecture review), and make the definition of "good" explicit in review checklists so changes in it are visible.</p>`
  },
  {
    id: 'sa-11', topic: 'requirements',
    prompt: 'Describe the four “denials” that can hide requirements problems, and explain how a team could counter one of them.',
    answerHtml: `
      <p><strong>Denial by prior knowledge:</strong> "we have done this before, so we know what is required" — past experience substitutes for evidence about this customer.</p>
      <p><strong>Denial by hacking:</strong> fascination with the machine dominates attention to how it will be used; the team prototypes technology instead of investigating the world.</p>
      <p><strong>Denial by abstraction:</strong> elegant models obscure, remove or downplay the messy real world; the model becomes the requirement.</p>
      <p><strong>Denial by vagueness:</strong> vague statements imply that a description of the machine is a description of the world, so no one has to check the gap.</p>
      <p><strong>Countering denial by prior knowledge.</strong> Replace memory with observation: interview actual users, shadow the current workflow, and write acceptance criteria that would fail if the assumption were wrong. Run a small pilot and compare predicted with observed behaviour. Make assumptions explicit and assign someone to test each one. The general cure for all four denials is the same: force contact with the world, and make the assumptions falsifiable.</p>`
  },
  {
    id: 'sa-12', topic: 'inspection',
    prompt: 'Compare pair programming with formal code inspection in terms of cost, timing and defects found.',
    answerHtml: `
      <p><strong>Timing.</strong> Pair programming is continuous and preventive: the second person sees the code as it is written, so defects are prevented or caught within minutes. A formal inspection happens after the artefact exists — cheaper to fix than a field defect, but later.</p>
      <p><strong>Cost.</strong> Pairing roughly doubles the person-hours for the code that is written, but removes a separate review step and spreads knowledge immediately. An inspection costs about a developer-day per session plus preparation time from several people, so it is a concentrated, high-cost event.</p>
      <p><strong>Defects.</strong> Pairing catches local design and logic issues and improves consistency; it is weaker on whole-program properties and may normalise a shared blind spot. Inspections examine the whole artefact with defined roles and a moderator, and are reported to find 60–90% of defects, including cross-cutting and specification mismatches.</p>
      <p><strong>Choice.</strong> Pair on complex, novel or high-risk code; inspect when a new concern must be checked everywhere, or when the artefact is safety-critical and needs an auditable record.</p>`
  },
  {
    id: 'sa-13', topic: 'testing',
    prompt: 'Why is mutation score a better predictor of bug-finding capability than coverage? What are its limitations?',
    answerHtml: `
      <p>Coverage answers "was this code executed?"; mutation score answers "would these tests notice if this code were wrong?". By injecting a fault and requiring a test to fail, mutation testing measures the strength of the oracle — the part of a test suite that actually detects defects. A suite can reach 100% coverage with no assertions; it cannot kill mutants without meaningful checks.</p>
      <p><strong>Limitations.</strong> Cost: one build and test run per mutant, which is why mutants are sampled or prioritised. Equivalent mutants: some mutations do not change behaviour, so they can never be killed and depress the score. Operator dependence: the score reflects the chosen mutators, and some real bugs (missing features, concurrency, performance) are outside their reach. Finally, the competent-programmer assumption — that programs are mostly correct except for small errors — does not hold for badly designed code.</p>
      <p><strong>Practice.</strong> Use coverage to find untested code and mutation testing to judge test quality, on the modules where defects are expensive.</p>`
  },
  {
    id: 'sa-14', topic: 'oss',
    prompt: 'Explain the difference between copyleft and permissive licences. Which would you choose for a startup’s client library, and why?',
    answerHtml: `
      <p><strong>Permissive</strong> licences (MIT, Apache-2.0, BSD) allow a derivative work to be distributed under a different licence, including a closed-source one, provided attribution and other minor conditions are met. <strong>Copyleft</strong> licences (GPL, AGPL) require derivative and linked works to remain under the same licence, so the commons grows transitively.</p>
      <p><strong>For a client library, choose permissive.</strong> The library's value comes from adoption: it should be embeddable in commercial apps, mobile stores and closed SDKs without forcing customers to open their code. A copyleft client library creates legal review friction for exactly the customers a startup wants, and the startup usually monetises hosting, support or a commercial edition rather than the library itself.</p>
      <p><strong>Trade-offs.</strong> Permissive licensing lets a large cloud vendor repackage the library without contributing back; copyleft protects against that but limits adoption. Apache-2.0 is often the best middle ground because it adds an explicit patent grant. The choice should follow the business model, not ideology.</p>`
  },
  {
    id: 'sa-15', topic: 'oss',
    prompt: 'What are the risks of not open-sourcing a platform technology? Illustrate with an example from the lecture.',
    answerHtml: `
      <p>Keeping a platform closed concentrates control and revenue, but it also concentrates risk. The idea can leak through papers, talks and products; if others can re-implement it, they can build the ecosystem around their version. A closed platform also cannot be extended by its users, so it grows more slowly than an open alternative and may lose its claim to be the standard.</p>
      <p><strong>Example.</strong> The MapReduce paper described a technique for simplified data processing on large clusters. Others implemented the idea as Hadoop, which grew into a large open ecosystem. The publication advanced the field and the authors' reputation, but the implementation landscape was shaped by the open re-implementation rather than by a closed product.</p>
      <p><strong>When closed is right.</strong> When the value is in operation, data, support or a hosted service rather than the code; when security or regulatory constraints forbid publication; or when the company can sustain a commercial moat without the community. The decision is a business trade-off — adoption and ecosystem versus control and monetisation — not a purely legal one.</p>`
  },
  {
    id: 'sa-16', topic: 'debugging',
    prompt: 'Delta debugging is described as very efficient, yet it relies on strong assumptions. Explain both sides.',
    answerHtml: `
      <p><strong>Why it is efficient.</strong> It is divide-and-conquer: each test of a subset eliminates roughly half of the remaining candidates, so the number of executions grows polynomially (roughly O(n²) in the worst case) rather than exponentially, and in the common case behaves like binary search. It also needs only a black-box "interesting?" oracle — no understanding of the program.</p>
      <p><strong>Why the assumptions matter.</strong> Monotonicity says adding changes cannot make an interesting set uninteresting; unambiguity says two interesting sets have an interesting intersection; consistency says each query has a definite answer. If behaviour is non-monotonic (a fix masks a bug), ambiguous (flaky tests, timing) or inconsistent (non-deterministic failures), the narrowing can discard the real cause.</p>
      <p><strong>Consequence.</strong> Delta debugging works best on deterministic failures with monotone causes. For concurrency, the schedule must be made part of the input and replayed deterministically (as in DejaVu or CHESS); otherwise the oracle itself is unreliable.</p>`
  }
];

window.EX_APPLIED = [
  {
    id: 'ap-01', topic: 'testing',
    prompt: 'What happens when this code runs? Identify the bug and explain why it occurs. Suggest a fix and a boundary test.',
    code: [
      'int[] values = {4, 8, 12};',
      'int i = 3;',
      'if (i > values.length) {',
      '    System.out.println("invalid index");',
      '} else {',
      '    System.out.println(values[i]);',
      '}'
    ],
    answerHtml: `
      <p><strong>What happens.</strong> The condition <code>3 &gt; 3</code> is false, so execution enters the <code>else</code> branch and evaluates <code>values[3]</code>. Java arrays are zero-based with valid indices <code>0..length-1</code>, so this throws <code>ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3</code>. Nothing is printed.</p>
      <p><strong>The bug.</strong> An off-by-one boundary error: the guard uses <code>&gt;</code> where it needs <code>&gt;=</code>. It also fails to reject negative indices.</p>
      <p><strong>Fix.</strong></p>
      <pre><code>if (i &gt;= values.length || i &lt; 0) {
    System.out.println("invalid index");
} else {
    System.out.println(values[i]);
}</code></pre>
      <p><strong>Boundary tests.</strong> <code>i = 0</code> → 4 (first valid); <code>i = 2</code> → 12 (last valid); <code>i = 3</code> → "invalid index" (first invalid); <code>i = -1</code> → "invalid index" (negative). A good test set covers the two valid extremes and one past each end — precisely the values that a <code>&gt;</code> vs <code>&gt;=</code> mistake distinguishes.</p>
      <p><strong>Lesson.</strong> Boundary values are where off-by-one defects live, and this is exactly the class of defect that inspections and unit tests are good at catching.</p>`
  },
  {
    id: 'ap-02', topic: 'inspection',
    prompt: 'This routine converts a number of days since 1 January 1980 into a year. Find the defect, explain when it manifests, and give the minimal fix.',
    code: [
      'year = ORIGINYEAR;  /* = 1980 */',
      'while (days &gt; 365) {',
      '    if (IsLeapYear(year)) {',
      '        if (days &gt; 366) {',
      '            days -= 366;',
      '            year += 1;',
      '        }',
      '    } else {',
      '        days -= 365;',
      '        year += 1;',
      '    }',
      '}'
    ],
    answerHtml: `
      <p><strong>Defect.</strong> When <code>IsLeapYear(year)</code> is true and <code>days == 366</code>, the inner condition <code>days &gt; 366</code> is false, so neither branch changes <code>days</code> or <code>year</code>. The loop condition <code>days &gt; 365</code> remains true forever: an infinite loop.</p>
      <p><strong>When it manifests.</strong> Only on the last day of a leap year (day 366), because on every other iteration either the leap-year branch subtracts 366 or the non-leap branch subtracts 365. That is why it can survive casual testing: it needs a leap year and a boundary value.</p>
      <p><strong>Minimal fix.</strong> Change the inner test to <code>days &gt;= 366</code> so the boundary case also subtracts and advances the year.</p>
      <pre><code>if (IsLeapYear(year)) {
    if (days &gt;= 366) { days -= 366; year += 1; }
} else {
    days -= 365; year += 1;
}</code></pre>
      <p><strong>Tests.</strong> 1980-12-31 (day 365), 1981-01-01 (day 366), 1980-01-01 (day 0), and a non-leap boundary (1981-12-31 / 1982-01-01). Also test a run that crosses several leap years.</p>
      <p><strong>Lesson.</strong> Boundary conditions on both branches of a conditional are a classic inspection target; the code "looks right" for every value except one.</p>`
  },
  {
    id: 'ap-03', topic: 'testing',
    prompt: 'A method and its test suite are shown below. Three mutants are generated: (M1) <code>x &gt;= 0</code>; (M2) <code>x &lt; 0</code>; (M3) <code>return true;</code>. For each mutant, say whether it is killed and compute the mutation score. Then suggest one test that would improve the score.',
    code: [
      'boolean isPositive(int x) {',
      '    return x &gt; 0;',
      '}',
      '',
      '// Test 1: isPositive(5) == true',
      '// Test 2: isPositive(-1) == false'
    ],
    answerHtml: `
      <p><strong>M1 — <code>x &gt;= 0</code>:</strong> survives. For 5 it returns true (expected true); for −1 it returns false (expected false). No test distinguishes 0 from a positive number, so the boundary is unconstrained.</p>
      <p><strong>M2 — <code>x &lt; 0</code>:</strong> killed by Test 1. <code>isPositive(5)</code> returns false but the test expects true.</p>
      <p><strong>M3 — <code>return true;</code>:</strong> killed by Test 2. <code>isPositive(-1)</code> returns true but the test expects false.</p>
      <p><strong>Mutation score</strong> = killed / total = 2 / 3 ≈ <strong>0.67 (67%)</strong>.</p>
      <p><strong>Improving the score.</strong> Add <code>isPositive(0) == false</code>. The original returns false; M1 returns true; so M1 is killed and the score becomes 3 / 3 = 100%.</p>
      <p><strong>Interpretation.</strong> The original suite had full statement coverage but only 67% mutation score: it executed both branches without testing the boundary that defines the function. This is exactly why mutation testing is a better predictor of bug-finding than coverage.</p>`
  },
  {
    id: 'ap-04', topic: 'testing',
    prompt: 'Design a boundary-value test set for this function. List the inputs and the expected result, and say which class of defect each test targets.',
    code: [
      'static double discount(int age, boolean member) {',
      '    if (age &lt; 0 || age &gt; 130) throw new IllegalArgumentException();',
      '    if (age &lt; 18) return 0.50;',
      '    if (member) return 0.20;',
      '    return 0.00;',
      '}'
    ],
    answerHtml: `
      <p><strong>Boundaries.</strong> The predicate boundaries are 0, 18 and 130; the boolean boundary is member true/false. Use one value on each side of each boundary.</p>
      <table class="mini-table">
        <thead><tr><th>Input</th><th>Expected</th><th>Targets</th></tr></thead>
        <tbody>
          <tr><td>age = 17, member = false</td><td>0.50</td><td>Last under-18 value; child branch wins over membership.</td></tr>
          <tr><td>age = 18, member = false</td><td>0.00</td><td>Off-by-one at the age boundary.</td></tr>
          <tr><td>age = 18, member = true</td><td>0.20</td><td>Membership branch is reachable at 18.</td></tr>
          <tr><td>age = 17, member = true</td><td>0.50</td><td>Precedence: child discount, not member discount.</td></tr>
          <tr><td>age = 0, member = false</td><td>0.50</td><td>Lower valid boundary.</td></tr>
          <tr><td>age = 130, member = true</td><td>0.20</td><td>Upper valid boundary.</td></tr>
          <tr><td>age = −1</td><td>IllegalArgumentException</td><td>Invalid input rejected.</td></tr>
          <tr><td>age = 131</td><td>IllegalArgumentException</td><td>Invalid input rejected.</td></tr>
        </tbody>
      </table>
      <p><strong>Additional cases.</strong> A 65-year-old member (0.20) and a 65-year-old non-member (0.00) confirm the boolean branch independently of age. If the function were used for money, also test rounding — floating-point returns are a poor choice for currency.</p>
      <p><strong>Why this set.</strong> Every comparison is exercised at its boundary and just outside it, and branch interactions (age × member) are covered. This is the minimum that would kill the classic mutants <code>&lt;</code>→<code>&lt;=</code> and swapped branches.</p>`
  },
  {
    id: 'ap-05', topic: 'debugging',
    prompt: 'A subset of {1, …, 8} is "interesting" only if it contains both 3 and 6. Trace delta debugging on the full set and show why the answer is {3, 6} rather than a single element.',
    answerHtml: `
      <p><strong>Step 1 — split.</strong> <code>P1 = {1,2,3,4}</code> is not interesting (no 6); <code>P2 = {5,6,7,8}</code> is not interesting (no 3). Both are "No", so this is the interference case, not binary search.</p>
      <p><strong>Step 2 — find D2 (what P1 needs from P2).</strong> Search for a minimal subset of P2 that makes P1 interesting. <code>P1 ∪ {5,6}</code> = {1,2,3,4,5,6} contains 3 and 6 → Yes. Recurse into {5,6}: {5} does not help (no 6), {6} does. So <code>D2 = {6}</code>.</p>
      <p><strong>Step 3 — find D1 (what P2 needs from P1).</strong> Symmetrically, <code>P2 ∪ {3,4}</code> contains 3 and 6 → Yes; narrow to {3}. So <code>D1 = {3}</code>.</p>
      <p><strong>Step 4 — combine.</strong> By unambiguity, <code>(P1 ∪ D2) ∩ (P2 ∪ D1) = D1 ∪ D2 = {3,6}</code> is interesting and minimal.</p>
      <p><strong>Why not one element.</strong> Neither 3 alone nor 6 alone reproduces the failure; the phenomenon requires the combination. Plain binary search assumes the minimal cause is a singleton and would fail here — the interference branch is what makes delta debugging more general than bisection.</p>
      <p><strong>Sanity check.</strong> <code>Interesting({3,6}) = Yes</code> and <code>Interesting({3}) = Interesting({6}) = No</code>, which is exactly 1-minimality.</p>`
  },
  {
    id: 'ap-06', topic: 'defects',
    prompt: 'Triage these reports. For each, propose a severity, a priority and a resolution, and justify briefly.',
    code: [
      'R1: The Android app crashes on launch for every user on Android 14.',
      'R2: The footer says "Copywrite 2025" instead of "Copyright 2025".',
      'R3: Exporting a 3-page invoice to PDF produces a blank page.',
      'R4: A customer requests a dark mode for the dashboard.',
      'R5: "App crashes when opening settings" — cannot reproduce on any device.'
    ],
    answerHtml: `
      <table class="mini-table">
        <thead><tr><th>Report</th><th>Severity</th><th>Priority</th><th>Resolution</th></tr></thead>
        <tbody>
          <tr><td>R1</td><td>Blocker / Critical</td><td>Unbreak Now!</td><td>FIXED</td></tr>
          <tr><td>R2</td><td>Trivial</td><td>Low (but cheap — fix in the next batch)</td><td>FIXED</td></tr>
          <tr><td>R3</td><td>Major</td><td>High</td><td>FIXED</td></tr>
          <tr><td>R4</td><td>Enhancement</td><td>Lowest / Needs Triage</td><td>WONTFIX or backlog</td></tr>
          <tr><td>R5</td><td>Unknown (reported as crash)</td><td>Normal until confirmed</td><td>WORKSFORME or INSUFFICIENTDATA</td></tr>
        </tbody>
      </table>
      <p><strong>R1.</strong> Blocks all Android 14 users from using the product: maximum impact and maximum urgency; the cost of not fixing is total loss of that segment.</p>
      <p><strong>R2.</strong> Cosmetic, no functional impact — low severity. Priority can still be moderate because the fix is a one-line change; severity and priority are independent axes.</p>
      <p><strong>R3.</strong> A core business document is silently wrong for a subset of invoices. Major severity, high priority: the failure is invisible to the user until the PDF is opened elsewhere.</p>
      <p><strong>R4.</strong> A new feature request, not a defect. "Enhancement" severity; triage against the roadmap rather than the bug queue.</p>
      <p><strong>R5.</strong> Cannot reproduce, so the report is not actionable yet. Ask for logs, device, OS version and exact steps; if no evidence arrives, close as WORKSFORME or INSUFFICIENTDATA. Note that "cannot reproduce" is not proof that the bug does not exist.</p>`
  },
  {
    id: 'ap-07', topic: 'process',
    prompt: 'Write acceptance criteria for this user story, covering the happy path, an edge case and a failure case. Then state which of them could be automated.',
    code: [
      'As a registered customer,',
      'I want to reset my password by email,',
      'so that I can regain access to my account.'
    ],
    answerHtml: `
      <p><strong>Happy path.</strong> Given a registered email address, when the customer requests a reset, then a single-use link is sent within 60 seconds and the response is identical whether or not the address exists (no account enumeration).</p>
      <p><strong>Edge case.</strong> Given an existing unexpired link, when the customer requests another reset, then the previous link is invalidated and only the newest link works. Given a link older than 15 minutes, when it is opened, then it is rejected with a message offering a new request.</p>
      <p><strong>Failure case.</strong> Given five reset requests for the same account within one hour, when a sixth is made, then it is rate-limited and the user sees a retry-after message. Given a link that has already been used, when it is opened again, then it is rejected and the password is unchanged.</p>
      <p><strong>Automation.</strong> All of the above can be automated at the API level (token issuance, single use, expiry, rate limit, enumeration-safe response). The email delivery itself is verified with a test mail sink; the exact wording of the email is checked by a content test, not by a human.</p>
      <p><strong>Why this shape.</strong> Acceptance criteria are part of the story and define "done"; Given/When/Then makes each one a testable example, and the negative cases are where most security defects hide.</p>`
  },
  {
    id: 'ap-08', topic: 'devops',
    prompt: 'A payments team releases several times a day. A bad release could double-charge customers. Recommend a deployment strategy and a concrete rollback plan, and justify the choice.',
    answerHtml: `
      <p><strong>Recommendation.</strong> Canary release behind a feature flag, with automated analysis of payment-specific signals, plus a blue/green switch for the database migration. Do not use big bang.</p>
      <p><strong>Why canary.</strong> It limits the blast radius: 1% of traffic, then 5%, 25%, 100%, gated on error rate, latency, decline rate, duplicate-charge alerts and reconciliation totals. The metric that matters is not HTTP 500s but money — a duplicated charge can be a "successful" response.</p>
      <p><strong>Why blue/green for the schema.</strong> A migration cannot be canaried as easily as stateless code; keeping the old environment intact allows an instant traffic switch back while the new schema is still backward compatible. Use expand/contract migrations so both versions can run during the rollout.</p>
      <p><strong>Rollback plan.</strong> (1) Flag off the new code path — fastest, no deploy. (2) Shift traffic back to the previous version. (3) Run the reconciliation job to detect and reverse duplicate charges. (4) Freeze the pipeline and open an incident. Rehearse the rollback in staging; a rollback that has never been tested is a plan, not a capability.</p>
      <p><strong>Trade-off.</strong> Canary needs good observability and enough traffic for statistical signal; blue/green doubles infrastructure cost. Both are cheaper than a nationwide double-charge event.</p>`
  },
  {
    id: 'ap-09', topic: 'requirements',
    prompt: 'Rewrite these requirements so that each is precise and verifiable. State the measurement you would use.',
    code: [
      'R1: The system shall be user-friendly.',
      'R2: The system shall be fast.',
      'R3: The system shall be secure.',
      'R4: The system shall handle a large number of users.'
    ],
    answerHtml: `
      <p><strong>R1 — usability.</strong> "A first-time user can complete checkout without assistance in under 3 minutes; at least 90% of 20 participants in a moderated usability test succeed on the first attempt; the task is completable with a screen reader (WCAG 2.2 AA)." Measurement: task success rate, time on task, accessibility audit.</p>
      <p><strong>R2 — performance.</strong> "p95 server response time ≤ 300 ms and p99 ≤ 800 ms for the checkout API at 5,000 requests per second, measured over a 30-minute load test on production-equivalent hardware." Measurement: load test with a defined workload and percentile targets.</p>
      <p><strong>R3 — security.</strong> "All traffic uses TLS 1.3; passwords are stored with Argon2id; the OWASP ASVS Level 2 checklist is passed; a third-party penetration test finds no critical or high findings before release." Measurement: configuration audit, penetration test report, dependency scan.</p>
      <p><strong>R4 — capacity.</strong> "The system supports 20,000 concurrent sessions with error rate &lt; 0.1% and no degradation of the R2 targets; it scales horizontally to 40,000 sessions within 10 minutes." Measurement: soak and spike tests.</p>
      <p><strong>Principle.</strong> Each rewrite names an observable, a threshold and a measurement procedure — the three things that make a requirement verifiable rather than aspirational.</p>`
  },
  {
    id: 'ap-10',
    topic: 'architecture',
    prompt: 'Critique this design against microservice principles and propose three concrete improvements.',
    code: [
      'checkout -> inventory -> payment -> email   (synchronous HTTP chain)',
      'All four services share one PostgreSQL database.',
      'All four are built and deployed together from one repository.',
      'No timeouts, retries or idempotency keys.',
      'Email failure blocks the checkout response.'
    ],
    answerHtml: `
      <p><strong>Diagnosis.</strong> This is a distributed monolith: the services are separate processes but share a database, a build and a release, so they cannot evolve or fail independently. The synchronous chain means the slowest dependency sets the latency, and an email outage takes down checkout.</p>
      <p><strong>Violations.</strong></p>
      <ul>
        <li><em>Hide implementation details / decentralised data:</em> a shared schema makes every table a public API; a change in one service breaks the others.</li>
        <li><em>Deploy independently:</em> one repository and one pipeline means a change to email requires redeploying checkout.</li>
        <li><em>Isolate failures:</em> no timeouts, retries or circuit breakers, so a slow payment provider exhausts checkout threads. Email — a side effect — is on the critical path.</li>
      </ul>
      <p><strong>Three improvements.</strong></p>
      <ol>
        <li>Give each service its own schema and access path; replace cross-service joins with APIs or events, and use the outbox pattern for reliable publishing.</li>
        <li>Move email off the request path: publish an event and let a worker send it, with retries and a dead-letter queue.</li>
        <li>Add timeouts, bounded retries with exponential backoff and idempotency keys on payment; use a saga or compensating transaction instead of a distributed transaction.</li>
      </ol>
      <p><strong>Also.</strong> Split the repository and pipeline per service, define consumer-driven contract tests, and add tracing so a request can be followed across four hops.</p>`
  },
  {
    id: 'ap-11', topic: 'testing',
    prompt: 'A CI report shows 95% line coverage but 60% branch coverage. What does this tell you, what would you do next, and what would you not do?',
    answerHtml: `
      <p><strong>Interpretation.</strong> Most lines are executed, but many branches are only ever taken in one direction. Typical cause: happy-path tests only; error paths, <code>else</code> branches, guard clauses and short-circuit conditions are never exercised. Line coverage is inflated by long straight-line code and by executing the <code>if</code> without the <code>else</code>.</p>
      <p><strong>Next steps.</strong></p>
      <ol>
        <li>Open the branch report and list the uncovered branches, prioritising money, security and error handling.</li>
        <li>Add tests for the missing sides: invalid input, empty collections, timeouts, permission denied, and boundary values on each predicate.</li>
        <li>Check that the tests assert something — coverage from assertion-free tests is worthless. Use mutation testing on the critical modules to measure assertion strength.</li>
      </ol>
      <p><strong>What not to do.</strong> Do not chase 100% coverage; some branches are defensive or unreachable. Do not write tests that merely execute the line without checking behaviour. Do not gate the build on a coverage percentage alone — it invites gaming and rewards trivial tests.</p>
      <p><strong>Target.</strong> A defensible policy is a high branch-coverage floor on critical modules plus mutation-score thresholds there, and no global percentage target.</p>`
  },
  {
    id: 'ap-12', topic: 'testing',
    prompt: 'You are asked to fuzz a JSON parser that has crashed in production on a malformed payload. Describe a concrete fuzzing setup and the oracle you would use.',
    answerHtml: `
      <p><strong>Seed corpus.</strong> Collect real payloads (anonymised) plus a hand-written set: deeply nested arrays, huge integers, unicode escapes, duplicate keys, truncated input, trailing garbage, NaN/Infinity, BOM, and very long strings.</p>
      <p><strong>Generation.</strong> Use coverage-guided mutation (AFL++ or libFuzzer) rather than pure random bytes, so the fuzzer is rewarded for reaching new parser states. Add a grammar-aware mutator for JSON so structural mutations stay near valid syntax — this reaches semantic edge cases that byte-level mutation rarely finds.</p>
      <p><strong>Oracles.</strong> (1) Crash, abort or sanitizer report (ASan/UBSan) — unambiguous. (2) Hang: a timeout per input. (3) Memory growth across a run. (4) Differential oracle: compare against a reference parser on accept/reject and on the parsed value. (5) Round-trip property: parse → serialise → parse yields the same value.</p>
      <p><strong>Operation.</strong> Run in CI nightly with a time budget, persist the corpus, deduplicate crashes by stack hash, and add every crashing input to a regression suite. Triage by root cause, not by count.</p>
      <p><strong>Limits.</strong> Fuzzing finds robustness bugs, not specification misunderstandings: if the parser accepts something it should reject, only a differential or property oracle will notice.</p>`
  },
  {
    id: 'ap-13', topic: 'oss',
    prompt: 'Your team has linked a GPL-licensed library into a closed-source product that is about to ship. What are your options, and what would you recommend?',
    answerHtml: `
      <p><strong>The constraint.</strong> GPL is copyleft: distributing a work that links the GPL code generally requires the whole combined work to be licensed under the GPL and its source made available to recipients. Shipping the closed binary as-is is a licence violation, not a grey area.</p>
      <p><strong>Options.</strong></p>
      <ol>
        <li><strong>Comply:</strong> release the combined work under the GPL. Usually unacceptable commercially, but legitimate for an internal tool that is never distributed.</li>
        <li><strong>Replace</strong> the library with a permissively licensed (MIT/Apache-2.0) or commercially licensed equivalent — often the cheapest path if the functionality is not unique.</li>
        <li><strong>Isolate</strong> the GPL component in a separate process with a narrow, arguably independent interface. This is legally risky and fact-specific; the FSF and many lawyers treat tight coupling as a single work.</li>
        <li><strong>Buy a commercial licence</strong> or dual-licence from the copyright holder.</li>
        <li><strong>Ask the authors</strong> for an exception — rarely granted, but cheap to try.</li>
      </ol>
      <p><strong>Recommendation.</strong> Replace the library before release, and add a licence-scanning gate to CI so the next dependency is caught at review time. If replacement is impossible, obtain legal advice before shipping; do not rely on a blog post's interpretation of "linking".</p>
      <p><strong>Note.</strong> This is an engineering answer, not legal advice; a real decision needs the organisation's counsel.</p>`
  },
  {
    id: 'ap-14', topic: 'testing',
    prompt: 'An A/B test shows 2.0% conversion for A (n = 5,000) and 2.3% for B (n = 5,000), p = 0.40. The product manager wants to ship B. What do you advise?',
    answerHtml: `
      <p><strong>Read the result correctly.</strong> The observed difference is 0.3 percentage points, but with p = 0.40 it is entirely consistent with chance. The test does not provide evidence that B is better. Shipping B on this evidence is a coin flip with extra process.</p>
      <p><strong>Check the design first.</strong> Was the success metric declared in advance? Was the sample size fixed before the test, or was it stopped when the numbers looked good (peeking inflates false positives)? Were users randomly assigned, and did both groups see the same traffic mix? Were there novelty effects or instrumentation bugs?</p>
      <p><strong>Advice.</strong></p>
      <ul>
        <li>Do not ship on this result. Either extend the test to the pre-computed sample size (a power analysis for a 0.3 pp effect needs a much larger n), or accept that the effect is too small to detect cheaply.</li>
        <li>If the change is low-risk and cheap to maintain, ship it as a deliberate bet — but say that it is a judgement call, not an evidence-based decision.</li>
        <li>Consider a larger effect: the current lift, even if real, may not justify the complexity.</li>
      </ul>
      <p><strong>Principle.</strong> A/B testing is a controlled randomised experiment: randomisation makes it causal, but only a pre-declared metric, adequate power and no peeking make the p-value meaningful.</p>`
  },

  {
    id: 'ap-15', topic: 'testing',
    prompt: 'These two predicates come from the lecture’s oracle puzzles. Find an input that makes each return True, and explain what the exercise demonstrates about test data and oracles.',
    code: [
      'def p1(x):',
      '    if x * x - 10 == 15:',
      '        return True',
      '    return False',
      '',
      'def p2(x):',
      '    if x > 0 and x < 1000:',
      '        if ((x - 32) * 5 / 9 == 100):',
      '            return True',
      '    return False'
    ],
    answerHtml: `
      <p><strong>p1.</strong> The condition is <code>x² = 25</code>, so <code>x = 5</code> or <code>x = −5</code>. Both make the predicate true; a test generator that returns only the first witness is still correct, but the boundary of the domain matters.</p>
      <p><strong>p2.</strong> The inner condition is Fahrenheit-to-Celsius: <code>(x − 32) × 5/9 = 100</code>, so <code>x = 212</code>. The guard <code>0 &lt; x &lt; 1000</code> is satisfied, so 212 is the witness.</p>
      <p><strong>What it shows.</strong> Finding an input that makes a predicate true is a search problem over the input domain — exactly what test-data generation does. It also shows why an oracle is essential: knowing a witness exists does not tell you whether the program’s output is correct, only that this path is reachable.</p>
      <p><strong>Hidden trap.</strong> p2 relies on exact floating-point equality (<code>== 100</code>). It happens to work for 212, but such comparisons are brittle in general; a better predicate uses a tolerance. That is a defect in the test, not in the search.</p>`
  }
];

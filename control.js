window.AFC_TOPICS.push(
  {
    id: "budget",
    title: "Budgeting & Control",
    description: "From sales to cash needs, through inventories, production costs and divisional responsibility.",
    source: "Lecture 18 · Budgeting Part 1. Prerequisite 02 · Cost Accounting. Exam Questions · sections 3.1, 3.2 and 3.4.",
    notes: [
      {
        title: "From quantities to operating profit",
        body: "The sales budget estimates quantities and prices by product. The inventory policy determines how many units to produce and, through technical standards, how many hours and materials are needed. The cost of goods left in inventory goes to the income statement when those goods are sold. Subtracting cost of goods sold and period costs from revenue gives budgeted EBIT."
      },
      {
        title: "Three ways to read a cost",
        body: "To assign a cost, ask which object you are measuring and whether its consumption can be traced. To value inventories, identify the manufacturing costs. To simulate a change in volume, identify the fixed and the variable part within the relevant range. Factory rent can be at the same time indirect with respect to the product, fixed and a manufacturing cost."
      },
      {
        title: "How to allocate common costs",
        body: "A single base spreads total overheads through one driver, such as machine hours. In activity-based costing, resources are first assigned to activities. Each activity is then charged to products according to a driver that explains its consumption, such as the number of setups. For a central service, a rate per unit of use shows divisions the cost of their requests."
      },
      {
        title: "From capex to liquidity",
        body: "An investment paid today absorbs cash and creates an asset. Depreciation spreads the depreciable amount over the useful life. In the cash budget, order receipts and payments by their actual date and check the minimum balance in each period. A company can earn an annual profit and still need credit in the month it pays for a machine."
      },
      {
        title: "Targets and responsibilities",
        body: "The master budget coordinates operating budgets, investments and financial budgets. At the end of the period, comparing actuals with targets helps separate the causes of variances and decide on action. For discretionary spending, incremental budgeting updates a historical base, while zero-based budgeting requires activities and resources to be justified starting from the minimum service level."
      }
    ],
    formulas: [
      {name: "Planned production", expression: "Units produced = units sold + closing inventory − opening inventory", detail: "All terms are physical quantities of finished goods. A higher closing inventory requires additional production."},
      {name: "Materials purchases", expression: "Purchases = units produced × usage per unit + closing RM inventory − opening RM inventory", detail: "First calculate the kilograms, litres or pieces needed. Multiply the quantity purchased by the purchase price to get the expected spend."},
      {name: "Cost of goods sold", expression: "COGS = opening FG inventory + cost of goods completed + purchases of finished goods − closing FG inventory", detail: "All values are monetary. The cost of goods completed already reflects any change in work in progress."},
      {name: "Direct labour", expression: "Cost = Σ (units to produce × standard hours per unit × hourly rate)", detail: "Treat products, operations and grades separately when they require different times or rates."},
      {name: "Overhead allocation", expression: "Share = (cost of the activity pool / total driver units) × units consumed", detail: "An hours-based share uses a rate in euros per hour. In ABC, repeat the calculation for each relevant activity."},
      {name: "Cash before financing", expression: "Closing cash = opening cash + expected receipts − expected payments", detail: "To cover a minimum balance, the additional financing required is the greater of zero and the difference between the minimum balance and the expected cash."}
    ],
    questions: [
      {
        id: "budget-01", type: "choice", level: 1, prompt: "Which forecast is normally the starting point for the operating budget of a manufacturer that plans around demand?",
        options: ["Depreciation charges", "Saleable quantities and prices by product", "Loan balances at year-end", "Proposed dividends"], answer: 1,
        explanation: "Saleable quantities and prices feed the revenue budget. Quantities, together with the inventory policy, drive production and requirements."
      },
      {
        id: "budget-02", type: "multi", level: 1, prompt: "Which items are part of the manufacturing cost of a lamp?",
        options: ["The metal used in the lamp", "The brand’s advertising campaign", "Depreciation of shared presses", "Hours worked by assembly staff"], answer: [0, 2, 3],
        explanation: "Metal and assembly labour are direct costs. Depreciation of the presses is a manufacturing overhead. The advertising campaign is a selling expense of the period."
      },
      {
        id: "budget-03", type: "number", level: 1, context: "A workshop plans to sell 1,260 kits. It has 180 at the start of the month and wants to finish with 240 kits ready.",
        prompt: "How many kits must it produce?", answer: 1320, tolerance: 0, unit: "kits",
        explanation: "It needs 1,260 kits for sales and another 60 to raise inventory from 180 to 240. Production is 1,260 + 240 − 180 = 1,320 kits."
      },
      {
        id: "budget-04", type: "order", level: 2, prompt: "A material is bought specifically for the month. Order the steps to build its purchases budget.",
        options: ["Apply the standard usage per piece", "Value the quantity to purchase at the expected price", "Define the quantities of finished goods to produce", "Adjust the requirement for opening and closing materials inventory"], answer: [2, 0, 3, 1],
        explanation: "Production determines materials usage. Inventories give you the quantity to order. Applying the purchase price gives the monetary value."
      },
      {
        id: "budget-05", type: "number", level: 2, context: "Producing 900 pieces requires 1.5 kg of copper per piece. Opening inventory is 110 kg and the closing target is 160 kg. New copper costs €8/kg.",
        prompt: "What is the value of copper purchases?", answer: 11200, tolerance: 0.01, unit: "€",
        explanation: "Usage is 900 × 1.5 = 1,350 kg. You need to buy 1,350 + 160 − 110 = 1,400 kg. At a unit price of €8 the value is €11,200."
      },
      {
        id: "budget-06", type: "number", level: 2, context: "The department produces 320 pieces of A at 15 minutes each and 180 pieces of B at 30 minutes each. The rate is €24 an hour.",
        prompt: "What is the total direct labour cost?", answer: 4080, tolerance: 0.01, unit: "€",
        explanation: "A takes 320 × 15 / 60 = 80 hours and B takes 180 × 30 / 60 = 90 hours. The cost is (80 + 90) × 24 = €4,080."
      },
      {
        id: "budget-07", type: "choice", level: 1, prompt: "Within the normal capacity range, the factory’s annual rent is fixed. If output doubles, what happens?",
        options: ["Total rent doubles", "Rent per unit doubles", "Total rent stays the same and rent per unit halves", "Rent disappears from production cost"], answer: 2,
        explanation: "A fixed cost stays constant in total within the relevant capacity range. Dividing the same amount by twice the units halves the average cost per unit."
      },
      {
        id: "budget-08", type: "number", level: 2, context: "All figures are in € thousand. Opening finished goods inventory 38, production completed at cost 215, purchases of finished goods for resale 12, closing finished goods inventory 47.",
        prompt: "Calculate cost of goods sold.", answer: 218, tolerance: 0.01, unit: "thousand €",
        explanation: "The cost of goods available for sale is 38 + 215 + 12 = 265. Of this, 47 remains in closing inventory. The cost attributable to sales is therefore 218."
      },
      {
        id: "budget-09", type: "multi", level: 2, prompt: "What information do you need to calculate the share of a cost centre charged to a product using a single allocation base?",
        options: ["Total cost of the centre to be allocated", "Total volume of the allocation base", "The main competitor’s list price", "Units of the base consumed by the product"], answer: [0, 1, 3],
        explanation: "The centre’s cost divided by the total base gives the allocation rate. Multiplying it by the base consumed by the product gives the share. A competitor’s list price has nothing to do with this procedure."
      },
      {
        id: "budget-10", type: "number", level: 3, context: "A workshop uses ABC. Setups cost €36,000 for 120 setups. Machining costs €50,000 for 2,500 machine hours. Job R requires 4 setups and 16 machine hours.",
        prompt: "How much overhead is charged to job R?", answer: 1520, tolerance: 0.01, unit: "€",
        explanation: "One setup costs 36,000 / 120 = €300. One machine hour costs 50,000 / 2,500 = €20. The job absorbs 4 × 300 + 16 × 20 = €1,520."
      },
      {
        id: "budget-11", type: "choice", level: 2, prompt: "A manager has to justify the minimum service level of their function and compare it with packages of additional activities. Which method are they applying?",
        options: ["Incremental budgeting", "Overhead allocation on machine hours", "Zero-based budgeting", "Vertical analysis of the financial statements"], answer: 2,
        explanation: "Zero-based budgeting requires justifying the activities to be funded and comparing alternatives. In the incremental method, the starting point is historical spending."
      },
      {
        id: "budget-12", type: "number", level: 2, context: "In January a company pays €84,000 for a machine that is immediately available. It is used only in the administrative offices. Its useful life is 7 years, its residual value is zero and straight-line depreciation applies for a full year.",
        prompt: "By how much does depreciation alone reduce the year’s EBIT? Enter the positive amount.", answer: 12000, tolerance: 0.01, unit: "€",
        explanation: "The annual charge is 84,000 / 7 = €12,000. Because the machine is used for administration, the whole charge is a period cost and reduces the year’s EBIT. The cash budget records the initial payment of €84,000."
      },
      {
        id: "budget-13", type: "number", level: 3, context: "March starts with €18,000 of cash. Expected receipts are €52,000, operating payments €61,000 and a payment for equipment €20,000. The minimum cash required at month-end is €6,000.",
        prompt: "How much new financing is needed, assuming there are no other flows?", answer: 17000, tolerance: 0.01, unit: "€",
        explanation: "Before financing, the expected balance is 18,000 + 52,000 − 61,000 − 20,000 = −€11,000. To close at +€6,000 you need €17,000."
      },
      {
        id: "budget-14", type: "choice", level: 2, prompt: "The annual budget shows positive closing cash, but a large payment to suppliers falls due in June. Which document lets you estimate the credit needed in June?",
        options: ["The annual income statement alone", "The ranking of customers by revenue", "The fixed asset register", "The cash budget with intra-year balances and due dates"], answer: 3,
        explanation: "The cash budget rebuilds the opening balance, receipts and payments for each period. It can reveal a temporary shortfall that a positive annual balance hides."
      },
      {
        id: "budget-15", type: "number", level: 2, context: "The central legal office charges divisions a rate set at €75 per hour of advice. The North division uses 160 hours, South 100 and East 60.",
        prompt: "How much is charged to the North division?", answer: 12000, tolerance: 0.01, unit: "€",
        explanation: "With a predetermined rate, the cost charged depends on the hours requested by each division. North pays 160 × 75 = €12,000."
      },
      {
        id: "budget-16", type: "choice", level: 3, context: "The group allocates a fixed central cost between A and B in proportion to their revenue. B’s revenue increases, while A’s revenue and A’s use of the service stay the same.",
        prompt: "How does the cost charged to A change?", options: ["It falls, because A’s share of total revenue decreases", "It grows with B’s revenue", "It stays the same because A uses the same hours", "It automatically becomes equal to A’s variable cost"], answer: 0,
        explanation: "A’s charge is central cost × A’s revenue / (A’s revenue + B’s revenue). Increasing only the denominator lowers A’s share. The case shows how the chosen criterion affects the evaluation of managers."
      },
      {
        id: "budget-17", type: "order", level: 1, prompt: "Order the phases of a control cycle, from setting targets to management action.",
        options: ["Compare actuals with the budget and interpret the variance", "Decide on corrective action", "Set budget targets and resources", "Measure actual results"], answer: [2, 3, 0, 1],
        explanation: "Targets and resources are set first. Measurement produces data that can be compared with the budget. Variance analysis then helps choose how to act."
      },
      {
        id: "budget-18", type: "number", level: 3, context: "The budget plans to sell 3,000 units at €48 each. The cost of goods completed is €91,000. Finished goods inventory goes from €9,000 to €13,000. Budgeted selling and administrative costs are €24,000. There are no purchases of finished goods and no other operating costs.",
        prompt: "Calculate budgeted EBIT.", answer: 33000, tolerance: 0.01, unit: "€",
        explanation: "Revenue is 3,000 × 48 = €144,000. Cost of goods sold is 9,000 + 91,000 − 13,000 = €87,000. Subtracting the period costs as well gives EBIT of €33,000."
      },
      {
        id: "budget-19", type: "choice", level: 2, prompt: "Each prototyping job uses different materials and hours, recorded on a dedicated job sheet. Which system lets you compare the cost of a single job with its quote?",
        options: ["Process costing with a single average cost for all production", "Job costing with direct tracing and overhead allocation", "Only daily cash receipts accounting", "Allocating revenue based on assets"], answer: 1,
        explanation: "In job costing, traceable costs are recorded on the job and a share of overheads is assigned to it. The total on the sheet can be compared with the quote for the same job."
      },
      {
        id: "budget-20", type: "number", level: 2, context: "During the month, all work starts from scratch. 600 units are completed and another 100 remain in progress, 40% complete with respect to conversion costs.",
        prompt: "How many equivalent units absorb the month’s conversion costs?", answer: 640, tolerance: 0, unit: "equivalent units",
        explanation: "The 600 completed units each absorb a full share. The work done on the others equals 100 × 40% = 40 complete units. The base is therefore 640."
      }
    ]
  },
  {
    id: "ai",
    title: "AI for AFC",
    description: "Build verifiable analyses with AI, from financial statement sources to checking KPIs and assumptions.",
    source: "Lecture 09 · Generative AI in Accounting, Finance & Control. Exercises on prompts, annual reports, KPI selection and audit trails.",
    notes: [
      {title: "Set up a verifiable request", body: "Define who will read the work, what decision they need to make and which period matters. Identify the permitted documents, write down the ratio definitions and ask for starting values, calculations and page references. Specify how missing data should be flagged. That way a second person can redo the analysis and discuss the choices."},
      {title: "Trace a number back to its source", body: "For each result, keep the request, document and page, operation, the model’s conclusion and the human check. Open the page and check the financial year, consolidation scope, currency, scale and signs. Recalculate the ratio from the verified inputs and reconcile the totals. Two models can repeat the same wrong extraction."},
      {title: "Separate observations from causes", body: "An increase in inventories is measured between two dates. Possible causes include a product launch, lower sales or changes in scope. Write down what you observed, identify an alternative and point to the note or operating data that could tell the explanations apart. Report guidance as management’s forecast."},
      {title: "Select KPIs and build scenarios", body: "Start from the board’s question. For each indicator, check availability, definition, comparability with competitors and the extra information it adds. In projections, link each assumption to evidence and vary the most uncertain driver to measure its impact. A sensitivity quantifies the exposure to a hypothetical change."},
      {title: "Protect data and keep your judgement", body: "For exercises, choose public data. At a company, check which tools are authorised to process the document and which access rights are granted. An internal report can contain confidential forecasts even after names are removed. The final decision requires a person who can rebuild the analysis and justify it."}
    ],
    formulas: [
      {name: "Balance sheet check", expression: "Gap = assets − liabilities − equity", detail: "Expected to be zero for the same scope, date and units, apart from documented rounding. A gap is a prompt to recheck the extracted items."},
      {name: "EBIT sensitivity", expression: "Δ EBIT = revenue × Δ gross margin", detail: "Valid when revenue and the operating costs below gross margin are unchanged. For one percentage point, use 0.01 as the margin change."},
      {name: "Change between percentages", expression: "Δ in percentage points = final percentage − initial percentage", detail: "A margin going from 10% to 12% rises by 2 percentage points. The relative change compared with the initial 10% is 20%."}
    ],
    questions: [
      {
        id: "ai-01", type: "choice", level: 1, prompt: "You want another person to check the operating margin. Which request produces the most easily reproducible result?",
        options: ["Compare the group with the industry average and comment on operating efficiency", "Describe the causes of the change in the margin reported in the investor presentation", "Use the attached consolidated statements, report page, EBIT, revenue and units, then calculate EBIT / revenue", "Estimate the group’s margin from the results of competitors operating in the same segment"], answer: 2,
        explanation: "Document, scope, formula and starting data make it possible to check the extraction and repeat the calculation. The reader can then assess the commentary after verifying the figure."
      },
      {
        id: "ai-02", type: "multi", level: 1, prompt: "Which elements make a ratio line in the audit trail verifiable?",
        options: ["The reference to the prompt and to the document with its page", "The confidence level stated by the AI as the only evidence", "The extracted values, the operation and the proposed result", "The human check with its outcome and any correction"], answer: [0, 2, 3],
        explanation: "The trail links request, source, calculation, conclusion and check. A confidence statement can accompany the analysis, but it documents neither the origin nor the accuracy of the inputs."
      },
      {
        id: "ai-03", type: "choice", level: 1, context: "Gross margin falls from 43% to 40%. The AI attributes this to trade discounts. The file provided only shows sales, cost of goods sold and inventory values.",
        prompt: "Which conclusion is supported by the evidence?", options: ["Discounts certainly caused the whole decrease", "The margin loses 3 percentage points. The role of discounts requires data on prices and mix", "Unit costs necessarily rose by 3%", "The fall in margin proves a decrease in revenue in absolute terms"], answer: 1,
        explanation: "The change in margin can be observed directly. The same symptom can come from changes in prices, costs or mix. Attributing the cause to discounts requires further evidence."
      },
      {
        id: "ai-04", type: "number", level: 1, context: "An automated extraction reports, in € million, assets of 248, liabilities of 156 and equity of 86.",
        prompt: "Calculate the gap as assets minus liabilities minus equity.", answer: 6, tolerance: 0.01, unit: "million €",
        explanation: "248 − 156 − 86 = 6 million. Before using these values, go back to the statement, look for missing lines or scope errors and repeat the check."
      },
      {
        id: "ai-05", type: "choice", level: 2, prompt: "A model cites page 112 as the source for financial debt, but the page only contains an organisation chart. What do you do?",
        options: ["Accept the figure if it matches the summary generated by the same model", "Replace the page number with the one from the table of contents", "Use the previous year’s debt as the actual figure until a correction is published", "Look for the item and its definition in the document and stop using the figure until it is confirmed"], answer: 3,
        explanation: "A citation is verified by opening the document. Finding the relevant note lets you check what the debt includes, the reference date and the amount presented."
      },
      {
        id: "ai-06", type: "multi", level: 2, prompt: "Two companies both publish an adjusted EBITDA. What do you check before comparing the margins?",
        options: ["The reconciliations between the published measure and the accounting figures", "Whether the excluded adjustments are of the same nature", "Whether the two indicators have the same name, taking this as sufficient proof of comparability", "Scope, period and the revenue used in the denominator"], answer: [0, 1, 3],
        explanation: "Alternative performance measures can exclude different items even when they share a name. Rebuild the adjustments and use comparable time and operating bases before commenting on the gap."
      },
      {
        id: "ai-07", type: "number", level: 2, context: "The income statement table is in € thousand and reports revenue of 84,000. The analyst must present all figures in € million.",
        prompt: "What value should be entered for revenue?", answer: 84, tolerance: 0.001, unit: "million €",
        explanation: "A quantity in thousands is divided by 1,000 to express it in millions. The value to enter is 84,000 / 1,000 = €84 million."
      },
      {
        id: "ai-08", type: "order", level: 2, prompt: "Put the AI-assisted financial analysis process presented in class back in order.",
        options: ["Verify sources and calculations", "Frame the question", "Exercise final judgement", "Select the permitted evidence", "Stress-test the conclusion", "Analyse the data"], answer: [1, 3, 5, 4, 0, 2],
        explanation: "You start from the question, define the sources and analyse the data. You then look for alternative interpretations, verify results and sources, and finally decide."
      },
      {
        id: "ai-09", type: "choice", level: 1, prompt: "For a classroom simulation you have the internal budget, with prices that are still confidential, and an annual report that has already been published. You are using a personal account. Which input do you choose?",
        options: ["The budget, after deleting only the author’s name", "The public annual report relevant to the question", "The budget converted into percentages, leaving launch prices and commercial assumptions visible", "Both, after merging public data and confidential assumptions into a single sheet"], answer: 1,
        explanation: "The published annual report fits the use of public data in the exercise. Forecasts, prices and strategic assumptions remain confidential even if the author’s name is removed."
      },
      {
        id: "ai-10", type: "choice", level: 2, prompt: "The financial statements lack the detail needed to rebuild a product-mix KPI. The model proposes using the industry average instead. How do you classify the KPI in the company’s data?",
        options: ["Reported figure", "Figure verified by analogy", "Not determinable from the available data", "Accounting figure adjusted by the auditor"], answer: 2,
        explanation: "An external average can become an explicit assumption in a scenario. The company’s historical KPI requires data on its actual mix."
      },
      {
        id: "ai-11", type: "number", level: 2, context: "In the scenario sheet the AI keeps revenue at 260 million and other operating expenses constant. Your assumption cuts gross margin from 38% to 36.5%.",
        prompt: "How much does EBIT decrease? Enter the positive amount.", answer: 3.9, tolerance: 0.01, unit: "million €",
        explanation: "The margin loses 1.5 percentage points. With fixed revenue, 260 × 0.015 = 3.9 million less gross margin. With other expenses unchanged, EBIT falls by the same amount."
      },
      {
        id: "ai-12", type: "multi", level: 2, context: "Consolidated revenue rises by 20% and during the year the group acquired a company. The model writes “strong organic growth”.",
        prompt: "Which checks help assess this explanation?", options: ["The acquired company’s contribution and its consolidation date", "Higher consolidated cash receipts as sufficient proof that growth is organic", "Any reconciliation between reported and organic growth", "Currency effects and a like-for-like comparison"], answer: [0, 2, 3],
        explanation: "The consolidated figure includes changes in scope and can include a currency effect. The contribution of acquisitions and the company’s reconciliations help isolate the growth of the pre-existing business."
      },
      {
        id: "ai-13", type: "choice", level: 2, prompt: "Two systems produce the same ROE from an automatically extracted table. Which check adds independent evidence?",
        options: ["Verify profit and equity in the financial statements and recompute the ratio with the same stated convention", "Ask a third model to rephrase the two results without consulting the statements", "Take the average of the two identical results", "Increase the number of decimals in the calculation using the same extracted table"], answer: 0,
        explanation: "The systems may share a wrong starting figure. Checking the profit line, the scope of equity and the time convention verifies the basis of the ratio as well as the arithmetic."
      },
      {
        id: "ai-14", type: "number", level: 3, context: "The brief defines net financial debt as bank loans plus lease liabilities minus available cash. In € million, the financial statements report bank loans of 44, leases of 11 and cash of 63. The model proposes +8.",
        prompt: "Which signed value should be reported under the brief’s definition?", answer: -8, tolerance: 0.01, unit: "million €",
        explanation: "44 + 11 − 63 = −8. Cash exceeds the debt included by 8 million. A measure presented as net cash would have the opposite sign, so the convention must be stated."
      },
      {
        id: "ai-15", type: "choice", level: 3, prompt: "Management expects a margin recovery in the second half. Which wording correctly separates source, horizon and uncertainty?",
        options: ["The recovery has already been booked", "Confirmation in a second analyst’s commentary is enough to present the recovery as secured", "The recovery is certain if it is mentioned in the investor slides", "Management expects a recovery, which in the scenario depends on the assumptions about prices and costs"], answer: 3,
        explanation: "The observable fact is management’s communication. Whether the recovery actually happens remains uncertain. Making the drivers explicit lets you build a scenario that can be checked in later periods."
      },
      {
        id: "ai-16", type: "multi", level: 3, prompt: "The board asks whether the group can finance its growth. Which criteria make a short list of KPIs appropriate?",
        options: ["Each indicator helps answer the question", "The KPIs are always the ones the model suggests first", "The data are available or can be rebuilt with explicit definitions", "Profitability, liquidity and leverage are covered while avoiding uninformative duplicates"], answer: [0, 2, 3],
        explanation: "The set must focus on the decision and be supported by traceable data. Assessing coverage and overlaps lets you reduce the number of ratios without losing essential aspects."
      },
      {
        id: "ai-17", type: "choice", level: 2, context: "An AI-generated slide is very polished. The controller approves it straight away, even though they normally check the arithmetic of tables produced by hand.",
        prompt: "Which risk best describes this behaviour?", options: ["Anchoring to the previous period’s value", "Selecting only evidence that supports an initial thesis", "Automation bias", "Sampling error in the choice of peers"], answer: 2,
        explanation: "Automation bias makes people more ready to accept the output of an automated system. Applying the same checks on evidence and calculations to all work reduces this asymmetry."
      },
      {
        id: "ai-18", type: "order", level: 2, prompt: "Order the operations needed to verify a ratio once its definition has been set.",
        options: ["Perform the calculation on consistent inputs", "Record the comparison with the AI output and the outcome of the check", "Locate the formula’s items in the financial statements", "Bring the amounts found to a consistent scope and unit"], answer: [2, 3, 0, 1],
        explanation: "Identify the original items, check them and make them consistent where needed. After recalculating the ratio you can compare it with the automated output and record any corrections in the trail."
      }
    ]
  }
);

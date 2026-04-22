import type { ChartSpec } from "./orwell-charts";
import { PALETTE } from "./orwell-charts";

export type Category = "task1" | "task2" | "paragraph";

export interface OrwellAssignment {
  id: string;
  category: Category;
  subtype: string;
  title: string;
  prompt: string;
  minWords: number;
  chart?: ChartSpec;
  context?: string;
}

export const TASK1_ASSIGNMENTS: OrwellAssignment[] = [
  {
    id: "task1-1",
    category: "task1",
    subtype: "Bar Chart",
    title: "Task 1 — Bar Chart: Car ownership",
    minWords: 150,
    prompt:
      "The bar chart below shows the percentage of households owning one car, two cars, or no car in four different countries in 2015.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "bar",
      title: "Percentage of households and car ownership, 2015",
      subtitle: "Source: National housing surveys",
      yLabel: "Percentage of households (%)",
      categories: ["UK", "Germany", "Japan", "Brazil"],
      series: [
        { name: "No car", color: PALETTE.rose, values: [25, 18, 42, 55] },
        { name: "One car", color: PALETTE.teal, values: [45, 38, 40, 35] },
        { name: "Two or more", color: PALETTE.sky, values: [30, 44, 18, 10] },
      ],
    },
  },
  {
    id: "task1-2",
    category: "task1",
    subtype: "Bar Chart",
    title: "Task 1 — Bar Chart: Leisure activities by age",
    minWords: 150,
    prompt:
      "The chart below shows the number of hours per week spent on four leisure activities by people in three age groups in a European country in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "bar",
      title: "Hours per week spent on leisure activities, by age group (2022)",
      yLabel: "Hours per week",
      categories: ["Reading", "Watching TV", "Exercising", "Socialising"],
      series: [
        { name: "15–25", color: PALETTE.teal, values: [3, 14, 8, 12] },
        { name: "26–45", color: PALETTE.sky, values: [5, 16, 6, 7] },
        { name: "46+", color: PALETTE.amber, values: [9, 22, 4, 5] },
      ],
    },
  },
  {
    id: "task1-3",
    category: "task1",
    subtype: "Bar Chart",
    title: "Task 1 — Bar Chart: University subjects",
    minWords: 150,
    prompt:
      "The bar chart below shows the number of male and female students enrolled in five university subjects in one country in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "bar",
      title: "Male and female enrolments by university subject, 2023 (in thousands)",
      yLabel: "Students (thousands)",
      categories: ["Engineering", "Medicine", "Business", "Education", "Arts"],
      series: [
        { name: "Male", color: PALETTE.sky, values: [38, 22, 30, 10, 14] },
        { name: "Female", color: PALETTE.rose, values: [12, 28, 26, 32, 26] },
      ],
    },
  },
  {
    id: "task1-4",
    category: "task1",
    subtype: "Line Graph",
    title: "Task 1 — Line Graph: Internet users",
    minWords: 150,
    prompt:
      "The line graph below shows the percentage of the population using the internet in three countries between 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "line",
      title: "Percentage of population using the internet, 2000–2020",
      yLabel: "% of population",
      xLabel: "Year",
      xValues: ["2000", "2005", "2010", "2015", "2020"],
      series: [
        { name: "UK", color: PALETTE.teal, values: [26, 57, 80, 92, 96] },
        { name: "China", color: PALETTE.rose, values: [2, 9, 34, 50, 70] },
        { name: "India", color: PALETTE.amber, values: [1, 3, 8, 24, 50] },
      ],
    },
  },
  {
    id: "task1-5",
    category: "task1",
    subtype: "Line Graph",
    title: "Task 1 — Line Graph: Average temperatures",
    minWords: 150,
    prompt:
      "The graph below shows average monthly temperatures recorded in two cities in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "line",
      title: "Average monthly temperature (°C) in London and Sydney, 2022",
      yLabel: "Temperature (°C)",
      xLabel: "Month",
      xValues: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      series: [
        { name: "London", color: PALETTE.sky, values: [5, 8, 14, 20, 15, 8] },
        { name: "Sydney", color: PALETTE.amber, values: [26, 23, 17, 12, 16, 22] },
      ],
    },
  },
  {
    id: "task1-6",
    category: "task1",
    subtype: "Line Graph",
    title: "Task 1 — Line Graph: Crime trends",
    minWords: 150,
    prompt:
      "The line graph below shows the number of reported crimes per 1,000 people in a European city between 1990 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "line",
      title: "Reported crimes per 1,000 people, 1990–2020",
      yLabel: "Crimes per 1,000 people",
      xLabel: "Year",
      xValues: ["1990", "1995", "2000", "2005", "2010", "2015", "2020"],
      series: [
        { name: "Theft", color: PALETTE.rose, values: [70, 82, 75, 55, 45, 38, 32] },
        { name: "Violent crime", color: PALETTE.amber, values: [18, 22, 26, 24, 20, 18, 16] },
        { name: "Cybercrime", color: PALETTE.violet, values: [1, 2, 5, 14, 28, 42, 60] },
      ],
    },
  },
  {
    id: "task1-7",
    category: "task1",
    subtype: "Pie Chart",
    title: "Task 1 — Pie Chart: Household energy use",
    minWords: 150,
    prompt:
      "The pie chart below shows how energy was used in an average household in the United Kingdom in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "pie",
      title: "Household energy use in the UK, 2020",
      subtitle: "Proportion of total energy consumed",
      segments: [
        { label: "Heating", value: 52, color: PALETTE.rose },
        { label: "Hot water", value: 18, color: PALETTE.amber },
        { label: "Cooking", value: 8, color: PALETTE.emerald },
        { label: "Lighting", value: 6, color: PALETTE.sky },
        { label: "Appliances", value: 16, color: PALETTE.violet },
      ],
    },
  },
  {
    id: "task1-8",
    category: "task1",
    subtype: "Pie Chart",
    title: "Task 1 — Pie Chart: Student spending",
    minWords: 150,
    prompt:
      "The pie chart below shows how university students in one country spent their monthly budget in 2021.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "pie",
      title: "Average monthly student spending, 2021",
      segments: [
        { label: "Rent", value: 40, color: PALETTE.teal },
        { label: "Food", value: 22, color: PALETTE.amber },
        { label: "Transport", value: 12, color: PALETTE.sky },
        { label: "Entertainment", value: 10, color: PALETTE.rose },
        { label: "Books & study", value: 8, color: PALETTE.violet },
        { label: "Other", value: 8, color: PALETTE.slate },
      ],
    },
  },
  {
    id: "task1-9",
    category: "task1",
    subtype: "Pie Chart",
    title: "Task 1 — Pie Chart: Waste composition",
    minWords: 150,
    prompt:
      "The pie chart below shows the main components of household waste in a typical town in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "pie",
      title: "Composition of household waste, 2022",
      segments: [
        { label: "Food waste", value: 32, color: PALETTE.emerald },
        { label: "Paper & card", value: 24, color: PALETTE.amber },
        { label: "Plastic", value: 18, color: PALETTE.sky },
        { label: "Glass", value: 8, color: PALETTE.violet },
        { label: "Metal", value: 6, color: PALETTE.slate },
        { label: "Other", value: 12, color: PALETTE.rose },
      ],
    },
  },
  {
    id: "task1-10",
    category: "task1",
    subtype: "Process Diagram",
    title: "Task 1 — Process: The water cycle",
    minWords: 150,
    prompt:
      "The diagram below shows the water cycle, which is the continuous movement of water on, above and below the Earth's surface.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "process",
      title: "The water cycle",
      render: "water-cycle",
    },
  },
  {
    id: "task1-11",
    category: "task1",
    subtype: "Process Diagram",
    title: "Task 1 — Process: Paper recycling",
    minWords: 150,
    prompt:
      "The diagram below shows how waste paper is recycled.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "process",
      title: "The process of recycling paper",
      render: "paper-recycling",
    },
  },
  {
    id: "task1-12",
    category: "task1",
    subtype: "Process Diagram",
    title: "Task 1 — Process: Honey production",
    minWords: 150,
    prompt:
      "The diagram below shows how honey is produced by bees and harvested for sale.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "process",
      title: "How honey is produced",
      render: "honey-production",
    },
  },
  {
    id: "task1-13",
    category: "task1",
    subtype: "Map",
    title: "Task 1 — Map: Village development",
    minWords: 150,
    prompt:
      "The maps below show a small village in 1990 and the same village in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "map",
      title: "Development of a village, 1990 vs 2020",
      render: "village-1990-2020",
    },
  },
  {
    id: "task1-14",
    category: "task1",
    subtype: "Map",
    title: "Task 1 — Map: Park redevelopment",
    minWords: 150,
    prompt:
      "The maps below show Riverside Park in 2010 and after a recent redevelopment.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "map",
      title: "Riverside Park, before and after redevelopment",
      render: "park-before-after",
    },
  },
  {
    id: "task1-15",
    category: "task1",
    subtype: "Map",
    title: "Task 1 — Map: School expansion",
    minWords: 150,
    prompt:
      "The maps below show the layout of a school in 2005 and the same school in 2025 after expansion.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "map",
      title: "School layout, 2005 vs 2025",
      render: "school-layout-change",
    },
  },

  // ── Multiple Graphs (combined data) ──────────────────────────────────────
  {
    id: "task1-16",
    category: "task1",
    subtype: "Multiple Graphs",
    title: "Task 1 — Multiple Graphs: Household waste & recycling",
    minWords: 150,
    prompt:
      "The pie chart below shows the main components of household waste produced in a European country in 2022, and the bar chart shows the percentage of each component that was recycled in the same year.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "multi",
      charts: [
        {
          type: "pie",
          title: "Composition of household waste, 2022",
          segments: [
            { label: "Food waste", value: 30, color: PALETTE.emerald },
            { label: "Paper & card", value: 22, color: PALETTE.amber },
            { label: "Plastic", value: 20, color: PALETTE.sky },
            { label: "Glass", value: 10, color: PALETTE.violet },
            { label: "Metal", value: 8, color: PALETTE.slate },
            { label: "Other", value: 10, color: PALETTE.rose },
          ],
        },
        {
          type: "bar",
          title: "Percentage of each waste type recycled, 2022",
          yLabel: "% recycled",
          categories: ["Food", "Paper", "Plastic", "Glass", "Metal", "Other"],
          series: [
            { name: "Recycled", color: PALETTE.teal, values: [25, 78, 35, 70, 82, 12] },
          ],
        },
      ],
    },
  },
  {
    id: "task1-17",
    category: "task1",
    subtype: "Multiple Graphs",
    title: "Task 1 — Multiple Graphs: Internet users & online activities",
    minWords: 150,
    prompt:
      "The line graph below shows the percentage of adults using the internet in three countries between 2000 and 2020. The pie chart shows the main online activities of these users in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "multi",
      charts: [
        {
          type: "line",
          title: "Adults using the internet, 2000–2020",
          yLabel: "% of adults",
          xLabel: "Year",
          xValues: ["2000", "2005", "2010", "2015", "2020"],
          series: [
            { name: "UK", color: PALETTE.teal, values: [26, 57, 80, 92, 96] },
            { name: "China", color: PALETTE.rose, values: [2, 9, 34, 50, 70] },
            { name: "India", color: PALETTE.amber, values: [1, 3, 8, 24, 50] },
          ],
        },
        {
          type: "pie",
          title: "Main online activities of internet users, 2020",
          segments: [
            { label: "Social media", value: 32, color: PALETTE.sky },
            { label: "Messaging & email", value: 22, color: PALETTE.teal },
            { label: "Streaming video", value: 18, color: PALETTE.rose },
            { label: "Shopping & banking", value: 14, color: PALETTE.amber },
            { label: "News & reading", value: 8, color: PALETTE.violet },
            { label: "Other", value: 6, color: PALETTE.slate },
          ],
        },
      ],
    },
  },
  {
    id: "task1-18",
    category: "task1",
    subtype: "Multiple Graphs",
    title: "Task 1 — Multiple Graphs: University enrolments by gender",
    minWords: 150,
    prompt:
      "The bar chart below shows the total number of students enrolled in five university subjects in one country in 2023, and the table shows the percentage of female students in each subject in 2003 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "multi",
      charts: [
        {
          type: "bar",
          title: "Total students enrolled by subject, 2023 (in thousands)",
          yLabel: "Students (thousands)",
          categories: ["Engineering", "Medicine", "Business", "Education", "Arts"],
          series: [
            { name: "Total students", color: PALETTE.sky, values: [50, 50, 56, 42, 40] },
          ],
        },
        {
          type: "table",
          title: "Percentage of female students by subject, 2003 vs 2023",
          columns: ["Subject", "Female % in 2003", "Female % in 2023"],
          rows: [
            ["Engineering", "12%", "24%"],
            ["Medicine", "42%", "56%"],
            ["Business", "38%", "46%"],
            ["Education", "70%", "76%"],
            ["Arts", "60%", "65%"],
          ],
        },
      ],
    },
  },
  {
    id: "task1-19",
    category: "task1",
    subtype: "Multiple Graphs",
    title: "Task 1 — Multiple Graphs: Population growth & GDP",
    minWords: 150,
    prompt:
      "The two line graphs below show the population (in millions) and the gross domestic product per person (in US$) of a developing country between 1980 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "multi",
      charts: [
        {
          type: "line",
          title: "Total population, 1980–2020 (millions)",
          yLabel: "Population (millions)",
          xLabel: "Year",
          xValues: ["1980", "1990", "2000", "2010", "2020"],
          series: [
            { name: "Population", color: PALETTE.teal, values: [22, 30, 40, 52, 65] },
          ],
        },
        {
          type: "line",
          title: "GDP per person, 1980–2020 (US$)",
          yLabel: "US$ per person",
          xLabel: "Year",
          xValues: ["1980", "1990", "2000", "2010", "2020"],
          series: [
            { name: "GDP per capita", color: PALETTE.amber, values: [400, 700, 1300, 3200, 6800] },
          ],
        },
      ],
    },
  },
  {
    id: "task1-20",
    category: "task1",
    subtype: "Multiple Graphs",
    title: "Task 1 — Multiple Graphs: Energy production, 2000 vs 2020",
    minWords: 150,
    prompt:
      "The two pie charts below show how electricity was produced in one country in 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    chart: {
      type: "multi",
      charts: [
        {
          type: "pie",
          title: "Electricity production by source, 2000",
          segments: [
            { label: "Coal", value: 52, color: PALETTE.slate },
            { label: "Natural gas", value: 18, color: PALETTE.amber },
            { label: "Nuclear", value: 16, color: PALETTE.violet },
            { label: "Hydro", value: 10, color: PALETTE.sky },
            { label: "Wind & solar", value: 2, color: PALETTE.emerald },
            { label: "Other", value: 2, color: PALETTE.rose },
          ],
        },
        {
          type: "pie",
          title: "Electricity production by source, 2020",
          segments: [
            { label: "Coal", value: 22, color: PALETTE.slate },
            { label: "Natural gas", value: 24, color: PALETTE.amber },
            { label: "Nuclear", value: 14, color: PALETTE.violet },
            { label: "Hydro", value: 12, color: PALETTE.sky },
            { label: "Wind & solar", value: 24, color: PALETTE.emerald },
            { label: "Other", value: 4, color: PALETTE.rose },
          ],
        },
      ],
    },
  },
];

export type Task2Subtype =
  | "Opinion"
  | "Discussion"
  | "Advantages-Disadvantages"
  | "Problem-Solution"
  | "Two-Part Questions";

export const TASK2_SUBTYPES: { id: Task2Subtype; label: string; emoji: string; description: string; structure: string }[] = [
  {
    id: "Opinion",
    label: "Opinion (Agree/Disagree)",
    emoji: "🎯",
    description: "State your position and defend it with reasons and examples.",
    structure: "Intro (paraphrase + clear opinion) → Body 1 (first reason + example) → Body 2 (second reason + example) → Conclusion (restate opinion).",
  },
  {
    id: "Discussion",
    label: "Discussion (Both Views)",
    emoji: "⚖️",
    description: "Discuss both sides of the argument and give your own opinion.",
    structure: "Intro (paraphrase + your opinion) → Body 1 (view A + reasons) → Body 2 (view B + why you favour/reject it) → Conclusion (restate which view you support).",
  },
  {
    id: "Advantages-Disadvantages",
    label: "Advantages / Disadvantages",
    emoji: "➕➖",
    description: "Weigh the benefits and drawbacks; sometimes give your overall judgement.",
    structure: "Intro (paraphrase + thesis: do advantages outweigh disadvantages?) → Body 1 (advantages + examples) → Body 2 (disadvantages + examples) → Conclusion (overall judgement).",
  },
  {
    id: "Problem-Solution",
    label: "Problem / Solution (Cause/Effect)",
    emoji: "🛠️",
    description: "Identify causes or problems and propose realistic solutions.",
    structure: "Intro (paraphrase + outline) → Body 1 (causes/problems + examples) → Body 2 (solutions + how they work) → Conclusion (summary + outlook).",
  },
  {
    id: "Two-Part Questions",
    label: "Two-Part Questions",
    emoji: "❓❓",
    description: "Answer both questions fully and clearly in separate paragraphs.",
    structure: "Intro (paraphrase + outline both answers) → Body 1 (answer Q1 fully) → Body 2 (answer Q2 fully) → Conclusion (brief summary of both answers).",
  },
];

export const TASK2_ASSIGNMENTS: OrwellAssignment[] = [
  // ── Opinion (Agree/Disagree) ──
  {
    id: "task2-1",
    category: "task2",
    subtype: "Opinion",
    title: "Task 2 — Opinion: Working from home",
    minWords: 250,
    prompt:
      "Some people believe that working from home is better for both employees and employers, while others disagree.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-2",
    category: "task2",
    subtype: "Opinion",
    title: "Task 2 — Opinion: Mobile phones in schools",
    minWords: 250,
    prompt:
      "Some people believe that students should be allowed to bring mobile phones to school because they are useful for learning. Others argue that phones are a distraction and should be banned.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-3",
    category: "task2",
    subtype: "Opinion",
    title: "Task 2 — Opinion: Tax on unhealthy food",
    minWords: 250,
    prompt:
      "Some people think that governments should impose a higher tax on producers of unhealthy food in order to reduce the consumption of such products.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-4",
    category: "task2",
    subtype: "Opinion",
    title: "Task 2 — Opinion: Compulsory military service",
    minWords: 250,
    prompt:
      "It is sometimes said that all young adults should be required to spend a fixed period of time doing military or community service.\n\nTo what extent do you agree or disagree with this statement?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-5",
    category: "task2",
    subtype: "Opinion",
    title: "Task 2 — Opinion: Famous people in advertising",
    minWords: 250,
    prompt:
      "Some people think that using famous people, such as actors or athletes, to advertise products is an effective marketing strategy. Others believe it has a negative effect on consumers and society.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },

  // ── Discussion (Both Views + Opinion) ──
  {
    id: "task2-6",
    category: "task2",
    subtype: "Discussion",
    title: "Task 2 — Discussion: University for all vs only top students",
    minWords: 250,
    prompt:
      "Some people think that a university education should be available to all students, while others believe it should be available only to those with the strongest academic results.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-7",
    category: "task2",
    subtype: "Discussion",
    title: "Task 2 — Discussion: Print books vs e-books",
    minWords: 250,
    prompt:
      "Some people believe that printed books will always be more valuable than electronic books, while others argue that e-books are more practical and will eventually replace them.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-8",
    category: "task2",
    subtype: "Discussion",
    title: "Task 2 — Discussion: Single-sex vs mixed schools",
    minWords: 250,
    prompt:
      "Some people think that children should be educated in single-sex schools, while others believe that boys and girls should learn together in mixed schools.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-9",
    category: "task2",
    subtype: "Discussion",
    title: "Task 2 — Discussion: Public transport vs new roads",
    minWords: 250,
    prompt:
      "Some people think that governments should spend more money on improving public transport, while others believe that investing in new roads is more important.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-10",
    category: "task2",
    subtype: "Discussion",
    title: "Task 2 — Discussion: Saving languages vs global English",
    minWords: 250,
    prompt:
      "Some people believe that governments should spend money on protecting endangered local languages, while others argue that resources should be used to promote a single global language such as English.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },

  // ── Advantages / Disadvantages ──
  {
    id: "task2-11",
    category: "task2",
    subtype: "Advantages-Disadvantages",
    title: "Task 2 — Adv/Disadv: Living in a big city",
    minWords: 250,
    prompt:
      "More and more people today are choosing to live in large cities rather than in the countryside.\n\nDo the advantages of living in a big city outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-12",
    category: "task2",
    subtype: "Advantages-Disadvantages",
    title: "Task 2 — Adv/Disadv: Studying abroad",
    minWords: 250,
    prompt:
      "Nowadays, an increasing number of students choose to study at a university in a foreign country rather than at home.\n\nDo the advantages of studying abroad outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-13",
    category: "task2",
    subtype: "Advantages-Disadvantages",
    title: "Task 2 — Adv/Disadv: Social media",
    minWords: 250,
    prompt:
      "Social media has become an essential part of daily life for billions of people around the world.\n\nWhat are the advantages and disadvantages of social media? Do you think the benefits outweigh the drawbacks?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-14",
    category: "task2",
    subtype: "Advantages-Disadvantages",
    title: "Task 2 — Adv/Disadv: Working for the same company for life",
    minWords: 250,
    prompt:
      "In some countries, it is common for people to remain with the same employer for their entire working life. In other countries, people change jobs frequently.\n\nWhat are the advantages and disadvantages of staying with the same employer throughout one's career?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-15",
    category: "task2",
    subtype: "Advantages-Disadvantages",
    title: "Task 2 — Adv/Disadv: Cashless society",
    minWords: 250,
    prompt:
      "In many countries, people are increasingly using credit cards, mobile payments and online transfers instead of cash.\n\nDo the advantages of a cashless society outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },

  // ── Problem / Solution (Cause / Effect) ──
  {
    id: "task2-16",
    category: "task2",
    subtype: "Problem-Solution",
    title: "Task 2 — Problem-Solution: Traffic congestion",
    minWords: 250,
    prompt:
      "Many large cities around the world are facing serious problems with traffic congestion.\n\nWhat are the main causes of this problem, and what measures can be taken to solve it?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-17",
    category: "task2",
    subtype: "Problem-Solution",
    title: "Task 2 — Problem-Solution: Youth unemployment",
    minWords: 250,
    prompt:
      "In many countries, young people find it increasingly difficult to get their first job after finishing their studies.\n\nWhat are the reasons for this, and what can governments and businesses do to address the issue?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-18",
    category: "task2",
    subtype: "Problem-Solution",
    title: "Task 2 — Problem-Solution: Childhood obesity",
    minWords: 250,
    prompt:
      "Childhood obesity has become a serious issue in many countries around the world.\n\nWhat are the main causes of this problem, and what measures could governments and families take to reduce it?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-19",
    category: "task2",
    subtype: "Problem-Solution",
    title: "Task 2 — Problem-Solution: Plastic pollution",
    minWords: 250,
    prompt:
      "Plastic waste is causing serious damage to the environment, particularly to oceans and wildlife.\n\nWhat are the causes of this problem, and what can individuals and governments do to reduce plastic pollution?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-20",
    category: "task2",
    subtype: "Problem-Solution",
    title: "Task 2 — Problem-Solution: Falling reading habits",
    minWords: 250,
    prompt:
      "In many countries, fewer and fewer young people are reading books in their free time.\n\nWhat are the reasons for this decline, and what can schools and parents do to encourage young people to read more?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },

  // ── Two-Part Questions ──
  {
    id: "task2-21",
    category: "task2",
    subtype: "Two-Part Questions",
    title: "Task 2 — Two-Part: Migration to cities",
    minWords: 250,
    prompt:
      "More and more people are migrating from rural areas to cities in search of a better life.\n\nWhy do people leave the countryside? What problems does this movement cause for cities?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-22",
    category: "task2",
    subtype: "Two-Part Questions",
    title: "Task 2 — Two-Part: Free public museums",
    minWords: 250,
    prompt:
      "In some countries, museums and art galleries are free to enter, while in others people must pay an entrance fee.\n\nWhy do you think this is? Should museums and galleries be free for the public to visit?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-23",
    category: "task2",
    subtype: "Two-Part Questions",
    title: "Task 2 — Two-Part: Decline in physical activity",
    minWords: 250,
    prompt:
      "In many countries today, people are doing less and less physical exercise.\n\nWhat are the reasons for this trend? What can be done to encourage people to be more active?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-24",
    category: "task2",
    subtype: "Two-Part Questions",
    title: "Task 2 — Two-Part: Working long hours",
    minWords: 250,
    prompt:
      "In many parts of the world, people are now working much longer hours than ever before.\n\nWhy is this happening? What effects does this have on individuals and society?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
  {
    id: "task2-25",
    category: "task2",
    subtype: "Two-Part Questions",
    title: "Task 2 — Two-Part: Influence of celebrities on young people",
    minWords: 250,
    prompt:
      "Many young people today are strongly influenced by the lifestyles and opinions of celebrities they follow online.\n\nWhy are celebrities so influential among young people? Is this influence a positive or negative development?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
  },
];

export const PARAGRAPH_ASSIGNMENTS: OrwellAssignment[] = [
  {
    id: "para-1",
    category: "paragraph",
    subtype: "Informal email",
    title: "Email to a friend — weekend plans",
    minWords: 60,
    prompt:
      "Write a short informal email to a friend suggesting plans for the weekend. In your email, tell your friend:\n- what you would like to do together\n- when and where to meet\n- what your friend should bring\n\nWrite at least 60 words.",
  },
  {
    id: "para-2",
    category: "paragraph",
    subtype: "Formal letter",
    title: "Formal letter — applying to a university",
    minWords: 80,
    prompt:
      "Write a formal letter to the admissions officer at a university you want to apply to. In your letter:\n- introduce yourself briefly\n- explain which course you are interested in and why\n- ask two questions about the application process\n\nWrite at least 80 words.",
  },
  {
    id: "para-3",
    category: "paragraph",
    subtype: "Complaint letter",
    title: "Complaint letter — faulty product",
    minWords: 80,
    prompt:
      "You recently bought a new mobile phone online but it arrived damaged. Write a formal complaint letter to the company. In your letter:\n- describe the problem with the phone\n- explain what you have tried to do\n- say what you want the company to do\n\nWrite at least 80 words.",
  },
  {
    id: "para-4",
    category: "paragraph",
    subtype: "Informal message",
    title: "Message — thank you to a teacher",
    minWords: 50,
    prompt:
      "Write a short informal message to a teacher who has helped you a lot this year. In your message:\n- thank them for their help\n- mention one specific thing they did that made a difference\n- wish them well for the future\n\nWrite at least 50 words.",
  },
  {
    id: "para-5",
    category: "paragraph",
    subtype: "Formal letter",
    title: "Formal letter — job application",
    minWords: 80,
    prompt:
      "You have seen an advertisement for a part-time job at a local café. Write a formal letter to the manager. In your letter:\n- say which job you are applying for\n- describe your relevant skills and experience\n- say when you are available to start\n\nWrite at least 80 words.",
  },
  {
    id: "para-6",
    category: "paragraph",
    subtype: "Informal email",
    title: "Email — inviting a friend to visit",
    minWords: 60,
    prompt:
      "Write an informal email to a friend who lives in another city, inviting them to visit you. In your email:\n- explain why you want them to come\n- suggest some things you can do together\n- give practical travel details (date, how to get there)\n\nWrite at least 60 words.",
  },
  {
    id: "para-7",
    category: "paragraph",
    subtype: "Complaint letter",
    title: "Complaint letter — hotel stay",
    minWords: 80,
    prompt:
      "You recently stayed at a hotel and the service was very disappointing. Write a formal complaint letter to the hotel manager. In your letter:\n- give details of your stay (dates, room number)\n- describe what went wrong\n- explain what action you expect the hotel to take\n\nWrite at least 80 words.",
  },
  {
    id: "para-8",
    category: "paragraph",
    subtype: "Formal letter",
    title: "Formal letter — requesting a reference",
    minWords: 70,
    prompt:
      "Write a formal letter to a former teacher or employer asking them to write a reference letter for you. In your letter:\n- explain what the reference is for\n- remind them when you studied/worked with them\n- mention the deadline and what they should include\n\nWrite at least 70 words.",
  },
  {
    id: "para-9",
    category: "paragraph",
    subtype: "Informal email",
    title: "Email — apologising to a friend",
    minWords: 60,
    prompt:
      "You missed an important event organised by your friend. Write an informal email to apologise. In your email:\n- apologise for not attending\n- explain the reason why you could not come\n- suggest how you can make it up to them\n\nWrite at least 60 words.",
  },
  {
    id: "para-10",
    category: "paragraph",
    subtype: "Informal message",
    title: "Message — congratulating a classmate",
    minWords: 50,
    prompt:
      "A classmate has just passed an important exam with a very high score. Write a short informal message to congratulate them. In your message:\n- congratulate them warmly\n- say something kind about their effort\n- suggest a way to celebrate together\n\nWrite at least 50 words.",
  },
  {
    id: "para-11",
    category: "paragraph",
    subtype: "Formal letter",
    title: "Formal letter — asking about a course",
    minWords: 80,
    prompt:
      "You have seen a language course advertised online. Write a formal letter to the school. In your letter:\n- say which course you are interested in\n- ask about the schedule, fees and teaching method\n- ask whether there is a placement test\n\nWrite at least 80 words.",
  },
  {
    id: "para-12",
    category: "paragraph",
    subtype: "Informal email",
    title: "Email — giving advice to a friend",
    minWords: 60,
    prompt:
      "Your friend is thinking of moving to another country to study. Write an informal email giving them your advice. In your email:\n- say whether you think it is a good idea\n- mention two things they should prepare for\n- offer your support\n\nWrite at least 60 words.",
  },
  {
    id: "para-13",
    category: "paragraph",
    subtype: "Complaint letter",
    title: "Complaint letter — noisy neighbours",
    minWords: 80,
    prompt:
      "You live in an apartment and your neighbours are making a lot of noise late at night. Write a polite but firm formal letter to the landlord. In your letter:\n- describe the problem\n- explain how it is affecting you\n- suggest what you would like the landlord to do\n\nWrite at least 80 words.",
  },
  {
    id: "para-14",
    category: "paragraph",
    subtype: "Informal email",
    title: "Email — asking for a recipe",
    minWords: 50,
    prompt:
      "Last week you had dinner at a friend's house and really enjoyed a dish they cooked. Write a short informal email asking for the recipe. In your email:\n- thank them for the dinner\n- say what you liked about the dish\n- ask for the recipe and any tips\n\nWrite at least 50 words.",
  },
  {
    id: "para-15",
    category: "paragraph",
    subtype: "Formal letter",
    title: "Formal letter — feedback to a company",
    minWords: 80,
    prompt:
      "You recently used an online service (for example, an app or a delivery company) that you found very useful. Write a formal letter to the company. In your letter:\n- explain which service you used\n- say what you liked about it\n- suggest one improvement they could make\n\nWrite at least 80 words.",
  },
];

export const ALL_ASSIGNMENTS: OrwellAssignment[] = [
  ...TASK1_ASSIGNMENTS,
  ...TASK2_ASSIGNMENTS,
  ...PARAGRAPH_ASSIGNMENTS,
];

export const ASSIGNMENTS_BY_CATEGORY: Record<Category, OrwellAssignment[]> = {
  task1: TASK1_ASSIGNMENTS,
  task2: TASK2_ASSIGNMENTS,
  paragraph: PARAGRAPH_ASSIGNMENTS,
};

export function getAssignmentById(id: string): OrwellAssignment | undefined {
  return ALL_ASSIGNMENTS.find((a) => a.id === id);
}

export const CATEGORY_META: Record<Category, { label: string; emoji: string; description: string }> = {
  task1: { label: "IELTS Task 1", emoji: "📊", description: "Describe charts, graphs and diagrams (150+ words)" },
  task2: { label: "IELTS Task 2", emoji: "✍️", description: "Write an academic essay on a given topic (250+ words)" },
  paragraph: { label: "Paragraph Writing", emoji: "💌", description: "Emails, letters and short messages for real-life situations" },
};

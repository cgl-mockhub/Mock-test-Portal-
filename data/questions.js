// data/questions.js
// Add new question objects to any chapter array below to expand the portal over time.

const pronounQuestions = [
    {
        id: 1,
        type: "Spot the Error",
        prompt: "(a) Unless two or more members object / (b) to him joining the club, we shall have to / (c) accept his application for membership. / (d) No error.",
        options: {
            a: "(a) Unless two or more members object",
            b: "(b) to him joining the club, we shall have to",
            c: "(c) accept his application for membership.",
            d: "(d) No error."
        },
        correctOption: 'b',
        correctedSentence: "Unless two or more members object to his joining the club, we shall have to accept his application for membership.",
        rule: "Change 'him' into 'his'. A possessive adjective ('his') always precedes a gerund ('joining').",
        distractor: "Part (a) or (d): Students often overlook 'him joining' because objective case sounds natural in spoken English.",
        shortcut: "Keyword: [Pronoun] + [Verb-ing (Gerund)] -> Always use Possessive Adjective (my, his, her, your, our, their)."
    },
    {
        id: 2,
        type: "Spot the Error",
        prompt: "(a) I was surprised and pleased / (b) when I was informed of me / (c) winning the contest. / (d) No error.",
        options: {
            a: "(a) I was surprised and pleased",
            b: "(b) when I was informed of me",
            c: "(c) winning the contest.",
            d: "(d) No error."
        },
        correctOption: 'b',
        correctedSentence: "I was surprised and pleased when I was informed of my winning the contest.",
        rule: "Change 'me' into 'my'. A possessive adjective ('my') must come before a gerund ('winning').",
        distractor: "Part (c): Seeing 'of me' in (b) tricks students into thinking the preposition 'of' takes objective 'me', ignoring that 'winning' is a gerund.",
        shortcut: "Spot 'of me/him/them + V-ing' -> Immediately change to 'my/his/their'."
    }
    // Paste your remaining Pronoun Q3–Q124 and any future questions right here!
];

const nounQuestions = [
    {
        id: 1,
        type: "Spot the Error",
        prompt: "(a) My sister has read / (b) pages after pages / (c) of the Bible. / (d) No error.",
        options: {
            a: "(a) My sister has read",
            b: "(b) pages after pages",
            c: "(c) of the Bible.",
            d: "(d) No error."
        },
        correctOption: 'b',
        correctedSentence: "My sister has read page after page of the Bible.",
        rule: "When the same noun is repeated before and after a preposition ('after'), both nouns must be in the singular form ('page after page').",
        distractor: "Part (d) No error: Plural 'pages' sounds emphatic to casual readers.",
        shortcut: "Pattern: [Singular Noun] + [Preposition] + [Same Singular Noun] -> 'page after page', 'door to door'."
    }
];

const svaQuestions = [
    {
        id: 1,
        type: "Spot the Error",
        prompt: "(a) Neither the principal / (b) nor the teachers / (c) was present at the function. / (d) No error.",
        options: {
            a: "(a) Neither the principal",
            b: "(b) nor the teachers",
            c: "(c) was present at the function.",
            d: "(d) No error."
        },
        correctOption: 'c',
        correctedSentence: "Neither the principal nor the teachers were present at the function.",
        rule: "With 'Neither... nor' and 'Either... or', the verb agrees with the nearest subject ('the teachers' -> plural -> 'were').",
        distractor: "Part (a): Students match the verb with the first subject ('the principal').",
        shortcut: "Rule: 'Neither A nor B' -> Verb matches B (the subject closest to the verb)."
    }
];

const chaptersData = [
    {
        id: 'pronoun',
        title: 'Pronoun',
        subtitle: 'Deduplicated Master Bank',
        tag: 'Active Bank',
        tagColor: 'bg-emerald-100 text-emerald-800',
        questions: pronounQuestions,
        active: true,
        description: 'Spot the Error, Sentence Improvement & Fill-in-the-Blank questions with instant 4-part solutions.'
    },
    {
        id: 'noun',
        title: 'Noun & Number',
        subtitle: 'Spotting the Error',
        tag: 'Active Set',
        tagColor: 'bg-sky-100 text-sky-800',
        questions: nounQuestions,
        active: true,
        description: 'High-frequency SSC rules on Uncountable Nouns, Compound Nouns, and Singular-looking Plural Nouns.'
    },
    {
        id: 'sva',
        title: 'Subject-Verb Agreement',
        subtitle: 'Spotting the Error',
        tag: 'Active Set',
        tagColor: 'bg-sky-100 text-sky-800',
        questions: svaQuestions,
        active: true,
        description: 'Core agreement rules for Neither-Nor, Along with / As well as, and A number of vs The number of.'
    },
    {
        id: 'verb',
        title: 'Verb & Tense',
        subtitle: 'Spotting the Error • Practice Set',
        tag: 'Coming Soon',
        tagColor: 'bg-slate-100 text-slate-600',
        questions: [],
        active: false,
        description: 'Conditional sentences, Sequence of Tenses, Causative verbs, and Stative vs Dynamic verbs.'
    }
];

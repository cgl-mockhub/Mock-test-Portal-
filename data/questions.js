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
   },
    {
        "id": 3,
        "type": "Spot the Error",
        "prompt": "(a) Neither Kavita / (b) nor her teammates / (c) can run faster / (d) than him.",
        "options": {
            "a": "(a) Neither Kavita",
            "b": "(b) nor her teammates",
            "c": "(c) can run faster",
            "d": "(d) than him."
        },
        "correctOption": "d",
        "correctedSentence": "Neither Kavita nor her teammates can run faster than he.",
        "rule": "Change 'him' to 'he'. In elliptical comparisons using 'than' or 'as', use the subjective case when comparing subjects ('he [can run]').",
        "distractor": "Part (c): Test-takers often overthink 'can run faster' and miss the case error after 'than'.",
        "shortcut": "Expand 'than him' to 'than he [can run]' -> pick 'he'."
    },
    {
        "id": 4,
        "type": "Spot the Error",
        "prompt": "(a) It is / (b) us who have / (c) funded the entire / (d) community library.",
        "options": {
            "a": "(a) It is",
            "b": "(b) us who have",
            "c": "(c) funded the entire",
            "d": "(d) community library."
        },
        "correctOption": "b",
        "correctedSentence": "It is we who have funded the entire community library.",
        "rule": "Change 'us' to 'we'. A pronoun following a form of 'be' ('is, am, are, was, were') as a subject complement takes the nominative case ('we', not 'us') in formal SSC grammar.",
        "distractor": "Part (c): Many students focus on 'have funded' instead of checking the complement pronoun after 'It is'.",
        "shortcut": "Look for 'It is / was + [pronoun] + who' -> use 'I / he / she / we / they'."
    },
    {
        "id": 5,
        "type": "Spot the Error",
        "prompt": "(a) It is I who / (b) is accountable / (c) for the sudden / (d) delay in dispatch.",
        "options": {
            "a": "(a) It is I who",
            "b": "(b) is accountable",
            "c": "(c) for the sudden",
            "d": "(d) delay in dispatch."
        },
        "correctOption": "b",
        "correctedSentence": "It is I who am accountable for the sudden delay in dispatch.",
        "rule": "Change 'is' to 'am'. The verb after a relative pronoun ('who', 'which', 'that') agrees in person and number with its antecedent ('I' -> 'am').",
        "distractor": "Part (a): Students get distracted by 'It is I' and leave 'is accountable' unchanged.",
        "shortcut": "Circle the noun/pronoun right before 'who/which/that' ('I') -> match the verb to it ('I am')."
    },
    {
        "id": 6,
        "type": "Spot the Error",
        "prompt": "(a) You, he, and I / (b) have been selected / (c) to represent the college / (d) No error.",
        "options": {
            "a": "(a) You, he, and I",
            "b": "(b) have been selected",
            "c": "(c) to represent the college",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "You, he, and I have been selected to represent the college.",
        "rule": "No error. For positive or neutral actions involving multiple persons, the standard order is 2nd -> 3rd -> 1st ('You, he, and I').",
        "distractor": "Part (a): Students who memorize '2-3-1' blindly often second-guess even when the sentence already follows '2-3-1'.",
        "shortcut": "Positive/neutral sentence? Check '2 - 3 - 1' ('you - he/she/they - I/we')."
    },
    {
        "id": 7,
        "type": "Spot the Error",
        "prompt": "(a) You, Tarun, and I / (b) must apologize publicly / (c) for leaking the / (d) confidential exam schedule.",
        "options": {
            "a": "(a) You, Tarun, and I",
            "b": "(b) must apologize publicly",
            "c": "(c) for leaking the",
            "d": "(d) confidential exam schedule."
        },
        "correctOption": "a",
        "correctedSentence": "I, you, and Tarun must apologize publicly for leaking the confidential exam schedule.",
        "rule": "Change 'You, Tarun, and I' to 'I, you, and Tarun'. When admitting fault, mistake, or blame, standard SSC grammar uses the 1st -> 2nd -> 3rd person order.",
        "distractor": "Part (b): Students often suspect 'must apologize' rather than checking pronoun order for guilt/fault.",
        "shortcut": "Words like 'blamed, mess, mistake, apologize' (fault) -> put 'I/we' first ('1 - 2 - 3')."
    },
    {
        "id": 8,
        "type": "Spot the Error",
        "prompt": "(a) Meena, being a / (b) diligent analyst, / (c) she was promoted / (d) within eight months.",
        "options": {
            "a": "(a) Meena, being a",
            "b": "(b) diligent analyst,",
            "c": "(c) she was promoted",
            "d": "(d) within eight months."
        },
        "correctOption": "c",
        "correctedSentence": "Meena, being a diligent analyst, was promoted within eight months.",
        "rule": "Remove 'she'. Do not repeat a subject with both a noun ('Meena') and a personal pronoun ('she') in the same clause.",
        "distractor": "Part (a): Learners frequently fixate on the participial phrase 'being a diligent analyst' and overlook the redundant 'she'.",
        "shortcut": "Noun + comma + 'he/she/they/it' right before the main verb -> delete the extra pronoun."
    },
    {
        "id": 9,
        "type": "Spot the Error",
        "prompt": "(a) Those students who / (b) submit their assignments / (c) late they will / (d) face a deduction.",
        "options": {
            "a": "(a) Those students who",
            "b": "(b) submit their assignments",
            "c": "(c) late they will",
            "d": "(d) face a deduction."
        },
        "correctOption": "c",
        "correctedSentence": "Those students who submit their assignments late will face a deduction.",
        "rule": "Remove 'they'. A relative clause beginning with 'who' already supplies the subject for the main clause; adding 'they' creates a redundant subject.",
        "distractor": "Part (a): Students often get distracted by 'Those students who' and miss the duplicate subject 'they'.",
        "shortcut": "Pattern 'Those [noun] who ... [verb], they ...' -> cut 'they'."
    },
    {
        "id": 10,
        "type": "Spot the Error",
        "prompt": "(a) My father / (b) objected to / (c) him staying out / (d) past midnight.",
        "options": {
            "a": "(a) My father",
            "b": "(b) objected to",
            "c": "(c) him staying out",
            "d": "(d) past midnight."
        },
        "correctOption": "c",
        "correctedSentence": "My father objected to his staying out past midnight.",
        "rule": "Change 'him' to 'his'. Before a gerund ('staying' functioning as a noun object of 'to'), formal grammar requires a possessive determiner ('his', 'my', 'your', 'their').",
        "distractor": "Part (b): Aspirants see 'objected to' and assume 'him' is fine because 'to' is a preposition.",
        "shortcut": "Preposition + [pronoun] + V-ing ('to him staying') -> switch pronoun to possessive ('his/my/their')."
    },
    {
        "id": 11,
        "type": "Spot the Error",
        "prompt": "(a) This notebook is / (b) not ours; it / (c) must be / (d) her's.",
        "options": {
            "a": "(a) This notebook is",
            "b": "(b) not ours; it",
            "c": "(c) must be",
            "d": "(d) her's."
        },
        "correctOption": "d",
        "correctedSentence": "This notebook is not ours; it must be hers.",
        "rule": "Change 'her's' to 'hers'. Possessive pronouns ('hers', 'yours', 'theirs', 'ours', 'mine', 'its') never take an apostrophe.",
        "distractor": "Part (b): Students often misread 'ours' as an error because 'our' is the determiner, even though 'ours' is already correct.",
        "shortcut": "Spot 'his' / her's / your's / their's / it's' (as possessive) -> remove the apostrophe."
    },
    {
        "id": 12,
        "type": "Spot the Error",
        "prompt": "(a) The startup plans to / (b) expand their operations / (c) across tier-two cities / (d) before next winter.",
        "options": {
            "a": "(a) The startup plans to",
            "b": "(b) expand their operations",
            "c": "(c) across tier-two cities",
            "d": "(d) before next winter."
        },
        "correctOption": "b",
        "correctedSentence": "The startup plans to expand its operations across tier-two cities before next winter.",
        "rule": "Change 'their' to 'its'. Singular corporate entities like 'the startup' or 'the company' acting as a single unit take the singular possessive 'its'.",
        "distractor": "Part (c): Test-takers get distracted by the plural noun 'tier-two cities' and think 'their' matches 'cities'.",
        "shortcut": "Singular organization ('company / bank / startup / committee') + 'their' -> change to 'its'."
    },
    {
        "id": 13,
        "type": "Spot the Error",
        "prompt": "(a) The municipality announced / (b) that it would / (c) revise its property / (d) No error.",
        "options": {
            "a": "(a) The municipality announced",
            "b": "(b) that it would",
            "c": "(c) revise its property",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "The municipality announced that it would revise its property.",
        "rule": "No error. Singular institutional nouns ('the municipality') consistently pair with singular pronouns ('it', 'its') when viewed as a single administrative body.",
        "distractor": "Part (b): Students often doubt 'it would revise' when the subject is an institutional noun.",
        "shortcut": "Check if the subject is singular and the pronoun already matches ('municipality -> it / its') -> No error."
    },
    {
        "id": 14,
        "type": "Spot the Error",
        "prompt": "(a) Your apartment in / (b) Pune is much / (c) more spacious than / (d) my one in Mumbai.",
        "options": {
            "a": "(a) Your apartment in",
            "b": "(b) Pune is much",
            "c": "(c) more spacious than",
            "d": "(d) my one in Mumbai."
        },
        "correctOption": "d",
        "correctedSentence": "Your apartment in Pune is much more spacious than mine in Mumbai.",
        "rule": "Change 'my one' to 'mine'. Use the possessive pronoun 'mine' (not 'my one') to stand in for 'my apartment' in comparisons.",
        "distractor": "Part (c): Many students focus on 'more spacious' and miss 'my one'.",
        "shortcut": "See 'my one / your one / her one' in a comparison -> replace with 'mine / yours / hers'."
    },
    {
        "id": 15,
        "type": "Spot the Error",
        "prompt": "(a) Is that vintage / (b) wristwatch in the / (c) showcase really / (d) your?",
        "options": {
            "a": "(a) Is that vintage",
            "b": "(b) wristwatch in the",
            "c": "(c) showcase really",
            "d": "(d) your?"
        },
        "correctOption": "d",
        "correctedSentence": "Is that vintage wristwatch in the showcase really yours?",
        "rule": "Change 'your' to 'yours'. At the end of a clause without a following noun, use the possessive pronoun ('yours'), not the possessive determiner ('your').",
        "distractor": "Part (a): Students often get tripped up by 'that vintage wristwatch' and overlook 'your' at the end.",
        "shortcut": "'Your / my / her / their' sitting alone at the end of a sentence -> add '-s' ('yours / hers / theirs' or 'mine')."
    },
    {
        "id": 16,
        "type": "Spot the Error",
        "prompt": "(a) With grain silos / (b) brimming, the state / (c) government wants to / (d) offload his excess stock.",
        "options": {
            "a": "(a) With grain silos",
            "b": "(b) brimming, the state",
            "c": "(c) government wants to",
            "d": "(d) offload his excess stock."
        },
        "correctOption": "d",
        "correctedSentence": "With grain silos brimming, the state government wants to offload its excess stock.",
        "rule": "Change 'his' to 'its'. Non-human/institutional subjects like 'the state government' take 'its' (or 'their' when treated as multiple bodies), never 'his'.",
        "distractor": "Part (b): Learners frequently focus on 'brimming' without checking the gender/animacy of 'his'.",
        "shortcut": "Government/institution + 'his/her' -> change to 'its' (or 'their' if plural)."
    },
    {
        "id": 17,
        "type": "Spot the Error",
        "prompt": "(a) Both of mine / (b) younger brothers have / (c) cleared the civil / (d) services prelims.",
        "options": {
            "a": "(a) Both of mine",
            "b": "(b) younger brothers have",
            "c": "(c) cleared the civil",
            "d": "(d) services prelims."
        },
        "correctOption": "a",
        "correctedSentence": "Both of my younger brothers have cleared the civil services prelims.",
        "rule": "Change 'mine' to 'my'. Before a noun ('younger brothers'), use the possessive determiner ('my'), not the independent pronoun 'mine'.",
        "distractor": "Part (b): Students often check 'have cleared' and ignore 'mine' before a noun.",
        "shortcut": "'Mine + [noun]' ('mine brother/book') -> swap to 'my + [noun]'."
    },
    {
        "id": 18,
        "type": "Spot the Error",
        "prompt": "(a) The data published in / (b) this annual report / (c) is far more reliable / (d) than that report.",
        "options": {
            "a": "(a) The data published in",
            "b": "(b) this annual report",
            "c": "(c) is far more reliable",
            "d": "(d) than that report."
        },
        "correctOption": "d",
        "correctedSentence": "The data published in this annual report is far more reliable than that in that report.",
        "rule": "Change 'that report' to 'that in that report'. Comparisons must be between like elements ('the data' vs. 'the data in that report'), not data and a report.",
        "distractor": "Part (a): Many students get caught up in 'data ... is' and miss the faulty comparison at the end.",
        "shortcut": "Comparing X with 'that/those + [noun]'? Add 'of/in + that/those + [noun]' so apples match apples."
    },
    {
        "id": 19,
        "type": "Spot the Error",
        "prompt": "(a) The lectures delivered / (b) in this workshop / (c) are more practical / (d) than other workshops.",
        "options": {
            "a": "(a) The lectures delivered",
            "b": "(b) in this workshop",
            "c": "(c) are more practical",
            "d": "(d) than other workshops."
        },
        "correctOption": "d",
        "correctedSentence": "The lectures delivered in this workshop are more practical than those in other workshops.",
        "rule": "Change 'other workshops' to 'those in other workshops'. 'The lectures' is being compared with lectures from other workshops, requiring 'those'.",
        "distractor": "Part (c): Test-takers often check 'more practical' and overlook the missing comparative pronoun 'those'.",
        "shortcut": "Plural subject ('lectures') compared with another group without 'those' -> insert 'those in/of'."
    },
    {
        "id": 20,
        "type": "Spot the Error",
        "prompt": "(a) His separation / (b) caused deep distress / (c) among all members / (d) of the household.",
        "options": {
            "a": "(a) His separation",
            "b": "(b) caused deep distress",
            "c": "(c) among all members",
            "d": "(d) of the household."
        },
        "correctOption": "a",
        "correctedSentence": "Separation from him caused deep distress among all members of the household.",
        "rule": "Change 'His separation' to 'Separation from him'. In strict SSC convention, nouns like 'separation', 'favour', and 'leave' avoid a possessive determiner when meaning 'being apart from someone'.",
        "distractor": "Part (c): Students look at 'among all members' and miss the possessive idiom error in (a).",
        "shortcut": "Watch for '[possessive] + separation/favour' in SSC error lists -> change to 'separation from / favour from'."
    },
    {
        "id": 21,
        "type": "Spot the Error",
        "prompt": "(a) I had to grip / (b) the railing tightly / (c) to balance itself / (d) on the wet stairs.",
        "options": {
            "a": "(a) I had to grip",
            "b": "(b) the railing tightly",
            "c": "(c) to balance itself",
            "d": "(d) on the wet stairs."
        },
        "correctOption": "c",
        "correctedSentence": "I had to grip the railing tightly to balance myself on the wet stairs.",
        "rule": "Change 'itself' to 'myself'. A reflexive pronoun must match the subject ('I' -> 'myself'), not a non-human noun like 'railing'.",
        "distractor": "Part (a): Aspirants often focus on 'grip ... tightly' and miss the mismatched reflexive 'itself'.",
        "shortcut": "Subject is 'I' -> reflexive must be 'myself' (never 'itself')."
    },
    {
        "id": 22,
        "type": "Spot the Error",
        "prompt": "(a) The candidates should / (b) avail of every / (c) mock test before / (d) the final exam.",
        "options": {
            "a": "(a) The candidates should",
            "b": "(b) avail of every",
            "c": "(c) mock test before",
            "d": "(d) the final exam."
        },
        "correctOption": "b",
        "correctedSentence": "The candidates should avail themselves of every mock test before the final exam.",
        "rule": "Change 'avail of' to 'avail themselves of'. When meaning 'take advantage of', 'avail' requires a reflexive pronoun + 'of' ('avail oneself of').",
        "distractor": "Part (d): Students frequently treat 'avail of' as a fixed phrasal verb without noticing the missing reflexive object.",
        "shortcut": "Spot 'avail + of' with no 'myself/himself/herself/themselves/yourself' -> insert the matching '-self/-selves' pronoun."
    },
    {
        "id": 23,
        "type": "Spot the Error",
        "prompt": "(a) You must exert / (b) to complete the / (c) syllabus well ahead / (d) of the deadline.",
        "options": {
            "a": "(a) You must exert",
            "b": "(b) to complete the",
            "c": "(c) syllabus well ahead",
            "d": "(d) of the deadline."
        },
        "correctOption": "a",
        "correctedSentence": "You must exert yourself to complete the syllabus well ahead of the deadline.",
        "rule": "Change 'exert' to 'exert yourself'. In standard SSC grammar, 'exert' (meaning 'make a strong effort') takes a reflexive object ('exert oneself') when no other object is given.",
        "distractor": "Part (b): Test-takers often focus on 'to complete' and overlook the missing reflexive after 'exert'.",
        "shortcut": "Verb 'exert' with no direct object -> add 'oneself / yourself / themselves'."
    },
    {
        "id": 24,
        "type": "Spot the Error",
        "prompt": "(a) He prostrated / (b) before the judge / (c) pleading for mercy / (d) after the verdict.",
        "options": {
            "a": "(a) He prostrated",
            "b": "(b) before the judge",
            "c": "(c) pleading for mercy",
            "d": "(d) after the verdict."
        },
        "correctOption": "a",
        "correctedSentence": "He prostrated himself before the judge pleading for mercy after the verdict.",
        "rule": "Change 'prostrated' to 'prostrated himself'. 'Prostrate' (lying stretched out in submission/supplication) requires a reflexive object ('prostrate oneself').",
        "distractor": "Part (c): Students often get drawn to 'pleading for mercy' and miss 'prostrated'.",
        "shortcut": "Verb 'prostrate' followed directly by a preposition ('before/at') -> insert 'himself / herself / myself / themselves'."
    },
    {
        "id": 25,
        "type": "Spot the Error",
        "prompt": "(a) We should do / (b) brisk walking daily / (c) to keep / (d) ourselves energized.",
        "options": {
            "a": "(a) We should do",
            "b": "(b) brisk walking daily",
            "c": "(c) to keep",
            "d": "(d) ourselves energized."
        },
        "correctOption": "d",
        "correctedSentence": "We should do brisk walking daily to keep energized.",
        "rule": "Remove 'ourselves'. Verbs like 'keep', 'stop', 'turn', 'qualify', and 'bathe' do not take reflexive pronouns in standard SSC grammar.",
        "distractor": "Part (b): Many students suspect 'brisk walking' and leave 'ourselves' untouched.",
        "shortcut": "'Keep / stop / bathe' + 'myself/ourselves/himself' -> drop the reflexive."
    },
    {
        "id": 26,
        "type": "Spot the Error",
        "prompt": "(a) He bathed / (b) himself in the / (c) cold river at / (d) dawn every day.",
        "options": {
            "a": "(a) He bathed",
            "b": "(b) himself in the",
            "c": "(c) cold river at",
            "d": "(d) dawn every day."
        },
        "correctOption": "b",
        "correctedSentence": "He bathed in the cold river at dawn every day.",
        "rule": "Remove 'himself'. In SSC grammar, 'bathe' (like 'dress', 'shave', 'hide') does not take a reflexive pronoun in routine action sentences.",
        "distractor": "Part (c): Test-takers focus on 'at dawn' or 'in the cold river' and accept 'bathed himself' as natural.",
        "shortcut": "'Bathed himself / dressed herself' in plain daily actions -> cut the reflexive."
    },
    {
        "id": 27,
        "type": "Spot the Error",
        "prompt": "(a) Myself and Aarav / (b) will coordinate the / (c) logistics for the / (d) seminar tomorrow.",
        "options": {
            "a": "(a) Myself and Aarav",
            "b": "(b) will coordinate the",
            "c": "(c) logistics for the",
            "d": "(d) seminar tomorrow."
        },
        "correctOption": "a",
        "correctedSentence": "Aarav and I will coordinate the logistics for the seminar tomorrow.",
        "rule": "Change 'Myself and Aarav' to 'Aarav and I'. Reflexive pronouns ('myself', 'himself') cannot act as the subject of a sentence.",
        "distractor": "Part (c): Students often focus on 'coordinate the logistics' and ignore 'Myself' in the subject slot.",
        "shortcut": "'Myself / himself / herself' as the subject of a verb -> replace with 'I / he / she'."
    },
    {
        "id": 28,
        "type": "Spot the Error",
        "prompt": "(a) One should always / (b) stand by his / (c) principles even under / (d) severe pressure.",
        "options": {
            "a": "(a) One should always",
            "b": "(b) stand by his",
            "c": "(c) principles even under",
            "d": "(d) severe pressure."
        },
        "correctOption": "b",
        "correctedSentence": "One should always stand by one's principles even under severe pressure.",
        "rule": "Change 'his' to 'one's'. When the indefinite pronoun 'one' is the subject, its corresponding possessive determiner is 'one's' (and reflexive is 'oneself').",
        "distractor": "Part (a): Test-takers frequently focus on 'stand by' and overlook 'his' referring back to 'one'.",
        "shortcut": "Subject is 'One' -> look for 'one's' (not 'his/her/their')."
    },
    {
        "id": 29,
        "type": "Spot the Error",
        "prompt": "(a) Now it has / (b) finally dawned upon / (c) him that one / (d) must guard one's privacy.",
        "options": {
            "a": "(a) Now it has",
            "b": "(b) finally dawned upon",
            "c": "(c) him that one",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "Now it has finally dawned upon him that one must guard one's privacy.",
        "rule": "No error. The second clause introduces a new subject 'one', which properly takes 'one's' (and does not need to match 'him' in the earlier clause).",
        "distractor": "Part (b): Students often get confused by 'dawned upon him' and try to change 'one's' to 'his'.",
        "shortcut": "'One ... one's' together in the same clause -> correct as is."
    },
    {
        "id": 30,
        "type": "Spot the Error",
        "prompt": "(a) We must watch / (b) our diet carefully / (c) in order to / (d) keep oneself fit.",
        "options": {
            "a": "(a) We must watch",
            "b": "(b) our diet carefully",
            "c": "(c) in order to",
            "d": "(d) keep oneself fit."
        },
        "correctOption": "d",
        "correctedSentence": "We must watch our diet carefully in order to keep ourselves fit.",
        "rule": "Change 'oneself' to 'ourselves'. The subject of the sentence is 'We', so the matching reflexive/referent is 'ourselves', not the generic 'oneself'.",
        "distractor": "Part (a): Test-takers often look at 'watch our diet' and miss the shift to 'oneself' at the end.",
        "shortcut": "Subject 'We' with 'oneself' -> match to 'ourselves'."
    },
    {
        "id": 31,
        "type": "Spot the Error",
        "prompt": "(a) That is the / (b) engineer whom I / (c) believe designed the / (d) suspension bridge.",
        "options": {
            "a": "(a) That is the",
            "b": "(b) engineer whom I",
            "c": "(c) believe designed the",
            "d": "(d) suspension bridge."
        },
        "correctOption": "b",
        "correctedSentence": "That is the engineer who I believe designed the suspension bridge.",
        "rule": "Change 'whom' to 'who'. 'Who' is the subject of 'designed', even though 'I believe' is parenthetically inserted between 'who' and 'designed'.",
        "distractor": "Part (c): Students see 'I believe' right after 'whom' and assume 'whom' is an object of 'believe'.",
        "shortcut": "Spot 'who/whom + [I think/believe/know] + [verb]' -> delete 'I think/believe' mentally: if a subject is missing before the verb, pick 'who'."
    },
    {
        "id": 32,
        "type": "Spot the Error",
        "prompt": "(a) I met the / (b) intern whose father / (c) retired as a / (d) No error.",
        "options": {
            "a": "(a) I met the",
            "b": "(b) intern whose father",
            "c": "(c) retired as a",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "I met the intern whose father retired as a district judge.",
        "rule": "No error. 'Whose' expresses possession ('the intern's father') and modifies animate antecedents naturally.",
        "distractor": "Part (b): Students sometimes confuse 'whose' with 'who's' ('who is') and mark (b) as an error.",
        "shortcut": "'Whose + [noun]' ('whose father') = possession -> No error if 'who is' isn't meant."
    },
    {
        "id": 33,
        "type": "Spot the Error",
        "prompt": "(a) This is the / (b) old auditorium, of / (c) who the roof / (d) collapsed last week.",
        "options": {
            "a": "(a) This is the",
            "b": "(b) old auditorium, of",
            "c": "(c) who the roof",
            "d": "(d) collapsed last week."
        },
        "correctOption": "c",
        "correctedSentence": "This is the old auditorium, of which the roof collapsed last week.",
        "rule": "Change 'of who' to 'of which' (or 'whose roof'). For non-human/inanimate antecedents ('auditorium'), use 'which', never 'who'.",
        "distractor": "Part (d): Aspirants often focus on 'collapsed last week' and miss 'of who'.",
        "shortcut": "Non-living thing + 'who/whom' -> switch to 'which' (or 'whose' + noun)."
    },
    {
        "id": 34,
        "type": "Spot the Error",
        "prompt": "(a) He is one / (b) of the sharpest / (c) analysts who has / (d) worked in this firm.",
        "options": {
            "a": "(a) He is one",
            "b": "(b) of the sharpest",
            "c": "(c) analysts who has",
            "d": "(d) worked in this firm."
        },
        "correctOption": "c",
        "correctedSentence": "He is one of the sharpest analysts who have worked in this firm.",
        "rule": "Change 'who has' to 'who have'. In 'one of the + [plural noun] + who/which/that', the relative pronoun's antecedent is the plural noun ('analysts'), taking a plural verb ('have').",
        "distractor": "Part (a): Students spot 'one of' and automatically apply a singular verb 'has', forgetting the plural antecedent 'analysts'.",
        "shortcut": "'One of the [plural nouns] + who + [verb]' -> make the verb plural (unless restricted by 'the only one')."
    },
    {
        "id": 35,
        "type": "Spot the Error",
        "prompt": "(a) She is the / (b) only candidate who / (c) have cleared all / (d) three stages.",
        "options": {
            "a": "(a) She is the",
            "b": "(b) only candidate who",
            "c": "(c) have cleared all",
            "d": "(d) three stages."
        },
        "correctOption": "c",
        "correctedSentence": "She is the only candidate who has cleared all three stages.",
        "rule": "Change 'who have' to 'who has'. When modified by 'the only' ('the only candidate'), the relative pronoun 'who' refers to the singular 'candidate', requiring 'has'.",
        "distractor": "Part (d): Test-takers often check 'all three stages' and overlook 'who have'.",
        "shortcut": "'The only [singular noun] + who + [verb]' -> use a singular verb ('has/is/was')."
    },
    {
        "id": 36,
        "type": "Spot the Error",
        "prompt": "(a) He was unaware of / (b) the rules and the / (c) people who had / (d) framed the policy.",
        "options": {
            "a": "(a) He was unaware of",
            "b": "(b) the rules and the",
            "c": "(c) people who had",
            "d": "(d) framed the policy."
        },
        "correctOption": "c",
        "correctedSentence": "He was unaware of the rules and the people that had framed the policy.",
        "rule": "Change 'who' to 'that'. When a relative pronoun refers jointly to a thing/concept ('rules') and a person ('people'), 'that' is used instead of 'who' or 'which'.",
        "distractor": "Part (a): Students often focus on 'unaware of' and miss the mixed antecedent.",
        "shortcut": "Mixed antecedent ('thing + person') -> pick 'that'."
    },
    {
        "id": 37,
        "type": "Spot the Error",
        "prompt": "(a) It is the / (b) most inspiring novel / (c) which I have / (d) read this year.",
        "options": {
            "a": "(a) It is the",
            "b": "(b) most inspiring novel",
            "c": "(c) which I have",
            "d": "(d) read this year."
        },
        "correctOption": "c",
        "correctedSentence": "It is the most inspiring novel that I have read this year.",
        "rule": "Change 'which' to 'that'. After a superlative adjective ('the most inspiring'), 'that' is preferred over 'which'.",
        "distractor": "Part (b): Learners frequently check 'most inspiring' and accept 'which' for a book.",
        "shortcut": "Superlative ('most/best/only/all') + 'which' -> swap to 'that'."
    },
    {
        "id": 38,
        "type": "Spot the Error",
        "prompt": "(a) You can pick / (b) that you like / (c) from the display / (d) counter today.",
        "options": {
            "a": "(a) You can pick",
            "b": "(b) that you like",
            "c": "(c) from the display",
            "d": "(d) counter today."
        },
        "correctOption": "b",
        "correctedSentence": "You can pick what you like from the display counter today.",
        "rule": "Change 'that' to 'what' (or 'whatever'). Without a preceding antecedent noun, 'what/whatever' acts as a fused relative pronoun ('the thing(s) that').",
        "distractor": "Part (c): Students often focus on 'display counter' and miss the missing antecedent before 'that'.",
        "shortcut": "Verb + 'that you want/like' with no noun before 'that' -> change 'that' to 'what / whatever'."
    },
    {
        "id": 39,
        "type": "Spot the Error",
        "prompt": "(a) There are two / (b) candidates here, / (c) but who of them / (d) is more suitable?",
        "options": {
            "a": "(a) There are two",
            "b": "(b) candidates here,",
            "c": "(c) but who of them",
            "d": "(d) is more suitable?"
        },
        "correctOption": "c",
        "correctedSentence": "There are two candidates here, but which of them is more suitable?",
        "rule": "Change 'who' to 'which'. When selecting one out of a specific, limited group ('two candidates', 'of them'), 'which' is used instead of 'who'.",
        "distractor": "Part (d): Aspirants often focus on 'is more suitable' and overlook 'who of them'.",
        "shortcut": "'Which of + [group/them/us]' -> always 'which' (even for people)."
    },
    {
        "id": 40,
        "type": "Spot the Error",
        "prompt": "(a) To who did / (b) you hand over / (c) the sealed envelope / (d) this morning?",
        "options": {
            "a": "(a) To who did",
            "b": "(b) you hand over",
            "c": "(c) the sealed envelope",
            "d": "(d) this morning?"
        },
        "correctOption": "a",
        "correctedSentence": "To whom did you hand over the sealed envelope this morning?",
        "rule": "Change 'who' to 'whom'. Following a preposition ('To') and functioning as the indirect object of 'hand over', the objective form 'whom' is required.",
        "distractor": "Part (b): Students often focus on 'hand over' and leave 'who' unchanged.",
        "shortcut": "Preposition + 'who' ('to who / for who / with who') -> change to 'whom'."
    },
    {
        "id": 41,
        "type": "Spot the Error",
        "prompt": "(a) Neither of the / (b) two applicants have / (c) submitted the required / (d) domicile certificate.",
        "options": {
            "a": "(a) Neither of the",
            "b": "(b) two applicants have",
            "c": "(c) submitted the required",
            "d": "(d) domicile certificate."
        },
        "correctOption": "b",
        "correctedSentence": "Neither of the two applicants has submitted the required domicile certificate.",
        "rule": "Change 'have' to 'has'. 'Neither of' (like 'either of' and 'each of') followed by a plural noun takes a singular verb ('has') in formal grammar.",
        "distractor": "Part (a): Test-takers see 'two applicants' (plural) and match 'have' to 'applicants' instead of 'Neither'.",
        "shortcut": "'Neither / Either / Each of + [plural]' -> singular verb ('has / is / was')."
    },
    {
        "id": 42,
        "type": "Spot the Error",
        "prompt": "(a) Any of the / (b) two routes leading / (c) to the hill station / (d) is blocked by landslides.",
        "options": {
            "a": "(a) Any of the",
            "b": "(b) two routes leading",
            "c": "(c) to the hill station",
            "d": "(d) is blocked by landslides."
        },
        "correctOption": "a",
        "correctedSentence": "Either of the two routes leading to the hill station is blocked by landslides.",
        "rule": "Change 'Any' to 'Either'. 'Either' refers to one of two items, whereas 'any' is used for more than two.",
        "distractor": "Part (d): Students often check 'is blocked' and miss 'Any' used for 'two routes'.",
        "shortcut": "Two items/routes/options -> use 'either / neither / both', never 'any / none'."
    },
    {
        "id": 43,
        "type": "Spot the Error",
        "prompt": "(a) I asked three / (b) passersby for directions, / (c) but neither of them / (d) knew the way.",
        "options": {
            "a": "(a) I asked three",
            "b": "(b) passersby for directions,",
            "c": "(c) but neither of them",
            "d": "(d) knew the way."
        },
        "correctOption": "c",
        "correctedSentence": "I asked three passersby for directions, but none of them knew the way.",
        "rule": "Change 'neither' to 'none'. 'None' refers to more than two (here 'three passersby'), whereas 'neither' applies strictly to two.",
        "distractor": "Part (d): Many students focus on 'knew the way' and overlook 'neither' for three people.",
        "shortcut": "More than two + negative choice -> use 'none' (not 'neither')."
    },
    {
        "id": 44,
        "type": "Spot the Error",
        "prompt": "(a) None of the / (b) candidates deserves / (c) to be disqualified / (d) No error.",
        "options": {
            "a": "(a) None of the",
            "b": "(b) candidates deserves",
            "c": "(c) to be disqualified",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "None of the candidates deserves to be disqualified without a hearing.",
        "rule": "No error. 'None of' followed by a plural noun ('candidates') takes a singular verb ('deserves') in standard SSC grammar.",
        "distractor": "Part (b): Students who believe 'none' is always plural often try to change 'deserves' to 'deserve'.",
        "shortcut": "'None of + [plural noun]' in SSC grammar -> singular verb ('deserves / is / was') is standard."
    },
    {
        "id": 45,
        "type": "Spot the Error",
        "prompt": "(a) Each of the / (b) volunteers must carry / (c) their identity card / (d) during the drive.",
        "options": {
            "a": "(a) Each of the",
            "b": "(b) volunteers must carry",
            "c": "(c) their identity card",
            "d": "(d) during the drive."
        },
        "correctOption": "c",
        "correctedSentence": "Each of the volunteers must carry his identity card during the drive.",
        "rule": "Change 'their' to 'his' (or 'his or her'). 'Each' is grammatically singular, so in traditional SSC rules it takes a singular possessive determiner, not 'their'.",
        "distractor": "Part (b): Aspirants often focus on 'must carry' and miss 'their'.",
        "shortcut": "'Each of + [plural]' -> singular verb and singular possessive ('his' / 'his or her')."
    },
    {
        "id": 46,
        "type": "Spot the Error",
        "prompt": "(a) The three teammates / (b) blamed each other / (c) for missing the / (d) final penalty kick.",
        "options": {
            "a": "(a) The three teammates",
            "b": "(b) blamed each other",
            "c": "(c) for missing the",
            "d": "(d) final penalty kick."
        },
        "correctOption": "b",
        "correctedSentence": "The three teammates blamed one another for missing the final penalty kick.",
        "rule": "Change 'each other' to 'one another'. In traditional SSC grammar rules, 'each other' is used for two, while 'one another' is used for more than two ('three teammates').",
        "distractor": "Part (c): Students frequently focus on 'missing the final penalty kick' and overlook 'each other' for three people.",
        "shortcut": "Two -> 'each other'; Three or more -> 'one another'."
    },
    {
        "id": 47,
        "type": "Spot the Error",
        "prompt": "(a) Both of the / (b) finalists are not / (c) eligible for the / (d) junior category prize.",
        "options": {
            "a": "(a) Both of the",
            "b": "(b) finalists are not",
            "c": "(c) eligible for the",
            "d": "(d) junior category prize."
        },
        "correctOption": "b",
        "correctedSentence": "Neither of the finalists is eligible for the junior category prize.",
        "rule": "Change 'Both of the finalists are not' to 'Neither of the finalists is'. Standard SSC grammar avoids 'both ... not' in negative sentences, using 'neither' + singular verb instead.",
        "distractor": "Part (c): Test-takers often check 'eligible for' and miss 'Both ... not'.",
        "shortcut": "'Both ... not' -> replace with 'Neither ... [singular verb]'."
    },
    {
        "id": 48,
        "type": "Spot the Error",
        "prompt": "(a) Many a student / (b) have struggled with / (c) time management in / (d) the quantitative section.",
        "options": {
            "a": "(a) Many a student",
            "b": "(b) have struggled with",
            "c": "(c) time management in",
            "d": "(d) the quantitative section."
        },
        "correctOption": "b",
        "correctedSentence": "Many a student has struggled with time management in the quantitative section.",
        "rule": "Change 'have' to 'has'. The structure 'Many a + singular noun' ('Many a student') is singular in form and takes a singular verb ('has').",
        "distractor": "Part (a): Students see 'Many' at the start and assume a plural verb 'have' is needed.",
        "shortcut": "'Many a + [singular noun]' -> treat as singular ('has / is / was')."
    },
    {
        "id": 49,
        "type": "Spot the Error",
        "prompt": "(a) There is many / (b) reasons why commuters / (c) prefer the metro / (d) during peak hours.",
        "options": {
            "a": "(a) There is many",
            "b": "(b) reasons why commuters",
            "c": "(c) prefer the metro",
            "d": "(d) during peak hours."
        },
        "correctOption": "a",
        "correctedSentence": "There are many reasons why commuters prefer the metro during peak hours.",
        "rule": "Change 'is' to 'are'. In existential 'there' sentences, the verb agrees with the real subject that follows it ('many reasons' is plural -> 'are').",
        "distractor": "Part (c): Learners often focus on 'prefer the metro' and overlook 'There is' before a plural noun.",
        "shortcut": "'There is/are + [noun]' -> flip it mentally: 'Many reasons are...' -> pick 'are'."
    },
    {
        "id": 50,
        "type": "Spot the Error",
        "prompt": "(a) There was a / (b) sudden power cut / (c) in the auditorium / (d) No error.",
        "options": {
            "a": "(a) There was a",
            "b": "(b) sudden power cut",
            "c": "(c) in the auditorium",
            "d": "(d) No error."
        },
        "correctOption": "d",
        "correctedSentence": "There was a sudden power cut in the auditorium during the speech.",
        "rule": "No error. 'There was' properly agrees with the singular noun phrase 'a sudden power cut'.",
        "distractor": "Part (b): Students sometimes overthink 'power cut' (compound noun) and mark (b) when the sentence is grammatically sound.",
        "shortcut": "Singular noun after 'There was' -> No error."
    }
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
You can download questions.js directly and drop it into data/questions.js in your GitHub repository. Let me know if you want to add new sets for Noun & Number or Subject-Verb Agreement next!
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

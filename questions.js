// Question bank — two sets.
// Set 1: Norse Mythology (default, standard for ages 10-12)
// Set 2: Magnus Chase & the Sword of Summer, Ch 21-25 (Amanda's Cowork set)

window.QUESTION_SETS = {
  norse_mythology: {
    id: 'norse_mythology',
    label: 'Norse mythology',
    sublabel: 'Gods & goddesses · ages 10–12',
    blurb: 'Riddles from the Norse Gods & Goddesses bundle — gods, beasts, bridges, and bad decisions.',
    questions: [
      {
        q: "Who is the king of the Norse gods?",
        options: ["Thor", "Loki", "Odin", "Freyr"],
        answer: 2,
        note: "Odin rules Asgard — god of wisdom, war, magic, and poetry. He never did anything the easy way."
      },
      {
        q: "What did Odin give up to gain wisdom?",
        options: ["His hand", "His eye", "His hammer", "His crown"],
        answer: 1,
        note: "Odin traded an eye at Mimir's well. He also hung on Yggdrasil for nine days and nights to learn the runes."
      },
      {
        q: "What is the name of Thor's hammer?",
        options: ["Gjallarhorn", "Yggdrasil", "Gungnir", "Mjolnir"],
        answer: 3,
        note: "Mjolnir — once stolen by the giant Thrym, who was foolish enough to ask for Freyja in trade. Thor wore the dress."
      },
      {
        q: "Who is the trickster god of Norse mythology?",
        options: ["Tyr", "Loki", "Baldr", "Heimdall"],
        answer: 1,
        note: "Loki: shapeshifter, blood-brother of Odin, and father of Fenrir, Jormungandr, and Hel. Make mess, panic, improvise, repeat."
      },
      {
        q: "What does Heimdall guard?",
        options: ["Valhalla", "The underworld", "Bifrost", "Yggdrasil"],
        answer: 2,
        note: "Heimdall watches Bifrost, the rainbow bridge. His ears are so sharp he can hear grass grow."
      },
      {
        q: "Which goddess is associated with winter and hunting?",
        options: ["Frigg", "Freyja", "Hel", "Skadi"],
        answer: 3,
        note: "Skadi — giantess, skier, fierce hunter. She came to Asgard for revenge and ended up married to Njord instead."
      },
      {
        q: "Who lost a hand to the wolf Fenrir?",
        options: ["Odin", "Thor", "Tyr", "Freyr"],
        answer: 2,
        note: "Tyr placed his hand in Fenrir's mouth as a pledge, knowing the binding wouldn't break. Real courage, not the loud kind."
      },
      {
        q: "What is Ragnarok?",
        options: ["A type of weapon", "A great final battle", "A Norse holiday", "A bridge to Asgard"],
        answer: 1,
        note: "The end — wolves eat the sun and moon, gods fall, the world burns. Then a green earth rises from the ashes."
      },
      {
        q: "Which god is associated with light and was killed by a mistletoe dart?",
        options: ["Freyr", "Heimdall", "Baldr", "Njord"],
        answer: 2,
        note: "Frigg made every living thing swear not to harm Baldr — all except one small plant. Loki noticed."
      },
      {
        q: "Who rules the realm of the dead?",
        options: ["Skadi", "Frigg", "Freyja", "Hel"],
        answer: 3,
        note: "Hel — Loki's daughter, half-living and half-dead, ruler of the shadowy realm that bears her name."
      },
      {
        q: "What are the names of Odin's two ravens?",
        options: [
          "Geri and Freki",
          "Huginn and Muninn",
          "Sleipnir and Gullfaxi",
          "Skoll and Hati"
        ],
        answer: 1,
        note: "Huginn means Thought, Muninn means Memory. They fly the worlds each day and report back."
      },
      {
        q: "Which of these is NOT one of the Nine Worlds?",
        options: ["Jotunheim", "Midgard", "Olympus", "Niflheim"],
        answer: 2,
        note: "Olympus is Greek. The Norse Nine Worlds include Asgard, Midgard, Jotunheim, Vanaheim, Alfheim, Svartalfheim, Niflheim, Muspelheim, and Helheim."
      },
      {
        q: "What is Yggdrasil?",
        options: [
          "Odin's magic spear",
          "The great ash tree that connects the Nine Worlds",
          "The serpent that circles Midgard",
          "A hall in Asgard"
        ],
        answer: 1,
        note: "A wise eagle sits at the top, a serpent gnaws the roots, and a squirrel named Ratatoskr runs between them carrying insults."
      },
      {
        q: "Who is the queen of the gods and goddess of foresight?",
        options: ["Frigg", "Freyja", "Skadi", "Sif"],
        answer: 0,
        note: "Frigg — wife of Odin, mother of Baldr. She knows the future, but does not always reveal it."
      },
      {
        q: "Which goddess is associated with love, beauty, magic, and battle?",
        options: ["Frigg", "Freyja", "Hel", "Skadi"],
        answer: 1,
        note: "Freyja rode a chariot pulled by cats, owned the necklace Brisingamen, and received half the fallen warriors in her hall."
      },
      {
        q: "Who is the god of peace, sunlight, and good harvests?",
        options: ["Thor", "Freyr", "Njord", "Baldr"],
        answer: 1,
        note: "Freyr gave away his magical sword to win the giantess Gerdr. At Ragnarok, he'll have to fight without it."
      },
      {
        q: "Who is the god of the sea, sailing, and wealth?",
        options: ["Thor", "Tyr", "Njord", "Heimdall"],
        answer: 2,
        note: "Njord — father of Freyja and Freyr. Married Skadi, but she loved mountains and he loved the shore. It did not work out."
      },
      {
        q: "Who will blow the great horn Gjallarhorn to announce Ragnarok?",
        options: ["Odin", "Heimdall", "Tyr", "Thor"],
        answer: 1,
        note: "Heimdall — the god who never sleeps, so everyone else can. He and Loki destroy each other at the end."
      },
      {
        q: "Who are the three mysterious figures who weave the fate of gods and humans?",
        options: ["The Valkyries", "The Norns", "The Vanir", "The Aesir"],
        answer: 1,
        note: "The Norns shape destiny itself. Even the gods cannot escape what is woven for them."
      },
      {
        q: "What is the name of the serpent that circles the world in the sea?",
        options: ["Fenrir", "Nidhogg", "Jormungandr", "Ratatoskr"],
        answer: 2,
        note: "Jormungandr — another of Loki's monstrous children. Thor once nearly caught him on a fishing trip."
      },
      {
        q: "Loki is the father of which monstrous wolf?",
        options: ["Skoll", "Hati", "Garmr", "Fenrir"],
        answer: 3,
        note: "Fenrir — bound by a magical ribbon made of impossible things. He breaks free at Ragnarok and devours Odin."
      },
      {
        q: "Why did Thor once dress in a wedding gown and veil?",
        options: [
          "To hide from Loki at a feast",
          "To sneak into Hel's realm",
          "To trick the giant Thrym and get Mjolnir back",
          "To win a bet with Odin"
        ],
        answer: 2,
        note: "Thrym stole the hammer and demanded Freyja as payment. Thor put on the dress, grabbed Mjolnir, and smashed the wedding."
      },
      {
        q: "In Freyja's chariot, what animals pull her across the sky?",
        options: ["Goats", "Cats", "Wolves", "Ravens"],
        answer: 1,
        note: "Cats. Majestic or terrifying, depending on the cats."
      },
      {
        q: "What animals pull Thor's chariot?",
        options: ["Horses", "Goats", "Bears", "Boars"],
        answer: 1,
        note: "Goats. Metal. Literally."
      },
      {
        q: "Who is Hel's father?",
        options: ["Odin", "Thor", "Loki", "Njord"],
        answer: 2,
        note: "Hel's siblings are Fenrir the wolf and Jormungandr the world-serpent. Loki's family reunions must be unsettling."
      },
      {
        q: "The Norse believed offerings to the gods were called what?",
        options: ["Blots", "Runes", "Skalds", "Seidr"],
        answer: 0,
        note: "Blots — sacrifices of food, drink, weapons, or animals, often held in sacred groves or near rivers."
      },
      {
        q: "What is the name of the squirrel that runs up and down Yggdrasil carrying insults between an eagle and a serpent?",
        options: ["Ratatoskr", "Nidhogg", "Gullinbursti", "Sleipnir"],
        answer: 0,
        note: "Ratatoskr. The Norse had a god of thunder AND a gossip-squirrel. Balance."
      }
    ]
  },

  magnus_chase_ch21_25: {
    id: 'magnus_chase_ch21_25',
    label: 'Magnus Chase · Ch 21–25',
    sublabel: 'Rick Riordan · comprehension',
    blurb: 'Amanda\'s Cowork set. Comprehension questions from chapters 21 through 25 of The Sword of Summer.',
    questions: [
      {
        q: "What is one effect of the attack on Gunilla at the beginning of Chapter 21?",
        options: [
          "It makes Magnus trust Valhalla more.",
          "It makes Valhalla feel safer and more predictable.",
          "It increases the sense that danger can break into even powerful places.",
          "It proves that Gunilla cannot be injured."
        ],
        answer: 2,
        note: "Even Valhalla isn't safe — the attack cracks open the illusion of fortress."
      },
      {
        q: "What does Gunilla's reaction to being injured mostly reveal about her character?",
        options: [
          "She is weak and panicked.",
          "She is proud and determined not to appear vulnerable.",
          "She does not understand what happened.",
          "She wants Magnus to take charge."
        ],
        answer: 1,
        note: "Gunilla armors her pride faster than her wound — classic valkyrie."
      },
      {
        q: "What do Blitz and Hearth's reappearance in Chapter 22 mainly reveal?",
        options: [
          "They were never really worried about Magnus.",
          "They have been trying to protect Magnus in their own way.",
          "They only came back because Gunilla ordered them to.",
          "They want Magnus to return to Boston immediately."
        ],
        answer: 1,
        note: "The dwarf-and-elf duo had Magnus's back the whole time, quietly."
      },
      {
        q: "Why is the conversation about Hearth being an elf and Blitz being a dwarf important?",
        options: [
          "It adds random information that does not matter later.",
          "It shows Magnus already understands every part of the Nine Worlds.",
          "It develops the world while also deepening Magnus's relationship with them.",
          "It proves Magnus distrusts both of them."
        ],
        answer: 2,
        note: "Worldbuilding doubles as friendship — the Nine Worlds get bigger, so does the bond."
      },
      {
        q: "What is the best explanation for why Magnus wants to leave Valhalla in these chapters?",
        options: [
          "He is bored by the food and his room.",
          "He wants to prove he can survive alone forever.",
          "He feels that comfort in Valhalla cannot solve the deeper problems troubling him.",
          "He has decided Valhalla is completely evil."
        ],
        answer: 2,
        note: "Comfort isn't the same as resolution. Magnus knows the difference."
      },
      {
        q: "How does the funeral home setting in Chapter 25 mainly affect the mood?",
        options: [
          "It makes the chapter cheerful and relaxed.",
          "It creates a mix of grief, discomfort, and dark humor.",
          "It makes the scene feel magical and exciting.",
          "It removes all tension from the story."
        ],
        answer: 1,
        note: "Grief + awkward + a joke — Riordan's signature tonal cocktail."
      },
      {
        q: "What does Magnus's reaction to seeing his own body suggest?",
        options: [
          "He feels proud of his heroic death.",
          "He is emotionally detached from his old life.",
          "He is disturbed by the reality of death and what it means for his identity.",
          "He only cares about getting his sword back."
        ],
        answer: 2,
        note: "Seeing your own body is never a shrug. Magnus wobbles — fairly."
      },
      {
        q: "What role does humor play in Chapters 21–25?",
        options: [
          "It replaces all serious emotions.",
          "It reveals how Magnus copes with fear, grief, and discomfort.",
          "It shows that the danger is not real.",
          "It makes the supporting characters seem foolish."
        ],
        answer: 1,
        note: "Magnus jokes the way some people flinch — it's a defense, not denial."
      },
      {
        q: "Which statement best describes Gunilla's role in these chapters?",
        options: [
          "She is simply a villain blocking Magnus for no reason.",
          "She is only a background character with little influence.",
          "She acts as both an obstacle and a guide, warning Magnus while still pushing him.",
          "She is Magnus's closest ally in Valhalla."
        ],
        answer: 2,
        note: "Antagonist-mentor hybrid. She'll push you off the bridge AND tell you to land well."
      },
      {
        q: "Which theme is developed most strongly across Chapters 21–25?",
        options: [
          "Safety always leads to happiness.",
          "Friendship matters most when life is calm and easy.",
          "A person can be surrounded by protection and still feel lost or trapped.",
          "Power automatically makes people trustworthy."
        ],
        answer: 2,
        note: "Valhalla is a gilded cage until Magnus decides otherwise."
      }
    ]
  }
};

// --- Magnus Chase: Chapters 1-10 ---
window.QUESTION_SETS.magnus_chase_ch1_10 = {
  id: 'magnus_chase_ch1_10',
  label: 'Magnus Chase · Ch 1–10',
  sublabel: 'Rick Riordan · comprehension',
  blurb: 'Quick Check comprehension quiz for chapters 1 through 10 of The Sword of Summer.',
  questions: [
    { q: "Which event sets the story in motion at the beginning of these chapters?",
      options: [
        "Magnus receives a magical weapon in the mail",
        "Magnus goes to live with Randolph immediately",
        "Magnus is warned that he is in danger and is pulled into events larger than himself",
        "Magnus decides on his own to search for Asgard"
      ], answer: 2,
      note: "The inciting incident — Magnus is yanked into a bigger world. Story Elements."
    },
    { q: "Which word best describes Magnus's narration in Chapters 1–10?",
      options: ["formal", "humorous", "mysterious", "scholarly"],
      answer: 1,
      note: "Magnus narrates with wit and sarcasm — Author's Style."
    },
    { q: "Why is Magnus unsure whether he should trust Randolph?",
      options: [
        "Randolph refuses to speak to him",
        "Randolph acts strangely and gives confusing, intense information",
        "Randolph steals something from Magnus",
        "Randolph says he has never met Magnus before"
      ], answer: 1,
      note: "Randolph's intensity + cryptic info = trust issues. Character Analysis."
    },
    { q: "What does the bridge battle mainly reveal about Magnus?",
      options: [
        "He avoids danger whenever possible",
        "He only acts when others tell him what to do",
        "He can be brave even when he is afraid and confused",
        "He understands everything happening around him"
      ], answer: 2,
      note: "Bravery under confusion — Magnus acts even without a full picture."
    },
    { q: "Which of the following is one important change in Magnus's situation by Chapter 10?",
      options: [
        "He returns to his old life in Boston",
        "He begins to understand that he is in a strange new world with new rules",
        "He decides he wants to become a soldier",
        "He finds out the danger is over"
      ], answer: 1,
      note: "A genre shift for Magnus — new world, new rules. Plot Development."
    },
    { q: "In Chapters 9–10, the setting of Hotel Valhalla mainly creates a feeling of —",
      options: [
        "boredom and routine",
        "danger and hopelessness",
        "wonder mixed with confusion",
        "anger and revenge"
      ], answer: 2,
      note: "Valhalla = awe + disorientation. Setting & Mood."
    },
    { q: "What is the best explanation for why Magnus reacts so strongly to his room in Chapter 10?",
      options: [
        "He has always wanted expensive furniture",
        "The room reminds him of what comfort, safety, and stability feel like",
        "He plans to stay there forever",
        "He wants to impress the other guests"
      ], answer: 1,
      note: "Magnus has been homeless — safety hits hard. Inference."
    },
    { q: "Which detail best shows that the world Magnus has entered is not normal?",
      options: [
        "There are many guests in the hotel",
        "The rooms are large and comfortable",
        "Everyday things are mixed with magical or impossible details",
        "Magnus is tired from traveling"
      ], answer: 2,
      note: "The ordinary + the impossible, side by side. Setting & Details."
    },
    { q: "What is one major conflict in Chapters 1–10?",
      options: [
        "Magnus vs. his school",
        "Magnus vs. the strange world and dangers he does not yet understand",
        "Magnus vs. his best friend",
        "Magnus vs. the weather"
      ], answer: 1,
      note: "Character vs. unknown world — the core tension. Conflict."
    },
    { q: "Why is Chapter 11's title, \"Pleased to Meet You. I Will Now Crush Your Windpipe,\" effective based on the style of the earlier chapters?",
      options: [
        "It gives away the ending",
        "It matches the book's mix of humor and threat",
        "It proves Magnus is the villain",
        "It shows the story is changing into realistic fiction"
      ], answer: 1,
      note: "Signature Riordan — jokes carrying real danger. Author's Style."
    }
  ]
};

// --- Magnus Chase: Chapters 11-15 ---
window.QUESTION_SETS.magnus_chase_ch11_15 = {
  id: 'magnus_chase_ch11_15',
  label: 'Magnus Chase · Ch 11–15',
  sublabel: 'Rick Riordan · comprehension',
  blurb: 'Quick Check comprehension quiz for chapters 11 through 15 of The Sword of Summer.',
  questions: [
    { q: "What does the dialogue between Magnus and Sam mostly reveal?",
      options: [
        "They trust each other completely.",
        "Their relationship is tense, but Sam is still trying to help him.",
        "They dislike each other and refuse to cooperate.",
        "Sam knows very little about Valhalla."
      ], answer: 1,
      note: "Sam pushes back, but she's on Magnus's side. Dialogue & Character Relationships."
    },
    { q: "Why does Magnus keep making jokes in serious situations?",
      options: [
        "He wants to make everyone laugh.",
        "He is naturally silly all the time.",
        "Humor helps reveal that he is uncomfortable and overwhelmed.",
        "He does not understand what is happening."
      ], answer: 2,
      note: "Jokes as armor — humor reveals what Magnus is hiding. Character Analysis."
    },
    { q: "What can the reader infer about life in Valhalla from Magnus's first conversations and observations?",
      options: [
        "It is simple, peaceful, and easy to understand.",
        "It is glamorous on the surface, but full of tension, rules, and expectations underneath.",
        "It is boring and ordinary.",
        "It is exactly like life on Earth."
      ], answer: 1,
      note: "Glitter on top, tension underneath. Inference."
    },
    { q: "Why does the author give Magnus funny thoughts during uncomfortable moments?",
      options: [
        "To distract the reader from the story",
        "To show Magnus's voice and how he handles fear",
        "To make the other characters seem foolish",
        "To make the chapter less important"
      ], answer: 1,
      note: "Voice doing double duty — comedy + coping. Author's Style."
    },
    { q: "How does the author describe Valhalla so that it feels both amazing and strange?",
      options: [
        "By keeping the descriptions short and plain",
        "By avoiding details about the hall and its creatures",
        "By using vivid details that create wonder along with discomfort",
        "By making Valhalla seem like a normal cafeteria"
      ], answer: 2,
      note: "Vivid = awe + unease at once. Setting & Description."
    },
    { q: "Why is Odin's empty throne especially important in these chapters?",
      options: [
        "It makes the hall seem unimportant",
        "It symbolizes mystery, authority, and a powerful absence",
        "It shows no one really cares about the ceremony",
        "It is only mentioned as decoration"
      ], answer: 1,
      note: "Absence = presence. The throne is loudest when empty. Symbolism."
    },
    { q: "How does the author build suspense during the judging ceremony?",
      options: [
        "By ending the ceremony quickly",
        "By making the scene cheerful and relaxed",
        "By increasing Magnus's awareness that he may soon be judged in front of everyone",
        "By skipping over the details of the ceremony"
      ], answer: 2,
      note: "Slow build, rising dread. Suspense & Pacing."
    },
    { q: "What is the main conflict Magnus faces in Chapter 15?",
      options: [
        "He is hungry and wants more food",
        "He faces public judgment and unfair criticism about his worthiness",
        "He wants to leave Valhalla immediately",
        "He argues with Sam about where to sit"
      ], answer: 1,
      note: "A trial by crowd — public judgment of his worth. Conflict."
    },
    { q: "What does the dialogue in Chapter 15 reveal about the thanes' judgment of Magnus?",
      options: [
        "They are calm, fair, and willing to hear every side.",
        "They are confused but mostly uninterested.",
        "They are influenced by bias, appearances, and Magnus's family connections.",
        "They admire Magnus immediately and support him."
      ], answer: 2,
      note: "Not a fair trial — bias in the room. Dialogue & Theme."
    },
    { q: "What effect does the arrival of the Norns have at the end of Chapter 15?",
      options: [
        "It makes the scene feel less serious.",
        "It increases the sense of fate, danger, and importance.",
        "It ends the conflict and settles the crowd.",
        "It turns the ceremony into a celebration."
      ], answer: 1,
      note: "Fate walks in — the stakes jump. Plot & Mood."
    }
  ]
};

// --- Magnus Chase: Chapters 16-20 ---
window.QUESTION_SETS.magnus_chase_ch16_20 = {
  id: 'magnus_chase_ch16_20',
  label: 'Magnus Chase · Ch 16–20',
  sublabel: 'Rick Riordan · comprehension',
  blurb: 'Quick Check comprehension quiz for chapters 16 through 20 of The Sword of Summer.',
  questions: [
    { q: "What makes the Norns scene at the beginning of Chapter 16 feel so intense?",
      options: [
        "The setting is cheerful and welcoming.",
        "Magnus is praised immediately by everyone present.",
        "The scene is filled with mystery, judgment, and the feeling that something important is about to happen.",
        "The chapter focuses mostly on food and celebration."
      ], answer: 2,
      note: "The Norns arrive and the air gets heavy. Suspense & Mood."
    },
    { q: "What is Magnus's main internal struggle after learning more about who he is?",
      options: [
        "He wants a better room in Valhalla.",
        "He is trying to understand what his identity means and what is expected of him.",
        "He is deciding whether to leave Blitz and Hearth behind.",
        "He is choosing which weapon to use in training."
      ], answer: 1,
      note: "Identity under pressure — who am I, and who do they need me to be? Internal Conflict."
    },
    { q: "What can the reader infer about Valhalla from Chapters 16–18?",
      options: [
        "It is only a reward with no serious expectations.",
        "It is glamorous on the surface but still full of rules, pressure, and danger.",
        "It is mostly quiet and uneventful.",
        "It is exactly like an ordinary hotel."
      ], answer: 1,
      note: "Reward and pressure cooker, at once. Inference."
    },
    { q: "Why does the author continue giving Magnus humorous thoughts in serious moments?",
      options: [
        "To show that Magnus is not paying attention",
        "To make the other characters seem silly",
        "To reveal Magnus's voice and how he handles fear and uncertainty",
        "To prove the dangers are not real"
      ], answer: 2,
      note: "Humor is how Magnus stays intact. Author's Style."
    },
    { q: "How does the author describe Valhalla so that it feels both impressive and unsettling?",
      options: [
        "By keeping the descriptions plain and ordinary",
        "By using vivid details that create wonder along with discomfort",
        "By showing that Magnus feels completely at home there",
        "By avoiding description altogether"
      ], answer: 1,
      note: "Same trick as before — vivid = wonder + unease. Setting & Description."
    },
    { q: "What is one important effect of Magnus meeting the einherjar on Floor 19?",
      options: [
        "He decides he no longer needs friends",
        "He realizes that Valhalla is stranger and more layered than he first thought",
        "He becomes fully confident in his role",
        "He stops asking questions about the world around him"
      ], answer: 1,
      note: "The world keeps getting bigger. Plot Development."
    },
    { q: "How does the author build suspense in Chapters 16 and 20?",
      options: [
        "By making every event easy to predict",
        "By slowing the pace and increasing Magnus's sense of uncertainty and danger",
        "By turning the serious scenes into pure comedy",
        "By resolving the conflicts immediately"
      ], answer: 1,
      note: "Slow the pace, raise the stakes. Suspense & Pacing."
    },
    { q: "What is the main conflict Magnus faces in Chapter 19?",
      options: [
        "He is bored with the routines in Valhalla",
        "He struggles against battle expectations and the danger of training",
        "He argues with Blitz about dwarven clothing",
        "He is trying to win a feast competition"
      ], answer: 1,
      note: "Training as conflict — the expectations hurt as much as the weapons. Conflict."
    },
    { q: "What does the dialogue in Chapter 20 mostly reveal?",
      options: [
        "Magnus fully understands everything happening to him",
        "The characters around Magnus are relaxed and unworried",
        "Magnus is caught in a world of power, threat, and expectations he does not yet control",
        "The vision has no real meaning for the plot"
      ], answer: 2,
      note: "Magnus is in the current, not steering. Dialogue & Plot."
    },
    { q: "What idea is developed most strongly across Chapters 16–20?",
      options: [
        "Comfort always solves deeper problems",
        "Identity is simple once someone tells you who you are",
        "A person can be chosen for something important and still feel confused, pressured, or unready",
        "Power always belongs to the people who deserve it most"
      ], answer: 2,
      note: "Chosen ≠ ready. Theme."
    }
  ]
};

window.QUESTION_SETS.magnus_chase_ch26_30 = {
  id: 'magnus_chase_ch26_30',
  label: 'Magnus Chase · Ch 26–30',
  sublabel: 'Rick Riordan · comprehension',
  blurb: 'Quick Check comprehension quiz for chapters 26 through 30 of The Sword of Summer.',
  questions: [
    { q: "What does Magnus's reunion with Annabeth in Chapter 26 mainly reveal?",
      options: [
        "He no longer cares about his old life.",
        "He wants Annabeth to solve his problems for him.",
        "He still deeply cares about her, but believes distance may protect her.",
        "He is angry that she came looking for him."
      ], answer: 2, note: "Caring ≠ safe to stay. Character Relationships." },
    { q: "Why does Magnus choose not to tell Annabeth everything?",
      options: ["He does not trust her anymore.","He wants to make her feel confused.","He believes involving her more deeply could put her in danger.","He has already forgotten what happened."],
      answer: 2, note: "Protection through withholding. Inference / Motivation." },
    { q: "What can the reader infer about Magnus from his choices in these chapters?",
      options: ["He prefers fighting over thinking.","He is beginning to accept that survival may require difficult and painful decisions.","He no longer values friendship.","He trusts every magical being he meets."],
      answer: 1, note: "Growth through hard choices. Character Analysis." },
    { q: "What role does humor play in Chapters 26–30?",
      options: ["It makes the danger feel completely unimportant.","It reveals how Magnus handles fear, confusion, and pressure.","It proves the characters do not care about the mission.","It shows Magnus is not taking anything seriously."],
      answer: 1, note: "Humor as coping mechanism, again. Author's Style." },
    { q: "What do the bargaining scenes in these chapters most strongly suggest?",
      options: ["Strength is the only thing that matters in the Nine Worlds.","Knowledge and negotiation can be just as important as weapons.","Every deal in the story is fair and simple.","Magnus is naturally skilled at all forms of bargaining."],
      answer: 1, note: "Words can be weapons too. Theme." },
    { q: "What effect does the eagle's presence have on the story?",
      options: ["It makes the story feel calm and predictable.","It increases the tension while adding absurd humor.","It solves Magnus's problems immediately.","It shows that Magnus is in complete control."],
      answer: 1, note: "Menace + absurdity, the Riordan house blend. Mood." },
    { q: "What is one important conflict Magnus faces in these chapters?",
      options: ["He cannot decide what to eat.","He must choose between staying safe and moving forward in the quest.","He wants to return to Valhalla for more training.","He argues with Blitz about clothing."],
      answer: 1, note: "Safety vs. duty — classic quest tension. Conflict." },
    { q: "What does the dialogue in these chapters often reveal?",
      options: ["Characters usually say exactly what they mean with no hidden motives.","The world Magnus is in runs on bargains, partial truths, warnings, and shifting loyalties.","Magnus understands every magical rule immediately.","The side characters have no real influence on the plot."],
      answer: 1, note: "A world built on half-said things. Worldbuilding." },
    { q: "Which statement best describes Magnus's emotional state across Chapters 26–30?",
      options: ["Confident, relaxed, and fully certain of every choice","Angry at everyone and unwilling to listen","Torn between emotional attachment, danger, and the need to keep moving","Completely detached from the people around him"],
      answer: 2, note: "Torn, not broken. Character Analysis." },
    { q: "Which theme is developed most strongly across Chapters 26–30?",
      options: ["Comfort always leads to wisdom.","Heroes succeed by using force alone.","Caring about others can make choices harder, not easier.","Rules are always fair if they come from powerful beings."],
      answer: 2, note: "Love complicates. That's the theme. Theme." }
  ]
};

window.QUESTIONS = window.QUESTION_SETS.norse_mythology.questions;

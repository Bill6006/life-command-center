import type {
  DomainDefinition,
  DomainFieldDefinition,
  DomainFieldOption,
  DomainTabId
} from "./types";

const yesNoOptions: readonly DomainFieldOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const dailyToggle = (
  id: string,
  label: string,
  help?: string
): DomainFieldDefinition => ({
  id,
  label,
  help,
  kind: "toggle",
  scope: "day"
});

const dailyScale = (
  id: string,
  label: string,
  help?: string
): DomainFieldDefinition => ({
  id,
  label,
  help,
  kind: "scale",
  min: 0,
  max: 10,
  step: 1,
  scope: "day"
});

export const DOMAIN_DEFINITIONS: Record<DomainTabId, DomainDefinition> = {
  health: {
    id: "health",
    tab: "health",
    storageKey: "health",
    eyebrow: "Health and recovery",
    title: "Match the plan to current readiness.",
    description:
      "Log only what is known, choose a movement level, and keep recovery separate from exact programming.",
    boundary: "Life Command Center owns readiness and the movement ladder. Fitbod owns exercises and equipment.",
    sections: [
      {
        id: "health-readiness",
        eyebrow: "Current body",
        title: "Body Readiness",
        description: "Unknown stays unknown. A low value changes direction, not worth.",
        fields: [
          dailyScale("energy", "Energy"),
          {
            id: "recoveryRisk",
            label: "Recovery risk",
            help: "0 means no known risk; 100 means protect recovery now.",
            kind: "number",
            min: 0,
            max: 100,
            step: 5,
            scope: "day"
          },
          {
            id: "healthMode",
            label: "Health Mode",
            kind: "choice",
            scope: "day",
            options: [
              { value: "protect", label: "Protect" },
              { value: "restore", label: "Restore" },
              { value: "build", label: "Build" }
            ]
          },
          {
            id: "activeLoad",
            label: "Active load",
            kind: "choice",
            scope: "day",
            options: [
              { value: "none", label: "None logged" },
              { value: "light", label: "Light" },
              { value: "moderate", label: "Moderate" },
              { value: "high", label: "High" }
            ]
          }
        ]
      },
      {
        id: "health-recovery",
        eyebrow: "Recovery inputs",
        title: "Recovery",
        description: "Record the input without manufacturing a health conclusion.",
        fields: [
          {
            id: "sleepHours",
            label: "Last-night sleep hours",
            kind: "number",
            min: 0,
            max: 24,
            step: 0.25,
            scope: "day"
          },
          {
            id: "hydration",
            label: "Hydration check",
            kind: "choice",
            scope: "day",
            options: [
              { value: "needs-attention", label: "Needs attention" },
              { value: "in-progress", label: "In progress" },
              { value: "covered", label: "Covered" }
            ]
          },
          dailyToggle("sunlight", "Sunlight"),
          dailyToggle("rest", "Deliberate rest")
        ]
      },
      {
        id: "health-movement",
        eyebrow: "Movement boundary",
        title: "Movement Ladder",
        description: "Choose the level only. Exact training remains external.",
        fields: [
          {
            id: "movementLevel",
            label: "Readiness-matched level",
            kind: "choice",
            scope: "day",
            options: [
              { value: "recovery", label: "Recovery" },
              { value: "micro", label: "Micro" },
              { value: "starter", label: "Starter" },
              { value: "planned", label: "Planned movement" }
            ]
          },
          dailyToggle("movementCompleted", "Movement completed"),
          {
            id: "movementNote",
            label: "Movement note",
            help: "Optional local note; do not paste private medical records.",
            kind: "text",
            scope: "day",
            private: true
          }
        ]
      }
    ]
  },
  pattern: {
    id: "pattern",
    tab: "pattern",
    storageKey: "pattern",
    eyebrow: "Pattern lab",
    title: "Separate timing, effects, and uncertainty.",
    description:
      "Last night, tonight, food, caffeine, energy, and mood stay distinct so a pattern is never invented.",
    boundary: "Private-pattern fields remain local and excluded from sanitized exports unless explicitly included.",
    sections: [
      {
        id: "pattern-last-night",
        eyebrow: "Completed night",
        title: "Last night",
        description: "A completed-night record is not the same as tonight's intention.",
        fields: [
          {
            id: "sleepHours",
            label: "Sleep hours",
            kind: "number",
            min: 0,
            max: 24,
            step: 0.25,
            scope: "day"
          },
          { id: "wakeTime", label: "Wake time", kind: "time", scope: "day" },
          dailyToggle("phoneLate", "Phone used late"),
          {
            id: "nightFood",
            label: "Night food detail",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "nextMorningEffects",
            label: "Next-morning effects",
            kind: "text",
            scope: "day",
            private: true
          }
        ]
      },
      {
        id: "pattern-today",
        eyebrow: "Time-aware inputs",
        title: "Current effects and inputs",
        description: "Food blocks and caffeine remain separate from any later outcome claim.",
        fields: [
          dailyScale("energy", "Energy"),
          dailyScale("mood", "Mood"),
          {
            id: "currentEffects",
            label: "Current effects",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "dayFoodMorning",
            label: "Morning food",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "dayFoodAfternoon",
            label: "Afternoon food",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "dayFoodEvening",
            label: "Evening food",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "caffeineWindow",
            label: "Latest caffeine window",
            kind: "choice",
            scope: "day",
            options: [
              { value: "none", label: "None" },
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Evening" }
            ]
          },
          {
            id: "energySymptoms",
            label: "Energy symptoms",
            kind: "text",
            scope: "day",
            private: true
          },
          dailyToggle("reading", "Reading"),
          dailyToggle("piano", "Piano")
        ]
      },
      {
        id: "pattern-tonight",
        eyebrow: "Future intention",
        title: "Tonight",
        description: "Intentions never overwrite the completed-night record.",
        fields: [
          { id: "sleepIntention", label: "Sleep intention", kind: "time", scope: "day" },
          {
            id: "preBedStressors",
            label: "Pre-bed stressors",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "includePrivatePatterns",
            label: "Include private pattern fields in explicit pattern exports",
            help: "Off by default. Full Backup remains a complete local recovery artifact.",
            kind: "toggle",
            scope: "durable"
          }
        ]
      }
    ]
  },
  therapy: {
    id: "therapy",
    tab: "therapy",
    storageKey: "therapy",
    eyebrow: "Pattern and therapy",
    title: "Name the state without turning it into a verdict.",
    description:
      "Emotional signals are source-qualified, private by default, and useful only after an explicit entry.",
    boundary: "Unknown is not calm, failure, or evidence. It remains unknown.",
    sections: [
      {
        id: "therapy-dashboard",
        eyebrow: "Emotional dashboard",
        title: "What is known now?",
        description: "Use 0–10 values only when the value is actually known.",
        fields: [
          dailyScale("stress", "Stress"),
          dailyScale("loneliness", "Loneliness"),
          dailyScale("confidence", "Confidence"),
          dailyScale("overwhelm", "Overwhelm"),
          dailyScale("irritability", "Irritability"),
          dailyScale("mood", "Mood")
        ]
      },
      {
        id: "therapy-regulation",
        eyebrow: "Humane response",
        title: "Reset and reflection",
        description: "A tool is an option, not a moral requirement.",
        fields: [
          {
            id: "resetTool",
            label: "Reset tool",
            kind: "choice",
            scope: "day",
            options: [
              { value: "pause", label: "Pause" },
              { value: "breathe", label: "Breathe" },
              { value: "walk", label: "Walk" },
              { value: "write", label: "Write" },
              { value: "reach-out", label: "Reach out" }
            ]
          },
          {
            id: "quickJournal",
            label: "Quick journal",
            kind: "text",
            scope: "day",
            private: true
          },
          {
            id: "followUp",
            label: "Private follow-up note",
            help: "Only use this after a real event; leaving it blank creates no follow-up evidence.",
            kind: "text",
            scope: "day",
            private: true
          }
        ]
      }
    ]
  },
  azure: {
    id: "azure",
    tab: "azure",
    storageKey: "azure",
    eyebrow: "Azure and learning",
    title: "Turn practice into defensible proof.",
    description:
      "Skills, proof stages, gaps, and Work Wins stay local, reviewable, and upward-only.",
    boundary: "A draft claim is not resume-ready evidence until the user explicitly verifies it.",
    sections: [
      {
        id: "azure-current",
        eyebrow: "Current mission",
        title: "Focus and learning",
        description: "Connect today's focus to the existing forecast without inventing completion.",
        fields: [
          dailyScale("focus", "Focus"),
          dailyScale("drive", "Drive"),
          {
            id: "mission",
            label: "Current mission",
            kind: "text",
            scope: "day"
          },
          {
            id: "currentSkill",
            label: "Current AZ-104 skill",
            kind: "text",
            scope: "durable"
          },
          {
            id: "status",
            label: "Status ladder",
            kind: "choice",
            scope: "durable",
            options: [
              { value: "practice", label: "Practice" },
              { value: "build", label: "Build" },
              { value: "break-fix", label: "Break / fix" },
              { value: "screenshot", label: "Screenshot proof" },
              { value: "explain", label: "Explain from memory" },
              { value: "resume", label: "Resume-ready" }
            ]
          }
        ]
      },
      {
        id: "azure-proof",
        eyebrow: "Proof truth",
        title: "Queue, gaps, and claims",
        description: "Keep capability, adoption, and personal evidence separate.",
        fields: [
          {
            id: "proofQueue",
            label: "Proof queue",
            kind: "text",
            scope: "durable",
            private: true
          },
          {
            id: "proofLog",
            label: "Proof log",
            kind: "text",
            scope: "durable",
            private: true
          },
          {
            id: "weakTopics",
            label: "Weak topics",
            kind: "text",
            scope: "durable"
          },
          {
            id: "resumeTruth",
            label: "Resume truth",
            kind: "choice",
            scope: "durable",
            options: [
              { value: "gap", label: "Explain-from-memory gap" },
              { value: "draft", label: "Draft claim" },
              { value: "verified", label: "Verified claim" }
            ]
          },
          {
            id: "normalizedClaim",
            label: "Normalized claim draft",
            kind: "text",
            scope: "durable",
            private: true
          },
          {
            id: "learningNext",
            label: "Learning-engine next step",
            kind: "text",
            scope: "durable"
          }
        ]
      }
    ]
  },
  father: {
    id: "father",
    tab: "father",
    storageKey: "childGrowth",
    eyebrow: "Fatherhood and child growth",
    title: "Notice, connect, teach, and repair.",
    description:
      "Daily connection and weekly growth evidence remain separate from durable skill stages.",
    boundary: "Neutral child-profile identifiers keep public code and screenshots free of personal data.",
    sections: [
      {
        id: "father-growth",
        eyebrow: "Growth model",
        title: "Skills and stage",
        description: "Suggestions can move forward only after explicit evidence.",
        fields: [
          {
            id: "stage",
            label: "Current stage",
            kind: "choice",
            scope: "durable",
            options: [
              { value: "notice", label: "Notice" },
              { value: "practice", label: "Practice" },
              { value: "consistent", label: "Consistent" },
              { value: "independent", label: "Independent" }
            ]
          },
          { id: "categorySkill", label: "Category skill", kind: "text", scope: "durable" },
          { id: "customSkill", label: "Custom skill", kind: "text", scope: "durable" },
          {
            id: "stageEvidence",
            label: "Progression evidence",
            kind: "text",
            scope: "durable",
            private: true
          }
        ]
      },
      {
        id: "father-today",
        eyebrow: "Daily presence",
        title: "Connection and coaching",
        description: "One real rep is evidence; a blank is not a miss.",
        fields: [
          dailyToggle("connection", "Deliberate connection"),
          dailyToggle("teaching", "Teaching rep"),
          dailyToggle("independence", "Independence rep"),
          dailyToggle("emotionNaming", "Emotion naming"),
          dailyToggle("repair", "Repair"),
          dailyToggle("noticing", "Noticing"),
          dailyToggle("coaching", "Coaching rep"),
          { id: "tinyLesson", label: "Tiny lesson", kind: "text", scope: "day" },
          {
            id: "observation",
            label: "Observation note",
            kind: "text",
            scope: "day",
            private: true
          }
        ]
      },
      {
        id: "father-week",
        eyebrow: "Weekly truth",
        title: "Review without regression",
        description: "A stale or missing week cannot roll durable growth backward.",
        fields: [
          {
            id: "weeklyReview",
            label: "Weekly review",
            kind: "text",
            scope: "durable",
            private: true
          },
          {
            id: "weeklyFocus",
            label: "Weekly Growth Focus",
            kind: "text",
            scope: "durable"
          }
        ]
      }
    ]
  },
  faith: {
    id: "faith",
    tab: "faith",
    storageKey: "faith",
    eyebrow: "Faith and meaning",
    title: "Keep the next faithful action visible.",
    description:
      "Practice, meaning, service, gratitude, and pressure release stay low-pressure and explicit.",
    boundary: "No blank practice is counted as failure, and no streak becomes a moral score.",
    sections: [
      {
        id: "faith-practice",
        eyebrow: "Minimum action",
        title: "Practice for today",
        description: "Choose a minimum only when it is useful.",
        fields: [
          {
            id: "minimumAction",
            label: "Minimum action",
            kind: "choice",
            scope: "day",
            options: [
              { value: "pay-daily", label: "Pay Daily" },
              { value: "audio", label: "Audio" },
              { value: "prayer", label: "Prayer" },
              { value: "zion", label: "Zion subject" }
            ]
          },
          dailyToggle("preaching", "Preaching"),
          dailyToggle("service", "Service / compassion"),
          dailyToggle("gratitude", "Gratitude"),
          dailyToggle("pressureRelease", "Pressure release"),
          dailyToggle("saturdaySupport", "Saturday support")
        ]
      },
      {
        id: "faith-direction",
        eyebrow: "Meaning and direction",
        title: "Learning and integration",
        description: "Notes remain local and optional.",
        fields: [
          { id: "zionSubject", label: "Zion subject track", kind: "text", scope: "durable" },
          {
            id: "faithNote",
            label: "Faith note",
            kind: "text",
            scope: "day",
            private: true
          },
          { id: "meaningLine", label: "Meaning line", kind: "text", scope: "day" },
          {
            id: "directionPrayer",
            label: "Direction prayer",
            kind: "text",
            scope: "day",
            private: true
          },
          { id: "integration", label: "Integration", kind: "text", scope: "day" }
        ]
      }
    ]
  },
  money: {
    id: "money",
    tab: "money",
    storageKey: "money",
    eyebrow: "Money",
    title: "See the next useful financial decision.",
    description:
      "All amounts begin blank, remain local, and support planning without daily shame pressure.",
    boundary: "No real amount, account, or financial fixture is bundled or shown in screenshots.",
    sections: [
      {
        id: "money-direction",
        eyebrow: "Goals and balances",
        title: "Financial direction",
        description: "Blank values are not zero. Enter only values you want stored on this device.",
        fields: [
          { id: "emergencyFund", label: "Emergency fund", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "emergencyFloor", label: "Emergency floor", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "vehicleDebt", label: "Vehicle debt", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "minimumPayment", label: "Minimum payment", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "aggressivePayment", label: "Aggressive payment", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "propertyFund", label: "Property fund", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "rothProgress", label: "Roth progress", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "creditUse", label: "Credit use (%)", kind: "number", min: 0, max: 100, step: 0.1, scope: "durable", private: true },
          { id: "monthlyDebtTarget", label: "Monthly debt target", kind: "number", min: 0, step: 0.01, scope: "durable", private: true },
          { id: "monthlySavingsTarget", label: "Monthly savings target", kind: "number", min: 0, step: 0.01, scope: "durable", private: true }
        ]
      },
      {
        id: "money-rhythm",
        eyebrow: "Calm rhythm",
        title: "Discipline and next move",
        description: "A rhythm is a support structure, not a daily judgment.",
        fields: [
          dailyToggle("moneyDiscipline", "Money discipline check"),
          { id: "weeklyRhythm", label: "Weekly money rhythm", kind: "text", scope: "durable" },
          { id: "nextMove", label: "Next money move", kind: "text", scope: "day", private: true }
        ]
      }
    ]
  },
  social: {
    id: "social",
    tab: "social",
    storageKey: "social",
    eyebrow: "Social and presence",
    title: "Choose presence over pressure.",
    description:
      "Readiness, connection, initiative, and recovery stay practical, neutral, and low-pressure.",
    boundary: "No dating shame, forced outreach, or conclusion from a blank signal.",
    sections: [
      {
        id: "social-readiness",
        eyebrow: "Presence readiness",
        title: "Prepare without performing.",
        description: "These are optional supports, not appearance scores.",
        fields: [
          dailyScale("presenceReadiness", "Presence readiness"),
          dailyToggle("hygiene", "Hygiene"),
          dailyToggle("grooming", "Grooming"),
          dailyToggle("outfit", "Outfit"),
          dailyToggle("scent", "Scent"),
          dailyToggle("posture", "Posture"),
          dailyToggle("publicVisibility", "Public visibility")
        ]
      },
      {
        id: "social-connection",
        eyebrow: "Connection evidence",
        title: "Low-pressure progress",
        description: "A real moment counts as itself, not as a verdict about the future.",
        fields: [
          dailyToggle("realConversation", "Real conversation"),
          dailyToggle("complimentInitiative", "Compliment or initiative"),
          dailyToggle("playfulMoment", "Playful moment"),
          dailyToggle("selfRespect", "Self-respect action"),
          dailyToggle("rejectionRecovery", "Rejection recovery"),
          {
            id: "connectionNote",
            label: "Connection note",
            kind: "text",
            scope: "day",
            private: true
          }
        ]
      }
    ]
  },
  week: {
    id: "week",
    tab: "week",
    storageKey: "weeklyAnchors",
    eyebrow: "Week",
    title: "Protect direction from daily noise.",
    description:
      "A confirmed Weekly Growth Focus controls future-lane narrowing while capacity protects what is urgent.",
    boundary: "The automatic suggestion never overwrites the user's confirmed focus.",
    sections: [
      {
        id: "week-rhythm",
        eyebrow: "Weekly Rhythm",
        title: "Three anchors",
        description: "Keep one must-do, one maintenance item, and one human item.",
        fields: [
          { id: "mustDo", label: "One must-do", kind: "text", scope: "durable" },
          { id: "maintenance", label: "One maintenance item", kind: "text", scope: "durable" },
          { id: "human", label: "One human / relationship item", kind: "text", scope: "durable", private: true },
          { id: "weeklyReview", label: "Weekly review", kind: "text", scope: "durable", private: true }
        ]
      }
    ]
  },
  vision: {
    id: "vision",
    tab: "vision",
    storageKey: "vision",
    eyebrow: "Vision",
    title: "Keep direction visible without forcing urgency.",
    description:
      "Long-horizon identity, principles, and standards provide context rather than a daily score.",
    boundary: "Vision informs direction; it does not manufacture today's command or completion evidence.",
    sections: [
      {
        id: "vision-direction",
        eyebrow: "Three-year direction",
        title: "Long horizon",
        description: "Use plain language that can evolve.",
        fields: [
          { id: "threeYearDirection", label: "Three-year direction", kind: "text", scope: "durable", private: true },
          { id: "identity", label: "Identity statement", kind: "text", scope: "durable", private: true },
          { id: "principles", label: "Principles", kind: "text", scope: "durable", private: true },
          { id: "standards", label: "Thermostat / standards", kind: "text", scope: "durable", private: true },
          { id: "longTermGoals", label: "Long-term goals", kind: "text", scope: "durable", private: true }
        ]
      }
    ]
  }
};

export const ENVIRONMENT_DEFINITION: DomainDefinition = {
  id: "environment",
  tab: "today",
  storageKey: "environment",
  eyebrow: "Environment",
  title: "Remove one point of friction.",
  description:
    "Home and workspace signals stay connected to Today Command without becoming another fixed checklist.",
  boundary: "One reset can help the next move; an unfinished environment is not a moral score.",
  sections: [
    {
      id: "environment-current",
      eyebrow: "Current space",
      title: "Friction and reset",
      description: "Name what is known and keep the action small.",
      fields: [
        dailyScale("friction", "Environment friction"),
        {
          id: "location",
          label: "Current environment",
          kind: "choice",
          scope: "day",
          options: [
            { value: "home", label: "Home" },
            { value: "work", label: "Work" },
            { value: "public", label: "Public" },
            { value: "outside", label: "Outside" }
          ]
        },
        dailyToggle("surfaceReset", "One visible surface reset"),
        dailyToggle("nextActionReady", "Next action made easier"),
        {
          id: "frictionNote",
          label: "Friction note",
          kind: "text",
          scope: "day",
          private: true
        }
      ]
    }
  ]
};

export { yesNoOptions };

export const colorClasses = {
  infrastructure: {
    pill: "bg-accent-soft text-accent",
    dot: "bg-accent",
    label: "Infrastructure",
  },
  robotics: {
    pill: "bg-sky-soft text-sky",
    dot: "bg-sky",
    label: "Robotics",
  },
  tools: {
    pill: "bg-violet-soft text-violet",
    dot: "bg-violet",
    label: "Dev Tools",
  },
  creative: {
    pill: "bg-pink-soft text-pink",
    dot: "bg-pink",
    label: "Creative AI",
  },
  industry: {
    pill: "bg-emerald-soft text-emerald",
    dot: "bg-emerald",
    label: "Industry",
  },
};

export const labelClasses = {
  news:         { bg: "bg-label-news-soft",        text: "text-label-news",        label: "News" },
  tips:         { bg: "bg-label-tips-soft",        text: "text-label-tips",        label: "Tips" },
  tutorials:    { bg: "bg-label-tutorials-soft",   text: "text-label-tutorials",   label: "Tutorials" },
  "meeting-pv": { bg: "bg-label-meeting-pv-soft",  text: "text-label-meeting-pv",  label: "Meeting PV" },
  "deep-dive":  { bg: "bg-label-deep-dive-soft",   text: "text-label-deep-dive",   label: "Deep Dive" },
  research:     { bg: "bg-label-research-soft",     text: "text-label-research",    label: "Research" },
};

export const ALL_LABELS = Object.keys(labelClasses);

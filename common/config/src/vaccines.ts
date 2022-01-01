// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

// https://docs.google.com/spreadsheets/d/1sV1AjJ3i2gJCu31b76CoHA85w-2SL2_XhcT_IkjpFrk/edit?pli=1#gid=557196378

export type Vaccine =
  | "mrna"
  | "biontech"
  | "biontechchildren"
  | "moderna"
  | "astrazeneca"
  | "jnj";

type VaccinationPdf = {
  label: string;
  url: string;
};

export type VaccineData = {
  id: string;
  name: string;
  pdfs: VaccinationPdf[];
  pdfDescription: string;
  notice?: string;
};

export const vaccines: Record<string, Record<Vaccine, VaccineData>> = {
  de: {
    mrna: {
      id: "mRNA",
      name: "mRNA-Impfstoff (Moderna oder BioNTech)",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff, den Anamnesebogen und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    moderna: {
      id: "MD",
      name: "Moderna (Spikevax®)",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff, den Anamnesebogen und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    biontech: {
      id: "BT",
      name: "BioNTech/Pfizer (Comirnaty®)",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff, den Anamnesebogen und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    biontechchildren: {
      id: "BTch",
      name: "BioNTech/Pfizer (Comirnaty®) für 5- bis 11-jährige",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff, den Anamnesebogen und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    astrazeneca: {
      id: "AZ",
      name: "AstraZeneca (Vaxzevria®)",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    jnj: {
      id: "JJ",
      name: "Johnson & Johnson (Janssen®)",
      pdfDescription:
        "Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.",
      pdfs: [
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile",
        },
        {
          label: "Anamnese-/Einwilligungsbogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
  },
  deplain: {
    mrna: {
      id: "mRNA",
      name: "mRNA-Impfstoff (Moderna oder BioNTech)",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einleitung-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    moderna: {
      id: "MD",
      name: "Moderna (Spikevax®)",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einleitung-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    biontech: {
      id: "BT",
      name: "BioNTech/Pfizer (Comirnaty®)",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einleitung-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    biontechchildren: {
      id: "BTch",
      name: "BioNTech/Pfizer (Comirnaty®) für 5- bis 11-jährige",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einleitung-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    astrazeneca: {
      id: "AZ",
      name: "AstraZeneca (Vaxzevria®)",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einleitung-leichte-Sprache_Vaxzevri.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-leichte-Sprache_Vaxzevri.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
    jnj: {
      id: "JJ",
      name: "Johnson & Johnson (Janssen®)",
      pdfDescription:
        'Vor dem Impfen müssen Sie 2 Dinge tun: 1. Sie müssen sich informieren und 2. Sie müssen einen Fragebogen ausfüllen. Die Schritte sind im Info-Blatt erklärt. Laden Sie sich alle Dokumente herunter. Dann beginnen Sie mit dem Infoblatt, das "Einleitung-leichte-Sprache" heißt.',
      pdfs: [
        {
          label: "Info-Blatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einleitung-leichte-Sprache_Janssen.pdf?__blob=publicationFile",
        },
        {
          label: "Aufklärungsmerkblatt",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-leichte-Sprache_Janssen.pdf?__blob=publicationFile",
        },
        {
          label: "Hilfe zum Fragebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Anamnesebogen-leichte-Sprache.pdf?__blob=publicationFile",
        },
        {
          label: "Fragebogen bzw. Anamnesebogen",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile",
        },
      ],
    },
  },
  en: {
    mrna: {
      id: "mRNA",
      name: "mRNA-vaccine (Moderna or BioNTech)",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
    moderna: {
      id: "MD",
      name: "Moderna (Spikevax®)",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
    biontech: {
      id: "BT",
      name: "BioNTech/Pfizer (Comirnaty®)",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
    biontechchildren: {
      id: "BTch",
      name: "BioNTech/Pfizer (Comirnaty®) children aged 5 to 11 years",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
    astrazeneca: {
      id: "AZ",
      name: "AstraZeneca (Vaxzevria®)",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
    jnj: {
      id: "JJ",
      name: "Johnson & Johnson (Janssen®)",
      pdfDescription:
        "Before your vaccination appointment and your medical consultation, you can download and print out the vaccine information sheet, the medical history form and the vaccination consent form as a PDF file. Those documents also offer important information about your vaccination and the coronavirus vaccine.",
      pdfs: [
        {
          label: "Information sheet, medical history form, and consent form",
          url: "https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-Englisch.pdf?__blob=publicationFile",
        },
      ],
    },
  },
};

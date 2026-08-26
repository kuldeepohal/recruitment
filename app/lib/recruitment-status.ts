export type RecruitmentApplicationStatus = "open" | "closed" | "upcoming";

export function getRecruitmentApplicationStatus(
  startDate?: string | Date | null,
  endDate?: string | Date | null,
  now = new Date(),
): RecruitmentApplicationStatus {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = startDate ? new Date(startDate).getTime() : null;
  const end = endDate ? new Date(endDate).getTime() : null;

  if (start !== null) {
    const startDay = new Date(start).setHours(0, 0, 0, 0);
    if (today < startDay) return "upcoming";
  }
  if (end !== null) {
    const endDay = new Date(end).setHours(23, 59, 59, 999);
    if (today > endDay) return "closed";
  }
  return "open";
}

export const recruitmentStatusLabel = {
  open: "OPEN",
  closed: "CLOSED",
  upcoming: "UPCOMING",
} as const;

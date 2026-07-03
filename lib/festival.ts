// Shared festival-theme constants used across the redesigned pages.

// Category → accent colour (festival palette).
export const TYPE_COLOR: Record<string, string> = {
  飲食: "#ec6178", // pink
  体験: "#5b9bd5", // blue
  展示: "#e2952f", // orange
  物販: "#7db682", // green
  ステージ: "#9b87c4", // purple
};

// Top-level groupings surfaced on the home page. 「クラス・部活企画」bundles the
// exhibition-style categories (展示・体験・物販) so the three home cards map onto
// real data, while 飲食 / ステージ map to a single type each.
export const CLASS_CLUB_TYPES = ["展示", "体験", "物販"];

// Resolve a `cat` query value to the set of Event.type values it matches.
export function typesForCategory(cat: string | undefined | null): string[] | null {
  if (!cat || cat === "ALL") return null; // null = no filter
  if (cat === "クラス・部活企画") return CLASS_CLUB_TYPES;
  return [cat];
}

export const CATEGORY_FILTERS = ["ALL", "飲食", "クラス・部活企画", "ステージ"];

export interface Data {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export const works: Data[] = [
  {
    title: "猫耳カレンダー",
    description: "SvelteKitで作ったカレンダーアプリ。猫耳付き。",
    image: "/images/calendar.png",
    url: "https://example.com/calendar",
    tags: ["SvelteKit", "i18n", "Tailwind"],
  },
  {
    title: "ひらがな漢字変換くん",
    description: "TypeScriptで作った簡単な日本語変換ツール。",
    image: "/images/kana.png",
    url: "https://example.com/kana",
    tags: ["TypeScript", "DOM"],
  },
];

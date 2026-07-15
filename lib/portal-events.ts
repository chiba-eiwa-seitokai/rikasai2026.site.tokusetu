import type { PrismaClient } from "@prisma/client";

type PortalEvent = {
  grade: string;
  title: string;
  type: "飲食" | "体験" | "展示" | "物販" | "ステージ";
  emoji: string;
  desc: string;
  tags: string[];
  info: { k: string; v: string }[];
  day1: boolean;
  day2: boolean;
};

export const PORTAL_EVENTS: PortalEvent[] = [
  {
    grade: "1年7組",
    title: "MISSIOM SMALL MOUNTAIN",
    type: "体験",
    emoji: "🔔",
    desc: "挑戦状が届いた。「音をたてずにゴールせよ！」音を鳴らしてはいけない。君は一位になれるかな？",
    tags: ["迷路", "タイムアタック", "ゲーム"],
    info: [{ k: "場所", v: "1-7教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "1年8組",
    title: "きらめき★メイズ〜魔法の力で脱出せよ！〜",
    type: "体験",
    emoji: "🔮",
    desc: "",
    tags: ["迷路", "謎解き", "脱出ゲーム"],
    info: [{ k: "場所", v: "1-8教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "1年9組",
    title: "古市の国のアリス",
    type: "体験",
    emoji: "🃏",
    desc: "ここは古市の国。ここには様々な試練がいっぱい！あなたはそれを乗り越えこの国から脱出できるか！？",
    tags: ["迷路", "クイズ", "脱出ゲーム"],
    info: [{ k: "場所", v: "1-9教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "2年1組",
    title: "ムラGO",
    type: "体験",
    emoji: "🏎️",
    desc: "仕掛けを破りゴールを目指せ！君の激走が今年の文化祭を盛り上げる！コントローラーは捨てろ、主役は君だ！",
    tags: ["アトラクション", "レース", "ゲーム"],
    info: [{ k: "場所", v: "2-1教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "2年4組",
    title: "おかしなビーズファクトリー",
    type: "体験",
    emoji: "🍬",
    desc: "お菓子の家のような空間でアイロンビーズ制作ができます！ぜひ来てください！",
    tags: ["アイロンビーズ", "工作", "フォトスポット"],
    info: [{ k: "場所", v: "2-4教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "2年5組",
    title: "Little Worker",
    type: "体験",
    emoji: "🎲",
    desc: "オセロ・トランプ・ジェンガやってます！　ゲームでハイスコアを目指して森田姫を救ってください！",
    tags: ["オセロ", "トランプ", "ジェンガ"],
    info: [{ k: "場所", v: "2-5教室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "2年E組",
    title: "不思議の国のこうHey!!",
    type: "体験",
    emoji: "🎯",
    desc: "不思議の国のこうHey!!では輪投げ、射的、占い、フォトスポットなど様々な屋台の展示をしています♪",
    tags: ["輪投げ", "射的", "占い", "フォトスポット"],
    info: [{ k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "3年1組",
    title: "呪恋",
    type: "展示",
    emoji: "👻",
    desc: "ある恨みを持った霊が英和高校で暴れ出す映画です👻",
    tags: ["映画", "ホラー", "上映"],
    info: [{ k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "3年4組",
    title: "お猿の”ぱんち”と秘密の絵本",
    type: "飲食",
    emoji: "🍌",
    desc: "１冊の絵本「お猿のぱんち」。読み終わるとお猿の世界へ迷い込んでしまった！？手にはチョコバナナが…",
    tags: ["チョコバナナ", "スイーツ", "フォトスポット"],
    info: [{ k: "場所", v: "3-4教室" }, { k: "営業時間", v: "9:00-14:00" }, { k: "料金", v: "400円（予定）" }],
    day1: true,
    day2: true,
  },
  {
    grade: "3年7組",
    title: "焼き鳥",
    type: "飲食",
    emoji: "🍢",
    desc: "3年7組は焼き鳥をします！とても美味しいので是非食べに来てください！",
    tags: ["焼き鳥", "もも", "つくね", "ねぎま", "とりかわ"],
    info: [{ k: "場所", v: "家庭科室右隣の教室" }, { k: "営業時間", v: "9:00-14:00" }, { k: "料金", v: "100～150円" }],
    day1: true,
    day2: true,
  },
  {
    grade: "オルガン部",
    title: "オルガン部　（チャペルアクティビティコンサート）",
    type: "ステージ",
    emoji: "🎹",
    desc: "オルガン部です。今年もチャペルアクティビティコンサートをやります。このコンサートはオルガン部だけでは",
    tags: ["オルガン", "コンサート", "音楽"],
    info: [{ k: "場所", v: "チャペル" }, { k: "営業時間", v: "11:25-12:40" }],
    day1: true,
    day2: true,
  },
  {
    grade: "華道部",
    title: "華道部　展覧会",
    type: "展示",
    emoji: "💐",
    desc: "日頃の練習の集大成として、各自が選んだ花と器で、スキルアップした、個性あふれる花生けを披露します",
    tags: ["華道", "花", "展覧会"],
    info: [{ k: "場所", v: "GW1L" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "写真部",
    title: "写真部写真集",
    type: "展示",
    emoji: "📷",
    desc: "部内で初企画！！",
    tags: ["写真", "写真集", "展示"],
    info: [{ k: "場所", v: "GW2L" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "茶道部",
    title: "茶道の透視図",
    type: "飲食",
    emoji: "🍵",
    desc: "茶道部のお茶会へ！椅子に座る立礼式で、茶道を美味しいきび団子とお抹茶をどうぞ。参加費は300円です。",
    tags: ["茶道", "抹茶", "きび団子", "お茶会"],
    info: [{ k: "場所", v: "GW1L" }, { k: "営業時間", v: "9:00-14:00" }, { k: "料金", v: "300円" }],
    day1: true,
    day2: true,
  },
  {
    grade: "聖歌合唱部",
    title: "チャペルアクティビティコンサート",
    type: "ステージ",
    emoji: "🎶",
    desc: "こんにちは！聖歌合唱部です。私たちは今回、合計三曲を歌います。是非、聞きに来てください！",
    tags: ["合唱", "コンサート", "音楽"],
    info: [{ k: "場所", v: "チャペル" }, { k: "営業時間", v: "11:25-12:40" }],
    day1: true,
    day2: true,
  },
  {
    grade: "書道部",
    title: "書道パフォーマンス",
    type: "ステージ",
    emoji: "🖌️",
    desc: "日々、積み重ねた努力と仲間との絆を胸にパフォーマンスに挑みます。どうぞ最後までご覧ください。",
    tags: ["書道", "パフォーマンス", "ステージ"],
    info: [{ k: "場所", v: "大体育館" }, { k: "営業時間", v: "11:50-12:20" }],
    day1: true,
    day2: true,
  },
  {
    grade: "調理部",
    title: "そば焼き姫",
    type: "飲食",
    emoji: "🍜",
    desc: "異世界調理部が提供する、鉄板のファンタジー！秘伝のソースの香りを頼りに、さらわれたお姫様を助け出せ！",
    tags: ["焼きそば", "飲食", "ソース"],
    info: [{ k: "場所", v: "家庭科室隣の2-E・3-E教室" }, { k: "営業時間", v: "9:00-14:00" }, { k: "料金", v: "300円" }],
    day1: true,
    day2: true,
  },
  {
    grade: "美術部",
    title: "プラバン作り",
    type: "体験",
    emoji: "🎨",
    desc: "自分で絵を描いたプラバンが作れます。美術部員が作成した絵も飾っています。ぜひ遊びに来てください！",
    tags: ["プラバン", "工作", "作品展示"],
    info: [{ k: "場所", v: "美術室" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "文芸部",
    title: "部誌・缶バッチ販売",
    type: "物販",
    emoji: "📚",
    desc: "部員の小説の短編集と手作り缶バッチ（ガチャガチャ）を販売します。過去の部誌も展示します！",
    tags: ["部誌", "小説", "缶バッチ", "ガチャガチャ"],
    info: [{ k: "場所", v: "GW1S" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "演劇部",
    title: "お前のせいだ！",
    type: "ステージ",
    emoji: "🎭",
    desc: "作:森山雪夜",
    tags: ["演劇", "舞台", "ミステリー"],
    info: [{ k: "場所", v: "チャペル" }, { k: "営業時間", v: "12:45-14:00" }],
    day1: true,
    day2: true,
  },
  {
    grade: "ユースホステル部",
    title: "鉄道観覧・試走会",
    type: "体験",
    emoji: "🚃",
    desc: "ユースホステル部では鉄道模型の走行体験、地理のクイズや活動記録のポスターの展示をしています!",
    tags: ["鉄道模型", "走行体験", "クイズ", "展示"],
    info: [{ k: "場所", v: "GW2L" }, { k: "営業時間", v: "9:00-14:00" }],
    day1: true,
    day2: true,
  },
];

function normalizeGroupName(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
}

function mergeInfo(currentJson: string, incoming: { k: string; v: string }[]) {
  let current: { k: string; v: string }[] = [];
  try {
    const parsed = JSON.parse(currentJson);
    if (Array.isArray(parsed)) current = parsed;
  } catch {
    current = [];
  }

  const incomingKeys = new Set(incoming.map((item) => item.k));
  return [...current.filter((item) => !incomingKeys.has(item.k)), ...incoming];
}

export async function syncPortalEvents(prisma: PrismaClient) {
  const existing = await prisma.event.findMany();
  let nextNum = existing.reduce((max, event) => {
    const value = Number.parseInt(event.num, 10);
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
  let nextSortOrder = existing.reduce((max, event) => Math.max(max, event.sortOrder), 0);

  const updated: string[] = [];
  const created: string[] = [];

  for (const event of PORTAL_EVENTS) {
    const found = existing.find(
      (item) => normalizeGroupName(item.grade) === normalizeGroupName(event.grade)
    );
    const commonData = {
      title: event.title,
      type: event.type,
      emoji: event.emoji,
      desc: event.desc,
      tags: JSON.stringify(event.tags),
    };

    if (found) {
      await prisma.event.update({
        where: { id: found.id },
        data: {
          ...commonData,
          infoJson: JSON.stringify(mergeInfo(found.infoJson, event.info)),
        },
      });
      updated.push(event.grade);
      continue;
    }

    nextNum += 1;
    nextSortOrder += 1;
    const added = await prisma.event.create({
      data: {
        num: String(nextNum).padStart(2, "0"),
        grade: event.grade,
        ...commonData,
        infoJson: JSON.stringify(event.info),
        galleryJson: "[]",
        day1: event.day1,
        day2: event.day2,
        published: false,
        sortOrder: nextSortOrder,
      },
    });
    existing.push(added);
    created.push(event.grade);
  }

  return { updated, created };
}

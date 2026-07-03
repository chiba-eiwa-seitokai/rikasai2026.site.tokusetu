import PageHero from "@/components/layout/PageHero";
import { TYPE_COLOR } from "@/lib/festival";

export const metadata = { title: "フロアマップ — 梨花祭2026" };

export default function FloormapPage() {
  return (
    <div className="fpage">
      <style>{`
        .floor-list{ display:flex; flex-direction:column; gap:22px; }
        .floor-card{ background:var(--f-card); border:1px solid var(--f-border); border-radius:18px; overflow:hidden; box-shadow:0 6px 18px var(--f-shadow); }
        .floor-card-header{ background:#f6ecd6; padding:12px 20px; }
        .floor-card-title{ font-size:15px; font-weight:900; color:var(--f-ink-deep); letter-spacing:.04em; }
        .floor-rooms{ display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); }
        .room{ padding:14px 20px; border-right:1px solid var(--f-border); border-top:1px solid var(--f-border); }
        .room-name{ font-size:11px; font-weight:700; color:var(--f-muted); letter-spacing:.06em; margin-bottom:5px; }
        .room-event{ font-size:13px; font-weight:700; color:var(--f-ink); line-height:1.4; margin-bottom:6px; }
      `}</style>

      <PageHero eyebrow="Floor Map" title="フロアマップ" sub="Building & Floor Guide" accent="var(--f-blue)" />

      <div className="fbody">
        <div className="floor-list">
          {FLOORS.map((floor) => (
            <div key={floor.label} className="floor-card">
              <div className="floor-card-header">
                <p className="floor-card-title">{floor.label}</p>
              </div>
              <div className="floor-rooms">
                {floor.rooms.map((room) => {
                  const color = TYPE_COLOR[room.type] ?? "var(--f-pink)";
                  return (
                    <div key={room.name} className="room">
                      <p className="room-name">{room.name}</p>
                      <p className="room-event">{room.event}</p>
                      {room.type && (
                        <span className="ftag" style={{ background: `${color}22`, color }}>{room.type}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FLOORS = [
  {
    label: "1号棟 1階",
    rooms: [
      { name: "多目的室", event: "呪われた館の怪談写真館", type: "体験" },
      { name: "和室", event: "子ども向け絵本コーナー", type: "体験" },
    ],
  },
  {
    label: "1号棟 2階",
    rooms: [
      { name: "会議室", event: "レトロゲーム大会", type: "体験" },
      { name: "放送室", event: "梨花祭FM 公開生放送", type: "ステージ" },
    ],
  },
  {
    label: "1号棟 3階",
    rooms: [
      { name: "和室", event: "癒しの森 休憩所", type: "体験" },
    ],
  },
  {
    label: "2号棟 1階",
    rooms: [
      { name: "教室A", event: "おとぎ話カフェ", type: "飲食" },
      { name: "廊下", event: "魔法の砂糖菓子店", type: "飲食" },
    ],
  },
  {
    label: "2号棟 2階",
    rooms: [
      { name: "教室B", event: "魔法使いの謎解き迷宮", type: "体験" },
      { name: "教室C", event: "魔女の占いの館", type: "体験" },
    ],
  },
  {
    label: "2号棟 3階",
    rooms: [
      { name: "教室E", event: "妖精の紅茶サロン", type: "飲食" },
      { name: "教室", event: "マンガ同人誌即売会", type: "物販" },
    ],
  },
  {
    label: "3号棟 1階",
    rooms: [
      { name: "教室F", event: "星の図書館", type: "展示" },
      { name: "展示室", event: "竜の宝物展示室", type: "展示" },
      { name: "廊下", event: "森の生き物 標本展示", type: "展示" },
    ],
  },
  {
    label: "3号棟 2階",
    rooms: [
      { name: "教室E", event: "精霊の森ジオラマ展", type: "展示" },
      { name: "理科教室", event: "魔女のポーション工房", type: "体験" },
    ],
  },
  {
    label: "3号棟 3階",
    rooms: [
      { name: "教室B", event: "天空の観測所", type: "展示" },
    ],
  },
  {
    label: "3号棟 地下",
    rooms: [
      { name: "多目的室", event: "魔王城のイルミアート", type: "展示" },
    ],
  },
  {
    label: "体育館",
    rooms: [
      { name: "大ホール", event: "演劇部・吹奏楽部・ダンス部など", type: "ステージ" },
      { name: "前ロビー", event: "騎士の鎧体験コーナー", type: "体験" },
      { name: "サブアリーナ", event: "バドミントン体験コーナー", type: "体験" },
    ],
  },
  {
    label: "グラウンド・中庭",
    rooms: [
      { name: "屋台エリア", event: "王様の宴 〜食べ物屋台〜", type: "飲食" },
      { name: "中庭テント", event: "妖精のバルーンアート / 森の妖精マーケット", type: "体験" },
      { name: "中庭ステージ", event: "軽音楽部・書道部", type: "ステージ" },
      { name: "前広場", event: "コスプレ＆撮影スポット / スタンプラリー受付", type: "体験" },
      { name: "グラウンド", event: "勇者の試練 ─ 縁日ゲーム", type: "体験" },
    ],
  },
  {
    label: "その他",
    rooms: [
      { name: "茶室", event: "おとぎ茶会", type: "体験" },
      { name: "美術室", event: "幻想画廊", type: "展示" },
      { name: "廊下 ギャラリー", event: "光と影の冒険 写真展", type: "展示" },
      { name: "家庭科室", event: "錬金術師のチョコ工房 / ファンタジー料理展示", type: "体験" },
      { name: "視聴覚室", event: "ショートフィルム上映会", type: "ステージ" },
      { name: "理科室1", event: "魔法の実験ショー", type: "体験" },
      { name: "図書室", event: "本のフリマ", type: "物販" },
    ],
  },
];

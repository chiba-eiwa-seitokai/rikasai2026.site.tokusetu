import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: #fbf5e6;
          border-top: 1px solid var(--f-border);
          padding: 44px 24px 34px;
          text-align: center;
        }
        .footer-logo {
          font-family: "DM Serif Display", serif;
          font-size: 30px;
          color: var(--f-ink-deep);
          letter-spacing: .04em;
          margin-bottom: 2px;
        }
        .footer-sub {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          color: var(--f-muted);
          margin-bottom: 24px;
        }
        .footer-links {
          display: flex;
          gap: 10px 22px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }
        .footer-links a {
          font-size: 13px;
          font-weight: 700;
          color: var(--f-ink-soft);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--f-pink); }
        .footer-copy {
          font-size: 12px;
          font-weight: 500;
          color: var(--f-muted);
        }
      `}</style>
      <footer className="footer">
        <p className="footer-logo">梨花祭 2026</p>
        <p className="footer-sub">千葉英和高等学校・第53回文化祭</p>
        <div className="footer-links">
          <Link href="/about">梨花祭とは</Link>
          <Link href="/attractions">企画一覧</Link>
          <Link href="/map">マップ</Link>
          <Link href="/schedule">プログラム</Link>
          <Link href="/#notice">お知らせ</Link>
          <Link href="/award">梨花祭賞</Link>
          <Link href="/rules">ご注意</Link>
          <Link href="/#access">アクセス</Link>
        </div>
        <p className="footer-copy">© 2026 梨花祭実行委員会 / Rikasai Executive Committee</p>
      </footer>
    </>
  );
}

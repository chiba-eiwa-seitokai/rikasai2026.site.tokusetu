import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: var(--ink);
          border-top: 1px solid rgba(212,168,67,0.15);
          padding: 48px 24px 32px;
          text-align: center;
        }
        .footer-logo {
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
          font-weight: 300;
          font-style: italic;
          color: var(--gold-light);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .footer-sub {
          font-family: "Cinzel", serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(232,212,168,0.35);
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .footer-links {
          display: flex;
          gap: 0 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .footer-links a {
          font-family: "Cinzel", serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(232,212,168,0.4);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--gold); }
        .footer-copy {
          font-family: "Cinzel", serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(232,212,168,0.2);
        }
      `}</style>
      <footer className="footer">
        <p className="footer-logo">梨花祭 2026</p>
        <p className="footer-sub">Chiba Eiwa High School Cultural Festival</p>
        <div className="footer-links">
          <Link href="/#notice">お知らせ</Link>
          <Link href="/schedule">スケジュール</Link>
          <Link href="/attractions">企画一覧</Link>
          <Link href="/award">梨花祭賞</Link>
          <Link href="/rules">ご注意</Link>
          <Link href="/#access">アクセス</Link>
        </div>
        <p className="footer-copy">© 2026 Rikasai Executive Committee</p>
      </footer>
    </>
  );
}

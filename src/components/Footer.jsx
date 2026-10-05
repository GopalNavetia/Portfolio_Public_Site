function Footer({ about }) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Let&apos;s connect
        </h2>
        {about?.email && (
          <a
            className="mt-3 inline-block text-teal-700 hover:text-teal-900"
            href={`mailto:${about.email}`}
          >
            {about.email}
          </a>
        )}
        {(about?.githubUrl || about?.linkedinUrl) && (
          <div className="mt-4 flex justify-center gap-5 text-sm">
            {about.githubUrl && (
              <a
                className="text-slate-600 hover:text-teal-600"
                href={about.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {about.linkedinUrl && (
              <a
                className="text-slate-600 hover:text-teal-600"
                href={about.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
        <p className="mt-8 text-sm text-slate-400">
          © {new Date().getFullYear()} {about?.name || "Portfolio"}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

function getProfileImageUrl(profileImage) {
  if (!profileImage) return "";

  const driveFileId = profileImage.match(/\/file\/d\/([^/]+)/)?.[1];
  return driveFileId
    ? `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`
    : profileImage;
}

function About({ about, loading, error }) {
  const contactItems = [
    ["Email", about?.email],
    ["Phone", about?.phone],
    ["Location", about?.location],
  ];
  const profileImageUrl = getProfileImageUrl(about?.profileImage);

  const handleProjectsClick = (event) => {
    event.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="bg-slate-50 py-20"
      aria-busy={loading}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-teal-100 ring-8 ring-teal-50 sm:h-56 sm:w-56">
            {profileImageUrl ? (
              <img
                className="h-full w-full object-contain object-center"
                src={profileImageUrl}
                alt={about.name || "Profile"}
              />
            ) : (
              <div
                className="flex h-full items-center justify-center text-5xl font-bold text-teal-700"
                aria-label="Profile placeholder"
              >
                {about?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              {about?.name || "Your Name"}
            </h1>
            <p className="mt-4 text-xl text-slate-600 sm:text-2xl">
              {about?.title || "Your professional title"}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
              >
                View Projects
              </a>
              {about?.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-600"
                >
                  Download Resume
                </a>
              )}
            </div>
            {(about?.githubUrl || about?.linkedinUrl) && (
              <div className="mt-6 flex justify-center gap-5 text-sm md:justify-start">
                {about.githubUrl && (
                  <a
                    className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-teal-600"
                    href={about.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {about.linkedinUrl && (
                  <a
                    className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-teal-600"
                    href={about.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        {error && (
          <p className="mt-8 text-center text-slate-600 md:text-left">
            Portfolio information is temporarily unavailable. Please try again
            later.
          </p>
        )}
        <div className="mt-20">
          <p className="font-medium text-teal-600">A little about me</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About
          </h2>
          <p className="mt-6 max-w-3xl whitespace-pre-line leading-8 text-slate-600">
            {about?.summary || "About information will appear here soon."}
          </p>
          {contactItems.some(([, value]) => value) && (
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {contactItems.map(
                ([label, value]) =>
                  value && (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                      </p>
                      <p className="mt-1 break-words text-slate-700">{value}</p>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;

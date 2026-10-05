import { useEffect, useState } from "react";
import api from "../api/axios";

function getProjectImageUrl(image) {
  if (!image) return "";

  const driveFileId = image.match(/\/file\/d\/([^/]+)/)?.[1];
  return driveFileId
    ? `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`
    : image;
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .get("/projects/get")
      .then(({ data }) => {
        if (active) setProjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) {
          setProjects([]);
          setError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="projects" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-medium text-teal-600">Selected work</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Projects
        </h2>
        {loading ? (
          <p className="mt-8 text-slate-500">Loading projects...</p>
        ) : error ? (
          <p className="mt-8 text-slate-500">
            Projects are temporarily unavailable.
          </p>
        ) : projects.length === 0 ? (
          <p className="mt-8 text-slate-500">Projects will appear here soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const description = project.description || "";
              const imageUrl = getProjectImageUrl(project.image);
              return (
                <article
                  key={project.id || project.title}
                  className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  {imageUrl ? (
                    <img
                      className="h-48 w-full object-cover"
                      src={imageUrl}
                      alt=""
                    />
                  ) : (
                    <div
                      className="h-48 bg-teal-100"
                      aria-label="Project image placeholder"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {description.length > 150
                        ? `${description.slice(0, 150).trim()}...`
                        : description}
                    </p>
                    {project.technologies?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm font-medium">
                      {project.githubUrlBackend && (
                        <a
                          className="text-teal-700 hover:text-teal-900"
                          href={project.githubUrlBackend}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Backend
                        </a>
                      )}
                      {project.githubUrlFrontend && (
                        <a
                          className="text-teal-700 hover:text-teal-900"
                          href={project.githubUrlFrontend}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Frontend
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          className="text-teal-700 hover:text-teal-900"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;

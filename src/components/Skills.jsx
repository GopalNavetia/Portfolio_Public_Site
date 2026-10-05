import { useEffect, useState } from "react";
import api from "../api/axios";

const categories = ["LANGUAGES", "BACKEND", "FRONTEND", "DATABASE", "TOOLS"];

function formatCategory(category) {
  return category
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .get("/skills/get")
      .then(({ data }) => {
        if (active) setSkills(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) {
          setSkills([]);
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

  const grouped = categories
    .map((category) => ({
      category,
      skills: skills.filter((skill) => skill.category === category),
    }))
    .filter(({ skills: categorySkills }) => categorySkills.length > 0);

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-medium text-teal-600">What I work with</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Skills
        </h2>
        {loading ? (
          <p className="mt-8 text-slate-500">Loading skills...</p>
        ) : error ? (
          <p className="mt-8 text-slate-500">
            Skills are temporarily unavailable.
          </p>
        ) : grouped.length === 0 ? (
          <p className="mt-8 text-slate-500">Skills will appear here soon.</p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map(({ category, skills: categorySkills }) => (
              <div key={category}>
                <h3 className="mb-4 text-lg font-semibold text-slate-800">
                  {formatCategory(category)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      className="rounded-full bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;

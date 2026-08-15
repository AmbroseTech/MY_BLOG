import type { Skill } from "../types";

interface SkillMatrixProps {
    skills: Skill[];
}

export function SkillMatrix({ skills }: SkillMatrixProps) {
    const categories = [...new Set(skills.map((skill) => skill.category))];

    return (
        <div className="skill-matrix">
            {categories.map((category) => {
                const categorySkills = skills.filter(
                    (skill) => skill.category === category,
                );

                return (
                    <section className="skill-group" key={category}>
                        <div className="skill-group-heading">
                            <span className="eyebrow">
                                {category}
                            </span>
                        </div>

                        {categorySkills.map((skill) => (
                            <article
                                className="skill-item"
                                key={skill.id}
                            >
                                <div className="skill-meta">
                                    <div>
                                        <strong>{skill.name}</strong>

                                        {skill.years_experience && (
                                            <span>
                                                {skill.years_experience}
                                                {" "}years
                                            </span>
                                        )}
                                    </div>

                                    <strong>
                                        {skill.proficiency}%
                                    </strong>
                                </div>

                                <div
                                    className="progress-track"
                                    aria-label={`${skill.name}: ${skill.proficiency}%`}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${skill.proficiency}%`,
                                        }}
                                    />
                                </div>

                                {skill.description && (
                                    <p>{skill.description}</p>
                                )}
                            </article>
                        ))}
                    </section>
                );
            })}
        </div>
    );
}
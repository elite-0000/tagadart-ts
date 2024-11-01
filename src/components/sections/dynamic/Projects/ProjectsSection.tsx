"use client"
import React from 'react'

import { Project } from '@/types/project'
import { PageIntro } from '@/types/global'
import { fetchProjects } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeInStagger } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ProjectCard1 from './ProjectCard/ProjectCard1'
import { Section } from '@/components/ui/Section'
import Fetcher from '@/request/Fetcher'
import PaginationMain from '../../Pagination'
interface ProjectsProps {
  projectsSection: { sectionIntro: PageIntro } & { projects: Project[] };
  designType: number;
}

interface RenderContentProps {
  projects: Project[];
  sectionIntro: PageIntro;
  designType?: number;
}

const RenderContent: React.FC<RenderContentProps> = ({
  projects,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <Container>
          <SectionIntro {...sectionIntro} />
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {projects.map((project: Project) => (
              <ProjectCard1 key={project.id} project={project} />
            ))}
          </FadeInStagger>
        </Container>
      );
  }
};

const ProjectsSection: React.FC<ProjectsProps> = ({
  projectsSection,
  designType,
}) => {
  const url = '/projects';
  return (
    <>
      <Fetcher url={url} paginationMode="pagination">
        {({ data, currentPage, totalPages, goToPage }) => {
          return (
            <div>
              <RenderContent
                projects={data.data}
                sectionIntro={projectsSection.sectionIntro}
                designType={designType}
              />
              {projectsSection.sectionIntro.pagination ? (
                <PaginationMain
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
              ) : null}
            </div>
          );
        }}
      </Fetcher>
    </>
  );
};

export default ProjectsSection;
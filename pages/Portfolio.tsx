
import React, { useState, useEffect, useContext } from 'react';
import { ProjectStatus, Project } from '../types';
import { AdminContext } from '../index';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/apiService';

const Portfolio: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectStatus | 'ALL'>('ALL');
  const [newProject, setNewProject] = useState({
    title: '', description: '', status: ProjectStatus.PLANNED, image: '', category: 'Residential'
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createProject(newProject);
      setProjects([created, ...projects]);
      setNewProject({ title: '', description: '', status: ProjectStatus.PLANNED, image: '', category: 'Residential' });
    } catch (error) {
      alert('Failed to create project');
    }
  };

  const updateStatus = async (id: string, newStatus: ProjectStatus) => {
    try {
      await updateProject(id, { status: newStatus });
      setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      alert('Failed to update project');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this project from White Eagle records?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px bg-zinc-200 flex-grow"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#064e3b]">Building Heritage</span>
             <div className="h-px bg-zinc-200 flex-grow"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black font-serif uppercase mb-12 text-center tracking-tighter">Our Portfolio</h1>
          
          {isAdmin && (
            <div className="mb-16 p-10 bg-zinc-50 border-2 border-dashed border-[#064e3b] rounded-sm shadow-sm animate-fade-in">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-[#064e3b] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#064e3b] rounded-full"></span>
                Admin: Add New Project
              </h3>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input 
                  type="text" placeholder="Project Name" className="w-full bg-white border border-zinc-200 p-4 text-xs focus:outline-none focus:border-[#064e3b]" required
                  value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})}
                />
                <input 
                  type="text" placeholder="Cover Image URL" className="w-full bg-white border border-zinc-200 p-4 text-xs focus:outline-none focus:border-[#064e3b]" required
                  value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})}
                />
                <select 
                  className="w-full bg-white border border-zinc-200 p-4 text-xs focus:outline-none focus:border-[#064e3b]"
                  value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Interior Decor">Interior Decor</option>
                </select>
                <textarea 
                  placeholder="Project Description" className="md:col-span-2 w-full bg-white border border-zinc-200 p-4 text-xs h-20 focus:outline-none focus:border-[#064e3b]" required
                  value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}
                />
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-[#064e3b] text-white text-[10px] font-black uppercase py-5 tracking-[0.2em] hover:bg-black transition-all">
                    Register Project
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-zinc-100 pb-12">
            {['ALL', ...Object.values(ProjectStatus)].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-8 py-3 font-black uppercase text-[10px] tracking-[0.2em] transition-all border-b-2 ${
                  filter === status 
                    ? 'text-black border-black' 
                    : 'text-zinc-300 border-transparent hover:text-[#064e3b] hover:border-[#064e3b]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {filteredProjects.map(project => (
            <div key={project.id} className="group relative">
              <div className="aspect-[16/10] bg-zinc-100 overflow-hidden mb-8 shadow-xl">
                <img 
                  src={project.image || 'https://picsum.photos/seed/build/1200/800'} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${
                    project.status === ProjectStatus.FINISHED ? 'bg-black' : 
                    project.status === ProjectStatus.ONGOING ? 'bg-[#064e3b]' : 'bg-zinc-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1 bg-black/80 backdrop-blur p-2 shadow-2xl">
                      {Object.values(ProjectStatus).map(st => (
                        <button 
                          key={st}
                          onClick={() => updateStatus(project.id, st)}
                          className={`w-8 h-8 flex items-center justify-center text-[8px] font-black uppercase transition-colors ${
                            project.status === st ? 'bg-[#064e3b] text-white' : 'bg-white text-black hover:bg-zinc-200'
                          }`}
                          title={`Mark as ${st}`}
                        >
                          {st.charAt(0)}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-600 text-white text-[8px] font-black uppercase px-4 py-3 hover:bg-red-700 transition-colors shadow-2xl text-center"
                    >
                      Remove Project
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#064e3b]">{project.category}</span>
                <div className="flex-grow h-px bg-zinc-100"></div>
              </div>
              <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter text-black font-serif italic">{project.title}</h3>
              <p className="text-zinc-500 leading-relaxed mb-8 font-light text-lg max-w-xl">{project.description}</p>
              <div className="flex items-center gap-8 border-t border-zinc-50 pt-8 mt-auto">
                <button className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#064e3b] transition-all">
                  Project Details
                </button>
                {project.completionDate && (
                  <div className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest italic">
                    Delivered: {project.completionDate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="py-48 text-center text-zinc-300">
            <p className="text-2xl font-serif italic font-light">No projects found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch {
      toast.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }

    try {
      await api.post('/projects', { name });
      setName('');
      fetchProjects();
      toast.success('Project created');
    } catch {
      toast.error('Error creating project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Error deleting project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Link
            to="/profile"
            className="text-blue-600 hover:underline font-medium"
          >
            Profile
          </Link>
        </div>

        {/* Create Project */}
        <form onSubmit={handleCreate} className="flex gap-3 mb-8">
          <input
            placeholder="New Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </button>
        </form>

        {/* Project List */}
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center">No projects yet.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="p-5 border rounded-lg flex justify-between items-center hover:shadow-md transition"
              >
                <h3
                  className="text-lg font-medium cursor-pointer"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  {project.name}
                </h3>

                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
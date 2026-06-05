
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import TechStackPage from './pages/TechStackPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import CertificatesPage from './pages/CertificatesPage';
import BlogPreviewPage from './pages/BlogPreviewPage';
import ContactPage from './pages/ContactPage';
import BlogDetail from './pages/BlogDetail';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tech" element={<TechStackPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/blog" element={<BlogPreviewPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

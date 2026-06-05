import {
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub, FaFigma, FaDocker, FaPhp, FaLaravel, FaPython
} from 'react-icons/fa';
import {
  SiVite, SiJavascript, SiTypescript, SiExpress, SiPostgresql, SiMysql, SiCplusplus
} from 'react-icons/si';
import { FiGitBranch } from 'react-icons/fi';

export const skills = [
  // Frontend
  { id: '1', name: 'React', icon: FaReact, category: 'Frontend', proficiency: 90 },
  { id: '2', name: 'Vite', icon: SiVite, category: 'Frontend', proficiency: 85 },
  { id: '3', name: 'HTML', icon: FaHtml5, category: 'Frontend', proficiency: 95 },
  { id: '4', name: 'CSS', icon: FaCss3Alt, category: 'Frontend', proficiency: 90 },
  { id: '5', name: 'JavaScript', icon: SiJavascript, category: 'Frontend', proficiency: 88 },
  { id: '6', name: 'TypeScript', icon: SiTypescript, category: 'Frontend', proficiency: 80 },

  // Backend & Languages
  { id: '7', name: 'Node.js', icon: FaNodeJs, category: 'Backend', proficiency: 80 },
  { id: '8', name: 'Express', icon: SiExpress, category: 'Backend', proficiency: 75 },
  { id: '9', name: 'PHP', icon: FaPhp, category: 'Backend', proficiency: 90 },
  { id: '10', name: 'Laravel', icon: FaLaravel, category: 'Backend', proficiency: 90 },
  { id: '11', name: 'C/C++', icon: SiCplusplus, category: 'Backend', proficiency: 80 },
  { id: '12', name: 'Python', icon: FaPython, category: 'Backend', proficiency: 85 },
  { id: '13', name: 'MySQL', icon: SiMysql, category: 'Backend', proficiency: 90 },
  { id: '14', name: 'PostgreSQL', icon: SiPostgresql, category: 'Backend', proficiency: 80 },

  // Tools
  { id: '15', name: 'Git', icon: FiGitBranch, category: 'Tools', proficiency: 90 },
  { id: '16', name: 'GitHub', icon: FaGithub, category: 'Tools', proficiency: 90 },
  { id: '17', name: 'Figma', icon: FaFigma, category: 'Tools', proficiency: 80 },
  { id: '18', name: 'Docker', icon: FaDocker, category: 'Tools', proficiency: 80 },
];

export interface SkillNode {
  name: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillNode[];
}

export const skillGraph: SkillCategory[] = [
  {
    id: 'robotics',
    label: 'Robotics & Embedded',
    skills: [
      { name: 'ROS 2 (Jazzy)' },
      { name: 'MoveIt' },
      { name: 'Gazebo' },
      { name: 'Nav2' },
      { name: 'RViz' },
      { name: 'ArduPilot / PX4' },
      { name: 'Pixhawk 6C' },
      { name: 'ORB-SLAM3' },
      { name: 'Sensor Fusion / EKF' },
      { name: 'ESP32' },
      { name: 'RealSense' },
      { name: 'Raspberry Pi 5' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'C++' },
      { name: 'Python' },
      { name: 'Embedded C' },
      { name: 'MicroPython' },
      { name: 'TypeScript' },
      { name: 'Dart' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'web',
    label: 'Web & Backend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Node / Express' },
      { name: 'Flask' },
      { name: 'Supabase' },
      { name: 'Postgres' },
      { name: 'MySQL' },
      { name: 'WebRTC' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    skills: [
      { name: 'TensorFlow Lite' },
      { name: 'OpenCV' },
      { name: 'Firebase' },
      { name: 'Pandas / NumPy' },
      { name: 'Web3.py' },
    ],
  },
  {
    id: 'tools',
    label: 'Tooling',
    skills: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'CMake' },
      { name: 'GitHub Actions' },
      { name: 'VS Code' },
    ],
  },
];

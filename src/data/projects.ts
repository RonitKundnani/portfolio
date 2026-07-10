export type ProjectGroup = 'robotics' | 'web';

export interface Project {
  id: string;
  index: string;
  group: ProjectGroup;
  status: string;
  statusLive?: boolean;
  title: string;
  description: string;
  stack: string[];
  metrics: { k: string; v: string }[];
  outcome: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    id: 'iroc-uav',
    index: '01',
    group: 'robotics',
    status: 'ELIMINATION ROUND',
    title: 'GPS-Denied UAV Navigation',
    description:
      'Hardware-software lead, ISRO IRoC-U 2026. Built and integrated a GPS-denied autonomous navigation stack for a quadcopter, fusing visual odometry with onboard depth sensing for localization without satellite positioning.',
    stack: ['Pixhawk 6C', 'ArduCopter', 'ROS 2 Jazzy', 'ORB-SLAM3', 'RealSense D455', 'Raspberry Pi 5'],
    metrics: [
      { k: 'Localization Error', v: '0.16 m ATE RMSE' },
      { k: 'Environment', v: 'SITL / GPS-denied' },
    ],
    outcome: 'Reached Elimination Round, ISRO IRoC-U 2026',
  },
  {
    id: 'mycobot',
    index: '02',
    group: 'robotics',
    status: 'SIMULATION',
    title: 'myCobot 280 Motion Planning',
    description:
      'ROS 2 + MoveIt motion-planning simulation for a 6-DOF manipulator — inverse kinematics, collision-aware trajectory planning, and URDF-driven visualization in RViz/Gazebo.',
    stack: ['ROS 2', 'MoveIt', 'Gazebo', 'URDF', 'RViz'],
    metrics: [
      { k: 'DOF', v: '6-axis' },
      { k: 'Planner', v: 'MoveIt OMPL' },
    ],
    outcome: 'Flagship open-source robotics repo',
    repo: 'https://github.com/RonitKundnani/mycobot-using-ROS2-JAZZY',
  },
  {
    id: 'nav2-turtlebot3',
    index: '03',
    group: 'robotics',
    status: 'SIMULATION',
    title: 'Nav2 Autonomous Navigation — TurtleBot3',
    description:
      'Autonomous navigation stack for a simulated TurtleBot3 using Nav2 in Ignition Gazebo — full localization/planning pipeline with tf frames bridged between Ignition and ROS 2 via ros_ign_bridge, visualized live in rviz2.',
    stack: ['ROS 2 Humble', 'Nav2', 'Ignition Gazebo Fortress', 'TurtleBot3', 'tf2'],
    metrics: [
      { k: 'Planner', v: 'Nav2 bringup' },
      { k: 'Sim', v: 'Ignition Fortress' },
    ],
    outcome: 'Working end-to-end nav stack in simulation',
    repo: 'https://github.com/RonitKundnani/navigation2_ignition_gazebo_turtlebot3',
  },
  {
    id: 'fanuc-crx10ia',
    index: '04',
    group: 'robotics',
    status: 'EXPERIMENTAL',
    title: 'Fanuc CRX-10iA Control',
    description:
      'Control and motion experiments on a Fanuc CRX-10iA collaborative industrial arm — bridging industrial robot control conventions with ROS-style tooling.',
    stack: ['C++', 'Industrial Robotics', 'Motion Control'],
    metrics: [
      { k: 'Platform', v: 'Fanuc CRX-10iA' },
      { k: 'Type', v: 'Collaborative arm' },
    ],
    outcome: 'Ongoing hardware experimentation',
    repo: 'https://github.com/RonitKundnani/Fanuc_crx10ia',
  },
  {
    id: 'camera-ros2',
    index: '05',
    group: 'robotics',
    status: 'EXPERIMENTAL',
    title: 'Camera Pipeline on ROS 2',
    description:
      'ROS 2 vision-node experiments — camera driver integration and image-topic pipelines as a building block for the perception stack used across other robotics projects.',
    stack: ['ROS 2', 'Computer Vision', 'Python'],
    metrics: [
      { k: 'Layer', v: 'Perception' },
      { k: 'Transport', v: 'ROS 2 topics' },
    ],
    outcome: 'Reusable camera pipeline for robotics stack',
    repo: 'https://github.com/RonitKundnani/CameraUsingROS2',
  },
  {
    id: 'hexabot',
    index: '06',
    group: 'robotics',
    status: 'HARDWARE',
    title: 'Hexabot — Six-Legged Walker',
    description:
      'Hexapod robot with custom gait control — 18-servo coordination for tripod-gait locomotion over uneven terrain, driven from an ESP32.',
    stack: ['ESP32', 'PCA9685', 'Servo Control', 'Embedded C'],
    metrics: [
      { k: 'Legs', v: '6' },
      { k: 'Gait', v: 'Tripod' },
    ],
    outcome: 'Working hardware prototype',
  },
  {
    id: 'kisansahayak',
    index: '07',
    group: 'robotics',
    status: 'DEPLOYED',
    title: 'KisanSahayak',
    description:
      'IoT + on-device AI agriculture platform — field sensors stream soil/crop data to Firebase, with on-device crop-disease detection for small-scale farmers.',
    stack: ['TensorFlow Lite', 'Firebase', 'IoT Sensors', 'Flutter'],
    metrics: [
      { k: 'Inference', v: 'On-device TFLite' },
      { k: 'Backend', v: 'Firebase Realtime' },
    ],
    outcome: 'Working advisory platform for farmers',
    repo: 'https://github.com/RonitKundnani/KisanSahayak',
  },
  {
    id: 'line-follower',
    index: '08',
    group: 'robotics',
    status: '2ND RUNNER-UP',
    title: 'Autonomous Line-Follower',
    description:
      'IR-sensor path-tracking robot with closed-loop embedded motor control, tuned for sharp turns and variable lighting.',
    stack: ['Arduino', 'IR Sensors', 'PID Control'],
    metrics: [
      { k: 'Control', v: 'PID' },
      { k: 'Result', v: '2nd Runner-Up' },
    ],
    outcome: '2nd Runner-Up, Prevoyance competition',
  },
  {
    id: 'splitup',
    index: '09',
    group: 'web',
    status: 'DEPLOYED',
    statusLive: true,
    title: 'SplitUp',
    description:
      'Splitwise-style expense splitter for groups. Postgres Row-Level Security enforces per-user data access; a greedy debt-simplification algorithm suggests the fewest payments to settle a group.',
    stack: ['React 18', 'TypeScript', 'Supabase', 'Postgres RLS', 'Tailwind'],
    metrics: [
      { k: 'Auth Model', v: 'Row-Level Security' },
      { k: 'Core Algo', v: 'Debt simplification' },
    ],
    outcome: 'Live, link-based invite + approval flow',
    repo: 'https://github.com/RonitKundnani/SplitUp',
  },
  {
    id: 'beam',
    index: '10',
    group: 'web',
    status: 'DEPLOYED',
    statusLive: true,
    title: 'Beam',
    description:
      '"AirDrop for the web" — peer-to-peer file/text transfer over WebRTC. The server only handles signaling; file bytes never touch it. Chunked transfer with backpressure for large files, QR pairing across networks.',
    stack: ['WebRTC', 'Node.js', 'SQLite/Turso', 'PWA', 'Docker'],
    metrics: [
      { k: 'Transfer', v: 'P2P DataChannel' },
      { k: 'Chunk Size', v: '64 KB w/ backpressure' },
    ],
    outcome: 'Deployed — Docker / Render / Fly.io',
    repo: 'https://github.com/RonitKundnani/Beam_Transfer',
  },
  {
    id: 'workzen',
    index: '11',
    group: 'web',
    status: 'HACKATHON',
    title: 'WorkZen — HR Management System',
    description:
      'Full multi-tenant HRMS built at the Odoo x IIT Gandhinagar hackathon — 4 role-based access levels (Admin/HR/Payroll/Employee), a 4-step payroll wizard with PF and professional-tax calculation, attendance/leave workflows, and a real-time analytics dashboard.',
    stack: ['Next.js', 'React 19', 'Express', 'MySQL', 'JWT'],
    metrics: [
      { k: 'Roles', v: '4 (RBAC)' },
      { k: 'Core Engine', v: 'Payroll + Attendance' },
    ],
    outcome: 'Built for Odoo x IIT Gandhinagar hackathon',
    repo: 'https://github.com/RonitKundnani/OdooXIITGN',
  },
  {
    id: 'geofencing',
    index: '12',
    group: 'web',
    status: 'DEPLOYED',
    title: 'Employee Geofencing Platform',
    description:
      'Flask web app for continuous employee location tracking with admin-controlled geofence zones and real-time monitoring — auth, live maps, and database-backed tracking in one deployment.',
    stack: ['Flask', 'Maps API', 'SQL', 'Auth'],
    metrics: [
      { k: 'Tracking', v: 'Real-time' },
      { k: 'Control', v: 'Admin geofence zones' },
    ],
    outcome: 'Full-stack tracking + monitoring app',
    repo: 'https://github.com/RonitKundnani/GeoFencing',
  },
  {
    id: 'facial-blockchain-auth',
    index: '13',
    group: 'web',
    status: 'EXPERIMENTAL',
    title: 'Facial + Blockchain Auth',
    description:
      'Security-focused authentication system combining facial recognition, blockchain-based identity verification, and real-time fraud/risk detection, with document verification via OCR.',
    stack: ['Flask', 'TensorFlow/OpenCV', 'Web3.py', 'PyTesseract'],
    metrics: [
      { k: 'Auth Factor', v: 'Facial + 2FA' },
      { k: 'Identity Store', v: 'Blockchain' },
    ],
    outcome: 'Working prototype — fraud/risk scoring included',
    repo: 'https://github.com/RonitKundnani/BREACH-Bug-Bucks',
  },
];

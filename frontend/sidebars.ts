import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  physicalAiModules: [
    'introduction', // Introduction
    {
      type: 'category',
      label: 'Chapter 1: Foundations of Physical AI',
      link: {
        type: 'generated-index',
        title: 'Chapter 1: Foundations of Physical AI',
        description: 'Core concepts, embodied intelligence, and humanoid robotics overview.',
        slug: '/category/chapter-1-foundations-of-physical-ai',
      },
      items: [
        'chapter1/introduction-to-physical-ai',
        'chapter1/embodied-intelligence',
        'chapter1/humanoid-robotics-overview',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 2: Robot Perception Systems',
      link: {
        type: 'generated-index',
        title: 'Chapter 2: Robot Perception Systems',
        description: 'Sensors, computer vision, and sensor fusion for robotics.',
        slug: '/category/chapter-2-robot-perception-systems',
      },
      items: [
        'chapter2/sensors-and-data-acquisition',
        'chapter2/computer-vision-for-robotics',
        'chapter2/sensor-fusion',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 3: Motion, Control, and Actuation',
      link: {
        type: 'generated-index',
        title: 'Chapter 3: Motion, Control, and Actuation',
        description: 'Kinematics, dynamics, control systems, and locomotion.',
        slug: '/category/chapter-3-motion-control-and-actuation',
      },
      items: [
        'chapter3/kinematics-and-dynamics',
        'chapter3/control-systems',
        'chapter3/locomotion-and-manipulation',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 4: Learning and Intelligence in Robots',
      link: {
        type: 'generated-index',
        title: 'Chapter 4: Learning and Intelligence in Robots',
        description: 'Machine learning, reinforcement learning, and imitation learning in robotics.',
        slug: '/category/chapter-4-learning-and-intelligence-in-robots',
      },
      items: [
        'chapter4/machine-learning-for-physical-ai',
        'chapter4/reinforcement-learning-in-robotics',
        'chapter4/imitation-and-human-in-the-loop-learning',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 5: Simulation to Real-World Transfer',
      link: {
        type: 'generated-index',
        title: 'Chapter 5: Simulation to Real-World Transfer',
        description: 'Robotics simulation environments, sim-to-real challenges, and deployment.',
        slug: '/category/chapter-5-simulation-to-real-world-transfer',
      },
      items: [
        'chapter5/gazebo-simulators',
        'chapter5/isaac-sim',
        'chapter5/unity-for-robotics',
        'chapter5/sim-to-real-challenges',
        'chapter5/deployment-on-real-robots',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 6: System Integration and Architecture',
      link: {
        type: 'generated-index',
        title: 'Chapter 6: System Integration and Architecture',
        description: 'Robotics middleware, AI/control integration, and safety/ethics.',
        slug: '/category/chapter-6-system-integration-and-architecture',
      },
      items: [
        'chapter6/robotics-middleware',
        'chapter6/ai-and-control-system-integration',
        'chapter6/safety-ethics-and-reliability',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 7: Case Studies and Projects',
      link: {
        type: 'generated-index',
        title: 'Chapter 7: Case Studies and Projects',
        description: 'Humanoid robot case studies, end-to-end projects, and capstone guidelines.',
        slug: '/category/chapter-7-case-studies-and-projects',
      },
      items: [
        'chapter7/humanoid-robot-case-studies',
        'chapter7/end-to-end-physical-ai-projects',
        'chapter7/capstone-project-guidelines',
      ],
    },
    'conclusion', // Conclusion
    'appendices', // Appendices
  ],
};

export default sidebars;

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
  ],
};

export default sidebars;

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  roadmap?: string[];
}

export const generateAIResponse = async (prompt: string, context?: any): Promise<{ text: string; roadmap?: string[] }> => {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const input = prompt.toLowerCase();

  // Custom responses simulating high-quality guidance
  if (input.includes('roadmap') || input.includes('path') || input.includes('guide')) {
    if (input.includes('python') || input.includes('ai') || input.includes('ml')) {
      return {
        text: "Here is your customized learning roadmap for **Artificial Intelligence & ML**. I recommend starting with basic python programming, linear algebra, and data science before moving onto deep learning frameworks.",
        roadmap: [
          "Month 1-2: Core Python & NumPy / Pandas",
          "Month 3: Probability, Calculus, and Linear Algebra",
          "Month 4: Classical Machine Learning (Scikit-Learn)",
          "Month 5: Deep Learning Core & PyTorch Basics",
          "Month 6: LLMs, Fine-tuning, and RAG architectures"
        ]
      };
    }
    return {
      text: "I have prepared a custom learning roadmap. Focus on gaining fundamental engineering skills, contributing to open source, and building 2-3 real-world portfolio applications.",
      roadmap: [
        "Phase 1: Foundations of Programming & Algorithms",
        "Phase 2: Database Management & API Design",
        "Phase 3: Building full-stack projects",
        "Phase 4: Understanding cloud deployment (AWS/Docker)",
        "Phase 5: Technical mock interview practice"
      ]
    };
  }

  if (input.includes('resume') || input.includes('cv')) {
    return {
      text: "Here are some critical tips to polish your resume for top tech roles:\n\n1. **Use the STAR Method**: Describe your projects by stating the *Situation, Task, Action, and Result*.\n2. **Include quantitative metrics**: Instead of 'optimized search', say 'reduced API latency by 42%'.\n3. **Tailor to job descriptions**: Match keywords like *TypeScript*, *RESTful APIs*, or *System Architecture*.\n4. **Keep it to 1 page**: Essential for entry-level candidates."
    };
  }

  if (input.includes('interview') || input.includes('placement')) {
    return {
      text: "Preparing for interviews is 70% preparation and 30% presentation. Focus on:\n\n- **Technical**: Master 150-200 DSA problems on Arrays, Trees, Graphs, and Dynamic Programming.\n- **System Design**: Learn scaling principles (databases, load balancing, caching).\n- **Behavioral**: Prepare stories showing leadership, conflict resolution, and adaptability."
    };
  }

  if (input.includes('study') || input.includes('time') || input.includes('planner')) {
    return {
      text: "For effective study planning, I recommend the **Pomodoro Technique** (50 mins study, 10 mins break) and **Active Recall** plus **Spaced Repetition**. I have scheduled revision blocks in your Study Planner module!"
    };
  }

  // General greeting/help
  return {
    text: "Hello! I am your **EduVerse AI Mentor**. I am here to help you navigate your journey from Class 10 to your first job.\n\nYou can ask me to:\n- Generate a custom learning **roadmap** (e.g. 'Create AI roadmap')\n- Check your **resume** checklist\n- Help you prepare for **interviews**\n- Outline a **study plan**"
  };
};

import axios from 'axios';
import { Course, Roadmap, LearningPath, AIRecommendRequest, AIRecommendation } from '../types/course';

const BASE_URL = 'http://localhost:8000/api/courses';

export const courseApi = {
  getCourses: async (params?: { category?: string; provider?: string; difficulty?: string; is_free?: boolean; limit?: number; skip?: number }): Promise<Course[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },

  getRoadmap: async (career: string): Promise<Roadmap | null> => {
    try {
      const response = await axios.get(`${BASE_URL}/roadmaps/${career}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      return null;
    }
  },

  getLearningPaths: async (education_level: string, stream?: string): Promise<LearningPath[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/learning-paths`, { params: { education_level, stream } });
      return response.data;
    } catch (error) {
      console.error('Error fetching learning paths:', error);
      return [];
    }
  },

  getAIRecommendations: async (request: AIRecommendRequest): Promise<AIRecommendation[]> => {
    try {
      const response = await axios.post(`${BASE_URL}/recommend`, request);
      return response.data.recommendations || [];
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return [];
    }
  }
};

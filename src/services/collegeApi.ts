import axios from 'axios';
import { College, CollegeFilterParams, CollegeListResponse } from '../types/college';

const API_BASE = 'http://localhost:8000/api/colleges';

export const collegeApi = {
  getColleges: async (params: CollegeFilterParams): Promise<CollegeListResponse> => {
    const res = await axios.get(API_BASE, { params });
    return res.data;
  },

  getCollegeById: async (id: string): Promise<College> => {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  },

  searchColleges: async (q: string): Promise<College[]> => {
    const res = await axios.get(`${API_BASE}/search`, { params: { q } });
    return res.data.results;
  },

  compareColleges: async (ids: string[]): Promise<College[]> => {
    const res = await axios.get(`${API_BASE}/compare`, { params: { ids: ids.join(',') } });
    return res.data.colleges;
  },

  aiRecommend: async (req: { state?: string; max_budget?: number; target_career?: string; preferred_course?: string }) => {
    const res = await axios.post(`${API_BASE}/ai-recommend`, req);
    return res.data.recommendations;
  },

  createCollege: async (data: Partial<College>) => {
    const res = await axios.post(API_BASE, data);
    return res.data;
  },

  updateCollege: async (id: string, data: Partial<College>) => {
    const res = await axios.put(`${API_BASE}/${id}`, data);
    return res.data;
  },

  deleteCollege: async (id: string) => {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  },

  importColleges: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${API_BASE}/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};

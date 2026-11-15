export interface CollegeLocation {
  country: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface CollegeDetails {
  is_government: boolean;
  is_private: boolean;
  is_deemed: boolean;
  is_state_university: boolean;
  is_central_university: boolean;
  is_autonomous: boolean;
  institution_type: string;
}

export interface CollegeApproval {
  ugc_approved: boolean;
  aicte_approved: boolean;
  naac_grade: string;
  nba_accredited: boolean;
  nirf_rank?: number;
  accreditation?: string;
}

export interface CourseItem {
  name: string;
  branch?: string;
  duration_years: number;
  tuition_fee_per_year: number;
  total_seats: number;
}

export interface CollegeFees {
  tuition_fee_min: number;
  tuition_fee_max: number;
  hostel_fee_per_year: number;
  other_charges: number;
}

export interface CollegePlacement {
  placement_percentage: number;
  highest_package_lpa: number;
  average_package_lpa: number;
  top_recruiters: string[];
}

export interface CollegeCampus {
  hostel: boolean;
  wifi: boolean;
  library: boolean;
  labs: boolean;
  sports: boolean;
  transport: boolean;
  cafeteria: boolean;
  medical: boolean;
  auditorium: boolean;
}

export interface CollegeAdmission {
  eligibility: string;
  entrance_exams: string[];
  cutoff_info: string;
  seat_intake: number;
}

export interface CollegeContact {
  official_website: string;
  email: string;
  phone: string;
}

export interface College {
  _id?: string;
  college_id: string;
  name: string;
  short_name: string;
  logo_url: string;
  cover_image_url: string;
  gallery_images: string[];
  description: string;
  gender_type: string;
  scholarship_available: boolean;
  
  location: CollegeLocation;
  details: CollegeDetails;
  approval: CollegeApproval;
  courses: CourseItem[];
  fees: CollegeFees;
  placement: CollegePlacement;
  campus: CollegeCampus;
  admission: CollegeAdmission;
  contact: CollegeContact;
  
  popularity_score?: number;
}

export interface CollegeFilterParams {
  search?: string;
  state?: string;
  city?: string;
  district?: string;
  is_government?: boolean;
  is_private?: boolean;
  institution_type?: string;
  naac_grade?: string;
  course?: string;
  max_fee?: number;
  min_placement_pct?: number;
  min_avg_package?: number;
  has_hostel?: boolean;
  gender_type?: string;
  sort_by?: string;
  page?: number;
  limit?: number;
}

export interface CollegeListResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  colleges: College[];
}

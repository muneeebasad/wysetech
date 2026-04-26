export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentColor: string;
  bio: string;
  skills: string[];
  avatarFrom: string;
  avatarTo: string;
  initials: string;
  photo: string;
  showPhoto: boolean;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export interface CreateCompanyInput {
  userId: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
}

export interface UpdateCompanyInput {
  name?: string;
  description?: string;
  website?: string;
  logo?: string;
}
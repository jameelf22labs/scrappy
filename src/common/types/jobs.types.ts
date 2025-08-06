export type ScrappedJobsTypes = {
  jobTitle: string;
  remote: string;
  jobType: string;
  location: string;
  postedAt?: string;
  salary?: string;
  url: string;
  hasKey: string;
};

export type JobQueryParams = {
  title: string;
  remote: string;
  type: string;
  location: string;
  page: number;
  limit: number
};

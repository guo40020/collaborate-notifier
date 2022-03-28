export type GitlabEventType = 
  // merge requests
  | "Merge Request Hook" 
  // comments on stuff
  | "Note Hook" 
  // issues
  | "Issue Hook";

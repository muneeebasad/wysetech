export interface Tool {
  name: string;
  url: string | null;
}

export interface Service {
  id: string;
  slug: string;
  color: string;
  title: string;
  sub: string;
  icon: string;
  items: string[];
  tools: Tool[];
}

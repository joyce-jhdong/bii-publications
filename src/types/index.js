// @flow strict
import type { Node as ReactNode } from 'react';

export type RenderCallback = {
  // $FlowFixMe
  render: (data: any) => ReactNode;
}

export type Entry = {
  getIn: (string[]) => string;
}

export type WidgetFor = (string) => string;

export type PageContext = {
  tag: string,
  category: string,
  currentPage: number,
  prevPagePath: string,
  nextPagePath: string,
  hasPrevPage: boolean,
  hasNextPage: boolean
};

export type Node = {
  fields: {
    slug: string,
    categorySlugs?: string[],
    tagSlugs?: string[]
  },
  frontmatter: {
    date: string,
    description?: string,
    categories?: string[],
    tags?: string[],
    title: string,
    uploadfile?: string,
    journaltypes: string,
    journal: string,
    pubmed: string,
    url: string,
    impactfactor: string,
    dateofacceptance: string
  },
  html: string,
  id: string
};

export type Edge = {
  node: Node
};

export type Edges = Array<Edge>;

export type AllMarkdownRemark = {
  allMarkdownRemark: {
    edges: Edges,
  },
  group: {
    fieldValue: string,
    totalCount: number
  }[]
};

export type MarkdownRemark = Node;

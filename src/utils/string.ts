const PAGING_REGEX = /page=(\d+).*?rel="(\w+)"/g;

export interface PagingParams {
  [key: string]: string;
}

export const extractPagingParams = (link: string): PagingParams => {
  const result: PagingParams = {};
  
  let match;
  while ((match = PAGING_REGEX.exec(link)) !== null) {
    result[match[2]] = match[1]
  }
  
  return result
}
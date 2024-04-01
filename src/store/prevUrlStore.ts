import { StringParam, useQueryParam } from 'use-query-params';
import { useLocation } from 'react-router-dom';

export const usePrevUrlStore = () => {
  const key = 'prevUrl';
  const [prevUrl, setPrevUrl] = useQueryParam(key, StringParam);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSearch = location.search;

  const set = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    setPrevUrl(encodedUrl);
  };

  const buildCurrentUrl = () => {
    return currentPath + currentSearch;
  };

  const setCurrentUrl = () => {
    const currentUrl = buildCurrentUrl();
    set(currentUrl);
  };

  const get = () => {
    if (!prevUrl) {
      return null;
    }

    return decodeURIComponent(prevUrl);
  };

  return { key, getPrevUrl: get, setPrevUrl: set, buildCurrentUrl, setCurrentUrl };
};

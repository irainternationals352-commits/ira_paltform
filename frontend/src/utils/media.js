import { API_BASE_URL } from '../config/api';

const getApiOrigin = () => {
  if (!API_BASE_URL || API_BASE_URL.startsWith('/')) {
    return window.location.origin;
  }

  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return window.location.origin;
  }
};

export const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const mediaPath = url.startsWith('/') ? url : `/${url}`;
  return `${getApiOrigin()}${mediaPath}`;
};

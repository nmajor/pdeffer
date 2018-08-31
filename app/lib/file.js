import download from 'download';

export function downloadToFile(url, dest) {
  return download(url, dest);
}

export function downloadToBuffer(url) {
  download(url);
}

import download from 'download';
import url from 'url';
import path from 'path';

export const dir = `${__dirname}../../tmp`;

export function toFile(fileUrl) {
  const parsed = url.parse(fileUrl);
  const filename = path.basename(parsed.pathname);
  const dest = `${dir}/${filename}`;
  return download(url, dest).then(() => (dest));
}

export default null;

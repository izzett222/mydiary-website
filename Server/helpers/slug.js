import slugify from 'slugify';
import uniqueSlug from 'unique-slug';

const slugStr = (string) => {
  return `${slugify(string)}-${uniqueSlug()}`;
};
export default slugStr;

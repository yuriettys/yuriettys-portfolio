import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
};

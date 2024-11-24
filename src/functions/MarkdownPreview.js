import { Remarkable } from "remarkable";

const md = new Remarkable();

// change Markdown: ** - <strong> => <b>, * - <em> => <strong> (because Markdown doesn't have symbol for <b>)
md.renderer.rules.strong_open = function () {
  return "<b>";
};
md.renderer.rules.strong_close = function () {
  return "</b>";
};
md.renderer.rules.em_open = function () {
  return "<strong>";
};
md.renderer.rules.em_close = function () {
  return "</strong>";
};

function renderMarkdownToHTML(markdown) {
  const renderedHTML = md.render(markdown);
  return { __html: renderedHTML };
}

export default function MarkdownPreview({ markdown, className = {} }) {
  const markup = renderMarkdownToHTML(markdown);
  return <div className={ className} dangerouslySetInnerHTML={markup} />;
}

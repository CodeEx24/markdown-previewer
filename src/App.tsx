import { useState } from 'react';
import { Expand } from './assets/Expand';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

import SocialLinks from './components/SocialLinks';
import { Freecodecamp } from './assets/Freecodecamp';
import { socialLinks } from './const/socialLinks';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      console.log('INFO: ', info);
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.setOptions({
  breaks: true, // This enables rendering line breaks as <br>
});

const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App() {
  const [markdown, setMarkdown] = useState(initialText);
  const [isEditorExpand, setIsEditorExpand] = useState(false);
  const [isPreviewExpand, setIsPreviewExpand] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const handleEditorExpand = () => {
    setIsEditorExpand(!isEditorExpand);
  };

  const handlePreviewExpand = () => {
    setIsPreviewExpand(!isPreviewExpand);
  };

  return (
    <div className="bg-blue-300 h-full min-h-screen overflow-y-scroll w-screen flex justify-center items-center flex-col p-1 md:p-8 gap-4 ">
      <div
        className={`w-11/12 md:w-[500px] ${
          isEditorExpand ? 'h-full' : 'h-[250px]'
        } ${isPreviewExpand && 'hidden'}`}
      >
        <div className="border border-black px-4 py-1 flex justify-between items-center w-full">
          <p className="text-xl font-bold gap-2 flex mb-0">
            <Freecodecamp className="size-6 mt-1" />
            Editor
          </p>
          <Expand onClick={handleEditorExpand} />
        </div>
        <textarea
          id="editor"
          className={`w-full border border-black border-t-0 px-4 py-1 ${
            isEditorExpand ? 'h-[88vh]' : 'h-[250px]'
          }`}
          placeholder="Enter your markdown here..."
          value={markdown}
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`w-11/12 md:w-[800px] h-full ${
          !isPreviewExpand && 'mt-12'
        } ${isEditorExpand && 'hidden'}`}
      >
        <div className="border border-black px-4 py-1 flex justify-between items-center w-full ">
          <p className="text-xl font-bold gap-2 flex mb-0">
            <Freecodecamp className="size-6 mt-1" />
            Preview
          </p>
          <Expand onClick={handlePreviewExpand} />
        </div>
        <div
          id="preview"
          className={`w-full border border-black border-t-0 px-4 py-4 bg-blue-100 h-full overflow-x-hidden`}
          dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
        />
      </div>{' '}
      <SocialLinks links={socialLinks} />
    </div>
  );
}

export default App;

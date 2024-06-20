import { useEffect, useRef } from 'react';
import {
  MDXEditor,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  diffSourcePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { MARKDOWN_STYLE } from '@/utils/style/markdown';

const MarkdownEditor = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(value);
    }
  }, [value]);

  const handleEditorChange = (newMarkdown) => {
    if (!readOnly && onChange) {
      onChange(newMarkdown);
    }
  };

  return (
    <MDXEditor
      ref={editorRef}
      markdown={value}
      onChange={handleEditorChange}
      readOnly={readOnly}
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      contentEditableClassName={`${MARKDOWN_STYLE}`}
      className={`min-h-52 lg:min-h-96 ${
        !readOnly &&
        'px-3 py-2 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      }`}
    />
  );
};

export default MarkdownEditor;

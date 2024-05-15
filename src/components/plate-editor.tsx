/* eslint-disable prettier/prettier */
'use client';

import { ReactNode, useCallback, useMemo } from 'react';
import { autoformatRules } from '@/autoFormats';
import {
  LetterSpacing,
  TextCases,
  TextColors,
  TextFonts,
  TextSizes,
} from '@/utils/constants';
import { withProps } from '@udecode/cn';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import {
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate-block-quote';
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { CommentsProvider } from '@udecode/plate-comments';
import {
  createHistoryPlugin,
  createPlugins,
  createReactPlugin,
  Plate,
  PlateElement,
  PlateLeaf,
  RenderAfterEditable,
  TDescendant,
  TRenderElementProps,
} from '@udecode/plate-common';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from '@udecode/plate-heading';
import { createHighlightPlugin } from '@udecode/plate-highlight';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createKbdPlugin } from '@udecode/plate-kbd';
import { ELEMENT_COLUMN, ELEMENT_COLUMN_GROUP } from '@udecode/plate-layout';
import { createLinkPlugin } from '@udecode/plate-link';
import {
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
} from '@udecode/plate-list';
import { createMediaEmbedPlugin, ELEMENT_IMAGE } from '@udecode/plate-media';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
} from '@udecode/plate-table';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { Node } from 'slate';

import { ColumnElement } from '@/components/plate-ui/column-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ListElement } from '@/components/plate-ui/list-element';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { TableRowElement } from '@/components/plate-ui/table-row-element';

import {
  createKeyImagePlugin,
  createKeyImagesGridPlugin,
  createReportSubTitlePlugin,
  createReportTitlePlugin,
  createSectionPlugin,
  createSectionTitlePlugin,
  ElementTypes,
} from './config/pluginOptions';
import { KeyImageElement } from './custom-types';
import {
  KeyImage,
  KeyImageCaption,
  KeyImageContainer,
  KeyImagesGrid,
  ReportSubTitle,
  ReportSubTitleContainer,
  ReportTitle,
  Section,
  SectionParagraph,
  SectionTitle,
  Table,
  TableContainer,
} from './editor-components';

type CreatePlateComponentPropsType = {
  children?: ReactNode;
  attributes: object;
  className: string;
  element: TDescendant;
  nodeProps: object;
  editorValue: Array<Node>;
  handleOnchangeEditorValue: any;
  saveReportChanges: any;
};

export function PlateEditor(props: CreatePlateComponentPropsType) {
  const { editorValue, handleOnchangeEditorValue, saveReportChanges } = props;
  const disableDragAndDropEvent = useCallback((e: any) => {
    e.preventDefault();
    return false;
  }, []);

  const plateComponents: any = {
    [ELEMENT_PARAGRAPH]: (props: any) => {
      return (
        <SectionParagraph
          id={'editor-section-paragraph'}
          onDragStart={disableDragAndDropEvent}
          {...props}
        />
      );
    },
    [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
    [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
    [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
    [ELEMENT_TABLE]: (props: CreatePlateComponentPropsType) => {
      const { element, nodeProps, ...rest } = props;
      return (
        <TableContainer>
          <Table>
            <tbody {...rest} />
          </Table>
        </TableContainer>
      );
    },
    [ELEMENT_TH]: (props: CreatePlateComponentPropsType) => {
      const { element, nodeProps, ...rest } = props;
      const { attributes }: any = element;
      let attr = {};
      if (attributes) {
        attr = {
          rowSpan: attributes['rowspan'],
          colSpan: attributes['colspan'],
        };
      }

      return <td onDragStart={disableDragAndDropEvent} {...attr} {...rest} />;
    },
    [ELEMENT_TD]: (props: CreatePlateComponentPropsType) => {
      const { element, nodeProps, ...rest } = props;
      const { attributes }: any = element;
      let attr = {};
      if (attributes) {
        attr = {
          rowSpan: attributes['rowspan'],
          colSpan: attributes['colspan'],
        };
      }

      return <td onDragStart={disableDragAndDropEvent} {...attr} {...rest} />;
    },
    [ELEMENT_TR]: TableRowElement,
    [ELEMENT_COLUMN]: ColumnElement,
    [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
    [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),

    //Can be enabled if needed in future
    // [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
    // [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    // [ELEMENT_CODE_LINE]: CodeLineElement,
    // [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
    // [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
    // [ELEMENT_HR]: HrElement,
    // [ELEMENT_IMAGE]: ImageElement,
    // [ELEMENT_LINK]: LinkElement,
    // [ELEMENT_TOGGLE]: ToggleElement,
    // [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
    // [ELEMENT_MENTION]: MentionElement,
    // [ELEMENT_MENTION_INPUT]: MentionInputElement,
    // [ELEMENT_TODO_LI]: TodoListElement,
    // [MARK_COMMENT]: CommentLeaf,
    // [MARK_KBD]: KbdLeaf,
  };

  const customComponents = {
    [ElementTypes.reportTitle]: (props: TRenderElementProps) => {
      return (
        <ReportTitle
          id={'reportTitleId'}
          contentEditable={false} // TODO: Need to remove after configurable solution is found
          fontSize={TextSizes.l}
          letterSpacing={LetterSpacing.s}
          {...props}
        />
      );
    },
    [ElementTypes.reportSubTitle]: (props: TRenderElementProps) => {
      const { element } = props;
      const text = element?.children[0]?.text;
      return (
        <ReportSubTitleContainer contentEditable={false}>
          <ReportSubTitle
            id={'reportSubTitleId'}
            color={TextColors.ternary}
            contentEditable={false} // TODO: Need to remove after configurable solution is found
            letterSpacing={LetterSpacing.s}
            transform={TextCases.CAPITALIZE}
            {...props}
          >
            {/* @ts-ignore */}
            {text ?? ''}
          </ReportSubTitle>
        </ReportSubTitleContainer>
      );
    },
    [ElementTypes.section]: (props: TRenderElementProps) => {
      return <Section {...props} />;
    },
    [ElementTypes.sectionTitle]: (props: TRenderElementProps) => {
      return (
        <SectionTitle
          color={TextColors.highlight4}
          contentEditable={false} // TODO: Need to remove after configurable solution is found
          fontSize={TextSizes.l}
          letterSpacing={LetterSpacing.s}
          {...props}
        />
      );
    },
    [ElementTypes.keyImagesGrid]: (props: TRenderElementProps) => {
      return <KeyImagesGrid {...props} contentEditable={false} />;
    },
    [ElementTypes.keyImage]: (props: TRenderElementProps) => {
      const { attributes, children, element } = props;
      const id = children[0]?.props?.parent.id ?? 0;

      return (
        <KeyImageContainer onDrop={disableDragAndDropEvent} {...attributes}>
          {/* {(editable_image || !disableEditIcon) && (
            <>
              <EditKeyImageIcon
                onClick={
                  readOnly
                    ? () => {}
                    : () =>
                        onOpenImage?.(
                          (element as KeyImageElement).url as string,
                          element.id,
                          element?.children?.[0]?.text
                        )
                }
                name={'pencil-edit-button-white'}
                width={16}
                height={16}
                showCursor={!readOnly}
              />
              <DeleteKeyImageIcon
                onDrop={disableDragAndDropEvent}
                onClick={readOnly ? () => {} : () => onRemoveImage?.((element as KeyImageElement).id)}
                src={'/icons/close.svg'}
                showCursor={!readOnly}
              />
            </>
          )} */}
          <KeyImage
            onDrop={disableDragAndDropEvent}
            src={(element as KeyImageElement).url}
          />
          <div style={{ display: 'flex' }}>
            <KeyImageCaption
              onDrop={disableDragAndDropEvent}
              color={TextColors.ternary}
              font={TextFonts.Roboto}
              letterSpacing={LetterSpacing.xsp}
            >
              <span style={{ display: 'inline' }}>{children}</span>
            </KeyImageCaption>
            {/* {(editable_image || !disableEditIcon) && (
              <div style={{ alignItems: 'center' }}>
                <Icon
                  showCursor
                  onClick={() => onClickSetCaptionIcon?.(id)}
                  name={'pencil-edit-button'}
                  width={14}
                  height={14}
                />
              </div>
            )} */}
          </div>
        </KeyImageContainer>
      );
    },
  };

  const plugins = useMemo(
    () =>
      createPlugins(
        [
          createReactPlugin(),
          createHistoryPlugin(),
          createParagraphPlugin(),
          createBlockquotePlugin(),
          createTodoListPlugin(),
          createHeadingPlugin(),
          createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
          }),
          createTablePlugin(),
          createMediaEmbedPlugin(),
          createAlignPlugin({
            inject: {
              props: {
                validTypes: [
                  ELEMENT_PARAGRAPH,
                  ELEMENT_H1,
                  ELEMENT_H2,
                  ELEMENT_H3,
                  ELEMENT_H4,
                  ELEMENT_H5,
                  ELEMENT_H6,
                ],
              },
            },
          }),
          createBoldPlugin(),
          createItalicPlugin(),
          createHighlightPlugin(),
          createUnderlinePlugin(),
          createStrikethroughPlugin(),
          createSubscriptPlugin(),
          createSuperscriptPlugin(),
          createKbdPlugin(),
          createNodeIdPlugin(),
          createIndentPlugin({
            inject: {
              props: {
                validTypes: [
                  ELEMENT_PARAGRAPH,
                  ELEMENT_H1,
                  ELEMENT_H2,
                  ELEMENT_H3,
                  ELEMENT_H4,
                  ELEMENT_H5,
                  ELEMENT_H6,
                  ELEMENT_BLOCKQUOTE,
                  ELEMENT_CODE_BLOCK,
                ],
              },
            },
          }),
          createAutoformatPlugin({
            options: {
              rules: autoformatRules,
            },
          }),
          createResetNodePlugin({
            options: {
              rules: [
                // Usage: https://platejs.org/docs/reset-node
              ],
            },
          }),
          createTrailingBlockPlugin({ type: ELEMENT_PARAGRAPH }),
          createSoftBreakPlugin({
            options: {
              rules: [
                { hotkey: 'shift+enter' },
                {
                  hotkey: 'enter',
                  query: {
                    allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
                  },
                },
              ],
            },
          }),
          createExitBreakPlugin({
            options: {
              rules: [
                {
                  hotkey: 'mod+enter',
                },
                {
                  hotkey: 'mod+shift+enter',
                  before: true,
                },
                {
                  hotkey: 'enter',
                  query: {
                    start: true,
                    end: true,
                    allow: KEYS_HEADING,
                  },
                  relative: true,
                  level: 1,
                },
              ],
            },
          }),
          createSelectOnBackspacePlugin({
            options: {
              query: {
                allow: [ELEMENT_IMAGE, ELEMENT_HR],
              },
            },
          }),
          createDeserializeMdPlugin(),
          createDeserializeCsvPlugin(),
          createDeserializeDocxPlugin(),
          createListPlugin(),
          //Custom plugins
          createReportTitlePlugin(),
          createReportSubTitlePlugin(),
          createSectionPlugin(),
          createSectionTitlePlugin(),
          createKeyImagesGridPlugin(),
          createKeyImagePlugin(),
        ],
        { components: { ...plateComponents, ...customComponents } }
      ),
    []
  );

  return (
    <CommentsProvider users={{}} myUserId="1">
      <Plate
        plugins={plugins}
        initialValue={editorValue as any}
        onChange={handleOnchangeEditorValue}
      >
        <FixedToolbar>
          <FixedToolbarButtons saveReportChanges={saveReportChanges} />
        </FixedToolbar>

        <Editor />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
        <MentionCombobox items={[]} />
        <CommentsPopover />
      </Plate>
    </CommentsProvider>
  );
}

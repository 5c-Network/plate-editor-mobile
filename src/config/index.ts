import {
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
    PlatePlugin,

  } from '@udecode/plate-common'
  import { EditableProps } from 'slate-react/dist/components/editable'
  import { autoformatRules } from '../autoFormats/index'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { ELEMENT_TODO_LI } from '@udecode/plate-list'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { AutoformatPlugin } from '@udecode/plate-autoformat'
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break'
import { IndentPlugin } from '@udecode/plate-indent'
import { ResetNodePlugin } from '@udecode/plate-reset-node'
import { SelectOnBackspacePlugin } from '@udecode/plate-select'
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, KEYS_HEADING } from '@udecode/plate-heading'
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import { ELEMENT_TD } from '@udecode/plate-table'
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule'
import { ELEMENT_IMAGE } from '@udecode/plate-media'
  
  const resetBlockTypesCommonRule = {
    types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
    defaultType: ELEMENT_PARAGRAPH,
  }
  
  export type EditorConfigEditablePropOptions = {
    className?: string
    handleScroll?: () => void
    readOnly: boolean
  }
  
  export const editorConfig: {
    editableProps: (options: EditorConfigEditablePropOptions) => EditableProps
    align: Partial<PlatePlugin>
    //@ts-ignore
    autoformat: Partial<PlatePlugin<Record<string, any>, AutoformatPlugin>>
        //@ts-ignore
    exitBreak: Partial<PlatePlugin<Record<string, any>, ExitBreakPlugin>>
        //@ts-ignore
    indent: Partial<PlatePlugin<Record<string, any>, IndentPlugin>>
        //@ts-ignore
    resetBlockType: Partial<PlatePlugin<Record<string, any>, ResetNodePlugin>>
        //@ts-ignore
    selectOnBackspace: Partial<PlatePlugin<Record<string, any>, SelectOnBackspacePlugin>>
        //@ts-ignore
    softBreak: Partial<PlatePlugin<Record<string, any>, SoftBreakPlugin>>
        //@ts-ignore
    trailingBlock: Partial<PlatePlugin<Record<string, any>, TrailingBlockPlugin>>
  } = {
    editableProps: ({ className, handleScroll, readOnly }) => {
      const editableProps: { [key: string]: any } = {
        style: {
          padding: '0 30px',
          margin: '0px'
        },
        autoFocus: true,
        spellCheck: true,
        className,
        readOnly,
      }
      if (handleScroll) {
        editableProps['onScroll'] = handleScroll
      }
      return editableProps
    },
    align: {
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
        },
      },
    },
    indent: {
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
    },
    resetBlockType: {
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Enter',
            predicate: isBlockAboveEmpty,
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtBlockStart,
          },
        ],
      },
    },
    trailingBlock: { type: ELEMENT_PARAGRAPH },
    softBreak: {
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
    },
    exitBreak: {
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
          },
        ],
      },
    },
    selectOnBackspace: {
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_HR],
        },
      },
    },
    autoformat: {
      options: {
        rules: autoformatRules,
      },
    },
  }
  
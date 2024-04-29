import {
  setNodes,
  TElement,
} from '@udecode/plate-common'
import { Editor } from 'slate'
import { formatList, preFormat } from './autoformatUtils'
import { AutoformatRule } from '@udecode/plate-autoformat'
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL } from '@udecode/plate-list'

export const autoformatLists: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['* ', '- '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_UL),
  },
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['1. ', '1) '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_OL),
  },
  {
    mode: 'block',
    type: ELEMENT_TODO_LI,
    match: '[] ',
  },
  {
    mode: 'block',
    type: ELEMENT_TODO_LI,
    match: '[x] ',
    format: (editor:any) =>
      setNodes<any>(
        editor,
        { type: ELEMENT_TODO_LI, checked: true },
        {
          match: (n:any) => Editor.isBlock(editor, n),
        }
      ),
  },
]

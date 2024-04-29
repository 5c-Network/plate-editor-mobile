import React from 'react';
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT
} from '@udecode/plate-basic-marks';
import { useEditorReadOnly,useEditorRef } from '@udecode/plate-common';

import { Icons } from '@/components/icons';

import { InsertDropdownMenu } from './insert-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { Button } from './button';

type FixedToolbarButtonsPropType = {
  saveReportChanges:any
}

export function FixedToolbarButtons(props:FixedToolbarButtonsPropType) {
  const {saveReportChanges} =props
  console.log({saveReportChanges})
  const readOnly = useEditorReadOnly();
  const editor =useEditorRef()



  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_SUPERSCRIPT} >
                <Icons.superscript />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_SUBSCRIPT} >
                <Icons.subscript />
              </MarkToolbarButton>

            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

  
          <button className='bg-blue-500 text-white px-2 py-1 rounded m-1' onClick={()=>{saveReportChanges()}} >Save</button>
      </div>
    </div>
  );
}

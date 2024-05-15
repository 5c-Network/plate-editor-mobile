import { createPluginFactory } from '@udecode/plate-common';

import {
  KeyImage,
  KeyImagesGrid,
  ReportSubTitle,
  ReportTitle,
  Section,
  SectionTitle,
} from '../editor-components';

export enum ElementTypes {
  section = 'section',
  sectionTitle = 'sectionTitle',
  reportTitle = 'reportTitle',
  keyImagesGrid = 'keyImagesGrid',
  keyImage = 'keyImage',
  reportSubTitle = 'reportSubTitle',
}

export const createReportTitlePlugin = createPluginFactory({
  key: ElementTypes.reportTitle,
  isElement: true,
  component: ReportTitle,
});

export const createReportSubTitlePlugin = createPluginFactory({
  key: ElementTypes.reportSubTitle,
  isElement: true,
  component: ReportSubTitle,
});

export const createSectionPlugin = createPluginFactory({
  key: ElementTypes.section,
  isElement: true,
  component: Section,
});

export const createSectionTitlePlugin = createPluginFactory({
  key: ElementTypes.sectionTitle,
  isElement: true,
  component: SectionTitle,
});

export const createKeyImagesGridPlugin = createPluginFactory({
  key: ElementTypes.keyImagesGrid,
  isElement: true,
  component: KeyImagesGrid,
});

export const createKeyImagePlugin = createPluginFactory({
  key: ElementTypes.keyImage,
  isElement: true,
  component: KeyImage,
});

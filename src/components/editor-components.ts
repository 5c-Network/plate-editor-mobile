import styled from 'styled-components';

import {
  LetterSpacing,
  TextColors,
  TextFontWeights,
  TextSizes,
} from '../utils/constants';

type SectionParagraphType = {
  hide?: boolean;
};

export type TextProps = {
  color?: string;
  font?: string;
  fontSize?: string;
  letterSpacing?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  transform?: string;
  wordBreak?: string;
};

const Text = styled.span<TextProps>`
  color: ${(props) => (props.color ? props.color : '#707070')};
  font-family: ${(props) => (props.font ? props.font : 'ProductSans')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.875rem')};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : '0.5px'};
  line-height: ${(props) => (props.fontSize === '1rem' ? '25px' : 'initial')};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  font-style: ${(props) => (props.italic ? 'italic' : 'initial')};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'initial')};
  text-transform: ${(props) => (props.transform ? props.transform : 'initial')};
  word-break: ${(props) => (props.wordBreak ? props.wordBreak : 'initial')};
`;

export const SectionParagraph = styled(Text)<SectionParagraphType>`
  display: ${(props) => (props.hide ? 'none' : 'initial')};
  margin-bottom: 0.5rem;
  font-family: 'Roboto';
  color: #707070;
  letter-spacing: 0.1px;
`;
export const KeyImage = styled.img`
  height: 16rem;
  width: 16rem;
`;
export const KeyImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 2rem;
  place-items: center;
`;

export const ReportTitle = styled(Text)`
  margin: 1rem auto 1rem auto;
  text-align: center;
  text-transform: uppercase;
  & * {
    user-select: none;
  }
`;

export const ReportSubTitle = styled(Text)`
  margin: auto;
  text-align: center;
  & * {
    user-select: none;
  }
`;

export const ReportSubTitleContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;

  & * {
    user-select: none;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SectionTitle = styled(Text)`
  margin: 1rem 0;
  color: #2ea5ff;
  font-weight: 700;
  & * {
    user-select: none;
  }
`;
export const UnorderedList = styled.ul`
  margin-top: 0.5rem;
`;

export const OrderedList = styled.ol`
  color: #707070;
  margin-top: 0.5rem;
`;

export const ListItem = styled.li`
  color: #707070;
  font-family: 'Roboto';
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1px;
  ::marker {
    color: #707070;
    font-family: 'Roboto';
    font-weight: 400;
  }
`;

export const TableContainer = styled.div`
  position: relative;
`;

export const Table = styled.table`
  &,
  th,
  td {
    border: 1px solid ${TextColors.ternary};
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  th,
  td {
    color: ${TextColors.ternary};
    font-family: 'Roboto';
    font-size: ${TextSizes.sp};
    font-style: initial;
    font-weight: ${TextFontWeights.Normal};
    letter-spacing: ${LetterSpacing.xsp};
    line-height: initial;
    padding: 0.5rem;
    text-decoration: initial;
    word-break: initial;
  }
`;

export const KeyImageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 0.5rem;
`;

export const KeyImageCaption = styled(Text)`
  line-height: 1.25rem;
  margin-top: 0.5rem;
  min-width: 12rem;
  max-width: 15rem;
  text-align: center;
  display: inline;
`;

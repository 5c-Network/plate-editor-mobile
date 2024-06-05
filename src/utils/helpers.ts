import FontFaceObserver from 'fontfaceobserver';
import { NOCO_DB_BASE_URL, NOCO_DB_HEADER } from './constants';
import axios from 'axios';

export const robotoFontFaceObserverHelper = () => {
  const robotoN = new FontFaceObserver('Roboto', {
    weight: 400,
  });
  const robotoB = new FontFaceObserver('Roboto', {
    weight: 700,
  });

  const robotoI = new FontFaceObserver('Roboto', {
    style: 'italic',
  });

  const robotoBI = new FontFaceObserver('Roboto', {
    weight: 700,
    style: 'italic',
  });

  const robotoT = new FontFaceObserver('Roboto', {
    weight: 100,
  });

  Promise.all([
    robotoN.load(),
    robotoB.load(),
    robotoI.load(),
    robotoBI.load(),
    robotoT.load(),
  ]).then(() => {
    console.log('Roboto Font Family has loaded');
  });
};

export const getRuleName = (ruleObj: any, separator = ' ') => {
  let ruleName = ruleObj?.['list']?.join(separator);

  if (ruleObj?.hasOwnProperty('children')) {
    ruleName += separator;
    ruleObj['children'].forEach((childObj: any, index: number) => {
      ruleName += childObj['list'].join(' ');
      if (index !== ruleObj['children'].length - 1) {
        ruleName += ' and ';
      }
    });
  }

  if (ruleObj?.hasOwnProperty('additional') && ruleObj['additional'].length) {
    ruleName += ' with ';
    ruleObj['additional'].forEach((additionalRule: any, index: number) => {
      ruleName += additionalRule['list']
        .filter((listItem: any, liIndex: number) => {
          // Omit the first list item if it is same as first item of rule list
          return !(!Boolean(liIndex) && listItem === ruleObj['list'][0]);
        })
        .join(' ');

      if (index !== ruleObj['additional'].length - 1) {
        ruleName += ' and ';
      }
    });
  }

  if (ruleObj?.['mandatory']?.length) {
    // Sort mandatory rules array by type
    const newArray = [...ruleObj['mandatory']];
    newArray.sort((a: any, b: any) => {
      const ruleTypes = ['Gender', 'Side', 'View'];
      return ruleTypes.indexOf(a.type) - ruleTypes.indexOf(b.type);
    });
    ruleName += ' - ';
    let mandatoryRules = '';
    newArray.forEach((mandatoryRule: any, index: number) => {
      let valuesString = mandatoryRule['values'].join(', ');
      if (mandatoryRule['values'].length > 1) {
        const andIndex = valuesString.lastIndexOf('and ');
        if (andIndex < 0) {
          const lastCommaIndex = valuesString.lastIndexOf(',');
          valuesString =
            valuesString.slice(0, lastCommaIndex) +
            ' and ' +
            valuesString.slice(lastCommaIndex + 1);
        } else {
          valuesString = valuesString.replace(/, ([^,]+)$/, ' and $1');
        }
      }
      mandatoryRules += valuesString;
      if (index < newArray.length - 1) {
        if (mandatoryRule['type'] !== newArray[index + 1]['type']) {
          mandatoryRules += ' - ';
        } else {
          mandatoryRules += ' and ';
        }
      }
    });
    ruleName += mandatoryRules;
  }

  return ruleName;
};

export const updateReworkReportEditTracker = async (data: any) => {
  const endpoint = '/api/v1/db/data/noco/pnh8gwhfqwr90rl/mhn4f6z228fb3f9/views/vwt826hzesnoxroh'
  const { rework_id, rad_id, report_id, mod_study } = data;
  
  try {
    const response = await axios.request({
      method: 'GET',
      url: `${NOCO_DB_BASE_URL+endpoint}/find-one?where=(rad_id,eq,${rad_id})~and(rework_id,eq,${rework_id})`,
      headers: NOCO_DB_HEADER,
    });
    if (Object.keys(response?.data)?.length) {
      const updateData: any = {};
      if (mod_study) {
        updateData['mod_study'] = JSON.stringify({...JSON.parse(response.data?.mod_study), [report_id]: mod_study});
      }

      await axios.request({
        method: 'PATCH',
        url: `${NOCO_DB_BASE_URL+'/api/v1/db/data/v1/pnh8gwhfqwr90rl/MobileReworkReport/'+response.data?.Id}`,
        headers: NOCO_DB_HEADER,
        data: updateData
      });
    } else {
      await axios.request({
        method: 'POST',
        url: `${NOCO_DB_BASE_URL+endpoint}`,
        headers: NOCO_DB_HEADER,
        data: {
          rad_id,
          rework_id,
          [mod_study]: {[report_id]: mod_study}
        },
      });
    }
  } catch (error) {
    throw new Error('Update or insert operation failed.');
  }
}

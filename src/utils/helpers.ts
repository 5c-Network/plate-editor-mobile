import FontFaceObserver from 'fontfaceobserver';

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
  let ruleName = ruleObj['list']?.join(separator);

  if (ruleObj.hasOwnProperty('children')) {
    ruleName += separator;
    ruleObj['children'].forEach((childObj: any, index: number) => {
      ruleName += childObj['list'].join(' ');
      if (index !== ruleObj['children'].length - 1) {
        ruleName += ' and ';
      }
    });
  }

  if (ruleObj.hasOwnProperty('additional') && ruleObj['additional'].length) {
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

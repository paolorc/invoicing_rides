import { createReadStream } from 'fs';
import csvParser from 'csv-parser';

import { noopString, strToNumber } from './utils';

export function readFileStream(
  relativePathFile: string,
  separator: string,
  formatMapper: any,
  process = (data: any[]) => {},
) {
  const results = [];

  function headerFilter({ header }) {
    return Object.keys(formatMapper).includes(header) ? header : null;
  }

  function valueTransformer({ header, value }) {
    const transformer = formatMapper[header] || noopString;

    return transformer(value);
  }

  createReadStream(relativePathFile, { encoding: 'utf8' })
    .pipe(
      csvParser({
        separator,
        strict: true,
        mapHeaders: headerFilter,
        mapValues: valueTransformer,
      }),
    )
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      process(results);
    });
}

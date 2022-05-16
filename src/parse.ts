
import * as _ from 'lodash';

// const tellBody = (obj: any): any =>
//   _.compact([
//     obj.rows ? `set rows to ${obj.rows}` : null,
//     obj.columns ? `set columns to ${obj.columns}` : null,
//     'write text (dircommand as text)',
//     obj.command ? `write text "${obj.command}"` : null,
//     ...(() => {
//       if (Array.isArray(obj.split)) return _.flatten(obj.split.map((s: any) => split(s)));
//       else if (obj.split) return split(obj.split);
//       return [];
//     })()
//   ]);

const tellBody = (arr: string[]): any => {
  return _.compact([
    `write text "${arr[0]}"`,
    ...(() => {
      if (arr.slice(1).length > 0) {
        return split(arr.slice(1))
      }
      return []
    })()
  ])
}

const split = (obj: any) => [
  `tell (split vertically with ${profile(obj.profile)})`,
  tellBody(obj),
  'end tell'
];

const indent = (arr: any, prefix = 0) =>
  arr.map((row: any) => {
    if (Array.isArray(row)) return indent(row, prefix + 2);
    const pre = prefix ? Array.apply(null, Array(prefix)).map(() => ' ').join('') : '';
    return pre + row;
  }).join('\n');

const profile = (p: any) => p ? `profile "${p}"` : 'default profile';

export const parse = (obj: any) => `
${indent([
  'tell application "iTerm2"',
  [
    'activate',
    'tell current session of current window',
    tellBody(obj),
    'end tell',
  ],
  'end tell',
  ...(obj.fullscreen ?
    [
      'tell application "System Events" to tell process "iTerm2"',
      ['set value of attribute "AXFullScreen" of window 1 to true'],
      'end tell'
    ] : []
  )
])}`;

// module.exports = { parse };

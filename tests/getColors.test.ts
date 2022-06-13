import { getColors } from '../src/getColors';

const Test1 = 'Should return an object including only properties with string values';

const sourceObject = {
  activeFillColor: 'transparent',
  activeStrokeColor: undefined,
  activeBoxColor: ['x', 'a', 'f', undefined, 0],
  activeBoxBorderColor: 3,

  inactiveFillColor: 'green',
  inactiveStrokeColor: '#FFFFFF',
  inactiveBoxColor: 'red',
  inactiveBoxBorderColor: undefined,
};

const absoluteStrokeWidth = 1;
const absoluteHalfFill = 'svg';
const deservesHalfFill = false;

const expectedObject = {
  arrayColors: {
    activeBoxColor: ['x', 'a', 'f'],
  },
  staticColors: {
    activeFillColor: 'transparent',

    inactiveBoxColor: 'red',
    inactiveFillColor: 'green',
    inactiveStrokeColor: '#FFFFFF',
  },
};

test(Test1, () => {
  expect(
    getColors(sourceObject, absoluteStrokeWidth, deservesHalfFill, absoluteHalfFill)
  ).toStrictEqual(expectedObject);
});

const Test2 = 'Should never include non-array properties in arrayColors';

const sourceObject2 = {
  activeBoxColor: ['x', 'a', 'f', undefined, 0],

  inactiveFillColor: ['green', 'red', 'blue'],
  inactiveStrokeColor: '#FFFFFF',
};

const expectedObject2 = {
  arrayColors: {
    activeBoxColor: ['x', 'a', 'f'],
  },
  staticColors: {
    inactiveStrokeColor: '#FFFFFF',
  },
};

test(Test2, () => {
  expect(
    getColors(sourceObject2, absoluteStrokeWidth, deservesHalfFill, absoluteHalfFill)
  ).toStrictEqual(expectedObject2);
});

const Test3 = 'Should return an empty object for arrayColors if no colors are provided as array';

const sourceObject3 = {
  activeFillColor: '#ffb23f',
  activeBoxColor: 'red',
  activeBoxBorderColor: 'blue',
  activeStrokeColor: '#e17b21',

  inactiveFillColor: '#FFF7ED',
  inactiveStrokeColor: '#eda76a',
  inactiveBoxColor: 'green',
  inactiveBoxBorderColor: 'aliceblue',
};

const expectedObject3 = {
  arrayColors: {},
  staticColors: {
    activeFillColor: '#ffb23f',
    activeBoxColor: 'red',
    activeBoxBorderColor: 'blue',
    activeStrokeColor: '#e17b21',

    inactiveFillColor: '#FFF7ED',
    inactiveStrokeColor: '#eda76a',
    inactiveBoxColor: 'green',
    inactiveBoxBorderColor: 'aliceblue',
  },
};

test(Test3, () => {
  expect(
    getColors(sourceObject3, absoluteStrokeWidth, deservesHalfFill, absoluteHalfFill)
  ).toStrictEqual(expectedObject3);
});

const Test4 = 'Should never include stroke colors if stroke width is not greater than 0';

const sourceObject4 = {
  activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

  inactiveFillColor: '#FFF7ED',
  inactiveStrokeColor: '#eda76a',
};

const expectedObject4 = {
  arrayColors: {
    activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  },
  staticColors: {
    inactiveFillColor: '#FFF7ED',
  },
};

test(Test4, () => {
  expect(getColors(sourceObject4, 0, deservesHalfFill, absoluteHalfFill)).toStrictEqual(
    expectedObject4
  );
});

const Test5 = `Should never include activeFillColor if halfFillMode is set to "box"
and activeBoxColor if is set to 'svg'.`;

const sourceObject5 = {
  activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  activeBoxColor: 'red',

  inactiveFillColor: '#FFF7ED',
  inactiveStrokeColor: '#eda76a',
};

const expectedObject5A = {
  arrayColors: {
    activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  },
  staticColors: {
    activeBoxColor: 'red',
    inactiveFillColor: '#FFF7ED',
    inactiveStrokeColor: '#eda76a',
  },
};

const expectedObject5B = {
  arrayColors: {
    activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
    activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  },
  staticColors: {
    inactiveFillColor: '#FFF7ED',
    inactiveStrokeColor: '#eda76a',
  },
};

test(Test5, () => {
  expect(getColors(sourceObject5, 10, true, 'box')).toStrictEqual(expectedObject5A);
  expect(getColors(sourceObject5, 10, true, 'svg')).toStrictEqual(expectedObject5B);
});

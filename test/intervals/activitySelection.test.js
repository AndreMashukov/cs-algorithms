const acs = require('../../src/intervals/activitySelection');
const act = require('../../src/shared/intervals/Activity');

describe('ActivitySelection', () => {
  it('should return non-conflicting activities', () => {
    const activities = [];
    activities.push(new act.Activity(1, 3));
    activities.push(new act.Activity(2, 5));
    activities.push(new act.Activity(0, 7));
    activities.push(new act.Activity(6, 8));
    activities.push(new act.Activity(9, 11));
    activities.push(new act.Activity(10, 12));
    expect(acs.maxActivities(activities))
        .toStrictEqual(['[1, 3]', '[6, 8]', '[9, 11]']);
  });

  it('should return non-conflicting activities', () => {
    const activities = [];
    activities.push(new act.Activity(1, 3));
    activities.push(new act.Activity(2, 5));
    expect(acs.maxActivities(activities))
        .toStrictEqual(['[1, 3]']);
  });
});


/** @ref https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_groupby */

export const groupEmargementsByDate = (
  emargementsFromApi: any
): Record<string, Array<any>> => {
  const allEmargementsFlattened = emargementsFromApi
    .map((e: any) =>
      e.date_list.map(({ date, session, time }: any) => ({
        date,
        session,
        time,
        groupId: e.id,
        name: e.name,
        slot: e.slot,
      }))
    )
    .flat();

  return allEmargementsFlattened.reduce((accumulateur: any, value: any) => {
    const date = value.date;

    accumulateur[date] = accumulateur[date]
      ? [value, ...accumulateur[date]]
      : [value];

    return accumulateur;
  }, {});
};

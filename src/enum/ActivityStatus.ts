export enum ActivityStatus {
  NOT_STARTED = "not_started",
  START = "start",
  END = "end",
}
export const ActivityStatusTranslationMap: { [key: string]: string } = {
  [ActivityStatus.NOT_STARTED]: "未開始",
  [ActivityStatus.START]: "開始",
  [ActivityStatus.END]: "結束",
};

export const ActivityStatusTranslationArr = Object.keys(
  ActivityStatusTranslationMap
).map((elem) => {
  return { key: elem, value: ActivityStatusTranslationMap[elem] };
});

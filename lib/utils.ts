export function formatToTimeAgo(date: string): string {
  /**
   * dayInMs : 하루 동안의 ms 계산 (1000 * 60초 * 60분 * 24)
   */

  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  /* Intl = 국제화와 관련된 API  */
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}
